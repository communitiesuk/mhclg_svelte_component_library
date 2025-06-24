<script>
  let {
    activeMarkerId,
    labelColor = "red",
    labelTextColor,
    tooltipContent = activeMarkerId.y,
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
  top: {markerRect?.y - (textDimensions?.height ?? 0) - 15}px;
left: {markerRect?.x +
      (markerRect?.width ?? 0) / 2 -
      (textDimensions?.width ?? 0) / 2}px;
  pointer-events: none;
  background-color: {labelColor};
  padding: 5px;
  border-radius: 5px;
  height={textDimensions?.height ?? 0}
  width={textDimensions?.width ?? 0}"
  >
    <div bind:contentRect={textDimensions}>{activeMarkerId.y}</div>
  </div>
{:else}<div
    style="position: absolute; top: {markerRect?.y}px; left: {markerRect?.x}px;"
  >
    {@render tooltipSnippet(activeMarkerId)}
  </div>
{/if}
