import Decimal from "decimal.js";

export function generateTicks(data, numTicks, minTick, maxTick) {
  let minVal =
    minTick !== null
      ? new Decimal(minTick)
      : Decimal.min(...data.map((val) => new Decimal(val)));
  let maxVal =
    maxTick !== null
      ? new Decimal(maxTick)
      : Decimal.max(...data.map((val) => new Decimal(val)));
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
