<script>
  let { chartWidth, lineFunction, dataArray, xFunction, yFunction, text } =
    $props();

  let path = $state(lineFunction(dataArray));
  $inspect({ chartWidth });
</script>

<g transform="translate({chartWidth},{0})">
  <text
    dominant-baseline="central"
    text-anchor="end"
    x={40}
    y={yFunction(dataArray[0].y)}>{dataArray[0].areaCode}</text
  >
</g>
