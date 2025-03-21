<script>
  let { row, yFunction, rowHeight } = $props();
  $inspect(row);
</script>

{#if isNaN(row.y)}
  <line
    stroke-width="{rowHeight - 5}px"
    x1={yFunction(0)}
    x2={yFunction(0)}
    y1="0"
    y2="0"
    stroke={row.color ?? "black"}
  ></line>
{:else}
  <line
    stroke-width="{rowHeight - 5}px"
    x1={yFunction(0)}
    x2={yFunction(row.y)}
    y1="0"
    y2="0"
    stroke={row.color ?? "black"}
  ></line>
{/if}
