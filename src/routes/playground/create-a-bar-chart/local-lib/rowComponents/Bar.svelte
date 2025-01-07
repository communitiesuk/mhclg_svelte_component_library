<script>
  let { row, xFunction, barHeight, focusColour, focusBars } = $props();
</script>

<rect
  width={xFunction(row.y)}
  height={barHeight}
  fill={focusBars.includes(row.areaCode) ? focusColour : '#bababa'}
/>
