<script>
  let { row, xFunction, barHeight, colours, chartWidth } = $props();
  let offsetX = $derived(xFunction(row.y));
  let minSpaceOutside = $derived(chartWidth - 70)
</script>

{#snippet rowValueLabel(x, textAnchor)}
<g transform="translate({offsetX},{barHeight / 2})">
  <text
    dominant-baseline="central"
    x={x}
    y={0}
    text-anchor={textAnchor}>{row.y}</text></g>
{/snippet}

{#if row.y < 0 && xFunction(Math.abs(row.y)) > minSpaceOutside}
{@render rowValueLabel(5, 'start')}
{:else if row.y < 0 && xFunction(Math.abs(row.y)) < minSpaceOutside}
{@render rowValueLabel(-5, 'end')}
{:else if row.y > 0 && xFunction(Math.abs(row.y)) > minSpaceOutside}
{@render rowValueLabel(-5, 'end')}
{:else}
{@render rowValueLabel(5, 'start')}
{/if}
