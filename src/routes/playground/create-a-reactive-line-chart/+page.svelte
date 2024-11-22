<script>
  import { page } from '$app/stores';
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
