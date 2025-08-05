<script>
  import { scaleLinear } from "d3-scale";
  let {
    componentNameProp = undefined,
    value = undefined,
    min = undefined,
    max = undefined,
    label = undefined,
    componentWidth = $bindable(500),
  } = $props();

  const range = Array.from({ length: 10 }, (_, i) => i);

  let markerRadius = $derived(chartWidth / 40);

  let barWidth = $derived(chartWidth - markerRadius * 2);

  let chartWidth = $derived(
    label ? componentWidth - Math.max(label.length * 5, 100) : componentWidth,
  );

  let xFunction = $derived(
    scaleLinear().domain([min, max]).range([0, barWidth]),
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
  $inspect({ value });
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="chart-and-label-container" bind:clientWidth={componentWidth}>
  {#if label}
    <p>{label}</p>
  {/if}

  <div
    class="chart-container"
    style="height: {barHeight * 1.5}px; width: {chartWidth}"
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
        transform="translate({xFunction(value) + markerRadius},{(chartHeight -
          barHeight) /
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
</div>

<style>
  .chart-container {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  .chart-and-label-container {
    display: grid;
    grid-template-columns: minmax(100px, 30%) 1fr;
    align-items: center;
    gap: 3%;
  }
</style>
