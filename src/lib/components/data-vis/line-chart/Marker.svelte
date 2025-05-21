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
    markerShape = "circle",
    markerRadius = 5,
    markerFill = "grey",
    markerStroke = "white",
    markerStrokeWidth = 1,
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
</script>

{#each dataArray as marker, i}
  {@const markerId = "marker-" + marker[series] + marker[x]}
  {console.log(markerId)}
  <g
    data-id={markerId}
    onclick={(event) => onClickMarker(event, marker, markerId)}
    onmouseenter={(event) => onMouseEnterMarker(event, marker, markerId)}
    onmouseleave={(event) => onMouseLeaveMarker(event, marker, markerId)}
    transform="translate({xFunction(marker[x])},{yFunction(marker[y])})"
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
    <!-- {#if true}
      {#if activeMarkerId === markerId}
        <ValueLabel
          {marker}
          labelColor="grey"
          labelTextColor="black"
          textContent={parseInput(marker, marker[y])}
        ></ValueLabel>
      {/if}
    {/if} -->
  </g>
{/each}
