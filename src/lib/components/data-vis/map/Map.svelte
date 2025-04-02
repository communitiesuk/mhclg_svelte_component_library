<script lang="ts">
  //@ts-nocheck
  import type maplibregl from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { GeoJSON } from "svelte-maplibre";
  import { FillLayer } from "svelte-maplibre";
  import { LineLayer } from "svelte-maplibre";
  // import { mapClasses } from '../styles.js';
  import states from "./lad2023.json";
  import { contrastingColor } from "./colors.ts";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { ExpressionSpecification } from "maplibre-gl";
  import topo from "./topo.json";
  import * as topojson from "topojson-client";
  import Tooltip from "./Tooltip.svelte";

  const geojsonData = topojson.feature(topo, topo.objects.lad2023);
  let showBorder = $state(true);
  let showFill = $state(true);
  let fillColor = $state(["#006600", "#207093", "#123345", "red", "pink"]);
  let borderColor = $state("#003300");

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
  });

  let filterStates = $state(false);
  let filter: ExpressionSpecification | undefined = $derived(
    filterStates ? ["==", "B", ["slice", ["get", "LAD23NM"], 0, 1]] : undefined,
  );
  let hoveredArea = $state();
  let currentMousePosition = $state();
</script>

<div class="grid w-full max-w-md items-center gap-y-2 self-start">
  <label><input type="checkbox" bind:checked={showFill} /> Show fill</label>
  <label><input type="color" bind:value={fillColor} /> Fill Color </label>
  <label><input type="checkbox" bind:checked={showBorder} /> Show border</label>
  <label><input type="color" bind:value={borderColor} /> Border Color </label>
</div>
<label
  ><input type="checkbox" bind:checked={filterStates} /> Only show LAs starting with
  'B'</label
>
<p>{hoveredArea}</p>

<MapLibre
  bind:map
  bind:loaded
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  standardControls
  center={[-2.5879, 51.4545]}
  zoom={9}
  cooperativeGestures
>
  <GeoJSON id="states" data={geojsonData} promoteId="LAD23NM">
    {#if showFill}
      <FillLayer
        paint={{
          "fill-color": hoverStateFilter(fillColor, colors.hoverBgColor),
          "fill-opacity": 0.5,
        }}
        {filter}
        beforeLayerType="symbol"
        manageHoverState
        onclick={(e) => {
          console.log(Object.entries(geojsonData)[1][1]);
          let coordArray =
            //Note this is very similar to using a GeoJSON - only change is it's [1][1] instead of [2][1]
            Object.entries(geojsonData)[1][1].find(
              (d) => d.properties.LAD23NM == e.features[0].id,
            ).geometry.coordinates.length === 1
              ? Object.entries(geojsonData)[1][1].find(
                  (d) => d.properties.LAD23NM == e.features[0].id,
                ).geometry.coordinates[0]
              : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
                Object.entries(geojsonData)[1][1]
                  .find((d) => d.properties.LAD23NM == e.features[0].id)
                  .geometry.coordinates.flat(2);
          // console.log(coordArray);

          let minValues = [
            Math.min(...coordArray.map((d) => +d[0])),
            Math.max(...coordArray.map((d) => +d[0])),
          ];

          let maxValues = [
            Math.min(...coordArray.map((d) => +d[1])),
            Math.max(...coordArray.map((d) => +d[1])),
          ];
          // console.log(minValues, maxValues);

          map?.fitBounds([
            [minValues[0], maxValues[0]],
            [minValues[1], maxValues[1]],
          ]);
        }}
        onmousemove={(e) => {
          // console.log(e);
          hoveredArea = e.features[0].id;
          currentMousePosition = e.event.point;
        }}
      />
    {/if}
    {#if showBorder}
      <LineLayer
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-color": hoverStateFilter(borderColor, "orange"), // Neat svelte-maplibre method for setting the colour based on whether the area is hovered
          "line-width": 3,
        }}
        beforeLayerType="symbol"
      />
    {/if}
  </GeoJSON>
  <Tooltip {currentMousePosition} {hoveredArea} />
</MapLibre>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
