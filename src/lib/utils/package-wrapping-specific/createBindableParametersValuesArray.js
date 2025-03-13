export function createBindableParametersValuesArray(
  parametersSourceArray,
  parametersValuesArray,
  customParametersObject = {},
) {
  return parametersSourceArray
    .filter((el) => el.isBindable)
    .map((el) => ({
      ...el,
      value: customParametersObject[el.name] ?? el.value,
    }));
}
