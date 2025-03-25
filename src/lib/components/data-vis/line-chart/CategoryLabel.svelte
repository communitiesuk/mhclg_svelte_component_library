<script>
  let {
    id,
    labelClicked = $bindable(),
    labelHovered = $bindable(),
    chartWidth,
    lineFunction,
    dataArray,
    xFunction,
    yFunction,
    text,
  } = $props();

  // should this be done with css class:active onmouseenter instead?
  function onClickLabel(areaCode) {
    labelClicked === areaCode
      ? ((labelClicked = null), (labelHovered = null))
      : (labelClicked = areaCode);
  }

  function onMouseEnter(areaCode) {
    labelHovered = areaCode;
  }

  function onMouseLeave(areaCode) {
    labelClicked === areaCode
      ? (labelHovered = null)
      : (labelHovered = areaCode);
    labelHovered === areaCode ? (labelHovered = null) : (labelHovered = null);
  }
</script>

<g
  {id}
  transform="translate({chartWidth},{0})"
  onclick={() => onClickLabel(dataArray.areaCode)}
  onmouseenter={() => onMouseEnter(dataArray.areaCode)}
  onmouseleave={() => onMouseLeave(dataArray.areaCode)}
>
  <text
    {id}
    dominant-baseline="central"
    text-anchor="start"
    x={15}
    y={yFunction(dataArray.data[0].y)}>{dataArray.data[0].areaCode}</text
  >
</g>
