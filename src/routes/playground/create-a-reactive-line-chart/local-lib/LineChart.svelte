<script>
  // @ts-nocheck
  import CategoryLabel from "$lib/components/data-vis/line-chart/CategoryLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";

  let { data } = $props();

  let svgWidth = $state(),
    svgHeight = 600;

  /*let staticMargin = { top: 10, right: 20, bottom: 20, left: 10 };
  let dynamicMargin = $derived({ top: 0, right: 0, bottom: 0, left: 0 });
  let totalMargin = $derived({
    top: staticMargin.top + dynamicMargin.top,
    right: staticMargin.right + dynamicMargin.right,
    bottom: staticMargin.bottom + dynamicMargin.bottom,
    left: staticMargin.left + dynamicMargin.left,
  });*/
  let totalMargin = { top: 20, right: 150, bottom: 40, left: 50 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allYears = $derived(flatData.map((el) => el.x));

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let xFunction = $derived(
    scaleLinear().domain(yearsMinMax).range([0, chartWidth]),
  );

  let allValues = $derived(flatData.map((el) => el.y));

  let valuesMinMax = $derived([Math.min(...allValues), Math.max(...allValues)]);

  let yFunction = $derived(
    scaleLinear().domain(valuesMinMax).range([chartHeight, 0]),
  );

  let lineFunction = $derived(
    line()
      .x((d) => xFunction(d.x))
      .y((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let areaCodeHover = $state();
  let labelClicked = $state();
  let selectedAreaCode = $state("E07000223");

  function handleClickOutside(event) {
    if (labelClicked && !event.target.closest('[id^="label"]')) {
      labelClicked = null;
    }
  }

  let primaryLines = ["E07000223", "E07000224"];

  let dataArray = $derived(
    data.lines.map((el, i) => ({
      ...el,
      tiers:
        areaCodeHover === el.areaCode
          ? ["hover", "secondary"]
          : primaryLines.includes(el.areaCode)
            ? ["primary"]
            : ["invisibles"],
      includeMarkers: selectedAreaCode === "E07000223",
    })),
  );

  let lookupObj = {
    EnglandMedian: "purple",
  };

  let colorPalette = {
    base: ["blue", "green", "red"],
  };

  let defaultLineParams = $derived({
    invisibles: {
      listenForOnHoverEvents: true,
      pathStrokeWidth: 1,
    },
    otherTier: {},
    secondary: {
      "pointer-events": "none",
    },
    primary: {
      halo: true,
      includeMarkers: true,
      pathStrokeWidth: areaCodeHover === null ? 5 : 2,
      color: "red", // functionOfSomeKind(
      //data.lines
      // .filter((el) => el.tiers.includes("primary"))
      //.map((el) => el.areaCode),
      //lookupObj,
      //colorPalette["base"],
      //),
    },
    hover: {
      color: "orange",
      pathStrokeWidth: 5,
    },
  });

  let tieredDataObject = $derived(
    Object.keys(defaultLineParams).reduce((acc, key, index) => {
      acc[key] = dataArray.filter((el) => el.tiers.includes(key));
      return acc;
    }, {}),
  );

  let globalTierRules = $derived({
    otherTier: {
      opacity: areaCodeHover == null ? 1 : 1,
    },
    invisibles: { opacity: 0 },
    secondary: {
      opacity: areaCodeHover == null ? 1 : 0.8,
    },
    primary: {
      opacity: areaCodeHover == null ? 1 : 0.1,
    },
    hover: { opacity: 1 },
  });

  let showAllData = true;
</script>

<h3>Example Usage</h3>
<pre><code use:highlight
    >{`
<script>
  import LineChart from './LineChart.svelte';
  
  const data = {
    lines: [
      {
        areaCode: "E07000223",
        data: [
          { x: 2019, y: 45 },
          { x: 2020, y: 72 },
          { x: 2021, y: 89 }
        ]
      }
    ]
  };
<\/script>

<LineChart {data} />
`}</code
  ></pre>

<div bind:clientWidth={svgWidth}>
  <svg
    onclick={handleClickOutside}
    width={svgWidth ?? 400}
    height={svgHeight}
    style="background-color: #f5f5f5"
  >
    {#if svgWidth}
      <g transform="translate({totalMargin.left},{totalMargin.top})">
        <g data-role="y-axis">
          <path d="M0 0 l0 {chartHeight}" stroke="black" stroke-width="2px"
          ></path>
        </g>
        <g data-role="x-axis">
          <path
            d="M0 {chartHeight} l{chartWidth} 0"
            stroke="black"
            stroke-width="2px"
          ></path>
        </g>

        <g data-role="lines-group">
          <Lines
            {tieredDataObject}
            {dataArray}
            {lineFunction}
            {selectedAreaCode}
            {chartWidth}
            {xFunction}
            {yFunction}
            bind:labelClicked
            bind:areaCodeHover
            {chartHeight}
            {colorPalette}
            {defaultLineParams}
            {showAllData}
            {globalTierRules}
          ></Lines>
        </g>
      </g>
    {/if}
  </svg>
</div>
