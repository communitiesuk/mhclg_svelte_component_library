<script lang="ts">
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import type { BreadcrumbItem } from "$lib/components/ui/Breadcrumbs.svelte";

  /**
   * Breadcrumbs Wrapper Component
   *
   * This component automatically generates breadcrumbs based on the current route.
   * It supports customization through props and handles route translation to human-readable text.
   */

  let {
    inverse = false,
    collapseOnMobile = true,
    ariaLabel = "Breadcrumb",
  } = $props<{
    inverse?: boolean;
    collapseOnMobile?: boolean;
    ariaLabel?: string;
  }>();

  // Generate breadcrumb items from current route
  let breadcrumbItems = $state<BreadcrumbItem[]>([]);

  $effect(() => {
    breadcrumbItems = generateBreadcrumbItems($page);
  });

  // Function to generate breadcrumb items from the page info
  function generateBreadcrumbItems(page): BreadcrumbItem[] {
    const path = page.url.pathname;
    const pathSegments = path.split("/").filter((segment) => segment !== "");

    // Always include home page
    const items: BreadcrumbItem[] = [{ text: "Home", href: "/" }];

    // Build up paths for each breadcrumb
    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`;

      // Format text (convert slug to readable text)
      const text = formatBreadcrumbText(pathSegments[i]);

      items.push({
        text: text,
        href: currentPath,
      });
    }

    return items;
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

<Breadcrumbs items={breadcrumbItems} {collapseOnMobile} {inverse} {ariaLabel} />
