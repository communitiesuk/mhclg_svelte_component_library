<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
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
    nSegments = 10,
    startColor = "#8EB8DC",
    endColor = "#0F385C",
    midColor = undefined,
    colorScale = undefined,
  } = $props();

  const range = $derived(Array.from({ length: nSegments }, (_, i) => i));

  $inspect(range);

  // the 'chart' is the bar and the marker - its height is a prop and its width is binded to clientWidth

  // the 'marker' is the circle
  let markerRadius = $derived(chartHeight / 2);

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  let xFunction = $derived(
    scaleLinear().domain([min, max]).range([0, barWidth]),
  );

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
    style="height: {chartHeight}px"
    bind:clientWidth={chartWidth}
  >
    <svg width={chartWidth} height={chartHeight}>
      {#each range as number}
        <g
          transform="translate({markerRadius +
            (barWidth * number) / nSegments},{(chartHeight - barHeight) / 2})"
          ><rect
            width={barWidth / nSegments}
            height={barHeight}
            fill={colorScale
              ? colorScale[number]
              : interpolateColors(startColour, endColour, nSegments)[number]}
          ></rect></g
        >{/each}
      {#if typeof value === "number"}
        <g
          transform="translate({xFunction(value) + markerRadius},{chartHeight /
            2})"
        >
          <circle r={markerRadius} cx="0" cy="0" fill="#CA357C" stroke="white"
          ></circle></g
        >
      {:else}
        {#each value as rowValue, i}
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
