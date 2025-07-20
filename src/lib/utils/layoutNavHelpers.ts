import { base } from "$app/paths";
import type {
  SideNavItem,
  SideNavGroup,
} from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
import type { ComponentItem } from "../../routes/+layout.server"; // Adjust path as needed if +layout.server.ts is the source
import { forceWrapAtThirdCapital } from "./text-string-conversion/textStringConversion.js";

/**
 * Converts a potentially nested array of ComponentItem objects into a flat array of SideNavItem objects.
 * Only includes items that are actual component pages (i.e., item.hasWrapper === true).
 *
 * @param items - The array of ComponentItem objects to process, often representing category.children.
 * @returns A flat array of SideNavItem objects representing linkable component pages.
 *
 * @example
 * // Input (items):
 * // [{ name: "SubGroup", children: [{ name: "ActualButton", path:"components/core/button", hasWrapper:true }] },
 * //  { name: "ActualCard", path:"components/core/card", hasWrapper:true }]
 * // Output:
 * // [{ text: "ActualButton", href: "/components/core/button" },
 * //  { text: "ActualCard", href: "/components/core/card" }]
 */
export function extractLinkableComponentNavItems(
  items: ComponentItem[],
): SideNavItem[] {
  let navItems: SideNavItem[] = [];
  for (const item of items) {
    if (item.hasWrapper) {
      // If it's a wrapper, add it directly
      navItems.push({
        text: forceWrapAtThirdCapital(item.name),
        href: `${base}/${item.path}`,
        // subItems: undefined, // Explicitly no sub-items for direct wrappers here
      });
    }
    // If it's a folder (hasWrapper is false or undefined) AND has children, process children
    if (!item.hasWrapper && item.children && item.children.length > 0) {
      // Recursively get nav items from children and add them to the list
      navItems = navItems.concat(
        extractLinkableComponentNavItems(item.children),
      );
    }
  }
  return navItems;
}

/**
 * Transforms the raw componentTree into a structure suitable for mobile navigation.
 * It groups components under their categories or lists direct top-level links.
 *
 * @param tree - The componentTree data, an array of ComponentItem.
 * @returns An array structured for mobile navigation, containing SideNavItems or groups of SideNavItems.
 *
 * @example
 * // Input (tree):
 * // [{ name: "Core Components", children: [{ name: "Button", path:"components/core/button", hasWrapper:true }] },
 * //  { name: "Info Page", path:"info", hasWrapper:true}]
 * // Output:
 * // [{ title: "Core Components", items: [{ text: "Button", href: "/components/core/button" }] },
 * //  { text: "Info Page", href: "/info" }]
 */
export function createMobileItems(tree: ComponentItem[]) {
  const result: (SideNavItem | { title: string; items: SideNavItem[] })[] = [];
  tree.forEach((category) => {
    // Check if the category itself is a direct link (hasWrapper)
    if (category.hasWrapper) {
      result.push({
        text: forceWrapAtThirdCapital(category.name),
        href: `${base}/${category.path}`,
      });
    }
    // If the category has children, process them
    else if (category.children && category.children.length > 0) {
      // Use the existing helper to get a flat list of wrappers within this category
      const flattenedItems = extractLinkableComponentNavItems(
        category.children,
      );

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

/**
 * Returns the input string, intended as the title for the current navigation section.
 *
 * @remarks
 * Currently, this function acts as a direct pass-through.
 *
 * @param section - The name of the current section.
 * @returns The section title.
 *
 * @example
 * // Input (section): "Components"
 * // Output: "Components"
 */
export function getSectionTitle(section: string): string {
  return section;
}

/**
 * Processes a list of SideNavItems for a component group. If a SideNavItem's href matches
 * the currentPath, this function injects a predefined list of in-page section links
 * (e.g., to #description, #context) as 'subItems' to that active SideNavItem.
 *
 * @param groupItems - The list of SideNavItems in a specific group.
 * @param currentPath - The current URL path, used to identify the active item.
 * @returns The modified list of SideNavItems, with subItems potentially added to the active item.
 *
 * @example
 * // Input (groupItems):
 * // [{ text: "Button", href: "/components/core/button" }, { text: "Card", href: "/components/core/card" }]
 * // Input (currentPath):
 * // "/components/core/button"
 * // Output:
 * // [{ text: "Button", href: "/components/core/button", subItems: [{ text: "Description", href: "/components/core/button#description" }, (and other sections)] },
 * //  { text: "Card", href: "/components/core/card" }]
 */
export function addStandardSubItemsToActiveComponentLink(
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
