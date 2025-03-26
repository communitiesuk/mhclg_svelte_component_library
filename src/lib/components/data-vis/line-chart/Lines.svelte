<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";
  import labelplacer from "labelplacer";
  import { onMount } from "svelte";

  let {
    data,
    lineFunction,
    selectedAreaCode,
    chartWidth,
    xFunction,
    yFunction,
    labelClicked = $bindable(),
  } = $props();

  let data2 = $state();
  $inspect(data2);
  let bounds = $state([0, 500]);

  let showAllData = $state(false);
  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  const transformed = data.lines.slice(0, 15).map((item) => {
    const lastY = item.data[0].y;
    return { areaCode: item.areaCode, lastY };
  });

  onMount(() => {
    data2 = labelplacer(
      transformed,
      bounds,
      (d) => yFunction(d.lastY),
      (d) => 20,
    );
  });

  let colors = ["red", "blue", "green", "orange", "purple", "cyan"];
</script>

{#snippet categoryLabel(dataArray, newY)}
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
    {@render categoryLabel(
      data.lines.find((el) => el.areaCode === selectedAreaCode),
    )}
  </g>
{:else}
  {#each data.lines.slice(0, 15) as line, i}
    {#if !selectedLine.includes(line.areaCode)}
      <Line
        {lineFunction}
        dataArray={line.data}
        pathStrokeColor={!selectedLine
          ? colors[data.lines.indexOf(line)]
          : "grey"}
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
    {/if}
  {/each}

  {#each data.lines.slice(0, 15) as line, i}
    {#if selectedLine.includes(line.areaCode)}
      <Line
        {lineFunction}
        dataArray={line.data}
        pathStrokeColor={colors[data.lines.indexOf(line)]}
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
{#each data.lines.slice(0, 15) as line, i}
  {#if data2 && data2[i]}
    {@render categoryLabel(line, data2[i].y)}
  {/if}{/each}
