<script>
  // @ts-nocheck
  import CategoryLabel from "$lib/components/data-vis/line-chart/CategoryLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";

  let {
    getColor,
    tieredLineParams,
    colors,
    xFunction,
    yFunction,
    lineFunction,
    lineClicked = $bindable(),
    lineHovered = $bindable(),
    svgWidth = $bindable(500),
    onClick,
    onMouseEnter,
    onMouseLeave,
    svgHeight = 500,
    paddingTop = 50,
    paddingBottom = 50,
    paddingLeft = 50,
    paddingRight = 150,
    lineChartData,
    interactiveLines,
    showAllData,
    chartBackgroundColor,
    primaryLines,
  } = $props();

  /*let svgWidth = $state(),
    svgHeight = 600;*/

  /*let staticMargin = { top: 10, right: 20, bottom: 20, left: 10 };
  let dynamicMargin = $derived({ top: 0, right: 0, bottom: 0, left: 0 });
  let totalMargin = $derived({
    top: staticMargin.top + dynamicMargin.top,
    right: staticMargin.right + dynamicMargin.right,
    bottom: staticMargin.bottom + dynamicMargin.bottom,
    left: staticMargin.left + dynamicMargin.left,
  });*/

  /*let chartWidth = $derived(svg - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);*/

  let chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  let chartHeight = $derived(svgHeight - paddingTop - paddingBottom);

  let areaFunction = $derived(
    area()
      .y0((d) => yFunction(0))
      .x((d) => xFunction(d.x))
      .y1((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let labelHovered = $state();
  let labelClicked = $state();
  let selectedLine = $derived([
    lineHovered,
    lineClicked,
    labelHovered,
    labelClicked,
  ]);

  let nothingSelected = $derived(selectedLine.every((item) => item == null));

  function handleClickOutside(event) {
    if (
      lineClicked != event.target.parentElement.dataset.id ||
      (labelClicked && !event.target.closest('[id^="label"]'))
    ) {
      labelClicked = null;
      lineClicked = null;
    }
  }

  let dataArray = $derived(
    lineChartData.lines.map((el, i) => {
      const tiers = [];
      el.areaCode == lineClicked
        ? tiers.push("clicked")
        : el.areaCode == lineHovered
          ? tiers.push("hover")
          : primaryLines.includes(el.areaCode)
            ? tiers.push("primary")
            : tiers.push("secondary");
      return {
        ...el,
        tiers,
      };
    }),
  );

  let basicLineParams = $derived({
    lineFunction: lineFunction,
    xFunction: xFunction,
    yFunction: yFunction,
    areaFunction: areaFunction,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    haloColor: chartBackgroundColor,
    invisibleStrokeWidth: 20,
  });

  let defaultLineParams = $derived(
    Object.fromEntries(
      Object.entries(tieredLineParams).map(([key, group]) => [
        key,
        { ...basicLineParams, ...group },
      ]),
    ),
  );

  let tieredDataObject = $derived(
    Object.keys(defaultLineParams).reduce((acc, key, index) => {
      acc[key] = dataArray
        .filter((el) => {
          if (key === "primary") {
            return primaryLines.includes(el.areaCode);
          }
          if (
            key === "secondary" &&
            showAllData &&
            !primaryLines.includes(el.areaCode)
          ) {
            return true;
          }
          if (key === "hover") {
            return lineHovered == el.areaCode;
          }
          if (key === "clicked") {
            return lineClicked == el.areaCode;
          }
        })
        .map((el) => ({
          ...el,
          includeMarkers: key === "primary" ? true : false,
          pathStrokeColor: ["primary", "hover", "clicked"].includes(key)
            ? getColor(el.areaCode, primaryLines.indexOf(el.areaCode))
            : null,
        }));
      return acc;
    }, {}),
  );

  let globalTierRules = $derived({
    otherTier: {},
    secondary: {
      opacity: nothingSelected ? 1 : 0.5,
    },
    primary: {
      opacity: nothingSelected ? 1 : 0.4,
    },
    hover: { opacity: 1 },
    clicked: { opacity: 1 },
  });

  $inspect(svgWidth);
</script>

<div bind:clientWidth={svgWidth}>
  <svg
    onclick={handleClickOutside}
    width={svgWidth}
    height={svgHeight}
    style="background-color: {chartBackgroundColor}"
  >
    {#if svgWidth}
      <g transform="translate({paddingLeft},{paddingTop})">
        <g data-role="lines-group">
          <Lines
            {tieredDataObject}
            {dataArray}
            {lineFunction}
            {chartWidth}
            {xFunction}
            {yFunction}
            bind:labelClicked
            bind:labelHovered
            bind:lineHovered
            bind:lineClicked
            {chartHeight}
            {defaultLineParams}
            {showAllData}
            {globalTierRules}
            {chartBackgroundColor}
            {nothingSelected}
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
