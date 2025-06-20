<script>
  let {
    activeMarkerId,
    labelColor = "red",
    labelTextColor,
    tooltipContent,
    xFunction,
    yFunction,
    x,
    y,
    markerRect,
    tooltipSnippet,
  } = $props();

  let textDimensions = $state();
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);
</script>

{#if tooltipSnippet === undefined}
  <div
    style="position:absolute;
  top: {markerRect?.y}px;
  left: {markerRect?.x}px;
  font-size: 24px;
  pointer-events: none;
  background-color: {labelColor};
  padding: 5px;
  border-radius: 5px;
  height={(textDimensions?.height ?? 0) + verticalPadding}
  rx=5;
  ry=5;
  width={(textDimensions?.width ?? 0) + horizontalPadding}"
  >
    <p bind:contentRect={textDimensions}>tooltipContent is a string</p>
  </div>
{:else}<div
    style="position: absolute; top: {markerRect?.y}px; left: {markerRect?.x}px;"
  >
    {@render tooltipSnippet(activeMarkerId)}
  </div>
{/if}
