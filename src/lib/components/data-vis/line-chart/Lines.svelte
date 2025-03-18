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
</script>

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
  <CategoryLabel
    {chartWidth}
    {lineFunction}
    dataArray={data.lines.find((el) => el.areaCode === selectedAreaCode).data}
    {xFunction}
    {yFunction}
    text="hello"
  ></CategoryLabel>
</g>
