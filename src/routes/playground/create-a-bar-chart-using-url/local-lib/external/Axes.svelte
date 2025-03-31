<script>
  let { chartHeight, chartWidth, yFunction } = $props();
</script>

<g data-role="x-axis">
  <path
    transform="translate({yFunction(0)},0)"
    d="M0 0 l0 {chartHeight}"
    stroke="black"
    stroke-width="2px"
  ></path>
  {#each [0, 1, 2, 3, 4, 5] as tick}
    <path
      transform="translate({(chartWidth * tick) / 5},0)"
      d="M0 0 l0 -8"
      stroke="black"
      stroke-width="2px"
    ></path>
  {/each}
</g>
<g data-role="y-axis">
  <path d="M0 0 l{chartWidth + 1} 0" stroke="black" stroke-width="2px"></path>
</g>
