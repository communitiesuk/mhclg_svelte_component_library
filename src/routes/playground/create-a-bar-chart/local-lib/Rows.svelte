<script>
  let { dataArray, chartHeight } = $props();
  import { scaleLinear } from 'd3-scale';

  import Row from './Row.svelte';
  let yFunction = $derived(scaleLinear().domain(10).range([0, chartHeight]));
  $inspect('n', yFunction(10));
</script>

<g>
  {#each dataArray as row, i}
    <g transform="translate({0},{i * 20})">
      <Row {row}></Row>
    </g>
  {/each}
</g>
