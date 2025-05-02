<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import PlaygroundDetails from "$lib/package-wrapping/PlaygroundDetails.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { Input, Radio } from "flowbite-svelte";
  import { details } from "./details.js";
  import RowChart from "./local-lib/RowChart.svelte";
  import { goto } from "$app/navigation";

  let { data, homepage = false, folders } = $props();

  let pageInfo = page?.route.id.split("/");

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

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );

  let selectedYear = $derived(+(urlParams["selectedYear"] ?? data?.years[0]));
  $inspect({ selectedYear });
  let numberOfBars = $derived(+(urlParams["numberOfBars"] ?? 10));
  $inspect(numberOfBars);

  let dataArray = $derived(
    data?.dataInFormatForBarChart
      //Had to remove type checking (===) for ?? to work above
      .find((el) => el.x == selectedYear)
      ?.bars.map((el, index) => ({
        ...el,
        label: data.areaCodeLookup[el.areaCode],
        color:
          data.areaCodeLookup[el.areaCode] === "North West Leicestershire"
            ? "blue"
            : null,
        y: (index % 2 === 0 ? 1 : -1) * el.y,
      }))
      .sort((a, b) => b.label.length - a.label.length)
      .slice(0, numberOfBars),
  );
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
            {#if selectedYear}
              {#each data.years as option, i}
                <Radio
                  value={option}
                  bind:group={selectedYear}
                  checked={option == selectedYear}
                  onchange={() => updateUrlParams({ selectedYear })}
                >
                  <span class="text-base font-normal">
                    {option}
                  </span>
                </Radio>
                <!-- <Input let:props>
                  <input
                    type="radio"
                    {...props}
                    value={option}
                    id="radio-{option}"
                    class=""
                    bind:group={selectedYear}
                    checked={option == selectedYear}
                    onchange={updateUrlParams({ selectedYear })}
                  />
                  <label for="radio-{option}">{option}</label>
                </Input> -->
              {/each}
            {/if}
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
              onchange={updateUrlParams({ numberOfBars })}
            />
          </Input>
        </div>
        <p>
          To see how these persist across pages <a
            href="./create-a-reactive-line-chart?{data.urlParamsString}"
            >go to the line chart example.</a
          >
        </p>
        <div class="row-chart-container">
          <RowChart {dataArray}></RowChart>
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
