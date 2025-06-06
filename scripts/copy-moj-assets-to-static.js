import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const mojRoot = resolve(
  __dirname,
  "../node_modules/@ministryofjustice/frontend/moj",
);
const mojAssetsPath = resolve(mojRoot, "assets");
const staticAssetsPath = resolve(__dirname, "../static/assets/moj");

// CSS paths
const mojCssPath = resolve(mojRoot, "moj-frontend.min.css");
const staticCssPath = resolve(__dirname, "../static/css/moj-frontend.min.css");

// Copy map file paths
const mojCssMapPath = resolve(mojRoot, "moj-frontend.min.css.map");
const staticCssMapPath = resolve(
  __dirname,
  "../static/css/moj-frontend.min.css.map",
);

// Copy assets and CSS
async function copyFiles() {
  try {
    // Copy assets (images etc)
    await fs.copy(mojAssetsPath, staticAssetsPath);
    console.log("MoJ assets copied successfully!");

    // Copy CSS and its map file
    await fs.copy(mojCssPath, staticCssPath);
    await fs.copy(mojCssMapPath, staticCssMapPath);
    console.log("MoJ CSS and map files copied successfully!");
  } catch (err) {
    console.error("Error copying MoJ files:", err);
  }
}

copyFiles();
