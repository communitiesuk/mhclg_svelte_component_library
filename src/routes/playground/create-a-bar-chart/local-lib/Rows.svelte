<script>
  let { dataArray } = $props();
  import Row from './Row.svelte';
</script>

{#each dataArray as row, i}
  <g transform="translate({0},{i * 50})">
    <Row {row}></Row>
  </g>
{/each}
