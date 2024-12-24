import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Create necessary directories if they don't exist
const dirs = [
    join(projectRoot, 'static/assets'),
    join(projectRoot, 'static/assets/images'),
    join(projectRoot, 'static/assets/fonts'),
    join(projectRoot, 'static/css')
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

console.log('GOV.UK Frontend assets copy process completed!');