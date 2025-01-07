<script>
  let { rowHeight } = $props();
  // let { row } = $props();
</script>

<!-- <g class="row-group">
  <Bar></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g> -->

<svg>
  <rect
    width="400"
    height={rowHeight}
    style="fill:#ADD8E6;stroke-width:1;stroke:#00008B"
  />
</svg>
