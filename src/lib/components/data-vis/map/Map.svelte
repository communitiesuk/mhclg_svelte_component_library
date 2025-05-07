<script lang="ts">
  //@ts-nocheck

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
  import { contrastingColor, colorPalette } from "./colors";
  import { colorbrewer } from "./colorbrewer.js";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { maplibregl, ExpressionSpecification } from "maplibre-gl";
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

  let {
    data,
    cooperativeGestures,
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
    colorPalette = "YlGnBu",
    showBorder = false,
    maxBorderWidth = 1.5,
    tooltip,
    clickToZoom = true,
    geoType,
    year,
    metric,
    breaksType,
    numberOfBreaks = 5,
    fillOpacity = 0.5,
    changeOpacityOnHover = true,
    hoverOpacity = 0.8,
    center = [-2.5, 53],
    zoom = 5,
  } = $props();

  let mapData = $derived(data?.filter((d) => d.year == year)[0]?.data);

  let filteredMapData = $derived(
    mapData.map((el) => ({
      areaCode: el.areaCode,
      areaName: el.areaName,
      metric: +el.data[metric],
    })),
  );

  const geojsonData = $derived(
    topojson.feature(fullTopo, fullTopo.objects[geoType]),
  );

  let filteredGeoJsonData = $derived(filterGeo(geojsonData, year));

  let fillColor = $derived(colorbrewer[colorPalette][numberOfBreaks]);

  let borderColor = "#003300";

  let map: maplibregl.Map | undefined = $state();

  let loaded = $state(false);
  let textLayers: maplibregl.LayerSpecification[] = $derived(
    map && loaded
      ? map.getStyle().layers.filter((layer) => {
          return layer.type === "symbol" && layer["source-layer"] === "place";
        })
      : [],
  );

  let colors = $derived(fillColor.map((d) => contrastingColor(d)));
  $effect(() => {
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
        color: getColor(d.metric, breaks, fillColor),
      };
    }),
  );

  //Joining the data to the GeoJSON
  let obj2Map = $derived(
    dataWithColor?.reduce((map, item) => {
      map[item.areaCode] = item; // Use 'areaCode' as the key for the second map
      return map;
    }, {}),
  );

  let obj1Map = $derived(
    filteredGeoJsonData.features.reduce((map, item) => {
      map[item.properties.areacd] = item; // Use 'areacd' from properties as the key for the first map
      return map;
    }, {}),
  );

  // Merge both datasets
  let merged = $derived({
    type: "FeatureCollection",
    features: filteredGeoJsonData.features.map((item1) => {
      // Get the matching item from obj2Map based on the areaCode
      const match = obj2Map[item1.properties.areacd];

      // If a match exists, merge the 'metric' and 'color' into the 'properties' of item1
      if (match) {
        return {
          ...item1, // Keep all properties of the feature
          properties: {
            ...item1.properties, // Keep the existing properties (like areaCode, etc.)
            metric: +match?.metric, // Add metric from the match
            color: match?.color, // Add color from the match
          },
        };
      }

      // If no match, just return the feature as is
      return item1;
    }),
    crs: { properties: { name: "EPSG:4326" }, type: "name" },
  });

  let hoveredArea = $state();
  let hoveredAreaData = $state();
  let currentMousePosition = $state();

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
</script>

<MapLibre
  bind:map
  bind:loaded
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  {standardControls}
  {center}
  {zoom}
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

<style>
  :global(.map) {
    height: 500px;
  }

  :global(.maplibregl-ctrl-group button.reset-button) {
    /* margin: 10px; */
    width: fit-content;
    padding: 0px 10px;
    font-size: 16px;
  }
</style>
