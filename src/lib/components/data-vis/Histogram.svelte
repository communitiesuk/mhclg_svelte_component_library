<script>
  import { scaleLinear } from "d3-scale";
  import { bin, range as d3range } from "d3-array";
  import Axis from "./axis/Axis.svelte";
  import chroma from "chroma-js";
  import { prepareWithSegments, measureLineStats } from "@chenglou/pretext";

  let {
    averageValue = undefined,
    distribution = [],
    minX = 0,
    maxX = 1,
    minY = 0,
    maxY = 100,
    showXAxis = true,
    showYAxis = true,
    showArrows = true,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    floor = undefined,
    ceiling = undefined,
    fill = "grey",
    nBins = 10,
    padding = 0,
    height = 50,
    polarity = "standard",
    annotationText = "",
    labelFormatter = (tick, index, numberOfTicks, values) => {
      return tick;
    },
    containerWidth = $bindable(100),
    numberOfTicks,
    customColorScale = undefined,
    skew = true,
    showGridlines = true,
    showTickMarks = false,
    tickStrokeWidth = 0.25,
    barStrokeWidth = 0,
    barStrokeColor = "white",
    includeOutliers = true,
    onUpdate = undefined,
    annotationPosition = { xPosition: undefined, segmentIndex: undefined },
  } = $props();

  $effect(() => {
    onUpdate?.(bins);
  });

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xValueFirst = $derived(polarity === "standard" ? minX : maxX);
  let xValueLast = $derived(polarity === "standard" ? maxX : minX);

  let xScale = $derived(scaleLinear().domain([minX, maxX]).range(useRange));

  const segmentScale = $derived(
    scaleLinear().domain([0, nBins]).range([minX, maxX]),
  );

  const binThresholds = $derived(d3range(1, nBins).map(segmentScale));

  const binner = $derived(bin().domain([minX, maxX]).thresholds(binThresholds));

  const clampedDistribution = $derived(
    distribution.map((d) => Math.min(Math.max(d, minX), maxX)),
  );

  const binnedDistribution = $derived(
    binner(includeOutliers ? clampedDistribution : distribution),
  );

  const bins = $derived(
    polarity === "reverse"
      ? binnedDistribution.toReversed()
      : binnedDistribution,
  );

  const proportionsInBins = $derived(
    bins.map((b) => b.length / distribution.length),
  );

  let proportionInExtremeBins = $derived([
    proportionsInBins[0],
    proportionsInBins.at(-1),
  ]);

  let yScale = $derived(
    scaleLinear()
      .domain([0, Math.max(...bins.map((b) => b.length))])
      .range([0, height]),
  );

  function interpolateColors(
    startColor,
    endColor,
    nSegments,
    midColor = null,
    skew,
  ) {
    const colorArray = [startColor, midColor, endColor].filter(Boolean);

    if (!skew) {
      return chroma.scale(colorArray).colors(nSegments);
    } else {
      const extremeColors = chroma
        .scale([startColor, midColor, endColor])
        .padding([
          proportionInExtremeBins[0] / 2,
          proportionInExtremeBins[1] / 2,
        ])
        .colors(2);

      const averageNormalised =
        (averageValue - xValueFirst) / (xValueLast - xValueFirst);

      const binColors = chroma
        .scale([extremeColors[0], midColor, extremeColors[1]])
        .domain([
          0,
          polarity === "reverse" ? 1 - averageNormalised : averageNormalised,
          1,
        ])
        .colors(10);

      return binColors;
    }
  }

  let colorScale = $derived(() => {
    if (customColorScale) return customColorScale;

    if (!startColor || !endColor || !nBins) return [];

    if (skew) {
      if (
        !midColor ||
        averageValue == null ||
        xValueFirst == null ||
        xValueLast == null
      ) {
        return [];
      }
    }

    return interpolateColors(startColor, endColor, nBins, midColor, skew);
  });

  const layout = $derived.by(() => {
    let y = 0;

    const annotationY = annotationText ? y : null;
    if (annotationText) y += 30;

    const chartY = y;
    y += height;

    const xAxisY = showXAxis ? y : null;
    if (showXAxis) y += 25;

    return {
      annotationY,
      chartY,
      xAxisY,
      totalHeight: y,
    };
  });

  let availableSpace = $derived(containerWidth - padding);

  let annotationTextSize = $state("10pt");

  let preparedText = $derived(
    prepareWithSegments(annotationText, `${annotationTextSize} GDS Transport`),
  );
  let { lineCount, maxLineWidth } = $derived(
    measureLineStats(preparedText, availableSpace),
  );

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  let centerX = $derived(
    annotationPosition.xPosition !== undefined
      ? xScale(annotationPosition.xPosition)
      : (xScale(bins[annotationPosition.segmentIndex].x0) +
          xScale(bins[annotationPosition.segmentIndex].x1)) /
          2 -
          4.5,
  );

  let clampedAnnotationPosition = $derived(
    clamp(
      centerX - maxLineWidth / 2,
      0,
      containerWidth - padding - maxLineWidth,
    ),
  );
