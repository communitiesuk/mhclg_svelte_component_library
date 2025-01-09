<script>
  import { page } from '$app/stores';
  import PlaygroundDetails from '$lib/package-wrapping/PlaygroundDetails.svelte';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import {
    Button,
    ButtonGroup,
    Input,
    MultiSelect,
    Radio,
    Select,
  } from 'flowbite-svelte';
  import { details } from './details.js';
  import RowChart from './local-lib/RowChart.svelte';
  import Table from './local-lib/Table.svelte';

  let { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split('/');

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    'title-first-word'
  );

  let selectedYear = $state(data?.years[0]);
  let numberOfBars = $state(10);
  let sortOrder = $state('none');
  let chart = $state(true);
  let colouredBars = $state(['E07000223']);
  $inspect(colouredBars);
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
        <div class="mt-5">
          <p class="my-2 mx-0 p-0 text-sm">Sort:</p>
          <Select
            items={[
              { value: 'none', name: 'None' },
              { value: 'ascending', name: 'Ascending' },
              { value: 'descending', name: 'Descending' },
            ]}
            bind:value={sortOrder}
          ></Select>
        </div>
        <div class="mt-5">
          <p class="my-2 mx-0 p-0 text-sm">Change colour of bars:</p>
          <MultiSelect
            items={data?.dataInFormatForBarChart
              .find((el) => el.x === selectedYear)
              .bars.slice(0, numberOfBars)
              .sort((a, b) =>
                sortOrder === 'ascending'
                  ? a.y - b.y
                  : sortOrder === 'descending'
                    ? b.y - a.y
                    : null
              )
              .map((d) => {
                return { value: d.areaCode, name: d.areaCode };
              })}
            bind:value={colouredBars}
          ></MultiSelect>
        </div>
        <div>
          <p class="my-2 mx-0 p-0 text-sm">View data as:</p>
          <ButtonGroup>
            <Button on:click={() => (chart = true)}>Bar chart</Button>
            <Button on:click={() => (chart = false)}>Table</Button>
          </ButtonGroup>
        </div>
        {#if chart}
          <div class="row-chart-container">
            <RowChart
              dataArray={data?.dataInFormatForBarChart
                .find((el) => el.x === selectedYear)
                .bars.slice(0, numberOfBars)
                .sort((a, b) =>
                  sortOrder === 'ascending'
                    ? a.y - b.y
                    : sortOrder === 'descending'
                      ? b.y - a.y
                      : null
                )}
              {colouredBars}
            ></RowChart>
          </div>
        {:else}
          <div class="table-container">
            <Table
              dataArray={data?.dataInFormatForBarChart
                .find((el) => el.x === selectedYear)
                .bars.slice(0, numberOfBars)
                .sort((a, b) =>
                  sortOrder === 'ascending'
                    ? a.y - b.y
                    : sortOrder === 'descending'
                      ? b.y - a.y
                      : null
                )}
              {selectedYear}
            />
          </div>
        {/if}
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
