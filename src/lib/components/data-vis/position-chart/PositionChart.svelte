<script>
  import { scaleLinear } from "d3-scale";
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
    <div
      class="axis"
      style="--axis-padding:{markerRadius}px; width: {barWidth}"
    >
      <div class="more-deprived">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="16"
          viewBox="0 0 11 16"
          fill="none"
        >
          <path
            d="M0.292893 7.29289C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928933L0.292893 7.29289ZM11 8L11 7L1 7L1 8L1 9L11 9L11 8Z"
            fill="#B1B4B6"
          ></path>
        </svg>
        <span>More deprived</span>
      </div>
      <div class="average">Average</div>
      <div class="less-deprived">
        <span>Less deprived</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
        >
          <path
            d="M11.2071 8.70711C11.5976 8.31658 11.5976 7.68342 11.2071 7.2929L4.84315 0.928933C4.45262 0.538409 3.81946 0.538408 3.42893 0.928933C3.03841 1.31946 3.03841 1.95262 3.42893 2.34315L9.08579 8L3.42893 13.6569C3.03841 14.0474 3.03841 14.6805 3.42893 15.0711C3.81946 15.4616 4.45262 15.4616 4.84314 15.0711L11.2071 8.70711ZM0.5 8L0.5 9L10.5 9L10.5 8L10.5 7L0.5 7L0.5 8Z"
            fill="#B1B4B6"
          ></path>
        </svg>
      </div>
    </div>
  {/if}
</div>

<style>
  .label {
    text-align: right;
    margin: 0;
  }

  .bar {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    min-width: 0;
  }

  .axis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--axis-padding);
    grid-row: var(--rows);
    grid-column: 2;
  }

  .less-deprived,
  .more-deprived {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .bar-and-axis {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(var(--rows), 1fr);
    /* grid-auto-rows: 1fr; */
    align-items: center;
    column-gap: 2%;
    row-gap: 0;
  }
  .grid-container.stacked {
    display: contents;
  }
</style>
