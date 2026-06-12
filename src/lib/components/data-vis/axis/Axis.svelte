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
    chartWidth = 200,
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
    gridlines?: boolean;
    strokeWidth?: number;
    showGridlines?: boolean;
    showTickMarks?: boolean;
    niceTicks?: boolean;
    markerRadius?: number;
    distribution?: number[];
  } = $props();

  let minTick = $derived(ticksArray.length ? Math.min(...ticksArray) : 0);
  let maxTick = $derived(ticksArray.length ? Math.max(...ticksArray) : 1);
  let minValue = $derived(distribution.length ? Math.min(...distribution) : 0);
  let maxValue = $derived(distribution.length ? Math.max(...distribution) : 1);

  let leftPad = $derived(
    niceTicks
      ? polarity === "standard"
        ? minValue < minTick
          ? 0.1
          : 0
        : polarity === "reverse"
          ? maxValue > maxTick
            ? 0.1
            : 0
          : 0
      : polarity === "standard"
        ? minValue < min
          ? 0.1
          : 0
        : polarity === "reverse"
          ? maxValue > max
            ? 0.1
            : 0
          : 0,
  );

  let rightPad = $derived(
    niceTicks
      ? polarity === "standard"
        ? maxValue > maxTick
          ? 0.1
          : 0
        : polarity === "reverse"
          ? minValue < minTick
            ? 0.1
            : 0
          : 0
      : polarity === "standard"
        ? maxValue > max
          ? 0.1
          : 0
        : polarity === "reverse"
          ? minValue < min
            ? 0.1
            : 0
          : 0,
  );

  let widthForTicks = $derived(
    chartWidth - chartWidth * leftPad - chartWidth * rightPad,
  );
  let heightForTicks = $derived(Math.max(0, chartHeight));

  function calculateFullAxisDomain(
    minTick,
    maxTick,
    leftPad,
    rightPad,
    polarity,
  ) {
    const ticksDomainRange = maxTick - minTick;
    const axisDomainRange = ticksDomainRange / (1 - leftPad - rightPad);

    if (polarity === "standard") {
      return [
        minTick - axisDomainRange * leftPad,
        maxTick + axisDomainRange * rightPad,
      ];
    } else {
      return [
        maxTick + axisDomainRange * leftPad,
        minTick - axisDomainRange * rightPad,
      ];
    }
  }

  let fullAxisDomain = $derived(
    calculateFullAxisDomain(minTick, maxTick, leftPad, rightPad, polarity),
  );

  $effect(() => {
    axisDomain = fullAxisDomain;
  });
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
        {#if niceTicks}
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
          />
        {:else}
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
        {/if}
      {/key}
    {/if}
  </g>
</g>
