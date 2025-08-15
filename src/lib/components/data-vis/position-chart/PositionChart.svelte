<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
  let {
    componentNameProp = undefined,
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    componentWidth = $bindable(500),
    showAxis = true,
    chartWidth = $bindable(500),
    stacked = false,
    numberOfRows = 1,
    chartHeight = 24,
  } = $props();

  const range = Array.from({ length: 10 }, (_, i) => i);

  // the 'chart' is the bar and the marker - its height is a prop and its width is binded to clientWidth

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
  class={label ? "grid-container" : "chart-and-axis"}
  class:stacked={stacked === true}
  style=" --rows: {numberOfRows + 1};"
>
  {#if label}
    <p class="label">{label}</p>
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
      <g
        transform="translate({xFunction(value) + markerRadius},{chartHeight /
          2})"
        ><circle r={markerRadius} cx="0" cy="0" fill="#CA357C" stroke="white"
        ></circle></g
      >
    </svg>
  </div>

  {#if showAxis === true}
    <div class="axis">
      <PositionChartAxis {markerRadius} {barWidth}></PositionChartAxis>
    </div>
  {/if}
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(var(--rows), 1fr);
    align-items: center;
    column-gap: 2%;
    row-gap: 0;
  }
  .grid-container.stacked {
    display: contents;
  }
  .label {
    text-align: right;
    margin: 0;
  }
  .chart-and-axis {
    display: flex;
    flex-direction: column;
  }
  .chart {
    display: flex;
    justify-content: center;
    min-width: 0;
  }
  .axis {
    grid-row: var(--rows);
    grid-column: 2;
  }
</style>
