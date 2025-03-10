<script lang="ts">
  //@ts-nocheck
  import type maplibregl from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { GeoJSON } from "svelte-maplibre";
  import { FillLayer } from "svelte-maplibre";
  import { LineLayer } from "svelte-maplibre";
  // import { mapClasses } from '../styles.js';
  import states from "./lad2023.json";
  import { contrastingColor } from "./colors.js";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { ExpressionSpecification } from "maplibre-gl";
  import topo from "./topo.json";
  import * as topojson from "topojson-client";

  const geojsonData = topojson.feature(topo, topo.objects.lad2023);
  let showBorder = $state(true);
  let showFill = $state(true);
  let fillColor = $state("#006600");
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

  let colors = $derived(contrastingColor(fillColor));
  $effect(() => {
    for (let layer of textLayers) {
      map?.setPaintProperty(layer.id, "text-color", colors.textColor);
      map?.setPaintProperty(
        layer.id,
        "text-halo-color",
        colors.textOutlineColor,
      );
    }

    // console.log(map?.getLayersOrder());
  });

  let filterStates = $state(false);
  let filter: ExpressionSpecification | undefined = $derived(
    filterStates ? ["==", "B", ["slice", ["get", "LAD23NM"], 0, 1]] : undefined,
  );
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

<MapLibre
  bind:map
  bind:loaded
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  standardControls
  center={[-2.5879, 51.4545]}
  zoom={9}
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
</MapLibre>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
