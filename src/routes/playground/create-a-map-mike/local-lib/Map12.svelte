<script>
  import pkg from "mapbox-gl";
  const { Map } = pkg;
  import "mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";

  let map;
  let mapContainer;
  let lng, lat, zoom;
  //Style taken from https://github.com/ONSvisual/svelte-maps/blob/main/dist/data/style-osm-grey.json
  let mapStyle = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          '<a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>',
        maxzoom: 17,
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
        paint: {
          "raster-saturation": -1,
        },
      },
    ],
  };

  lng = -2.5879;
  lat = 51.4545;
  zoom = 9;

  let initialState = { lng, lat, zoom };

  onMount(() => {
    map = new Map({
      container: mapContainer,
      style: mapStyle,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.on("move", () => {
      updateData();
    });
  });

  onDestroy(() => {
    map?.remove();
  });

  function updateData() {
    zoom = map.getZoom();
    lng = map.getCenter().lng;
    lat = map.getCenter().lat;
  }

  function handleReset() {
    map.flyTo({
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      essential: true,
    });
  }
</script>

<button onclick={handleReset} class="reset-button">Reset</button>

<div class="map" bind:this={mapContainer}></div>

<div class="sidebar">
  Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom:
  {zoom.toFixed(2)}
</div>

<style>
  /* .map {
    position: absolute;
    width: 100%;
    height: 100%;
  } */

  :global(.map) {
    max-height: 500px;
  }

  .sidebar {
    background-color: rgb(35 55 75 / 90%);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    position: relative;
    top: 0;
    left: 0;
    margin: 12px;
    border-radius: 4px;
    max-width: calc(70% - 18px);
  }

  .reset-button {
    position: relative;
    top: 50px;
    z-index: 1;
    left: 12px;
    padding: 4px 10px;
    border-radius: 10px;
    cursor: pointer;
    background: whitesmoke;
    border-width: 1px;
    border-color: black;
  }
</style>
