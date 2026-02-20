<script lang="ts">
  import {
    scaleLinear,
    type ScaleContinuousNumeric,
    type ScaleLinear,
  } from "d3-scale";
  import Ticks from "./Ticks.svelte";

  type AxisName = "x" | "y";
  type Polarity = "standard" | "reverse";

  type AxisPosition = "bottom" | "top" | "left" | "right";
  type Orientation = { axis: AxisName; position: AxisPosition };
  type AxisProjector = (value: number) => number;
  type LabelFormatter = (tick: number, index: number) => string | number;

  let {
    chartHeight = 100,
    chartWidth = $bindable<number>(200),

    numberOfTicks = undefined as number | undefined,

    // Bindable, but avoid binding undefined – initialize as [] for safety
    ticksArray = $bindable<number[]>([]),

    // Values to derive ticks/domain from if ticksArray not provided
    values = undefined as number[] | undefined,

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
    polarity = "standard" as Polarity,
  }: {
    chartHeight?: number;
    chartWidth?: number;
    numberOfTicks?: number;
    ticksArray?: number[];
    values?: number[];
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
  } = $props();

  // --- Helpers to compute default domain/range when not supplied ---
  const innerWidth = $derived(Math.max(0, chartWidth));
  const innerHeight = $derived(Math.max(0, chartHeight));

  function computeDefaultDomain(): [number, number] {
    const arr = (ticksArray && ticksArray.length ? ticksArray : values) ?? [];
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
  //Returns d3 scale function
  const resolvedScale = $derived(() => {
    const base: ScaleContinuousNumeric<number, number> = scale
      ? scale.copy()
      : scaleLinear<number, number>();

    const useDomain = domain ?? computeDefaultDomain();
    base.domain(useDomain);

    let useRange = range ?? computeDefaultRange(innerWidth, innerHeight);
    if (polarity === "reverse") {
      useRange = [...useRange].reverse();
    }
    base.range([...useRange]);

    return base;
  });
  const axisFunction: AxisProjector = $derived((v: number) => resolvedScale(v));
</script>

<g
  data-role="{orientation.axis}-axis"
  transform="translate({orientation.position !== 'right'
    ? 0
    : chartWidth},{orientation.position === 'bottom' ? chartHeight : 0})"
>
  <line
    x1={0}
    y1="0"
    x2={orientation.axis === "x" ? chartWidth : 0}
    y2={orientation.axis === "y" ? chartHeight : 0}
    stroke="darkgrey"
    stroke-width="2px"
  ></line>
  {#if values}
    {#key numberOfTicks}
      <Ticks
        bind:ticksArray
        {chartWidth}
        {chartHeight}
        {axisFunction}
        {values}
        {numberOfTicks}
        {orientation}
        {floor}
        {ceiling}
        {labelFormatter}
        {fontSize}
        {polarity}
      />
    {/key}
  {/if}
</g>
