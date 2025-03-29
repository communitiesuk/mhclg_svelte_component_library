export function createParametersObject(
  parametersSourceArray,
  statedParametersValuesArray,
  derivedParametersValuesArray,
) {
  let parametersObject = {};
  let parametersParsingErrorsArray = [];

  parametersSourceArray.forEach((param, index) => {
    try {
      let paramValue = param.isEditable
        ? statedParametersValuesArray[param.index]
        : derivedParametersValuesArray[param.index];

      let paramValueWithWorkingFunctionsAndObjects =
        typeof param.value === "function"
          ? paramValue.bind(parametersSourceArray[index])
          : typeof param.value === "object"
            ? JSON.parse(paramValue)
            : paramValue;

      parametersObject[param.name] = paramValueWithWorkingFunctionsAndObjects;
    } catch (error) {
      parametersParsingErrorsArray.push(param.name);
    }
  });

  return [parametersObject, parametersParsingErrorsArray];
}
