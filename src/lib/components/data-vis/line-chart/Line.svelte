<script>
  import ValueLabel from "./ValueLabel.svelte";
  import Marker from "./Marker.svelte";
  import {
    curveBasis,
    curveCardinal,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveStep,
    line,
    area,
  } from "d3-shape";

  import { scaleLinear } from "d3-scale";

  let {
    dataArray,
    opacity = 1,
    pathStrokeColor = "grey",
    pathStrokeWidth = 3,
    pathFillColor = "none",
    pathStrokeDashArray = "none",
    areaFillColor,
    includeArea = false,
    lineFunction,
    areaFunction,
    xFunction,
    yFunction,
    lineEnding,
    dataId,
    onClickSeries,
    onMouseEnterSeries,
    onMouseLeaveSeries,
    halo,
    chartBackgroundColor,
    invisibleStrokeWidth,
    interactive,
    onClickMarker,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    // includeLabels,
    // labelText,
    // labelColor,
    // labelTextColor,
    clickedSeries,
    hoveredSeries,
    activeMarkerId,
    series,
    y,
    id,
    x,
    markers,
    markerFill,
    markerRadius,
    markerShape,
    markerStroke,
    markerStrokeWidth,
    tier,
  } = $props();

  let linePath = $derived(lineFunction(dataArray));
</script>

<defs>
  <marker
    id={`arrow-${pathStrokeColor}`}
    markerWidth="4"
    markerHeight="3"
    refX="2.7"
    refY="1.5"
    orient="auto-start-reverse"
  >
    <polygon points="0 0, 4 1.5, 0 3" style="fill: {pathStrokeColor}"></polygon>
  </marker>

  <marker
    id={`circle-${pathStrokeColor}`}
    markerWidth="14"
    markerHeight="14"
    refX="5"
    refY="5"
    orient="auto"
  >
    <circle cx="5" cy="5" r="1.5" style="fill: {pathStrokeColor}"></circle>
  </marker>
</defs>

<g
  data-id={dataId}
  {id}
  onclick={interactive ? (e) => onClickSeries(dataId, tier) : null}
  onmouseenter={interactive ? (e) => onMouseEnterSeries(dataId, tier) : null}
  onmouseleave={interactive ? (e) => onMouseLeaveSeries(dataId, tier) : null}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClickSeries(e, dataArray)}
  {opacity}
  pointer-events={interactive ? null : "none"}
>
  {#if includeArea}
    <path d={areaFunction(dataArray)} fill={areaFillColor}></path>
  {/if}
  <path
    d={linePath}
    fill="none"
    stroke="invisible"
    stroke-width={invisibleStrokeWidth}
    pointer-events={interactive ? "stroke" : "none"}
  ></path>
  {#if halo}
    <path
      d={linePath}
      fill={pathFillColor}
      stroke={chartBackgroundColor}
      stroke-width={pathStrokeWidth * 1.2}
      stroke-dasharray={pathStrokeDashArray}
      pointer-events="none"
    ></path>
  {/if}
  <path
    d={linePath}
    fill={pathFillColor}
    stroke={pathStrokeColor}
    stroke-width={pathStrokeWidth}
    stroke-dasharray={pathStrokeDashArray}
    pointer-events="none"
    marker-start={`url(#${lineEnding}-${pathStrokeColor})`}
  ></path>
  {#if markers}
    <Marker
      {dataArray}
      {markerFill}
      {markerRadius}
      {markerShape}
      {markerStroke}
      {markerStrokeWidth}
      {x}
      {y}
      {series}
      {xFunction}
      {yFunction}
      {onMouseEnterMarker}
      {onMouseLeaveMarker}
      {onClickMarker}
      {activeMarkerId}
    ></Marker>
  {/if}
</g>
