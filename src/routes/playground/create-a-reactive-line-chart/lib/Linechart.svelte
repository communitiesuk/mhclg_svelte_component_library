<script>
  import { scaleLinear } from 'd3-scale';

  let { data, selectedMetric } = $props();
  $inspect(data);
  $inspect(selectedMetric);
  let flatData = $derived(data.lines.map((el) => el.data).flat());

  let allValues = $derived(
    flatData
      .map((el) => parseFloat(el.Value))
      .filter((el) => el && isFinite(el))
  );

  let allYears = $derived(
    flatData
      .map((el) => parseFloat(el.yearInt))
      .filter((el) => el && isFinite(el))
  );

  let yearsMinMax = $derived([Math.min(...allYears), Math.max(...allYears)]);

  $inspect(flatData);
  $inspect(allValues);

  let chartWidth = 200;
  let chartHeight = 200;

  let x = $derived(scaleLinear().domain(yearsMinMax).range([0, chartWidth]));
  let y = $derived(scaleLinear().domain(yearsMinMax).range([chartHeight, 0]));
</script>

<div>
  {#if data}
    <svg width="600" height="600">
      <line
        x1={100}
        x2={100}
        y1={300}
        y2={100}
        stroke={'black'}
        stroke-width="2px"
      ></line>
    </svg>
  {/if}
</div>
