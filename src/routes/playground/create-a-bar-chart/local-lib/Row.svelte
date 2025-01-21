<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let { rowHeight, rowWidth, rowLabel, rowValue, barColor, barStart } =
    $props();
</script>

<g dominant-baseline="middle" class="row-group">
  <g transform="translate(-10,{rowHeight / 2})">
    <RowLabel {rowLabel}></RowLabel>
  </g>
  <g transform="translate({barStart},{(rowHeight * 0.2) / 2})">
    <Bar {rowHeight} {rowWidth} {barColor}></Bar>
  </g>
  <g transform="translate({rowWidth + 10},{rowHeight / 2})">
    <RowValue {rowValue}></RowValue>
  </g>
</g>

<style>
  .row-group {
    position: relative;
  }
</style>
