<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let { rowHeight, rowWidth, rowLabel } = $props();

  $inspect(rowWidth);
</script>

<g class="row-group">
  <g transform="translate(0,0)">
    <RowLabel {rowLabel}></RowLabel>
  </g>
  <g transform="translate(50,0)">
    <Bar {rowHeight} {rowWidth}></Bar>
  </g>

  <!-- <RowValue></RowValue> -->
</g>
