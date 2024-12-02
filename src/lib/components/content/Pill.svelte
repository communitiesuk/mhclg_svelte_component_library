<script>
  import { Tooltip } from 'flowbite-svelte';

  let {
    textContent,
    size = 'medium',
    bgColor,
    textColor,
    borderRadius = '5px',
    tooltipText = false,
    padding = null,
    tailwindClass = '',
  } = $props();
</script>

<div
  class="pill-container {tailwindClass}"
  data-role="pill-container-{size}"
  style="color: {textColor}; background-color: {bgColor}; border-radius: {borderRadius}; padding: {padding ??
    null};"
>
  {textContent}
</div>
{#if tooltipText}
  <Tooltip placement="bottom" color="light">{tooltipText}</Tooltip>
{/if}

<style>
  .pill-container {
    display: inline;
  }
  [data-role='pill-container-extraSmall'] {
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    line-height: 0.9rem;
  }
  [data-role='pill-container-small'] {
    padding: 0.3rem 0.4rem;
    font-size: 1.1rem;
    line-height: 1.1rem;
  }

  [data-role='pill-container-medium'] {
    padding: 0.35rem 0.5rem;
    font-size: 1.35rem;
    line-height: 1.35rem;
  }

  [data-role='pill-container-large'] {
    padding: 0.6rem;
    font-size: 1.6rem;
    line-height: 1.6rem;
  }
</style>
