<script>
  import { Tooltip } from 'flowbite-svelte';

  let {
    textContent,
    size = 'medium',
    bgColor,
    textColor,
    borderRadius = '5px',
    tooltipText,
  } = $props();

  let padding = { small: 2, medium: 5, large: 10 }[size];
</script>

<div
  data-role="pill-container-{size}"
  style="color: {textColor}; background-color: {bgColor}; border-radius: {borderRadius}"
>
  {textContent}
</div>
{#if tooltipText}
  <Tooltip placement="bottom" color="light">{tooltipText}</Tooltip>
{/if}

<style>
  [data-role='pill-container-small'] {
    padding: 0.2rem 0.4rem;
    font-size: 1.1rem;
  }

  [data-role='pill-container-medium'] {
    padding: 0.35rem 0.5rem;
    font-size: 1.35rem;
  }

  [data-role='pill-container-large'] {
    padding: 0.6rem;
    font-size: 1.6rem;
  }
</style>
