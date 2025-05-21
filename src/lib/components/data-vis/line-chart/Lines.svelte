<script>
  import Line from "./Line.svelte";
  import SeriesLabel from "./SeriesLabel.svelte";
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
    lineHovered,
    lineClicked,
    chartHeight,
    globalTierRules,
    chartBackgroundColor = "#fafafa",
    nothingSelected = $bindable(),
    onMouseEnterLine,
    onMouseLeaveLine,
    onClickLine,
    onMouseEnterLabel,
    onMouseLeaveLabel,
    onClickLabel,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    onClickMarker,
    activeMarkerId,
    labelText,
    series,
    y,
    x,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let transformed = $derived(
    Object.values(tieredDataObject)
      .filter(Array.isArray)
      .flatMap((tier) => tier.filter((item) => item.showLabel === true))

      .filter(
        (item, index, self) =>
          self.findIndex((other) => other[series] === item[series]) === index,
      )
      .map((item) => ({
        [series]: item[series],
        lastY: yFunction(item.data[0][y]),
      })),
  );

  let labelsPlaced = $derived(
    labelplacer(
      transformed,
      bounds,
      (d) => d.lastY,
      (d) => 20 * Math.ceil(d[series].length / 15),
    ),
  );
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
          {xFunction}
          {yFunction}
          {onMouseEnterLine}
          {onMouseLeaveLine}
          {onClickLine}
          {onMouseEnterMarker}
          {onMouseLeaveMarker}
          {onClickMarker}
          lineClicked
          lineHovered
          {activeMarkerId}
          {series}
          {y}
          {x}
        />
      {/each}
    </g>

    <g>
      {#each tieredDataObject[tier] as line, i}
        {#if line.showLabel}
          {@const newY = labelsPlaced.find(
            (el) => el.datum[series] === line[series],
          )?.[y]}
          <SeriesLabel
            id={`label-${line[series]}`}
            bind:labelClicked
            bind:labelHovered
            {chartWidth}
            {lineFunction}
            dataArray={line}
            {xFunction}
            {yFunction}
            {newY}
            {onClickLabel}
            {onMouseEnterLabel}
            {onMouseLeaveLabel}
            {labelText}
            {series}
            {y}
          ></SeriesLabel>
        {/if}
      {/each}
    </g>
  </g>
{/each}
