<script>
  let { chartWidth, lineFunction, dataArray, xFunction, yFunction, text } =
    $props();

  $inspect(dataArray);
  let path = $state(lineFunction(dataArray));
</script>

<g transform="translate({chartWidth},{0})">
  <text
    dominant-baseline="central"
    text-anchor="start"
    x={15}
    y={yFunction(dataArray[0].y)}>{dataArray[0].areaCode}</text
  >
</g>
