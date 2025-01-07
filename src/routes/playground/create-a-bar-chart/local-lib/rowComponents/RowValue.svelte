<script>
  let { row, xFunction, barHeight } = $props();
  let offsetX = $derived(xFunction(row.y) + 10); // Reactive declaration
  $inspect(offsetX);
</script>

<g transform="translate({offsetX},{barHeight/2})">
  <text dominant-baseline="central" x={0} y={0}>{row.y}</text>
</g>
