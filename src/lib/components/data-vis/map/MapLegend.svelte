<script>
  let { fillColor, canvasWidth } = $props();
  //   $inspect(fillColor);

  let legendWidth = $derived(0.8 * canvasWidth);
</script>

<svg style="width: {legendWidth}; left: {0.1 * canvasWidth}">
  {#each fillColor as color, i}
    {@const barWidth = legendWidth / fillColor.length}
    <rect
      width={barWidth}
      height="10"
      x={i * barWidth}
      y="10"
      fill={color}
      opacity="0.8"
    ></rect>
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
  }
</style>
