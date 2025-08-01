<script lang="ts">
  import {
    MapLibre,
    GeoJSON,
    VectorTileSource,
    FillLayer,
    LineLayer,
    zoomTransition,
    Control,
    ControlButton,
    ControlGroup,
    ScaleControl,
  } from "svelte-maplibre";
  import { contrastingColor } from "./colors.js";
  import { colorbrewer } from "./colorbrewer.js";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { LngLatLike, LngLatBoundsLike } from "maplibre-gl";
  import type { FeatureCollection } from "geojson";
  import fullTopo from "./fullTopo.json";
  import * as topojson from "topojson-client";
  import Tooltip from "./Tooltip.svelte";
  import {
    getColor,
    filterGeo,
    jenksBreaks,
    quantileBreaks,
  } from "./mapUtils.js";
  import NonStandardControls from "./NonStandardControls.svelte";
  import { replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import { joinData } from "./dataJoin.js";

  import maplibre from "maplibre-gl";
  const { LngLatBounds } = maplibre;

  let {
    data,
    customPalette,
    setCustomPalette = false,
    interactive = true,
    cooperativeGestures = true,
    standardControls = true,
    navigationControl,
    navigationControlPosition = "top-left",
    geolocateControl,
    geolocateControlPosition = "top-left",
    fullscreenControl,
    fullscreenControlPosition = "top-left",
    scaleControl,
    scaleControlPosition = "bottom-left",
    scaleControlUnit = "metric",
    styleSheet = "Carto-light",
    colorPalette = "YlGnBu",
    showBorder = false,
    maxBorderWidth = 1.5,
    tooltip = true,
    clickToZoom = true,
    geoType = "ltla",
    year = 2024,
    metric = "Residual household waste",
    breaksType = "quantile",
    customBreaks = [20, 40, 60, 80, 100],
    numberOfBreaks = 5,
    fillOpacity = 0.5,
    changeOpacityOnHover = true,
    hoverOpacity = 0.8,
    center = [-2.5, 53],
    zoom = 5,
    minZoom = 6,
    maxZoom = 14,
    maxBoundsCoords = [
      [-10, 49],
      [5, 60],
    ],
    hash = false,
    updateHash = (u) => {
      replaceState(u, page.state);
    },
    useInitialHash = true,
    mapHeight = 200,
    setMaxBounds = false,
    onload,
    onidle,
    geoSource = "file",
    tileSource = "http://localhost:8080/{z}/{x}/{y}.pbf",
    paintObject,
  }: {
    data: object[];
    paintObject?: object;
    customPalette?: object[];
    cooperativeGestures?: boolean;
    standardControls?: boolean;
    navigationControl?: boolean;
    navigationControlPosition?: maplibregl.ControlPosition;
    geolocateControl?: boolean;
    geolocateControlPosition?: maplibregl.ControlPosition;
    fullscreenControl?: boolean;
    fullscreenControlPosition?: maplibregl.ControlPosition;
    scaleControl?: boolean;
    scaleControlPosition?: maplibregl.ControlPosition;
    scaleControlUnit?: "imperial" | "metric" | "nautical";
    styleSheet?: string | URL | object;
    colorPalette?: string;
    showBorder?: boolean;
    maxBorderWidth?: number;
    tooltip?: boolean;
    clickToZoom?: boolean;
    geoType?: string;
    year?: string | number;
    metric?: string;
    breaksType?: string;
    numberOfBreaks?: number;
    fillOpacity?: number;
    changeOpacityOnHover?: boolean;
    hoverOpacity?: number;
    center?: LngLatLike;
    zoom?: number;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    maxBoundsCoords?: LngLatBoundsLike;
    setMaxBounds?: boolean;
    hash?: boolean;
    updateHash?: (URL) => void;
    useInitialHash?: boolean;
    mapHeight?: number;
    setCustomPalette?: boolean;
    customBreaks?: number[];
    interactive?: boolean;
    onload?: (map: maplibregl.Map) => void;
    onidle?: (e: maplibregl.MapLibreEvent) => void;
    geoSource: "file" | "tiles" | "none";
    tileSource?: string;
  } = $props();

  let styleLookup = {
    "Carto-light":
      "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    "Carto-dark":
      "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  };
  let style = $derived(
    typeof styleSheet == "string"
      ? (styleLookup[styleSheet] ?? styleSheet)
      : styleSheet,
  );

  let breakCount = $derived(
    breaksType == "custom" ? customBreaks.length : numberOfBreaks,
  );

  let mapData = $derived(data?.filter((d) => d["year"] == year)[0]?.data);

  let filteredMapData = $derived(
    mapData.map((el) => ({
      areaCode: el.areaCode,
      areaName: el.areaName,
      metric: +el.data[metric],
    })),
  );

  const geojsonData: FeatureCollection = $derived(
    topojson.feature(fullTopo, fullTopo.objects[geoType]),
  );

  let filteredGeoJsonData = $derived(filterGeo(geojsonData, year));

  let fillColors: string[] = $derived(
    setCustomPalette == true
      ? customPalette
      : colorbrewer[colorPalette][breakCount],
  );

  let tooFewColors = $derived(fillColors.length < breakCount);

  $effect(() => {
    if (tooFewColors) {
      console.warn("Too few colours for the number of breaks");
    }
  });

  let borderColor = "#003300";

  let map: maplibregl.Map | undefined = $state();

  let loaded = $state(false);
  let textLayers: maplibregl.LayerSpecification[] = $derived(
    map && loaded && styleSheet
      ? map.getStyle().layers.filter((layer) => {
          return layer.type === "symbol" && layer["source-layer"] === "place";
        })
      : [],
  );

  let colors = $derived(fillColors.map((d) => contrastingColor(d)));
  $effect(() => {
    //Things can get out of sync when changing source
    //this section makes sure that the geojson layers end up below the text layers
    let geoJsonLayerIds = map
      ?.getStyle()
      ?.layers.filter((layer) => {
        return layer.source == "areas";
      })
      .map((d) => d.id);
    const labelLayerId = map
      ?.getStyle()
      ?.layers.find(
        (layer) => layer.type === "symbol" && layer["source-layer"] === "place",
      )?.id;
    if (geoJsonLayerIds && labelLayerId) {
      for (let layer of geoJsonLayerIds) {
        map?.moveLayer(layer, labelLayerId);
      }
    }

    for (let layer of textLayers) {
      //Hard coded to first color for testing
      map?.setPaintProperty(layer.id, "text-color", colors[0].textColor);
      map?.setPaintProperty(
        layer.id,
        "text-halo-color",
        colors[0].textOutlineColor,
      );
    }

    if (cooperativeGestures) {
      map?.cooperativeGestures.enable();
      $inspect(cooperativeGestures);
    } else {
      map?.cooperativeGestures.disable();
      $inspect(cooperativeGestures);
    }

    if (interactive) {
      map?.scrollZoom.enable();
      map?.boxZoom.enable();
      map?.dragRotate.enable();
      map?.dragPan.enable();
      map?.keyboard.enable();
      map?.doubleClickZoom.enable();
      map?.touchZoomRotate.enable();
    } else {
      map?.scrollZoom.disable();
      map?.boxZoom.disable();
      map?.dragRotate.disable();
      map?.dragPan.disable();
      map?.keyboard.disable();
      map?.doubleClickZoom.disable();
      map?.touchZoomRotate.disable();
    }

    map?.setMaxBounds(bounds);

    map?.setMaxZoom(maxZoom);
    map?.setMinZoom(minZoom);
  });

  let vals = $derived(
    filteredMapData.map((d) => d.metric).sort((a, b) => a - b),
  );

  let breaks = $derived(
    breaksType == "jenks"
      ? jenksBreaks(vals, breakCount)
      : breaksType == "quantile"
        ? quantileBreaks(vals, breakCount)
        : customBreaks,
  );

  let dataWithColor = $derived(
    filteredMapData.map((d) => {
      return {
        ...d,
        color: getColor(d.metric, breaks, fillColors),
      };
    }),
  );

  let merged = $derived(joinData(filteredGeoJsonData, dataWithColor));

  let hoveredArea = $state();
  let hoveredAreaData = $state();
  let currentMousePosition = $state();

  function convertToLngLatBounds(coords: LngLatBoundsLike): LngLatBoundsLike {
    const bounds = new LngLatBounds(coords[0], coords[0]);

    for (let i = 1; i < coords.length; i++) {
      bounds.extend(coords[i]);
    }

    return bounds;
  }

  function zoomToArea(e) {
    if (clickToZoom) {
      let coordArray =
        e.features[0].geometry.coordinates.length === 1
          ? e.features[0].geometry.coordinates[0]
          : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
            e.features[0].geometry.coordinates.flat(2);

      let minValues = [
        Math.min(...coordArray.map((d) => +d[0])),
        Math.max(...coordArray.map((d) => +d[0])),
      ];

      let maxValues = [
        Math.min(...coordArray.map((d) => +d[1])),
        Math.max(...coordArray.map((d) => +d[1])),
      ];

      map?.fitBounds([
        [minValues[0], maxValues[0]],
        [minValues[1], maxValues[1]],
      ]);
    }
  }
  //When useInitialHash is true, even if hash is false, if the page is loaded with a location hash use that as the initial settings, rather than the values passed to the component
  const initialLocationHash = page.url.hash.replace("#", "").split("/");
  const useLocationHash = initialLocationHash.length >= 3 ? true : false;

  center = useInitialHash
    ? useLocationHash
      ? [+initialLocationHash[2], +initialLocationHash[1]]
      : center
    : center;

  zoom = useInitialHash
    ? useLocationHash
      ? +initialLocationHash[0]
      : zoom
    : zoom;

  let bounds = $derived(
    setMaxBounds
      ? maxBoundsCoords
        ? convertToLngLatBounds(maxBoundsCoords)
        : undefined
      : undefined,
  );
</script>

<div style="height: {mapHeight}px;">
  <MapLibre
    bind:map
    bind:loaded
    {style}
    {center}
    {zoom}
    standardControls={interactive && standardControls}
    {hash}
    {updateHash}
    class="map"
    {onload}
    {onidle}
  >
    {#if interactive && !standardControls}
      <NonStandardControls
        {navigationControl}
        {navigationControlPosition}
        {geolocateControl}
        {geolocateControlPosition}
        {fullscreenControl}
        {fullscreenControlPosition}
        {scaleControl}
        {scaleControlPosition}
        {scaleControlUnit}
      />
      <Control>
        <ControlGroup>
          <button
            class="reset-button"
            onclick={() => {
              map.flyTo({
                center: center,
                zoom: zoom,
              });
            }}
          >
            Reset view
          </button>
        </ControlGroup>
      </Control>
    {:else if !interactive}
      <ScaleControl position={scaleControlPosition} unit={scaleControlUnit} />
    {/if}
    {#if geoSource == "file"}
      <GeoJSON id="areas" data={merged} promoteId="areanm">
        <FillLayer
          paint={{
            "fill-color": ["coalesce", ["get", "color"], "lightgrey"],
            "fill-opacity": changeOpacityOnHover
              ? hoverStateFilter(fillOpacity, hoverOpacity)
              : fillOpacity,
          }}
          beforeLayerType="symbol"
          manageHoverState={interactive}
          onclick={interactive ? (e) => zoomToArea(e) : undefined}
          onmousemove={interactive
            ? (e) => {
                hoveredArea = e.features[0].id;
                hoveredAreaData = e.features[0].properties.metric;
                currentMousePosition = e.event.point;
              }
            : undefined}
          onmouseleave={interactive
            ? () => {
                hoveredArea = null;
                hoveredAreaData = null;
              }
            : undefined}
        />
        {#if showBorder}
          <LineLayer
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{
              "line-color": hoverStateFilter(borderColor, "orange"),
              "line-width": zoomTransition(3, 0, 12, maxBorderWidth),
            }}
            beforeLayerType="symbol"
          />
        {/if}
      </GeoJSON>
    {:else if geoSource == "tiles"}
      <VectorTileSource
        id={"lsoas"}
        promoteId={"LSOA21NM"}
        tiles={[tileSource]}
      >
        <FillLayer
          paint={paintObject}
          sourceLayer={"LSOA"}
          onclick={interactive
            ? (e) => {
                console.log(e);
                return zoomToArea(e);
              }
            : undefined}
          onmousemove={interactive
            ? (e) => {
                hoveredArea = e.features[0].id;
                hoveredAreaData =
                  e.features[0].properties[
                    "Index of Multiple Deprivation (IMD) Rank"
                  ];
                currentMousePosition = e.event.point;
              }
            : undefined}
          onmouseleave={interactive
            ? () => {
                hoveredArea = null;
                hoveredAreaData = null;
              }
            : undefined}
        ></FillLayer>
        {#if showBorder}
          <LineLayer
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{
              "line-color": hoverStateFilter(borderColor, "orange"),
              "line-width": zoomTransition(
                minZoom ?? 3,
                0,
                maxZoom ?? 14,
                maxBorderWidth,
              ),
            }}
            beforeLayerType="symbol"
            sourceLayer={"LSOA"}
          />
        {/if}
      </VectorTileSource>
    {:else}
      <p>No data</p>
    {/if}

    <!-- Important note: sourceLayer must match `-l` value from tippecanoe -->

    {#if interactive && tooltip}
      <Tooltip
        {currentMousePosition}
        {hoveredArea}
        {hoveredAreaData}
        {year}
        {metric}
      />
    {/if}
  </MapLibre>
</div>

<style>
  :global(.maplibregl-ctrl-group button.reset-button) {
    /* margin: 10px; */
    width: fit-content;
    padding: 5px 10px;
    font-size: 16px;
    height: 100%;
  }
</style>
