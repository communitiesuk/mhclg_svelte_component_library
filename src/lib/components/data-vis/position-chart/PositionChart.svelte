<script>
  import { scaleLinear } from "d3-scale";
  import PositionChartAxis from "./PositionChartAxis.svelte";
  import ValueLabel from "../line-chart/ValueLabel.svelte";
  import Button from "../../ui/Button.svelte";
  import InsetText from "../../content/InsetText.svelte";
  let {
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    showAxis = true,
    chartWidth = $bindable(500), // the 'chart' is the bar and the marker
    chartHeight = 24,
    colour = "#CA357C",
    nSegments = 10,
    startColor = "#8EB8DC",
    endColor = "#0F385C",
    midColor = undefined,
    colorScale = undefined,
    opacity = 1,
    annotation = undefined,
    showIcon = false,
    moreInfo = undefined,
    markerRadius = chartHeight / 2,
    options = [],
    rowData = [
      {
        value: value,
        colour: colour,
        opacity: opacity,
        annotation: annotation,
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
  const baseRow = { value, colour, opacity, annotation };

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

  let moreInfoTogglesArray = $state(
    Array.from({ length: options.length }, () => false),
  );

  function updateMoreInfoTogglesArray(index) {
    moreInfoTogglesArray[index] = !moreInfoTogglesArray[index];
  }

  let showLabel = $derived(
    allDataNormalized.some((obj) => obj.label !== undefined),
  );
  let numberOfPositionCharts = $derived(allDataNormalized.length);
  let gridTemplateColumns = $derived(
    showLabel && showIcon
      ? "30% auto 1fr"
      : showLabel
        ? "30% 1fr"
        : showIcon
          ? "auto 1fr"
          : "1fr",
  );

  let divider = $derived(
    allDataNormalized.some((obj) => obj.divider !== undefined),
  );

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

  // the 'bar' is the 10 rectangles side by side
  let barWidth = $derived(chartWidth - markerRadius * 2);
  let barHeight = $derived((chartHeight * 5) / 6);

  function xFunction(min, max) {
    return scaleLinear().domain([min, max]).range([0, barWidth]);
  }

  let annotations = $derived(
    Object.values(allDataNormalized[0].rowData)
      .flat()
      .filter(
        (d) => typeof d.annotation === "string" && d.annotation.length > 0,
      ),
  );

  let gridTemplateRows = $derived(
    allDataNormalized
      .map((item, i) => {
        const sizes = ["minmax(0,1fr)"];
        if (moreInfoTogglesArray[i]) sizes.push("minmax(0,auto)");
        if (item.divider === "true") sizes.push("minmax(0,auto)");
        return sizes.join(" "); // still fine because number of rows matches
      })
      .concat(showAxis ? ["minmax(0,auto)"] : [])
      .join(" "),
  );
</script>

{#if annotations.length}
  {#each annotations as d (d.value)}
    <div bind:clientWidth={topWidth}>
      <svg width={topWidth} height="60">
        <g>
          <text
            font-family="GDS Transport"
            id="label"
            x={d.value}
            y="20"
            fill={d.colour}
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
            <path d="M 0 0 L 6 3 L 0 6 z" fill={d.colour}></path>
          </marker>
        </defs>
        <path
          d="M 4 25 v 10 h {xFunction(min, max)(d.value) +
            markerRadius -
            4 +
            (topWidth - chartWidth)}  v 15"
          fill="none"
          stroke={d.colour}
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
        class="govuk-body-s"
        style=" text-align: right;
    margin: 0;
    line-height: 1.05;"
      >
        {positionChart.label}
      </p>
    {/if}
    {#if showIcon}
      <div class="button-container">
        <Button
          textContent="i"
          buttonType="moreInfo"
          noPadding={true}
          onClickFunction={() => updateMoreInfoTogglesArray(i)}
        ></Button>
      </div>
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
            {/if}
          {/each}
        {/each}
      </svg>
    </div>
    {#if moreInfoTogglesArray[i]}
      <div class="accordion" style="grid-column:1 / -1">
        <InsetText content={positionChart.moreInfo} renderStringAsHTML={true}
        ></InsetText>
      </div>
    {/if}
    {#if positionChart.divider}
      <div style="grid-column:1 / -1">
        <svg width="100%" height="5">
          <line
            x1="0"
            y1="2.5"
            x2="100%"
            y2="2.55"
            stroke="grey"
            stroke-width="0.5"
          ></line>
        </svg>
      </div>{/if}
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
    row-gap: 2%;
  }
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 0;
  }
</style>
