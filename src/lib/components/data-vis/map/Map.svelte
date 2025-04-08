<script lang="ts">
  //@ts-nocheck
  import type maplibregl from "maplibre-gl";
  import { MapLibre, GeoJSON, FillLayer, LineLayer } from "svelte-maplibre";
  // import states from "./lad2023.json";
  import { contrastingColor } from "./colors.ts";
  import { hoverStateFilter } from "svelte-maplibre/filters.js";
  import type { ExpressionSpecification } from "maplibre-gl";
  // import topo from "./topo.json";
  import fullTopo from "./fullTopo.json";
  import pconData from "./salary-pcon10.json";
  import * as topojson from "topojson-client";
  import Tooltip from "./Tooltip.svelte";

  let {
    data,
    cooperativeGestures,
    showBorder,
    tooltip,
    clickToZoom,
    geoType,
    year,
  } = $props();

  const geojsonData = $derived(
    topojson.feature(fullTopo, fullTopo.objects[geoType]),
  );

  function filterGeo(geo, year) {
    let filtered = JSON.parse(JSON.stringify(geo));
    filtered.features = filtered.features
      .filter((f) => {
        return (
          !(f.properties.end && f.properties.end < year) &&
          !(f.properties.start && f.properties.start > year)
        );
      })
      .map((f) => {
        f.properties = f.properties = {
          areacd: f.properties.areacd,
          areanm: f.properties.areanm,
        };
        return f;
      });
    return filtered;
  }

  let filteredGeoJsonData = $derived(filterGeo(geojsonData, year));

  // let showBorder = $state(true);
  let showFill = $state(true);
  let fillColor = $state([
    "#ffffcc",
    "#a1dab4",
    "#41b6c4",
    "#2c7fb8",
    "#253494",
  ]);
  let borderColor = $state("#003300");

  let map: maplibregl.Map | undefined = $state();
  // $inspect(map?.cooperativeGestures);

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

  $effect(() => {});
  let dataWithColor = pconData.map((d) => {
    return { ...d, color: getColor(d.salary, breaks, fillColor) };
  });

  //Joining the data to the GeoJSON
  let obj2Map = dataWithColor.reduce((map, item) => {
    map[item.LAD23CD] = item; // Use 'LAD23CD' as the key for the second map
    return map;
  }, {});

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
      // Get the matching item from obj2Map based on the LAD23CD
      const match = obj2Map[item1.properties.areacd];
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
  });

  // $inspect(merged);

  let hoveredArea = $state();
  let currentMousePosition = $state();
</script>

<MapLibre
  bind:map
  bind:loaded
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="map"
  standardControls
  center={[-2.5, 53]}
  zoom={5}
>
  <GeoJSON id="states" data={merged} promoteId="areanm">
    {#if showFill}
      <FillLayer
        paint={{
          // "fill-color": hoverStateFilter(fillColor[0], colors[0].hoverBgColor),
          "fill-color": ["get", "color"],
          "fill-opacity": 0.5,
        }}
        beforeLayerType="symbol"
        manageHoverState
        onclick={(e) => {
          if (clickToZoom) {
            let coordArray =
              //Note this is very similar to using a GeoJSON - only change is it's [1][1] instead of [2][1]
              Object.entries(geojsonData)[1][1].find(
                (d) => d.properties.areanm == e.features[0].id,
              ).geometry.coordinates.length === 1
                ? Object.entries(geojsonData)[1][1].find(
                    (d) => d.properties.areanm == e.features[0].id,
                  ).geometry.coordinates[0]
                : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
                  Object.entries(geojsonData)[1][1]
                    .find((d) => d.properties.areanm == e.features[0].id)
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
          }
        }}
        onmousemove={(e) => {
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
          "line-width": 1,
        }}
        beforeLayerType="symbol"
      />
    {/if}
  </GeoJSON>
  {#if tooltip}
    <Tooltip {currentMousePosition} {hoveredArea} />
  {/if}
</MapLibre>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
