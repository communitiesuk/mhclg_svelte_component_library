<script>
  import D3Maps from "./local-libs/D3Maps.svelte";
  import Map from "./local-libs/Map.svelte";
  //mport D3Maps from  "./local-libs/D3Maps.svelte";
</script>

<div class="chart-container">
  <div class="row-chart-container">
    <h1>Map Libre svelte Map</h1>
    <Map></Map>
    <h1>d3 Map</h1>
    <D3Maps></D3Maps>
  </div>
</div>

<style>
  .chart-container {
    margin: 0px auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>
