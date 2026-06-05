<script lang="ts">
  import {
    scaleLinear,
    type ScaleContinuousNumeric,
    type ScaleLinear,
  } from "d3-scale";
  import Ticks from "./Ticks.svelte";

  type AxisName = "x" | "y";
  type AxisPosition = "bottom" | "top" | "left" | "right";
  type Orientation = { axis: AxisName; position: AxisPosition };
  type AxisProjector = (value: number) => number;
  type LabelFormatter = (
    tick: number,
    index: number,
    ticksArrayLength: number,
  ) => string | number;

  type Polarity = "standard" | "reverse";

  let {
    chartHeight = 100,
    chartWidth = $bindable<number>(200),

    numberOfTicks = undefined as number | undefined,

    // Bindable, but avoid binding undefined – initialize as [] for safety
    fullRange = $bindable<number[]>([]),
    ticksArray = $bindable<number[]>([]),

    // Values to derive ticks/domain from if ticksArray not provided
    min = undefined as number | undefined,
    max = undefined as number | undefined,

    orientation = { axis: "x", position: "bottom" } as Orientation,

    floor = undefined as number | undefined,
    ceiling = undefined as number | undefined,

    paddingTop = 100,
    paddingBottom = 100,
    paddingLeft = 0,
    paddingRight = 0,

    labelFormatter = undefined as LabelFormatter | undefined,

    // --- New inputs for D3 scale + optional overrides ---
    // A ready-made D3 continuous scale (linear/log/time, etc.)
    // For this component we use numeric-only; time scales also implement numeric mapping.
    scale = undefined as ScaleContinuousNumeric<number, number> | undefined,

    // Optional overrides for domain/range applied to a COPY of the provided scale
    domain = undefined as [number, number] | undefined,
    range = undefined as [number, number] | undefined,
    fontSize = 19,
    polarity = "standard",
    showGridlines = false,
    showTickMarks = false,
    strokeWidth = 2,
    niceTicks = true,
    leftPad = 0 as number,
    rightPad = 0 as number,
    markerRadius = 0 as number,
  }: {
    chartHeight?: number;
    chartWidth?: number;
    numberOfTicks?: number;
    fullRange?: number[];
    ticksArray?: number[];
    min?: number;
    max?: number;
    orientation?: Orientation;
    floor?: number;
    ceiling?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    labelFormatter?: LabelFormatter;

    // New
    scale?: ScaleContinuousNumeric<number, number>;
    domain?: [number, number];
    range?: [number, number];
    fontSize?: number;
    polarity?: Polarity;
    gridlines?: Boolean;
    strokeWidth?: Number;
    showGridlines?: Boolean;
    showTickMarks?: Boolean;
    niceTicks?: Boolean;
    leftPad?: Number;
    rightPad?: Number;
    markerRadius?: Number;
  } = $props();

  // --- Helpers to compute default domain/range when not supplied ---
  const innerWidth = $derived(
    Math.max(0, chartWidth - chartWidth * leftPad - chartWidth * rightPad),
  );
  const innerHeight = $derived(Math.max(0, chartHeight));

  function computeDefaultDomain(): [number, number] {
    const arr =
      (ticksArray && ticksArray.length ? ticksArray : [min, max]) ?? [];
    const dMin =
      floor ?? (arr.length ? arr.reduce((a, b) => (a < b ? a : b)) : 0);
    const dMax =
      ceiling ?? (arr.length ? arr.reduce((a, b) => (a > b ? a : b)) : 1);
    return [dMin, dMax];
  }

  function computeDefaultRange(innerWidth, innerHeight): [number, number] {
    if (orientation.axis === "x") {
      return [0, innerWidth];
    } else {
      return [innerHeight, 0];
    }
  }
  const useDomain = $derived(domain ?? computeDefaultDomain());
  const useRange = $derived(computeDefaultRange(innerWidth, innerHeight)); //Returns d3 scale function

  const resolvedScale = $derived(() => {
    const base: ScaleContinuousNumeric<number, number> = scale
      ? scale.copy()
      : scaleLinear<number, number>();

    base.domain(useDomain);

    base.range(useRange);

    return base;
  });
  const axisFunction: AxisProjector = $derived((v: number) => resolvedScale(v));

  function calculateRangeFromTicks(ticksArray, leftPad, rightPad): number[] {
    const arr = Array.from(ticksArray);
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    const ticksRange = Math.max(...ticksArray) - Math.min(...ticksArray);

    const lowerLimit = min - ticksRange * leftPad;
    const upperLimit = max + ticksRange * rightPad;

    const limitsOrdered = $derived(
      polarity === "standard"
        ? [lowerLimit, upperLimit]
        : [upperLimit, lowerLimit],
    );
    return limitsOrdered;
  }

  let computedFullRange = $derived(
    calculateRangeFromTicks(ticksArray, leftPad, rightPad),
  );

  // Sync it upward whenever it changes
  $effect(() => {
    fullRange = computedFullRange;
  });

  $inspect({ fullRange });
</script>

<g
  data-role="{orientation.axis}-axis"
  transform="translate({orientation.position !== 'right'
    ? 0
    : chartWidth},{orientation.position === 'bottom' ? chartHeight : 0})"
>
  <line
    x1={range[0]}
    y1="0"
    x2={orientation.axis === "x" ? range[1] : 0}
    y2={orientation.axis === "y" ? chartHeight : 0}
    stroke="grey"
    stroke-width="2px"
  ></line>
  <g
    data-role="{orientation.axis}-axis"
    transform="translate({orientation.position !== 'right'
      ? chartWidth * leftPad + markerRadius
      : chartWidth},{orientation.position === 'bottom' ? 0 : 0})"
  >
    {#if ticksArray || (min && max)}
      {#key numberOfTicks}
        <Ticks
          bind:ticksArray
          {chartWidth}
          {chartHeight}
          {axisFunction}
          {min}
          {max}
          {numberOfTicks}
          {orientation}
          {floor}
          {ceiling}
          {labelFormatter}
          {fontSize}
          {polarity}
          {showGridlines}
          {showTickMarks}
          {strokeWidth}
          {niceTicks}
          {leftPad}
          {rightPad}
        />
      {/key}
    {/if}
  </g>
</g>
