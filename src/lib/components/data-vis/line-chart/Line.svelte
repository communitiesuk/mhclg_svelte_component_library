<script>
  let {
    dataArray,
    opacity = 1,
    pathStrokeColor = '#b312a0',
    pathStrokeWidth = 1,
    pathFillColor = 'none',
    pathStrokeDashArray = 'none',
    includeMarkers = false,
    markerShape = 'circle',
    markerRadius = 5,
    markerFill = '#b312a0',
    markerStroke = 'white',
    markerStrokeWidth = 3,
    lineFunction,
    xFunction,
    yFunction,
  } = $props();

  $inspect(dataArray);
</script>

<g {opacity}>
  <path
    d={lineFunction(dataArray)}
    fill={pathFillColor}
    stroke={pathStrokeColor}
    stroke-width={pathStrokeWidth}
    stroke-dasharray={pathStrokeDashArray}
  ></path>

  {#if includeMarkers}
    {#each dataArray as marker}
      <g transform="translate({xFunction(marker.x)},{yFunction(marker.y)})">
        {#if markerShape === 'circle'}
          <circle
            r={markerRadius}
            stroke={markerStroke}
            fill={markerFill}
            stroke-width={markerStrokeWidth}
          ></circle>
        {:else if ['square', 'diamond'].includes(markerShape)}
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
        {:else if markerShape === 'triangle'}
          <polygon
            points="0,{-markerRadius * 2} {markerRadius *
              1.733},{markerRadius} {-markerRadius * 1.733},{markerRadius}"
            stroke={markerStroke}
            fill={markerFill}
            stroke-width={markerStrokeWidth}
          ></polygon>
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
