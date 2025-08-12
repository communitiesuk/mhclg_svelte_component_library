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
    showAxis = undefined,
    chartWidth = $bindable(500),
    stacked = false,
    numberOfRows = 1,
  } = $props();

  const range = Array.from({ length: 10 }, (_, i) => i);

  let markerRadius = $derived(chartWidth / 40);

  let barWidth = $derived(chartWidth - markerRadius * 2);

  let xFunction = $derived(
    scaleLinear().domain([min, max]).range([0, barWidth]),
  );

  let barHeight = 20;
  let chartHeight = barHeight * 1.5;

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
  $inspect({ numberOfRows });
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div
  class="grid-container"
  class:stacked={stacked === true}
  style=" --rows: {numberOfRows + 1};"
>
  {#if label}
    <p class="label">{label}</p>
  {/if}

  <div
    class="bar"
    style="height: {barHeight * 1.5}px"
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
        transform="translate({xFunction(value) + markerRadius},{(chartHeight -
          barHeight) /
          2})"
        ><circle
          r={markerRadius}
          cx="0"
          cy={barHeight / 2}
          fill="#FFB400"
          stroke="white"
        ></circle></g
      >
    </svg>
  </div>

  {#if showAxis === true}
    <div class="axis-component">
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
  .bar {
    display: flex;
    justify-content: center;
    min-width: 0;
  }
  .axis-component {
    grid-row: var(--rows);
    grid-column: 2;
  }
</style>
