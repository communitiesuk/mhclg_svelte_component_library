<script>
  let { rowHeight, rowWidth, barColor } = $props();
</script>

<svg>
  <rect
    width={rowWidth}
    height={rowHeight}
    fill={barColor}
    style="stroke-width:1;stroke:#00008B"
  />
</svg>
