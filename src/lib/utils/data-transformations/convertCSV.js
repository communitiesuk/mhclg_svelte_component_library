export function convertToCSV(array) {
  if (!array.length) return "";

  const header = Object.keys(array[0]).join(", "); // Add space after commas in header
  const rows = array.map((obj) => Object.values(obj).join(", ")); // Add space after commas in rows

  return [header, ...rows].join("\n");
}

export function csvToArrayOfObjects(csv) {
  const lines = csv.split("\n").filter((line) => line.trim() !== ""); // Split into lines and remove empty ones
  const [headerLine, ...dataLines] = lines; // Separate header from data
  const headers = headerLine.split(",").map((header) => header.trim()); // Split header into keys and trim spaces

  return dataLines.map((line) => {
    const values = line.split(",").map((value) => value.trim()); // Split each line by commas and trim spaces
    return headers.reduce((acc, key, index) => {
      acc[key] = values[index]; // Map values to their corresponding header
      return acc;
    }, {});
  });
}

/**
 * Fetches and parses a CSV file from a URL
 * @param {string} url - The URL of the CSV file to fetch
 * @returns {Promise<Array<Object>>} Promise that resolves to array of objects
 */
export async function getCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    return csvToArrayOfObjects(csvText);
  } catch (error) {
    console.error("Error fetching CSV:", error);
    throw error;
  }
}