</script>

{#key containerWidth}
  <div class="scale-container" bind:clientWidth={containerWidth}>
    <svg width={containerWidth} height={layout.totalHeight}>
      <g transform="translate({padding / 2}, 0)">
        {#if annotationText && layout.annotationY !== null}
          <text
            x={clampedAnnotationPosition}
            y={layout.annotationY + 14}
            fill="#666"
            font-size={annotationTextSize}
          >
            {annotationText}
          </text>
          <text
            x={centerX}
            y={layout.annotationY + 26}
            fill="#666"
            font-size="0.75em"
          >
            ↓
          </text>
        {/if}

        <g transform="translate(0, {layout.chartY})">
          {#if showYAxis}
            {#each [3, 6, 9] as x, i}
              <path
                transform="translate(0, {scaleLinear([0, 9], [height, 0])(x)})"
                d={`M0 0 l${containerWidth - 25} 0`}
                stroke="grey"
                stroke-width={0.25}
              ></path>
            {/each}
          {/if}

          {#each bins as bin, i}
            {#key bin.x0}
              {@const fullWidth = Math.abs(xScale(bin.x1) - xScale(bin.x0))}
              {@const barWidth = fullWidth * 0.97}
              {@const offset = (fullWidth - barWidth) / 2}
              <rect
                x={(polarity === "reverse" ? xScale(bin.x1) : xScale(bin.x0)) +
                  offset}
                y={height - yScale(bin.length)}
                width={barWidth}
                height={yScale(bin.length)}
                fill={fill ?? colorScale[i]}
              ></rect>
              <!-- <text
                x={(polarity === "reverse" ? xScale(bin.x1) : xScale(bin.x0)) +
                  offset}
                y={height - yScale(bin.length)}
                font-size={5}
                >{bin.length} areas between
                {Math.round(bin.x0)} and {Math.round(bin.x1)}
              </text> -->
            {/key}
          {/each}
        </g>

        {#if showXAxis && layout.xAxisY !== null}
          <g transform="translate(0, {layout.xAxisY})">
            <!-- <Axis
              bind:ticksArray={xTicks}
              chartHeight={height}
              chartWidth={containerWidth - padding}
              orientation={{ axis: "x", position: "bottom" }}
              domain={[xValueFirst, xValueLast]}
              min={minX}
              max={maxX}
              range={useRange}
              fontSize={13}
              {floor}
              {ceiling}
              {labelFormatter}
              {numberOfTicks}
            /> -->
          </g>
        {/if}
      </g>
    </svg>
  </div>
{/key}

<div style="content-visibility: hidden;">
  {#if !showXAxis}
    <!-- <Axis
      bind:axisDomain
      bind:ticksArray={ticksDomain}
      {chartHeight}
      chartWidth={chartWidth - markerRadius * 2}
      orientation={{ axis: "x", position: "bottom" }}
      range={[markerRadius, chartWidth - markerRadius]}
      domain={[xValueFirst, xValueLast]}
      {min}
      {max}
      fontSize={14}
      {floor}
      {ceiling}
      {numberOfTicks}
      {polarity}
      {showTickMarks}
      {showGridlines}
      {labelFormatter}
      {niceTicks}
      {markerRadius}
      {distribution}
    ></Axis> -->
  {/if}
</div>
