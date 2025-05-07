import fs from "fs-extra";
import { join, dirname } from "node:path";
import postcss from "postcss";
import valueParser from "postcss-value-parser";

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

const cssFilesToCopyAndProcess = ["govuk-frontend.min.css"];
const mapFileToCopy = "govuk-frontend.min.css.map";

// PostCSS plugin logic
const transformAssetUrlsPlugin = {
  postcssPlugin: "transform-asset-urls-for-lib",
  Declaration(decl) {
    if (!/url\(/.test(decl.value)) return;
    const parsedValue = valueParser(decl.value);
    parsedValue.walk((node) => {
      if (node.type === "function" && node.value === "url") {
        const urlNode = node.nodes[0];
        if (!urlNode) return;
        const url = urlNode.value;
        if (url.startsWith("/assets/fonts/")) {
          urlNode.value = "../fonts/" + url.slice("/assets/fonts/".length);
        } else if (url.startsWith("/assets/images/")) {
          urlNode.value = "../images/" + url.slice("/assets/images/".length);
        } else if (
          url.startsWith("/assets/govuk_publishing_components/images/")
        ) {
          urlNode.value =
            "../govuk_publishing_components/images/" +
            url.slice("/assets/govuk_publishing_components/images/".length);
        }
      }
    });
    decl.value = parsedValue.toString();
  },
};

console.log(
  "Copying and processing specific GOV.UK CSS assets to src/lib/assets/css...",
);

// Ensure the destination CSS directory exists
fs.ensureDirSync(libCssDestDir);
console.log(`Ensured directory exists: ${libCssDestDir}`);

// Process CSS files
cssFilesToCopyAndProcess.forEach(async (fileName) => {
  const sourcePath = join(staticCssDir, fileName);
  const destPath = join(libCssDestDir, fileName);

  if (fs.existsSync(sourcePath)) {
    try {
      // Read the original CSS
      const css = await fs.readFile(sourcePath, "utf8");
      // Process with PostCSS
      const result = await postcss([transformAssetUrlsPlugin]).process(css, {
        from: sourcePath,
        to: destPath,
        map: false,
      }); // Disable inline map generation here
      // Write the transformed CSS
      await fs.writeFile(destPath, result.css);
      console.log(`Copied and processed ${sourcePath} to ${destPath}`);
    } catch (err) {
      console.error(`Error copying/processing ${fileName}:`, err);
    }
  } else {
    console.warn(`Source file not found, skipping: ${sourcePath}`);
  }
});

// Copy the map file separately without processing
const mapSourcePath = join(staticCssDir, mapFileToCopy);
const mapDestPath = join(libCssDestDir, mapFileToCopy);
if (fs.existsSync(mapSourcePath)) {
  try {
    fs.copyFileSync(mapSourcePath, mapDestPath);
    console.log(`Copied map file ${mapSourcePath} to ${mapDestPath}`);
  } catch (err) {
    console.error(`Error copying map file ${mapFileToCopy}:`, err);
  }
} else {
  console.warn(`Source map file not found, skipping: ${mapSourcePath}`);
}

console.log("GOV.UK CSS assets copy and process completed!");
