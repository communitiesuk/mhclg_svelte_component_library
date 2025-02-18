<script>
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { homepage, detailsArray, childComponents } = $props();
</script>

{#if detailsArray && detailsArray.filter((el) => !homepage || el.visibleOnHomepage).length > 0}
  <DividerLine></DividerLine>
  <div data-role="component-information-array-container">
    {#each detailsArray as detail}
      {#if detail.arr && detail.arr.length > 0 && (!homepage || detail.visibleOnHomepage)}
        <div data-role="component-information-detail-grid-container">
          {#if detail.label}
            <dt>{detail.label}:</dt>
          {/if}
          <dd>
            {#each detail.arr as paragraph}
              {#if paragraph.markdown}
                <p>{@html paragraph.content}</p>
              {:else}
                <p>{paragraph.content}</p>
              {/if}
            {/each}
          </dd>
        </div>
      {/if}
    {/each}
  </div>
{/if}
{#if childComponents && (!homepage || childComponents?.visibleOnHomepage) && childComponents.arr.length > 0}
  <DividerLine></DividerLine>
  <div data-role="component-information-detail-grid-container">
    <dt>Child components:</dt>
    <dd>
      <ul class="flex flex-row flex-wrap gap-4 gap-y-2">
        {#each childComponents.arr as child}
          <li>
            <a
              class="link-to-other-page"
              href="/components/{child.folder}/{textStringConversion(
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
