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
    overrideDefaultStyles,
    nothingSelected,
    globalTierRules,
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
  // let defaultLineParams = $derived(
  //   Object.fromEntries(
  //     Object.entries(tieredLineParams).map(([key, group]) => [
  //       key,
  //       { ...basicLineParams, ...group },
  //     ]),
  //   ),
  // );
  function generateLineAttributes(
    line,
    tier,
    overrideDefaultStyles,
    tieredLineParams,
    basicLineParams,
  ) {
    // const defaultForTier = { ...basicLineParams, ...tieredLineParams[tier] };

    const listOfProperties = [
      ...new Set([
        ...Object.keys(basicLineParams),
        ...Object.keys(tieredLineParams[tier] || {}),
        ...Object.keys(line),
        ...Object.keys(overrideDefaultStyles(tier, line)),
      ]),
    ];

    const merged = Object.fromEntries(
      listOfProperties.map((key) => [
        key,
        overrideDefaultStyles(tier, line)[key] ??
          line[key] ??
          tieredLineParams[tier]?.[key] ??
          basicLineParams[key],
      ]),
    );

    return {
      ...merged,
      dataId: line.areaCode,
      dataArray: line.data,
    };
  }

  let tieredDataObject = $derived(
    Object.keys(tieredLineParams).reduce((acc, key) => {
      acc[key] = lineChartData.lines
        .filter((el) => getLine(key, el))
        .map((el) =>
          generateLineAttributes(
            el,
            key,
            overrideDefaultStyles,
            tieredLineParams,
            basicLineParams,
          ),
        );

      return acc;
    }, {}),
  );

  // function generateLineAttributes(line, defaultLineParams, tier) {
  //   const listOfProperties = [
  //     ...new Set([
  //       ...Object.keys(line),
  //       ...Object.keys(defaultLineParams[tier]),
  //     ]),
  //   ];

  //   const merged = Object.fromEntries(
  //     listOfProperties.map((key) => [
  //       key,
  //       line[key] ?? defaultLineParams[tier][key],
  //     ]),
  //   );
  //   return {
  //     ...merged,
  //     dataId: line.areaCode,
  //     dataArray: line.data, // rename in the original to avoid this
  //   };
  // }

  // let tieredDataObject = $derived(
  //   ([tieredLineParams, basicLineParams, lineChartData]) => {
  //     return Object.entries(tieredLineParams).reduce(
  //       (acc, [groupKey, groupOverrides]) => {
  //         acc[groupKey] = lineChartData.lines
  //           .filter((line) => getLine(groupKey, line))
  //           .map((line) => ({
  //             ...basicLineParams, // base defaults
  //             ...groupOverrides, // group-level overrides
  //             ...line, // original line data (e.g. id, x/y)
  //             ...overrideDefaultStyles(groupKey, line), // final per-line overrides
  //           }));
  //         return acc;
  //       },
  //     );
  //   },
  // );

  // function getLineAttributes(line, basicLineParams, groupOverrides, groupKey) {
  //   return {
  //     ...basicLineParams,
  //     ...groupOverrides,
  //     ...line,
  //     ...overrideDefaultStyles(groupKey, line),
  //     dataId: line.areaCode,
  //     dataArray: line.data,
  //   };
  // }
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
