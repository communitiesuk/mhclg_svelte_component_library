<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
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
  } = $props();

  // base defaults that apply to every row
  const baseRow = { value, colour, opacity };

  // base defaults that apply to every chart
  const baseChart = { label, chartHeight, min, max, showAxis };

  let allDataNormalized = $derived(
    allData.map((chart) => ({
      ...baseChart,
      ...chart,
      rowData: chart.rowData.map((r, idx) => {
        const tier = Object.keys(markerStyles).find((t) =>
          assignMarkerTier(t, chart, idx),
        );
        const markerStyle = tier ? markerStyles[tier] : {};
        return { ...baseRow, ...markerStyle, ...r };
      }),
    })),
  );
  $inspect({ allDataNormalized });

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
  style="
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
        {#each positionChart.rowData as rowValue, i}
          <g
            transform="translate({xFunction(
              positionChart.min,
              positionChart.max,
            )(rowValue.value) + markerRadius},{positionChart.chartHeight / 2})"
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
      </svg>
    </div>
  {/each}

  {#if showAxis === true}
    <div class="empty"></div>
    <div class="axis">
      <PositionChartAxis {markerRadius} {barWidth}></PositionChartAxis>
    </div>
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
