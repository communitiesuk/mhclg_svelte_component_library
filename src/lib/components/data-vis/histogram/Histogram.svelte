<script>
  let {
    min = undefined,
    max = undefined,
    dist = [],
    color = "grey",
    highlightColor = "black",
    highlightValue = undefined,
    showAxis = true,
    showArrows = true,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    thresholds = 10,
    floor = undefined,
    ceiling = undefined,
    padding = 0,
    height = 50,
    polarity = "standard",
    annotationText = "",
    labelFormatter = (tick, index, numberOfTicks, values) => {
      return tick;
    },
  } = $props();

  import { interpolateColors } from "../position-chart/interpolateColors";
  import { getColorsForValues } from "../position-chart/getColorsForValues";
  import { splitGroupsAndAverages } from "../position-chart/splitGroupsAndAverages";
  import PositionChartAxis from "../position-chart/PositionChartAxis.svelte";
  import { bin, ticks } from "d3-array";
  import PositionChart from "../position-chart/PositionChart.svelte";
  import Axis from "../axis/Axis.svelte";
  import { scaleLinear } from "d3-scale";
  import ValueLabel from "../line-chart/ValueLabel.svelte";
  import { createEqualWidthBins } from "../position-chart/createEqualWidthBins";
  import { assignBinColors } from "../position-chart/assignBinColors";

  let domainMin = min ?? Math.min(...dist);
  let domainMax = max ?? Math.max(...dist);

  let xTicks = $state([]);
  let yTicks = $state([]);

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : 0);
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 1);
  let yTickMin = $derived(yTicks.length ? Math.min(...yTicks) : 0);
  let yTickMax = $derived(yTicks.length ? Math.max(...yTicks) : 1);

  import { median, quantile } from "d3-array";

  let distSorted = $derived(dist.slice().sort((a, b) => a - b));
  let rawMedian = $derived(median(distSorted));

  //  min and max at extremes
  //  let histogram = bin().domain([domainMin, domainMax]).thresholds(thresholds);

  /////////
  // calculating thresholds from raw data:
  /////////
  // let thresholdsArray = ticks(domainMin, domainMax, thresholds);

  // let histogram = bin()
  //   .domain([thresholdsArray[0], thresholdsArray[thresholdsArray.length - 1]])
  //   .thresholds(thresholdsArray);

  // let buckets = histogram(dist);

  // const obins = buckets.map((b) => ({
  //   x0: b.x0,
  //   x1: b.x1,
  //   count: b.length,
  // }));
  /////////

  // won't get xTick and xTickMax if showAxis is false
  // run it anyway inside an else block
  let bins = $derived(createEqualWidthBins(xTickMin, xTickMax, 10, dist));

  let proportionInExtremeBins = $derived([
    bins[0]["count"] / distSorted.length,
    bins.at(-1)["count"] / distSorted.length,
  ]);

  let nBins = $derived(bins.length);

  let xMin = $derived(bins[0]?.x0 ?? 0);
  let xMax = $derived(bins[bins.length - 1]?.x1 ?? 1);

  let maxCount = $derived(Math.max(...bins.map((b) => b.count)));

  let containerWidth = $state(100);

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    scaleLinear().domain([xTickMin, xTickMax]).range(useRange),
  );
  let oldxScale = $derived(
    (x) =>
      ((x - domainMin) / (domainMax - domainMin)) * (containerWidth - padding),
  );
  let yScale = (count) =>
    (count / Math.max(...bins.map((b) => b.count))) * height;

  let barWidth = $derived(
    bins.length ? xScale(bins[0].x1) - xScale(bins[0].x0) : 0,
  );

  import chroma from "chroma-js";

  let midPosition = $derived((rawMedian - xTickMin) / (xTickMax - xTickMin));

  let c1000 = $derived(
    chroma
      .scale([startColor, midColor, endColor])
      .domain([0, midPosition, 1])
      .colors(1000),
  );

  let colors1000 = $derived(
    polarity === "reverse"
      ? c1000.reverse() // only done once
      : c1000,
  );

  let thisDomain = $derived(
    polarity === "reverse"
      ? [0, midPosition, 1].reverse() // only done once
      : [0, midPosition, 1],
  );

  // let colors1000 = $derived(
  //   polarity === "reverse"
  //     ? interpolateColors(startColor, endColor, 1000, midColor).reverse() // only done once
  //     : interpolateColors(startColor, endColor, 1000, midColor),
  // );

  let averagesForSegments = $derived(
    splitGroupsAndAverages(dist, nSegments).averages,
  );

  let preBin = $derived(
    chroma
      .scale([startColor, midColor, endColor])
      .domain(thisDomain)
      .padding([proportionInExtremeBins[0] / 2, proportionInExtremeBins[1] / 2])
      .colors(10),
  );

  let binColors = $derived(
    polarity === "reverse"
      ? preBin.reverse() // only done once
      : preBin,
  );

  // let binColors = $derived(
  //   polarity === "reverse"
  //     ? assignBinColors(bins, colors1000).reverse() // only done once
  //     : assignBinColors(bins, colors1000),
  // );

  let interpolatedColors = $derived(binColors);

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
    style="height={height * 2}"
  >
    <svg
      class="chart-container"
      width={containerWidth - padding}
      {height}
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
      <g style="display: {showAxis ? 'block' : 'none'}">
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
          {labelFormatter}
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
              x={polarity === "reverse" ? xScale(bin.x1) : xScale(bin.x0)}
              y={height - yScale(bin.count)}
              width={Math.abs(xScale(bin.x1) - xScale(bin.x0))}
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
                  0.95}
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
                  0.95}
                height={yScale(bins[highlightIndex].count)}
                fill={interpolatedColors[highlightIndex]}
                stroke={highlightColor}
                stroke-width={1}
              ></rect>

              <g
                transform="translate({xScale(highlightValue)},{height -
                  yScale(bins[highlightIndex].count) -
                  15})"
              >
                <text fill="#555555" font-size="0.8em" text-anchor="middle">
                  <tspan x="0" dy="0">{annotationText}</tspan>
                  <tspan x="0" dy="12">▼</tspan>
                </text>
              </g>
            {/key}
          {/if}
        </g>
      </g>
      <!-- <g transform="translate({highlightIndex < nBins / 2 ? -5 : -5},-2)">
        <text font-size="0.8em" fill="#777777">↑ Number of areas</text>
      </g> -->
    </svg>
    {#if showArrows}
      <PositionChartAxis
        chartWidth={containerWidth - padding}
        axisLabels={["Worse than average", "Better than average"]}
        textSize="xs"
      ></PositionChartAxis>
    {/if}
  </div>
{/key}

<style>
  .scale-container svg {
    overflow: visible;
    display: block;
  }
</style>
