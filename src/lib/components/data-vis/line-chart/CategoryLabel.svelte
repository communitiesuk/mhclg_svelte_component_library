<script>
  let {
    selectedLine = $bindable(),
    chartWidth,
    lineFunction,
    dataArray,
    xFunction,
    yFunction,
    text,
  } = $props();

  let path = $state(lineFunction(dataArray));

  let isClicked = $state();

  function onClickLabel(areaCode) {
    selectedLine = areaCode;
    isClicked = areaCode;
  }

  function onMouseEnter(areaCode) {
    selectedLine = areaCode;
  }

  function onMouseLeave(areaCode) {
    isClicked !== areaCode ? (selectedLine = null) : (selectedLine = areaCode);
  }
</script>

<g
  transform="translate({chartWidth},{0})"
  onclick={() => onClickLabel(dataArray.areaCode)}
  onmouseenter={() => onMouseEnter(dataArray.areaCode)}
  onmouseleave={() => onMouseLeave(dataArray.areaCode)}
>
  <text
    dominant-baseline="central"
    text-anchor="start"
    x={15}
    y={yFunction(dataArray.data[0].y)}>{dataArray.data[0].areaCode}</text
  >
</g>
