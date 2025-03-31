<script>
  import { page } from "$app/stores";
  import PlaygroundDetails from "$lib/package-wrapping/PlaygroundDetails.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { details } from "./details.js";
  import LineChart from "./local-lib/LineChart.svelte";
  import Radio from "./local-lib/Radio.svelte";
  import { Input } from "flowbite-svelte";

  let../create-a-reactive-line-chart/$types.js { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  let numberOfTicks = $state(5);

  let selectedMetric = $state(data?.metrics[0]);
</script>

<PlaygroundDetails {homepage} {details}></PlaygroundDetails>
{#if !homepage}
  <div class="chart-container">
    <div class="mt-20">
      <div
        class="top-level-container border-solid rounded-lg border-2 border-current p-2"
      >
        <div class="mt-5">
          <p class="my-2 mx-0 p-0 text-sm">Number of ticks:</p>
          <Input let:props>
            <input
              type="number"
              {...props}
              step={1}
              min={1}
              bind:value={numberOfTicks}
            />
          </Input>
        </div>
        <div class="radio-container">
          <Radio options={data.metrics} bind:value={selectedMetric}></Radio>
        </div>
        <div class="svg-container mt-6">
          {#if selectedMetric}
            <LineChart
              data={data.dataInFormatForLineChart.find(
                (el) => el.metric === selectedMetric,
              )}
              {numberOfTicks}
            ></LineChart>
          {/if}
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
