<script>
  let { dataArray, chartHeight, chartWidth } = $props();
  import { scaleLinear } from 'd3-scale';

  import Row from './Row.svelte';
  let yFunction = $derived(
    scaleLinear().domain([0, dataArray.length]).range([0, chartHeight])
  );

  let allValues = $derived(dataArray.map((el) => el.y));

  let valueMax = $derived(Math.max(...allValues));

  let xFunction = $derived(
    scaleLinear().domain([0, valueMax]).range([0, chartWidth])
  );
</script>

<g>
  {#each dataArray as row, i}
    <g transform="translate({0},{yFunction(i)})">
      <Row {row} {xFunction}></Row>
    </g>
  {/each}
</g>
