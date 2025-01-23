<script>
  let { row, yFunction, chartWidth } = $props();
</script>

{#snippet rowValueLabel(color, textAnchor, x)}
  <text {x} text-anchor={textAnchor} fill={color} stroke="none">{row.y}% </text>
{/snippet}

<g transform="translate({yFunction(row.y)},7)">
  {#if yFunction(row.y) > 40 && yFunction(row.y) < chartWidth - 40}
    {@render rowValueLabel(
      row.color ?? "black",
      row.y > 0 ? "start" : "end",
      (row.y > 0 ? 1 : -1) * 5,
    )}
  {:else if yFunction(row.y) <= 40}
    {@render rowValueLabel("white", "start", 10)}
  {:else}
    {@render rowValueLabel("white", "end", -10)}
  {/if}
</g>
