<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row, xFunction } = $props();
</script>

<g>
  <Bar {row} {xFunction}></Bar>
  <RowValue {row} {xFunction}></RowValue>
  <RowLabel {row}></RowLabel>
</g>
