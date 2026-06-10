<script>
  import { scaleLinear } from "d3-scale";
  import { bin, range as d3range } from "d3-array";
  import chroma from "chroma-js";
  import PositionChartAxis from "./PositionChartAxis.svelte";
  import ValueLabel from "../line-chart/ValueLabel.svelte";
  import Button from "../../ui/Button.svelte";
  import InsetText from "../../content/InsetText.svelte";
  import Axis from "../axis/Axis.svelte";
  let {
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    showAxis = true,
    showArrows = false,
    showAverage = false,
    chartWidth = $bindable(500), // the 'chart' is the bar and the marker
    chartHeight = 24,
    color = "#CA357C",
    nSegments = 10,
    startColor = "#8EB8DC",
    endColor = "#0F385C",
    midColor = undefined,
    customColorScale = undefined,
    opacity = 1,
    annotation = undefined,
    showIcon = false,
    moreInfo = undefined,
    markerRadius = chartHeight / 2,
    numberOfTicks = undefined,
    options = [],
    rowData = [
      {
        value: value,
        color: color,
        opacity: opacity,
        annotation: annotation,
      },
    ],
    allData = [
      { rowData, label: label, chartHeight: chartHeight, moreInfo: moreInfo },
    ],
    markerStyles = { all: {} },
    assignMarkerTier = (tier, el) => {
      return true;
    },
    interactiveMarkers = true,
    labelText = "hello world",
    tooltipContent = undefined,
    container = undefined,
    yFunction = () => 10,
    x = 0,
    y = 0,
    currentMousePosition = undefined,
    markerRect = undefined,
    tooltipSnippet = undefined,
    onClickIcon = (label) => {
      openLabel = openLabel === label ? null : label;
    },
    onClickMarker = (event, marker, markerId) => {
      activeMarkerId = marker;
      currentMousePosition = [event.screenX, event.screenY];
    },
    onMouseEnterMarker = (event, marker, markerId, rect) => {
      activeMarkerId = marker;
      if (container) {
        const bounds = container.getBoundingClientRect();
        currentMousePosition = [
          // option for moving tooltip
          event.clientX - bounds.left,
          event.clientY - bounds.top,
        ];
        markerRect = {
          // option for fixed tooltip
          x: rect.x - bounds.left + rect.width / 2,
          y: rect.y - bounds.top + rect.height / 2,
        };
      } else {
        currentMousePosition = [event.clientX, event.clientY];
        markerRect = rect;
      }
    },
    onMouseLeaveMarker = (event, marker, dataId) => {
      activeMarkerId = null;
    },
    activeMarkerId = undefined,
    distribution = [],
    floor = undefined,
    ceiling = undefined,
    averageValue = undefined,
    polarity = "standard",
    skew = false,
    showTickMarks = true,
    showGridlines = false,
    labelFormatter = (tick, index, ticksArrayLength) => {
      return tick;
    },
    niceTicks = true,
    xTicks = $bindable([[]]),
    xRange = $bindable([[]]),
  } = $props();

  let xTickFirst = $derived(xTicks.length ? xTicks[0] : 0);
  let xTickLast = $derived(xTicks.length ? xTicks.at(-1) : 1);

  let domainMin = $derived(Math.min(xTickFirst, xTickLast));
  let domainMax = $derived(Math.max(xTickFirst, xTickLast));

  const segmentScale = $derived(
    scaleLinear().domain([0, nSegments]).range([domainMin, domainMax]),
  );

  const binThresholds = $derived(d3range(1, nSegments).map(segmentScale));

  const binner = $derived(
    bin().domain([domainMin, domainMax]).thresholds(binThresholds),
  );

  const bins = $derived(
    polarity === "reverse"
      ? binner(distribution).toReversed()
      : binner(distribution),
  );

  const proportionsInBins = $derived(
    bins.map((b) => b.length / distribution.length),
  );

  let proportionInExtremeBins = $derived([
    proportionsInBins[0],
    proportionsInBins.at(-1),
  ]);

  // base defaults that apply to every row
  const baseRow = { value, color, opacity, annotation, markerRadius };

  // base defaults that apply to every chart
  const baseChart = { label, chartHeight, min, max, showAxis };

  let topWidth = $state();

  let allDataNormalized = $derived(
    allData.map((chart) => {
      // create a container for tiered rowData
      const tieredRowData = {};

      chart.rowData.forEach((r, idx) => {
        // find the first matching tier
        const tier = Object.keys(markerStyles).find((t) =>
          assignMarkerTier(t, chart, r, idx),
        );

        // merge baseRow + tier style + original point
        const styledPoint = {
          ...baseRow,
          ...(tier ? markerStyles[tier] : {}),
          ...r,
        };

        // initialize array if needed
        if (!tieredRowData[tier]) tieredRowData[tier] = [];

        tieredRowData[tier].push(styledPoint);
      });

      return {
        ...baseChart,
        ...chart,
        rowData: tieredRowData,
      };
    }),
  );

  let moreInfoTogglesArray = $state(
    Array.from({ length: options.length }, () => false),
  );

  function updateMoreInfoTogglesArray(index) {
    moreInfoTogglesArray[index] = !moreInfoTogglesArray[index];
  }

  let showLabel = $derived(
    allDataNormalized.some((obj) => obj.label !== undefined),
  );
  let numberOfPositionCharts = $derived(allDataNormalized.length);
  let gridTemplateColumns = $derived(
    showLabel && showIcon
      ? "30% auto 1fr"
      : showLabel
        ? "30% 1fr"
        : showIcon
          ? "auto 1fr"
          : "1fr",
  );

  let divider = $derived(
    allDataNormalized.some((obj) => obj.divider !== undefined),
  );

  const range = $derived(Array.from({ length: nSegments }, (_, i) => i));

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
        .domain([0, averageNormalised, 1])
        .colors(10);

      return binColors;
    }
  }

  let colorScale = $derived(
    customColorScale ??
      interpolateColors(startColor, endColor, nSegments, midColor, skew),
  );

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  function xFunction(min, max) {
    return scaleLinear().domain([min, max]).range([0, barWidth]).clamp(true);
  }

  let annotations = $derived(
    Object.values(allDataNormalized[0].rowData)
      .flat()
      .filter(
        (d) => typeof d.annotation === "string" && d.annotation.length > 0,
      ),
  );

  let gridTemplateRows = $derived(
    allDataNormalized
      .map((item, i) => {
        const sizes = ["minmax(0,1fr)"];
        if (moreInfoTogglesArray[i]) sizes.push("minmax(0,auto)");
        if (item.divider === "true") sizes.push("minmax(0,auto)");
        return sizes.join(" "); // still fine because number of rows matches
      })
      .concat(showAxis ? ["minmax(0,auto)"] : [])
      .join(" "),
  );

  function segmentIndex(value) {
    return Math.max(
      0,
      Math.min(
        nSegments - 1,
        Math.floor(
          (nSegments * (value - xTickFirst)) / (xTickLast - xTickFirst),
        ),
      ),
    );
  }

  let totalHeight = $derived(
    chartHeight +
      (showAxis ? 25 : 0) +
      (showAverage ? 35 : 0) +
      (showArrows ? 25 : 0),
  );

  let svgHeight = $derived(
    chartHeight + (showAxis ? 25 : 0) + (showAverage ? 35 : 0),
  );
