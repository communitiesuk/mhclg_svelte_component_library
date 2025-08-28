<script>
  let {
    activeMarkerId,
    labelColor = "red",
    labelTextColor,
    tooltipContent = undefined,
    xFunction,
    yFunction,
    x = undefined,
    y = undefined,
    markerRect = undefined,
    tooltipSnippet,
    labelText = undefined,
  } = $props();

  $inspect({ markerRect });

  let textDimensions = $state();
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);
</script>

<!-- <div
  style="position:absolute;
  top: {markerRect?.y - (textDimensions?.height ?? 0) - 15}px;
left: {markerRect?.x +
    (markerRect?.width ?? 0) / 2 -
    (textDimensions?.width ?? 0) / 2}px;
  pointer-events: none; border 1px solid blue
  "
> -->
<div style="position:absolute; top: {textDimensions?.height ?? 0}px;">
  {#if tooltipSnippet === undefined}
    <div
      style="background-color: {labelColor};
  padding: 5px;
  border-radius: 5px;"
    >
      {#if tooltipContent}
        <div bind:contentRect={textDimensions}>
          {activeMarkerId[tooltipContent]}
        </div>
      {:else}
        <div bind:contentRect={textDimensions}>
          {activeMarkerId}
        </div>{/if}
    </div>
  {:else}
    <div bind:contentRect={textDimensions}>
      {@render tooltipSnippet(activeMarkerId)}
    </div>
  {/if}
</div>
