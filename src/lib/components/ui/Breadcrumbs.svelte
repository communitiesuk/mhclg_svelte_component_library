<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  /**
   * Breadcrumbs component
   *
   * Use this component to display a navigation path to the current page.
   *
   * Features:
   * - Automatically generates breadcrumbs based on the current route
   * - Set `collapseOnMobile` to true to show only the first and last items on mobile devices
   * - Set `inverse` to true to show white links on dark backgrounds (ensure contrast ratio of 4.5:1)
   * - Optionally provide custom items array to override automatic breadcrumb generation
   */

  // Define the BreadcrumbItem type
  export type BreadcrumbItem = {
    text: string;
    href: string;
  };

  // Component props
  let {
    items = undefined,
    collapseOnMobile = false,
    inverse = false,
    ariaLabel = "Breadcrumb",
  } = $props<{
    items?: BreadcrumbItem[];
    collapseOnMobile?: boolean;
    inverse?: boolean;
    ariaLabel?: string;
  }>();

  // Load all page modules for route detection
  const routeModules = $state<Record<string, any>>({});

  onMount(async () => {
    try {
      // Use Vite's glob import to get all page components
      const modules = import.meta.glob("/src/routes/**/+page.svelte", {
        eager: true,
      });
      Object.assign(routeModules, modules);
    } catch (error) {
      console.warn("Failed to load route modules:", error);
    }
  });

  // Add support detection
  let isSupported = $state(false);
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  // Generate the CSS classes
  let cssClasses = $derived(() => {
    let classes = "govuk-breadcrumbs";
    if (collapseOnMobile) classes += " govuk-breadcrumbs--collapse-on-mobile";
    if (inverse) classes += " govuk-breadcrumbs--inverse";
    return classes;
  });

  // Generate breadcrumb items automatically if not provided
  let breadcrumbItems = $state<BreadcrumbItem[]>([]);

  $effect(() => {
    breadcrumbItems = items || generateBreadcrumbItems($page, routeModules);
  });

  // Generate breadcrumb items from the current route
  function generateBreadcrumbItems(page, modules): BreadcrumbItem[] {
    const path = page.url.pathname;
    const pathSegments = path.split("/").filter((segment) => segment !== "");

    // Always include home page
    const items: BreadcrumbItem[] = [{ text: "Home", href: "/" }];

    // Build up paths for each breadcrumb
    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`;

      // Check if this path has a corresponding +page.svelte file
      const isValidRoute = isPathValid(currentPath, modules);

      // Add breadcrumb if it's a valid route or the current page
      if (isValidRoute || i === pathSegments.length - 1) {
        // Try to get custom title from module exports
        const customTitle = getCustomTitle(currentPath, modules, page.data);

        // Format text (convert slug to readable text)
        const text = customTitle || formatBreadcrumbText(pathSegments[i]);

        items.push({
          text: text,
          href: currentPath,
        });
      }
    }

    return items;
  }

  // Check if a path has a corresponding page component
  function isPathValid(path: string, modules: Record<string, any>): boolean {
    // For the root path
    if (path === "/") return true;

    // Normalize the path to check against module paths
    const modulePath = `/src/routes${path}/+page.svelte`;
    const dynamicModulePaths = Object.keys(modules).filter((m) => {
      // Convert dynamic route patterns like [id] to regex pattern that matches :id or actual values
      const pattern = m.replace(/\[([^\]]+)\]/g, "([^/]+)");
      const regex = new RegExp(
        `^${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      );
      return regex.test(modulePath);
    });

    return dynamicModulePaths.length > 0;
  }

  // Try to get custom title from module exports
  function getCustomTitle(
    path: string,
    modules: Record<string, any>,
    pageData: any,
  ): string | null {
    const modulePath = `/src/routes${path}/+page.svelte`;

    // Check for exact match first
    if (modules[modulePath]) {
      // Check if module exports pageTitle
      if (modules[modulePath].pageTitle) {
        return modules[modulePath].pageTitle;
      }

      // Check if module exports getPageTitle function
      if (typeof modules[modulePath].getPageTitle === "function") {
        return modules[modulePath].getPageTitle(pageData);
      }
    }

    // Check for dynamic routes
    const dynamicModulePath = Object.keys(modules).find((m) => {
      const pattern = m.replace(/\[([^\]]+)\]/g, "([^/]+)");
      const regex = new RegExp(
        `^${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      );
      return regex.test(modulePath);
    });

    if (dynamicModulePath && modules[dynamicModulePath]) {
      if (modules[dynamicModulePath].pageTitle) {
        return modules[dynamicModulePath].pageTitle;
      }

      if (typeof modules[dynamicModulePath].getPageTitle === "function") {
        return modules[dynamicModulePath].getPageTitle(pageData);
      }
    }

    return null;
  }

  /**
   * Converts route segments to human-readable text
   */
  function formatBreadcrumbText(text: string): string {
    // Handle special cases
    if (text === "ui") return "UI Components";
    if (text === "data-vis") return "Data Visualization";
    if (text === "content") return "Content Components";
    if (text === "layout") return "Layout Components";
    if (text === "user-guide") return "User Guide";
    if (text === "playground") return "Playground";
    if (text === "components") return "Components";
    if (text === "local-lib") return "Local Library";

    // Default: capitalize and replace hyphens with spaces
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
</script>

<nav class={cssClasses} aria-label={ariaLabel}>
  <ol class="govuk-breadcrumbs__list">
    {#each breadcrumbItems as item, i}
      <li class="govuk-breadcrumbs__list-item">
        <a class="govuk-breadcrumbs__link" href={item.href}>{item.text}</a>
      </li>
    {/each}
  </ol>
</nav>
