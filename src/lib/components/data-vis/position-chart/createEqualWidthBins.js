/**
 * Bins a distribution of values between two numbers.
 *
 * @param {number} min - The start of the range.
 * @param {number} max - The end of the range.
 * @param {number} nSegments - The number of equal-width bins to divide the range into.
 * @param {number[]} dist - The distribution of values to bin.
 * @param {boolean} includeOutliers - If true, values outside [min, max] are counted
 *                                    into the first or last bin. If false, they are ignored.
 * @returns {object[]} An array of bin objects with { start, end, count }.
 */
export function createEqualWidthBins(min, max, nSegments, dist, includeOutliers = true) {
    if (min >= max) throw new Error("min must be less than max");
    if (nSegments < 1) throw new Error("binCount must be at least 1");
  
    const binWidth = (max - min) / nSegments;
  
    // Initialise bins
    const bins = Array.from({ length: nSegments }, (_, i) => ({
      x0: min + i * binWidth,
      x1: min + (i + 1) * binWidth,
      count: 0,
    }));
  
    for (const value of dist) {
      if (value < min) {
        if (includeOutliers) bins[0].count++;
        continue;
      }
  
      if (value >= max) {
        // Clamp the upper boundary so that value === max lands in the last bin
        if (value === max || includeOutliers) bins[nSegments - 1].count++;
        continue;
      }
  
      const index = Math.floor((value - min) / binWidth);
      bins[index].count++;
    }
  
    return bins;
  }