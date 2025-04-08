<script lang="ts">
  //@ts-nocheck
  import type maplibregl from "maplibre-gl";
  import { MapLibre } from "svelte-maplibre";
  import { GeoJSON } from "svelte-maplibre";
  import { FillLayer } from "svelte-maplibre";
  import { LineLayer } from "svelte-maplibre";
  // import { mapClasses } from '../styles.js';
  import states from "./lad2023.json";
  import pconData from "./salary-pcon10.json";
  import { contrastingColor } from "./colors";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { ExpressionSpecification } from "maplibre-gl";
  import MapLegend from "./MapLegend.svelte";

  let showBorder = $state(true);
  let showFill = $state(true);
  let fillColor = $state(["#006600", "#207093", "#123345", "red", "pink"]);
  let borderColor = $state("#003300");
  // $inspect(fillColor);

  let map: maplibregl.Map | undefined = $state();
  // $inspect(map);
  let loaded = $state(false);
  let textLayers: maplibregl.LayerSpecification[] = $derived(
    map && loaded
      ? map.getStyle().layers.filter((layer) => {
          return layer.type === "symbol" && layer["source-layer"] === "place";
        })
      : [],
  );

  let colors = $derived(fillColor.map((d) => contrastingColor(d)));
  // $inspect(colors);
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

  function getColor(value, breaks, colors) {
    let color;
    let found = false;
    let i = 1;
    while (found == false) {
      if (value <= breaks[i]) {
        color = colors[i - 1];
        found = true;
      } else {
        i++;
      }
    }
    return color ? color : "lightgrey";
  }

  // Get data for geojson maps
  // getData(pconData).then((res) => {
  let vals = pconData.map((d) => d.salary).sort((a, b) => a - b);
  let len = vals.length;
  let breaks = [
    vals[0],
    vals[Math.floor(len * 0.2)],
    vals[Math.floor(len * 0.4)],
    vals[Math.floor(len * 0.6)],
    vals[Math.floor(len * 0.8)],
    vals[len - 1],
  ];
  let dataWithColor = pconData.map((d) => {
    return { ...d, color: getColor(d.salary, breaks, fillColor) };
  });

  //Joining the data to the GeoJSON
  let obj2Map = dataWithColor.reduce((map, item) => {
    map[item.LAD23CD] = item; // Use 'LAD23CD' as the key for the second map
    return map;
  }, {});

  let obj1Map = states.features.reduce((map, item) => {
    map[item.properties.LAD23CD] = item; // Use 'LAD23CD' from properties as the key for the first map
    return map;
  }, {});

  // Merge both datasets
  let merged = {
    type: "FeatureCollection",
    features: states.features.map((item1) => {
      // Get the matching item from obj2Map based on the LAD23CD
      const match = obj2Map[item1.properties.LAD23CD];

      // If a match exists, merge the 'salary' and 'color' into the 'properties' of item1
      if (match) {
        return {
          ...item1, // Keep all properties of the feature
          properties: {
            ...item1.properties, // Keep the existing properties (like LAD23CD, etc.)
            salary: match.salary, // Add salary from the match
            color: match.color, // Add color from the match
          },
        };
      }

      // If no match, just return the feature as is
      return item1;
    }),
    crs: { properties: { name: "EPSG:4326" }, type: "name" },
  };
  // $inspect(merged);
  let hoveredArea = $state();
  let hoveredAreaProperties = $state();
  let parentDiv = $state();
  //It looks like we can't use the mapContainer binding that's available within svelte-maplibre as it doesn't track state changes for the container's properties
  let canvasWidth = $derived(parentDiv?.offsetWidth);
  let divWidth = $state();
  $inspect({ canvasWidth, divWidth });
</script>

<!-- <div class="grid w-full max-w-md items-center gap-y-2 self-start">
  <label><input type="checkbox" bind:checked={showFill} /> Show fill</label>
  <label><input type="color" bind:value={fillColor[0]} /> Fill Color </label>
  <label><input type="checkbox" bind:checked={showBorder} /> Show border</label>
  <label><input type="color" bind:value={borderColor} /> Border Color </label>
</div>
<label
  ><input type="checkbox" bind:checked={filterStates} /> Only show LAs starting with
  'B'</label
> -->

<div bind:offsetWidth={divWidth}>
  <MapLibre
    bind:map
    bind:loaded
    bind:mapContainer={parentDiv}
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
    <GeoJSON id="states" data={merged} promoteId="LAD23NM">
      {#if showFill}
        <FillLayer
          paint={{
            // "fill-color": hoverStateFilter(fillColor[0], colors[0].hoverBgColor),
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          }}
          {filter}
          beforeLayerType="symbol"
          manageHoverState
          onmousemove={(e) => {
            hoveredArea = e.features[0].id;
            hoveredAreaProperties = e.features[0].properties;
          }}
          id="LAD23NM"
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
    {#key canvasWidth}
      <MapLegend
        {fillColor}
        canvasWidth={0.7 * divWidth}
        {hoveredAreaProperties}
      />
    {/key}
  </MapLibre>
</div>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
