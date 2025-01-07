<script>
  // import the external components
  import Axes from './external/Axes.svelte';
  import Legend from './external/Legend.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  // dataArray and numberOfBars are inputs to the RowChart component
  let { dataArray, numberOfBars } = $props();

  $inspect(dataArray);

  // UI reacts when svgWidth changes
  let svgWidth = $state(),
    svgHeight = 500;

  // setting some margin variable
  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

  // chartWidth is derived because it is liable to change
  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let rowHeight = $derived(chartHeight / numberOfBars);
</script>

<div class="mt-10">
  <TitleAndSubtitle></TitleAndSubtitle>
  <Legend></Legend>
  <!--whenever svgWidth changes it is binded to the clientWidth-->
  <!--clientWidth is the size of the window-->
  <div bind:clientWidth={svgWidth}>
    <!--the width attribute of svg is set to svgWidth or 400 (if it's null)-->
    <svg
      width={svgWidth ?? 400}
      height={svgHeight}
      style="background-color: #f5f5f5"
    >
      <!--if svgWidth has a value then do the following-->
      {#if svgWidth}
        <g transform="translate({totalMargin.left},{totalMargin.top})">
          <Axes {chartHeight} {chartWidth}></Axes>

          {#each { length: numberOfBars } as _, i}
            <g transform="translate(0,{i * rowHeight})">
              <Row {rowHeight}></Row>
            </g>
          {/each}

          <!--i represents the current data point-->
          {#each dataArray as row, i}
            <g transform="translate({0},{0})">
              <!-- <Row {row}></Row> -->
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
