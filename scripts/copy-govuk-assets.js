// run this copying script to copy the GOV.UK Frontend assets to the project's static directory. This script will create the necessary directories and copy the required files from the installed govuk frontend module (make sure you have updated this if you want most recent files).

// terminal command: node scripts/copy-govuk-assets.js

import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Add components directory
const dirs = [
    join(projectRoot, 'static/assets'),
    join(projectRoot, 'static/assets/images'),
    join(projectRoot, 'static/assets/fonts'),
    join(projectRoot, 'static/css'),
    join(projectRoot, 'static/js'),
    join(projectRoot, 'src/lib/components/js/components')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Source paths
const govukPath = join(projectRoot, 'node_modules/govuk-frontend/dist/govuk');

// Copy function
function copyDir(src, dest) {
    if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Copied ${src} to ${dest}`);
    } else {
        console.warn(`Source directory not found: ${src}`);
    }
}

// Copy manifest.json
const manifestSrc = join(govukPath, 'assets/manifest.json');
const manifestDest = join(projectRoot, 'static/assets/manifest.json');
if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, manifestDest);
    console.log(`Copied manifest.json to ${manifestDest}`);
} else {
    console.warn(`manifest.json not found at ${manifestSrc}`);
}

// Copy images
copyDir(
    join(govukPath, 'assets/images'),
    join(projectRoot, 'static/assets/images')
);

// Copy fonts
copyDir(
    join(govukPath, 'assets/fonts'),
    join(projectRoot, 'static/assets/fonts')
);

// Copy CSS
const cssSrc = join(govukPath, 'govuk-frontend.min.css');
const cssDest = join(projectRoot, 'static/css/govuk-frontend.min.css');
if (fs.existsSync(cssSrc)) {
    fs.copyFileSync(cssSrc, cssDest);
    console.log(`Copied CSS to ${cssDest}`);
} else {
    console.warn(`CSS file not found at ${cssSrc}`);
}

// Copy JavaScript
const jsSrc = join(govukPath, 'govuk-frontend.min.js');
const jsDest = join(projectRoot, 'static/js/govuk-frontend.min.js');
if (fs.existsSync(jsSrc)) {
    fs.copyFileSync(jsSrc, jsDest);
    console.log(`Copied JavaScript to ${jsDest}`);
} else {
    console.warn(`JavaScript file not found at ${jsSrc}`);
}

console.log('GOV.UK Frontend assets copy process completed!');