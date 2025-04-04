<script>
  import Pill from "$lib/package-wrapping/Pill.svelte";
  import {
    textStringConversion,
    pascalToKebabCase,
  } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { componentStatusProgressBackgroundColorLookup } from "$lib/config.js";

  let { homepage, statusObject, folder, subFolder, name, parentFolder } =
    $props();

  $inspect(name, folder, subFolder);
</script>

<div class="flex flex-row items-center gap-4 {homepage ? '' : 'mb-6'}">
  {#if homepage}
    <a
      class="link-to-other-page"
      href={`/${parentFolder}${(folder ? "/" + folder : "") + (subFolder ? "/" + subFolder : "")}/${pascalToKebabCase(name)}`}
    >
      <h6>{name}</h6>
    </a>
  {:else}
    <h2>{name}</h2>
  {/if}
  {#if statusObject?.progress}
    <Pill
      textContent={statusObject?.progress}
      bgColor={componentStatusProgressBackgroundColorLookup?.[
        statusObject?.progress
      ] ?? "black"}
      textColor="white"
      size={homepage ? "sm" : "md"}
    ></Pill>
  {/if}
</div>

{#if statusObject?.statusRows && statusObject?.statusRows.length > 0 && statusObject?.statusRows
    .map((el) => Object.keys(el.obj))
    .flat().length > 0}
  <div class="flex flex-col gap-2">
    {#each statusObject.statusRows as row}
      {#if !homepage || row.visibleOnHomepage}
        <div class="flex flex-row gap-2">
          {#each Object.keys(row.obj) as key}
            {@const checked = row.obj[key]}
            {@const color = checked ? "#006B00" : "#BD0000"}
            <div
              class="text-base rounded px-1 py-0.5 border-2 border-solid flex flex-row gap-1 items-center"
              style="border-color: {color}; color: {color}"
            >
              <svg width="18" height="18">
                <g transform="scale(0.75)">
                  <path
                    d={checked
                      ? "M4 11 l6 6 l12 -12"
                      : "M5 4.5 l15 15 M5 19.5 l15 -15"}
                    stroke={color}
                    fill="none"
                    stroke-width="5px"
                  ></path>
                </g>
              </svg>
              <span>{key}</span>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}
