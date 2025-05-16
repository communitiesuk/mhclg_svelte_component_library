import type {
  SideNavItem,
  SideNavGroup,
} from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
import type { ComponentItem } from "../../routes/+layout.server"; // Adjust path as needed if +layout.server.ts is the source

// Helper to recursively extract actual component wrappers into a flat SideNavItem list
export function mapComponentItemsToSideNavItems(
  items: ComponentItem[],
): SideNavItem[] {
  let navItems: SideNavItem[] = [];
  for (const item of items) {
    if (item.hasWrapper) {
      // If it's a wrapper, add it directly
      navItems.push({
        text: item.name,
        href: `/${item.path}`,
        // subItems: undefined, // Explicitly no sub-items for direct wrappers here
      });
    }
    // If it's a folder (hasWrapper is false or undefined) AND has children, process children
    if (!item.hasWrapper && item.children && item.children.length > 0) {
      // Recursively get nav items from children and add them to the list
      navItems = navItems.concat(
        mapComponentItemsToSideNavItems(item.children),
      );
    }
  }
  return navItems;
}

// Create items for the mobile navigation
export function createMobileItems(tree: ComponentItem[]) {
  const result: (SideNavItem | { title: string; items: SideNavItem[] })[] = [];
  tree.forEach((category) => {
    // Check if the category itself is a direct link (hasWrapper)
    if (category.hasWrapper) {
      result.push({
        text: category.name,
        href: `/${category.path}`,
      });
    }
    // If the category has children, process them
    else if (category.children && category.children.length > 0) {
      // Use the existing helper to get a flat list of wrappers within this category
      const flattenedItems = mapComponentItemsToSideNavItems(category.children);

      // If there are any actual components within this category, add it as a group
      if (flattenedItems.length > 0) {
        result.push({
          title: category.name, // e.g., "Data Vis", "Layout"
          items: flattenedItems, // The already flattened list of {text, href} items
        });
      }
    }
  });
  return result;
}

// Function to get the appropriate section title for the side navigation
export function getSectionTitle(section: string): string {
  return section;
}

// Helper function specifically for processing items within a component group to add sub-items
export function processComponentGroupItems(
  groupItems: SideNavItem[],
  currentPath: string,
): SideNavItem[] {
  return groupItems.map((item) => {
    const basePath = item.href.split("#")[0];
    const needsSubItems = basePath === currentPath || item.href === currentPath;
    return {
      ...item,
      subItems: needsSubItems
        ? [
            { text: "Description", href: `${basePath}#description` },
            { text: "Context", href: `${basePath}#context` },
            {
              text: "Component Demo",
              href: `${basePath}#component-demo`,
            },
            { text: "Examples", href: `${basePath}#examples` },
          ]
        : item.subItems, // Preserve existing subItems
    };
  });
}
