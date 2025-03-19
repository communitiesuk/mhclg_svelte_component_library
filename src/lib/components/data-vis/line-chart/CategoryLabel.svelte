<script>
  let { chartWidth, lineFunction, dataArray, xFunction, yFunction, text } =
    $props();

  let path = $state(lineFunction(dataArray));

  function onClickLabel(i) {
    console.log(i);
  }
</script>

<g
  transform="translate({chartWidth},{0})"
  onclick={() => onClickLabel(dataArray.areaCode)}
>
  <text
    dominant-baseline="central"
    text-anchor="start"
    x={15}
    y={yFunction(dataArray.data[0].y)}>{dataArray.data[0].areaCode}</text
  >
</g>
