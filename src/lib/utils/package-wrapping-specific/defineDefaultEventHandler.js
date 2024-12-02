export function defineDefaultEventHandler(
  event,
  parametersSourceArray,
  parametersValuesArray,
  name
) {
  parametersValuesArray[
    parametersSourceArray.findIndex((el) => el.name === name)
  ][0] += 1;

  parametersValuesArray[
    parametersSourceArray.findIndex((el) => el.name === name)
  ][1] = event.currentTarget.dataset.id;
}
