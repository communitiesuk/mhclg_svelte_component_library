<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { homepage, detailsArray, connectedComponentsArray } = $props();
</script>

{#if detailsArray && detailsArray.filter((el) => !homepage || el.visibleOnHomepage).length > 0}
  <DividerLine></DividerLine>
  <div data-role="component-information-array-container">
    {#each detailsArray as detail}
      {#if detail.arr && detail.arr.length > 0 && (!homepage || detail.visibleOnHomepage)}
        <!-- CSS Grid with auto-sizing first column and constrained second column that forces wrapping -->
        <div
          data-role="component-information-detail-grid-container"
          id={detail.label.toLowerCase()}
          class="grid grid-cols-[auto,minmax(0,1fr)] gap-2 items-baseline"
        >
          {#if detail.label}
            <dt>{detail.label}:</dt>
          {/if}
          <dd>
            {#each detail.arr as paragraph}
              {#if detail.markdown}
                <p>{@html paragraph}</p>
              {:else}
                <p>{paragraph}</p>
              {/if}
            {/each}
          </dd>
        </div>
      {/if}
    {/each}
  </div>
{/if}

{#if connectedComponentsArray}
  {#each connectedComponentsArray as connectedComponents}
    {#if (!homepage || connectedComponents?.visibleOnHomepage) && connectedComponents.arr.length > 0}
      <DividerLine></DividerLine>
      <!-- CSS Grid layout for label:content pairs with constrained second column -->
      <div
        data-role="component-information-detail-grid-container"
        class="grid grid-cols-[auto,minmax(0,1fr)] gap-2 items-baseline"
      >
        <dt>{connectedComponents.label}:</dt>
        <dd>
          <!-- flex-wrap allows items to wrap to new lines -->
          <ul class="flex flex-row flex-wrap gap-4 gap-y-2">
            {#each connectedComponents.arr as child}
              <li>
                <a
                  class="link-to-other-page"
                  href="/components-update/{child.folder}/{textStringConversion(
                    child.name,
                    'kebab',
                  )}"
                >
                  {child.name}
                </a>
              </li>
            {/each}
          </ul>
        </dd>
      </div>
    {/if}
  {/each}
{/if}

<style>
  /* Constrain all grid containers and their content to prevent overflow */
  [data-role="component-information-detail-grid-container"] {
    max-width: 100%;
  }

  /* Allow all content within grids to shrink and wrap properly */
  [data-role="component-information-detail-grid-container"] dd,
  [data-role="component-information-detail-grid-container"] li {
    min-width: 0;
    overflow-wrap: break-word;
  }
</style>
