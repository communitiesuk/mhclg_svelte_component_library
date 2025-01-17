<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let { rowHeight, rowWidth, rowLabel, rowValue, barColor } = $props();
</script>

<g class="row-group">
  <g transform="translate(-10,0)">
    <RowLabel {rowLabel}></RowLabel>
  </g>
  <g transform="translate(0,0)">
    <Bar {rowHeight} {rowWidth} {barColor}></Bar>
  </g>
  <g transform="translate({rowWidth + 10},30)">
    <RowValue {rowValue}></RowValue>
  </g>
</g>

<style>
  .row-group {
    position: relative;
  }
</style>
