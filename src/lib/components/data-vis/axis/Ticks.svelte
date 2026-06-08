<script lang="ts">
  import Decimal from "decimal.js";
  import { ticks, tickStep, range, nice } from "d3-array";

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
    chartWidth,
    chartHeight,
    axisFunction,
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
    chartWidth: number;
    chartHeight: number;
    axisFunction: any;
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
  function axisValue(fn: any, tick: number): number {
    // Try single-call first: axisFunction(tick)
    try {
      const v = fn(tick);
      if (typeof v === "number") return v;
    } catch {
      // ignore
    }

    // Fallback: axisFunction()(tick)
    const inner = fn();
    return inner(tick);
  }
  const NICE_STEPS = [1, 2, 2.5, 5, 10];
  const TICK_PENALTY_WEIGHT = 1;
  const PADDING_PENALTY_WEIGHT = 10;
  const MAX_TICK_MULTIPLIER = 3;

  function generateTicks(
    min: number,
    max: number,
    numTicks: number,
    floorVal?: number,
    ceilingVal?: number,
  ): number[] {
    const lo = floorVal ?? min;
    const hi = ceilingVal ?? max;

    if (numTicks < 2) return [lo];
    if (hi <= lo) return [lo, hi];

    const roughStep = (hi - lo) / (numTicks - 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));

    // Candidate steps: nice multiples at this magnitude and its neighbors
    const candidates = [-1, 0, 1]
      .flatMap((offset) =>
        NICE_STEPS.map((s) => s * magnitude * Math.pow(10, offset)),
      )
      .filter((s, i, arr) => arr.indexOf(s) === i) // deduplicate
      .sort((a, b) => a - b);

    function tickBounds(step: number): {
      start: number;
      end: number;
      count: number;
    } {
      const start = lo % step === 0 ? lo : Math.floor(lo / step) * step;
      const end = Math.ceil(hi / step) * step;
      const count = Math.round((end - start) / step) + 1;
      return { start, end, count };
    }

    function score(step: number): number {
      const { start, end, count } = tickBounds(step);
      const paddingPenalty = (end - start) / (hi - lo) - 1;
      const countPenalty = Math.abs(count - numTicks);
      return (
        paddingPenalty * PADDING_PENALTY_WEIGHT +
        countPenalty * TICK_PENALTY_WEIGHT
      );
    }

    const bestStep = candidates
      .filter(
        (step) => tickBounds(step).count <= numTicks * MAX_TICK_MULTIPLIER,
      )
      .reduce((best, step) => (score(step) < score(best) ? step : best));

    // Use Decimal only here, to avoid float drift in the loop
    const { start, count } = tickBounds(bestStep);
    const step = new Decimal(bestStep);
    return Array.from({ length: count }, (_, i) =>
      new Decimal(start).plus(step.mul(i)).toNumber(),
    );
  }

  // Default label when no labelFormatter is supplied
  function defaultLabel(tick: number): string {
    return String(tick);
  }

  function tickCount(w: number, h: number): number {
    // Keep behavior aligned with your original code.
    const tickNum = orientation.axis === "y" ? h / 50 : w / 50;
    return tickNum;
  }
  function clampTickEnds(
    ticks: number[],
    floor?: number,
    ceiling?: number,
  ): number[] {
    if (!ticks || ticks.length === 0) return ticks;

    const out = ticks.slice();

    if (floor !== undefined && out[0] <= floor) {
      out[0] = floor;
    }
    if (ceiling !== undefined && out[out.length - 1] >= ceiling) {
      out[out.length - 1] = ceiling;
    }
    return out;
  }

  // Compute ticks
  let computedTickCount = $derived(
    numberOfTicks ?? tickCount(chartWidth, chartHeight),
  );

  let rawTicks = $derived(
    niceTicks
      ? ticks(...nice(min, max, computedTickCount), computedTickCount)
      : [min, max],
  );

  let ticksOrdered = $derived(
    polarity === "standard" ? rawTicks : rawTicks.reverse(),
  );

  ticksArray = ticksOrdered;
</script>

{#if axisFunction && ticksArray && orientation.axis && orientation.position}
  {#each ticksArray as tick, index}
    <g
      transform="translate(
        {orientation.axis === 'x' ? axisValue(axisFunction, tick) : 0},
        {orientation.axis === 'y' ? axisValue(axisFunction, tick) : 0}
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
              ? `M0 0 l${chartWidth} 0`
              : `M0 0 l-${chartWidth} 0`
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
