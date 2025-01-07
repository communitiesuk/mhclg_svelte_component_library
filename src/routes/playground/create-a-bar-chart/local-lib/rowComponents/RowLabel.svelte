<script>
  let { row, barHeight } = $props();
  $inspect(row);
</script>

<g transform="translate({-30},{barHeight/2})">
  <text dominant-baseline="central" x={-70} y={0}>{row.areaCode}</text>
</g>
