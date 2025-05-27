<script>
  let {
    activeMarkerId,
    labelColor,
    labelTextColor,
    textContent,
    xFunction,
    yFunction,
    x,
    y,
  } = $props();

  let textDimensions = $state();
  let lineSpacing = $state(20);
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);

  $inspect(activeMarkerId);

  let widthWithPadding = $derived(
    textDimensions ? textDimensions.width + horizontalPadding : 10,
  );
  let heightWithPadding = $derived(
    textDimensions ? textDimensions.height + verticalPadding : 10,
  );
</script>

<svg>
  <g
    transform="translate({xFunction(activeMarkerId[x])},{yFunction(
      activeMarkerId[y],
    )})"
  >
    {#if !textDimensions}
      <foreignObject
        x="0"
        y="0"
        width="1000"
        height="1000"
        style="visibility: hidden"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          bind:contentRect={textDimensions}
          style="display: inline-block"
        >
          {@html textContent}
        </div>
      </foreignObject>
    {/if}
    {#if textDimensions}
      <rect
        height={textDimensions.height + verticalPadding}
        rx="5"
        ry="5"
        fill={labelColor}
        width={textDimensions.width + horizontalPadding}
      ></rect>
    {/if}
  </g>
  {#key textDimensions}
    <foreignObject
      x={xFunction(activeMarkerId[x])}
      y={yFunction(activeMarkerId[y])}
      width={widthWithPadding}
      height={heightWithPadding}
    >
      <div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block">
        {@html textContent}
      </div>
    </foreignObject>
  {/key}
</svg>
