<script>
  let { scaledValue, value, rowHeight } = $props();
</script>

<text
  transform="translate ({scaledValue} 0)"
  dx={rowHeight > 18 ? (scaledValue >= 0 ? '-10' : '10') : 10}
  style={rowHeight > 18
    ? scaledValue >= 0
      ? 'text-anchor: end'
      : 'text-anchor: start'
    : 'text-anchor: start'}>{value}</text
>

<style>
  text {
    dominant-baseline: middle;
    transition: x 1000ms;
  }
</style>
