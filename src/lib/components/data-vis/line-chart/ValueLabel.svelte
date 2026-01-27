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
    topWidth = undefined,
  } = $props();

  let textDimensions = $state();
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);

  let xPosition = $derived(markerRect?.x ?? 0);
  let textWidth = $derived(textDimensions?.width ?? 0);
  let containerWidth = $derived(topWidth ?? 0);

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  let left = $derived(
    clamp(xPosition - textWidth / 2, 0, containerWidth - textWidth),
  );

  let right = $derived(containerWidth - left - textWidth);

  let useRight = $derived(xPosition > containerWidth / 2);
</script>

<div
  style="position:absolute; 
  max-width: {topWidth}px;
    left: {useRight ? 'auto' : `${left}px`};
    right: {useRight ? `${right}px` : 'auto'};
      top: {markerRect?.y -
    textDimensions?.height -
    20}px; pointer-events: none"
  bind:contentRect={textDimensions}
>
  {#if tooltipSnippet === undefined}
    <div
      style="background-color: {labelColor};
  padding: 5px;
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
