<script>
  let { dataArray, chartHeight, chartWidth, focusColour, focusBars } = $props();
  import { scaleLinear } from 'd3-scale';

  import Row from './Row.svelte';
  dataArray.forEach((el, index) => {
    if (index % 2 === 1) {
      el.y = -el.y;
    }
  });

  let barHeight = $derived(chartHeight / dataArray.length / 2);

  let quarterSpace = $derived(barHeight / 2);

  let yFunction = $derived(
    scaleLinear()
      .domain([0, dataArray.length])
      .range([quarterSpace, chartHeight + quarterSpace])
  );

  let allValues = $derived(dataArray.map((el) => el.y));

  $inspect(allValues);

  let valueMax = $derived(Math.max(...allValues));
  let valueMin = $derived(Math.min(...allValues));
  let valueRange = $derived(Math.abs(valueMax) + Math.abs(valueMin));
  let midpoint = $derived(valueMin + valueRange / 2);
  $inspect(midpoint);

  let xFunction = $derived(
    scaleLinear()
      .domain([midpoint, valueMax])
      .range([chartWidth / 2, chartWidth])
  );
</script>

<g>
  {#each dataArray as row, i}
    <g transform="translate({0},{yFunction(i)})">
      <Row {row} {xFunction} {barHeight} {focusColour} {focusBars}></Row>
    </g>
  {/each}
</g>
