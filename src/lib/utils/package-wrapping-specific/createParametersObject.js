export function createParametersObject(
  parametersSourceArray,
  parametersValuesArray,
  derivedParametersObject
) {
  let derivedParametersArray = Object.keys(derivedParametersObject).map(
    (el) => ({
      name: el,
      value: derivedParametersObject[el],
    })
  );

  let parametersObject = parametersSourceArray.reduce(
    (acc, { isProp, name, inputType, handlerFunction }, index) => {
      acc[name] = {
        isProp: isProp,
        value:
          inputType === 'event'
            ? handlerFunction
            : parametersValuesArray[index],
      };
      return acc;
    },
    {}
  );

  return Object.fromEntries(
    Object.entries(parametersObject)
      .filter(([key, value]) => value.isProp)
      .map((el) => {
        let value = el[1].value;

        derivedParametersArray.forEach((elm) => {
          if (el[0] === elm.name) {
            value = elm.value;
          }
        });
        return [el[0], value];
      })
  );
}
