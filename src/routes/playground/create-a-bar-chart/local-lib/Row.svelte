<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let { rowHeight, rowWidth, rowLabel, rowValue } = $props();

  $inspect(rowWidth);
</script>

<g class="row-group">
  <g transform="translate(0,30)">
    <RowLabel {rowLabel}></RowLabel>
  </g>
  <g transform="translate(100,0)">
    <Bar {rowHeight} {rowWidth}></Bar>
  </g>
  <g transform="translate({rowWidth + 110},30)">
    <RowValue {rowValue}></RowValue>
  </g>
</g>
