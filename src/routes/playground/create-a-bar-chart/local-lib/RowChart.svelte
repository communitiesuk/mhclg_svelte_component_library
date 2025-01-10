<script>
  import Axes from './external/Axes.svelte';
  import Legend from './external/Legend.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  let { dataArray, sortOrder, colouredBars } = $props();

  //Apply the sortOrder - note that I had to copy [...] the dataArray to use it - "Svelte will disallow state changes (e.g. count++) inside derived expressions."
  let sortedData = $derived(
    [...dataArray].sort((a, b) =>
      sortOrder === 'ascending'
        ? (a.y ?? Infinity) - (b.y ?? Infinity)
        : sortOrder === 'descending'
          ? (b.y ?? -Infinity) - (a.y ?? -Infinity)
          : null
    )
  );

  $inspect(sortedData, sortOrder);

  //Find the maximum value for scaling - need to get all the values and then do some cleaning before getting the max
  let rowData = $derived(dataArray.map((d) => d.y).filter((d) => d));
  let rowMax = $derived(Math.max(...rowData));

  let svgWidth = $state(),
    svgHeight = 500;

  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);
</script>

<div class="mt-10">
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

          {#each sortedData as row, i}
            {@const rowHeight = chartHeight / rowData.length}
            <g transform="translate({0},{rowHeight / 2 + i * rowHeight})">
              <Row {chartWidth} {row} {rowMax} {rowHeight} {colouredBars}></Row>
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
