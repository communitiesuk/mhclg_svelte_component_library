<script>
  let { scaledValue, value, rowHeight } = $props();
</script>

<text
  transform="translate ({scaledValue} 0)"
  dx={rowHeight > 18 ? '-10' : '10'}
  style={rowHeight > 18 ? 'text-anchor: end' : 'text-anchor: start'}
  >{value}</text
>

<style>
  text {
    dominant-baseline: middle;
    transition: x 1000ms;
  }
</style>
