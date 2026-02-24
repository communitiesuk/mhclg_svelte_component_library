<script>
  let {
    min = undefined,
    max = undefined,
    dist = [],
    color = "grey",
    highlight = "dodgerblue",
    highlightValue = undefined,
    showAxis = true,
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
  } = $props();

  import { interpolateColors } from "../position-chart/interpolateColors";
  import { getColorsForValues } from "../position-chart/getColorsForValues";
  import { splitGroupsAndAverages } from "../position-chart/splitGroupsAndAverages";
  import PositionChartAxis from "../position-chart/PositionChartAxis.svelte";
  import { bin, ticks } from "d3-array";
  import PositionChart from "../position-chart/PositionChart.svelte";
  import Axis from "../axis/Axis.svelte";

  let domainMin = min ?? Math.min(...dist);
  let domainMax = max ?? Math.max(...dist);

  let xTicks = $state([]);
  let yTicks = $state([]);

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : 0);
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 1);
  let yTickMin = $derived(yTicks.length ? Math.min(...yTicks) : 0);
  let yTickMax = $derived(yTicks.length ? Math.max(...yTicks) : 1);

  //  min and max at extremes
  //  let histogram = bin().domain([domainMin, domainMax]).thresholds(thresholds);

  let thresholdsArray = ticks(domainMin, domainMax, thresholds);

  let histogram = bin()
    .domain([thresholdsArray[0], thresholdsArray[thresholdsArray.length - 1]])
    .thresholds(thresholdsArray);

  let buckets = histogram(dist);

  const bins = buckets.map((b) => ({
    x0: b.x0,
    x1: b.x1,
    values: b,
    count: b.length,
  }));

  let nBins = $derived(bins.length);

  let xMin = bins[0]?.x0 ?? 0;
  let xMax = bins[bins.length - 1]?.x1 ?? 1;

  let maxCount = Math.max(...bins.map((b) => b.count));

  let containerWidth = $state(100);

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    (x) =>
      ((x - domainMin) / (domainMax - domainMin)) * (containerWidth - padding),
  );

  let yScale = (count) =>
    (count / Math.max(...bins.map((b) => b.count))) * height;

  let barWidth = bins.length ? xScale(bins[0].x1) - xScale(bins[0].x0) : 0;

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

  function findBinIndex(binned, value) {
    return binned.findIndex((bin) => value >= bin.x0 && value < bin.x1);
  }

  let highlightIndex = $derived(
    highlightValue !== null ? findBinIndex(bins, highlightValue) : -1,
  );
</script>

{#key containerWidth}
  <div
    class="scale-container"
    bind:clientWidth={containerWidth}
    style="height={height}"
  >
    <svg
      class="chart-container"
      width={containerWidth - padding}
      height={showAxis ? height * 1.3 : height}
      transform="translate({padding / 2},0)"
    >
      <defs>
        <marker
          id="arrow-down"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          fill="#666666"
          markerUnits="strokeWidth"
        >
          <!-- Simple upward pointing arrow -->
          <path d="M 0 0 L 6 3 L 0 6 z"></path>
        </marker>
      </defs>
      <g transform="translate(0,0)">
        <Axis
          bind:ticksArray={xTicks}
          chartHeight={height}
          chartWidth={containerWidth - padding}
          orientation={{ axis: "x", position: "bottom" }}
          domain={[xTickMin, xTickMax]}
          range={useRange}
          values={dist}
          fontSize={14}
          {floor}
          {ceiling}
        ></Axis>
        <Axis
          bind:ticksArray={yTicks}
          chartHeight={height}
          chartWidth={containerWidth - padding}
          orientation={{ axis: "y", position: "left" }}
          domain={[0, yTickMax]}
          range={[height, 0]}
          values={dist}
          fontSize={0}
          {floor}
          {ceiling}
        ></Axis>
      </g>
      <g transform="translate(0,0)">
        {#each bins as bin, i}
          {#key bin.x0}
            <rect
              x={xScale(bin.x0)}
              y={height - yScale(bin.count)}
              width={xScale(bin.x1) - xScale(bin.x0)}
              height={yScale(bin.count)}
              fill={interpolatedColors[i]}
              stroke-width={i === highlightIndex ? 0 : 0}
            ></rect>
          {/key}
        {/each}
        <g transform="translate(0,0)">
          {#if highlightIndex !== undefined && bins[highlightIndex]}
            {#key bins[highlightIndex].x0}
              <rect
                x={xScale(bins[highlightIndex].x0)}
                y={height - yScale(bins[highlightIndex].count)}
                width={(xScale(bins[highlightIndex].x1) -
                  xScale(bins[highlightIndex].x0)) *
                  0.9}
                height={yScale(bins[highlightIndex].count)}
                fill={interpolatedColors[highlightIndex]}
                stroke="white"
                stroke-width={3}
              ></rect>
              <rect
                x={xScale(bins[highlightIndex].x0)}
                y={height - yScale(bins[highlightIndex].count)}
                width={(xScale(bins[highlightIndex].x1) -
                  xScale(bins[highlightIndex].x0)) *
                  0.9}
                height={yScale(bins[highlightIndex].count)}
                fill={interpolatedColors[highlightIndex]}
                stroke="black"
                stroke-width={1}
              ></rect>

              <line
                x1={xScale(bins[highlightIndex].x1) -
                  (xScale(bins[highlightIndex].x1) -
                    xScale(bins[highlightIndex].x0)) /
                    2}
                y2={height - yScale(bins[highlightIndex].count) - 15}
                x2={xScale(bins[highlightIndex].x1) -
                  (xScale(bins[highlightIndex].x1) -
                    xScale(bins[highlightIndex].x0)) /
                    2}
                y1={height - yScale(bins[highlightIndex].count) - 30}
                stroke="#666666"
                stroke-width="1.5"
                marker-end="url(#arrow-down)"
              ></line>
              <g
                transform="translate({xScale(bins[highlightIndex].x0)},{height -
                  yScale(bins[highlightIndex].count) -
                  35})"
              >
                <text font-size="0.8em" fill="#777777">{annotationText}</text>
              </g>
            {/key}
          {/if}
        </g>
      </g>
      <!-- <g transform="translate({highlightIndex < nBins / 2 ? -5 : -5},-2)">
        <text font-size="0.8em" fill="#777777">↑ Number of areas</text>
      </g> -->
    </svg>
    <PositionChartAxis
      chartWidth={containerWidth - padding}
      axisLabels={["Worse than average", "Better than average"]}
      textSize="xs"
    ></PositionChartAxis>
  </div>
{/key}

<style>
  .chart-container {
  }
  .scale-container {
    /* flex: 1 1 auto; */
  }

  .scale-container svg {
    overflow: visible;
    display: block;
  }
</style>
