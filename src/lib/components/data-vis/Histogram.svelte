<script>
  import { scaleLinear } from "d3-scale";
  import { bin, range as d3range } from "d3-array";
  import Axis from "./axis/Axis.svelte";
  import chroma from "chroma-js";

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
    annotationValue = 0,
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
    topLabel = true,
    includeOutliers = true,
  } = $props();

  let xTicks = $state([]);
  let yTicks = $state([]);

  let xTickFirst = $derived(xTicks.length ? xTicks[0] : 0);
  let xTickLast = $derived(xTicks.length ? xTicks.at(-1) : 1);

  let domainXMin = $derived(Math.min(xTickFirst, xTickLast));
  let domainXMax = $derived(Math.max(xTickFirst, xTickLast));

  let yTickFirst = $derived(yTicks.length ? yTicks[0] : 0);
  let yTickLast = $derived(yTicks.length ? yTicks.at(-1) : 1);

  let domainYMin = $derived(Math.min(yTickFirst, yTickLast));
  let domainYMax = $derived(Math.max(yTickFirst, yTickLast));

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    scaleLinear().domain([domainXMin, domainXMax]).range(useRange),
  );

  const segmentScale = $derived(
    scaleLinear().domain([0, nBins]).range([domainXMin, domainXMax]),
  );

  const binThresholds = $derived(d3range(1, nBins).map(segmentScale));

  const binner = $derived(
    bin().domain([domainXMin, domainXMax]).thresholds(binThresholds),
  );
  const clampedDistribution = $derived(
    distribution.map((d) => Math.min(Math.max(d, domainXMin), domainXMax)),
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
        (averageValue - xTickFirst) / (xTickLast - xTickFirst);

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

  let colorScale = $derived(
    customColorScale ??
      interpolateColors(startColor, endColor, nBins, midColor, skew),
  );

  $inspect({ colorScale });

  const layout = $derived.by(() => {
    let y = 0;

    const topLabelY = topLabel ? y : null;
    if (topLabel) y += 20;

    const annotationY = annotationText ? y : null;
    if (annotationText) y += 25;

    const chartY = y;
    y += height;

    const xAxisY = showXAxis ? y : null;
    if (showXAxis) y += 25;

    return {
      topLabelY,
      annotationY,
      chartY,
      xAxisY,
      totalHeight: y,
    };
  });
</script>

{#key containerWidth}
  <div class="scale-container" bind:clientWidth={containerWidth}>
    <svg width={containerWidth} height={layout.totalHeight}>
      <g transform="translate({padding / 2}, 0)">
        {#if topLabel && layout.topLabelY !== null}
          <text x={0} y={layout.topLabelY + 14} fill="#666" font-size="0.75em">
            Number of areas
          </text>
        {/if}

        {#if annotationText && layout.annotationY !== null}
          <g
            transform="translate({xScale(
              annotationValue,
            )}, {layout.annotationY})"
          >
            <text
              fill="#555555"
              font-size="0.8em"
              text-anchor="middle"
              dominant-baseline="hanging"
            >
              <tspan x="0" dy="0">{annotationText}</tspan>
              <tspan x="0" dy="12">▼</tspan>
            </text>
          </g>
        {/if}

        <g transform="translate(0, {layout.chartY})">
          {#if showYAxis}
            <Axis
              bind:ticksArray={yTicks}
              chartHeight={height}
              chartWidth={containerWidth - padding}
              orientation={{ axis: "y", position: "left" }}
              min={minY}
              max={maxY}
              domain={[0, yTickLast]}
              range={[0, height]}
              fontSize={0}
              numberOfTicks={4}
              {showGridlines}
              {showTickMarks}
              strokeWidth={tickStrokeWidth}
            />
          {/if}

          {#each bins as bin, i}
            {#key bin.x0}
              <rect
                x={polarity === "reverse" ? xScale(bin.x1) : xScale(bin.x0)}
                y={height - yScale(bin.length)}
                width={Math.abs(xScale(bin.x1) - xScale(bin.x0))}
                height={yScale(bin.length)}
                fill={fill ?? colorScale[i]}
                stroke-width={barStrokeWidth}
                stroke={barStrokeColor}
              ></rect>
            {/key}
          {/each}
        </g>

        {#if showXAxis && layout.xAxisY !== null}
          <g transform="translate(0, {layout.xAxisY})">
            <Axis
              bind:ticksArray={xTicks}
              chartHeight={height}
              chartWidth={containerWidth - padding}
              orientation={{ axis: "x", position: "bottom" }}
              domain={[xTickFirst, xTickLast]}
              min={minX}
              max={maxX}
              range={useRange}
              fontSize={13}
              {floor}
              {ceiling}
              {labelFormatter}
              {numberOfTicks}
            />
          </g>
        {/if}
      </g>
    </svg>
  </div>
{/key}

<div style="content-visibility: hidden;">
  {#if !showXAxis}
    <Axis
      bind:ticksArray={xTicks}
      chartHeight={height}
      chartWidth={containerWidth - padding}
      orientation={{ axis: "x", position: "bottom" }}
      domain={[xTickFirst, xTickLast]}
      min={minX}
      max={maxX}
      range={useRange}
      fontSize={13}
      {floor}
      {ceiling}
      {labelFormatter}
      {numberOfTicks}
    ></Axis>
  {/if}
</div>
