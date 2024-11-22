<script>
  let { dataArray, pathFunction, x, y, color, strokeWidth, markers } = $props();

  $inspect(dataArray);
</script>

<path
  d={pathFunction(dataArray)}
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
></path>

{#if markers}
  {#each dataArray as marker}
    <circle cx={x(marker.x)} cy={y(marker.y)} r="6" stroke="white" fill={color}>
    </circle>
  {/each}
{/if}
