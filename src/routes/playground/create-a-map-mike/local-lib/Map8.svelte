<script>
  import maplibregl from "maplibre-gl";
  import { onMount } from "svelte";

  let { apiKey } = $props();

  // Create a map style object using the ZXY service.
  const style = {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [
          "https://api.os.uk/maps/raster/v1/zxy/Light_3857/{z}/{x}/{y}.png?key=" +
            apiKey,
          //Would like to be able to do something like the folowing:
          //   "/api/tiles/{z}/{x}/{y}/",
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "os-maps-zxy",
        type: "raster",
        source: "raster-tiles",
      },
    ],
  };
  $inspect(style);

  onMount(() => {
    // Initialize the map object.
    const map = new maplibregl.Map({
      container: "map",
      minZoom: 6,
      maxZoom: 19,
      style: style,
      maxBounds: [
        [-10.76418, 49.528423],
        [1.9134116, 61.331151],
      ],
      center: [-2.5879, 51.4545],
      zoom: 9,
      attributionControl: true,
      //   cooperativeGestures: true,
    });

    map.dragRotate.disable(); // Disable map rotation using right click + drag.
    map.touchZoomRotate.disableRotation(); // Disable map rotation using touch rotation gesture.

    // Add navigation control (excluding compass button) to the map.
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
      }),
    );
  });
</script>

<div id="map" class="map"></div>

<style>
  :global(.map) {
    height: 500px;
  }
</style>
