<script>
  let { ticksArray, chartWidth, yFunction } = $props();
  $inspect(ticksArray);
</script>

{#each ticksArray as tick, i}
  <path
    transform="translate({yFunction(tick)}, 0)"
    d="M0 0 l0 -8"
    stroke="black"
    stroke-width="2px"
  ></path>
  <text
    transform="translate({yFunction(tick)}, -10)"
    font-size="14"
    text-anchor="middle"
    fill="black"
  >
    {tick}
  </text>
{/each}
