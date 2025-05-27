<script>
  import Line from "./Line.svelte";
  import Marker from "./Marker.svelte";
  import ValueLabel from "./ValueLabel.svelte";
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
    labelClicked,
    labelHovered,
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
          lineClicked
          lineHovered
          {series}
          {y}
          {x}
          {onMouseEnterMarker}
          {onMouseLeaveMarker}
          {onClickMarker}
          {activeMarkerId}
        />
      {/each}
    </g>

    <g>
      {#each tieredDataObject[tier] as line, i}
        {#if line.showLabel}
          {console.log("@", labelClicked == line[series])}
          {#if !labelClicked || (labelClicked && line[series] == labelClicked)}
            {@const newY = labelsPlaced.find(
              (el) => el.datum[series] === line[series],
            )?.[y]}
            <SeriesLabel
              id={`label-${line[series]}`}
              {labelClicked}
              {labelHovered}
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
        {/if}
      {/each}
    </g>
  </g>
{/each}

{#if activeMarkerId}
  <ValueLabel
    {activeMarkerId}
    labelColor="grey"
    labelTextColor="black"
    textContent={`this string contains some <strong>HTML!!!</strong>`}
    {xFunction}
    {yFunction}
    {x}
    {y}
  ></ValueLabel>
{/if}

<!-- if markerhovered get the id render the tooltip find in the tieredDataObject gets
the data for that line -->
