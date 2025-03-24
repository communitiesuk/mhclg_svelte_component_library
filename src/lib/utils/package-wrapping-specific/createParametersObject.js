export function createParametersObject(
  parametersSourceArray,
  parametersValuesArray,
  derivedObject = {},
) {
  let isValidJSONArray = parametersSourceArray.map((el) => true);
  // Start with a copy of derivedObject
  // so that we can overwrite or add properties.
  const result = { ...derivedObject };

  parametersSourceArray.forEach((param, index) => {
    // Destructure fields that give extra info about param type and therefore special handling needed
    const { name, isProp, isEditable, inputType, handlerFunction, value } =
      param;

    // 1. If `isProp === false`, skip the parameter
    if (!isProp) {
      return; // skip adding it to the final result
    }

    // 2. Determine value from `valuesArray` or from `handlerFunction` if event

    let newValue;

    let setValue = derivedObject[name] ?? value;

    try {
      newValue =
        typeof setValue === "object" &&
        setValue !== null &&
        !Array.isArray(setValue) &&
        "functionParams" in setValue &&
        "functionBody" in setValue
          ? new Function(
              ...setValue.functionParams.map((el) =>
                typeof el === "string" ? el : el[0],
              ),
              setValue.functionBody,
            )
          : inputType === "event"
            ? handlerFunction
            : typeof value === "object" &&
                typeof parametersValuesArray[index] === "string"
              ? JSON.parse(parametersValuesArray[index])
              : parametersValuesArray[index];
    } catch (error) {
      newValue = parametersSourceArray[index].value;
      isValidJSONArray[index] = false;
    }

    // 3. If there's a matching derived value for this parameter name,
    //    that should overwrite whatever we currently have:
    if (Object.prototype.hasOwnProperty.call(derivedObject, name)) {
      newValue = derivedObject[name];
    }

    // 4. Assign the final value to `result`
    result[name] = newValue;
  });

  // `result` now contains:
  //   - All isProp params from sourceArray
  //   - Potentially overwritten with derivedObject values
  //   - Event handlers if inputType === 'event'
  return [result, isValidJSONArray];
}
