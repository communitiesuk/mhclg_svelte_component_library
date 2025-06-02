<script lang="ts">
  import {
    MapLibre,
    GeoJSON,
    FillLayer,
    LineLayer,
    zoomTransition,
    Control,
    ControlButton,
    ControlGroup,
  } from "svelte-maplibre";
  import { contrastingColor } from "./colors.js";
  import { colorbrewer } from "./colorbrewer.js";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { LngLatLike } from "maplibre-gl";
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

  import maplibregl from "maplibre-gl";
  const { LngLatBounds } = maplibregl;

  import type { LngLatBoundsLike } from "maplibre-gl";
  let {
    data,
    customPallet,
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
    tooltip,
    clickToZoom = true,
    geoType,
    year,
    metric,
    breaksType = "quantile",
    numberOfBreaks = 5,
    fillOpacity = 0.5,
    changeOpacityOnHover = true,
    hoverOpacity = 0.8,
    center = [-2.5, 53],
    zoom = 5,
    minZoom,
    maxZoom,
    maxBounds,
    hash = false,
    updateHash = (u) => {
      replaceState(u, page.state);
    },
    useInitialHash = true,
    mapHeight = 200,
    setMaxBounds,
  }: {
    data: object[];
    customPallet: object[] | undefined;
    cooperativeGestures?: boolean;
    standardControls?: boolean;
    navigationControl?: boolean;
    navigationControlPosition?: string;
    geolocateControl?: boolean;
    geolocateControlPosition?: string;
    fullscreenControl?: boolean;
    fullscreenControlPosition?: string;
    scaleControl?: boolean;
    scaleControlPosition?: string;
    scaleControlUnit?: string;
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
    changeOpacityOnHover: boolean;
    hoverOpacity?: number;
    center?: LngLatLike | undefined;
    zoom?: number;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    maxBounds?: [number, number][];
    setMaxBounds?: boolean;
    hash?: boolean;
    updateHash?: (URL) => void;
    useInitialHash?: boolean;
    mapHeight?: number;
  } = $props();
  $inspect(maxBounds);
  let styleLookup = {
    "Carto-light":
      "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    "Carto-dark":
      "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  };
  let style = $derived(styleLookup[styleSheet] ?? styleSheet);

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
    customPallet !== undefined
      ? customPallet
      : colorbrewer[colorPalette][numberOfBreaks],
  );

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
    } else {
      map?.cooperativeGestures.disable();
    }
  });

  let vals = $derived(
    filteredMapData.map((d) => d.metric).sort((a, b) => a - b),
  );

  let breaks = $derived(
    breaksType == "jenks"
      ? jenksBreaks(vals, numberOfBreaks)
      : quantileBreaks(vals, numberOfBreaks),
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

  $inspect(merged);

  let hoveredArea = $state();
  let hoveredAreaData = $state();
  let currentMousePosition = $state();

  function convertToLngLatBounds(coords: [number, number][]): LngLatBoundsLike {
    const bounds = new LngLatBounds(coords[0], coords[0]);

    for (let i = 1; i < coords.length; i++) {
      bounds.extend(coords[i]);
    }

    return bounds;
  }

  if (setMaxBounds) {
    let boundary = convertToLngLatBounds(maxBounds);
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
</script>

<div style="height: {mapHeight}px;">
  <MapLibre
    bind:map
    bind:loaded
    {style}
    {standardControls}
    {center}
    {zoom}
    {maxZoom}
    {minZoom}
    {...setMaxBounds ? { maxBounds: boundary } : {}}
    {hash}
    {updateHash}
    class="map"
  >
    {#if !standardControls}
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
    {/if}

    <Control>
      <ControlGroup>
        <button
          class="reset-button"
          onclick={() => {
            map.flyTo({
              center: center,
              zoom: zoom,
            });
          }}>Reset view</button
        ></ControlGroup
      >
    </Control>

    <GeoJSON id="areas" data={merged} promoteId="areanm">
      <FillLayer
        paint={{
          //Get the color property of the area, or lightgrey if that's undefined
          "fill-color": ["coalesce", ["get", "color"], "lightgrey"],
          "fill-opacity": changeOpacityOnHover
            ? hoverStateFilter(fillOpacity, hoverOpacity) //setting the fill-opacity based on whether the area is hovered
            : fillOpacity,
        }}
        beforeLayerType="symbol"
        manageHoverState
        onclick={(e) => zoomToArea(e)}
        onmousemove={(e) => {
          hoveredArea = e.features[0].id;
          hoveredAreaData = e.features[0].properties.metric;
          currentMousePosition = e.event.point;
        }}
        onmouseleave={(e) => {
          (hoveredArea = null), (hoveredAreaData = null);
        }}
      />
      {#if showBorder}
        <LineLayer
          layout={{ "line-cap": "round", "line-join": "round" }}
          paint={{
            "line-color": hoverStateFilter(borderColor, "orange"), //setting the colour based on whether the area is hovered
            "line-width": zoomTransition(3, 0, 12, maxBorderWidth), //setting the line-width based on the zoom level
          }}
          beforeLayerType="symbol"
        />
      {/if}
    </GeoJSON>
    {#if tooltip}
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
    padding: 0px 10px;
    font-size: 16px;
    height: 100%;
  }
</style>
