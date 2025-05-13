// scripts/generate-index.ts
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";

const libDir = "src/lib";
const componentsDir = join(libDir, "components"); // Target only the components directory
const indexFile = join(libDir, "index.ts");

function findSvelteFiles(dir: string): string[] {
  let svelteFiles: string[] = [];
  const items = readdirSync(dir);

  items.forEach((item) => {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    // Ignore node_modules or dist if they somehow end up here
    if (item === "node_modules" || item === "dist") {
      return;
    }

    if (stat.isDirectory()) {
      // Recursively search in subdirectories
      svelteFiles = svelteFiles.concat(findSvelteFiles(fullPath));
    } else if (item.endsWith(".svelte")) {
      // Path relative to componentsDir
      svelteFiles.push(relative(componentsDir, fullPath));
    }
  });

  // Sort to ensure consistent order if duplicates exist
  return svelteFiles.sort();
}

// Start the search from componentsDir
const svelteFilesInComponents = findSvelteFiles(componentsDir);

const exportedNames = new Set<string>(); // Keep track of names already exported
const skippedFiles: string[] = []; // Track skipped files

const exports = svelteFilesInComponents
  .map((filePath) => {
    const name = basename(filePath, ".svelte");
    const fullImportPath = join("components", filePath).replace(/\\/g, "/");

    // Only export if the name hasn't been used yet
    if (!exportedNames.has(name)) {
      exportedNames.add(name); // Mark name as used
      return `export { default as ${name} } from './${fullImportPath}';`;
    }
    skippedFiles.push(fullImportPath); // Log skipped file path
    return null; // Skip duplicate
  })
  .filter((line): line is string => line !== null); // Remove null entries

// Write the file
writeFileSync(
  indexFile,
  `// this file is auto-generated — do not edit by hand\nimport "$lib/main.css";\n\n${exports.join("\n")}\n`,
);

let logMessage = `Generated ${indexFile} with ${exports.length} unique exports from ./components.`;

if (skippedFiles.length > 0) {
  logMessage += `\nSkipped ${skippedFiles.length} duplicate file(s):\n  - ${skippedFiles.join("\n  - ")}`;
}

console.log(logMessage);
