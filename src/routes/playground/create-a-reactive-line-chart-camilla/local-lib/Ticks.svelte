<script>
  import { tick } from "svelte";

  let {
    ticksArray = $bindable(),
    chartWidth,
    axisFunction,
    values,
    numberOfTicks,
    orientation,
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

{#if axisFunction != null && ticksArray != null}
  {#each ticksArray as tick}
    <g
      transform="translate(
      {orientation.axis === 'x' ? axisFunction(tick) : 0}, 
      {orientation.axis === 'y' ? axisFunction(tick) : 0})"
    >
      <path
        d={orientation.axis === "y" ? "M0 0 l-8 0" : "M0 0 l0 -8"}
        stroke="black"
        stroke-width="2px"
      ></path>
      <text
        transform="translate({orientation.axis === 'x'
          ? -10
          : 0}, {orientation.axis === 'y' ? -10 : 0})"
        font-size="19"
        text-anchor={orientation.axis === "x"
          ? "middle"
          : orientation.position === "left"
            ? "end"
            : "start"}
        fill="black"
        >{tick}
      </text>
    </g>
  {/each}
{/if}

<!-- {#if axisFunction}
  {#each ticksArray as tick}
    {#if orentation == "y left"}
      <g transform="translate(0, {axisFunction(tick)})">
        <path d="M0 0 l-8 0" stroke="black" stroke-width="2px"></path>
        <text
          transform="translate(-10, 0)"
          font-size="19"
          text-anchor={orientation.axis === "x"
            ? "middle"
            : orientation.position === "left"
              ? "end"
              : "start"}
          fill="black"
          >{tick}
        </text>
      </g>
    {:else if orentation == "x top"}
      <g transform="translate({axisFunction(tick)},0)">
        <path d="M0 0 l0 -8" stroke="black" stroke-width="2px"></path>
        <text
          transform="translate(0,-10)"
          font-size="19"
          text-anchor="middle"
          fill="black"
          >{tick}
        </text>
      </g>
    {/if}
  {/each}
{/if} -->
