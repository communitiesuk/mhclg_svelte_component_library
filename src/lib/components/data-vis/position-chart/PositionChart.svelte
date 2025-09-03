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
    // dataObject = [{ value: value, label: label }],
  } = $props();

  let dataObject = [{ value: 4, label: undefined }, { value: 4 }];

  let showLabel = $derived(dataObject.some((obj) => obj.label !== undefined));

  let numberOfPositionCharts = $derived(dataObject.length);
  $inspect(numberOfPositionCharts);
  let gridTemplateColumns = showLabel ? "auto 1fr" : "1fr";
  let gridTemplateRows = $derived(
    `repeat(${showAxis ? numberOfPositionCharts + 1 : numberOfPositionCharts}, auto)`,
  );

  $inspect(gridTemplateRows);

  const range = Array.from({ length: 10 }, (_, i) => i);

  // the 'marker' is the circle
  let markerRadius = $derived(chartHeight / 2);

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  let xFunction = $derived(
    scaleLinear().domain([min, max]).range([0, barWidth]),
  );

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
  {#each dataObject as positionChart, i}
    {#if label}
      <p class="label">{positionChart.label}</p>
    {/if}

    <div
      class="chart"
      style="height: {chartHeight}px"
      bind:clientWidth={chartWidth}
    >
      <svg width={chartWidth} height={chartHeight}>
        {#each range as number}
          <g
            transform="translate({markerRadius +
              (barWidth * number) / 10},{(chartHeight - barHeight) / 2})"
            ><rect
              width={barWidth / 10}
              height={barHeight}
              fill={colorScale[number]}
            ></rect></g
          >{/each}
        {#if value || positionChart.value}
          {#if typeof value === "number"}
            <g
              transform="translate({xFunction(positionChart.value) +
                markerRadius},{chartHeight / 2})"
            >
              <circle
                r={markerRadius}
                cx="0"
                cy="0"
                fill="#CA357C"
                stroke="white"
              ></circle></g
            >
          {:else}
            {#each positionChart.value as rowValue, i}
              <g
                transform="translate({xFunction(rowValue.data) +
                  markerRadius},{chartHeight / 2})"
              >
                <circle
                  r={markerRadius}
                  cx="0"
                  cy="0"
                  fill={rowValue.color}
                  stroke="white"
                ></circle>
              </g>
            {/each}
          {/if}
        {/if}
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
