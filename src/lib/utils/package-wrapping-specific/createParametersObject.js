export function createParametersObject(
  parametersSourceArray,
  parametersValuesArray,
  derivedObject = {}
) {
  // Start with a copy of derivedObject
  // so that we can overwrite or add properties.
  const result = { ...derivedObject };

  parametersSourceArray.forEach((param, index) => {
    // Destructure fields that give extra info about param type and therefore special handling needed
    const {
      name,
      isProp = true,      // default to true if not provided
      inputType,
      handlerFunction,
    } = param;

    // 1. If `isProp === false`, skip the parameter
    if (!isProp) {
      return; // skip adding it to the final result
    }

    // 2. Determine value from `valuesArray` or from `handlerFunction` if event
    let newValue =
      inputType === 'event' ? handlerFunction : parametersValuesArray[index];

    // 3. Integrate the accordian "sections" JSON parse logic
    if (name === 'sections') {
      try {
        newValue = JSON.parse(parametersValuesArray[index]);
      } catch (e) {
        console.error('Error parsing sections JSON:', e);
        newValue = []; // fallback if parse fails
      }
    }

    // 4. If there's a matching derived value for this parameter name,
    //    that should overwrite whatever we currently have:
    if (Object.prototype.hasOwnProperty.call(derivedObject, name)) {
      newValue = derivedObject[name];
    }

    // 5. Assign the final value to `result`
    result[name] = newValue;
  });

  // `result` now contains:
  //   - All isProp params from sourceArray
  //   - Potentially overwritten with derivedObject values
  //   - Event handlers if inputType === 'event'
  //   - JSON-parsed sections
  return result;
}
