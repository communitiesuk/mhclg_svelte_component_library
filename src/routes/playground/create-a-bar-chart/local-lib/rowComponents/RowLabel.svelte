<script>
  let { row, barHeight } = $props();
  $inspect(row);
</script>

<g transform="translate({-30},{0})">
  <text x={-70} y={barHeight}>{row.areaCode}</text>
</g>
