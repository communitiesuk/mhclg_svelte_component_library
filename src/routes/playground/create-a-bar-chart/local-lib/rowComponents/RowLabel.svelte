<script>
  let { row, barHeight } = $props();
  $inspect(row);
</script>

<g transform="translate({-30},{barHeight})">
  <text x={-70} y={0}>{row.areaCode}</text>
</g>
