<script>
  import RowChart from './RowChart.svelte';
  import Table from './Table.svelte';
  let { dataArray, chart, selectedYear } = $props();
</script>

{#if chart}
  <RowChart {dataArray} />
{:else}
  <Table {dataArray} {selectedYear} />
{/if}
