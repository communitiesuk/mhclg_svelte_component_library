<script>
  let { rowHeight, barWidth, barColor } = $props();
</script>

<svg>
  <rect
    width={barWidth}
    height={rowHeight * 0.8}
    fill={barColor}
    style="stroke-width:1;stroke:#00008B"
  />
</svg>
