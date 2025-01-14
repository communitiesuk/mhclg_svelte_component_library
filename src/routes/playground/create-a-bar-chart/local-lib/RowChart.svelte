<script>
  // import the external components
  import Axes from './external/Axes.svelte';
  import Button from './external/Button.svelte';
  import Legend from './external/Legend.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  // dataArray is an input to the RowChart component
  let { dataArray } = $props();

  $inspect(dataArray);

  // UI reacts when svgWidth changes
  let svgWidth = $state(),
    svgHeight = 500;

  // setting some margin variable
  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

  // chartWidth is derived because it is liable to change
  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let rowHeight = $derived(chartHeight / dataArray.length);

  let maxValue = $derived(Math.max(...dataArray.map((item) => item.y)));

  let highestToLowest = $state(false);
  let lowestToHighest = $state(false);

  let orderedDataArray = $derived(
    highestToLowest
      ? [...dataArray.sort((a, b) => a.y - b.y)]
      : lowestToHighest
        ? [...dataArray.sort((a, b) => b.y - a.y)]
        : dataArray
  );

  $inspect(orderedDataArray, highestToLowest, lowestToHighest);
</script>

<div class="mt-10">
  <TitleAndSubtitle></TitleAndSubtitle>
  <Legend></Legend>
  <Button
    buttonText={'Highest to lowest'}
    onClick={() => (highestToLowest = true) && (lowestToHighest = false)}
    {dataArray}
  ></Button>
  <Button
    buttonText={'Lowest to highest'}
    onClick={() => (lowestToHighest = true) && (highestToLowest = false)}
    {dataArray}
  ></Button>
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

          <!--i represents the current data point-->
          {#each orderedDataArray as row, i}
            {@const rowWidth = +row.y * (chartWidth / maxValue)}
            {@const rowLabel = row.areaCode}
            {@const rowValue = +row.y}
            <g transform="translate(-100,{i * rowHeight})">
              <!--{rowHeight} is short hand for rowHeight = {rowHeight}-->
              <Row {rowHeight} {rowWidth} {rowLabel} {rowValue}></Row>
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
