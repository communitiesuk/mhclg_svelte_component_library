<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
  import ValueLabel from "../line-chart/ValueLabel.svelte";
  import Button from "../../ui/Button.svelte";
  import InsetText from "../../content/InsetText.svelte";
  import { interpolateColors } from "./interpolateColors.js";
  import { splitGroupsAndAverages } from "./splitGroupsAndAverages.js";
  import { getColorsForValues } from "./getColorsForValues.js";
  import { createEqualWidthBins } from "./createEqualWidthBins.js";
  import { assignBinColors } from "./assignBinColors.js";

  import Axis from "../axis/Axis.svelte";
  import { median, quantile } from "d3-array";

  let {
    data = undefined,
    axisFirst = false,
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    showAxis = true,
    showArrows = true,
    axisLabels = ["Below average", "Above average"],
    chartHeight = 24,
    color = "inherit",
    nSegments = 10,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    colorScale = undefined,
    opacity = 1,
    shape = "circle",
    annotation = undefined,
    showIcon = false,
    moreInfo = undefined,
    markerRadius = chartHeight / 2,
    options = [],
    skew = false,
    dist = [],
    rowData = [
      {
        value: value,
        color: color,
        opacity: opacity,
        annotation: annotation,
        shape: shape,
        markerRadius: markerRadius,
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
      const bounds = chartAndTooltipContainer.getBoundingClientRect();
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
    },
    onMouseLeaveMarker = (event, marker, dataId) => {
      activeMarkerId = null;
    },
    activeMarkerId = undefined,
    ariaLabel,
    axisTextSize = "xs",
    areaProfile = true,
    chartDescriptionSnippet,
    numberOfTicks = undefined,
    floor = undefined,
    ceiling = undefined,
    conversion = (x) => x,
    polarity = "standard",
    labelFormatter = (tick, index, numberOfTicks, values) => {
      return tick;
    },
    average = undefined,
    showAverage = false,
  } = $props();

  let xTicks = $state([]);

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : -3);
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 3);
  let newMin = $derived(xTicks.length ? Math.min(...xTicks) : -3);
  let newMax = $derived(xTicks.length ? Math.max(...xTicks) : 3);

  let distSorted = $derived(dist.slice().sort((a, b) => a - b));
  let q1 = $derived(quantile(distSorted, 0.25));
  let q3 = $derived(quantile(distSorted, 0.75));
  let rawMedian = $derived(median(distSorted));
  let iqr = $derived(q3 - q1);

  // let newMin = $derived(conversion(xTickMin, iqr, rawMedian));
  // let newMax = $derived(conversion(xTickMax, iqr, rawMedian));

  let selectedAreasColorsPalette = ["#CA357C", "#750080", "#8A0000"];

  let topWidth = $state();

  let chartAndTooltipContainer;
  let containerWidth = $state(400);

  let labelsContainerWidth = $derived(
    areaProfile
      ? containerWidth > 610
        ? 200
        : containerWidth > 540
          ? 160
          : 130
      : containerWidth > 420
        ? 160
        : 145,
  );
  let labelsContainerHeightArray = $state([chartHeight]);
  let rowContainerHeight = $derived(Math.max(...labelsContainerHeightArray));

  // base defaults that apply to every row
  const baseRow = { value, color, opacity, annotation, shape, markerRadius };

  // base defaults that apply to every chart
  const baseChart = { label, chartHeight, min, max, showAxis };

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
    allDataNormalized.some((obj) => obj.label != undefined),
  );

  let chartWidth = $derived(
    containerWidth -
      (showLabel ? labelsContainerWidth : 0) -
      (showIcon ? 20 : 0) -
      20,
  );

  let bins = $derived(
    createEqualWidthBins(xTickMin, xTickMax, nSegments, dist),
  );

  let proportionInExtremeBins = $derived([
    bins[0]["count"] / distSorted.length,
    bins.at(-1)["count"] / distSorted.length,
  ]);

  const range = $derived(
    Array.from({ length: nSegments }, (_, i) => nSegments - 1 - i),
  );

  import chroma from "chroma-js";

  let midPosition = $derived((rawMedian - newMin) / (newMax - newMin));

  let c1000 = $derived(
    chroma
      .scale([startColor, midColor, endColor])
      .domain([0, midPosition, 1])
      .colors(1000),
  );

  let colors1000 = $derived(
    polarity === "reverse"
      ? c1000.reverse() // only done once
      : c1000,
  );

  let thisDomain = $derived(
    polarity === "reverse"
      ? [0, midPosition, 1].reverse() // only done once
      : [0, midPosition, 1],
  );

  // let colors1000 = $derived(
  //   polarity === "reverse"
  //     ? interpolateColors(startColor, endColor, 1000, midColor).reverse() // only done once
  //     : interpolateColors(startColor, endColor, 1000, midColor),
  // );

  let averagesForSegments = $derived(
    splitGroupsAndAverages(dist, nSegments).averages,
  );

  let binColors = $derived(
    chroma
      .scale([startColor, midColor, endColor])
      .domain(thisDomain)
      .padding([proportionInExtremeBins[0] / 2, proportionInExtremeBins[1] / 2])
      .colors(10),
  );

  // let binColors = $derived(
  //   polarity === "reverse"
  //     ? assignBinColors(bins, colors1000).reverse() // only done once
  //     : assignBinColors(bins, colors1000),
  // );

  let interpolatedColors = $derived(
    skew
      ? binColors
      : interpolateColors(startColor, endColor, nSegments, midColor),
  );

  function segmentColor(value, min, max, colors) {
    const n = colors.length;
    const idx = Math.floor((n * (value - min)) / (max - min));
    return colors[Math.min(n - 1, Math.max(0, idx))];
  }

  const activeColors = $derived(
    polarity === "reverse"
      ? [...interpolatedColors].reverse() // only done once
      : interpolatedColors,
  );

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth);
  let barHeight = $derived((chartHeight * 5) / 6);

  let useRange = $derived(
    polarity === "standard" ? [0, barWidth] : [barWidth, 0],
  );

  let xScale = $derived(() =>
    scaleLinear().domain([newMin, newMax]).range(useRange).clamp(true),
  );

  let annotations = $derived(
    Object.values(allDataNormalized[0].rowData)
      .flat()
      .filter(
        (d) => typeof d.annotation === "string" && d.annotation.length > 0,
      ),
  );

  let annotationsContainerHeight = $state(50);
  let annotationsContainerWidth = $state(400);

  let annotationTextDims = $state();

  let annotationXPosition = $derived(
    annotations.length > 0
      ? (showIcon ? 20 : 0) +
          (showLabel ? labelsContainerWidth : 0) +
          xScale()(annotations[0].value)
      : null,
  );

  let spaceForText = $derived(
    annotationXPosition != null
      ? annotationXPosition > annotationsContainerWidth / 2
        ? annotationXPosition - 50
        : annotationsContainerWidth - annotationXPosition - 50
      : null,
  );

  function splitAtNearestSpaceMidpoint(input) {
    if (!input.includes(" ")) return [input, ""]; // no space to split

    const mid = Math.floor(input.length / 2);
    let closest = -1;
    let minDistance = Infinity;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === " ") {
        const distance = Math.abs(i - mid);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      }
    }

    if (closest === -1) return [input, ""]; // fallback

    return [input.slice(0, closest), input.slice(closest + 1)];
  }
