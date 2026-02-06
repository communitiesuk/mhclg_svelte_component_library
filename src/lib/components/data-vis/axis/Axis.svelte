<script lang="ts">
  import {
    scaleLinear,
    scaleLog,
    scaleTime,
    type ScaleLinear,
    type ScaleLogarithmic,
    type scaleMin,
  } from "d3-scale";
  import Ticks from "./Ticks.svelte";

  // --- Types (numeric-only) ---
  type AxisName = "x" | "y";
  type AxisPosition = "bottom" | "top" | "left" | "right";

  type Orientation = {
    axis: AxisName;
    position: AxisPosition;
  };

  type XScaleType = "scaleLinear()" | "scaleLog()";

  // Project a numeric data value -> pixel
  type AxisProjector = (value: number) => number;

  // Optional tick label formatter
  type LabelFormatter = (tick: number, index: number) => string | number;

  // --- Props ---
  let {
    chartHeight = 100,
    chartWidth = $bindable<number>(200),

    numberOfTicks = undefined as number | undefined,

    // Parent can bind to this; Ticks can also update it
    ticksArray = $bindable<number[] | undefined>(undefined),

    // Scale selection for X (numeric only)
    xScaleType = "scaleLinear()" as XScaleType,

    // Values to derive ticks from if ticksArray not provided
    values = undefined as number[] | undefined,

    // Axis orientation
    orientation = { axis: "x", position: "bottom" } as Orientation,

    // Domain hints
    floor = undefined as number | undefined,
    ceiling = undefined as number | undefined,

    // Paddings
    paddingTop = 100,
    paddingBottom = 100,
    paddingLeft = 0,
    paddingRight = 0,

    // Optional label formatter
    labelFormatter = undefined as LabelFormatter | undefined,

    // For demos; not directly used here
    demoScreenWidth = 1000,

    // Default axis projector functions (computed below)
    xFunction = (number) => {
      return {
        "scaleLinear()": scaleLinear(),
        "scaleLog()": scaleLog(),
        "scaleTime()": scaleTime(),
      }[xScaleType]
        .domain([Math.min(...ticksArray), Math.max(...ticksArray)])
        .range([0, chartWidth - paddingLeft - paddingRight])(number);
    },

    yFunction = ((v: number) => {
      // Y uses linear by default (numeric-only)
      const scale: ScaleLinear<number, number> = scaleLinear<number, number>();

      const arr = ticksArray ?? values;
      const domainMin =
        floor ??
        (arr && arr.length ? arr.reduce((a, b) => (a < b ? a : b)) : 0);
      const domainMax =
        ceiling ??
        (arr && arr.length ? arr.reduce((a, b) => (a > b ? a : b)) : 1);

      scale.domain([domainMin, domainMax]);

      // Range for Y: top->bottom
      scale.range([0, Math.max(0, chartHeight - paddingTop - paddingBottom)]);
      return scale(v);
    }) as AxisProjector,

    // Axis function is derived from orientation by default
    axisFunction = (orientation?.axis === "x"
      ? xFunction
      : yFunction) as AxisProjector,
  }: {
    chartHeight?: number;
    chartWidth?: number;

    numberOfTicks?: number;

    ticksArray?: number[]; // bindable

    xScaleType?: XScaleType;

    values?: number[];

    orientation?: Orientation;

    floor?: number;
    ceiling?: number;

    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;

    labelFormatter?: LabelFormatter;

    demoScreenWidth?: number;

    xFunction?: AxisProjector;
    yFunction?: AxisProjector;
    axisFunction?: AxisProjector;
  } = $props();
</script>

<g
  data-role="{orientation.axis}-axis"
  transform="translate({orientation.position !== 'right'
    ? 0
    : chartWidth},{orientation.position === 'bottom' ? chartHeight : 0})"
>
  <line
    x1="0"
    y1="0"
    x2={orientation.axis === "x" ? chartWidth : 0}
    y2={orientation.axis === "y" ? chartHeight : 0}
    stroke="black"
    stroke-width="2px"
  ></line>

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
    />
  {/key}
</g>
