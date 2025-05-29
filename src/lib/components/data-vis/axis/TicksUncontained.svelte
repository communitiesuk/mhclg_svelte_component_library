<script>
  import { tick } from "svelte";
  import Decimal from "decimal.js";

  let {
    ticksArray,
    prefix,
    suffix,
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    minTick,
    maxTick,
    orientation,
    yearsInput,
    generateTicksNum,
    yearFormating,
  } = $props();

  function tickCount(chartWidth) {
    return Math.floor(chartWidth / 50);
  }

  function yearsFormat(ticks) {
    return ticks.map((tick) => `FY ${tick % 100}-${(tick % 100) + 1}`);
  }

  numberOfTicks = tickCount(chartWidth);

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
