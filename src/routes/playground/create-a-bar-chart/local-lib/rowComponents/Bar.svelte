<script>
  let { rowHeight, rowWidth, barColor } = $props();
</script>

<svg>
  <rect
    width={rowWidth}
    height={rowHeight * 0.8}
    fill={barColor}
    style="stroke-width:1;stroke:#00008B"
  />
</svg>
