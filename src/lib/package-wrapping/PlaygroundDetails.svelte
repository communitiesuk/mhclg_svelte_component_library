<script>
  // @ts-nocheck
  import DividerLine from '$lib/components/layout/DividerLine.svelte';

  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';

  let { homepage, details } = $props();
</script>

{#snippet pageDescription()}
  <dd>
    {#each details.description as paragraph}
      {#if paragraph.markdown}
        <p>{@html paragraph.content}</p>
      {:else}
        <p>{paragraph.content}</p>
      {/if}
    {/each}
  </dd>
{/snippet}

{#snippet linkedNameOfPlaygroundPage(folder, name)}{/snippet}

<div
  data-role="details-container"
  class="{homepage ? '' : 'g-top-level-container'} flex flex-col gap-6 {homepage
    ? 'bg-teal-500 bg-opacity-10 p-5 rounded-lg'
    : ''}"
>
  <div
    data-role="name-and-desc-container"
    class="flex flex-row items-start gap-4"
  >
    {#if homepage}
      <a
        class="underline underline-offset-4"
        style={homepage ? 'width: 450px' : ''}
        href="/playground/{textStringConversion(details.name, 'kebab')}"
      >
        <h8>{details.name}</h8>
      </a>
      <div>
        {@render pageDescription()}
      </div>
    {:else}
      <h4>{details.name}</h4>
    {/if}
  </div>

  {#if !homepage}
    <DividerLine margin="0.2rem 0rem"></DividerLine>

    <dl data-role="details-grid-container" class="grid gap-y-4">
      {#if details.description?.length > 0}
        {#if !homepage}
          <dt>Description:</dt>
          {@render pageDescription()}
        {/if}
      {/if}
    </dl>

    {#if !homepage && details.steps?.length > 0}
      <DividerLine margin="0.2rem 0rem"></DividerLine>

      <div class="flex flex-col gap-2 m-0">
        <h7 class="font-bold">Steps:</h7>
        <ul class="grid gap-y-2">
          {#each details.steps as step, i}
            <li class={step.complete ? 'text-green-700' : ''}>
              <span>{i + 1}.</span>
              {#if step.markdown}
                <span class={step.complete ? 'line-through' : ''}
                  >{@html step.label}</span
                >
              {:else}
                <span class={step.complete ? 'line-through' : ''}
                  >{step.label}</span
                >
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}
</div>

<style>
  [data-role='details-grid-container'] {
    grid-template-columns: 180px auto;
  }
  dd p:first-of-type {
    margin-top: 0;
  }
  dd p:last-of-type {
    margin-bottom: 0;
  }

  ul {
    grid-template-columns: 40px auto;
  }

  li {
    display: contents;
  }
</style>
