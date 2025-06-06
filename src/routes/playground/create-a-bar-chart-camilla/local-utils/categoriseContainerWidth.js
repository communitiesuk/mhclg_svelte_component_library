export function categoriseContainerWidth(obj, number) {
  // Convert object entries into an array of [key, value] pairs
  const entries = Object.entries(obj);

  // Filter to only include entries where the value is larger than the number
  const filteredEntries = entries.filter(([key, value]) => value > number);

  // Find the entry with the smallest value among the filtered entries
  const smallestBiggerEntry = filteredEntries.reduce((smallest, current) => {
    return !smallest || current[1] < smallest[1] ? current : smallest;
  }, null);

  // Return the key of the smallest bigger entry, or null if none found
  return smallestBiggerEntry
    ? smallestBiggerEntry[0]
    : findKeyWithBiggestValue(obj);
}

function findKeyWithBiggestValue(obj) {
  return Object.entries(obj).reduce((maxKey, [key, value]) => {
    // If maxKey is null or the current value is greater than the previous max value
    return !maxKey || value > obj[maxKey] ? key : maxKey;
  }, null);
}
