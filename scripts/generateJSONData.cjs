const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

async function parseCsvToJson(filePath) {
	const results = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => resolve(results))
			.on('error', (error) => reject(error));
	});
}

async function bundleCsvFilesToJson(csvFiles, outputJsonPath) {
	const dataBundle = {};

	for (const file of csvFiles) {
		const fileName = path.basename(file, path.extname(file));
		try {
			const jsonData = await parseCsvToJson(file);
			dataBundle[fileName] = jsonData;
		} catch (error) {
			console.error(`Error parsing file ${file}:`, error);
		}
	}

	fs.writeFileSync(outputJsonPath, JSON.stringify(dataBundle, null, 2));
	console.log(`Data bundled into ${outputJsonPath}`);
}

// List of CSV files to bundle
const csvFiles = ['./static/data/chartData.csv']; // Replace with actual file paths
const outputJsonPath = './static/data/test.json';

bundleCsvFilesToJson(csvFiles, outputJsonPath);
