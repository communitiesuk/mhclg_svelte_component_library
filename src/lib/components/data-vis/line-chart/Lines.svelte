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

  let colors = ["red", "blue", "green", "orange", "purple", "cyan"];
</script>

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
{:else}
  {#each data.lines.slice(0, 5) as line, i}
    <Line
      {lineFunction}
      dataArray={line.data}
      pathStrokeColor={colors[i]}
      pathStrokeWidth="5"
      opacity="1"
      includeMarkers={false}
      markerRadius="8"
      markerStroke="red"
      markerFill="white"
      dataId={line.areaCode}
      onMouseMove={() => {
        selectedAreaCode = line.areaCode;
      }}
    ></Line>
  {/each}
{/if}
<g>
  <CategoryLabel
    {chartWidth}
    {lineFunction}
    dataArray={data.lines.find((el) => el.areaCode === selectedAreaCode).data}
    {xFunction}
    {yFunction}
    text="hello"
  ></CategoryLabel>
</g>
