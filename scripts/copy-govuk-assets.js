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

// Add new function to copy .mjs files and common directory
function copyMjsAndCommonFiles() {
    const govukSrcDir = govukPath;
    const jsDir = join(projectRoot, 'src/lib/components/js');

    // Create base directory if it doesn't exist
    if (!fs.existsSync(jsDir)) {
        fs.mkdirSync(jsDir, { recursive: true });
    }

    // Copy common directory
    const commonSrcDir = join(govukSrcDir, 'common');
    const commonDestDir = join(jsDir, 'common');
    if (fs.existsSync(commonSrcDir)) {
        fs.cpSync(commonSrcDir, commonDestDir, { recursive: true });
        console.log(`Copied common directory to ${commonDestDir}`);
    }

    // Copy errors directory
    const errorsSrcDir = join(govukSrcDir, 'errors');
    const errorsDestDir = join(jsDir, 'errors');
    if (fs.existsSync(errorsSrcDir)) {
        fs.cpSync(errorsSrcDir, errorsDestDir, { recursive: true });
        console.log(`Copied errors directory to ${errorsDestDir}`);
    } else {
        console.warn(`Errors directory not found at ${errorsSrcDir}`);
    }

    // Copy components recursively
    const componentsDir = join(govukSrcDir, 'components');
    if (fs.existsSync(componentsDir)) {
        fs.readdirSync(componentsDir).forEach(component => {
            const componentSrcDir = join(componentsDir, component);
            const componentDestDir = join(jsDir, 'components', component);

            if (fs.statSync(componentSrcDir).isDirectory()) {
                // Create component directory
                fs.mkdirSync(componentDestDir, { recursive: true });

                // Copy component files recursively
                function copyComponentFiles(srcDir, destDir) {
                    const files = fs.readdirSync(srcDir);
                    files.forEach(file => {
                        const srcPath = join(srcDir, file);
                        const destPath = join(destDir, file);
                        const stat = fs.statSync(srcPath);

                        if (stat.isDirectory()) {
                            fs.mkdirSync(destPath, { recursive: true });
                            copyComponentFiles(srcPath, destPath);
                        } else if (file.endsWith('.mjs')) {
                            fs.copyFileSync(srcPath, destPath);
                            console.log(`Copied ${component}/${file} to ${destPath}`);
                        }
                    });
                }

                copyComponentFiles(componentSrcDir, componentDestDir);
            }
        });
    }

    // Copy root .mjs files
    fs.readdirSync(govukSrcDir).forEach(file => {
        if (file.endsWith('.mjs') && file !== 'common.mjs') {
            const componentName = file.replace('.mjs', '');
            const componentDir = join(jsDir, 'components', componentName);
            
            fs.mkdirSync(componentDir, { recursive: true });
            fs.copyFileSync(
                join(govukSrcDir, file),
                join(componentDir, file)
            );
            console.log(`Copied root component file ${file} to ${componentDir}`);
        }
    });
}

// Call new function after existing asset copying
copyMjsAndCommonFiles();

console.log('GOV.UK Frontend assets copy process completed!');