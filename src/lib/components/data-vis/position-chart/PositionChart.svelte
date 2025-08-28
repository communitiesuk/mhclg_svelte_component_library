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
    chartWidth = $bindable(500),
    stacked = false,
    numberOfPositionCharts = 1,
    chartHeight = 24,
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

  const range = Array.from({ length: 10 }, (_, i) => i);

  // the 'chart' is the bar and the marker - its height is a prop and its width is binded to clientWidth

  // the 'marker' is the circle
  let markerRadius = $derived(chartHeight / 2);

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);
  $inspect({ activeMarkerId });

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
  style=" --rows: {numberOfPositionCharts + 1};"
>
  {#if label}
    <p class="label">{label}</p>
  {/if}

  <div
    class="chart"
    style="height: {chartHeight}px; border: 1px solid red;  position: relative"
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
      {#if typeof value === "number"}
        {@const markerId = "marker-" + value}

        <g
          data-id={markerId}
          onclick={interactiveMarkers
            ? (event) => onClickMarker(event, value, markerId)
            : null}
          onmouseenter={interactiveMarkers
            ? (event) =>
                onMouseEnterMarker(
                  event,
                  value,
                  markerId,
                  event.currentTarget.getBoundingClientRect(),
                )
            : null}
          onmouseleave={interactiveMarkers
            ? (event) => onMouseLeaveMarker(event, value, markerId)
            : null}
          role="button"
          tabindex="0"
          onkeydown={interactiveMarkers
            ? (e) => e.key === "Enter" && onClickMarker(e, value)
            : null}
          pointer-events={interactiveMarkers ? null : "none"}
          transform="translate({xFunction(value) + markerRadius},{chartHeight /
            2})"
        >
          <circle r={markerRadius} cx="0" cy="0" fill="#CA357C" stroke="white"
          ></circle></g
        >
      {:else}
        {#each value as rowValue, i}
          {@const markerId = "marker-" + rowValue}
          <g
            transform="translate({xFunction(rowValue.data) +
              markerRadius},{chartHeight / 2})"
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
              ? (e) => e.key === "Enter" && onClickMarker(e, rowValue)
              : null}
            pointer-events={interactiveMarkers ? null : "none"}
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
    </svg>
  </div>

  {#if showAxis === true}
    <div class="axis">
      <PositionChartAxis {markerRadius} {barWidth}></PositionChartAxis>
    </div>
  {/if}
</div>

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
    line-height: 1.05;
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