</script>

{#key containerWidth}
  <!-- <div role="img" aria-label={ariaLabel}>
		{#if annotations.length}
			{#each annotations as d (d.value)}
				<div bind:clientWidth={topWidth} aria-hidden={true}>
					<svg width={topWidth} height="60">
						<g>
							<text
								font-family="GDS Transport"
								id="label"
								x={d.value}
								y="20"
								fill={d.color}
								font-size="18"
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
							>
								<path d="M 0 0 L 6 3 L 0 6 z" fill={d.color}></path>
							</marker>
						</defs>
						<path
							d="M 4 25 v 10 h {xScale()(d.value) + (topWidth - chartWidth) - 2}  v 15"
							fill="none"
							stroke={d.color}
							stroke-width="1.5"
							marker-end="url(#arrow-down)"
						></path>
					</svg>
				</div>
			{/each}
		{/if}
	</div> -->

  <div class="chart-and-tooltip-container" bind:this={chartAndTooltipContainer}>
    <div
      class="chart-flex-container"
      bind:clientWidth={containerWidth}
      style="gap:{areaProfile ? '5px' : '2px'};"
    >
      {#if annotations.length > 0}
        <div class="data-row" style="height: 40px;">
          <div
            class="scale-container"
            style=" width: 100%;"
            bind:clientHeight={annotationsContainerHeight}
            bind:clientWidth={annotationsContainerWidth}
          >
            <svg width="100%" style="overflow: visible;">
              <g
                transform="translate({annotationXPosition},{annotationsContainerHeight})"
              >
                <path
                  d="M0 0 l-6 -8 l12 0 z"
                  stroke-width="0.5px"
                  stroke={selectedAreasColorsPalette[0]}
                  fill={selectedAreasColorsPalette[0]}
                ></path>
                <path
                  d="M0 -5 l0 -25 l{annotationXPosition >
                  annotationsContainerWidth / 2
                    ? -20
                    : 20} 0"
                  stroke={selectedAreasColorsPalette[0]}
                  fill="none"
                  stroke-width="1.5px"
                ></path>
                <g
                  transform="translate({annotationXPosition >
                  annotationsContainerWidth / 2
                    ? -25
                    : 25},{-25})"
                >
                  <text
                    pointer-events={annotationTextDims?.width < spaceForText
                      ? null
                      : "none"}
                    opacity={annotationTextDims?.width < spaceForText ? 1 : 0}
                    bind:contentRect={annotationTextDims}
                    class="govuk-body-m"
                    stroke-width="0.5px"
                    stroke={selectedAreasColorsPalette[0]}
                    fill={selectedAreasColorsPalette[0]}
                    text-anchor={annotationXPosition >
                    annotationsContainerWidth / 2
                      ? "end"
                      : "start"}
                    >{annotations[0].annotation + annotationXPosition}
                  </text>

                  {#if annotationTextDims?.width >= spaceForText}
                    {#each splitAtNearestSpaceMidpoint(annotations[0].annotation) as line, i}
                      <text
                        y={20 * i}
                        class="govuk-body-m"
                        stroke-width="0.5px"
                        stroke={selectedAreasColorsPalette[0]}
                        fill={selectedAreasColorsPalette[0]}
                        text-anchor={annotationXPosition >
                        annotationsContainerWidth / 2
                          ? "end"
                          : "start"}>{line}</text
                      >
                    {/each}
                  {/if}
                </g>
              </g>
            </svg>
          </div>
        </div>
      {/if}
      {#each allDataNormalized as row, i}
        <div class="data-row">
          {#if showLabel}
            <div
              class="label-container"
              style="flex: 0 0 {labelsContainerWidth}px;"
              bind:clientHeight={labelsContainerHeightArray[i]}
            >
              <p
                aria-hidden={true}
                class="govuk-body-s"
                style=" text-align: right;
          margin: 0;
          line-height: 1.05;"
              >
                {row.label}
              </p>
            </div>
          {/if}
          {#if showIcon}
            <div class="icon-container">
              <Button
                textContent="i"
                buttonType="moreInfo"
                noPadding={true}
                onClickFunction={() => updateMoreInfoTogglesArray(i)}
                ariaExpanded={moreInfoTogglesArray[i]}
              ></Button>
            </div>
          {/if}
          <div class="scale-container">
            <svg
              width={chartWidth - 20}
              height={showAxis && showAverage
                ? chartHeight * 3
                : showAxis || showAverage
                  ? chartHeight * 2.1
                  : chartHeight}
              aria-hidden={true}
            >
              <rect
                x={0}
                y={(row.chartHeight - barHeight) / 2}
                width={barWidth}
                height={barHeight}
                fill="none"
                stroke="black"
                stroke-width="0.25px"
              ></rect>
              {#each range as number}
                <g
                  transform="translate({(barWidth * number) /
                    nSegments},{(row.chartHeight - barHeight) / 2})"
                >
                  <rect
                    width={barWidth / nSegments}
                    height={barHeight}
                    fill={colorScale && colorScale.length > 0
                      ? colorScale[number]
                      : interpolatedColors[number]}
                  ></rect>
                  <line
                    stroke="white"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2={barHeight}
                    stroke-width="0.5px"
                  ></line>
                </g>{/each}
              {#if showAverage}
                <!-- <g
                  transform="translate({xScale()(average)},{chartHeight * 2.7})"
                  ><text fill="#333333" font-size={14} text-anchor="middle"
                    >Average</text
                  ><path d="M0 -10 l0 -30" stroke="#333333" stroke-width={2}
                  ></path></g
                > -->
                <g
                  fill="red"
                  transform="translate({xScale()(average)},{chartHeight * 2.7})"
                  ><text fill="#333333" font-size={14} text-anchor="middle">
                    <tspan x="0" dy="-5">▲</tspan>
                    <tspan x="0" dy="10">Average</tspan>
                  </text></g
                >
              {/if}
              {#if showAxis}
                <g stroke="white" stroke-width="3" paint-order="stroke">
                  <Axis
                    bind:ticksArray={xTicks}
                    {chartHeight}
                    {chartWidth}
                    orientation={{ axis: "x", position: "bottom" }}
                    range={[0, chartWidth]}
                    domain={[xTickMin, xTickMax]}
                    values={dist}
                    fontSize={14}
                    {numberOfTicks}
                    {floor}
                    {ceiling}
                    {polarity}
                    {labelFormatter}
                  ></Axis>
                </g>
              {/if}

              {#each Object.entries(row.rowData) as [tier, points]}
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
                        ? (event) =>
                            onMouseLeaveMarker(event, rowValue, markerId)
                        : null}
                      onfocus={interactiveMarkers
                        ? (event) =>
                            onMouseEnterMarker(
                              event,
                              rowValue,
                              markerId,
                              event.currentTarget.getBoundingClientRect(),
                            )
                        : null}
                      onblur={interactiveMarkers
                        ? (event) =>
                            onMouseLeaveMarker(event, rowValue, markerId)
                        : null}
                      role="button"
                      aria-label={tooltipContent}
                      tabindex="0"
                      onkeydown={interactiveMarkers
                        ? (event) => onClickMarker(event, rowValue, markerId)
                        : null}
                      pointer-events={interactiveMarkers ? null : "none"}
                      transform="translate({xScale()(
                        rowValue.value,
                      )},{row.chartHeight / 2})"
                    >
                      {#if rowValue.shape === "rect"}
                        <rect
                          x={-rowValue.markerRadius}
                          y={-rowValue.markerRadius}
                          width={rowValue.markerRadius * 2}
                          height={rowValue.markerRadius * 2}
                          rx="7"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="white"
                          stroke-width="9"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></rect>
                        <rect
                          x={-rowValue.markerRadius}
                          y={-rowValue.markerRadius}
                          width={rowValue.markerRadius * 2}
                          height={rowValue.markerRadius * 2}
                          rx="7"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="black"
                          stroke-width="6"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></rect>
                        <rect
                          x={-rowValue.markerRadius}
                          y={-rowValue.markerRadius}
                          width={rowValue.markerRadius * 2}
                          height={rowValue.markerRadius * 2}
                          rx="7"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="white"
                          stroke-width="2"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></rect>
                      {:else if rowValue.shape === "line"}
                        <rect
                          x={-rowValue.markerRadius}
                          y={-rowValue.markerRadius}
                          width={rowValue.markerRadius / 10}
                          height={rowValue.markerRadius * 2}
                          rx="0"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="black"
                          stroke-width="3"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></rect>
                      {:else}
                        <circle
                          r={rowValue.markerRadius * 1.1}
                          cx="0"
                          cy="0"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="white"
                          stroke-width="5"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></circle>
                        <circle
                          r={rowValue.markerRadius}
                          cx="0"
                          cy="0"
                          fill={rowValue.color === "inherit"
                            ? segmentColor(
                                rowValue.value,
                                newMin,
                                newMax,
                                activeColors,
                              )
                            : rowValue.color}
                          stroke="#333333"
                          stroke-width="2"
                          opacity={rowValue.opacity}
                          pointer-events={rowValue.pointerEvents}
                        ></circle>
                      {/if}
                    </g>
                  {/if}
                {/each}
              {/each}
            </svg>
          </div>
        </div>
        {#if moreInfoTogglesArray[i]}
          <div class="accordion" aria-live="assertive">
            <InsetText content={row.moreInfo} renderStringAsHTML={true}
            ></InsetText>
          </div>
        {/if}
        {#if row.divider}
          {#if showArrows}
            <div class="data-row" aria-hidden="true">
              {#if axisFirst}
                {#if showLabel}
                  <div
                    class="label-container"
                    style="flex: 0 0 {labelsContainerWidth}px;"
                  ></div>
                {/if}
                {#if showIcon}
                  <div class="icon-container"></div>
                {/if}
                <div class="scale-container">
                  <PositionChartAxis
                    {markerRadius}
                    {barWidth}
                    textSize={axisTextSize}
                    {chartWidth}
                    {axisLabels}
                  ></PositionChartAxis>
                </div>
              {/if}
            </div>
          {/if}
          {#if chartDescriptionSnippet}
            <div class="inset-description">
              <InsetText content={chartDescriptionSnippet}></InsetText>
            </div>
          {:else}
            <div class="divider-line"></div>
          {/if}
        {:else if i < allDataNormalized.length - 1}
          <div></div>
        {/if}
      {/each}
      {#if showArrows}
        <div class="data-row" aria-hidden="true">
          {#if showLabel}
            <div
              class="label-container"
              style="flex: 0 0 {labelsContainerWidth}px;"
            ></div>
          {/if}
          {#if showIcon}
            <div class="icon-container"></div>
          {/if}
          {#if !axisFirst}
            <div class="scale-container">
              <PositionChartAxis
                {markerRadius}
                {barWidth}
                textSize={axisTextSize}
                {chartWidth}
                {axisLabels}
              ></PositionChartAxis>
            </div>
          {/if}
        </div>
      {/if}
    </div>
    <!-- {#if annotations.length > 0}
      <div class="data-row" style="height: 40px;">
        <div
          class="scale-container"
          style="height: 100%; width: 100%;"
          bind:clientHeight={annotationsContainerHeight}
          bind:clientWidth={annotationsContainerWidth}
        >
          <svg width="100%" height="100%" style="overflow: visible;">
            <g
              transform="translate({annotationXPosition},{annotationsContainerHeight})"
            >
              <g
                transform="translate(0, {-annotationsContainerHeight}) scale(1,-1)"
              >
                <path
                  d="M0 0 l-6 -8 l12 0 z"
                  stroke-width="0.5px"
                  stroke={selectedAreasColorsPalette[0]}
                  fill={selectedAreasColorsPalette[0]}
                ></path>
                <path
                  d="M0 -5 l0 -25 l{annotationXPosition >
                  annotationsContainerWidth / 2
                    ? -20
                    : 20} 0"
                  stroke={selectedAreasColorsPalette[0]}
                  fill="none"
                  stroke-width="1.5px"
                ></path>
              </g>
              <g
                transform="translate({annotationXPosition >
                annotationsContainerWidth / 2
                  ? -25
                  : 25},{-5})"
              >
                <text
                  pointer-events={annotationTextDims?.width < spaceForText
                    ? null
                    : "none"}
                  opacity={annotationTextDims?.width < spaceForText ? 1 : 0}
                  bind:contentRect={annotationTextDims}
                  class="govuk-body-m"
                  stroke-width="0.5px"
                  stroke={selectedAreasColorsPalette[0]}
                  fill={selectedAreasColorsPalette[0]}
                  text-anchor={annotationXPosition >
                  annotationsContainerWidth / 2
                    ? "end"
                    : "start"}
                  >{annotations[0].annotation + annotationXPosition}
                </text>

                {#if annotationTextDims?.width >= spaceForText}
                  {#each splitAtNearestSpaceMidpoint(annotations[0].annotation) as line, i}
                    <text
                      y={20 * i}
                      class="govuk-body-m"
                      stroke-width="0.5px"
                      stroke={selectedAreasColorsPalette[0]}
                      fill={selectedAreasColorsPalette[0]}
                      text-anchor={annotationXPosition >
                      annotationsContainerWidth / 2
                        ? "end"
                        : "start"}>{line}</text
                    >
                  {/each}
                {/if}
              </g>
            </g>
          </svg>
        </div>
      </div> 
    {/if}-->
    {#if activeMarkerId}
      <ValueLabel
        {activeMarkerId}
        labelColor="lightgrey"
        labelTextColor="black"
        {labelText}
        {tooltipContent}
        xFunction={xScale}
        {yFunction}
        {x}
        {y}
        {markerRect}
        {tooltipSnippet}
        topWidth={containerWidth}
      ></ValueLabel>
    {/if}
  </div>
{/key}

<!-- <div role="img" aria-label={ariaLabel}>
    {#if annotations.length}
      {#each annotations as d (d.value)}
        <div bind:clientWidth={topWidth} aria-hidden={true}>
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
              d="M 4 25 v 10 h {xScale()(d.value) +
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
    "
    >
      {#each allDataNormalized as positionChart, i}
        {#if showLabel}
          <p
            aria-hidden={true}
            class="govuk-body-s"
            style=" text-align: right;
      margin: 0;
      line-height: 1.05;"
          >
            {positionChart.label}
          </p>
        {/if}
        {#if showIcon}
          <Button
            textContent="i"
            buttonType="moreInfo"
            noPadding={true}
            onClickFunction={() => updateMoreInfoTogglesArray(i)}
            ariaExpanded={moreInfoTogglesArray[i]}
          ></Button>
        {/if}
        <div
          class="chart"
          style="height: {positionChart.chartHeight}px"
          bind:clientWidth={chartWidth}
        >
          <svg
            width={chartWidth}
            height={positionChart.chartHeight}
            aria-hidden={true}
          >
            <rect
              x={markerRadius}
              y={(positionChart.chartHeight - barHeight) / 2}
              width={barWidth}
              height={barHeight}
              fill="none"
              stroke="grey"
              stroke-width="1"
            ></rect>
            {#each range as number}
              <g
                transform="translate({markerRadius +
                  (barWidth * number) / nSegments},{(positionChart.chartHeight -
                  barHeight) /
                  2})"
                ><rect
                  width={barWidth / nSegments}
                  height={barHeight}
                  fill={colorScale && colorScale.length > 0
                    ? colorScale[number]
                    : interpolateColors(
                        startColor,
                        endColor,
                        nSegments,
                        midColor,
                      )[number]}
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
                    onfocus={interactiveMarkers
                      ? (event) =>
                          onMouseEnterMarker(
                            event,
                            rowValue,
                            markerId,
                            event.currentTarget.getBoundingClientRect(),
                          )
                      : null}
                    onblur={interactiveMarkers
                      ? (event) => onMouseLeaveMarker(event, rowValue, markerId)
                      : null}
                    role="button"
                    aria-label={tooltipContent}
                    tabindex="0"
                    onkeydown={interactiveMarkers
                      ? (event) => onClickMarker(event, rowValue, markerId)
                      : null}
                    pointer-events={interactiveMarkers ? null : "none"}
                    transform="translate({xScale(
                   
                    )(rowValue.value) + markerRadius},{positionChart.chartHeight /
                      2})"
                  >
                    <circle
                      r={markerRadius}
                      cx="0"
                      cy="0"
                      fill={rowValue.color}
                      stroke="white"
                      opacity={rowValue.opacity}
                    ></circle>
                  </g>
                {/if}
              {/each}
            {/each}
          </svg>
        </div>
        {#if moreInfoTogglesArray[i]}
          <div class="accordion" style="grid-column:1 / -1" aria-live="assertive">
            <InsetText content={positionChart.moreInfo} renderStringAsHTML={true}
            ></InsetText>
          </div>
        {/if}
        {#if positionChart.divider}
          <div
            style="grid-column:1 / -1; border-bottom: solid 1px #d5dade;"
          ></div>{/if}
      {/each}
  
      {#if showAxis}
        {#if showIcon}
          <div class="empty"></div>
        {/if}
        {#if showLabel}
          <div class="empty"></div>
        {/if}
        <div class="axis" aria-hidden="true">
          <PositionChartAxis {markerRadius} {barWidth} textSize={axisTextSize}
          ></PositionChartAxis>
        </div>
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
  </div> -->

<style>
  .chart-and-tooltip-container {
    position: relative;
  }

  .chart-flex-container {
    display: flex;
    flex-direction: column;
  }

  .data-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* background-color: lightgreen; */
    padding: 0px 10px 0px 10px;
  }

  .icon-container {
    flex: 0 0 20px;
  }

  .scale-container {
    flex: 1 1 auto;

    /* background-color: lightskyblue; */
  }

  .scale-container svg {
    /* overflow: hisdden; */
    display: block;
    /* background-color: lightcoral; */
  }

  .label-container {
    padding-right: 5px;
  }

  .label-container p {
    padding-top: 3px;
  }

  .divider-line {
    margin: 2px 0px;
    border-bottom: solid 1px #d5dade;
  }

  svg {
    overflow: visible;
  }
</style>
