export function createParametersObject(
  parametersSourceArray,
  statedParametersValuesArray,
  derivedParametersValuesArray,
  derivedParametersObject,
) {
  let parametersObject = {};

  parametersSourceArray.forEach((param, index) => {
    if (!param.isProp) {
      return;
    }

    let paramValue = param.isEditable
      ? statedParametersValuesArray[param.index]
      : derivedParametersValuesArray[param.index];

    let paramValueWithWorkingFunctionsAndObjects =
      typeof paramValue != "object"
        ? paramValue
        : "workingFunction" in paramValue
          ? paramValue.workingFunction
          : paramValue.workingObject;

    parametersObject[param.name] = paramValueWithWorkingFunctionsAndObjects;
  });

  let paramNamesArray = parametersSourceArray.map((el) => el.name);

  Object.keys(derivedParametersObject).forEach((key) => {
    if (!paramNamesArray.includes(key)) {
      parametersObject[key] = derivedParametersObject[key];
    }
  });

  return parametersObject;
}
