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
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = $props();

  let areaCode = $state(dataArray.areaCode);

  let oldY = $state(yFunction(dataArray.data[0].y));

  let opacity=$derived((labelHovered || labelClicked) &&
    ![labelHovered, labelClicked].includes(areaCode)
      ? 0.3
      : 1)
</script>

<g
  {id}
  transform="translate({chartWidth + 8},{0})"
  onclick={() => onClick(dataArray.areaCode)}
  onmouseenter={() => onMouseEnter(dataArray.areaCode)}
  onmouseleave={() => onMouseLeave(dataArray.areaCode)}
>
  <path
    d="M 0, {oldY}  H 10  V {newY}  H 20"
    fill="none"
    stroke="black"
    stroke-width="1"
    {opacity}
  ></path>
  <text
    {id}
    {opacity}
    dominant-baseline="central"
    text-anchor="start"
    x={20}
    y={newY}
  >
    {areaCode}
  </text>
</g>
