<script>
  import { text } from "@sveltejs/kit";

  let { marker, labelColor, labelTextColor, textContent } = $props();

  let textDimensions = $state();
  let lineSpacing = $state(20);
  let verticalPadding = $state(8);
  let horizontalPadding = $derived(verticalPadding * 2);
</script>

<svg width="300" height="300">
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
    text-anchor="start"
    font-size="16"
    fill={labelTextColor}
    bind:contentRect={textDimensions}
  >
    {#each textContent as line, i}
      <tspan x={horizontalPadding / 2} dy={lineSpacing}>{line}</tspan>
    {/each}
  </text>
</svg>
