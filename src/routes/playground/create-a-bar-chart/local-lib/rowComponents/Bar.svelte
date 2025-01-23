<script>
  let { scaledValue, rowHeight, selectedBar = $bindable(), row } = $props();
</script>

{#if scaledValue}
  <rect
    x={scaledValue >= 0 ? 0 : scaledValue}
    y={-rowHeight / 2}
    width={Math.abs(scaledValue)}
    height={0.9 * rowHeight}
    onmousemove={() => (selectedBar = row.areaCode)}
    onmouseout={() => (selectedBar = null)}
    fill={row.areaCode == selectedBar ? 'darkturquoise' : row.color.bar}
  ></rect>
{/if}

<style>
  rect {
    transition:
      fill 150ms,
      width 500ms;
  }
</style>
