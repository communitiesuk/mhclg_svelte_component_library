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

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : 0);
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 1);

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

  let histHeight = 50;

  let xMin = bins[0]?.x0 ?? 0;
  let xMax = bins[bins.length - 1]?.x1 ?? 1;

  let maxCount = Math.max(...bins.map((b) => b.count));

  let containerWidth = $state(100);

  let xScale = (x) =>
    ((x - domainMin) / (domainMax - domainMin)) * containerWidth;

  let yScale = (count) =>
    (count / Math.max(...bins.map((b) => b.count))) * histHeight;

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

  $inspect({ highlightValue });
  $inspect({ highlightIndex });
</script>

{#key containerWidth}
  <div class="scale-container" bind:clientWidth={containerWidth}>
    <svg width={containerWidth} height={histHeight * 2}>
      <g transform="translate(-10,0)">
        {#each bins as bin, i}
          {#key bin.x0}
            {console.log("i=", i)}
            {console.log("highlightIndex=", highlightIndex)}
            <rect
              x={xScale(bin.x0)}
              y={histHeight - yScale(bin.count)}
              width={xScale(bin.x1) - xScale(bin.x0)}
              height={yScale(bin.count)}
              fill={interpolatedColors[i]}
              stroke={i === highlightIndex ? "black" : "white"}
              stroke-width={i === highlightIndex ? 3 : 0}
            ></rect>
          {/key}
        {/each}
      </g>
      <Axis
        bind:ticksArray={xTicks}
        chartHeight={histHeight}
        chartWidth={containerWidth}
        orientation={{ axis: "x", position: "bottom" }}
        range={[histHeight, containerWidth]}
        domain={[xTickMin, xTickMax]}
        values={dist}
        fontSize={14}
      ></Axis>
    </svg>
  </div>
{/key}

<PositionChartAxis
  chartWidth={containerWidth}
  axisLabels={["Below average", "Above average"]}
></PositionChartAxis>
