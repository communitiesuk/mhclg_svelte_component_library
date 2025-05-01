<script>
  // @ts-nocheck
  import CategoryLabel from "$lib/components/data-vis/line-chart/CategoryLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";

  let { data } = $props();

  let svgWidth = $state(),
    svgHeight = 600;

  let chartBackgroundColor = "#f5f5f5";

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

  let areaFunction = $derived(
    area()
      .y0((d) => yFunction(0))
      .x((d) => xFunction(d.x))
      .y1((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let onClick = (event, dataArray, dataId) => {
    lineClicked = dataId;
  };
  let onMouseEnter = (event, dataArray, dataId) => {
    lineHovered = dataId;
  };
  let onMouseLeave = () => {
    lineHovered = null;
  };

  let lineHovered = $state();
  let lineClicked = $state();
  let labelHovered = $state();
  let labelClicked = $state();

  let selectedLine = $derived([
    lineHovered,
    lineClicked,
    labelHovered,
    labelClicked,
  ]);
  let nothingSelected = $derived(selectedLine.every((item) => item == null));
  let selectedAreaCode = $state("E07000223");
  let englandMedian = $state("E07000227");
  let similarAreas = $state("E07000224");

  function handleClickOutside(event) {
    if (
      lineClicked != event.target.parentElement.dataset.id ||
      (labelClicked && !event.target.closest('[id^="label"]'))
    ) {
      labelClicked = null;
      lineClicked = null;
    }
  }

  let colors = {
    teal: "#408A7B",
    lightblue: "#509EC8",
    darkblue: "#335F91",
    ochre: "#BA7F30",
    coral: "#E46B6C",
    fuschia: "#BB2765",
    purple: "#736CAC",
    lightgrey: "#A0A0A0",
    darkgrey: "#636363",
    black: "#161616",
  };

  let primaryLines = $derived([
    "E07000224",
    "E07000225",
    "E07000226",
    "E07000228",
    englandMedian,
    similarAreas,
    selectedAreaCode,
  ]);

  let colorPalette = {
    base: [colors.coral, colors.fuschia, colors.purple],
  };

  let showAllData = true;

  let lookupObj = $derived({
    [englandMedian]: colors.lightblue,
    [selectedAreaCode]: colors.teal,
    [similarAreas]: colors.darkblue,
  });

  function getColor(areaCode, lookupObj, i) {
    return (
      lookupObj[areaCode] ?? colorPalette.base[i % colorPalette.base.length]
    );
  }

  let dataArray = $derived(
    data.lines.map((el, i) => {
      const tiers = selectedLine.includes(el.areaCode)
        ? ["hover", "secondary"]
        : primaryLines.includes(el.areaCode)
          ? ["primary"]
          : ["invisibles", "secondary"];
      return {
        ...el,
        tiers,
      };
    }),
  );

  let tieredLineParams = $derived({
    otherTier: {},
    invisibles: {
      listenForOnHoverEvents: true,
      pathStrokeWidth: 1,
    },
    secondary: {
      "pointer-events": "none",
      halo: false,
      pathStrokeColor: colors.black,
      pathStrokeWidth: 1,
      opacity: 0.05,
    },
    primary: {
      halo: true,
      pathStrokeWidth: nothingSelected ? 5 : 2,
      pathStrokeColor: colors.darkgrey,
    },
    hover: {
      pathStrokeColor: colors.ochre,
      pathStrokeWidth: lineClicked ? 8 : 5,
      halo: true,
    },
  });

  let basicLineParams = {
    lineFunction: lineFunction,
    xFunction: xFunction,
    yFunction: yFunction,
    areaFunction: areaFunction,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    haloColor: chartBackgroundColor,
  };

  let defaultLineParams = Object.fromEntries(
    Object.entries(tieredLineParams).map(([key, group]) => [
      key,
      { ...basicLineParams, ...group },
    ]),
  );

  let tieredDataObject = $derived(
    Object.keys(defaultLineParams).reduce((acc, key, index) => {
      acc[key] = dataArray
        .filter((el) => {
          if (key === "primary") {
            return primaryLines.includes(el.areaCode);
          } else if (key === "secondary" && showAllData) {
            return true;
          } else if (key === "hover") {
            return selectedLine.includes(el.areaCode);
          }
        })
        .map((el) => ({
          ...el,
          strokeWidth: "3px",
          includeMarkers: key === "primary" ? true : false,
          pathStrokeColor: ["primary", "hover"].includes(key)
            ? getColor(
                el.areaCode,
                lookupObj,
                primaryLines.indexOf(el.areaCode),
              )
            : null,
        }));
      return acc;
    }, {}),
  );

  let globalTierRules = $derived({
    otherTier: {},
    invisibles: { opacity: 0 },
    secondary: {
      opacity: nothingSelected ? 1 : 0.5,
    },
    primary: {
      opacity: nothingSelected ? 1 : 0.4,
    },
    hover: { opacity: 1 },
  });
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
    style="background-color: {chartBackgroundColor}"
  >
    {#if svgWidth}
      <g transform="translate({totalMargin.left},{totalMargin.top})">
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
            bind:labelHovered
            bind:lineHovered
            bind:lineClicked
            {chartHeight}
            {colorPalette}
            {defaultLineParams}
            {showAllData}
            {globalTierRules}
            {chartBackgroundColor}
          ></Lines>
        </g>
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
      </g>
    {/if}
  </svg>
</div>
