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
    includeArea = false,
    markers,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "grey",
    markerStroke = "white",
    markerStrokeWidth = 3,
    lineFunction,
    areaFunction,
    xFunction,
    yFunction,
    lineEnding,
    dataId,
    onClickLine,
    onMouseEnterLine,
    onMouseLeaveLine,
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
    lineClicked = $bindable(),
    lineHovered = $bindable(),
    activeMarkerId,
  } = $props();

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

  let linePath = lineFunction(dataArray);
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
  onclick={(e) => onClickLine(e, dataArray, dataId)}
  onmouseenter={(e) => onMouseEnterLine(e, dataArray, dataId)}
  onmouseleave={(e) => onMouseLeaveLine(e, dataArray, dataId)}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClickLine(e, dataArray)}
  {opacity}
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
  {#if false}
    {#each dataArray as marker, i}
      <g
        data-id={"marker-" + marker.areaCode + marker.x}
        onclick={(event) => onClickMarker(event, marker, dataId)}
        onmouseenter={(event) => onMouseEnterMarker(event, marker, dataId)}
        onmouseleave={(event) => onMouseLeaveMarker(event, marker, dataId)}
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
        {#if true}
          {#if activeMarkerId == `marker-${marker.areaCode}${marker.x}`}
            <ValueLabel
              {marker}
              labelColor="grey"
              labelTextColor="black"
              textContent={parseInput(marker, marker.y)}
            ></ValueLabel>
          {/if}
        {/if}
      </g>
    {/each}
  {/if}
</g>
