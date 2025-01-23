<script>
  let { row, xFunction, barHeight, focusColour } = $props();
</script>

<rect
  width={Math.abs(xFunction(row.y)-xFunction(0))}
  height={barHeight}
  x={(row.y < 0 ? xFunction(row.y) : xFunction(0))}
  fill='#bababa'
/>
