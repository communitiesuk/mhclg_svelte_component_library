<script>
  import { page } from '$app/stores';
  import PlaygroundDetails from '$lib/package-wrapping/PlaygroundDetails.svelte';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { Input, Radio } from 'flowbite-svelte';
  import { details } from './details.js';
  import RowChart from './local-lib/RowChart.svelte';

  let { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split('/');

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    'title-first-word'
  );

  let selectedYear = $state(data?.years[0]);
  let numberOfBars = $state(10);
</script>

<PlaygroundDetails {homepage} {details}></PlaygroundDetails>
{#if !homepage}
  <div class="chart-container">
    <div class="mt-20">
      <div
        class="top-level-container border-solid rounded-lg border-2 border-current p-2"
      >
        <div class="radio-container">
          <p class="my-2 mx-0 p-0 text-sm">Selected year:</p>
          <div class="flex flex-row flex-wrap gap-2">
            {#each data.years as option, i}
              <Radio value={option} bind:group={selectedYear}>
                <span class="text-base font-normal">
                  {option}
                </span>
              </Radio>
            {/each}
          </div>
        </div>
        <div class="mt-5">
          <p class="my-2 mx-0 p-0 text-sm">Number of bars:</p>
          <Input let:props>
            <input
              type="number"
              {...props}
              step={1}
              min={2}
              max={100}
              bind:value={numberOfBars}
            />
          </Input>
        </div>
        <div class="row-chart-container">
          <RowChart
            dataArray={data?.dataInFormatForBarChart
              .find((el) => el.x === selectedYear)
              .bars.slice(0, numberOfBars)}
          ></RowChart>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .chart-container {
    margin: 0px auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>