</script>

{#if annotations.length}
  {#each annotations as d (d.value)}
    <div bind:clientWidth={topWidth}>
      <svg width={topWidth} height="60">
        <g>
          <text
            font-family="GDS Transport"
            id="label"
            x={d.value}
            y="20"
            fill={d.color}
            font-size="18"
            opacity={typeof activeMarkerId !== "undefined" && activeMarkerId
              ? 0.2
              : 1}
          >
            {d.annotation}
          </text>
        </g>
        <defs>
          <marker
            id="arrow-down"
            markerWidth="10"
            markerHeight="10"
            refX="3"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
            opacity={typeof activeMarkerId !== "undefined" && activeMarkerId
              ? 0.2
              : 1}
          >
            <path d="M 0 0 L 6 3 L 0 6 z" fill={d.color}></path>
          </marker>
        </defs>
        <path
          d="M 4 25 v 10 h {xFunction(min, max)(d.value) +
            markerRadius -
            4 +
            (topWidth - chartWidth)}  v 15"
          fill="none"
          stroke={d.color}
          stroke-width="1.5"
          marker-end="url(#arrow-down)"
          opacity={typeof activeMarkerId !== "undefined" && activeMarkerId
            ? 0.2
            : 1}
        ></path>
      </svg>
    </div>
  {/each}
{/if}

<div
  class="grid-container"
  bind:this={container}
  style="
    position: relative;
    grid-template-columns: {gridTemplateColumns};
    grid-template-rows: {gridTemplateRows};
    height: {totalHeight}px;
  "
>
  {#each allDataNormalized as positionChart, i}
    {#if showLabel}
      <p
        class="govuk-body-s"
        style=" text-align: right;
    margin: 0;
    line-height: 1.05;"
      >
        {positionChart.label}
      </p>
    {/if}
    {#if showIcon}
      <div class="button-container">
        <Button
          textContent="i"
          buttonType="moreInfo"
          noPadding={true}
          onClickFunction={() => updateMoreInfoTogglesArray(i)}
        ></Button>
      </div>
    {/if}
    <div class="chart" bind:clientWidth={chartWidth}>
      <svg width={chartWidth} height={svgHeight} overflow="visible">
        {#each range as number}
          <g
            transform="translate({markerRadius +
              (barWidth * number) / nSegments},{(positionChart.chartHeight -
              barHeight) /
              2})"
            ><rect
              width={barWidth / nSegments}
              height={barHeight}
              fill={colorScale[number]}
            ></rect></g
          >{/each}
        {#each Object.entries(positionChart.rowData) as [tier, points]}
          {#each points as rowValue, i}
            {#if !isNaN(Number(rowValue.value))}
              {@const markerId = "marker-" + rowValue.value}
              <g
                data-id={markerId}
                onclick={interactiveMarkers
                  ? (event) => onClickMarker(event, rowValue, markerId)
                  : null}
                onmouseenter={interactiveMarkers
                  ? (event) =>
                      onMouseEnterMarker(
                        event,
                        rowValue,
                        markerId,
                        event.currentTarget.getBoundingClientRect(),
                      )
                  : null}
                onmouseleave={interactiveMarkers
                  ? (event) => onMouseLeaveMarker(event, rowValue, markerId)
                  : null}
                role="button"
                tabindex="0"
                onkeydown={interactiveMarkers
                  ? (e) => e.key === "Enter" && onClickMarker(e, value)
                  : null}
                pointer-events={interactiveMarkers ? null : "none"}
                transform="translate({xFunction(
                  xRange[0],
                  xRange[1],
                )(rowValue.value) + markerRadius},{positionChart.chartHeight /
                  2})"
              >
                {#if rowValue.shape === "line"}
                  <line
                    x1={0}
                    x2={0}
                    y1={chartHeight / 2.4}
                    y2={-chartHeight / 2.4}
                    stroke={rowValue.color === "inherit"
                      ? colorScale[segmentIndex(rowValue.value)]
                      : rowValue.color}
                    stroke-width={rowValue.markerRadius}
                    opacity={rowValue.opacity}
                    pointer-events={rowValue.pointerEvents}
                  ></line>
                {:else}
                  <circle
                    r={rowValue.markerRadius}
                    cx="0"
                    cy="0"
                    stroke="white"
                    fill={rowValue.color === "inherit"
                      ? colorScale[segmentIndex(rowValue.value)]
                      : rowValue.color}
                    stroke-width={3}
                    opacity={rowValue.opacity}
                  ></circle>
                  <circle
                    r={rowValue.markerRadius * 0.9}
                    cx="0"
                    cy="0"
                    fill={rowValue.color === "inherit"
                      ? colorScale[segmentIndex(rowValue.value)]
                      : rowValue.color}
                    stroke="black"
                    stroke-width={1.5}
                    opacity={rowValue.opacity}
                  ></circle>
                {/if}
              </g>
            {/if}
          {/each}
        {/each}
        {#if showAxis}
          <Axis
            bind:fullAxisRange={xRange}
            bind:ticksArray={xTicks}
            {chartHeight}
            chartWidth={chartWidth - markerRadius * 2}
            orientation={{ axis: "x", position: "bottom" }}
            range={[markerRadius, chartWidth - markerRadius]}
            domain={[xTickFirst, xTickLast]}
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
          ></Axis>
        {/if}
        {#if showAverage}
          <g
            transform="translate({xFunction(
              xRange[0],
              xRange[1],
            )(averageValue) + markerRadius}, {chartHeight +
              (showAxis ? 20 : 0)})"
          >
            <text
              fill="#444"
              font-size={15}
              text-anchor="middle"
              font-weight="bold"
            >
              <tspan x="1" dy="15">▲</tspan>
              <tspan x="1" dy="4">|</tspan>
              <tspan font-family="GDS Transport" x="1" dy="13">Average</tspan>
            </text>
          </g>
        {/if}
      </svg>
      {#if showArrows}
        <PositionChartAxis
          markerRadius={10}
          barWidth={chartWidth}
          textSize="xs"
          {chartWidth}
          axisLabels={["Worse than average", "Better than average"]}
        ></PositionChartAxis>
      {/if}
    </div>
    {#if moreInfoTogglesArray[i]}
      <div class="accordion" style="grid-column:1 / -1">
        <InsetText content={positionChart.moreInfo} renderStringAsHTML={true}
        ></InsetText>
      </div>
    {/if}
    {#if positionChart.divider}
      <div style="grid-column:1 / -1">
        <svg width="100%" height="5">
          <line
            x1="0"
            y1="2.5"
            x2="100%"
            y2="2.55"
            stroke="grey"
            stroke-width="0.5"
          ></line>
        </svg>
      </div>{/if}
  {/each}

  {#if showAxis}
    {#if showIcon}
      <div class="empty"></div>
    {/if}
    {#if showLabel}
      <div class="empty"></div>
    {/if}
  {/if}
  {#if activeMarkerId}
    <ValueLabel
      {activeMarkerId}
      labelColor="lightgrey"
      labelTextColor="black"
      {labelText}
      {tooltipContent}
      {xFunction}
      {yFunction}
      {x}
      {y}
      {markerRect}
      {tooltipSnippet}
    ></ValueLabel>
  {/if}
</div>

<div style="content-visibility: hidden;">
  {#if !showAxis}
    <Axis
      bind:fullAxisRange={xRange}
      bind:ticksArray={xTicks}
      {chartHeight}
      chartWidth={chartWidth - markerRadius * 2}
      orientation={{ axis: "x", position: "bottom" }}
      range={[markerRadius, chartWidth - markerRadius]}
      domain={[xTickFirst, xTickLast]}
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
    ></Axis>
  {/if}
</div>

<style>
  .grid-container {
    display: grid;
    align-items: center;
    column-gap: 2%;
    row-gap: 2%;
    overflow: visible;
  }
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 0;
    overflow: visible;
  }
</style>
