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
    clickedSeries,
    hoveredSeries,
    chartHeight,
    globalTierRules,
    chartBackgroundColor = "#fafafa",
    nothingSelected,
    onMouseEnterSeries,
    onMouseLeaveSeries,
    onClickSeries,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    onClickMarker,
    activeMarkerId,
    labelText,
    series,
    y,
    x,
    tooltipContent,
  } = $props();

  let bounds = $state([0, chartHeight]);

  let transformed = $derived(
    Object.values(tieredDataObject)
      .filter(Array.isArray)
      .flatMap((tier) => tier.filter((item) => item.placeLabel === true))

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
          id={`line-${line[series]}`}
          {tier}
          {chartBackgroundColor}
          {lineFunction}
          {xFunction}
          {yFunction}
          {onMouseEnterSeries}
          {onMouseLeaveSeries}
          {onClickSeries}
          {clickedSeries}
          {hoveredSeries}
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
          {@const newY = labelsPlaced.find(
            (el) => el.datum[series] === line[series],
          )?.[y]}
          <SeriesLabel
            interactiveLines={line.interactiveLines}
            id={`label-${line[series]}`}
            {clickedSeries}
            {hoveredSeries}
            {chartWidth}
            {lineFunction}
            dataArray={line}
            {xFunction}
            {yFunction}
            {newY}
            {onClickSeries}
            {onMouseEnterSeries}
            {onMouseLeaveSeries}
            {labelText}
            {series}
            {y}
            {tier}
          ></SeriesLabel>
        {/if}
      {/each}
    </g>
  </g>
{/each}
