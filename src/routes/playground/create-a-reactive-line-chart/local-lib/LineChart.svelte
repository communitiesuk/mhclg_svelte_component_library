<script>
  // @ts-nocheck
  import Line from '$lib/components/data-vis/line-chart/Line.svelte';
  import { scaleLinear } from 'd3-scale';
  import { curveLinear, line } from 'd3-shape';

  let { data } = $props();

  $inspect(data);

  let svgWidth = $state(),
    svgHeight = 600;

  $inspect(data);

  /*let staticMargin = { top: 10, right: 20, bottom: 20, left: 10 };
  let dynamicMargin = $derived({ top: 0, right: 0, bottom: 0, left: 0 });
  let totalMargin = $derived({
    top: staticMargin.top + dynamicMargin.top,
    right: staticMargin.right + dynamicMargin.right,
    bottom: staticMargin.bottom + dynamicMargin.bottom,
    left: staticMargin.left + dynamicMargin.left,
  });*/
  let totalMargin = { top: 20, right: 50, bottom: 40, left: 50 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allYears = $derived(flatData.map((el) => el.x));

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let xFunction = $derived(
    scaleLinear().domain(yearsMinMax).range([0, chartWidth])
  );

  let allValues = $derived(flatData.map((el) => el.y));

  let valuesMinMax = $derived([Math.min(...allValues), Math.max(...allValues)]);

  let yFunction = $derived(
    scaleLinear().domain(valuesMinMax).range([chartHeight, 0])
  );

  let lineFunction = $derived(
    line()
      .x((d) => xFunction(d.x))
      .y((d) => yFunction(d.y))
      .curve(curveLinear)
  );
</script>

<div bind:clientWidth={svgWidth}>
  <svg
    width="{svgWidth}px"
    height="{svgHeight}px"
    style="background-color: #f5f5f5"
  >
    {#if svgWidth}
      <g transform="translate({totalMargin.left},{totalMargin.top})">
        <g data-role="x-axis">
          <path d="M0 0 l0 {chartHeight}" stroke="black" stroke-width="2px"
          ></path>
        </g>
        <g data-role="y-axis">
          <path
            d="M0 {chartHeight} l{chartWidth} 0"
            stroke="black"
            stroke-width="2px"
          ></path>
        </g>

        <g data-role="lines-group">
          {#each data.lines as line}
            <Line {xFunction} {yFunction} {lineFunction} dataArray={line.data}
            ></Line>
          {/each}
        </g>
      </g>
    {/if}
  </svg>
</div>
