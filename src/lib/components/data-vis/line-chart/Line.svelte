<script>
  import ValueLabel from "./ValueLabel.svelte";
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
    includeArea,
    includeMarkers = false,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "grey",
    markerStroke = "white",
    markerStrokeWidth = 3,
    lineFunction,
    curveFunction,
    xFunction,
    lineEnding = null,
    yFunction,
    dataId,
    tier,
    // markersDataId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    halo,
    haloColor = "#d1aad1",
    // onClickMarker,
    // onMouseEnterMarker,
    // onMouseLeaveMarker,
    // onMouseMoveMarker,
    // includeLabels,
    // labelText,
    // labelColor,
    // labelTextColor,
  } = $props();

  let hoveredMarker = $state();

  function makeList(inputValue) {
    let items = inputValue.split("\\n").map((item) => item.trim());
    return items;
  }

  function parseInput(marker, inputValue) {
    let items = makeList(inputValue);
    let mappedItems = items.map((item) =>
      item.replace(/\{(\w+)\}/g, (_, key) => marker[key] ?? `{${key}}`),
    );
    return mappedItems;
  }

  function onMouseEnterMarker(i) {
    hoveredMarker = i;
  }

  function onMouseLeaveMarker(i) {
    hoveredMarker = null;
  }
</script>

<defs>
  <marker
    id={`arrow-${pathStrokeColor}`}
    markerWidth="6"
    markerHeight="4"
    refX="4"
    refY="2"
    orient="auto-start-reverse"
  >
    <polygon points="0 0, 6 2, 0 4" style="fill: {pathStrokeColor}"></polygon>
  </marker>

  <marker
    id={`circle-${pathStrokeColor}`}
    markerWidth="14"
    markerHeight="14"
    refX="7"
    refY="7"
    orient="auto"
  >
    <circle cx="7" cy="7" r="1.5" style="fill: {pathStrokeColor}"></circle>
  </marker>
</defs>

<g
  data-id={dataId}
  onclick={(event) => onClick(event, dataArray, dataId)}
  onmouseenter={(event) => onMouseEnter(event, dataArray, dataId)}
  onmouseleave={(event) => onMouseLeave(event, dataArray, dataId)}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClick(e, dataArray)}
  {opacity}
>
  {#if includeArea}
    <path d={areaFunction(dataArray)} fill={areaFillColor}></path>
  {/if}
  {console.log(tier)}
  {#if tier !== "invisibles"}
    <path
      d={lineFunction(dataArray)}
      fill="none"
      stroke="invisible"
      stroke-width="20"
      pointer-events="stroke"
    ></path>
  {/if}
  {#if halo}
    <path
      d={lineFunction(dataArray)}
      fill={pathFillColor}
      stroke={haloColor}
      stroke-width={pathStrokeWidth * 1.2}
      stroke-dasharray={pathStrokeDashArray}
      pointer-events="none"
    ></path>
  {/if}
  <path
    d={lineFunction(dataArray)}
    fill={pathFillColor}
    stroke={pathStrokeColor}
    stroke-width={pathStrokeWidth}
    stroke-dasharray={pathStrokeDashArray}
    pointer-events="none"
  ></path>

  <!-- {#if includeMarkers}
    {#each dataArray as marker, i}
      <g
        data-id={markersDataId + "-" + i}
        onclick={(event) => onClickMarker(event, marker)}
        onmouseenter={(event) => onMouseEnterMarker(i)}
        onmouseleave={(event) => onMouseLeaveMarker(i)}
        onmousemove={(event) => onMouseMove(event, marker)}
        transform="translate({xFunction(marker.x)},{yFunction(marker.y)})"
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && onClickMarker(e, marker)}
      >
        {#if markerShape === "circle"}
          <circle
            r={markerRadius}
            stroke={markerStroke}
            fill={markerFill}
            stroke-width={markerStrokeWidth}
          ></circle>
        {:else if ["square", "diamond"].includes(markerShape)}
          <rect
            transform="rotate({markerShape === 'diamond' ? 45 : 0})"
            x={-markerRadius}
            y={-markerRadius}
            width={markerRadius * 2}
            height={markerRadius * 2}
            stroke={markerStroke}
            fill={markerFill}
            stroke-width={markerStrokeWidth}
          ></rect>
        {:else if markerShape === "triangle"}
          <polygon
            points="0,{-markerRadius * 2} {markerRadius *
              1.733},{markerRadius} {-markerRadius * 1.733},{markerRadius}"
            stroke={markerStroke}
            fill={markerFill}
            stroke-width={markerStrokeWidth}
          ></polygon>
        {/if}
        {#if includeLabels}
          {#if i == hoveredMarker}
            <ValueLabel
              {marker}
              {labelColor}
              {labelTextColor}
              textContent={parseInput(marker, labelText)}
            ></ValueLabel>
          {/if}
        {/if}
      </g>
    {/each}
  {/if}-->
</g>

<!-- <path
  d={pathFunction(dataArray)}
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
></path>

{#if markers}
  {#each dataArray as marker}
    <circle cx={x(marker.x)} cy={y(marker.y)} r="6" stroke="white" fill={color}>
    </circle>
  {/each}
{/if} -->
