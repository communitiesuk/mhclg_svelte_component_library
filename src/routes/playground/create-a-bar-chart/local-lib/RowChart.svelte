<script>
  // import the external components
  import Axes from './external/Axes.svelte';
  import Button from './external/Button.svelte';
  import Legend from './external/Legend.svelte';
  import Line from './external/Line.svelte';
  import Source from './external/Source.svelte';
  import TitleAndSubtitle from './external/TitleAndSubtitle.svelte';
  import Row from './Row.svelte';

  // dataArray is an input to the RowChart component
  let { dataArray, inputSelectedArea, localAuthorityCodeLookup } = $props();

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
  let minValue = $derived(Math.min(...dataArray.map((item) => item.y)));

  let minValueAbsolute = $derived(
    Math.abs(Math.min(...dataArray.map((item) => item.y)))
  );

  let xEqualsZeroLine = $derived(
    minValue < 0
      ? minValueAbsolute * (chartWidth / (minValueAbsolute + maxValue)) + 10
      : 0
  );

  // $inspect('min value is ' + minValueAbsolute, 'x line is ' + xEqualsZeroLine);

  let highestToLowest = $state(false);
  let lowestToHighest = $state(false);

  let orderedDataArray = $derived(
    highestToLowest
      ? [...dataArray.sort((a, b) => a.y - b.y)]
      : lowestToHighest
        ? [...dataArray.sort((a, b) => b.y - a.y)]
        : dataArray
  );
</script>

<div class="mt-10">
  <TitleAndSubtitle></TitleAndSubtitle>
  <Legend></Legend>
  <Button
    buttonText={'Lowest to highest'}
    onClick={() => (highestToLowest = true) && (lowestToHighest = false)}
    {dataArray}
  ></Button>
  <Button
    buttonText={'Highest to lowest'}
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
          <Line {xEqualsZeroLine} {chartHeight} {chartWidth}></Line>

          <!--i represents the current data point-->
          {#each orderedDataArray as row, i}
            {@const barWidth =
              Math.abs(row.y) * (chartWidth / (minValueAbsolute + maxValue))}
            {@const rowLabel = localAuthorityCodeLookup.find(
              (area) => area.areaCode === row.areaCode
            ).localAuthorityName}
            {@const rowValue = +row.y}
            {@const rowValuePosition =
              row.y > 0
                ? xEqualsZeroLine + barWidth - 6
                : xEqualsZeroLine - barWidth + 6}
            {@const textAnchor = rowValue < 0 ? 'start' : 'end'}
            <g transform="translate(0,{i * rowHeight})">
              <!--{rowHeight} is short hand for rowHeight = {rowHeight}-->
              <Row
                {rowHeight}
                {barWidth}
                {rowLabel}
                {rowValue}
                barColor={localAuthorityCodeLookup.find(
                  (area) => area.areaCode === row.areaCode
                ).localAuthorityName === inputSelectedArea
                  ? '#FF6961'
                  : '#B3EBF2'}
                barStartPostion={row.y > 0
                  ? xEqualsZeroLine
                  : xEqualsZeroLine - barWidth}
                {rowValuePosition}
                {textAnchor}
              ></Row>
              {console.log(
                xEqualsZeroLine,
                barWidth,
                rowValuePosition,
                rowValue,
                textAnchor
              )}
              {textAnchor}
            </g>
          {/each}
        </g>
      {/if}
    </svg>

    <Source></Source>
  </div>
</div>
