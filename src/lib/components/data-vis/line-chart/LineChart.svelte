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
    getLine,
    basicLineParams,
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

  // let basicLineParams = $derived({
  //   lineFunction: lineFunction,
  //   xFunction: xFunction,
  //   yFunction: yFunction,
  //   areaFunction: areaFunction,
  //   onClick: onClick,
  //   onMouseEnter: onMouseEnter,
  //   onMouseLeave: onMouseLeave,
  //   haloColor: chartBackgroundColor,
  //   invisibleStrokeWidth: 20,
  // });

  let defaultLineParams = $derived(
    Object.fromEntries(
      Object.entries(tieredLineParams).map(([key, group]) => [
        key,
        { ...basicLineParams, ...group },
      ]),
    ),
  );

  function overrideDefaultStyles(key, el) {
    return {
      pathStrokeColor: ["primary", "hover", "clicked"].includes(key)
        ? getColor(
            el.areaCode,
            ["E07000224", "E07000225", "E07000226", "E07000228"].indexOf(
              el.areaCode,
            ),
          )
        : null,
    };
  }

  let tieredDataObject = $derived(
    Object.keys(defaultLineParams).reduce((acc, key, index) => {
      acc[key] = lineChartData.lines
        .filter((el) => getLine(key, el))
        .map((el) => {
          return { ...el, ...overrideDefaultStyles(key, el) };
        });
      /*.map((el) => ({
          ...el,
          pathStrokeColor: ["primary", "hover", "clicked"].includes(key)
            ? getColor(el.areaCode, primaryLines.indexOf(el.areaCode))
            : null,
        }));*/
      return acc;
    }, {}),
  );

  $inspect(tieredLineParams);

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
            dataArray={lineChartData.lines}
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
            {getLine}
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
