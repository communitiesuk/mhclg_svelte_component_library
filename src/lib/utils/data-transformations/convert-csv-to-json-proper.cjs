const fs = require("fs");
const path = require("path");

// Read the CSV file
const csvPath = "static/data/places.csv";
const csvContent = fs.readFileSync(csvPath, "utf8");

// Proper CSV parser that handles quoted fields
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = parseCSVLine(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index].trim();
      });
      data.push(obj);
    }
  }

  return data;
}

// Parse a single CSV line handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  // Don't forget the last field
  result.push(current);

  return result;
}

// Parse the CSV
const data = parseCSV(csvContent);

// Ensure the lib data directory exists
const outputDir = "src/lib/data";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write JSON file
const outputPath = path.join(outputDir, "places.json");
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(`Converted ${data.length} records from CSV to JSON`);
console.log(`Output: ${outputPath}`);

// Show a few examples to verify
console.log("\nFirst few records:");
console.log(data.slice(0, 5));

// Check for any records that might have quotes in the name
const recordsWithQuotes = data.filter(
  (r) => r.areanm && r.areanm.includes('"'),
);
console.log(`\nRecords with quotes in name: ${recordsWithQuotes.length}`);
if (recordsWithQuotes.length > 0) {
  console.log("Examples:", recordsWithQuotes.slice(0, 3));
}
