<script>
  let { scaledValue, value, max, rowHeight } = $props();
  $inspect(max);
</script>

<text
  transform="translate ({scaledValue} 0)"
  dx={max ? -10 : scaledValue >= 0 ? '10' : '-10'}
  style={max
    ? 'text-anchor: end'
    : scaledValue >= 0
      ? 'text-anchor: start'
      : 'text-anchor: end'}>{value}</text
>

<style>
  text {
    dominant-baseline: middle;
    transition: x 1000ms;
  }
</style>
