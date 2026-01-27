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

  import { Plot, RectY, binX, Text, AxisX } from "svelteplot";
  import { interpolateColors } from "./position-chart/interpolateColors";
  import { getColorsForValues } from "./position-chart/getColorsForValues";
  import { splitGroupsAndAverages } from "./position-chart/splitGroupsAndAverages";
  import PositionChartAxis from "./position-chart/PositionChartAxis.svelte";

  let binObject = $derived(
    binX({ data: dist }, { y: "count", thresholds: thresholds }),
  );
  let binnedMetricData = $derived(binObject.data);
  let binnedValues = $derived(binObject.data.map((d) => d.__y));
  let nBins = $derived(binnedValues.length);

  // I want each block to get a colour which indicates its distance from the median
  // In order to do that, we need to assign each value a color, according to its distance from the median
  // And take the average of each color when it's within a bin
  // Alternatively, generate a color scale of x bins with a skewed distribution
  // Alternatively, generate a symmetrical color scale
  // Pick out colours from that scale
  // Choose them based on their position

  function findBinIndex(binned, value) {
    if (!binned.length) return -1;

    // Get the symbol keys for x1 and x2 from the first bin
    const symbols = Object.getOwnPropertySymbols(binned[0]);
    const x1Sym = symbols.find((s) => s.description === "x1");
    const x2Sym = symbols.find((s) => s.description === "x2");

    if (!x1Sym || !x2Sym) {
      throw new Error("Bins do not have x1 and x2 symbols");
    }

    return binned.findIndex((bin) => {
      const x1 = bin[x1Sym];
      const x2 = bin[x2Sym];
      return value >= x1 && value < x2; // half-open interval [x1, x2)
    });
  }

  let highlightIndex = $derived(
    highlightValue !== null
      ? findBinIndex(binnedMetricData, highlightValue)
      : -1,
  );

  let colors1000 = $derived(
    interpolateColors(startColor, endColor, 1000, midColor),
  );
  const colors100 = $derived(Array.from({ length: 100 }, (_, i) => i));

  let interpolatedColors = $derived(
    getColorsForValues(
      colors1000.reverse(),
      min,
      max,
      splitGroupsAndAverages(dist, nBins).averages.reverse(),
    ),
  );

  function segmentColor(value, min, max, interpolatedColors) {
    const n = interpolatedColors.length;
    return interpolatedColors[
      Math.min(n - 1, Math.floor((n * (value - min)) / (max - min)))
    ];
  }
</script>

<Plot
  height={80}
  y={{ axis: showAxis }}
  x={{ domain: [min, max], labelAnchor: "right" }}
>
  <Text frameAnchor="top-left" text="Number of authorities" dy="-5" />
  <AxisX />
  <!-- <AxisX
    ticks={[0]}
    tickSize={0}
    tickPadding={20}
    tickFormat={() => "England Average"}
    fill="#222"
  /> -->
  <RectY
    {...binObject}
    fill={(d, i) => interpolatedColors[i]}
    stroke={(d, i) => (i === highlightIndex ? "black" : "white")}
    strokeWidth={(d, i) => (i === highlightIndex ? "3" : "0")}
  />
</Plot>
<PositionChartAxis
  chartWidth="100"
  axisLabels={["Below average", "Above average"]}
></PositionChartAxis>
