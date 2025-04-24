<script>
  import { tick } from "svelte";

  let {
    ticksArray = $bindable(),
    prefix,
    suffix,
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    baseline,
    setMax,
    orientation,
    yearsInput,
    generateTicksNum,
  } = $props();

  $inspect(ticksArray);

  function generateTicks(data, numTicks, baseline, setTick) {
    console.log(data, typeof data);
    let minVal = baseline !== null ? baseline : Math.min(...data);
    let maxVal = setTick !== null ? setTick : Math.max(...data);
    let rangeVal = maxVal - minVal;

    let roughStep = rangeVal / (numTicks - 1);
    let normalizedSteps = [1, 2, 5, 10];

    let stepPower = Math.pow(10, -Math.floor(Math.log10(roughStep)));
    let normalizedStep = roughStep * stepPower;
    let optimalStep =
      normalizedSteps.find((step) => step >= normalizedStep) / stepPower;

    let scaleMin = Math.floor(minVal / optimalStep) * optimalStep;
    let scaleMax = Math.ceil(maxVal / optimalStep) * optimalStep;

    let ticks = [];
    for (let i = scaleMin; i <= scaleMax; i += optimalStep) {
      ticks.push(i);
    }
    return ticks;
  }

  function tickCount(chartWidth) {
    return Math.floor(chartWidth / 50);
  }

  function yearsFormat(ticks) {
    return ticks.map((tick) => `FY ${tick % 100}-${(tick % 100) + 1}`);
  }

  numberOfTicks = tickCount(chartWidth);

  ticksArray = generateTicks(values, numberOfTicks, baseline, setMax);
  let yearTicks = yearsInput ? yearsFormat(ticksArray) : [];
</script>

{#if axisFunction && ticksArray && orientation.axis && orientation.position}
  {#each ticksArray as tick, index}
    <g
      transform="translate({orientation.axis === 'x'
        ? axisFunction(tick)
        : 0},{orientation.axis === 'y' ? axisFunction(tick) : 0})"
    >
      <path
        d={orientation.axis === "y"
          ? orientation.position === "left"
            ? "M0 0 l-8 0"
            : "M0 0 l8 0"
          : orientation.position === "top"
            ? "M0 0 l0 -8"
            : "M0 0 l0 8"}
        stroke="black"
        stroke-width="2px"
      ></path>
      <text
        transform="translate({orientation.axis === 'x'
          ? 0
          : orientation.position === 'left'
            ? -10
            : 10}, {orientation.axis === 'y'
          ? 5
          : orientation.position === 'top'
            ? -10
            : 23})"
        font-size="19"
        text-anchor={orientation.axis === "x"
          ? "middle"
          : orientation.position === "left"
            ? "end"
            : "start"}
        fill="black"
      >
        {yearsInput ? yearTicks[index] : `${prefix}${tick}${suffix}`}
      </text>
    </g>
  {/each}
{/if}
