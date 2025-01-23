<script>
  let { row, xFunction, barHeight, focusColour, focusBars } = $props();
</script>

<rect
  width={xFunction(Math.abs(row.y))}
  height={barHeight}
  x={(row.y < 0 ? xFunction(row.y) - xFunction(0) : xFunction(0))}
  fill={focusBars.includes(row.areaCode) ? focusColour : '#bababa'}
/>
