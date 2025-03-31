<script>
  let {
    ticksArray = $bindable(),
    chartWidth,
    axisFunction,
    values,
    numberOfTicks,
    orentation,
  } = $props();

  $inspect(ticksArray);

  //TODO: Ticks based on width
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

  ticksArray = generateTicks(values, numberOfTicks);
</script>

{#if axisFunction}
  {#each ticksArray as tick}
    <g transform="translate(0, {axisFunction(tick)})">
      <path d="M0 0 l0 -8" stroke="black" stroke-width="2px"></path>
      {#if orentation == "y"}
        <text
          transform="translate(-10, 0)"
          font-size="14"
          text-anchor="middle"
          fill="black"
          >{tick}
        </text>
      {:else if orentation == "x top"}
        <text
          transform="translate(0,10)"
          font-size="14"
          text-anchor="middle"
          fill="black"
          >{tick}
        </text>
      {/if}
    </g>
  {/each}
{/if}
