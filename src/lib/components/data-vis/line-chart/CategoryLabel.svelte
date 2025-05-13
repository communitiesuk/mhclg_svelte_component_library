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
    onClickLabel,
    onMouseEnterLabel,
    onMouseLeaveLabel,
  } = $props();

  let areaCode = $derived(dataArray.areaCode);

  let oldY = $derived(yFunction(dataArray.data[0].y));

  let opacity = $derived(
    (labelHovered || labelClicked) &&
      ![labelHovered, labelClicked].includes(areaCode)
      ? 0.3
      : 1,
  );
</script>

<g
  {id}
  transform="translate({chartWidth + 8},{0})"
  onclick={() => onClickLabel(dataArray.areaCode)}
  onmouseenter={() => onMouseEnterLabel(dataArray.areaCode)}
  onmouseleave={() => onMouseLeaveLabel(dataArray.areaCode)}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClick(dataArray.areaCode)}
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
