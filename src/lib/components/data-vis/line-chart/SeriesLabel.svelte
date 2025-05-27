<script>
  let {
    id,
    labelClicked,
    labelHovered,
    chartWidth,
    lineFunction,
    dataArray,
    xFunction,
    yFunction,
    newY,
    onClickLabel,
    onMouseEnterLabel,
    onMouseLeaveLabel,
    labelText,
    series,
    y,
  } = $props();

  let oldY = $derived(yFunction(dataArray.data[0][y]));

  let opacity = $derived(
    (labelHovered || labelClicked) &&
      ![labelHovered, labelClicked].includes(dataArray[series])
      ? 0.3
      : 1,
  );
</script>

<g
  {id}
  transform="translate({chartWidth + 8},{0})"
  onclick={() => onClickLabel(dataArray[series])}
  onmouseenter={() => onMouseEnterLabel(dataArray[series])}
  onmouseleave={() => onMouseLeaveLabel(dataArray[series])}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClickLabel(dataArray[series])}
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
    stroke-width={labelClicked ? 0.7 : 0}
    stroke="black"
  >
    {labelText(dataArray)}
  </text>
</g>
