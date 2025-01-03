<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row } = $props();
  $inspect(row.y);
</script>

<g>
  <Bar {row}></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g>
