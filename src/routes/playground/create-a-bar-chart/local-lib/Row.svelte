<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row } = $props();
</script>

<p>this is the row component</p>

<g class="row-group">
  <Bar></Bar>
  <RowValue></RowValue>
  <RowLabel></RowLabel>
</g>p
