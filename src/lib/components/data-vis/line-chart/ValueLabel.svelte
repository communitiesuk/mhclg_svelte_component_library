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

  const typeOfTooltip = typeof tooltipSnippet;

  $inspect({ typeOfTooltip });

  let textDimensions = $state();
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);
</script>

<div
  style="position:absolute;
  top: {markerRect?.y - (textDimensions?.height ?? 0) - 15}px;
left: {markerRect?.x +
    (markerRect?.width ?? 0) / 2 -
    (textDimensions?.width ?? 0) / 2}px;
  pointer-events: none;
  "
>
  {#if tooltipSnippet === undefined}
    <div
      style="background-color: {labelColor};
  padding: 5px;
  border-radius: 5px;"
    >
      <div bind:contentRect={textDimensions}>
        {tooltipContent
          ? activeMarkerId[tooltipContent]
          : "tooltipContent undefined"}
      </div>
    </div>
  {:else}
    <div bind:contentRect={textDimensions}>
      {@render tooltipSnippet(activeMarkerId)}
    </div>
  {/if}
</div>
