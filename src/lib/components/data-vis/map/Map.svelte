<script>
  import { MapLibre } from "svelte-maplibre";
</script>

<MapLibre
  center={[-2.5879, 51.4545]}
  zoom={9}
  class="map"
  standardControls
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  cooperativeGestures
/>

<style>
  :global(.map) {
    height: 500px;
    max-width: 70vw;
  }
</style>
