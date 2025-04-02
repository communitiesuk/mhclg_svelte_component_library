<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";
  import labelplacer from "labelplacer";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";

  let {
    dataObject,
    lineFunction,
    selectedAreaCode,
    chartWidth,
    xFunction,
    yFunction,
    labelClicked = $bindable(),
    chartHeight,
    colors,
  } = $props();

  let hoveredLine = $state();
  $inspect(hoveredLine);
  let bounds = $state([0, chartHeight]);
  let showAllData = $state(true);
  const keyLines = $state([selectedAreaCode, "E07000026", "E07000032"]);
  let keyLinesSubset = $derived(
    dataObject.lines
      .filter((el) => keyLines.includes(el.areaCode))
      .map((el) => el),
  );

  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let transformed = $derived(
    keyLinesSubset.map((item) => {
      let lastY = yFunction(item.data[0].y);
      return { areaCode: item.areaCode, lastY };
    }),
  );

  let labelsPlaced = $state();

  onMount(() => {
    labelsPlaced = labelplacer(
      transformed,
      bounds,
      (d) => d.lastY,
      (d) => 20 * Math.ceil(d.areaCode.length / 15),
    );
  });
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
  ></CategoryLabel>
{/snippet}

{#if showAllData}
  {#each dataObject.lines as line, i}
    <Line
      {lineFunction}
      {xFunction}
      {yFunction}
      dataArray={line.data}
      pathStrokeColor="black"
      pathStrokeWidth="1"
      opacity={0.15}
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
        ? dataObject.lines.find((el) => el.areaCode === hoveredLine).data
        : dataObject.lines.find((el) => el.areaCode === selectedAreaCode).data}
      pathStrokeColor={colors[3]}
      pathStrokeWidth="5"
      opacity="1"
      includeMarkers={false}
      {xFunction}
      {yFunction}
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
  {/if}
{/if}
{#each keyLinesSubset as line, i}
  <Line
    {lineFunction}
    {xFunction}
    {yFunction}
    dataArray={line.data}
    pathStrokeColor={colors[i]}
    pathStrokeWidth="5"
    opacity={!labelClicked && !labelHovered ? 1 : 0.2}
    includeMarkers={false}
    markerRadius="8"
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
  ></Line>
  <!-- {#if labelsPlaced}
    {@render categoryLabelSnippet(
      line,
      labelsPlaced.find((el) => el.datum.areaCode === line.areaCode).y,
    )}
  {/if}
  {#if selectedLine.includes(line.areaCode)}
    <Line
      {lineFunction}
      {xFunction}
      {yFunction}
      dataArray={line.data}
      pathStrokeColor={colors[i]}
      pathStrokeWidth="5"
      opacity={1}
      includeMarkers={false}
      markerRadius="8"
      markerStroke={colors[i]}
      markerFill="white"
      dataId={line.areaCode}
      onMouseEnter={function (event, dataArray, dataId) {}}
      onMouseMove={function (event, dataArray, dataId) {}}
      onMouseLeave={function (event, dataArray, dataId) {}}
    ></Line>
  {/if} -->
{/each}
