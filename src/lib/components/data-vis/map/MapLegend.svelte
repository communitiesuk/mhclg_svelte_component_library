<script>
  let { fillColor, canvasWidth, hoveredAreaProperties } = $props();
  $inspect(hoveredAreaProperties);

  let legendWidth = $derived(0.8 * canvasWidth);
</script>

<svg style="width: {legendWidth}; left: {0.1 * canvasWidth}">
  {#each fillColor as color, i}
    {@const barWidth = legendWidth / fillColor.length}
    {@const hovered = color == hoveredAreaProperties?.color}
    <rect
      width={barWidth}
      height="10"
      x={i * barWidth}
      y="10"
      fill={color}
      stroke={hovered ? "black" : ""}
      stroke-width={hovered ? "3px" : "1px"}
      opacity="0.8"
    ></rect>
    {#if hovered}
      <text x={i * barWidth} y="40" font-size="16px"
        >{hoveredAreaProperties?.LAD23NM}</text
      >
      <text x={i * barWidth} y="55">£{hoveredAreaProperties?.salary}</text>
    {/if}
  {/each}
</svg>

<style>
  svg {
    z-index: 1;
    position: absolute;
    bottom: 100px;
    /* left: 100px; */
    background-color: whitesmoke;
    height: 80px;
    opacity: 0.9;
  }
</style>
