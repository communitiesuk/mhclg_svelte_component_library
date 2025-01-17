<script>
  import { defaultScreenWidthBreakpoints } from '$lib/config.js';
  import { svgWidthCategoryToRowLabelPermutationsLookup } from '../local-config.js';
  import { calculateLabelSplitsAndSpace } from '../local-utils/calculateLabelSplitsAndSpace.js';
  import { categoriseContainerWidth } from '../local-utils/categoriseContainerWidth.js';
  import Axes from './external/Axes.svelte';
  import Legend from './external/Legend.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  let { dataArray } = $props();

  let storted = $state(false);

  let orderedData = storted
    ? new Map([...dataArray.entries()].sort((a, b) => a.y - b.y))
    : dataArray;

  $inspect(dataArray);
  $inspect(storted);

  let svgWidth = $state(),
    svgHeight = 500;

  let totalMargin = { top: 40, right: 50, bottom: 20, left: 250 };

  let chartWidth = $derived(svgWidth - totalMargin.left - totalMargin.right);
  let chartHeight = $derived(svgHeight - totalMargin.top - totalMargin.bottom);

  let rowHeight = $derived(chartHeight / dataArray.length);
  let maxValue = $derived(Math.max(...dataArray.map((item) => item.y)));
  let svgWidthCategory = $derived(
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
  );

  $inspect(dataArrayWithSplitLabels);
</script>

<div class="mt-10">
  <TitleAndSubtitle></TitleAndSubtitle>
  <p>Order</p>
  <input type="checkbox" bind:checked={storted} onchange={orderedData} />
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

          {#each orderedData as row, i}
            {@const rowWidth = +row.y * (chartWidth / maxValue)}
            <g transform="translate({0},{i * rowHeight})">
              <Row {row} {rowHeight} {rowWidth}></Row>
            </g>
          {/each}
        </g>
      {/if}
    </svg>
    <Source></Source>
  </div>
</div>
