<script lang="ts">
  import Decimal from "decimal.js";

  // Types
  type Axis = "x" | "y";
  type Polarity = "standard" | "reverse";
  type Position = "left" | "right" | "top" | "bottom";

  interface Orientation {
    axis: Axis;
    position: Position;
  }

  // Props with defaults
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
    fontSize = 19,
    clamp = false,
    polarity = "standard",
  }: {
    ticksArray?: number[];
    chartWidth: number;
    chartHeight: number;
    axisFunction: any;
    values: number[];
    numberOfTicks?: number;
    floor?: number | null;
    ceiling?: number | null;
    orientation: Orientation;
    labelFormatter?: (
      tick: number,
      index: number,
      numberOfTicks: number,
      values: number[],
    ) => string;
    fontSize?: number;
    clamp: boolean;
    polarity: Polarity;
  } = $props();

  // Axis value helper
  function axisValue(fn: any, tick: number): number {
    try {
      const v = fn(tick);
      if (typeof v === "number") return v;
    } catch {}
    const inner = fn();
    return inner(tick);
  }

  // Generate ticks safely
  function generateTicks(
    data: number[],
    numTicks: number,
    floorVal?: number | null,
    ceilingVal?: number | null,
  ): number[] {
    if (!data || data.length === 0) return [];

    const dataMin = Decimal.min(...data);
    const dataMax = Decimal.max(...data);

    const minVal = floorVal != null ? new Decimal(floorVal) : dataMin;
    const maxVal = ceilingVal != null ? new Decimal(ceilingVal) : dataMax;

    const rangeVal = maxVal.minus(minVal);

    // Ensure at least 2 ticks
    const stepCount = Math.max(2, numTicks - 1);
    const roughStep = rangeVal.div(stepCount);

    const normalizedSteps = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15,
      25, 30, 35, 40, 45,
    ];

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

  // Default label generator
  function defaultLabel(tick: number): string {
    return String(tick);
  }

  // Compute number of ticks
  function tickCount(w: number, h: number): number {
    const rawTicks = orientation.axis === "y" ? h / 50 : w / 50;
    return Math.max(2, Math.floor(rawTicks));
  }

  // Clamp ticks safely
  function clampTickEnds(
    ticks: number[],
    floorVal?: number | null,
    ceilingVal?: number | null,
  ): number[] {
    if (!ticks || ticks.length === 0) return ticks;
    const out = ticks.slice();

    if (floorVal != null && out[0] < floorVal) {
      out[0] = floorVal;
    }
    if (ceilingVal != null && out[out.length - 1] > ceilingVal) {
      out[out.length - 1] = ceilingVal;
    }
    return out;
  }

  // Compute derived ticks
  const computedTickCount = numberOfTicks ?? tickCount(chartWidth, chartHeight);

  let derivedTicks = $derived(() => {
    const ticks = generateTicks(values, computedTickCount, floor, ceiling);
    return clamp ? clampTickEnds(ticks, floor, ceiling) : ticks;
  });

  ticksArray = derivedTicks();
</script>

{#if axisFunction && ticksArray?.length && orientation.axis && orientation.position}
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
        stroke="darkgrey"
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
        font-size={fontSize}
        text-anchor={orientation.axis === "x"
          ? "middle"
          : orientation.position === "left"
            ? "end"
            : "start"}
        fill="#666666"
      >
        {labelFormatter
          ? labelFormatter(tick, index, ticksArray.length, values)
          : defaultLabel(tick)}
      </text>
    </g>
  {/each}
{/if}
