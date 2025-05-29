<script>
  // @ts-nocheck
  import SeriesLabel from "$lib/components/data-vis/line-chart/SeriesLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";
  import Axis from "../axis/Axis.svelte";

  import Decimal from "decimal.js";

  let {
    getColor,
    tieredLineParams,
    colors,
    xFunction,
    yFunction,
    lineFunction,
    lineClicked,
    lineHovered,
    labelClicked = $bindable(),
    labelHovered = $bindable(),
    svgWidth = $bindable(500),
    activeMarkerId,
    onClickLine,
    onMouseEnterLine,
    onMouseLeaveLine,
    onClickLabel,
    onMouseEnterLabel,
    onMouseLeaveLabel,
    onClickMarker,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    svgHeight = 500,
    paddingTop = 50,
    paddingBottom = 50,
    paddingLeft = 50,
    paddingRight = 150,
    lineChartData,
    interactiveLines,
    chartBackgroundColor,
    getLine,
    basicLineParams,
    overrideLineParams,
    nothingSelected = $bindable(),
    globalTierRules,
    labelText,
    yearsInputY,
    yearsInputX,
    floor,
    ceiling,
    series,
    y,
    x,
    tickFormattingFunctionY,
    tickFormattingFunctionX,
  } = $props();

  let ticksArrayX = $state();
  let ticksArrayY = $state();

  let chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  let chartHeight = $derived(svgHeight - paddingTop - paddingBottom);
  // let areaFunction = $derived(
  //   area()
  //     .y0((d) => yFunction(0))
  //     .x((d) => xFunction(d.x))
  //     .y1((d) => yFunction(d.y))
  //     .curve(curveLinear),
  // );

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

  function generateLineAttributes(
    line,
    tier,
    overrideLineParams,
    tieredLineParams,
    basicLineParams,
  ) {
    const listOfProperties = [
      ...new Set([
        ...Object.keys(basicLineParams),
        ...Object.keys(tieredLineParams[tier] ?? {}),
        ...Object.keys(overrideLineParams(tier, line)),
      ]),
    ];

    const merged = Object.fromEntries(
      listOfProperties.map((key) => [
        key,
        overrideLineParams(tier, line)[key] ??
          tieredLineParams[tier]?.[key] ??
          basicLineParams[key],
      ]),
    );

    return {
      ...merged,
      ...line,
      dataId: line[series],
      dataArray: line.data,
    };
  }

  let tieredDataObject = $derived(
    Object.keys(tieredLineParams).reduce((acc, tier) => {
      acc[tier] = lineChartData.lines
        .filter((el) => getLine(tier, el))
        .map((line) =>
          generateLineAttributes(
            line,
            tier,
            overrideLineParams,
            tieredLineParams,
            basicLineParams,
          ),
        );

      return acc;
    }, {}),
  );

  let allYValues = lineChartData.lines.flatMap((line) =>
    line.data.map((point) => new Decimal(point.y)),
  );

  let allXValues = lineChartData.lines.flatMap((line) =>
    line.data.map((point) => new Decimal(point.x)),
  );
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
            lineHovered
            lineClicked
            {chartHeight}
            {globalTierRules}
            {chartBackgroundColor}
            bind:nothingSelected
            {onMouseEnterLine}
            {onMouseLeaveLine}
            {onClickLine}
            {onClickLabel}
            {onMouseEnterLabel}
            {onMouseLeaveLabel}
            {onClickMarker}
            {onMouseEnterMarker}
            {onMouseLeaveMarker}
            {activeMarkerId}
            {labelText}
            {series}
            {y}
            {x}
          ></Lines>
        </g>
        <!--Y axis-->
        <Axis
          {chartHeight}
          {chartWidth}
          bind:ticksArray={ticksArrayY}
          axisFunction={yFunction}
          values={allYValues}
          orientation={{ axis: "y", position: "left" }}
          yearsInput={yearsInputY}
          {floor}
          {ceiling}
          tickFormattingFunction={tickFormattingFunctionY}
        ></Axis>
        <!-- X axis-->
        <Axis
          {chartHeight}
          {chartWidth}
          bind:ticksArray={ticksArrayX}
          axisFunction={xFunction}
          values={allXValues}
          orientation={{ axis: "x", position: "bottom" }}
          yearInput={yearsInputX}
          {floor}
          {ceiling}
          tickFormattingFunction={tickFormattingFunctionX}
        ></Axis>
      </g>
    {/if}
  </svg>
</div>
