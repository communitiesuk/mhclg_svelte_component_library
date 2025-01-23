<script>
  import Bar from "./rowComponents/Bar.svelte";
  import RowLabel from "./rowComponents/RowLabel.svelte";
  import RowValue from "./rowComponents/RowValue.svelte";

  let { row, yFunction, rowHeight, chartWidth } = $props();
</script>

<g class="row-group">
  <Bar {row} {yFunction} {rowHeight}></Bar>
  <RowValue {row} {yFunction} {chartWidth}></RowValue>
  <RowLabel {row}></RowLabel>
</g>
