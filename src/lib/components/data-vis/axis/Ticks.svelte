<script>
  import { tick } from "svelte";
  import Decimal from "decimal.js";

  let {
    ticksArray = $bindable(),
    prefix,
    suffix,
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    floor,
    ceiling,
    orientation,
    yearsInput,
    yearFormating,
  } = $props();

  $inspect(ticksArray);

  function generateTicks(data, numTicks, floor, ceiling) {
    let minValueFromData = Decimal.min(...data);

    let minVal = floor
      ? Decimal.max(floor, minValueFromData)
      : minValueFromData;

    let maxValueFromData = Decimal.max(...data);

    let maxVal = ceiling
      ? Decimal.min(ceiling, maxValueFromData)
      : maxValueFromData;

    /*let minVal =
      generateTicksNum !== true
        ? new Decimal(minTick)
        : Decimal.min(...data.map((val) => new Decimal(val)));
    let maxVal =
      maxTick !== null
        ? new Decimal(maxTick)
        : Decimal.max(...data.map((val) => new Decimal(val)));*/
    let rangeVal = maxVal.minus(minVal);

    let roughStep = rangeVal.div(numTicks - 1);
    let normalizedSteps = [1, 2, 5, 10];

    let stepPower = Decimal.pow(
      10,
      -Math.floor(Math.log10(roughStep.toNumber())),
    );
    let normalizedStep = roughStep.mul(stepPower);
    let optimalStep = new Decimal(
      normalizedSteps.find((step) => step >= normalizedStep.toNumber()),
    ).div(stepPower);

    let scaleMin = minVal.div(optimalStep).floor().mul(optimalStep);
    let scaleMax = maxVal.div(optimalStep).ceil().mul(optimalStep);

    let ticks = [];
    for (let i = scaleMin; i.lte(scaleMax); i = i.plus(optimalStep)) {
      ticks.push(i.toNumber());
    }
    return ticks;
  }

  function tickCount(chartWidth, chartHeight) {
    let tickNum = orientation.axis === "y" ? chartHeight / 50 : chartWidth / 50;
    return tickNum;
  }

  function yearsFormat(ticks) {
    return ticks.map((tick) => `FY ${tick % 100}-${(tick % 100) + 1}`);
  }

  numberOfTicks = tickCount(chartWidth, chartHeight);

  ticksArray = generateTicks(values, numberOfTicks, floor, ceiling);
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
        {yearsInput ? yearTicks[index] : prefix + tick + suffix}
      </text>
    </g>
  {/each}
{/if}
