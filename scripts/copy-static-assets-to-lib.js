import fs from "fs-extra";
import { join, dirname } from "node:path";

const projectRoot = join(process.cwd()); // Assumes script run from project root

const staticDir = join(projectRoot, "static/assets");
const libDestDir = join(projectRoot, "src/lib/assets");

const assetsToCopy = ["fonts", "images", "govuk_publishing_components"];

console.log("Copying static assets to src/lib/assets...");

// Ensure the base destination directory exists
fs.ensureDirSync(libDestDir);
console.log(`Ensured directory exists: ${libDestDir}`);

assetsToCopy.forEach((assetType) => {
  const sourcePath = join(staticDir, assetType);
  const destPath = join(libDestDir, assetType);

  if (fs.existsSync(sourcePath)) {
    try {
      fs.copySync(sourcePath, destPath, { overwrite: true });
      console.log(`Copied ${sourcePath} to ${destPath}`);
    } catch (err) {
      console.error(`Error copying ${assetType}:`, err);
    }
  } else {
    console.warn(`Source directory not found, skipping: ${sourcePath}`);
  }
});

console.log("Static assets copy process completed!");

const staticCssDir = join(projectRoot, "static/css");
const libCssDestDir = join(projectRoot, "src/lib/assets/css");

const cssFilesToCopy = ["govuk-frontend.min.css", "govuk-frontend.min.css.map"];

console.log("Copying specific GOV.UK CSS assets to src/lib/assets/css...");

// Ensure the destination CSS directory exists
fs.ensureDirSync(libCssDestDir);
console.log(`Ensured directory exists: ${libCssDestDir}`);

cssFilesToCopy.forEach((fileName) => {
  const sourcePath = join(staticCssDir, fileName);
  const destPath = join(libCssDestDir, fileName);

  if (fs.existsSync(sourcePath)) {
    try {
      // Copy the individual file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${sourcePath} to ${destPath}`);
    } catch (err) {
      console.error(`Error copying ${fileName}:`, err);
    }
  } else {
    console.warn(`Source file not found, skipping: ${sourcePath}`);
  }
});

console.log("Static app assets copy process to lib directory completed!");
