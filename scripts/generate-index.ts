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

const exports = svelteFilesInComponents
  .map((filePath) => {
    const name = basename(filePath, ".svelte");

    // Only export if the name hasn't been used yet
    if (!exportedNames.has(name)) {
      exportedNames.add(name); // Mark name as used
      const importPath = join("components", filePath).replace(/\\\\/g, "/");
      return `export { default as ${name} } from './${importPath}';`;
    }
    return null; // Skip duplicate
  })
  .filter((line): line is string => line !== null); // Remove null entries

// Write the file only if there are no duplicates
writeFileSync(
  indexFile,
  `// this file is auto-generated — do not edit by hand\n${exports.join("\n")}\n`,
);

console.log(
  `Generated ${indexFile} with ${exports.length} unique exports from ./components. Duplicates were ignored.`,
);
