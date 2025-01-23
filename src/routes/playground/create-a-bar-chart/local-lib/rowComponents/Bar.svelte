<script>
  let { row, xFunction, barHeight, focusColour, focusBars } = $props();
</script>

<rect
  width={Math.abs(xFunction(row.y)-xFunction(0))}
  height={barHeight}
  x={(row.y < 0 ? xFunction(row.y) : xFunction(0))}
  fill={focusBars.includes(row.areaCode) ? focusColour : '#bababa'}
/>
