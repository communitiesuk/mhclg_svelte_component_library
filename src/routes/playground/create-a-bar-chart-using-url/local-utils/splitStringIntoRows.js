export function splitStringIntoRows(
  string,
  minWordLengthForSplitting,
  maxRows,
) {
  let arrayOfWordsOfLengthOverN = getOrderedArrayOfWords(string).filter(
    (el) => minWordLengthForSplitting <= el.length,
  );

  let subsetsArray = generateAllSubsets(
    arrayOfWordsOfLengthOverN.length,
    maxRows,
  );

  let stringsArray = subsetsArray.map((el) =>
    addSymbolAtHalfway(
      arrayOfWordsOfLengthOverN.filter((elm, ind) => el.includes(ind + 1)),
      string,
    ),
  );

  let splitStringOptions = stringsArray.map((el) =>
    splitStringAndCalculateWidth(el, maxRows),
  );

  //console.log(generateAllSubsets(4, 6));
}

function generateAllSubsets(numberOfWords, maxRows) {
  const result = [];
  const numbers = Array.from({ length: numberOfWords }, (_, i) => i + 1); // [1, 2, ..., n]

  // Helper function for generating subsets recursively
  function generateSubset(currentSubset, index) {
    if (index === numbers.length) {
      if (currentSubset.length > 0) result.push([...currentSubset]); // Add non-empty subset
      return;
    }

    // Include the current number
    generateSubset([...currentSubset, numbers[index]], index + 1);

    // Exclude the current number
    generateSubset(currentSubset, index + 1);
  }

  // Start recursive subset generation
  generateSubset([], 0);

  return result
    .filter((el) => el.length <= maxRows - 1)
    .sort((a, b) => a.length - b.length);
}

function getOrderedArrayOfWords(string) {
  // Remove commas and split the string into words
  const words = string.replace(/,/g, "").split(/\s+/);

  // Get unique words using a Set
  const uniqueWords = [...new Set(words)];

  // Sort the unique words by length in descending order
  uniqueWords.sort((a, b) => b.length - a.length);

  return uniqueWords;
}

function addSymbolAtHalfway(wordsToSplit, string) {
  wordsToSplit.forEach((el) => {
    let index = string.indexOf(el) + Math.round(el.length / 2);
    string =
      string.substring(0, index) + "~" + string.substring(index, string.length);
  });

  return string;
}

function splitStringAndCalculateWidth(string, maxRows) {
  string = string.replace(/\s/g, "|$&");

  const indexes = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "|") {
      indexes.push(i + 1);
    }
  }
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "~") {
      indexes.push(i + 1);
    }
  }

  let combinations = generateAllSubsets(indexes.length, maxRows)
    .map((el) => el.map((elm) => indexes[elm - 1]))
    .map((el) => {
      calculateBaseWidths(splitStringAtIndexes(string, el));
    });

  return string;
}

function splitStringAtIndexes(str, indexes) {
  const parts = [];
  let start = 0;
  for (const index of indexes) {
    parts.push(str.substring(start, index));
    start = index;
  }
  parts.push(str.substring(start)); // Add the remaining part of the string
  return parts;
}

function calculateBaseWidths(arrayOfLines) {
  arrayOfLines.forEach((el) => el);
}
