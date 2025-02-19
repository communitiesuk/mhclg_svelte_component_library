<script>
  import Pill from "$lib/components/content/Pill.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { homepage, statusObject, folder, name, parentFolder } = $props();
</script>

<div class="flex flex-row items-center gap-4">
  {#if homepage}
    <a
      class="link-to-other-page"
      href={`/${parentFolder}${folder ? "/" + folder : ""}/${textStringConversion(name, "kebab")}`}
    >
      <h6>{name}</h6>
    </a>
  {:else}
    <h2>{name}</h2>
  {/if}
  {#if statusObject?.progress}
    <Pill
      textContent={statusObject?.progress}
      bgColor="black"
      textColor="white"
      size="small"
    ></Pill>
  {/if}
</div>

<div class="flex flex-row gap-4">
  {#each Object.keys(statusObject.features) as feature}
    {@const checked = statusObject.features[feature]}
    {@const color = checked ? "#006B00" : "#BD0000"}
    <div
      class="rounded px-2 py-1 border-2 border-solid flex flex-row gap-2 items-center"
      style="border-color: {color}; color: {color}"
    >
      <svg width="24" height="24">
        <path
          d={checked ? "M4 11 l6 6 l12 -12" : "M5 4.5 l15 15 M5 19.5 l15 -15"}
          stroke={color}
          fill="none"
          stroke-width="6px"
        ></path>
      </svg>
      <span>{feature}</span>
    </div>
  {/each}
</div>
