<script>
  let {
    scaledValue,
    rowHeight,
    rowLabel,
    selectedBar = $bindable(),
  } = $props();
</script>

{#if scaledValue}
  <rect
    y={-rowHeight / 2}
    width={scaledValue}
    height={0.9 * rowHeight}
    onmousemove={() => (selectedBar = rowLabel)}
    onmouseout={() => (selectedBar = null)}
    fill={rowLabel == selectedBar ? 'darkturquoise' : 'lightblue'}
  ></rect>
{/if}

<style>
  rect {
    transition:
      fill 150ms,
      width 500ms;
  }
</style>
