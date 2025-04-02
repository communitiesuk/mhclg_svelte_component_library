export function jenksBreaks(data, numClasses) {
  // Sort the data array
  data = data.slice().sort((a, b) => a - b);

  const mat1 = [];
  const mat2 = [];

  // Initialize matrices
  for (let i = 0; i <= numClasses; i++) {
    mat1[i] = new Array(data.length);
    mat2[i] = new Array(data.length);
    mat1[i][0] = 0;
  }

  // Calculate breaks using dynamic programming
  for (let l = 1; l <= numClasses; l++) {
    for (let m = 1; m <= data.length; m++) {
      let minValue = Infinity;
      let minClass = 0;
      for (let j = 1; j <= m; j++) {
        let sum = 0;
        let variance = 0;
        for (let k = j; k <= m; k++) {
          sum += data[k - 1];
        }
        let mean = sum / (m - j + 1);
        for (let k = j; k <= m; k++) {
          variance += Math.pow(data[k - 1] - mean, 2);
        }
        let val = variance + mat1[l - 1][j - 1];
        if (val < minValue) {
          minValue = val;
          minClass = j;
        }
      }
      mat1[l][m] = minValue;
      mat2[l][m] = minClass;
    }
  }

  // Backtrack to find the break points
  let breaks = [];
  let k = data.length;
  for (let l = numClasses; l > 0; l--) {
    breaks.push(data[mat2[l][k]]);

    k = mat2[l][k] - 1;
  }

  return breaks.reverse();
}
