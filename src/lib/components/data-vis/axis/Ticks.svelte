<script>
  import { tick } from "svelte";

  let {
    ticksArray = $bindable(),
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    orientation,
  } = $props();

  // $inspect(ticksArray);

  //TODO: Ticks based on width
  function generateTicks(data, numTicks) {
    let minVal = Math.min(...data);
    let maxVal = Math.max(...data);
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

  ticksArray = generateTicks(values, numberOfTicks);
</script>

{#if axisFunction != null && ticksArray != null && orientation.hasOwnProperty("axis") && orientation.hasOwnProperty("position")}
  {#each ticksArray as tick}
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
        >{tick}
      </text>
    </g>
  {/each}
{/if}
