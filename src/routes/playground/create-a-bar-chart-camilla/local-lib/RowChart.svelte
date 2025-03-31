<script>
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import { svgWidthCategoryToRowLabelPermutationsLookup } from "../local-config.js";
  import { calculateLabelSplitsAndSpace } from "../local-utils/calculateLabelSplitsAndSpace.js";
  import { categoriseContainerWidth } from "../local-utils/categoriseContainerWidth.js";
  import Axes from "./external/Axes.svelte";
  import Legend from "./external/Legend.svelte";
  import Source from "./external/Source.svelte";
  import Ticks from "./rowComponents/Ticks.svelte";
  import TitleAndSubtitle from "./external/TitleAndSubtitle.svelte";
  import Row from "./Row.svelte";
  import { scaleLinear } from "d3-scale";
  import * as d3 from "d3";

<<<<<<<< HEAD:src/routes/playground/create-a-bar-chart-using-url/local-lib/RowChart.svelte
  let { dataArray } = $props();

  // $inspect(dataArray);
========
  let { dataArray, numberOfTicks } = $props();
>>>>>>>> ticks_camila_andrew_pc:src/routes/playground/create-a-bar-chart-camilla/local-lib/RowChart.svelte

  $inspect(numberOfTicks);
  let svgWidth = $state(),
    svgHeight = 500;

  let requiredSpaceForLabelsArray = $state(new Array(dataArray.length));
<<<<<<<< HEAD:src/routes/playground/create-a-bar-chart-using-url/local-lib/RowChart.svelte
  // $inspect(requiredSpaceForLabelsArray);
========
  //$inspect(requiredSpaceForLabelsArray);
>>>>>>>> ticks_camila_andrew_pc:src/routes/playground/create-a-bar-chart-camilla/local-lib/RowChart.svelte

  let filteredRequiredSpaceForLabelsArray = $derived(
    requiredSpaceForLabelsArray.filter((el) => el !== undefined),
  );

  let requiredSpaceForLabels = $derived(
    filteredRequiredSpaceForLabelsArray.length > 0
      ? Math.max(...filteredRequiredSpaceForLabelsArray)
      : 100,
  );

  let totalMargin = $derived({
    top: 50,
    right: 50,
    bottom: 20,
    left: requiredSpaceForLabels + 15,
  });

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  /*let svgWidthCategory = $derived(
    svgWidth ??
      categoriseContainerWidth(defaultScreenWidthBreakpoints, svgWidth)
  );

  $inspect(svgWidthCategory);

  let [dataArrayWithSplitLabels, spaceForLabels] = $derived(
    svgWidth ??
      calculateLabelSplitsAndSpace(
        svgWidthCategoryToRowLabelPermutationsLookup[svgWidthCategory],
        dataArray
      )
  );*/

  let allXValues = $derived(dataArray.map((el) => el.y));

  let rowHeight = $derived((chartHeight - 20) / dataArray.length);

  let ticksArray = $state();

  let yFunction = $derived(
    ticksArray != null
      ? scaleLinear()
          .domain([Math.min(...ticksArray), Math.max(...ticksArray)])
          .range([0, chartWidth])
      : null,
  );
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
          {#if yFunction}
            <Axes {chartHeight} {chartWidth} {yFunction}></Axes>
          {/if}
          {#key numberOfTicks}
            <Ticks
              bind:ticksArray
              {chartWidth}
              {yFunction}
              {allXValues}
              {numberOfTicks}
            ></Ticks>
          {/key}
          {#if yFunction}
            {#each dataArray as row, i}
              <g transform="translate({0},{rowHeight * (i + 0.5) + 10})">
                <Row
                  {row}
                  {yFunction}
                  {rowHeight}
                  {chartWidth}
                  bind:requiredSpaceForLabel={requiredSpaceForLabelsArray[i]}
                ></Row>
              </g>
            {/each}
          {/if}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
