<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { chartWidth, row, rowMax, rowHeight } = $props();
  let selectedBar = $state(null);

  let scaledValue = $derived((row.y / rowMax) * chartWidth);
</script>

<g class="row-group">
  <Bar {scaledValue} {rowHeight} rowLabel={row.areaCode} bind:selectedBar></Bar>
  {#if rowHeight > 20 || selectedBar == row.areaCode}
    <RowLabel label={row.areaCode}></RowLabel>
    {#if rowHeight > 18}
      <RowValue
        {scaledValue}
        value={row.y}
        {selectedBar}
        rowLabel={row.areaCode}
      ></RowValue>
    {/if}
  {/if}
</g>
