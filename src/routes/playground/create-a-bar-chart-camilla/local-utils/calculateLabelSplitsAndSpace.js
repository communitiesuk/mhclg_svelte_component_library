import { splitStringIntoRows } from "./splitStringIntoRows.js";

export function calculateLabelSplitsAndSpace(rowLabelPermutations, dataArray) {
  let maxRows = Math.max(
    ...rowLabelPermutations.map((el) => el.rows).filter((el) => el),
  );

  splitStringIntoRows("Bournemouth, Christchurch and Poole", 8, maxRows);

  /*rowLabelPermutations.forEach((el) => {
    dataArray.forEach((row) => {
      splitStringIntoRows(row.label, 6);
    });
  });*/

  return [100, 100];
}
