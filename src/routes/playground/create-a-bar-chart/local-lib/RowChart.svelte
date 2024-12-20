<script>
  import Axes from './external/Axes.svelte';
  import Legend from './external/Legend.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  // dataArray is an input to the RowChart component
  let { dataArray } = $props();

  $inspect(dataArray);

  // UI reacts when svgWidth changes
  // but I don't understand the syntax after state
  let svgWidth = $state(),
    svgHeight = 500;

  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);
</script>

<div class="mt-10">
  <p>this is the Row Chart component</p>
  <Row></Row>
  <TitleAndSubtitle></TitleAndSubtitle>
  <Legend></Legend>
  <div bind:clientWidth={svgWidth}>
    <svg
      width={svgWidth ?? 400}
      height={svgHeight}
      style="background-color: #f5f5f5"
    >
      {#if svgWidth}
        <g transform="translate({totalMargin.left},{totalMargin.top})">
          <Axes {chartHeight} {chartWidth}></Axes>

          {#each dataArray as row, i}
            <g transform="translate({0},{0})">
              <Row {row}></Row>
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
