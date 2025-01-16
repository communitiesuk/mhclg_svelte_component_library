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
  transform="translate ({((0 - rowMin) / (rowMax - rowMin)) * chartWidth})"
>
  <Bar {scaledValue} {rowHeight} bind:selectedBar {row}></Bar>

  {#if rowHeight > 18 || selectedBar == row.areaCode}
    <RowValue {scaledValue} value={row.y} {rowHeight}></RowValue>
  {/if}
</g>
{#if rowHeight > 20 || selectedBar == row.areaCode}
  <RowLabel label={row.areaName}></RowLabel>
{/if}
