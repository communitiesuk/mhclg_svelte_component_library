<script lang="ts">
  //@ts-nocheck
  import type maplibregl from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { GeoJSON } from "svelte-maplibre";
  import { FillLayer } from "svelte-maplibre";
  import { LineLayer } from "svelte-maplibre";
  // import { mapClasses } from '../styles.js';
  import states from "./lad2023.json";
  import { contrastingColor } from "./colors";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { ExpressionSpecification } from "maplibre-gl";
  import Tooltip from "./Tooltip.svelte";

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
  });

  let filterStates = $state(false);
  let filter: ExpressionSpecification | undefined = $derived(
    filterStates ? ["==", "B", ["slice", ["get", "LAD23NM"], 0, 1]] : undefined,
  );
  let hoveredArea = $state();
  let searchValue = $state("");

  const findArea = (e) => {
    e.preventDefault();
    let coordArray =
      Object.entries(states)[2][1].find((d) =>
        d.properties.LAD23NM.toLowerCase().includes(searchValue.toLowerCase()),
      ).geometry.coordinates.length === 1
        ? Object.entries(states)[2][1].find((d) =>
            d.properties.LAD23NM.toLowerCase().includes(
              searchValue.toLowerCase(),
            ),
          ).geometry.coordinates[0]
        : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
          Object.entries(states)[2][1]
            .find((d) =>
              d.properties.LAD23NM.toLowerCase().includes(
                searchValue.toLowerCase(),
              ),
            )
            .geometry.coordinates.flat(2);

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
  };

  let currentMousePosition = $state();
  $inspect(currentMousePosition);
</script>

<p>Hovered area: {hoveredArea}</p>
<p>Search value: {searchValue}</p>

<MapLibre
  bind:map
  bind:loaded
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  standardControls
  center={[-2.5879, 51.4545]}
  zoom={9}
>
  <GeoJSON id="states" data={states} promoteId="LAD23NM">
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
          searchValue = e.features[0].id;
          let coordArray =
            Object.entries(states)[2][1].find(
              (d) => d.properties.LAD23NM == e.features[0].id,
            ).geometry.coordinates.length === 1
              ? Object.entries(states)[2][1].find(
                  (d) => d.properties.LAD23NM == e.features[0].id,
                ).geometry.coordinates[0]
              : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
                Object.entries(states)[2][1]
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
          currentMousePosition = e.event.point;
          hoveredArea = e.features[0].id;
        }}
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
  <Tooltip {currentMousePosition} {hoveredArea} />
</MapLibre>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
