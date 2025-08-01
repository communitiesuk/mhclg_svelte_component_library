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
    value = undefined,
    min = undefined,
    max = undefined,
    label = "label",
    chartWidth = $bindable(500),
  } = $props();

  data.E01000001.crime = 0.5;

  $inspect({ data });

  const range = Array.from({ length: 10 }, (_, i) => i);

  let maxRank = 32844;

  let markerRadius = $derived(chartWidth / 40);

  let barWidth = $derived(chartWidth - markerRadius * 2);

  let xFunction = $derived(
    scaleLinear().domain([min, max]).range([0, barWidth]),
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

  let barHeight = 20;
  let chartHeight = barHeight * 1.5;

  const colorScale = [
    "#5A0000",
    "#800000",
    "#A31E1E",
    "#C13D3D",
    "#E05C5C",
    "#3F6DCB",
    "#4E7EDE",
    "#5F8FFF",
    "#719FFF",
    "#3A8DFF",
  ];
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
  style="height: {barHeight * 1.5}px;"
>
  <svg width={chartWidth} height={chartHeight}>
    {#each range as number}
      <g
        transform="translate({markerRadius +
          (barWidth * number) / 10},{(chartHeight - barHeight) / 2})"
        ><rect
          width={barWidth / 10}
          height={barHeight}
          fill={colorScale[number]}
        ></rect></g
      >{/each}
    <g
      transform="translate({xFunction(domainRank)},{(chartHeight - barHeight) /
        2})"
      ><circle
        r={markerRadius}
        cx="0"
        cy={barHeight / 2}
        fill="#FFB400"
        stroke="white"
      ></circle></g
    >
  </svg>
</div>

<style>
  .chart-container {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    /* border: 1px solid red; */
  }
</style>
