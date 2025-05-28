<script lang="ts">
  import Pill from "$lib/package-wrapping/Pill.svelte";
  import {
    pascalToKebabCase,
    forceWrapAtThirdCapital,
  } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { componentStatusProgressBackgroundColorLookup } from "$lib/config.js";

  let { homepage, statusObject, folder, subFolder, name, parentFolder } =
    $props();
</script>

<!-- Main container: horizontal layout with wrapping for component name and status pill -->
<div
  class="flex flex-row flex-wrap items-center gap-4 min-w-0 {homepage
    ? ''
    : 'mb-6'}"
>
  {#if homepage}
    <!-- Homepage: component name as clickable link -->
    <a
      class="link-to-other-page"
      href={`/${parentFolder}${(folder ? "/" + folder : "") + (subFolder ? "/" + subFolder : "")}/${pascalToKebabCase(name)}`}
    >
      <h6>{@html forceWrapAtThirdCapital(name)}</h6>
    </a>
  {:else}
    <!-- Detail page: component name as heading -->
    <h2>{@html forceWrapAtThirdCapital(name)}</h2>
  {/if}
  {#if statusObject?.progress}
    <!-- Status pill showing progress state -->
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

<!-- Status indicators section: checkmarks and X marks for different criteria -->
{#if statusObject?.statusRows && statusObject?.statusRows.length > 0 && statusObject?.statusRows
    .map((el) => Object.keys(el.obj))
    .flat().length > 0}
  <!-- Vertical stack of status rows -->
  <div class="flex flex-col gap-2">
    {#each statusObject.statusRows as row}
      {#if !homepage || row.visibleOnHomepage}
        <!-- Horizontal row of status indicators that wraps on small screens -->
        <div class="flex flex-wrap gap-2">
          {#each Object.keys(row.obj) as key}
            {@const checked = row.obj[key]}
            {@const color = checked ? "#006B00" : "#BD0000"}
            <!-- Individual status indicator with icon and text -->
            <div
              class="text-base rounded px-1 py-0.5 border-2 border-solid flex flex-row gap-2 items-start"
              style="border-color: {color}; color: {color}"
            >
              <!-- Icon container: prevents icon from shrinking -->
              <div class="flex-shrink-0">
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
              </div>
              <!-- Status text with tight line height -->
              <span class="leading-tight">{key}</span>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style>
  /* Unified text wrapping strategy for component names and links */
  .link-to-other-page,
  .link-to-other-page h6,
  h2 {
    min-width: 0; /* Allow shrinking below content width */
    white-space: normal; /* Enable text wrapping */
    overflow-wrap: break-word; /* Break long words when needed */
    max-width: 100%; /* Prevent container overflow */
  }

  /* Additional properties specific to clickable links */
  .link-to-other-page {
    flex-shrink: 1; /* Allow shrinking in flex containers */
    display: inline-block; /* Proper wrapping behavior for links */
  }

  /* Ensure nested heading inherits block display */
  .link-to-other-page h6 {
    display: block;
  }
</style>
