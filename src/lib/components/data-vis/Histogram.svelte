<script>
  import { scaleLinear } from "d3-scale";
  import { bin, range } from "d3-array";
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
    nBins = 10,
    padding = 0,
    height = 50,
    polarity = "standard",
    annotationValue = 0,
    annotationText = "",
    labelFormatter = (tick, index, numberOfTicks, values) => {
      return tick;
    },
  } = $props();

  let containerWidth = $state(100);

  let xTicks = $state([]);
  let yTicks = $state([]);

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : 0);
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 1);
  let yTickMin = $derived(yTicks.length ? Math.min(...yTicks) : 0);
  let yTickMax = $derived(yTicks.length ? Math.max(...yTicks) : 1);

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    scaleLinear().domain([xTickMin, xTickMax]).range(useRange),
  );

  let thresholds = $derived(
    range(xTickMin, xTickMax, (xTickMax - xTickMin) / nBins),
  );

  let binX = $derived(
    bin().domain([xTickMin, xTickMax]).thresholds(thresholds),
  );

  let bins = $derived(binX(distribution));

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
              domain={[min, max]}
              range={useRange}
              min={xTickMin}
              max={xTickMax}
              fontSize={13}
              floor={xTickMin}
              ceiling={xTickMax}
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
              domain={[0, yTickMax]}
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
