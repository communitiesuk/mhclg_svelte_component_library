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
    axisDomain = $bindable<number[]>([]),
    ticksArray = $bindable<number[]>([]),
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
    scale = undefined as ScaleContinuousNumeric<number, number> | undefined,
    domain = undefined as [number, number] | undefined,
    range = undefined as [number, number] | undefined,
    fontSize = 19,
    polarity = "standard",
    showGridlines = false,
    showTickMarks = false,
    strokeWidth = 2,
    niceTicks = true,
    markerRadius = 0 as number,
    distribution = [],
  }: {
    chartHeight?: number;
    chartWidth?: number;
    numberOfTicks?: number;
    axisDomain?: number[];
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
    scale?: ScaleContinuousNumeric<number, number>;
    domain?: [number, number];
    range?: [number, number];
    fontSize?: number;
    polarity?: Polarity;
    gridlines?: Boolean;
    strokeWidth?: number;
    showGridlines?: Boolean;
    showTickMarks?: Boolean;
    niceTicks?: Boolean;
    markerRadius?: number;
    distribution?: number[];
  } = $props();

  let minTick = $derived(Math.min(...ticksArray));
  let maxTick = $derived(Math.max(...ticksArray));
  let minValue = $derived(Math.min(...distribution));
  let maxValue = $derived(Math.max(...distribution));

  let leftPad = $derived(
    polarity === "standard"
      ? minValue < minTick
        ? 0.1
        : 0
      : polarity === "reverse"
        ? maxValue > maxTick
          ? 0.1
          : 0
        : 0,
  );

  let rightPad = $derived(
    polarity === "standard"
      ? maxValue > maxTick
        ? 0.1
        : 0
      : polarity === "reverse"
        ? minValue < minTick
          ? 0.1
          : 0
        : 0,
  );

  let widthForTicks = $derived(
    chartWidth - chartWidth * leftPad - chartWidth * rightPad,
  );
  let heightForTicks = $derived(Math.max(0, chartHeight));

  // function computeDefaultDomain(): [number, number] {
  //   const arr =
  //     (ticksArray && ticksArray.length ? ticksArray : [min, max]) ?? [];
  //   const dMin =
  //     floor ?? (arr.length ? arr.reduce((a, b) => (a < b ? a : b)) : 0);
  //   const dMax =
  //     ceiling ?? (arr.length ? arr.reduce((a, b) => (a > b ? a : b)) : 1);
  //   return [dMin, dMax];
  // }

  // const tickDomain = $derived([minTick, maxTick]);
  // let tickRange = $derived(
  //   orientation.axis === "x" ? [0, widthForTicks] : [heightForTicks, 0],
  // );

  function calculateFullAxisDomain(
    minTick,
    maxTick,
    leftPad,
    rightPad,
    polarity,
  ) {
    const ticksDomainRange = maxTick - minTick;

    if (polarity === "standard") {
      return [
        minTick - ticksDomainRange * leftPad,
        maxTick + ticksDomainRange * rightPad,
      ];
    } else {
      return [
        maxTick + ticksDomainRange * leftPad,
        minTick - ticksDomainRange * rightPad,
      ];
    }
  }

  let fullAxisDomain = $derived(
    calculateFullAxisDomain(minTick, maxTick, leftPad, rightPad, polarity),
  );

  $effect(() => {
    axisDomain = fullAxisDomain;
  });

  // const resolvedScale = $derived(() => {
  //   const base: ScaleContinuousNumeric<number, number> = scale
  //     ? scale.copy()
  //     : scaleLinear<number, number>();

  //   base.domain(fullAxisDomain);

  //   base.range(chartWidth);

  //   return base;
  // });

  // const axisFunction: AxisProjector = $derived((v: number) => resolvedScale(v));
</script>

<g
  data-role="{orientation.axis}-axis"
  transform="translate({orientation.position !== 'right'
    ? 0
    : chartWidth},{orientation.position === 'bottom' ? chartHeight : 0})"
>
  <line
    x1={markerRadius ?? 0}
    y1="0"
    x2={orientation.axis === "x"
      ? markerRadius
        ? chartWidth + markerRadius
        : chartWidth
      : 0}
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
          tickWidth={widthForTicks}
          chartHeight={heightForTicks}
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
