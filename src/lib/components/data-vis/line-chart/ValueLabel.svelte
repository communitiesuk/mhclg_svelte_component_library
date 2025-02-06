<script>
  let { marker } = $props();

  let textDimensions = $state();
  $inspect(textDimensions);
  let textPadding = $state(15);
</script>

<svg width="300" height="50">
  {#if textDimensions}
    <rect
      x="0"
      y="10"
      height="30"
      rx="5"
      ry="5"
      fill="dimgrey"
      width={textDimensions.width + textPadding}
    />
  {/if}
  <text
    bind:contentRect={textDimensions}
    text-anchor="start"
    x={textPadding / 2}
    y="30"
    font-size="16"
    fill="black"
  >
    {marker.y}
  </text>
</svg>
