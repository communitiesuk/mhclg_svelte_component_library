<script>
  import { MapLibre } from "svelte-maplibre";
</script>

<MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  class="relative aspect-[9/16] max-h-[70vh] w-full sm:aspect-video sm:max-h-full"
  standardControls
  zoom={7}
  center={[-1.528050380418705, 52.55588660489852]}
/>
