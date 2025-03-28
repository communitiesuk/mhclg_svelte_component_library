<script>
  import ValueLabel from "./ValueLabel.svelte";

  let {
    dataArray,
    opacity = 1,
    pathStrokeColor = "#b312a0",
    pathStrokeWidth = 1,
    pathFillColor = "none",
    pathStrokeDashArray = "none",
    areaFillColor,
    includeArea = false,
    includeMarkers = false,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "#b312a0",
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
    id="arrowhead"
    markerWidth="6"
    markerHeight="4"
    refX="4"
    refY="2"
    orient="auto-start-reverse"
  >
    <polygon points="0 0, 6 2, 0 4" fill={pathStrokeColor}></polygon>
  </marker>
</defs>

<g
  data-id={dataId}
  onclick={onClick}
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
  onmousemove={onMouseMove}
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
    marker-start="url(#arrowhead)"
  ></path>
  {#if lineEnding}
    <g
      transform="translate({xFunction(dataArray[0].x)},{yFunction(
        dataArray[0].y,
      )})"
    >
      {#if lineEnding === "circle"}
        <circle r="7" fill={pathStrokeColor}></circle>
      {/if}
    </g>
  {/if}

  {#if includeMarkers}
    {#each dataArray as marker, i}
      <g
        data-id={markersDataId + "-" + i}
        onclick={onClickMarker}
        onmouseenter={() => onMouseEnterMarker(i)}
        onmouseleave={() => onMouseLeaveMarker(i)}
        onmousemove={onMouseMoveMarker}
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
