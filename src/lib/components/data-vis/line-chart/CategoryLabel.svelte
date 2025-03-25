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
    newY,
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
  <path d="M0,${newY} L10,${newY}" stroke="black" stroke-width="1"></path>
  <text {id} dominant-baseline="central" text-anchor="start" x={15} y={newY}>
    {dataArray.data[0].areaCode}</text
  >
</g>
