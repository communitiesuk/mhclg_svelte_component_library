export function splitStringIntoRows(string, minWordLengthForSplitting) {
  let arrayOfWordsOfLengthOverN = getOrderedArrayOfWords(string).filter(
    (el) => minWordLengthForSplitting <= el.length
  );

  console.log(arrayOfWordsOfLengthOverN);
  let splitString1 = addPipeAtHalfway2(string, arrayOfWordsOfLengthOverN[0]);
  let splitString2 = addPipeAtHalfway2(string, arrayOfWordsOfLengthOverN[1]);
  let splitString3 = addPipeAtHalfway2(
    addPipeAtHalfway2(string, arrayOfWordsOfLengthOverN[0]),
    arrayOfWordsOfLengthOverN[1]
  );

  //console.log(splitString1, splitString2, splitString3);


  //let splitTest = splitStringIntoNRows2(string, arrayOfWordsOfLengthOverN, 2);

  //console.log(arrayOfWordsOfLengthOverN);
}

function getOrderedArrayOfWords(string) {
  // Remove commas and split the string into words
  const words = string.replace(/,/g, '').split(/\s+/);

  // Get unique words using a Set
  const uniqueWords = [...new Set(words)];

  // Sort the unique words by length in descending order
  uniqueWords.sort((a, b) => b.length - a.length);

  return uniqueWords;
}

function splitStringIntoNRows2(string, numberToSplitTo) {
  let combinations;

  string = string.replace(/\s/g, '|$&');

  const indexes = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '|' || string[i] === '~') {
      indexes.push(i + 1);
    }
  }

  combinations = generateCombinations(indexes);

  let optimalsObject = [];

  let lengthOptions = Math.min(numberToSplitTo, indexes.length + 1);

  for (let i = 2; i <= lengthOptions; i++) {
    let optimalSegment;
    let optimalLongestSegment;

    let combinationsOfLength = combinations.filter((el) => el.length === i - 1);

    for (var j = 0; j <= combinationsOfLength.length - 1; j++) {
      let splitString = splitStringAtIndexes(
        string,
        combinationsOfLength[j]
      ).map((str) =>
        str.replace(/\|/g, '').replace(/~$/, '-').replace(/~/g, '').trim()
      );
      let longestSegment = Math.max(...splitString.map((el) => el.length));

      if (!optimalLongestSegment || longestSegment < optimalLongestSegment) {
        optimalLongestSegment = longestSegment;
        optimalSegment = splitString;
      }
    }

    optimalsObject.push(optimalSegment);
  }

  return optimalsObject;
}

function splitStringIntoNRows(string, n, splitLongestWords) {
  let output, combinations, optimalCombinations;


  if (splitLongestWords) {
    for (var i = 1; i <= splitLongestWords; i++) {
      string = addPipeAtHalfway(string);
    }
  }

  string = string.replace(/\s/g, '|$&');


  const indexes = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '|' || string[i] === '~') {
      indexes.push(i + 1);
    }
  }

  combinations = generateCombinations(indexes);

  let optimalsObject = [];

  let lengthOptions = Math.min(n, indexes.length + 1);

  for (let i = 2; i <= lengthOptions; i++) {
    let optimalSegment;
    let optimalLongestSegment;

    let combinationsOfLength = combinations.filter((el) => el.length === i - 1);

    for (var j = 0; j <= combinationsOfLength.length - 1; j++) {
      let splitString = splitStringAtIndexes(
        string,
        combinationsOfLength[j]
      ).map((str) =>
        str.replace(/\|/g, '').replace(/~$/, '-').replace(/~/g, '').trim()
      );
      let longestSegment = Math.max(...splitString.map((el) => el.length));

      if (!optimalLongestSegment || longestSegment < optimalLongestSegment) {
        optimalLongestSegment = longestSegment;
        optimalSegment = splitString;
      }
    }

    optimalsObject.push(optimalSegment);
  }

  return optimalsObject;
}

function addPipeAtHalfway2(str, word) {
  // Split the string into words
  const words = str.split(/\s+/);

  let index = str.indexOf(word) + Math.round(word.length / 2);

  // Replace the longest word in the original string with the word containing "|"
  return str.substring(0, index) + '~' + str.substring(index, str.length);
}

function addPipeAtHalfway(str) {
  // Split the string into words
  const words = str.split(/\s+/);

  // Find the longest word
  let longestWord = '';
  for (const word of words) {
    if (word.length > longestWord.length && !word.includes('~')) {
      longestWord = word;
    }
  }

  let index = str.indexOf(longestWord) + Math.round(longestWord.length / 2);

  // Replace the longest word in the original string with the word containing "|"
  return str.substring(0, index) + '~' + str.substring(index, str.length);
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

function generateCombinations(arr) {
  const combinations = [];

  function generate(arr, size, start, temp) {
    if (temp.length === size) {
      combinations.push([...temp]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      generate(arr, size, i + 1, temp);
      temp.pop();
    }
  }

  for (let i = 1; i <= arr.length; i++) {
    generate(arr, i, 0, []);
  }

  return combinations;
}
