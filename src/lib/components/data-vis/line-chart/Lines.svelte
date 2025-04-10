<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";
  import labelplacer from "labelplacer";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";

  let {
    tieredDataObject,
    dataArray,
    lineFunction,
    selectedAreaCode,
    chartWidth,
    xFunction,
    yFunction,
    labelClicked = $bindable(),
    chartHeight,
    colors,
    showAllData,
    defaultLineParams,
    globalTierRules,
  } = $props();

  let hoveredLine = $state(null);
  let bounds = $state([0, chartHeight]);

  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let transformed = $derived(
    tieredDataObject["primary"].map((item) => {
      let lastY = yFunction(item.data[0].y);
      return { areaCode: item.areaCode, lastY };
    }),
  );

  let labelsPlaced = $derived(
    labelplacer(
      transformed,
      bounds,
      (d) => d.lastY,
      (d) => 20 * Math.ceil(d.areaCode.length / 15),
    ),
  );

  $inspect(labelsPlaced);
</script>

{#snippet categoryLabelSnippet(dataArray, newY)}
  <CategoryLabel
    id={`label-${dataArray.areaCode}`}
    bind:labelClicked
    bind:labelHovered
    {chartWidth}
    {lineFunction}
    {dataArray}
    {xFunction}
    {yFunction}
    {newY}
    onClick={function (areaCode) {
      labelClicked === areaCode
        ? ((labelClicked = null), (labelHovered = null))
        : (labelClicked = areaCode);
    }}
    onMouseEnter={function onMouseEnter(areaCode) {
      labelHovered = areaCode;
    }}
    onMouseLeave={function onMouseLeave(areaCode) {
      labelClicked === areaCode
        ? (labelHovered = null)
        : (labelHovered = areaCode);
      labelHovered === areaCode ? (labelHovered = null) : (labelHovered = null);
    }}
  ></CategoryLabel>
{/snippet}
<!-- 
{#if showAllData}
  {#each dataArray as line, i}
    <Line
      {lineFunction}
      {xFunction}
      {yFunction}
      dataArray={line.data}
      pathStrokeColor="black"
      pathStrokeWidth="1"
      opacity={hoveredLine ? 0.05 : 0.15}
      dataId={line.areaCode}
      {...defaultLineParams}
      onMouseEnter={function (event, dataArray, dataId) {
        hoveredLine = dataId;
      }}
      onMouseMove={function (event, dataArray, dataId) {
        hoveredLine = dataId;
      }}
      onMouseLeave={function (event, dataArray, dataId) {
        hoveredLine = null;
      }}
    ></Line>
    {#if line.areaCode === hoveredLine}
      <g>
        {@render categoryLabelSnippet(line, yFunction(line.data[0].y))}
      </g>
    {/if}
  {/each}
  {#if hoveredLine}
    <Line
      {lineFunction}
      dataArray={hoveredLine
        ? dataArray.find((el) => el.areaCode === hoveredLine).data
        : dataArray.find((el) => el.areaCode === selectedAreaCode).data}
      pathStrokeColor={colors[3]}
      pathStrokeWidth="5"
      opacity="1"
      includeMarkers={false}
      {xFunction}
      {yFunction}
      onMouseEnter={function (event, dataArray, dataId) {}}
      onMouseMove={function (event, dataArray, dataId) {}}
      onMouseLeave={function (event, dataArray, dataId) {}}
    ></Line>
  {/if}
{/if}
{#each primaryLinesDataArray as line, i}
  {@const lineParams = Object.keys(defaultLineParams).reduce((acc, key) => {
    acc[key] =
      line.hasOwnProperty(key) && line[key] != null
        ? line[key]
        : defaultLineParams[key];
    return acc;
  }, {})}
  <Line
    {lineFunction}
    {xFunction}
    {yFunction}
    dataArray={line.data}
    pathStrokeColor={colors[i]}
    opacity={!labelClicked && !labelHovered && !hoveredLine ? 1 : 0.2}
    includeMarkers={false}
    markerStroke={colors[i]}
    markerFill="white"
    dataId={line.areaCode}
    onMouseEnter={function (event, dataArray, dataId) {
      hoveredLine = dataId;
    }}
    onMouseMove={function (event, dataArray, dataId) {
      hoveredLine = dataId;
    }}
    onMouseLeave={function (event, dataArray, dataId) {
      hoveredLine = null;
    }}
    {...lineParams}
  ></Line>
  
  {#if selectedLine.includes(line.areaCode)}
    <Line
      {lineFunction}
      {xFunction}
      {yFunction}
      dataArray={line.data}
      pathStrokeColor={colors[i]}
      opacity={1}
      includeMarkers={false}
      markerStroke={colors[i]}
      markerFill="white"
      dataId={line.areaCode}
      onMouseEnter={function (event, dataArray, dataId) {}}
      onMouseMove={function (event, dataArray, dataId) {}}
      onMouseLeave={function (event, dataArray, dataId) {}}
    ></Line>
  {/if}
{/each} -->

{#each Object.keys(tieredDataObject) as tier}
  {#each tieredDataObject[tier] as line, i}
    <Line
      {lineFunction}
      {xFunction}
      {yFunction}
      dataArray={line.data}
      pathStrokeColor="black"
      opacity={1}
      dataId={line.areaCode}
      onClick={function (event, dataArray, dataId) {
        hoveredLine = dataId;
      }}
      onMouseEnter={function (event, dataArray, dataId) {
        hoveredLine = dataId;
      }}
      onMouseMove={function (event, dataArray, dataId) {
        hoveredLine = dataId;
      }}
      onMouseLeave={function (event, dataArray, dataId) {
        hoveredLine = null;
      }}
    ></Line>
    {#if labelsPlaced && tier === "primary"}
      {@render categoryLabelSnippet(
        line,
        labelsPlaced.find((el) => el.datum.areaCode === line.areaCode).y,
      )}
    {/if}
  {/each}
{/each}
