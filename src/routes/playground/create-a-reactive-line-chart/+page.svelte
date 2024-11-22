<script>
  import { page } from '$app/stores';
  import DividerLine from '$lib/components/layout/DividerLine.svelte';
  import PlaygroundDetails from '$lib/package-wrapping/PlaygroundDetails.svelte';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { details } from './details.js';

  let { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split('/');

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    'title-first-word'
  );

  let taskList = [
    { description: 'Manipulate data', complete: true },
    { description: 'Create radio button components', complete: true },
    {
      description:
        'Add on-click functionalilty to radio buttons, that reactively filters for the data we want to visualise',
      complete: true,
    },
    {
      description: 'Create scale and line functions for our line chart',
      complete: false,
    },
    {
      description: 'Plot lines, with labels and basic hover functionality',
      complete: false,
    },
    {
      description: 'Create x and y axes',
      complete: false,
    },
  ];

  $inspect(data);
</script>

{#snippet pageDescription()}
  <p class="m-0">
    This page was created as a sandbox environment for developers starting to
    gain experience manipulating data in JS, writing efficient and clear code in
    Svelte and creating components.
  </p>

  <p class="m-0">
    Since this was one of the first test projects we worked on, before we were
    building rigorously tested components, some of the code may not follow best
    practice guidelines.
  </p>

  {#if !homepage}
    <DividerLine margin="0.2rem 0rem"></DividerLine>

    <figure class="mt-4">
      <figcaption>Steps:</figcaption>
      <ul class="grid gap-y-2">
        {#each taskList as task, i}
          <li class={task.complete ? 'text-green-700' : ''}>
            <span>{i + 1}.</span>
            <span class={task.complete ? 'line-through' : ''}
              >{task.description}</span
            >
          </li>
        {/each}
      </ul>
    </figure>
  {/if}
{/snippet}

<PlaygroundDetails {homepage} {details}></PlaygroundDetails>
{#if !homepage}
  <div class="chart-container"></div>
{/if}

<style>
  .chart-container {
    margin: 0px auto;
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>
