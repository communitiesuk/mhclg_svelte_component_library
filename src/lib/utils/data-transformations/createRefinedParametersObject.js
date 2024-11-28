export function createRefinedParametersObject(
  parametersObject,
  compositeValueArray
) {
  return Object.fromEntries(
    Object.entries(parametersObject)
      .filter(([key, value]) => value.isProp)
      .map((el) => {
        let value = el[1];

        compositeValueArray.forEach((elm) => {
          if (el[0] === elm.name) {
            elm.options.forEach((element) => {
              console.log(parametersObject, elm.key, element.name);
              if (parametersObject[elm.key].value === element.name) {
                value = element.value;
              }
            });
          }
        });
        return [el[0], value];
      })
  );
}
