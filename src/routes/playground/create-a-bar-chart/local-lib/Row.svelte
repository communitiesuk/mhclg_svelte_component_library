<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';
  // this information is passed in when the component is called

  // let { row } = $props();
  let {
    rowHeight,
    barWidth,
    rowLabel,
    rowValue,
    barColor,
    barStartPostion,
    rowValuePosition,
    textAnchor,
  } = $props();

  // $inspect('bar width is ' + barWidth, 'row position is ' + rowValuePosition);

  $inspect(textAnchor);
</script>

<g dominant-baseline="middle" class="row-group">
  <g transform="translate(-10,{rowHeight / 2})">
    <RowLabel {rowLabel}></RowLabel>
  </g>
  <g transform="translate({barStartPostion},{(rowHeight * 0.2) / 2})">
    <Bar {rowHeight} {barWidth} {barColor}></Bar>
  </g>
  <g transform="translate({rowValuePosition},{rowHeight / 2})">
    <RowValue {rowValue} {textAnchor}></RowValue>
  </g>
</g>

<style>
  .row-group {
    position: relative;
  }
</style>
