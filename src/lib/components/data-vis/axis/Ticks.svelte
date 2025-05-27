<script>
  import Decimal from "decimal.js";
  import { tick } from "svelte";

  let {
    ticksArray = $bindable(),
    chartWidth,
    chartHeight,
    axisFunction,
    values,
    numberOfTicks,
    floor,
    ceiling,
    orientation,
    tickFormattingFunction = function (tick) {
      return tick;
    },
  } = $props();

  let currentFontSize = $state(10);
  const minFontSize = 10;
  let textElements = $state([]);

  let tickArrayDimensions = $state([]);

  let temporaryArrayForCalculationChecking = $derived(
    tickArrayDimensions.map((el, i) => {
      if (el != undefined) {
        return [
          axisFunction(ticksArray[i]) - el.width / 2,
          axisFunction(ticksArray[i]) + el.width / 2,
        ];
      }
    }),
  );

  let checkForOverlap = $derived(
    temporaryArrayForCalculationChecking
      .filter((el, i) => i < temporaryArrayForCalculationChecking.length - 1)
      .map(
        (el, i) =>
          temporaryArrayForCalculationChecking[i][1] <=
          temporaryArrayForCalculationChecking[i + 1][0],
      )
      .every((el) => el === true),
  );

  let checkForOverlap2 = $state(true);

  $effect(() => {
    if (!checkForOverlap) checkForOverlap2 = false;
  });

  $inspect(checkForOverlap);

  function generateTicks(data, numTicks, floor, ceiling) {
    let minValueFromData = Decimal.min(...data);

    let minVal = floor
      ? Decimal.max(floor, minValueFromData)
      : minValueFromData;

    let maxValueFromData = Decimal.max(...data);

    let maxVal = ceiling
      ? Decimal.min(ceiling, maxValueFromData)
      : maxValueFromData;

    let rangeVal = maxVal.minus(minVal);

    let roughStep = rangeVal.div(numTicks - 1);
    let normalizedSteps = [1, 2, 5, 10];

    let stepPower = Decimal.pow(
      10,
      -Math.floor(Math.log10(roughStep.toNumber())),
    );
    let normalizedStep = roughStep.mul(stepPower);
    let optimalStep = new Decimal(
      normalizedSteps.find((step) => step >= normalizedStep.toNumber()),
    ).div(stepPower);

    let scaleMin = minVal.div(optimalStep).floor().mul(optimalStep);
    let scaleMax = maxVal.div(optimalStep).ceil().mul(optimalStep);

    let ticks = [];
    for (let i = scaleMin; i.lte(scaleMax); i = i.plus(optimalStep)) {
      ticks.push(i.toNumber());
    }
    return ticks;
  }

  function tickCount(chartWidth, chartHeight) {
    let tickNum = orientation.axis === "y" ? chartHeight / 50 : chartWidth / 50;
    return tickNum;
  }

  /*function registerElement(el) {
    if (el && !textElements.includes(el)) {
      textElements = [...textElements, el];
    }
  }*/

  /*function checkOverlapAndAdjustFont() {
    let hasOverlap = false;

    for (let i = 0; i < textElements.length; i++) {
      const boxA = textElements[i]?.getBBox?.();
      if (!boxA) continue;

      for (let j = i + 1; j < textElements.length; j++) {
        const boxB = textElements[j]?.getBBox?.();
        if (!boxB) continue;

        const overlap =
          boxA.x < boxB.x + boxB.width &&
          boxA.x + boxA.width > boxB.x &&
          boxA.y < boxB.y + boxB.height &&
          boxA.y + boxA.height > boxB.y;

        if (overlap) {
          hasOverlap = true;
          break;
        }
      }

      if (hasOverlap) break;
    }

    if (hasOverlap && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      requestAnimationFrame(() => {
        textElements.forEach((el) => {
          if (el) el.setAttribute("font-size", currentFontSize);
        });
        checkOverlapAndAdjustFont();
      });
    }
  }*/

  /*$effect(() => {
    if (ticksArray.length > 0) {
      checkOverlapAndAdjustFont();
    }
  });*/

  numberOfTicks = tickCount(chartWidth, chartHeight);

  ticksArray = generateTicks(values, numberOfTicks, floor, ceiling);
</script>

{#if axisFunction && ticksArray && orientation.axis && orientation.position}
  {#each ticksArray as tick, i}
    <g
      transform="translate({orientation.axis === 'x'
        ? axisFunction(tick)
        : 0},{orientation.axis === 'y' ? axisFunction(tick) : 0})"
    >
      <path
        d={orientation.axis === "y"
          ? orientation.position === "left"
            ? "M0 0 l-8 0"
            : "M0 0 l8 0"
          : orientation.position === "top"
            ? "M0 0 l0 -8"
            : "M0 0 l0 8"}
        stroke="black"
        stroke-width="2px"
      ></path>
      <g bind:contentRect={tickArrayDimensions[i]}>
        <text
          transform="translate({orientation.axis === 'x'
            ? 0
            : orientation.position === 'left'
              ? -10
              : 10}, {orientation.axis === 'y'
            ? 5
            : orientation.position === 'top'
              ? -10
              : 23})"
          font-size={checkForOverlap2 ? "19px" : "14px"}
          text-anchor={orientation.axis === "x"
            ? "middle"
            : orientation.position === "left"
              ? "end"
              : "start"}
          fill="black"
        >
          {tickFormattingFunction(tick)}
        </text>
      </g>
    </g>
  {/each}
{/if}
