function convertToCSV(array) {
  if (!array.length) return "";
  const header = Object.keys(array[0]).join(", ");
  const rows = array.map((obj) => Object.values(obj).join(", "));
  return [header, ...rows].join("\n");
}
function csvToArrayOfObjects(csv) {
  const lines = csv.split("\n").filter((line) => line.trim() !== "");
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(",").map((header) => header.trim());
  return dataLines.map((line) => {
    const values = line.split(",").map((value) => value.trim());
    return headers.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});
  });
}
function defineDefaultEventHandler(event, parametersSourceArray, parametersValuesArray, name) {
  parametersValuesArray[parametersSourceArray.findIndex((el) => el.name === name)][0] += 1;
  parametersValuesArray[parametersSourceArray.findIndex((el) => el.name === name)][1] = event.currentTarget.dataset.id;
}
export {
  csvToArrayOfObjects as a,
  convertToCSV as c,
  defineDefaultEventHandler as d
};
