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
  } = $props();

  let bounds = $state([0, 600]);

  let showAllData = $state(false);
  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let subset = $state(data.lines.slice(0, 15));

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
      (d) => 20,
    );
  });

  $inspect(labelsPlaced);

  let colors = ["red", "blue", "green", "orange", "purple", "cyan"];
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
  {#each data.lines as line, i}
    {#if line.areaCode !== selectedAreaCode}
      <Line
        {lineFunction}
        dataArray={line.data}
        pathStrokeColor="black"
        pathStrokeWidth="1"
        opacity="0.15"
        dataId={line.areaCode}
        onMouseMove={() => {
          selectedAreaCode = line.areaCode;
        }}
      ></Line>
    {/if}
  {/each}
  <Line
    {lineFunction}
    dataArray={data.lines.find((el) => el.areaCode === selectedAreaCode).data}
    pathStrokeColor="red"
    pathStrokeWidth="5"
    opacity="1"
    includeMarkers={true}
    markerRadius="8"
    markerStroke="red"
    markerFill="white"
    {xFunction}
    {yFunction}
  ></Line>
  <g>
    {@render categoryLabelSnippet(
      data.lines.find((el) => el.areaCode === selectedAreaCode),
    )}
  </g>
{:else}
  {#each subset as line, i}
    <Line
      {lineFunction}
      dataArray={line.data}
      pathStrokeColor={colors[i]}
      pathStrokeWidth="5"
      opacity={!selectedLine ? 1 : 0.5}
      includeMarkers={false}
      markerRadius="8"
      markerStroke="red"
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
        dataArray={line.data}
        pathStrokeColor={colors[i]}
        pathStrokeWidth="5"
        opacity={1}
        includeMarkers={false}
        markerRadius="8"
        markerStroke="red"
        markerFill="white"
        dataId={line.areaCode}
        onMouseMove={() => {
          selectedAreaCode = line.areaCode;
        }}
      ></Line>
    {/if}
  {/each}
{/if}
