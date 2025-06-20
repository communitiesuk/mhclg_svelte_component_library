<script>
  let {
    id,
    clickedSeries,
    hoveredSeries,
    chartWidth,
    lineFunction,
    dataArray,
    xFunction,
    yFunction,
    newY,
    onClickSeries,
    onMouseEnterSeries,
    onMouseLeaveSeries,
    labelText,
    series,
    y,
    tier,
    interactiveLines,
  } = $props();

  let oldY = $derived(yFunction(dataArray.data[0][y]));

  let opacity = $derived(
    (!hoveredSeries && !clickedSeries) ||
      [hoveredSeries, clickedSeries].includes(dataArray[series])
      ? 1
      : 0.3,
  );
</script>

<g
  {id}
  transform="translate({chartWidth + 8},{0})"
  onclick={interactiveLines
    ? () => onClickSeries(dataArray[series], tier)
    : undefined}
  onmouseenter={interactiveLines
    ? () => onMouseEnterSeries(dataArray[series], tier)
    : undefined}
  onmouseleave={interactiveLines
    ? () => onMouseLeaveSeries(dataArray[series], tier)
    : undefined}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && onClickSeries(dataArray[series])}
  pointer-events={interactiveLines ? null : "none"}
  {opacity}
>
  <path
    d="M 0, {oldY}  H 10  V {newY}  H 20"
    fill="none"
    stroke="black"
    stroke-width="1"
  ></path>
  <text
    {id}
    dominant-baseline="central"
    text-anchor="start"
    x={20}
    y={newY}
    stroke-width={clickedSeries ? 0.7 : 0}
    stroke="black"
  >
    {labelText(dataArray)}
  </text>
</g>
