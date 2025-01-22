<script>
  // the y values in dataArray must be passed down from a parent component
  let { rowValue } = $props();

  let textAnchor;
  if (rowValue > 0) {
    textAnchor = 'end';
  } else {
    textAnchor = 'start';
  }
</script>

<g>
  <text text-anchor={textAnchor}>{rowValue}</text>
</g>

<style>
  text {
    /* text-anchor: end; */
  }
</style>
