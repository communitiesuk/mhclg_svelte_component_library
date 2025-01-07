<script>
  let { dataArray, chartHeight, chartWidth, focusColour, focusBars } = $props();
  import { scaleLinear } from 'd3-scale';

  import Row from './Row.svelte';
  let barHeight = $derived(chartHeight / dataArray.length / 2);

  let quarterSpace = $derived(barHeight / 2);

  let yFunction = $derived(
    scaleLinear()
      .domain([0, dataArray.length])
      .range([quarterSpace, chartHeight + quarterSpace])
  );

  let allValues = $derived(dataArray.map((el) => el.y));

  let valueMax = $derived(Math.max(...allValues));

  let xFunction = $derived(
    scaleLinear().domain([0, valueMax]).range([0, chartWidth])
  );

  //let sortedArray = $derived(dataArray.slice().sort((a, b) => a.y - b.y));
</script>

<g>
  {#each dataArray as row, i}
    <g transform="translate({0},{yFunction(i)})">
      <Row {row} {xFunction} {barHeight} {focusColour} {focusBars}></Row>
    </g>
  {/each}
</g>
