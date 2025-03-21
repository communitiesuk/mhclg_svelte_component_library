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

  let { dataArray } = $props();

  let svgWidth = $state(),
    svgHeight = 500;

  let requiredSpaceForLabelsArray = $state(new Array(dataArray.length));
  //$inspect(requiredSpaceForLabelsArray);

  let filteredRequiredSpaceForLabelsArray = $derived(
    requiredSpaceForLabelsArray.filter((el) => el !== undefined),
  );

  let requiredSpaceForLabels = $derived(
    filteredRequiredSpaceForLabelsArray.length > 0
      ? Math.max(...filteredRequiredSpaceForLabelsArray)
      : 100,
  );

  let totalMargin = $derived({
    top: 40,
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

  let yFunction = $derived(
    scaleLinear()
      .domain([Math.min(...allXValues), Math.max(...allXValues)])
      .range([0, chartWidth]),
  );

  let rowHeight = $derived((chartHeight - 20) / dataArray.length);

  //Tick based on width
  function generateTicks(data, numTicks) {
    let minVal = Math.min(...data);
    let maxVal = Math.max(...data);
    let rangeVal = maxVal - minVal;

    let roughStep = rangeVal / (numTicks - 1);
    let normalizedSteps = [1, 2, 5, 10];

    let stepPower = Math.pow(10, -Math.floor(Math.log10(roughStep)));
    let normalizedStep = roughStep * stepPower;
    let optimalStep =
      normalizedSteps.find((step) => step >= normalizedStep) / stepPower;

    let scaleMin = Math.floor(minVal / optimalStep) * optimalStep;
    let scaleMax = Math.ceil(maxVal / optimalStep) * optimalStep;

    let ticks = [];
    for (let i = scaleMin; i <= scaleMax; i += optimalStep) {
      ticks.push(i);
    }

    return ticks;
  }

  let ticksArray = $derived(generateTicks(allXValues, 15));
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
          <Ticks {ticksArray} {chartWidth} {yFunction}></Ticks>
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
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
