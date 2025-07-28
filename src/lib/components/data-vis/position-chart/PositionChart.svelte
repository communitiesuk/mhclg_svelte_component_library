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
    data,
    lsoa,
    domain,
    chartWidth = $bindable(500),
  } = $props();

  $inspect({ data });

  const range = Array.from({ length: 10 }, (_, i) => i);

  let maxRank = 32844;

  let barWidth = $derived(chartWidth * 0.95);

  let xFunction = $derived(
    scaleLinear().domain([1, maxRank]).range([0, barWidth]),
  );

  $inspect({ lsoa }, { domain });

  let domainRank = $derived(data.find((el) => el.LSOA_name === lsoa)[domain]);

  $inspect(
    "x function",
    xFunction(domainRank),
    "domain rank",
    domainRank,
    "bar width",
    barWidth,
    "chart width",
    chartWidth,
  );
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<p>{domain}</p>

<div
  class="chart-container"
  bind:clientWidth={chartWidth}
  style="border: 1px solid #ccc;"
>
  <svg width={barWidth}>
    <rect width={barWidth} height="30" fill="green"></rect>
    {#each range as number}
      <g transform="translate({(barWidth * number) / 10},0)"
        ><rect width={barWidth / 10} height="30" fill="blue"></rect></g
      >{/each}
    <g transform="translate({xFunction(domainRank)},0)"
      ><circle r="10" cx="0" cy="0" fill="red"></circle></g
    >
  </svg>
</div>

<div style="border: 1px solid #ccc;"></div>

<style>
  .chart-container {
    display: flex;
    padding-bottom: 10px;
  }
</style>
