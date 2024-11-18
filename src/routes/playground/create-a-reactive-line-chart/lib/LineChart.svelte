<script>
  // @ts-nocheck
  import { scaleLinear } from 'd3-scale';

  let { data } = $props();

  $inspect(data);

  let svgWidth = $state(),
    svgHeight = 600;

  let staticMargin = { top: 10, right: 20, bottom: 20, left: 10 };
  let dynamicMargin = $derived({ top: 0, right: 0, bottom: 0, left: 0 });
  let totalMargin = $derived({
    top: staticMargin.top + dynamicMargin.top,
    right: staticMargin.right + dynamicMargin.right,
    bottom: staticMargin.bottom + dynamicMargin.bottom,
    left: staticMargin.left + dynamicMargin.left,
  });

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  $inspect(totalMargin);

  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allYears = $derived(
    flatData
      .map((el) => parseFloat(el.yearInt))
      .filter((el) => el && isFinite(el))
  );

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  let x = $derived(scaleLinear().domain(yearsMinMax).range([0, 500]));

  $inspect(x(2018), x(2019), x(2020));

  let allValues = $derived(
    flatData
      .map((el) => parseFloat(el.Value))
      .filter((el) => el && isFinite(el))
  );

  $inspect(allValues);

  let valuesMinMax = $derived([Math.min(...allValues), Math.max(...allValues)]);

  let y = $derived(
    scaleLinear()
      .domain([valuesMinMax[0], valuesMinMax[1]])
      .range([chartHeight, 0])
  );

  $inspect(yearsMinMax);

  $inspect(y(50));
</script>

<svg
  width="100%"
  height="{svgHeight}px"
  style="background-color: #ffe6ee"
  bind:clientWidth={svgWidth}
>
  {#if svgWidth}
    <g transform="translate({totalMargin.left},{totalMargin.top})">
      <line
        x1={100}
        x2={100}
        y1={300}
        y2={100}
        stroke="black"
        stroke-width="2px"
      ></line>
    </g>
  {/if}
</svg>
