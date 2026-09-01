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
    tooltipSnippet = undefined,
    labelText = undefined,
    yOffset = 20,
    containerWidth = undefined,
  } = $props();

  // Normalize tooltipContent to always be an array of lines internally.
  const contentLines = $derived(
    tooltipContent === undefined
      ? []
      : Array.isArray(tooltipContent)
        ? tooltipContent
        : [tooltipContent],
  );

  let verticalPadding = 3;
  let horizontalPadding = $derived(verticalPadding * 2);

  let xPosition = $derived(markerRect?.x ?? 0);
  let yPosition = $derived(markerRect?.y ?? 0);

  let marginOfError = 4;

  // Prepare + measure each line individually.
  const preparedLines = $derived(
    contentLines.map((line) => prepare(line, "12pt GDS Transport")),
  );

  const lineMeasurements = $derived(
    preparedLines.map((preparedText) =>
      measureLineStats(preparedText, containerWidth - horizontalPadding * 2),
    ),
  );

  // Overall stats: max width across all lines, total line count summed.
  const maxLineWidth = $derived(
    lineMeasurements.length
      ? Math.max(...lineMeasurements.map((m) => m.maxLineWidth))
      : 0,
  );

  const lineCount = $derived(
    lineMeasurements.reduce((sum, m) => sum + m.lineCount, 0),
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

  $inspect({ xPosition, yPosition });
</script>

<div
  style="position:absolute; 
  left: {`${left}px`};
  top: {-yPosition}px;
pointer-events: none;
  transform: translate(0%, -100%);
    border: 1px solid black;
    background-color: white;
    padding: {`${verticalPadding}px ${horizontalPadding}px`};
    width: {maxLineWidth + horizontalPadding * 2 + marginOfError}px;
"
>
  {#if tooltipSnippet === undefined}
    {#if contentLines.length}
      {#each contentLines as line}
        <span class="tooltip-text">{line}</span>
      {/each}
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
    display: block;
  }
</style>
