<script>
  // @ts-nocheck
  import CategoryLabel from "$lib/components/data-vis/line-chart/CategoryLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";
  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";
  import Axis from "$lib/components/data-vis/axis/Axis.svelte";

  let { data, selectedMetric, numberOfTicks, primaryAreas, selectedIncludes } =
    $props();

  let svgWidth = $state(),
    svgHeight = 600;

  let margin = { top: 40, right: 200, bottom: 50, left: 70 };

  let chartWidth = $derived(svgWidth - margin.left - margin.right);
  let chartHeight = $derived(svgHeight - margin.top - margin.bottom);

  let flatData = $derived(
    data.dataInFormatForLineChart
      .find((el) => el.metric === selectedMetric)
      .lines.map((el) => el.data)
      .flat(),
  );

  let allYears = $derived(flatData.map((el) => el.x));

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let xFunction = $derived(
    scaleLinear().domain(yearsMinMax).range([0, chartWidth]),
  );

  let allValues = $derived(flatData.map((el) => el.y));

  let ticksXArray = $state();
  let ticksYArray = $state();

  let valuesMinMax = $derived(
    ticksYArray != null
      ? [Math.min(...ticksYArray), Math.max(...ticksYArray)]
      : null,
  );

  let yFunction = $derived(
    valuesMinMax != null
      ? scaleLinear().domain(valuesMinMax).range([chartHeight, 0])
      : null,
  );

  let lineFunction = $derived(
    valuesMinMax != null
      ? line()
          .x((d) => xFunction(d.x))
          .y((d) => yFunction(d.y))
          .curve(curveLinear)
      : null,
  );

  let labelClicked = $state();

  let colors = [
    "#206095",
    "#871a5b",
    "#118c7b",
    "#f66068",
    "#27a0cc",
    "#746cb1",
  ];

  function handleClickOutside(event) {
    if (labelClicked && !event.target.closest('[id^="label"]')) {
      labelClicked = null;
    }
  }

  $inspect(
    primaryAreas,
    data.dataInFormatForLineChart
      .find((el) => el.metric === selectedMetric)
      .lines.filter(
        (el) =>
          primaryAreas.includes(data.areaCodeLookup[el.areaCode]) &&
          selectedIncludes.includes("primary"),
      ),
  );

  let dataArray = $derived(
    data.dataInFormatForLineChart
      .find((el) => el.metric === selectedMetric)
      .lines.map((el) => ({
        ...el,
        primary:
          primaryAreas.includes(data.areaCodeLookup[el.areaCode]) &&
          selectedIncludes.includes("primary"),
        name: data.areaCodeLookup[el.areaCode],
        includeMarkers: primaryAreas.includes(data.areaCodeLookup[el.areaCode]),
        markerRadius: 3,
        pathStrokeWidth: primaryAreas.includes(data.areaCodeLookup[el.areaCode])
          ? 5
          : null,
        opacity: 1,
      })),
  );

  $inspect(dataArray);

  let defaultLineParams = {
    includeMarkers: false,
    pathStrokeWidth: 2,
    opacity: 0.05,
  };
</script>

<div bind:clientWidth={svgWidth} class="mb-20">
  <h4 class="ml-12">{selectedMetric}</h4>
  <svg width={svgWidth ?? 400} height={svgHeight}>
    {#if svgWidth}
      <g transform="translate({margin.left},{margin.top})">
        {#key selectedMetric}
          <Axis
            {chartHeight}
            {chartWidth}
            numberOfTicks="5"
            axisFunction={xFunction}
            values={yearsMinMax}
            bind:ticksArray={ticksXArray}
            orientation={{ axis: "x", position: "bottom" }}
          ></Axis>

          <Axis
            {chartHeight}
            {chartWidth}
            {numberOfTicks}
            axisFunction={yFunction}
            values={allValues}
            bind:ticksArray={ticksYArray}
            orientation={{ axis: "y", position: "left" }}
          ></Axis>
        {/key}

        <Lines
          {dataArray}
          {lineFunction}
          {chartWidth}
          {xFunction}
          {yFunction}
          bind:labelClicked
          {chartHeight}
          {colors}
          {defaultLineParams}
          showAllData={selectedIncludes.includes("background")}
        ></Lines>
      </g>
    {/if}
  </svg>
</div>
