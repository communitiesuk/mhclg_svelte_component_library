import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";
import type { LayoutServerLoad } from "./$types.js";
import { dev } from "$app/environment";

// Helper function to format directory name into display name
function formatDirName(dirName: string): string {
  // Convert kebab-case to Title Case
  return dirName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Interface for component items
export interface ComponentItem {
  name: string;
  path: string; // This will be the route path (e.g., components-update/data-vis/map/map)
  children?: ComponentItem[];
  hasWrapper?: boolean;
}

let cachedComponentTree: ComponentItem[] | undefined = undefined;

// Helper function to recursively scan directories and build tree
async function scanWrapperDir(
  basePath: string,
  relativePathSegments: string[] = [], // Use array for path segments
): Promise<ComponentItem[]> {
  try {
    const currentRelativePath = join(...relativePathSegments);
    const fullPath = join(basePath, currentRelativePath);

    const stats = await stat(fullPath);
    if (!stats.isDirectory()) return [];

    const contents = await readdir(fullPath, { withFileTypes: true });
    const items: ComponentItem[] = [];

    // Process subdirectories first
    for (const dirent of contents) {
      if (dirent.isDirectory()) {
        const dirName = dirent.name;
        const children = await scanWrapperDir(basePath, [
          ...relativePathSegments,
          dirName,
        ]);

        // If the subdirectory yields any items (wrappers or deeper categories)
        if (children.length > 0) {
          items.push({
            name: formatDirName(dirName), // e.g., "Data Vis", "Line Chart"
            // Placeholder path for category folder - might be updated if direct wrapper found
            path: `components-update/${[...relativePathSegments, dirName].join("/")}`,
            children: children,
            // hasWrapper will be determined later
          });
        }
      }
    }

    // Process wrapper files at the current level
    for (const dirent of contents) {
      if (dirent.isFile() && dirent.name.endsWith("Wrapper.svelte")) {
        const wrapperName = dirent.name.replace("Wrapper.svelte", ""); // e.g., 'Line', 'Lines', 'Map', 'Button'
        // Convert PascalCase/camelCase name from file to kebab-case for URL
        const wrapperKebabCase = wrapperName
          .replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between lowercase and uppercase
          .toLowerCase();

        const routePath = `components-update/${[...relativePathSegments, wrapperKebabCase].join("/")}`;

        // Does an item already exist for this (e.g., 'Map' category from folder)?
        const existingItemIndex = items.findIndex(
          (item) => item.name === wrapperName,
        );

        if (existingItemIndex !== -1) {
          // Found a folder item matching the wrapper name, update it
          items[existingItemIndex].path = routePath; // Give the folder item the correct wrapper path
          items[existingItemIndex].hasWrapper = true;
        } else {
          // No matching folder item, add as a direct component item
          items.push({
            name: wrapperName, // Use the name from the file (PascalCase)
            path: routePath,
            hasWrapper: true,
          });
        }
      }
    }

    // Assign hasWrapper=false to category folders that didn't get updated by a direct wrapper
    for (const item of items) {
      if (item.hasWrapper === undefined && item.children) {
        item.hasWrapper = false; // Explicitly mark folders without direct wrappers
      }
    }

    // Sort items: folders first, then wrappers alphabetically
    items.sort((a, b) => {
      const aIsFolder = !!a.children;
      const bIsFolder = !!b.children;
      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return items;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      // Directory not found is expected for empty branches, suppress warning
    } else {
      console.error(
        `Error scanning directory ${join(...relativePathSegments)}:`,
        error,
      );
    }
    return [];
  }
}

export const load: LayoutServerLoad = async () => {
  // In development, or if the cache is not populated yet in production, generate the tree.
  // In production, if the cache is populated, return it.
  if (!dev && cachedComponentTree) {
    return {
      componentTree: cachedComponentTree,
    };
  }

  try {
    const baseWrappersPath = resolve("src/wrappers/components");
    const tree = await scanWrapperDir(baseWrappersPath, []); // Renamed to 'tree' to avoid conflict before caching

    // Cache the generated tree in production
    if (!dev) {
      cachedComponentTree = tree;
    }

    return {
      componentTree: tree, // Return the newly generated or existing tree
    };
  } catch (error) {
    console.error("Error in layout.server.ts load function:", error);
    return {
      componentTree: [],
    };
  }
};
