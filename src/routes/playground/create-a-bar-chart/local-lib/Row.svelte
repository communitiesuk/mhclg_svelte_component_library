<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { chartWidth, row, areasLookup, rowMax, rowHeight, colouredBars } =
    $props();
  let selectedBar = $state(null);

  let scaledValue = $derived((row.y / rowMax) * chartWidth);
</script>

<g class="row-group">
  <Bar
    {scaledValue}
    {rowHeight}
    rowLabel={row.areaCode}
    bind:selectedBar
    {colouredBars}
  ></Bar>
  {#if rowHeight > 20 || selectedBar == row.areaCode}
    <RowLabel label={areasLookup[0][row.areaCode]}></RowLabel>
    {#if rowHeight > 18 || selectedBar == row.areaCode}
      <RowValue
        {scaledValue}
        value={row.y}
        {selectedBar}
        rowLabel={row.areaCode}
        {rowHeight}
      ></RowValue>
    {/if}
  {/if}
</g>
