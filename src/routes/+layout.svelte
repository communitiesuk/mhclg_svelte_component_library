<script lang="ts">
  // --- Imports ---
  import Footer from "$lib/components/ui/Footer.svelte";
  import InternalHeader from "$lib/components/layout/InternalHeader.svelte";
  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";
  import "../app.css";
  import type { SideNavGroup } from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import { page } from "$app/state";
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";
  import {
    extractLinkableComponentNavItems,
    createMobileItems,
    getSectionTitle,
    addStandardSubItemsToActiveComponentLink,
  } from "$lib/utils/layoutNavHelpers";

  // --- Props ---
  let { children, data } = $props();

  // --- Core URL-Derived State ---
  let currentPath = $derived(page.url.pathname);
  let currentHash = $derived(page.url.hash);
  let activeDetailHref = $derived(currentPath + currentHash);
  let isDemoPage = $derived(
    currentPath.startsWith(
      "/components/layout/service-navigation-nested-mobile/mobile-demo",
    ),
  );

  // --- Section-Level Derived State ---
  let activeSectionInfo = $derived.by(() => {
    if (currentPath.startsWith("/components")) {
      return { sectionName: "Components", sectionHref: "/components" };
    }
    if (currentPath.startsWith("/patterns")) {
      return { sectionName: "Patterns", sectionHref: "/patterns" };
    }
    if (currentPath.startsWith("/community")) {
      return { sectionName: "Community", sectionHref: "/community" };
    }
    return { sectionName: "Home", sectionHref: "/" }; // Default
  });
  let currentSection = $derived(activeSectionInfo.sectionName);
  let activeSectionHref = $derived(activeSectionInfo.sectionHref);

  // --- Server Data ---
  // Get component data from server
  const componentTree = data.componentTree || [];

  // --- SideNav Related Data Construction ---
  const componentNavGroups: SideNavGroup[] =
    componentTree.length > 0
      ? componentTree.map((category) => ({
          title: category.name,
          items:
            category.children && category.children.length > 0
              ? extractLinkableComponentNavItems(category.children)
              : [],
        }))
      : [];

  const patternNavGroups: SideNavGroup[] = [
    {
      title: "Common patterns",
      items: [
        { text: "Forms", href: "/patterns/forms" },
        { text: "Tables", href: "/patterns/tables" },
      ],
    },
    {
      title: "Managing state",
      items: [
        {
          text: "State management",
          href: "/patterns/state-management",
        },
      ],
    },
  ];

  const communityNavGroups: SideNavGroup[] = [
    {
      title: "Community",
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ];

  // --- Dynamic Side Navigation Groups --- get the appropriate nav groups based on current section
  const navGroupsForCurrentSection = $derived.by(() => {
    const section = currentSection;

    switch (section) {
      case "Components":
        return componentNavGroups.map((group) => ({
          ...group,
          items: addStandardSubItemsToActiveComponentLink(
            group.items,
            currentPath,
          ),
        }));
      case "Patterns":
        return patternNavGroups;
      case "Community":
        return communityNavGroups;
      default:
        return [];
    }
  });

  // --- MobileNav Related Data Construction ---
  // Create structured component items for mobile navigation
  const structuredComponentItems =
    componentTree.length > 0 ? createMobileItems(componentTree) : [];

  // Mobile navigation sections (MobileNav relies on activeSectionHref & activeDetailHref)
  const mobileNavSections = [
    {
      title: "Home",
      href: "/",
      items: [{ text: "Overview", href: "/" }],
    },
    {
      title: "Components",
      href: "/components",
      items: structuredComponentItems,
    },
    {
      title: "Patterns",
      href: "/patterns",
      items: [
        {
          title: "Common patterns",
          items: [
            { text: "Forms", href: "/patterns/forms" },
            { text: "Tables", href: "/patterns/tables" },
          ],
        },
        {
          title: "Managing state",
          items: [
            {
              text: "State management",
              href: "/patterns/state-management",
            },
          ],
        },
      ],
    },
    {
      title: "Community",
      href: "/community",
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ];

  // --- Effects ---
  $effect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.add("js-enabled");
  });
</script>

{#if !isDemoPage}
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <InternalHeader
        homepageUrl="/"
        organisationName="MHCLG Digital Design & Development Team"
      />

      <!-- Use ServiceNavigationNestedMobile component -->
      <ServiceNavigationNestedMobile
        serviceName="Svelte Component Library"
        homeHref="/"
        {mobileNavSections}
        {activeSectionHref}
        {activeDetailHref}
      />

      <!-- Add Phase Banner here -->
      <PhaseBanner
        tagText="Alpha"
        linkHref="mailto:dataexplorerfeedback@communities.gov.uk"
      />
      <div class="app-pane__body govuk-width-container">
        <div class="app-split-pane">
          <!-- Side navigation - show for Components, Patterns, or Community pages -->
          {#if currentSection !== "Home"}
            <aside class="app-split-pane__nav">
              <SideNav
                title={getSectionTitle(currentSection)}
                groups={navGroupsForCurrentSection}
                currentItem={activeDetailHref}
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
