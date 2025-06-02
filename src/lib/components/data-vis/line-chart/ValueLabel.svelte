<script>
  let {
    activeMarkerId,
    labelColor,
    labelTextColor,
    tooltipContent,
    xFunction,
    yFunction,
    x,
    y,
  } = $props();

  let textDimensions = $state();
  let lineSpacing = $state(20);
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);
</script>

<svg>
  <g
    transform="translate({xFunction(activeMarkerId[x])},{yFunction(
      activeMarkerId[y],
    )})"
  >
    {#if textDimensions}
      <rect
        height={textDimensions.height + verticalPadding}
        rx="5"
        ry="5"
        fill={labelColor}
        width={textDimensions.width + horizontalPadding}
      ></rect>
    {/if}
    <text
      x={horizontalPadding / 2}
      y={(textDimensions?.height + verticalPadding) / 2}
      dominant-baseline="middle"
      font-size="16"
      fill={labelTextColor}
      bind:contentRect={textDimensions}
    >
      {tooltipContent}
    </text>
  </g>
</svg>
