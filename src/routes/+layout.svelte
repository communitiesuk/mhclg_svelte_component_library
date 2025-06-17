<script lang="ts">
  // --- Imports ---
  import { base } from "$app/paths";

  import CookieBanner from "$lib/components/ui/CookieBanner.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
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
  import {
    handleCookiesNavigation,
    createCookiesUrl,
  } from "$lib/utils/cookiesNavigation";

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
    if (currentPath.startsWith("/get-started")) {
      return { sectionName: "Get started", sectionHref: "/get-started" };
    }
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
    // {
    //   title: "Common patterns",
    //   items: [
    //     { text: "Forms", href: "/patterns/forms" },
    //     { text: "Tables", href: "/patterns/tables" },
    //   ],
    // },
  ];

  const communityNavGroups: SideNavGroup[] = [];

  const getStartedNavGroups: SideNavGroup[] = [
    {
      title: "Setup guides",
      items: [
        {
          text: "About & Benefits",
          href: "/get-started/about-benefits",
        },
        { text: "Installation and usage", href: "/get-started" },
      ],
    },
    {
      title: "Component library usage guides",
      items: [
        {
          text: "Component statuses",
          href: "/get-started/component-statuses",
        },
      ],
    },
  ];

  // --- Dynamic Side Navigation Groups --- get the appropriate nav groups based on current section
  const navGroupsForCurrentSection = $derived.by(() => {
    const section = currentSection;

    switch (section) {
      case "Get started":
        return getStartedNavGroups;
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

  // Check if there are any navigation items to show
  const hasNavigationItems = $derived.by(() => {
    const groups = navGroupsForCurrentSection;
    if (!groups || groups.length === 0) return false;

    // Check if any group has items
    return groups.some((group) => group.items && group.items.length > 0);
  });

  // --- MobileNav Related Data Construction ---
  // Create structured component items for mobile navigation
  const structuredComponentItems =
    componentTree.length > 0 ? createMobileItems(componentTree) : [];

  // Mobile navigation sections (MobileNav relies on activeSectionHref & activeDetailHref)
  const mobileNavSections = [
    {
      title: "Get started",
      href: "/get-started",
      items: [
        { text: "Installation and usage", href: "/get-started" },
        {
          text: "About & Benefits",
          href: "/get-started/about-benefits",
        },
        {
          text: "Component statuses",
          href: "/get-started/component-statuses",
        },
      ],
    },
    // {
    //   title: "Home",
    //   href: "/",
    //   items: [{ text: "Overview", href: "/" }],
    // },
    {
      title: "Components",
      href: "/components",
      items: structuredComponentItems,
    },
    {
      title: "Patterns",
      href: "/patterns",
      items: [
        // {
        //   title: "Common patterns",
        //   items: [
        //     { text: "Forms", href: "/patterns/forms" },
        //     { text: "Tables", href: "/patterns/tables" },
        //   ],
        // },
      ],
    },
    {
      title: "Community",
      href: "/community",
      items: [],
    },
  ];

  // --- Cookies Navigation Logic ---
  let cookiesUrl = $derived(createCookiesUrl());

  // --- Effects ---
  $effect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.add("js-enabled");
  });
</script>

{#if !isDemoPage}
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <CookieBanner />
      <InternalHeader
        homepageUrl="/"
        organisationName="MHCLG Digital, Data and Information"
        includeCrest={false}
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
        bannerText="This service is in development and intended to be production-ready and available for use by the digital community in Autumn 2025"
        linkText=""
      />
      <div
        class="app-pane__body"
        class:govuk-width-container={currentPath !== base + "/"}
      >
        <div class={currentPath !== base + "/" ? "app-split-pane" : ""}>
          <!-- Side navigation - only shown if not Home and has navigation items -->

          {#if currentPath !== base + "/" && hasNavigationItems}
            <aside class="app-split-pane__nav">
              <SideNav
                title={getSectionTitle(currentSection)}
                groups={navGroupsForCurrentSection}
                currentItem={activeDetailHref}
              />
            </aside>
          {/if}
          <!-- Main content area -->
          <div
            class:app-split-pane__content={currentPath !== base + "/" &&
              hasNavigationItems}
            class:app-content={currentPath !== base + "/"}
          >
            {@render children()}
          </div>
        </div>
      </div>
    </div>

    <Footer
      inlineLinks={[
        {
          href: cookiesUrl,
          label: "Cookies",
          onclick: handleCookiesNavigation,
        },
        { href: "/privacy-policy", label: "Privacy Policy" },
      ]}
    />
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
    /* width: 100%; */ /* Removed to let govuk-width-container manage width and margins */
  }

  /* Split pane layout */
  @media (min-width: 40.0625em) {
    .app-split-pane {
      display: flex;
      position: relative;
      min-height: 0;
      overflow: inherit;
      min-width: 0;
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

  /* Add padding for smaller devices */
  .app-content {
    padding: 15px 0 20px;
  }

  /* Adjust padding for larger devices */
  @media (min-width: 40.0625em) {
    .app-content {
      padding: 30px 0px 30px 0px;
    }
  }
</style>
