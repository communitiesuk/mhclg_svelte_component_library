export function createParametersObject(
  parametersSourceArray,
  statedParametersValuesArray,
  derivedParametersValuesArray,
) {
  let parametersObject = {};

  parametersSourceArray.forEach((param, index) => {
    let paramValue = param.isEditable
      ? statedParametersValuesArray[param.index]
      : derivedParametersValuesArray[param.index];

    let paramValueWithWorkingFunctionsAndObjects =
      typeof paramValue != "object"
        ? typeof param.value === "object"
          ? JSON.parse(paramValue)
          : paramValue
        : paramValue.workingFunction;

    parametersObject[param.name] = paramValueWithWorkingFunctionsAndObjects;
  });

  return parametersObject;
}
