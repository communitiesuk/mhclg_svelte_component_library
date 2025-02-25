<script>
  import { onMount, onDestroy } from "svelte";
  import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
  import "@maptiler/sdk/dist/maptiler-sdk.css";

  let map = $state();
  let mapContainer = $state();
  $inspect(mapContainer);

  config.apiKey = "kVCqOKEzaCneaDROeFHC";

  onMount(() => {
    const initialState = { lng: -2.5879, lat: 51.4545, zoom: 9 };

    map = new Map({
      container: mapContainer,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    new Marker({ color: "#FF0000" }).setLngLat([139.7525, 35.6846]).addTo(map);
  });

  //   onDestroy(() => {
  //     map.remove();
  //   });
</script>

<a href="https://docs.maptiler.com/svelte/"
  >From https://docs.maptiler.com/svelte/</a
>

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
</style>
