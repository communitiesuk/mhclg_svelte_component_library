<script>
  import ValueLabel from "./ValueLabel.svelte";

  let {
    dataArray,
    opacity = 0.15,
    pathStrokeColor = "grey",
    pathStrokeWidth = 3,
    pathFillColor = "none",
    pathStrokeDashArray = "none",
    areaFillColor = "none",
    includeArea = false,
    includeMarkers = false,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "grey",
    markerStroke = "white",
    markerStrokeWidth = 3,
    lineFunction,
    areaFunction,
    xFunction,
    lineEnding = null,
    yFunction,
    dataId,
    markersDataId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClickMarker,
    // onMouseEnterMarker,
    // onMouseLeaveMarker,
    onMouseMoveMarker,
    includeLabels,
    labelText,
    labelColor,
    labelTextColor,
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
  onclick={(event) => onClick(event, dataArray)}
  onmouseenter={(event) => onMouseEnter(event, dataArray, dataId)}
  onmouseleave={(event) => onMouseLeave(event, dataArray, dataId)}
  onmousemove={(event) => onMouseMove(event, dataArray, dataId)}
  {opacity}
>
  {#if includeArea}
    <path d={areaFunction(dataArray)} fill={areaFillColor}></path>
  {/if}
  <path
    d={lineFunction(dataArray)}
    fill={pathFillColor}
    stroke={pathStrokeColor}
    stroke-width={pathStrokeWidth}
    stroke-dasharray={pathStrokeDashArray}
    marker-start={lineEnding === "arrow"
      ? `url(#arrow-${pathStrokeColor})`
      : lineEnding === "circle"
        ? `url(#circle-${pathStrokeColor})`
        : null}
  ></path>

  {#if includeMarkers}
    {#each dataArray as marker, i}
      <g
        data-id={markersDataId + "-" + i}
        onclick={(event) => onClickMarker(event, marker)}
        onmouseenter={(event) => onMouseEnterMarker(event, marker)}
        onmouseleave={(event) => onMouseLeaveMarker(event, marker)}
        onmousemove={(event) => onMouseMove(event, marker)}
        transform="translate({xFunction(marker.x)},{yFunction(marker.y)})"
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
  {/if}
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
