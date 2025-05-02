import fs from "fs-extra";
import { join } from "node:path";

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
