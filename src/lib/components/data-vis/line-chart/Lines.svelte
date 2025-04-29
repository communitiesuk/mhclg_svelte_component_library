<script>
  import Line from "./Line.svelte";
  import CategoryLabel from "./CategoryLabel.svelte";
  import labelplacer from "labelplacer";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { linear } from "svelte/easing";

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
    labelHovered = $bindable(),
    lineHovered = $bindable(),
    chartHeight,
    colors,
    showAllData,
    defaultLineParams,
    globalTierRules,
    chartBackgroundColor,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let transformed = $derived(
    tieredDataObject[lineHovered ? "hover" : "primary"].map((item) => {
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

  function generateLineAttributes(line, defaultLineParams, tier) {
    const listOfProperties = [
      ...new Set([
        ...Object.keys(line),
        ...Object.keys(defaultLineParams[tier]),
      ]),
    ];

    const merged = Object.fromEntries(
      listOfProperties.map((key) => [
        key,
        line[key] ?? defaultLineParams[tier][key],
      ]),
    );
    return merged;
  }
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
  <g id={tier}>
    {#each tieredDataObject[tier] as line, i}
      {@const lineAttributes = generateLineAttributes(
        line,
        defaultLineParams,
        tier,
      )}
      <g opacity={globalTierRules[tier].opacity}>
        <Line
          dataArray={line.data}
          {...lineAttributes}
          dataId={line.areaCode}
          onClick={function (event, dataArray, dataId) {
            lineHovered = dataId;
          }}
          onMouseEnter={function (event, dataArray, dataId) {
            lineHovered = dataId;
          }}
          onMouseMove={function (event, dataArray, dataId) {
            lineHovered = dataId;
          }}
          onMouseLeave={function (event, dataArray, dataId) {
            lineHovered = null;
          }}
          {...defaultLineParams}
          {chartBackgroundColor}
        ></Line>
      </g>
      {#if (!lineHovered && tier === "primary") || (lineHovered && tier === "hover")}
        {@render categoryLabelSnippet(
          line,
          labelsPlaced.find((el) => el.datum.areaCode === line.areaCode).y,
        )}
      {/if}
    {/each}
  </g>
{/each}
