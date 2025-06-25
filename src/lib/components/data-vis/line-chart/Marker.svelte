<script>
  import ValueLabel from "./ValueLabel.svelte";
  let {
    dataArray,
    series,
    onClickMarker,
    onMouseEnterMarker,
    onMouseLeaveMarker,
    xFunction,
    yFunction,
    x,
    y,
    pathStrokeColor = null,
    markerShape = "circle",
    markerRadius = 5,
    markerFill = pathStrokeColor,
    markerStroke = "white",
    markerStrokeWidth = 1,
    interactiveMarkers,
  } = $props();
</script>

{#each dataArray as marker, i}
  {@const markerId = "marker-" + marker[series] + marker[x]}
  <g
    data-id={markerId}
    onclick={interactiveMarkers
      ? (event) => onClickMarker(event, marker, markerId)
      : null}
    onmouseenter={interactiveMarkers
      ? (event) =>
          onMouseEnterMarker(
            event,
            marker,
            markerId,
            event.currentTarget.getBoundingClientRect(),
          )
      : null}
    onmouseleave={interactiveMarkers
      ? (event) => onMouseLeaveMarker(event, marker, markerId)
      : null}
    transform="translate({xFunction(marker[x])},{yFunction(marker[y])})"
    role="button"
    tabindex="0"
    onkeydown={interactiveMarkers
      ? (e) => e.key === "Enter" && onClickMarker(e, marker)
      : null}
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
  </g>
{/each}
