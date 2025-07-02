<script>
  // @ts-nocheck
  import SeriesLabel from "$lib/components/data-vis/line-chart/SeriesLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";
  import ValueLabel from "./ValueLabel.svelte";

  let {
    series,
    y,
    x,
    lineChartData,

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
    labelText = (dataArray) => {
      return dataArray[series];
    },
    onClickSeries = (series, tier) => {
      if (clickedSeries === series) {
        clickedSeries = null;
        hoveredSeries = null;
      } else {
        clickedSeries = series;
        clickedTier = tier;
        hoveredSeries = series;
        hoveredTier = tier;
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
      currentMousePosition = [event.screenX, event.screenY];
      markerRect = rect;
    },
    onMouseEnterMarker = (event, marker, markerId, rect) => {
      activeMarkerId = marker;
      if (container) {
        const bounds = container.getBoundingClientRect();
        currentMousePosition = [
          // option for moving tooltip
          event.clientX - bounds.left,
          event.clientY - bounds.top,
        ];
        markerRect = {
          // option for fixed tooltip
          x: rect.x - bounds.left + rect.width / 2,
          y: rect.y - bounds.top + rect.height / 2,
        };
      } else {
        currentMousePosition = [event.clientX, event.clientY];
        markerRect = rect;
      }
    },
    onMouseLeaveMarker = (event, marker, dataId) => {
      activeMarkerId = null;
    },

    // Optional
    currentMousePosition = undefined,
    markerRect = undefined,
    clickedSeries = $bindable(undefined),
    hoveredSeries = $bindable(undefined),
    hoveredTier = $bindable(undefined),
    clickedTier = $bindable(undefined),
    overrideLineParams = () => ({}),
    assignLinesToTiers = (tier, el) => {
      if (tier === "hover") {
        return [hoveredSeries].includes(el.areaCode);
      }
      if (tier === "clicked") {
        return [clickedSeries].includes(el.areaCode);
      }
      return true;
    },
    nothingSelected = true,
    svgWidth = $bindable(500),
    container = $bindable(),
    svgHeight = 500,
    paddingTop = 50,
    paddingBottom = 50,
    paddingLeft = 50,
    paddingRight = 150,
    activeMarkerId = undefined,
    chartBackgroundColor = "#f5f5f5",
    seriesLabels = $bindable(false),
    globalTierParams = {
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
      hover: { pathStrokeWidth: 4 },
      clicked: {
        pathStrokeWidth: 5,
      },
    },
    tooltipSnippet = undefined,
    tooltipContent = activeMarkerId?.y,

    basicLineParams = {},
    colorLineParams = (tier, line, lineIndex) => {
      return { pathStrokeColor: lineColorMap[line.areaCode] };
    },
    colors = {
      teal: "#408A7B",
      skyBlue: "#509EC8",
      indigo: "#335F91",
      ochre: "#BA7F30",
      coral: "#E46B6C",
      fuchsia: "#BB2765",
      lavender: "#736CAC",
      ashGrey: "#A0A0A0",
      slateGrey: "#636363",
      black: "#161616",
      forestGreen: "#3C6E3C",
      midnightTeal: "#2C5E5E",
      dustyRose: "#C86B84",
      steelBlue: "#4B6E91",
      burntSienna: "#B65C38",
      oliveGreen: "#7A8644",
      slatePurple: "#64587C",
    },
  } = $props();

  const colorValues = Array.isArray(colors) ? colors : Object.values(colors);
  const lineColorMap = {};

  Object.entries(tieredLineParams).forEach(([tier, tierParams]) => {
    const tierLines = lineChartData.lines.filter((line) =>
      assignLinesToTiers(tier, line),
    );
    let colorIndex = 0;

    tierLines.forEach((line) => {
      const id = line.areaCode;
      if (!(id in lineColorMap)) {
        lineColorMap[id] = colorValues[colorIndex % colorValues.length];
        colorIndex++;
      }
    });
  });

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
    halo: true,
    invisibleStrokeWidth: 20,
    placeLabel: true,
    showLabel: true,
  });

  let chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  let chartHeight = $derived(svgHeight - paddingTop - paddingBottom);
  let areaFunction = $derived(
    area()
      .y0((d) => yFunction(0))
      .x((d) => xFunction(d.x))
      .y1((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let selectedLine = $derived([hoveredSeries, clickedSeries]);

  function handleClickOutside(event) {
    {
      console.log(event.target.closest());
    }
    if (
      clickedSeries &&
      !event.target.closest('[id^="line"]') && //make this respond to the new element attribute
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
    colorLineParams,
    defaultLineParams,
  ) {
    const listOfProperties = [
      ...new Set([
        ...Object.keys(defaultLineParams),
        ...Object.keys(colorLineParams(tier, line)),
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
          colorLineParams(tier, line)[key] ??
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
        .filter((el) => assignLinesToTiers(tier, el))
        .map((line, i) =>
          generateLineAttributes(
            line,
            tier,
            overrideLineParams,
            tieredLineParams,
            basicLineParams,
            (tier, line) => colorLineParams(tier, line, i),
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

<div
  style="position: relative"
  bind:clientWidth={svgWidth}
  bind:this={container}
>
  <svg
    onclick={handleClickOutside}
    width={svgWidth}
    height={svgHeight}
    style="background-color: {chartBackgroundColor}"
  >
    {#if svgWidth}
      <g transform="translate({paddingLeft},{paddingTop})">
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
            dataArray={lineChartData.lines}
            {lineFunction}
            {areaFunction}
            {chartWidth}
            {xFunction}
            {yFunction}
            {hoveredSeries}
            {clickedSeries}
            {clickedTier}
            {hoveredTier}
            {chartHeight}
            {globalTierParams}
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
            {currentMousePosition}
            {markerRect}
          ></Lines>
        </g>
      </g>
    {/if}
  </svg>
  {#if activeMarkerId}
    <ValueLabel
      {activeMarkerId}
      labelColor="lightgrey"
      labelTextColor="black"
      {labelText}
      {tooltipContent}
      {xFunction}
      {yFunction}
      {x}
      {y}
      {currentMousePosition}
      {markerRect}
      {tooltipSnippet}
    ></ValueLabel>
  {/if}
</div>
