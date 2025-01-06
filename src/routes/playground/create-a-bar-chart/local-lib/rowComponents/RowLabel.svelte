<script>
  let { row } = $props();
  $inspect(row);
</script>

<g transform="translate({-30},{0})">
  <text x={-70} y={10}>{row.areaCode}</text>
</g>
