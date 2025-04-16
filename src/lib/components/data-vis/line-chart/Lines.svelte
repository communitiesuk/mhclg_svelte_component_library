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
    areaFunction,
    labelClicked = $bindable(),
    areaCodeHover = $bindable(),
    chartHeight,
    colors,
    showAllData,
    defaultLineParams,
    globalTierRules,
    chartBackgroundColor,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let labelHovered = $state();
  let selectedLine = $derived([labelHovered, labelClicked]);

  let transformed = $derived(
    tieredDataObject[areaCodeHover ? "hover" : "primary"].map((item) => {
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

{#each Object.keys(tieredDataObject) as tier}
  <g opacity={globalTierRules[tier].opacity} id={tier}>
    {#each tieredDataObject[tier] as line, i}
      <Line
        {lineFunction}
        {xFunction}
        {yFunction}
        {areaFunction}
        dataArray={line.data}
        pathStrokeColor={defaultLineParams[tier].color}
        pathStrokeWidth={defaultLineParams[tier].pathStrokeWidth}
        dataId={line.areaCode}
        halo={defaultLineParams[tier].halo}
        onClick={function (event, dataArray, dataId) {
          areaCodeHover = dataId;
        }}
        onMouseEnter={function (event, dataArray, dataId) {
          areaCodeHover = dataId;
        }}
        onMouseMove={function (event, dataArray, dataId) {
          areaCodeHover = dataId;
        }}
        onMouseLeave={function (event, dataArray, dataId) {
          areaCodeHover = null;
        }}
        {...defaultLineParams}
        {chartBackgroundColor}
      ></Line>
      {#if (!areaCodeHover && tier === "primary") || (areaCodeHover && tier === "hover")}
        {@render categoryLabelSnippet(
          line,
          labelsPlaced.find((el) => el.datum.areaCode === line.areaCode).y,
        )}
      {/if}
    {/each}
  </g>
{/each}
