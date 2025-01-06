<script>
  let { dataArray, chartHeight } = $props();
  import { scaleLinear } from 'd3-scale';

  import Row from './Row.svelte';
  let yFunction = $derived(
    scaleLinear().domain([0, dataArray.length]).range([0, chartHeight])
  );
</script>

<g>
  {#each dataArray as row, i}
    <g transform="translate({0},{yFunction(i)})">
      <Row {row}></Row>
    </g>
  {/each}
</g>
