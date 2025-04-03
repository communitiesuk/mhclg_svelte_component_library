import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";
import type { LayoutServerLoad } from "./$types";

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
  path: string;
  children?: ComponentItem[];
  hasPage?: boolean;
}

// Helper function to recursively scan directories and build tree
async function scanDir(
  basePath: string,
  relativePath: string = "",
): Promise<ComponentItem[]> {
  try {
    const fullPath = join(basePath, relativePath);

    // Log what we're scanning
    console.log(`Scanning dir: ${fullPath}`);

    // Check if directory exists
    try {
      const stats = await stat(fullPath);
      if (!stats.isDirectory()) {
        console.error(`Path is not a directory: ${fullPath}`);
        return [];
      }
    } catch (err) {
      console.error(`Error accessing directory ${fullPath}:`, err);
      return [];
    }

    // Read directory contents
    const contents = await readdir(fullPath, { withFileTypes: true });
    console.log(`Found ${contents.length} items in ${fullPath}`);

    // Get directories and page files
    const entries = contents.map((dirent) => ({
      name: dirent.name,
      isDirectory: dirent.isDirectory(),
      isPage: dirent.name === "+page.svelte",
    }));

    // Filter directories only
    const directories = entries
      .filter((entry) => entry.isDirectory)
      .map((entry) => entry.name);

    console.log(`Found directories: ${directories.join(", ")}`);

    // Check if this directory has a +page.svelte file
    const hasPage = entries.some((entry) => entry.isPage);

    // Process each directory
    const items: ComponentItem[] = [];

    for (const dirName of directories) {
      const dirPath = relativePath ? join(relativePath, dirName) : dirName;
      const children = await scanDir(basePath, dirPath);

      // Log the component we're adding
      console.log(`Adding component: ${dirName} at path: ${dirPath}`);

      items.push({
        name: formatDirName(dirName),
        path: dirPath,
        children: children.length > 0 ? children : undefined,
        hasPage: hasPage,
      });
    }

    return items;
  } catch (error) {
    console.error(`Error scanning directory ${relativePath}:`, error);
    return [];
  }
}

// Function to flatten a tree structure for side navigation
function flattenComponentTree(
  items: ComponentItem[],
  parentPath: string = "",
): any[] {
  let flattened: any[] = [];

  for (const item of items) {
    // Create the current item
    const currentPath = parentPath
      ? `${parentPath}/${item.path.split("/").pop()}`
      : item.path;
    flattened.push({
      name: item.name,
      path: currentPath,
    });

    // Add children if they exist
    if (item.children && item.children.length > 0) {
      flattened = flattened.concat(
        flattenComponentTree(item.children, currentPath),
      );
    }
  }

  return flattened;
}

export const load: LayoutServerLoad = async () => {
  try {
    // Base path to the routes directory - use __dirname to get the current directory
    const baseRoutesPath = resolve("src/routes");
    console.log("Base routes path:", baseRoutesPath);

    // Scan component directories recursively
    console.log("Scanning components...");
    const componentTree = await scanDir(baseRoutesPath, "components");
    console.log(
      "Component tree result:",
      JSON.stringify(componentTree, null, 2),
    );

    // Extract the top-level directories (categories)
    const componentDirectories = componentTree.map((item) => ({
      name: item.name,
      path: item.path,
      children: item.children,
    }));

    // Extract UI components specifically (these are nested under the "ui" directory)
    const uiCategory = componentTree.find(
      (category) => category.path === "components/ui",
    );
    const uiComponents = uiCategory?.children || [];

    // Flatten component tree for side navigation
    const componentSections = flattenComponentTree(componentTree);

    return {
      componentDirectories,
      uiComponents,
      componentSections,
      componentTree,
    };
  } catch (error) {
    console.error("Error in layout.server.ts load function:", error);
    // Return empty data on error
    return {
      componentDirectories: [],
      uiComponents: [],
      componentSections: [],
      componentTree: [],
    };
  }
};
