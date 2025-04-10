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
        <div
          data-role="component-information-detail-grid-container"
          id={detail.label.toLowerCase()}
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
      <div data-role="component-information-detail-grid-container">
        <dt>{connectedComponents.label}:</dt>
        <dd>
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
