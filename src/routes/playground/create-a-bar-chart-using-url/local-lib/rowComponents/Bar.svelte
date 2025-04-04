<script>
  let { row, yFunction, rowHeight } = $props();
</script>

<line
  stroke-width="{rowHeight - 5}px"
  x1={yFunction(0)}
  x2={yFunction(row.y)}
  y1="0"
  y2="0"
  stroke={row.color ?? "black"}
></line>
