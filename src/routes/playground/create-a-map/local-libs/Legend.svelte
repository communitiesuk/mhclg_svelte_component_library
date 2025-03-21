<script>
  import * as d3 from "d3";
  let { colorScale } = $props();
  var legend = d3.legendColor().scale(colorScale);
</script>

<div class="legend"></div>

<style>
  .legend {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 5px;
    pointer-events: none;
    font-size: 12px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>
