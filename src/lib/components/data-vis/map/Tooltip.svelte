<script>
  let { currentMousePosition, hoveredArea, hoveredAreaData, metric } = $props();
  let tooltipHeight = $state();
  let tooltipWidth = $state();

  // $inspect(tooltipHeight, tooltipWidth, currentMousePosition);
</script>

{#if hoveredArea}
  <div
    class="tooltip"
    style="top: {currentMousePosition?.y}px; left: {currentMousePosition?.x}px"
    bind:clientHeight={tooltipHeight}
    bind:clientWidth={tooltipWidth}
  >
    <p>{hoveredArea}</p>
    <p class="detail">
      {metric}: {hoveredAreaData ?? "No data"}
    </p>
  </div>
{/if}

<style>
  .tooltip {
    z-index: 1;
    position: absolute;
    /* top: 100px;
    left: 100px; */
    font-weight: 700;
    font-size: 24px;
    pointer-events: none;
    background-color: aliceblue;
    padding: 5px;
    border-radius: 5px;
  }
  .detail {
    font-weight: 400;
    font-size: 16px;
  }
</style>
