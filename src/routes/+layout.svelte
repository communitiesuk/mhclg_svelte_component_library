<script lang="ts">
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
  import HeaderNav from "$lib/components/ui/HeaderNav.svelte";
  import MobileNav from "$lib/components/ui/MobileNav.svelte";
  import SideNav from "$lib/components/ui/SideNav.svelte";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import "../app.css";
  import type { SideNavGroup } from "$lib/components/ui/SideNav.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";


  let { children, data } = $props();

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
  const componentSections = data.componentSections || [];
  const componentDirectories = data.componentDirectories || [];
  const uiComponents = data.uiComponents || [];
  const componentTree = data.componentTree || [];

  console.log("Component Tree:", componentTree);

  // Helper function to create a proper URL from a component path
  function createComponentUrl(path: string): string {
    // If the path already starts with 'components/', remove it
    if (path.startsWith("components/")) {
      return `/${path}`;
    }
    return `/components/${path}`;
  }

  // Create empty fallback arrays
  const fallbackNavGroups: SideNavGroup[] = [];

  // Convert component tree to side nav groups
  const componentNavGroups: SideNavGroup[] =
    componentTree.length > 0
      ? componentTree.map((category) => {
          return {
            title: category.name,
            items: category.children
              ? category.children.map((child) => ({
                  text: child.name,
                  href: createComponentUrl(child.path),
                }))
              : [
                  {
                    text: category.name,
                    href: createComponentUrl(category.path),
                  },
                ],
          };
        })
      : fallbackNavGroups;

  console.log("Nav Groups:", componentNavGroups);

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

  // Create flattened items for the mobile navigation
  function createMobileItems(tree: any[]) {
    const result: any[] = [];

    tree.forEach((category) => {
      if (category.children && category.children.length > 0) {
        // Category with children
        const nestedItems = category.children.map((child) => {
          if (child.children && child.children.length > 0) {
            // Child with its own children (grandchildren)
            return {
              title: child.name,
              items: child.children.map((grandchild) => ({
                text: grandchild.name,
                href: createComponentUrl(grandchild.path),
              })),
            };
          } else {
            // Simple child
            return {
              text: child.name,
              href: createComponentUrl(child.path),
            };
          }
        });

        result.push({
          title: category.name,
          items: nestedItems,
        });
      } else {
        // Simple category without children
        result.push({
          text: category.name,
          href: createComponentUrl(category.path),
        });
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
    console.log("Current path changed:", path);

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

    console.log("Updated currentSection to:", currentSection);
    console.log("Navigation items:", navigationItems);
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
        return componentNavGroups.map((group) => {
          return {
            ...group,
            items: group.items.map((item) => {
              // Get base path without any hash
              const basePath = item.href.split("#")[0];

              return {
                ...item,
                // Add documentation section links based on the actual page structure
                subItems: [
                  { text: "Description", href: `${basePath}#description` },
                  { text: "Context", href: `${basePath}#context` },
                  { text: "Parameters", href: `${basePath}#parameters` },
                  {
                    text: "Component Demo",
                    href: `${basePath}#component-demo`,
                  },
                  { text: "Examples", href: `${basePath}#examples` },
                ],
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

    <div class="app-pane__body govuk-width-container">
      <!-- <div class="g-top-level-container mb-6">
        <Breadcrumbs collapseOnMobile={true} />
      </div> -->

      <div class="app-split-pane">
        <!-- Side navigation - show for Components, Patterns, or Community pages -->
        {#if currentSection !== "Home"}
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
</style>
