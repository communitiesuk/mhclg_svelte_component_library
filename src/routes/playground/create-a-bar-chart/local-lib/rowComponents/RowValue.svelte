<script>
  let { row, xFunction, barHeight } = $props();
  let offsetX = $derived(xFunction(row.y));
  $inspect(offsetX);
</script>

<g transform="translate({offsetX},{barHeight/2})">
  <text dominant-baseline="central" x={0} y={0} text-anchor={row.y > 0 ? "start" : "end"}>{row.y}</text>
</g>
