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
    nothingSelected = $bindable(),
    getLine,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let transformed = $derived(
    Object.values(tieredDataObject)
      .filter(Array.isArray)
      .flatMap((tier) => tier.filter((item) => item.showLabel === true))

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
  $inspect(nothingSelected);
  $inspect(globalTierRules);
</script>

{#each Object.keys(tieredDataObject) as tier}
  <g id={tier}>
    <g {...globalTierRules[tier]}>
      {#each tieredDataObject[tier] as line, i}
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
        {#if line.showLabel}
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
            onMouseEnter={function (areaCode) {
              labelHovered = areaCode;
            }}
            onMouseLeave={function (areaCode) {
              if (labelClicked !== areaCode) {
                labelHovered = null;
              }
            }}
          ></CategoryLabel>
        {/if}
      {/each}
    </g>
  </g>
{/each}
