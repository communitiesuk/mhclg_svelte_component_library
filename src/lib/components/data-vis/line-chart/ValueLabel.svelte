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

  const preparedText = $derived(prepare(tooltipContent, "12pt GDS Transport"));

  let verticalPadding = 3;
  let horizontalPadding = $derived(verticalPadding * 2);

  let xPosition = $derived(markerRect?.x ?? 0);
  let yPosition = $derived(markerRect?.y ?? 0);

  let marginOfError = 4;

  const { lineCount, maxLineWidth } = $derived(
    measureLineStats(preparedText, containerWidth - horizontalPadding * 2),
  );

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  let left = $derived(
    clamp(
      xPosition - maxLineWidth / 2,
      0,
      containerWidth - maxLineWidth - horizontalPadding * 2 - marginOfError,
    ),
  );
</script>

<div
  style="position:absolute; 
  left: {`${left}px`};
  top: {yPosition - 45}px;
pointer-events: none;
    border: 1px solid black;
    padding: {`${verticalPadding}px ${horizontalPadding}px`};
    width: {maxLineWidth + horizontalPadding * 2 + marginOfError}px;
"
>
  {#if tooltipSnippet === undefined}
    {#if tooltipContent}
      <span class="tooltip-text">{tooltipContent}</span>
    {:else}
      <div role="tooltip">{activeMarkerId?.value ?? activeMarkerId}</div>
    {/if}
  {:else}
    <!-- something-->
  {/if}
</div>

<style>
  .tooltip-text {
    font-size: 12pt;
    font-family: "GDS Transport";
  }
</style>
