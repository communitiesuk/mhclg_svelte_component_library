<script>
  let { scaledValue, value, rowLabel, selectedBar } = $props();
</script>

<text x={scaledValue} dx="-10">{value}</text>

<style>
  text {
    text-anchor: end;
    dominant-baseline: middle;
    transition: x 1000ms;
  }
</style>
