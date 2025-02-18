<script>
  import Pill from "$lib/components/content/Pill.svelte";

  let { statusObject } = $props();
</script>

<div data-role="status-container" class="flex flex-row flex-wrap gap-2">
  {#each Object.keys(statusObject) as category, index}
    {@const labels = Object.keys(statusObject[category]).filter(
      (el) => statusObject[category][el],
    )}
    <div data-role="category-container" class="flex flex-row gap-2">
      {#each labels as label}
        <Pill textContent={label} bgColor="black" textColor="white" size="small"
        ></Pill>
      {/each}
    </div>
  {/each}
</div>
