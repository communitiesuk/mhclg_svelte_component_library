export function createParametersObject(sourceArray, valuesArray, derivedObject = {}) {
  const result = { ...derivedObject };
  
  sourceArray.forEach((param, index) => {
    if (param.name === 'sections') {
      try {
        result[param.name] = JSON.parse(valuesArray[index]);
      } catch (e) {
        console.error('Error parsing sections JSON:', e);
        result[param.name] = [];
      }
    } else {
      result[param.name] = valuesArray[index];
    }
  });

  return result;
}
