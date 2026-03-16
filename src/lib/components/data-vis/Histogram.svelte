<script>

  import { math } from "@maptiler/sdk";
import { scaleLinear } from "d3-scale";

  let {
    dist = [],
    showXAxis = true,
    showYAxis = true,
    showArrows = true,
    midColor = "#DDDDDD",
    startColor = "#B70000",
    endColor = "#2D6644",
    thresholds = 10,
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

  let xTickMin = $derived(xTicks.length ? Math.min(...xTicks) : Math.min(dist));
  let xTickMax = $derived(xTicks.length ? Math.max(...xTicks) : Math.max(dist));
  let yTickMin = $derived(yTicks.length ? Math.min(...yTicks) : 0);
  let yTickMax = $derived(xTicks.length ? Math.max(...xTicks) : 1);

  let useRange = $derived(
    polarity === "standard"
      ? [0, containerWidth - padding]
      : [containerWidth - padding, 0],
  );

  let xScale = $derived(
    scaleLinear().domain([xTickMin, xTickMax]).range(useRange),
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
              domain={[xTickMin, xTickMax]}
              range={useRange}
              values={dist}
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
              domain={[0, yTickMax]}
              range={[height, 0]}
              values={[...dist, 0]}
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
              y={height - yScale(bin.count)}
              width={Math.abs(xScale(bin.x1) - xScale(bin.x0))}
              height={yScale(bin.count)}
              fill={interpolatedColors[i]}
              stroke-width={i === highlightIndex ? 0 : 0}
            ></rect>
          {/key}
        {/each}
        </g>
      </g>
    </svg>
  </div>
{/key}