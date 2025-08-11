// run this copying script to copy the GOV.UK Frontend assets to the project's static directory. This script will create the necessary directories and copy the required files from the installed govuk frontend module (make sure you have updated this if you want most recent files).

// terminal command: node scripts/copy-govuk-assets-to-static.js

import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Define destination directories within the static folder
const staticDirs = [
  join(projectRoot, "static/assets"),
  join(projectRoot, "static/assets/images"),
  join(projectRoot, "static/assets/fonts"),
  join(projectRoot, "static/assets/rebrand"),
  join(projectRoot, "static/css"),
  join(projectRoot, "static/js"),
];

// Create static directories if they don't exist
staticDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Source path for GOV.UK Frontend assets
const govukPath = join(projectRoot, "node_modules/govuk-frontend/dist/govuk");

// Copy function (optional helper, but good practice)
function copyDir(src, dest) {
  if (fs.existsSync(src)) {
    // Ensure the destination directory exists before copying
    fs.mkdirSync(dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.warn(`Source directory not found: ${src}`);
  }
}

// Copy manifest.json
const manifestSrc = join(govukPath, "assets/manifest.json");
const manifestDest = join(projectRoot, "static/assets/manifest.json");
if (fs.existsSync(manifestSrc)) {
  // Ensure static destination directory exists
  fs.mkdirSync(dirname(manifestDest), { recursive: true });
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log(`Copied manifest.json to ${manifestDest}`);
} else {
  console.warn(`manifest.json not found at ${manifestSrc}`);
}

// Copy images
copyDir(
  join(govukPath, "assets/images"),
  join(projectRoot, "static/assets/images"),
);

// Copy fonts
copyDir(
  join(govukPath, "assets/fonts"),
  join(projectRoot, "static/assets/fonts"),
);

// Copy rebrand folder (new for brand refresh)
copyDir(
  join(govukPath, "assets/rebrand"),
  join(projectRoot, "static/assets/rebrand"),
);

// Copy GOVUK CSS to the static directory only
const govukCssSrc = join(govukPath, "govuk-frontend.min.css");
const govukCssDestStatic = join(
  projectRoot,
  "static/css/govuk-frontend.min.css",
);

if (fs.existsSync(govukCssSrc)) {
  // Ensure static destination directory exists
  fs.mkdirSync(dirname(govukCssDestStatic), { recursive: true });
  fs.copyFileSync(govukCssSrc, govukCssDestStatic);
  console.log(`Copied GOVUK CSS to ${govukCssDestStatic}`);
} else {
  console.warn(`GOVUK CSS file not found at ${govukCssSrc}`);
}

// Copy JavaScript to the static directory only
const jsSrc = join(govukPath, "govuk-frontend.min.js");
const jsDest = join(projectRoot, "static/js/govuk-frontend.min.js");
if (fs.existsSync(jsSrc)) {
  // Ensure static destination directory exists
  fs.mkdirSync(dirname(jsDest), { recursive: true });
  fs.copyFileSync(jsSrc, jsDest);
  console.log(`Copied JavaScript to ${jsDest}`);
} else {
  console.warn(`JavaScript file not found at ${jsSrc}`);
}

console.log("GOV.UK Frontend assets copy to static directory completed!");
