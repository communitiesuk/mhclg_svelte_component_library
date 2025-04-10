<!-- <script>
  import { onMount, onDestroy } from "svelte";
  import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
  import "@maptiler/sdk/dist/maptiler-sdk.css";
  import states from "./lad2023.json";
  import topo from "./topo.json";
  import pconData from "./salary-pcon10.json";

  let { apiKey } = $props();

  // $inspect(topo);

  //Stolen from ons svelte-maps
  const colors = {
    seq5: [
      "rgb(234, 236, 177)",
      "rgb(169, 216, 145)",
      "rgb(0, 167, 186)",
      "rgb(0, 78, 166)",
      "rgb(0, 13, 84)",
    ],
    div10: [
      "#67001f",
      "#b2182b",
      "#d6604d",
      "#f4a582",
      "#fddbc7",
      "#d1e5f0",
      "#92c5de",
      "#4393c3",
      "#2166ac",
      "#053061",
    ],
  };
  let data = $state({});

  // async function getData(url) {
  //   let response = await fetch(url);
  //   let string = await response.text();
  //   let data = await csvParse(string, autoType);
  //   return data;
  // }

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
  data.pcon = pconData.map((d) => {
    return { ...d, color: getColor(d.salary, breaks, colors.seq5) };
  });

  // });

  //End stolen

  //Joining the data to the GeoJSON
  let obj2Map = data.pcon.reduce((map, item) => {
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

  // $inspect(obj2Map, obj1Map, merged);

  let map = $state();
  let mapContainer = $state();
  let hoveredStateId = $state();
  let hoveredStateName = $state();
  // $inspect(mapContainer, merged);

  config.apiKey = apiKey;

  onMount(() => {
    const initialState = { lng: -2.5879, lat: 51.4545, zoom: 9 };

    map = new Map({
      container: mapContainer,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    new Marker({ color: "#FF0000" }).setLngLat([-2.5879, 51.4545]).addTo(map);

    map.on("load", function () {
      map.addSource("states", {
        type: "geojson",
        data: merged,
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.addLayer(
        {
          id: "state-fills",
          type: "fill",
          source: "states",
          layout: {},
          paint: {
            // "fill-color": ["get", "color"],
            //Or use a step function to do the processing:
            "fill-color": [
              "step",
              ["get", "salary"], // Use "DENSITY" property for color mapping
              "#FFEDA0",
              100,
              "#FED976",
              200,
              "#FEB24C",
              500,
              "#FD8D3C",
              1000,
              "#FC4E2A",
              2000,
              "#E31A1C",
              3000,
              "#BD0026",
              7000,
              "#800026",
            ],
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.5,
            ],
            "fill-outline-color": "rgba(255, 255, 255, 0)",
          },
        },
        "Water", //The ID of the layer before which this layer will be added (I got the ID from map.style and looking at _layers)
      );
    });

    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on("mousemove", "state-fills", function (e) {
      console.log(e.features[0].properties.LAD23NM);
      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false },
          );
        }
        hoveredStateName = e.features[0].properties.LAD23NM;
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: true },
        );
      }
      // document.getElementById('pd').innerHTML = `<h3>${e.features[0].properties.STATE_NAME}</h3>
      // <p><strong><em>${e.features[0].properties.DENSITY}</strong> people per square mile</em></p>`;
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "state-fills", function () {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false },
        );
      }
      hoveredStateId = null;
      // document.getElementById('pd').innerHTML = `<p>Hover over a state!</p>`;
    });

    map.on("click", "state-fills", function (e) {
      // console.log(Object.entries(merged)[1][1], e.features);
      let coordArray =
        Object.entries(merged)[1][1].find(
          (d) => d.properties.LAD23NM == e.features[0].properties.LAD23NM,
        ).geometry.coordinates.length === 1
          ? Object.entries(merged)[1][1].find(
              (d) => d.properties.LAD23NM == e.features[0].properties.LAD23NM,
            ).geometry.coordinates[0]
          : //Do some extra processing to get the data in the right shape if the area has non-contiguous areas
            Object.entries(merged)[1][1]
              .find(
                (d) => d.properties.LAD23NM == e.features[0].properties.LAD23NM,
              )
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
    });
  });
  $inspect(map?.style);

  onDestroy(() => {
    map.remove();
  });
</script>

<a href="https://docs.maptiler.com/svelte/"
  >From https://docs.maptiler.com/svelte/</a
>

<p>Hovered area: {hoveredStateName}</p>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer}></div>
</div>

<style>
  .heading {
    margin: 0;
    padding: 0px;
    background-color: black;
    color: white;
    text-align: center;
  }

  .heading > h1 {
    padding: 20px;
    margin: 0;
  }

  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(
      100vh - 77px
    ); /* calculate height of the screen minus the heading */
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style> -->
