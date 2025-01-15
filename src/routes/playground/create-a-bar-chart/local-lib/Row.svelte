<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row, rowHeight, rowWidth } = $props();
  $inspect(row);
  let y = row.y;
  //$inspect(rowHeight);
</script>

<g class="row-group">
  <Bar {rowHeight} {rowWidth}></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g>
