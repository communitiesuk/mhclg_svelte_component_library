<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
  import ValueLabel from "../line-chart/ValueLabel.svelte";
  let {
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    showAxis = true,
    chartWidth = $bindable(500), // the 'chart' is the bar and the marker
    chartHeight = 24,
    colour = "purple",
    opacity = 1,
    rowData = [{ value: value, colour: colour, opacity: opacity }],
    allData = [{ rowData, label: label, chartHeight: chartHeight }],
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
  } = $props();

  // base defaults that apply to every row
  const baseRow = { value, colour, opacity };

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

  let showLabel = $derived(
    allDataNormalized.some((obj) => obj.label !== undefined),
  );

  let numberOfPositionCharts = $derived(allDataNormalized.length);
  let gridTemplateColumns = $derived(showLabel ? "auto 1fr" : "1fr");
  let gridTemplateRows = $derived(
    `repeat(${showAxis ? numberOfPositionCharts + 1 : numberOfPositionCharts}, auto)`,
  );

  const range = Array.from({ length: 10 }, (_, i) => i);

  // the 'marker' is the circle
  let markerRadius = $derived(chartHeight / 2);

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  function xFunction(min, max) {
    return scaleLinear().domain([min, max]).range([0, barWidth]);
  }

  const colorScale = [
    "#090C50",
    "#1B3E70",
    "#2B658F",
    "#357EA2",
    "#4297AD",
    "#5BB1AE",
    "#7ABFA8",
    "#98CCA2",
    "#B6D89F",
    "#D2E49D",
  ];
</script>

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
      <p class="label">{positionChart.label}</p>
    {/if}

    <div
      class="chart"
      style="height: {positionChart.chartHeight}px"
      bind:clientWidth={chartWidth}
    >
      <svg width={chartWidth} height={positionChart.chartHeight}>
        {#each range as number}
          <g
            transform="translate({markerRadius +
              (barWidth * number) / 10},{(positionChart.chartHeight -
              barHeight) /
              2})"
            ><rect
              width={barWidth / 10}
              height={barHeight}
              fill={colorScale[number]}
            ></rect></g
          >{/each}
        {#each Object.entries(positionChart.rowData) as [tier, points]}
          {#each points as rowValue, i}
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
                positionChart.min,
                positionChart.max,
              )(rowValue.value) + markerRadius},{positionChart.chartHeight /
                2})"
            >
              <circle
                r={markerRadius}
                cx="0"
                cy="0"
                fill={rowValue.colour}
                stroke="white"
                opacity={rowValue.opacity}
              ></circle>
            </g>
          {/each}
        {/each}
      </svg>
    </div>
  {/each}

  {#if showAxis === true}
    <div class="empty"></div>
    <div class="axis">
      <PositionChartAxis {markerRadius} {barWidth}></PositionChartAxis>
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

<style>
  .grid-container {
    display: grid;
    align-items: center;
    column-gap: 2%;
    row-gap: 0;
  }
  .label {
    text-align: right;
    margin: 0;
    line-height: 1.05;
  }
  .chart {
    display: flex;
    justify-content: center;
    min-width: 0;
  }
</style>
