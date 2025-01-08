<script>
  // this information is passed in when the component is called
  let { rowHeight, rowWidth } = $props();
  // let { row } = $props();

  $inspect(rowWidth);
</script>

<!-- <g class="row-group">
  <Bar></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g> -->

<svg>
  <rect
    width={rowWidth}
    height={rowHeight}
    style="fill:#ADD8E6;stroke-width:1;stroke:#00008B"
  />
</svg>
