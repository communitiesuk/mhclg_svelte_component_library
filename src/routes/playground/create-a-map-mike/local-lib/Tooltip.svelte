<script>
  let { currentMousePosition, hoveredArea } = $props();
</script>

<div
  class="tooltip"
  style="top: {currentMousePosition?.y}px; left: {currentMousePosition?.x}px"
>
  {hoveredArea}
</div>

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
    padding: 10px;
    border-radius: 5px;
  }
</style>
