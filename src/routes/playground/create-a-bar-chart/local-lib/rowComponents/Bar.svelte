<script>
  let { row, xFunction, barHeight, colours } = $props();
</script>

<rect
  width={Math.abs(xFunction(row.y) - xFunction(0))}
  height={barHeight}
  x={row.y < 0 ? xFunction(row.y) : xFunction(0)}
  fill={(row.y < 0) & colours.colourNegativeBars
    ? colours.negativeBarColour
    : row.colour}
/>
