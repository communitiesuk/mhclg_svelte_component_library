<script>
  let { ticksArray, chartWidth, yFunction } = $props();
</script>

{#each ticksArray as tick, i}
  <path
    transform="translate({(chartWidth * i) / ticksArray.length}, 0)"
    d="M0 0 l0 -8"
    stroke="black"
    stroke-width="2px"
  ></path>
  <text
    transform="translate({(chartWidth * i) / ticksArray.length}, -10)"
    font-size="10"
    text-anchor="middle"
    fill="black"
  >
    {tick}
  </text>
{/each}
<path
  transform="translate({yFunction(0)},0)"
  d="M0 0 l0 -8"
  stroke="black"
  stroke-width="2px"
></path>
<text
  transform="translate({yFunction(0)}, -10)"
  font-size="10"
  text-anchor="middle"
  fill="black"
>
  0
</text>
