<script>
  let { row, xFunction } = $props();
  let offsetX = $derived(xFunction(row.y) + 10); // Reactive declaration
$inspect(offsetX)

</script>

<g transform="translate({offsetX},{0})">
    <text x={0} y={10}>{row.y}</text>
  </g>