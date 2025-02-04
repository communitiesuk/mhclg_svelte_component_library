<script>
  let { marker } = $props();

  let textDimensions = $state();
  $inspect(textDimensions);
  let textPadding = $state(15);
</script>

<svg width="300" height="50">
  {#if textDimensions}
    <rect
      x="10"
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
    x={textPadding}
    y="30"
    font-size="16"
    fill="white"
  >
    {marker.y}
  </text>
</svg>
