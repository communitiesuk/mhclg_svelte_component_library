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
    nSegments = 10,
    startColor = "#8EB8DC",
    endColor = "#0F385C",
    midColor = undefined,
    colorScale = undefined,
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
    topLabel = true,
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
  } = $props();

  // base defaults that apply to every row
  const baseRow = { value, colour, opacity };

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

  let openLabel = $state();
  let annotation = $state(true);

  let annotationArrowPosition = $derived(
    Object.values(allDataNormalized[0].rowData)[0][0].value,
  );

  let annotationText = $state("Bournemouth, Christchurch and Poole 008A");

  let showLabel = $derived(
    allDataNormalized.some((obj) => obj.label !== undefined),
  );
  let showIcon = $state(true);
  let numberOfPositionCharts = $derived(allDataNormalized.length);
  let gridTemplateColumns = $derived(
    showIcon && showLabel
      ? "auto auto 1fr"
      : showIcon
        ? "auto 1fr"
        : showLabel
          ? "auto 1fr"
          : "1fr",
  );

  let gridTemplateRows = $derived(() => {
    let rows = showAxis ? numberOfPositionCharts + 2 : numberOfPositionCharts;
    if (open) rows += 1;
    return `repeat(${rows}, auto)`;
  });
  const range = $derived(Array.from({ length: nSegments }, (_, i) => i));

  function interpolateColors(hex1, hex2, steps, hexMid = null) {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((x) => x + x)
          .join("");
      }
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
    // Convert RGB to hex
    const rgbToHex = ({ r, g, b }) =>
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
    // Helper: interpolate between two colors
    const interpolate = (start, end, count) => {
      const arr = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const r = Math.round(start.r + (end.r - start.r) * t);
        const g = Math.round(start.g + (end.g - start.g) * t);
        const b = Math.round(start.b + (end.b - start.b) * t);
        arr.push({ r, g, b });
      }
      return arr;
    };
    const start = hexToRgb(hex1);
    const end = hexToRgb(hex2);
    // Case 1: just two colors
    if (!hexMid) {
      return interpolate(start, end, steps).map(rgbToHex);
    }
    // Case 2: three colors
    const mid = hexToRgb(hexMid);
    const result = [];
    if (steps % 2 === 1) {
      // Odd steps → midpoint included
      const half = (steps - 1) / 2;
      const firstHalf = interpolate(start, mid, half + 1); // includes mid
      const secondHalf = interpolate(mid, end, half + 1); // includes mid again
      result.push(
        ...firstHalf.slice(0, -1).map(rgbToHex), // drop duplicate mid
        ...secondHalf.map(rgbToHex),
      );
    } else {
      // Even steps → midpoint excluded
      const half = steps / 2;
      const firstHalf = interpolate(start, mid, half + 1); // includes mid
      const secondHalf = interpolate(mid, end, half + 1); // includes mid again
      result.push(
        ...firstHalf.slice(0, -1).map(rgbToHex), // drop mid
        ...secondHalf.slice(1).map(rgbToHex), // drop mid
      );
    }
    return result;
  }

  // the 'marker' is the circle
  let markerRadius = $derived(chartHeight / 2);

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  function xFunction(min, max) {
    return scaleLinear().domain([min, max]).range([0, barWidth]);
  }

  // const colorScale = [
  //   "#090C50",
  //   "#1B3E70",
  //   "#2B658F",
  //   "#357EA2",
  //   "#4297AD",
  //   "#5BB1AE",
  //   "#7ABFA8",
  //   "#98CCA2",
  //   "#B6D89F",
  //   "#D2E49D",
  // ];
</script>

{#if annotation}
  <div bind:clientWidth={topWidth}>
    <svg width={topWidth} height="88">
      <!-- {#if !activeMarkerId} -->
      <g>
        <!-- Example text inside SVG -->
        <text
          id="label"
          x="0"
          y="50"
          fill="purple"
          font-size="20"
          stroke-width="3"
          opacity={typeof activeMarkerId !== "undefined" && activeMarkerId
            ? 0.2
            : 1}
        >
          {annotationText}
        </text>
      </g>
      <defs>
        <!-- Reusable arrow marker -->
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
          <path d="M 0 0 L 6 3 L 0 6 z" fill="purple"></path>
        </marker>
      </defs>
      <path
        d="M 4 55 v 10 h {xFunction(min, max)(annotationArrowPosition) +
          markerRadius -
          4 +
          (topWidth - chartWidth)}  v 15"
        fill="none"
        stroke="purple"
        stroke-width="2"
        marker-end="url(#arrow-down)"
        opacity={typeof activeMarkerId !== "undefined" && activeMarkerId
          ? 0.2
          : 1}
      ></path>
      <!-- {/if} -->
    </svg>
  </div>
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
      <p class="label">{positionChart.label}</p>
    {/if}
    {#if showIcon}
      <button
        id="info-{positionChart.label}"
        onclick={() => onClickIcon(positionChart.label)}>ⓘ</button
      >
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
              (barWidth * number) / nSegments},{(positionChart.chartHeight -
              barHeight) /
              2})"
            ><rect
              width={barWidth / nSegments}
              height={barHeight}
              fill={colorScale && colorScale.length > 0
                ? colorScale[number]
                : interpolateColors(startColor, endColor, nSegments, midColor)[
                    number
                  ]}
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
    {#if openLabel === positionChart.label}
      <div style="grid-column:1 / -1; background-color:lightgrey; padding:10px">
        <p>
          Description for {positionChart.label}
        </p>
      </div>
    {/if}
  {/each}
  {#if showAxis}
    {#if showIcon}
      <div class="empty"></div>
    {/if}
    {#if showLabel}
      <div class="empty"></div>
    {/if}
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
    flex-direction: column;
    justify-content: flex-end;
    min-width: 0;
  }
</style>
