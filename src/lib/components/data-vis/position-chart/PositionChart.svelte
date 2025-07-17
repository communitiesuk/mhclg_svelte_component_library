<script>
  import { scaleLinear } from "d3-scale";
  let {
    componentNameProp = undefined,
    textProp = undefined,
    numberProp = undefined,
    checkboxProp = false,
    dropdownProp = undefined,
    radioProp = undefined,
    jsObjectProp = [],
    functionProp = undefined,
    deprivationData,
    lsoa,
  } = $props();

  const range = Array.from({ length: 10 }, (_, i) => i + 1);

  let maxRank = 32844;

  let chartWidth = 500;

  let xFunction = $derived(
    scaleLinear().domain([1, maxRank]).range([0, chartWidth]),
  );

  let imdDecile = $derived(
    deprivationData.find((el) => el.LSOA === lsoa).IMDdecile,
  );

  let imdRank = $derived(deprivationData.find((el) => el.LSOA === lsoa).IMD);
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="chart-container">
  {#each range as number}
    {#if number === imdDecile}
      <svg width={chartWidth / 10} height={chartWidth / 10}
        ><rect width={chartWidth / 10} height={chartWidth / 10} fill="blue"
        ></rect></svg
      >
    {:else}
      <svg width={chartWidth / 10} height={chartWidth / 10}
        ><rect width={chartWidth / 10} height={chartWidth / 10} fill="red"
        ></rect></svg
      >{/if}
  {/each}
</div>

<div class="chart-container">
  <svg width={chartWidth} height={chartWidth / 10}>
    <rect width={chartWidth} height={chartWidth / 10}></rect>
    <g transform="translate({xFunction(imdRank)},0)"
      ><rect width="10" height={chartWidth / 10} fill="white"></rect></g
    >
  </svg>
</div>

<style>
  .chart-container {
    display: flex;
    padding-bottom: 100px;
  }
</style>
