<script>
  // @ts-nocheck
  import SeriesLabel from "$lib/components/data-vis/line-chart/SeriesLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";

  let {
    // Required
    series,
    y,
    x,
    lineChartData,

    // ask
    xFunction = (number) => {
      return scaleLinear()
        .domain([2015, 2022])
        .range([0, svgWidth - paddingLeft - paddingRight])(number);
    },
    yFunction = (number) => {
      return scaleLinear()
        .domain([0, 100])
        .range([svgHeight - paddingTop - paddingBottom, 0])(number);
    },
    lineFunction = line()
      .x((d) => xFunction(d[x]))
      .y((d) => yFunction(d[y]))
      .curve(curveLinear),
    labelText = "labelText",

    tooltipContent = "tooltipContent",

    onClickSeries = (series, tier) => {
      if (clickedSeries === dataId) {
        clickedSeries = null;
      } else {
        clickedSeries = series;
        clickedTier = tier;
      }
    },
    onMouseLeaveSeries = (series, tier) => {
      if (hoveredSeries === series) {
        hoveredSeries = null;
        hoveredTier = null;
      }
    },
    onMouseEnterSeries = (series, tier) => {
      if (hoveredSeries !== series) {
        hoveredSeries = series;
        hoveredTier = tier;
      }
    },
    onClickMarker = (event, marker, markerId) => {
      activeMarkerId = marker;
    },
    onMouseEnterMarker = (event, marker, markerId) => {
      activeMarkerId = marker;
    },
    onMouseLeaveMarker = (event, marker, dataId) => {
      activeMarkerId = null;
    },

    // Optional
    clickedSeries = $bindable(undefined),
    hoveredSeries = undefined,
    overrideLineParams = () => ({}),
    getLine = (key, el) => {
      return true;
    },
    nothingSelected = true,
    svgWidth = $bindable(500),
    svgHeight = 500,
    paddingTop = 50,
    paddingBottom = 50,
    paddingLeft = 50,
    paddingRight = 150,
    activeMarkerId = undefined,
    chartBackgroundColor = "#f5f5f5",
    seriesLabels = $bindable(false),
    globalTierRules = {
      otherTier: {},
      secondary: {
        opacity: nothingSelected ? 1 : 0.5,
      },
      primary: {
        opacity: nothingSelected ? 1 : 0.4,
      },
      hover: { opacity: 1 },
      clicked: { opacity: 1 },
    },
    tieredLineParams = {
      all: {},
    },

    basicLineParams = {},
  } = $props();

  let defaultLineParams = $derived({
    xFunction,
    yFunction,
    lineFunction,
    onClickSeries,
    onMouseEnterSeries,
    onMouseLeaveSeries,
    onClickMarker,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    haloColor: chartBackgroundColor,
    invisibleStrokeWidth: 20,
  });

  let chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  let chartHeight = $derived(svgHeight - paddingTop - paddingBottom);
  // let areaFunction = $derived(
  //   area()
  //     .y0((d) => yFunction(0))
  //     .x((d) => xFunction(d.x))
  //     .y1((d) => yFunction(d.y))
  //     .curve(curveLinear),
  // );

  let selectedLine = $derived([hoveredSeries, clickedSeries]);

  function handleClickOutside(event) {
    if (
      clickedSeries &&
      !event.target.closest('[id^="line"]') &&
      !event.target.closest('[id^="label"]')
    ) {
      clickedSeries = null;
    }
  }

  function generateLineAttributes(
    line,
    tier,
    overrideLineParams,
    tieredLineParams,
    basicLineParams,
    defaultLineParams,
  ) {
    const listOfProperties = [
      ...new Set([
        ...Object.keys(defaultLineParams),
        ...Object.keys(basicLineParams ?? {}),
        ...Object.keys(tieredLineParams[tier] ?? {}),
        ...Object.keys(overrideLineParams(tier, line)),
      ]),
    ];

    const merged = Object.fromEntries(
      listOfProperties.map((key) => [
        key,
        overrideLineParams(tier, line)[key] ??
          tieredLineParams[tier]?.[key] ??
          basicLineParams[key] ??
          defaultLineParams[key],
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
            defaultLineParams,
          ),
        );
      return acc;
    }, {}),
  );

  function hasShowLabel(objOfArrays) {
    return Object.values(objOfArrays).some((array) =>
      array.some((obj) => obj.showLabel === true),
    );
  }
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
            {hoveredSeries}
            {clickedSeries}
            {chartHeight}
            {globalTierRules}
            {chartBackgroundColor}
            {nothingSelected}
            {onMouseEnterSeries}
            {onClickSeries}
            {onMouseLeaveSeries}
            {onClickMarker}
            {onMouseEnterMarker}
            {onMouseLeaveMarker}
            {activeMarkerId}
            {labelText}
            {series}
            {y}
            {x}
            {tooltipContent}
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
