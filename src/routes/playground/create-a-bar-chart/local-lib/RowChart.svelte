<script>
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import { svgWidthCategoryToRowLabelPermutationsLookup } from "../local-config.js";
  import { calculateLabelSplitsAndSpace } from "../local-utils/calculateLabelSplitsAndSpace.js";
  import { categoriseContainerWidth } from "../local-utils/categoriseContainerWidth.js";
  import Axes from "./external/Axes.svelte";
  import Legend from "./external/Legend.svelte";
  import Source from "./external/Source.svelte";
  import TitleAndSubtitle from "./external/TitleAndSubtitle.svelte";
  import Row from "./Row.svelte";
  import { scaleLinear } from "d3-scale";

  let { dataArray } = $props();

  $inspect(dataArray);

  let svgWidth = $state(),
    svgHeight = 500;

  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

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

  let yFunction = $derived(
    scaleLinear()
      .domain([Math.min(...allXValues), Math.max(...allXValues)])
      .range([0, chartWidth]),
  );

  let rowHeight = $derived((chartHeight - 20) / dataArray.length);
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
          <Axes {chartHeight} {chartWidth} {yFunction}></Axes>

          {#each dataArray as row, i}
            <g transform="translate({0},{rowHeight * (i + 0.5) + 10})">
              <Row {row} {yFunction} {rowHeight} {chartWidth}></Row>
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
