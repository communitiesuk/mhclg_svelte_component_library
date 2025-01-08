<script>
  import Bar from './rowComponents/Bar.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let { rowHeight, rowWidth } = $props();

  $inspect(rowWidth);
</script>

<g class="row-group">
  <Bar {rowHeight} {rowWidth}></Bar>
  <!-- <RowValue></RowValue> -->
  <!-- <RowLabel></RowLabel> -->
</g>
