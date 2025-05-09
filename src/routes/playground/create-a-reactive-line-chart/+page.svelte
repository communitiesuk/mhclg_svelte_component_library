<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import PlaygroundDetails from "$lib/package-wrapping/PlaygroundDetails.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { details } from "./details.js";
  import LineChart from "./local-lib/LineChart.svelte";
  import Radio from "./local-lib/Radio.svelte";
  import { goto } from "$app/navigation";

  let { data, homepage = false, folders } = $props();

  let pageInfo = page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );

  let urlParams = $derived(data.urlParams);

  function updateUrlParams(value) {
    urlParams[Object.keys(value)] = Object.values(value)[0];

    let urlParamsString = new URLSearchParams(urlParams).toString();

    goto("?" + urlParamsString, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }
  let selectedMetric = $derived(
    urlParams["selectedMetric"] ?? data?.metrics[0],
  );
  $inspect(selectedMetric);
</script>

<PlaygroundDetails {homepage} {details}></PlaygroundDetails>
{#if !homepage}
  <a
    href="./create-a-bar-chart-using-url?{new URLSearchParams(
      urlParams,
    ).toString()}">Go to the bar chart</a
  >
  <div class="chart-container">
    <div class="mt-20">
      <div
        class="top-level-container border-solid rounded-lg border-2 border-current p-2"
      >
        <div class="radio-container">
          <Radio
            options={data.metrics}
            bind:value={selectedMetric}
            {selectedMetric}
            onchange={() => updateUrlParams({ selectedMetric })}
          ></Radio>
        </div>
        <div class="svg-container mt-6">
          {#if selectedMetric}
            <LineChart
              data={data.dataInFormatForLineChart.find(
                (el) => el.metric === selectedMetric,
              )}
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
