<script>
  import D3Maps from "./local-libs/D3Maps.svelte";
  import Map from "./local-libs/Map.svelte";

  import { page } from "$app/stores";
  import PlaygroundDetails from "$lib/package-wrapping/PlaygroundDetails.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { details } from "./details.js";
  import { Input, Radio } from "flowbite-svelte";

  let { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  let selectedMetric = $state(data?.metrics[0]);
  let selectedYear = $state(data?.years[0]);
  let dataArray = $derived(
    data?.dataInFormatForBarChart
      .find((el) => el.x === selectedYear)
      ?.bars.map((el, index) => ({
        ...el,
        label: data.areaCodeLookup[el.areaCode],
        value: (index % 2 === 0 ? 1 : -1) * el.y,
      }))
      .sort((a, b) => b.label.length - a.label.length),
  );

  $inspect(dataArray);
</script>

<PlaygroundDetails {homepage} {details}></PlaygroundDetails>
{#if !homepage}
  <div class="chart-container">
    <div class="mt-20">
      <div
        class="top-level-container border-solid rounded-lg border-2 border-current p-2"
      >
        <div class="radio-container">
          {#each data.metrics as option, i}
            <Radio value={option} bind:group={selectedMetric}>
              <span class="text-base font-normal">
                {option}
              </span>
            </Radio>
          {/each}
        </div>
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
        <div class="row-chart-container">
          <h1>d3 Map</h1>
          <D3Maps data={dataArray}></D3Maps>
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
