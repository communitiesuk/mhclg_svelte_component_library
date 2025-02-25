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

  let showBorder = $state(true);
  let showFill = $state(true);
  let fillColor = $state(["#006600", "#207093", "#123345"]);
  let borderColor = $state("#003300");
  $inspect(fillColor);

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
  $inspect(colors);
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
</script>

<div class="grid w-full max-w-md items-center gap-y-2 self-start">
  <label><input type="checkbox" bind:checked={showFill} /> Show fill</label>
  <label><input type="color" bind:value={fillColor[0]} /> Fill Color </label>
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
  style={{
    // Can be a json style definition or a url
    version: 8,
    sources: {},
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "lightgrey" },
      },
    ],
  }}
  class="map"
  standardControls
  center={[-2.5879, 51.4545]}
  zoom={9}
>
  <GeoJSON id="states" data={states} promoteId="LAD23NM">
    {#if showFill}
      <FillLayer
        paint={{
          "fill-color": hoverStateFilter(fillColor[0], colors[0].hoverBgColor),
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
        paint={{ "line-color": borderColor, "line-width": 3 }}
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
