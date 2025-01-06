<script>
  // import the external components
  import Axes from './external/Axes.svelte';
  import Circle from './external/Circle.svelte';
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

  let numberOfRows = 3;
  let timesToBeRendered = 3;
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

          <!--
            
            Render n rows
          -->
          <!-- {#each { length: numberOfRows } as _, i}
            <Row></Row>
          {/each} -->

          <Row></Row>

          {#each Array(timesToBeRendered) as _, index}
            <Circle key={index} />
          {/each}

          <!-- {#each { length: numberOfRows } as _, i}
            <rect
              width="200"
              height="100"
              x="10"
              y="10"
              rx="20"
              ry="20"
              fill="blue"
              transform="translate(0 {i * 120})"
            />
          {/each} -->

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
