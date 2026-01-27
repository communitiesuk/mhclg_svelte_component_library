export function splitGroupsAndAverages(array, numGroups) {
    // 1. Remove NaNs and sort
    const cleanArray = array.filter(n => !isNaN(n)).sort((a, b) => a - b);
  
    const baseSize = Math.floor(cleanArray.length / numGroups);
    let remainder = cleanArray.length % numGroups;
    let start = 0;
  
    // 2. Split into groups
    const groups = Array.from({ length: numGroups }, () => {
      const size = baseSize + (remainder-- > 0 ? 1 : 0);
      const group = cleanArray.slice(start, start + size);
      start += size;
      return group;
    });
  
    // 3. Compute averages
    const averages = groups.map(g => g.reduce((a, b) => a + b, 0) / g.length);
    return { groups, averages };
  }