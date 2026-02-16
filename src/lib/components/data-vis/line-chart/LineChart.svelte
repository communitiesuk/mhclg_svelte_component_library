<script>
  // @ts-nocheck
  import SeriesLabel from "./SeriesLabel.svelte";
  import Line from "./Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line, area } from "d3-shape";
  import { highlight } from "./../../../utils/syntax-highlighting/shikiHighlight";
  import Lines from "./Lines.svelte";
  import ValueLabel from "./ValueLabel.svelte";
  import Axis from "../axis/Axis.svelte";

  let {
    series,
    y,
    x,
    lineChartData,

    xScale = (number) => {
      return scaleLinear().domain([xTickMin, xTickMax]).range([0, chartWidth])(
        number,
      );
    },
    yScale = (number) => {
      return scaleLinear().domain([yTickMin, yTickMax]).range([chartHeight, 0])(
        number,
      );
    },

    lineScale = line()
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
    xFloor = undefined,
    xCeiling = undefined,
    yFloor = undefined,
    yCeiling = undefined,
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
    tooltipContent = "y",

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

  let xTicks = $state([]);
  let yTicks = $state([]);

  const xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : undefined);
  const xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : undefined);
  const yTickMin = $derived(yTicks.length ? Math.min(...yTicks) : undefined);
  const yTickMax = $derived(yTicks.length ? Math.max(...yTicks) : undefined);

  let xFunction = $derived((value) => xScale(value));
  let yFunction = $derived((value) => yScale(value));
  let lineFunction = $derived((value) => lineScale(value));

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
    markerFill: undefined,
  });

  let chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  let chartHeight = $derived(svgHeight - paddingTop - paddingBottom);
  let areaFunction = $derived(
    area()
      .y0((d) => yFunction(yTickMin))
      .x((d) => xFunction(d.x))
      .y1((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let selectedLine = $derived([hoveredSeries, clickedSeries]);

  function handleClickOutside(event) {
    if (
      clickedSeries &&
      !event.target.closest('[data-id^="line"]') && //make this respond to the new element attribute
      !event.target.closest('[data-id^="label"]')
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
        <Axis
          bind:ticksArray={yTicks}
          {chartHeight}
          {chartWidth}
          orientation={{ axis: "y", position: "left" }}
          range={[chartHeight, 0]}
          domain={[yTickMin, yTickMax]}
          values={lineChartData.lines.flatMap((l) => l.data.map((d) => d[y]))}
          ceiling={yCeiling ?? yTickMax}
          floor={yFloor ?? yTickMin}
        ></Axis>
        <!--X axis-->
        <Axis
          bind:ticksArray={xTicks}
          {chartWidth}
          {chartHeight}
          orientation={{ axis: "x", position: "bottom" }}
          values={lineChartData.lines.flatMap((l) => l.data.map((d) => d[x]))}
          range={[0, chartWidth]}
          domain={[xTickMin, xTickMax]}
          ceiling={xCeiling ?? xTickMax}
          floor={xFloor ?? xTickMin}
        ></Axis>
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
