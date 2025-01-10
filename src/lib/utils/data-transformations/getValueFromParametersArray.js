export function getValueFromParametersArray(
  parametersSourceArray,
  parametersValuesArray,
  fieldName
) {
  return parametersValuesArray[
    parametersSourceArray?.findIndex((el) => el.name === fieldName)
  ];
}
