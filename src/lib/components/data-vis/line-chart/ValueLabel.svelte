<script>
  import {
    prepare,
    prepareWithSegments,
    measureLineStats,
    measureNaturalWidth,
    layout,
  } from "@chenglou/pretext";
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
    yOffset = 20,
    containerWidth = undefined,
  } = $props();

  const preparedText = prepare(
    "Bournemouth, Christchurch and Poole",
    "19px GDS Transport",
  );

  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);

  let xPosition = $derived(markerRect?.x ?? 0);

  const { lineCount, maxLineWidth } = $derived(
    measureLineStats(preparedText, containerWidth - 50),
  );

  $inspect({ containerWidth, maxLineWidth, lineCount });

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  let left = $derived(xPosition - maxLineWidth / 2);
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
  style="position:absolute; 
  left: {`${left}px`};
pointer-events: none;
  max-width: {containerWidth + horizontalPadding * 2}px;
"
>
  {#if tooltipSnippet === undefined}
    <div class="tooltip-text">
      {#if tooltipContent}
        <!-- <div role="tooltip">
          {activeMarkerId[tooltipContent]}
        </div> -->
        {tooltipContent}
      {:else}
        <div role="tooltip">{activeMarkerId?.value ?? activeMarkerId}</div>
      {/if}
    </div>
  {:else}
    <div role="tooltip">
      {@render tooltipSnippet(activeMarkerId)}
    </div>
  {/if}
</div>

<style>
  .tooltip-text {
    font-size: 19px;
    padding: 5px;
    border: 1px solid black;
    background-color: white;
  }
</style>
