export function getColorsForValues(hexArray, min, max, values) {
    // Ensure min and max make sense
    if (min > max) [min, max] = [max, min];
  
    const colorCount = hexArray.length;
  
    return values.map(value => {
      // Map value from [min, max] to an index in [0, hexArray.length - 1]
      let index = Math.round(((value - min) / (max - min)) * (colorCount - 1));

      // Clamp index to valid range
      index = Math.max(0, Math.min(colorCount - 1, index));
      
      return hexArray[index];
    });
  }