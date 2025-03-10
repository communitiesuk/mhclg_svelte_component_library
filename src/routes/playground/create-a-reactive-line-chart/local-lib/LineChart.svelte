<script>
  // @ts-nocheck
  import CategoryLabel from "$lib/components/data-vis/line-chart/CategoryLabel.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  import { scaleLinear } from "d3-scale";
  import { curveLinear, line } from "d3-shape";
  import { highlight } from "$lib/utils/syntax-highlighting/shikiHighlight";

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
  let totalMargin = { top: 20, right: 150, bottom: 40, left: 50 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allYears = $derived(flatData.map((el) => el.x));

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let xFunction = $derived(
    scaleLinear().domain(yearsMinMax).range([0, chartWidth]),
  );

  let allValues = $derived(flatData.map((el) => el.y));

  let valuesMinMax = $derived([Math.min(...allValues), Math.max(...allValues)]);

  let yFunction = $derived(
    scaleLinear().domain(valuesMinMax).range([chartHeight, 0]),
  );

  let lineFunction = $derived(
    line()
      .x((d) => xFunction(d.x))
      .y((d) => yFunction(d.y))
      .curve(curveLinear),
  );

  let selectedAreaCode = $state("E07000223");
</script>

<h3>Example Usage</h3>
<pre><code use:highlight
    >{`
<script>
  import LineChart from './LineChart.svelte';
  
  const data = {
    lines: [
      {
        areaCode: "E07000223",
        data: [
          { x: 2019, y: 45 },
          { x: 2020, y: 72 },
          { x: 2021, y: 89 }
        ]
      }
    ]
  };
<\/script>

<LineChart {data} />
`}</code
  ></pre>

<div bind:clientWidth={svgWidth}>
  <svg
    width={svgWidth ?? 400}
    height={svgHeight}
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
          {#each data.lines as line, i}
            <Line
              {lineFunction}
              dataArray={line.data}
              pathStrokeColor="black"
              pathStrokeWidth="1"
              opacity="0.15"
              dataId={line.areaCode}
              onMouseMove={() => {
                selectedAreaCode = line.areaCode;
              }}
            ></Line>
          {/each}
          <g>
            <Line
              {lineFunction}
              dataArray={data.lines.find(
                (el) => el.areaCode === selectedAreaCode,
              ).data}
              pathStrokeColor="red"
              pathStrokeWidth="5"
              opacity="1"
              includeMarkers={true}
              markerRadius="8"
              markerStroke="red"
              markerFill="white"
              {xFunction}
              {yFunction}
            ></Line>
            <CategoryLabel
              {chartWidth}
              {lineFunction}
              dataArray={data.lines.find(
                (el) => el.areaCode === selectedAreaCode,
              ).data}
              {xFunction}
              {yFunction}
              text="hello"
            ></CategoryLabel>
          </g>
        </g>
      </g>
    {/if}
  </svg>
</div>
