<script lang="ts">
  import Decimal from "decimal.js";

  // Types
  type Axis = "x" | "y";
  type Position = "left" | "right" | "top" | "bottom";

  interface Orientation {
    axis: Axis;
    position: Position;
  }

  // Props with defaults (Svelte 5 runes)
  let {
    ticksArray = $bindable<number[]>(),
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    floor,
    ceiling,
    orientation,
    labelFormatter,
  }: {
    ticksArray?: number[]; // bindable
    chartWidth: number;
    chartHeight: number;
    axisFunction: any;
    values: number[]; // numeric array for domain
    numberOfTicks?: number;
    floor?: number;
    ceiling?: number;
    orientation: Orientation;
    /** Mandatory custom label generator */
    labelFormatter?: (tick: number, index: number) => string;
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

  function generateTicks(
    data: number[],
    numTicks: number,
    floorVal?: number,
    ceilingVal?: number,
  ): number[] {
    const minValueFromData = Decimal.min(...data);
    const maxValueFromData = Decimal.max(...data);

    const minVal =
      floorVal !== undefined
        ? Decimal.max(new Decimal(floorVal), minValueFromData)
        : new Decimal(minValueFromData);

    const maxVal =
      ceilingVal !== undefined
        ? Decimal.min(new Decimal(ceilingVal), maxValueFromData)
        : new Decimal(maxValueFromData);

    const rangeVal = maxVal.minus(minVal);
    const roughStep = rangeVal.div(numTicks - 1);
    const normalizedSteps = [1, 2, 5, 10];

    const stepPower = Decimal.pow(
      10,
      -Math.floor(Math.log10(roughStep.toNumber())),
    );

    const normalizedStep = roughStep.mul(stepPower);
    const chosen = normalizedSteps.find(
      (step) => step >= normalizedStep.toNumber(),
    );
    const optimalStep = new Decimal(chosen ?? 10).div(stepPower);

    const scaleMin = minVal.div(optimalStep).floor().mul(optimalStep);
    const scaleMax = maxVal.div(optimalStep).ceil().mul(optimalStep);

    const ticks: number[] = [];
    for (let i = scaleMin; i.lte(scaleMax); i = i.plus(optimalStep)) {
      ticks.push(i.toNumber());
    }
    return ticks;
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
  numberOfTicks = tickCount(chartWidth, chartHeight);
  const rawTicks = generateTicks(values, numberOfTicks, floor, ceiling);

  ticksArray = clampTickEnds(rawTicks, floor, ceiling);
</script>

{#if axisFunction && ticksArray && orientation.axis && orientation.position}
  {#each ticksArray as tick, index}
    <g
      transform="translate(
        {orientation.axis === 'x' ? axisValue(axisFunction, tick) : 0},
        {orientation.axis === 'y' ? axisValue(axisFunction, tick) : 0}
      )"
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
            : 23}
        )"
        font-size="19"
        text-anchor={orientation.axis === "x"
          ? "middle"
          : orientation.position === "left"
            ? "end"
            : "start"}
        fill="black"
      >
        {labelFormatter ? labelFormatter(tick, index) : defaultLabel(tick)}
      </text>
    </g>
  {/each}
{/if}
