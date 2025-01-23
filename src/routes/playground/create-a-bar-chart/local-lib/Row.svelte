<script>
  import Bar from './rowComponents/Bar.svelte';
  import RowLabel from './rowComponents/RowLabel.svelte';
  import RowValue from './rowComponents/RowValue.svelte';

  let { row, xFunction, barHeight, focusColour } = $props();
</script>

<g>
  <Bar {row} {xFunction} {barHeight} {focusColour}></Bar>
  <RowValue {row} {xFunction} {barHeight}></RowValue>
  <RowLabel {row} {barHeight}></RowLabel>
</g>
