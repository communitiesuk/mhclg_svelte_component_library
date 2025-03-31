<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";
  import labelplacer from "labelplacer";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";

  let {
    data,
    lineFunction,
    selectedAreaCode,
    chartWidth,
    xFunction,
    yFunction,
    labelClicked = $bindable(),
    chartHeight,
    colors,
  } = $props();

  let bounds = $state([0, chartHeight]);
  let nLines = $state(7);

  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let subset = $state(data.lines.slice(0, nLines));

  let transformed = $derived(
    subset.map((item) => {
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

{#if nLines > 25}
  {#each subset as line, i}
    {#if line.areaCode !== selectedAreaCode}
      <Line
        {lineFunction}
        {xFunction}
        {yFunction}
        dataArray={line.data}
        pathStrokeColor="black"
        pathStrokeWidth="1"
        opacity={0.15}
        dataId={line.areaCode}
        onMouseMove={() => {
          selectedAreaCode = line.areaCode;
        }}
      ></Line>
    {:else}
      <g>
        {@render categoryLabelSnippet(line, yFunction(line.data[0].y))}
      </g>
    {/if}
  {/each}
  <Line
    {lineFunction}
    dataArray={data.lines.find((el) => el.areaCode === selectedAreaCode).data}
    pathStrokeColor={colors[0]}
    pathStrokeWidth="5"
    opacity="1"
    includeMarkers={true}
    markerRadius="8"
    markerStroke={colors[0]}
    markerFill="white"
    {xFunction}
    {yFunction}
  ></Line>
{:else}
  {#each subset as line, i}
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
      onMouseMove={() => {
        selectedAreaCode = line.areaCode;
      }}
    ></Line>
    {#if labelsPlaced}
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
        onMouseMove={() => {
          selectedAreaCode = line.areaCode;
        }}
      ></Line>
    {/if}
  {/each}
{/if}
