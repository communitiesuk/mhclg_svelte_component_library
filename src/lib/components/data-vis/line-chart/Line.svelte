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
    opacity,
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
    // markersDataId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
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

  let areaFunction = $derived(
    area()
      .y0((d) => yFunction(0))
      .x((d) => xFunction(d.x))
      .y1((d) => yFunction(d.y))
      .curve(curveLinear),
  );
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
  onmousemove={(event) => onMouseMove(event, dataArray, dataId)}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClick(e, dataArray)}
  {opacity}
>
  {#if includeArea}
    <path d={areaFunction(dataArray)} fill={areaFillColor}></path>
  {/if}
  <path
    d={lineFunction(dataArray)}
    fill="none"
    stroke="transparent"
    stroke-width="20"
    pointer-events="stroke"
  ></path>
  <path
    d={lineFunction(dataArray)}
    fill={pathFillColor}
    stroke={pathStrokeColor}
    stroke-width={pathStrokeWidth}
    stroke-dasharray={pathStrokeDashArray}
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
