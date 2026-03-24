<script>
  import { scaleLinear } from "d3-scale";
  import { bin, range as d3range } from "d3-array";
  import Axis from "./axis/Axis.svelte";

  let {
    distribution = [],
    min = 0,
    max = 1,
    showXAxis = true,
    showYAxis = true,
    showArrows = true,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    floor = undefined,
    ceiling = undefined,
    nBins = 10,
    padding = 0,
    height = 50,
    polarity = "standard",
    annotationValue = 0,
    annotationText = "",
    labelFormatter = (tick, index, numberOfTicks, values) => {
      return tick;
    },
    containerWidth = $bindable(100),
  } = $props();

  let xTicks = $state([]);
  let yTicks = $state([]);

  $inspect({ xTicks });

  let xTickFirst = $derived(xTicks.length ? xTicks[0] : 0);
  let xTickLast = $derived(xTicks.length ? xTicks.at(-1) : 1);

  let domainXMin = $derived(Math.min(xTickFirst, xTickLast));
  let domainXMax = $derived(Math.max(xTickFirst, xTickLast));

  let yTickFirst = $derived(yTicks.length ? yTicks[0] : 0);
  let yTickLast = $derived(yTicks.length ? yTicks.at(-1) : 1);

  let domainYMin = $derived(Math.min(yTickFirst, yTickLast));
  let domainYMax = $derived(Math.max(yTickFirst, yTickLast));

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(scaleLinear().domain([min, max]).range(useRange));

  const segmentScale = $derived(
    scaleLinear().domain([0, nBins]).range([min, max]),
  );

  const binThresholds = $derived(d3range(1, nBins).map(segmentScale));
  $inspect({ binThresholds });

  const binner = $derived(bin().domain([min, max]).thresholds(binThresholds));

  const bins = $derived(
    polarity === "reverse"
      ? binner(distribution).toReversed()
      : binner(distribution),
  );

  let rr = $derived(bins[0].x0);
  $inspect({ bins });

  const proportionsInBins = $derived(
    bins.map((b) => b.length / distribution.length),
  );

  let proportionInExtremeBins = $derived([
    proportionsInBins[0],
    proportionsInBins.at(-1),
  ]);

  let yScale = $derived(
    scaleLinear()
      .domain([0, Math.max(...bins.map((b) => b.length))])
      .range([0, height]),
  );
</script>

{#key containerWidth}
  <div class="scale-container" bind:clientWidth={containerWidth}>
    <svg
      width={containerWidth - padding}
      height={height + (annotationText ? 25 : 0) + (showXAxis ? 25 : 0)}
      transform="translate({padding / 2},0)"
      style="overflow: visible"
    >
      {#if annotationText}
        <g transform="translate({xScale(annotationValue)},0)">
          <text
            fill="#555555"
            font-size="0.8em"
            text-anchor="middle"
            dominant-baseline="hanging"
          >
            <tspan x="0" dy="0">{annotationText}</tspan>
            <tspan x="0" dy="12">▼</tspan>
          </text>
        </g>
      {/if}

      <g transform="translate(0,{annotationText ? 25 : 0})">
        <g>
          {#if showXAxis}
            <Axis
              bind:ticksArray={xTicks}
              chartHeight={height}
              chartWidth={containerWidth - padding}
              orientation={{ axis: "x", position: "bottom" }}
              domain={[xTickFirst, xTickLast]}
              {min}
              {max}
              range={useRange}
              fontSize={13}
              {floor}
              {ceiling}
              {labelFormatter}
              numberOfTicks={2}
            ></Axis>
          {/if}
          {#if showYAxis}
            <Axis
              bind:ticksArray={yTicks}
              chartHeight={height}
              chartWidth={containerWidth - padding}
              orientation={{ axis: "y", position: "left" }}
              {min}
              {max}
              domain={[0, yTickLast]}
              range={[0, height]}
              fontSize={0}
              numberOfTicks={5}
              tickStrokeWidth={0.25}
              axisStrokeWidth={0}
              gridlines={true}
            ></Axis>
          {/if}
        </g>
        {#each bins as bin, i}
          {#key bin.x0}
            <rect
              x={polarity === "reverse" ? xScale(bin.x1) : xScale(bin.x0)}
              y={height - yScale(bin.length)}
              width={Math.abs(xScale(bin.x1) - xScale(bin.x0))}
              height={yScale(bin.length)}
              fill="grey"
              stroke-width={0}
            ></rect>
          {/key}
        {/each}
      </g>
    </svg>
  </div>
{/key}
