<script>
  let {
    row,
    yFunction,
    chartWidth,
    labelsInside = false,
    edgeOfChartThreshold = 40,
  } = $props();

  // Check if row.y is NaN and handle it
  if (isNaN(row.y)) {
    row.y = 0; // or any default value you prefer
  }
</script>

{#snippet rowValueLabel(color, textAnchor, x)}
  <text {x} text-anchor={textAnchor} fill={color} stroke="none">{row.y}% </text>
{/snippet}

<g transform="translate({yFunction(row.y)},7)">
  {#if yFunction(row.y) > edgeOfChartThreshold && yFunction(row.y) < chartWidth - edgeOfChartThreshold}
    {#if labelsInside}
      {@render rowValueLabel(
        row.color ?? "white",
        row.y > 0 ? "end" : "start",
        (row.y > 0 ? -1 : 1) * 5,
      )}
    {:else}
      {@render rowValueLabel(
        row.color ?? "black",
        row.y > 0 ? "start" : "end",
        (row.y > 0 ? 1 : -1) * 5,
      )}
    {/if}
  {:else if yFunction(row.y) <= edgeOfChartThreshold}
    {@render rowValueLabel("white", "start", 10)}
  {:else}
    {@render rowValueLabel("white", "end", -10)}
  {/if}
</g>
