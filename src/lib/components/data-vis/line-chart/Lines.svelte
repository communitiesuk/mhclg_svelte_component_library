<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";

  let {
    data,
    lineFunction,
    selectedAreaCode,
    chartWidth,
    xFunction,
    yFunction,
  } = $props();

  let showAllData = $state(false);
  let labelClicked = $state();
  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let colors = ["red", "blue", "green", "orange", "purple", "cyan"];
</script>

{#snippet categoryLabel(dataArray)}
  <CategoryLabel
    bind:labelClicked
    bind:labelHovered
    {chartWidth}
    {lineFunction}
    {dataArray}
    {xFunction}
    {yFunction}
    text="hello"
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
  {#each data.lines.slice(0, 5) as line}
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
      {@render categoryLabel(line)}
    {/if}
  {/each}

  {#each data.lines.slice(0, 5) as line}
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
      {@render categoryLabel(line)}
    {/if}
  {/each}
{/if}
