<script>
  let {
    ticksArray = $bindable(),
    chartWidth,
    yFunction,
    allXValues,
    numberOfTicks,
  } = $props();

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

  ticksArray = generateTicks(allXValues, numberOfTicks);
</script>

{#if yFunction}
  {#each ticksArray as tick}
    <g transform="translate({yFunction(tick)}, 0)">
      <path d="M0 0 l0 -8" stroke="black" stroke-width="2px"></path>
      <text
        transform="translate(0, -10)"
        font-size="14"
        text-anchor="middle"
        fill="black"
      >
        {tick}
      </text>
    </g>
  {/each}
{/if}
