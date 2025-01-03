<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row } = $props();
  $inspect(row.y);
</script>

<g>
  <rect width={row.y} height={20} />
  <Bar></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g>
