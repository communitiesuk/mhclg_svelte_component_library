<script>
  // @ts-nocheck
  import DividerLine from '$lib/components/layout/DividerLine.svelte';
  import Pill from '$lib/components/layout/Pill.svelte';

  import { componentStausLookup } from '$lib/config.js';
  import { fromSnakeCase } from '$lib/utils/text-string-conversion/fromSnakeCase.js';
  import { toUrlSlug } from '$lib/utils/text-string-conversion/toUrlSlug.js';

  let { homepage, details } = $props();

  $inspect(details);
</script>

{#snippet linkedNameOfComponent(folder, name, isLinkToChildComponent = true)}
  <a
    class="underline underline-offset-4"
    href="/components/{folder}/{toUrlSlug(name)}"
  >
    {#if isLinkToChildComponent}
      <p class="m-0">{name}</p>
    {:else}
      <h4>{name}</h4>
    {/if}
  </a>
{/snippet}

<div
  data-role="details-container"
  class="{homepage ? '' : 'g-top-level-container'} flex flex-col gap-6 {homepage
    ? 'bg-slate-100 p-5 rounded-lg'
    : ''}"
>
  <div
    data-role="name-and-pill-container"
    class="flex flex-row items-center gap-4"
  >
    {#if homepage}
      {@render linkedNameOfComponent(details.folder, details.name, false)}
    {:else}
      <h2>{details.name}</h2>
    {/if}
    <Pill
      size={homepage ? 'small' : 'medium'}
      textContent={fromSnakeCase(details.status)}
      bgColor={componentStausLookup[details.status].bgColor}
      textColor={componentStausLookup[details.status].color}
    ></Pill>
  </div>

  <DividerLine margin="0.2rem 0rem"></DividerLine>

  <dl data-role="details-grid-container" class="grid gap-y-4">
    {#each ['description', 'context'] as detail}
      {@const detailData = details[detail]}
      {#if detailData?.length > 0}
        <dt>{fromSnakeCase(detail)}:</dt>
        <dd>
          {#each detailData as paragraph}
            {#if paragraph.markdown}
              <p>{@html paragraph.content}</p>
            {:else}
              <p>{paragraph.content}</p>
            {/if}
          {/each}
        </dd>
      {/if}
    {/each}

    {#if details.childComponents?.length > 0}
      <div class="col-span-2">
        <DividerLine margin="0.6rem 0rem"></DividerLine>
      </div>
      <dt>Child components:</dt>
      <dd class="flex flex-row flex-wrap gap-4">
        {#each details.childComponents as childComponent}
          {@render linkedNameOfComponent(
            childComponent.folder,
            childComponent.name
          )}
        {/each}
      </dd>
    {/if}

    {#if !homepage}
      {#if details.requirements?.length > 0}
        <div class="col-span-2">
          <DividerLine margin="0.6rem 0rem"></DividerLine>
        </div>
        <dt>Requirements:</dt>
        <ul class="flex flex-col gap-4">
          {#each details.requirements as requirement, i}
            <li
              class="flex flex-col gap-4 {requirement.fulfilled
                ? 'text-green-700 line-through'
                : ''}"
            >
              <dt class="font-bold">{requirement.label}</dt>
              <dd>{requirement.description}</dd>
              {#if i != details.requirements.length - 1}
                <DividerLine margin="0.2rem 0rem"></DividerLine>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
      <div class="col-span-2">
        <DividerLine margin="0.6rem 0rem"></DividerLine>
      </div>
    {/if}
  </dl>
</div>

<style>
  [data-role='details-grid-container'] {
    grid-template-columns: 150px auto;
  }
  dd p:first-of-type {
    margin-top: 0;
  }
  dd p:last-of-type {
    margin-bottom: 0;
  }
</style>
