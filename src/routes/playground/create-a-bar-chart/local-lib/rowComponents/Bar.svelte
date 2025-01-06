<script>
  let { row, xFunction, barHeight} = $props();

</script>

<rect width={xFunction(row.y)} height={barHeight} fill={row.y > 30 ? "blue" : "red"}/>
