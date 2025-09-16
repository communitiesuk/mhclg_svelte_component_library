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
<div
  style="position:absolute; left: {markerRect?.x - textDimensions?.width / 2}px;
      top: {markerRect?.y - textDimensions?.height - 20}px"
  bind:contentRect={textDimensions}
>
  {#if tooltipSnippet === undefined}
    <div
      style="background-color: {labelColor};
  padding: 5px;§
  border-radius: 5px;"
    >
      {#if tooltipContent}
        <div>
          {activeMarkerId[tooltipContent]}
        </div>
      {:else}
        <div>
          <div>{activeMarkerId?.value ?? activeMarkerId}</div>
        </div>{/if}
    </div>
  {:else}
    <div>
      {@render tooltipSnippet(activeMarkerId)}
    </div>
  {/if}
</div>
