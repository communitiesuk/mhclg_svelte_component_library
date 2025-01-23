<script>
  let { scaledValue, value, max, barColor, selected, rowHeight } = $props();
  $inspect(max);
  let textAnchor = $derived(
    max
      ? 'text-anchor: end;'
      : scaledValue >= 0
        ? 'text-anchor: start;'
        : 'text-anchor: end;'
  );
  let textColor = $derived(selected ? '#222' : max ? barColor.text : '#222');
</script>

<text
  transform="translate ({scaledValue} 0)"
  dx={max ? -10 : scaledValue >= 0 ? '10' : '-10'}
  style={textAnchor + ' fill: ' + textColor}>{value}</text
>

<style>
  text {
    dominant-baseline: middle;
    transition: x 1000ms;
    font-weight: 700;
    pointer-events: none;
  }
</style>
