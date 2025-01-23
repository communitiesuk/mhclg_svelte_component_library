<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { chartWidth, row, rowMax, rowMin, rowHeight } = $props();
  let selectedBar = $state(null);

  let scaledValue = $derived((row.y / (rowMax - rowMin)) * chartWidth);
</script>

<g
  class="row-group"
  transform="translate ({(Math.abs(rowMin) / (rowMax - rowMin)) * chartWidth})"
>
  <Bar {scaledValue} {rowHeight} bind:selectedBar {row}></Bar>

  {#if rowHeight > 18 || selectedBar == row.areaCode}
    <RowValue
      {scaledValue}
      barColor={row.color}
      value={row.y}
      max={row.y == rowMax}
      min={row.y == rowMin}
      {rowHeight}
      selected={selectedBar == row.areaCode}
    ></RowValue>
  {/if}
</g>
{#if rowHeight > 20 || selectedBar == row.areaCode}
  <RowLabel label={row.areaName}></RowLabel>
{/if}
