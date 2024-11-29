export function createRefinedParametersObject(
  parametersObject,
  compositeValueArray
) {
  return Object.fromEntries(
    Object.entries(parametersObject)
      .filter(([key, value]) => value.isProp)
      .map((el) => {
        let value = el[1].value;

        compositeValueArray.forEach((elm) => {
          if (el[0] === elm.name) {
            if ('value' in elm) {
              value = elm.value;
            } else {
              elm.options.forEach((element) => {
                if (parametersObject[elm.key].value === element.name) {
                  value = element.value;
                }
              });
            }
          }
        });
        return [el[0], value];
      })
  );
}
