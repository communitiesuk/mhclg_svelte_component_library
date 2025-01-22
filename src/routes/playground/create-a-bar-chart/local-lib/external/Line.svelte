<script>
  let { xEqualsZeroLine, chartWidth, chartHeight } = $props();
</script>

<svg height={chartHeight} width={chartWidth} xmlns="http://www.w3.org/2000/svg">
  <line
    x1={xEqualsZeroLine}
    y1="0"
    x2={xEqualsZeroLine}
    y2={chartHeight}
    style="stroke:black;stroke-width:1"
  />
</svg>
