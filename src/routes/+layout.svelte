<script lang="ts">
  import Footer from "$lib/components/ui/Footer.svelte";
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import MobileNav from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import "../app.css";
  import type {
    SideNavGroup,
    SideNavItem,
  } from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import type { ComponentItem } from "./+layout.server";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";

  let { children, data } = $props();

  // Determine if the current page is the special demo page
  let isDemoPage = $derived(
    $page.url.pathname.startsWith(
      "/components/layout/service-navigation-nested-mobile/mobile-demo",
    ),
  );

  // Current section for navigation
  let currentSection = $state("Home"); // Default to Home

  // --- Central Mobile Navigation State ---

  // Mobile navigation state
  let isMobileNavOpen = $state(false);

  // Current page for side navigation
  let currentPage = $state("");

  // Top navigation items
  let navigationItems = $state([
    { text: "Home", href: "/", current: true },
    { text: "Components", href: "/components", current: false },
    { text: "Patterns", href: "/patterns", current: false },
    { text: "Community", href: "/community", current: false },
  ]);

  // Get component data from server
  let componentTree = data.componentTree || [];

  // Create Pattern nav items based on the mobile nav structure
  const patternNavGroups: SideNavGroup[] = [
    {
      title: "Common patterns",
      items: [
        { text: "Forms", href: "/patterns/forms" },
        { text: "Tables", href: "/patterns/tables" },
      ],
    },
  ];

  // Create Community nav items based on the mobile nav structure
  const communityNavGroups: SideNavGroup[] = [
    {
      title: "Community",
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ];

  // Helper to recursively extract actual component wrappers into a flat SideNavItem list
  function mapComponentItemsToSideNavItems(
    items: ComponentItem[],
  ): SideNavItem[] {
    let navItems: SideNavItem[] = [];
    for (const item of items) {
      if (item.hasWrapper) {
        // If it's a wrapper, add it directly
        navItems.push({
          text: item.name,
          href: `/${item.path}`,
          subItems: undefined, // Explicitly no sub-items for direct wrappers here
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

  // Convert component tree to side nav groups using the helper
  const componentNavGroups: SideNavGroup[] =
    componentTree.length > 0
      ? componentTree.map((category) => {
          return {
            title: category.name,
            items:
              category.children && category.children.length > 0 // Check if children exist
                ? mapComponentItemsToSideNavItems(category.children)
                : [],
          };
        })
      : [];

  // Create items for the mobile navigation
  function createMobileItems(tree: ComponentItem[]) {
    const result: (SideNavItem | { title: string; items: SideNavItem[] })[] =
      [];

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
        const flattenedItems = mapComponentItemsToSideNavItems(
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

  // Empty fallback for mobile items
  const fallbackMobileItems: any[] = [];

  // Create structured component items for mobile navigation
  const structuredComponentItems =
    componentTree.length > 0
      ? createMobileItems(componentTree)
      : fallbackMobileItems;

  // Mobile navigation sections
  const mobileNavSections = $state([
    {
      title: "Home",
      href: "/",
      current: true,
      items: [{ text: "Overview", href: "/" }],
    },
    {
      title: "Components",
      href: "/components",
      current: false,
      items: structuredComponentItems,
    },
    {
      title: "Patterns",
      href: "/patterns",
      current: false,
      items: [
        {
          title: "Common patterns",
          items: [
            { text: "Forms", href: "/patterns/forms" },
            { text: "Tables", href: "/patterns/tables" },
          ],
        },
      ],
    },
    {
      title: "Community",
      href: "/community",
      current: false,
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ]);

  // --- Mobile Navigation Handlers ---
  // Toggle the mobile nav open/closed state
  function handleToggleMobileNav() {
    isMobileNavOpen = !isMobileNavOpen;
  }

  // Handle navigation request from mobile menu
  function handleMobileNavigation(href: string) {
    isMobileNavOpen = false; // Close the menu
    if (typeof window !== "undefined") {
      goto(href); // Navigate
    }
  }

  // Update current section based on route changes (using the page store)
  $effect(() => {
    if (typeof window === "undefined") return;

    // Add js-enabled class to body once
    document.body.classList.add("js-enabled");
  });

  // Use the page store to track route changes and update the active section
  $effect(() => {
    // Get current path from the page store (reactive)
    const path = $page.url.pathname;

    // Reset all navigation items to not current
    for (let i = 0; i < navigationItems.length; i++) {
      navigationItems[i].current = false;
    }

    // Update mobile sections to all not current
    for (let i = 0; i < mobileNavSections.length; i++) {
      mobileNavSections[i].current = false;
    }

    // Set current section based on path
    if (path.startsWith("/components")) {
      currentSection = "Components";
      navigationItems[1].current = true;
      mobileNavSections[1].current = true;
    } else if (path.startsWith("/patterns")) {
      currentSection = "Patterns";
      navigationItems[2].current = true;
      mobileNavSections[2].current = true;
    } else if (path.startsWith("/community")) {
      currentSection = "Community";
      navigationItems[3].current = true;
      mobileNavSections[3].current = true;
    } else {
      // Root or any other path
      currentSection = "Home";
      navigationItems[0].current = true;
      mobileNavSections[0].current = true;
    }
  });

  $effect(() => {
    if (typeof window === "undefined") return;
    // Set current page based on path
    currentPage = $page.url.pathname.split("/").pop() || "";
  });

  // Function to get the appropriate nav groups based on current section
  function getNavGroupsForSection(section: string): SideNavGroup[] {
    switch (section) {
      case "Components":
        // For Components section, add sub-navigation items with hash links to documentation sections
        const currentPath = $page.url.pathname;

        return componentNavGroups.map((group) => {
          return {
            ...group,
            items: group.items.map((item) => {
              // Get base path without any hash
              const basePath = item.href.split("#")[0];

              // Add subItems only if this is a component item (not a category or placeholder)
              // and either this item is current or is about to become current
              const needsSubItems =
                basePath === currentPath || item.href === currentPath;

              return {
                ...item,
                // Add documentation section links only for the current component
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
                  : item.subItems, // Preserve any existing subItems for non-current items
              };
            }),
          };
        });
      case "Patterns":
        return patternNavGroups;
      case "Community":
        return communityNavGroups;
      default:
        return [];
    }
  }

  // Function to get the appropriate section title for the side navigation
  function getSectionTitle(section: string): string {
    return section;
  }
</script>

{#if !isDemoPage}
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <InternalHeader
        homepageUrl="/"
        organisationName="MHCLG Digital Design & Development Team"
      />

      <!-- Navigation with logo and mobile menu -->
      <HeaderNav
        serviceName="Svelte Component Library"
        {navigationItems}
        {currentSection}
        mobileNavIsOpen={isMobileNavOpen}
        onToggle={handleToggleMobileNav}
      />

      <!-- Mobile navigation -->
      <MobileNav
        isOpen={isMobileNavOpen}
        sections={mobileNavSections}
        {currentSection}
        onNavigate={handleMobileNavigation}
      />

      <!-- Add Phase Banner here -->
      <PhaseBanner
        tagText="Alpha"
        linkHref="mailto:dataexplorerfeedback@communities.gov.uk"
      />

      <div class="app-pane__body govuk-width-container">
        <div class="app-split-pane">
          <!-- Side navigation - show for Components, Patterns, or Community pages -->
          {#if currentSection !== "Home" && (currentSection != "Components" || currentPage === "components")}
            <aside class="app-split-pane__nav">
              <SideNav
                title={getSectionTitle(currentSection)}
                groups={getNavGroupsForSection(currentSection)}
                currentItem={currentPage}
              />
            </aside>
          {/if}

          <!-- Main content area -->
          <div class="app-split-pane__content app-content">
            {@render children()}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
{:else}
  <!-- For demo page, render children directly without any layout chrome -->
  {@render children()}
{/if}

<style>
  /* Add styles to support the app-pane layout */
  .app-pane__body {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Split pane layout */
  @media (min-width: 40.0625em) {
    .app-split-pane {
      display: flex;
      position: relative;
      min-height: 0;
      overflow: inherit;
    }
  }

  @media (min-width: 1160px) {
    .app-split-pane {
      width: 100%;
    }
  }

  .app-split-pane__nav {
    display: none;
  }

  @media (min-width: 40.0625em) {
    .app-split-pane__nav {
      display: block;
      width: 210px;
      flex: 0 0 auto;
    }
  }

  @media (min-width: 48.0625em) {
    .app-split-pane__nav {
      width: 260px;
    }
  }

  @media (min-width: 40.0625em) {
    .app-split-pane__content {
      display: flex;
      min-width: 0;
      flex: 1 1 100%;
      flex-direction: column;
    }
  }

  .app-content {
    padding: 15px 0 20px;
  }

  /* Override the govuk-width-container for the app-pane__body */
  .app-pane__body.govuk-width-container {
    max-width: 85%; /* Use more of the available width */
    /* Ensure it remains centered*/
    margin-left: auto;
    margin-right: auto;
  }
</style>
