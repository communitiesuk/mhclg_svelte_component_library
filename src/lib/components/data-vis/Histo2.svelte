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

  import { interpolateColors } from "./position-chart/interpolateColors";
  import { getColorsForValues } from "./position-chart/getColorsForValues";
  import { splitGroupsAndAverages } from "./position-chart/splitGroupsAndAverages";
  import PositionChartAxis from "./position-chart/PositionChartAxis.svelte";
  import { bin } from "d3-array";
  import PositionChart from "./position-chart/PositionChart.svelte";

  let histogram = bin()
    .domain([min ?? Math.min(...dist), max ?? Math.max(...dist)])
    .thresholds(thresholds);

  let buckets = histogram(dist);

  const bins = buckets.map((b) => ({
    x0: b.x0,
    x1: b.x1,
    values: b,
    count: b.length,
  }));

  let nBins = $derived(bins.length);

  let histWidth = 60;
  let histHeight = 60;

  let xMin = bins[0]?.x0 ?? 0;
  let xMax = bins[bins.length - 1]?.x1 ?? 1;

  let maxCount = Math.max(...bins.map((b) => b.count));

  let containerWidth = $state(100);

  let xScale = $derived((x) => ((x - xMin) / (xMax - xMin)) * containerWidth);

  let yScale = (count) => (count / maxCount) * histHeight;

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
</script>

{#key containerWidth}
  <div class="scale-container" bind:clientWidth={containerWidth}>
    <svg width={containerWidth - 10} height={histHeight}>
      <g transform="translate(10,0)">
        {#each bins as bin, i}
          {#key bin.x0}
            <rect
              x={xScale(bin.x0)}
              y={histHeight - yScale(bin.count)}
              width={xScale(bin.x1) - xScale(bin.x0)}
              height={yScale(bin.count)}
              fill={interpolatedColors[i]}
            ></rect>
          {/key}
        {/each}
      </g>
    </svg>
  </div>
{/key}

<PositionChartAxis
  chartWidth={containerWidth}
  axisLabels={["Below average", "Above average"]}
></PositionChartAxis>
