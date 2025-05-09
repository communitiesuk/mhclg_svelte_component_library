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
    chartWidth,
    xFunction,
    yFunction,
    labelClicked = $bindable(),
    labelHovered = $bindable(),
    lineHovered = $bindable(),
    lineClicked = $bindable(),
    chartHeight,
    globalTierRules,
    chartBackgroundColor = "#fafafa",
    nothingSelected,
    getLine,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let transformed = $derived(
    (nothingSelected
      ? tieredDataObject.primary
      : [...(tieredDataObject.hover || []), ...(tieredDataObject.clicked || [])]
    )
      .filter(
        (item, index, self) =>
          self.findIndex((other) => other.areaCode === item.areaCode) === index,
      )
      .map((item) => ({
        areaCode: item.areaCode,
        lastY: yFunction(item.data[0].y),
      })),
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
    return {
      ...merged,
      dataId: line.areaCode,
      dataArray: line.data, // rename in the original to avoid this
    };
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
    <g {...globalTierRules[tier]}>
      {#each tieredDataObject[tier] as line, i}
        <!-- {@const lineAttributes = generateLineAttributes(
          line,
          defaultLineParams,
          tier,
        )} -->
        <Line
          {...line}
          {tier}
          {chartBackgroundColor}
          {lineFunction}
          {onMouseEnter}
          {onMouseLeave}
          {onClick}
          bind:lineClicked
          bind:lineHovered
        />
      {/each}
    </g>

    <g>
      {#each tieredDataObject[tier] as line, i}
        {#if (tier == "primary" && nothingSelected) || ["hover", "clicked"].includes(tier)}
          <CategoryLabel
            id={`label-${line.areaCode}`}
            bind:labelClicked
            bind:labelHovered
            {chartWidth}
            {lineFunction}
            dataArray={line}
            {xFunction}
            {yFunction}
            newY={labelsPlaced.find((el) => el.datum.areaCode === line.areaCode)
              ?.y}
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
              labelHovered === areaCode
                ? (labelHovered = null)
                : (labelHovered = null);
            }}
          ></CategoryLabel>
        {/if}
      {/each}
    </g>
  </g>
{/each}
