<script>
  import { bin, ticks } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { interpolateColors } from "../position-chart/interpolateColors";
  import { getColorsForValues } from "../position-chart/getColorsForValues";
  import { splitGroupsAndAverages } from "../position-chart/splitGroupsAndAverages";
  import Axis from "../axis/Axis.svelte";
  import PositionChartAxis from "../position-chart/PositionChartAxis.svelte";
  import ValueLabel from "../line-chart/ValueLabel.svelte";

  let {
    min = undefined,
    max = undefined,
    dist = [],
    color = "grey",
    highlightColor = "dodgerblue",
    highlightValue = undefined,
    showAxis = true,
    showArrows = true,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    thresholds = 20,
    floor = undefined,
    ceiling = undefined,
    padding = 0,
    height = 50,
    polarity = "standard",
    annotationText = "",
    labelFormatter = (tick) => tick,
  } = $props();

  // Container width
  let containerWidth = $state(100);

  // Compute domain
  let domainMin = min ?? Math.min(...dist);
  let domainMax = max ?? Math.max(...dist);

  // Compute bins
  let thresholdsArray = ticks(domainMin, domainMax, thresholds);
  let histogram = bin()
    .domain([thresholdsArray[0], thresholdsArray[thresholdsArray.length - 1]])
    .thresholds(thresholdsArray);

  let buckets = histogram(dist);
  const bins = buckets.map((b) => ({
    x0: b.x0,
    x1: b.x1,
    count: b.length,
    values: b,
  }));

  let nBins = $derived(bins.length);
  let maxCount = Math.max(...bins.map((b) => b.count));

  // Scale functions
  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    (x) =>
      ((x - domainMin) / (domainMax - domainMin)) * (containerWidth - padding),
  );

  let yScale = (count) => (count / maxCount) * height;

  let colors1000 = $derived(
    interpolateColors(startColor, endColor, 1000, midColor),
  );
  let interpolatedColors = $derived(
    getColorsForValues(
      colors1000.reverse(),
      min,
      max,
      splitGroupsAndAverages(dist, nBins).averages.reverse(),
    ),
  );

  // Highlight logic
  function findBinIndex(value) {
    return bins.findIndex((bin) => value >= bin.x0 && value < bin.x1);
  }
  let highlightIndex = $derived(
    highlightValue !== null ? findBinIndex(highlightValue) : -1,
  );

  // Hover and click state
  let hoveredBinIndex = $state(-1);
  let clickedBinIndex = $state(-1);

  function handleMouseEnter(i) {
    hoveredBinIndex = i;
  }
  function handleMouseLeave() {
    hoveredBinIndex = -1;
  }
  function handleClick(i) {
    clickedBinIndex = i === clickedBinIndex ? -1 : i;
  }
  let xTicks = $state([]);
  let yTicks = $state([]);
</script>

<div
  class="scale-container"
  bind:clientWidth={containerWidth}
  style="height:{height}px"
>
  <svg
    width={containerWidth - padding}
    height={showAxis ? height * 1.3 : height}
  >
    {#if showAxis}
      <g>
        <Axis
          bind:ticksArray={xTicks}
          chartHeight={height}
          chartWidth={containerWidth - padding}
          orientation={{ axis: "x", position: "bottom" }}
          domain={[domainMin, domainMax]}
          range={useRange}
          values={dist}
          fontSize={14}
          {floor}
          {ceiling}
          {labelFormatter}
        />
        <Axis
          bind:ticksArray={yTicks}
          chartHeight={height}
          chartWidth={containerWidth - padding}
          orientation={{ axis: "y", position: "left" }}
          domain={[0, maxCount]}
          range={[height, 0]}
          values={dist}
          fontSize={0}
          {floor}
          {ceiling}
        />
      </g>
    {/if}

    <!-- Histogram bars -->
    <g>
      {#each bins as bin, i}
        {#key bin.x0}
          <rect
            x={xScale(bin.x0)}
            y={height - yScale(bin.count)}
            width={xScale(bin.x1) - xScale(bin.x0)}
            height={yScale(bin.count)}
            fill={i === highlightIndex ? highlightColor : interpolatedColors[i]}
            stroke={i === clickedBinIndex ? highlightColor : "none"}
            stroke-width={i === clickedBinIndex ? 2 : 0}
            on:mouseenter={() => handleMouseEnter(i)}
            on:mouseleave={handleMouseLeave}
            on:click={() => handleClick(i)}
          ></rect>
        {/key}
      {/each}
    </g>
  </svg>

  <!-- Tooltip for hover or click -->
  {#if hoveredBinIndex >= 0 || clickedBinIndex >= 0}
    <ValueLabel
      activeMarkerId={{
        value:
          bins[hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex].count,
        range: `${bins[
          hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex
        ].x0.toFixed(2)} - ${bins[
          hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex
        ].x1.toFixed(2)}`,
      }}
      markerRect={{
        x:
          xScale(
            bins[hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex].x0,
          ) +
          (xScale(
            bins[hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex].x1,
          ) -
            xScale(
              bins[hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex].x0,
            )) /
            2,
        y:
          height -
          yScale(
            bins[hoveredBinIndex >= 0 ? hoveredBinIndex : clickedBinIndex]
              .count,
          ),
      }}
      topWidth={containerWidth - padding}
      labelColor={highlightColor}
      tooltipContent="value"
    />
  {/if}
</div>

<style>
  .scale-container {
    position: relative;
  }
  svg {
    overflow: visible;
    display: block;
  }
</style>
