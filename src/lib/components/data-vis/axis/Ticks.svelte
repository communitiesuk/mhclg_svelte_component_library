<script lang="ts">
  import Decimal from "decimal.js";
  import { ticks, tickStep, range, nice } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import Axis from "./Axis.svelte";

  // Types
  type Axis = "x" | "y";
  type Position = "left" | "right" | "top" | "bottom";

  interface Orientation {
    axis: Axis;
    position: Position;
  }
  type Polarity = "standard" | "reverse";

  type LabelFormatter = (
    tick: number,
    index: number,
    ticksArrayLength: number,
  ) => string | number;

  // Props with defaults (Svelte 5 runes)
  let {
    ticksArray = $bindable<number[]>(),
    tickWidth,
    chartHeight,
    min,
    max,
    numberOfTicks,
    floor,
    ceiling,
    orientation,
    fontSize = 19,
    polarity = "standard",
    showGridlines = false,
    showTickMarks = false,
    strokeWidth = 2,
    labelFormatter = undefined as LabelFormatter | undefined,
    niceTicks = true,
  }: {
    ticksArray?: number[]; // bindable
    tickWidth: number;
    chartHeight: number;
    min: number;
    max: number;
    numberOfTicks?: number;
    floor?: number;
    ceiling?: number;
    orientation: Orientation;
    fontSize?: number;
    polarity?: Polarity;
    showGridlines?: Boolean;
    showTickMarks?: Boolean;
    strokeWidth?: number;
    labelFormatter?: LabelFormatter;
    niceTicks?: Boolean;
    leftPad?: Number;
    rightPad?: Number;
  } = $props();
  // function axisValue(fn: any, tick: number): number {
  //   // Try single-call first: axisFunction(tick)
  //   try {
  //     const v = fn(tick);
  //     if (typeof v === "number") return v;
  //   } catch {
  //     // ignore
  //   }

  //   // Fallback: axisFunction()(tick)
  //   const inner = fn();
  //   return inner(tick);
  // }

  // Default label when no labelFormatter is supplied
  function defaultLabel(tick: number): string {
    return String(tick);
  }

  function tickCount(w: number, h: number): number {
    const tickNum = orientation.axis === "y" ? h / 50 : w / 50;
    return tickNum;
  }

  let computedTickCount = $derived(
    numberOfTicks ?? tickCount(tickWidth, chartHeight),
  );

  let rawTicks = $derived(
    niceTicks
      ? ticks(...nice(min, max, computedTickCount), computedTickCount)
      : [min, max],
  );

  let ticksOrdered = $derived(
    polarity === "standard" ? rawTicks : rawTicks.reverse(),
  );

  $effect(() => {
    ticksArray = ticksOrdered;
  });

  let axisFunction = $derived(
    scaleLinear()
      .domain([Math.min(...ticksArray), Math.max(...ticksArray)])
      .range([0, tickWidth]),
  );
</script>

{#if axisFunction && ticksArray && orientation.axis && orientation.position}
  {#each ticksArray as tick, index}
    <g
      transform="translate(
        {orientation.axis === 'x' ? axisFunction(tick) : 0},
        {orientation.axis === 'y' ? axisFunction(tick) : 0}
      )"
    >
      {#if showTickMarks}
        <path
          d={orientation.axis === "y"
            ? orientation.position === "left"
              ? `M1 0 l-8 0`
              : `M1 0 l8 0`
            : orientation.position === "top"
              ? "M0 -1 l0 -8"
              : "M0 -1 l0 8"}
          stroke="grey"
          stroke-width={strokeWidth}
        ></path>
      {/if}
      {#if showGridlines}
        <path
          d={orientation.axis === "y"
            ? orientation.position === "left"
              ? `M0 0 l${tickWidth} 0`
              : `M0 0 l-${tickWidth} 0`
            : orientation.position === "top"
              ? `M0 0 l0 ${chartHeight}`
              : `M0 0 l0 -${chartHeight}`}
          stroke="grey"
          stroke-width={strokeWidth}
        ></path>
      {/if}
      <text
        transform="translate(
          {orientation.axis === 'x'
          ? 0
          : orientation.position === 'left'
            ? -10
            : 10},
          {orientation.axis === 'y'
          ? 5
          : orientation.position === 'top'
            ? -10
            : fontSize * 1.4}
        )"
        font-size={fontSize}
        text-anchor={orientation.axis === "x"
          ? "middle"
          : orientation.position === "left"
            ? "end"
            : "start"}
        fill="grey"
      >
        {labelFormatter
          ? labelFormatter(tick, index, ticksArray.length)
          : defaultLabel(tick)}
      </text>
    </g>
  {/each}
{/if}
