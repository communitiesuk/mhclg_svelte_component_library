<script lang="ts">
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
  import HeaderNav from "$lib/components/ui/HeaderNav.svelte";
  import MobileNav from "$lib/components/ui/MobileNav.svelte";
  import SideNav from "$lib/components/ui/SideNav.svelte";
  import "../app.css";
  let { children, data } = $props();

  // Current section for navigation
  let currentSection = $state("Home");

  // Mobile navigation state
  let isMobileNavOpen = $state(false);

  // Current page for side navigation
  let currentPage = $state("");

  // Top navigation items
  const navigationItems = [
    { text: "Home", href: "/", current: true },
    { text: "Components", href: "/components" },
    { text: "Patterns", href: "/patterns" },
    { text: "Community", href: "/community" },
  ];

  // Mobile navigation sections
  const mobileNavSections = [
    {
      title: "Home",
      href: "/",
      current: true,
      items: [
        { text: "Overview", href: "/" },
        { text: "Getting started", href: "/getting-started" },
      ],
    },
    {
      title: "Components",
      href: "/components",
      items: [
        { text: "Buttons", href: "/components/buttons" },
        { text: "Forms", href: "/components/forms" },
        { text: "Navigation", href: "/components/navigation" },
      ],
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

  // Side navigation items for components page
  const componentNavItems = [
    { text: "Buttons", href: "/components/buttons" },
    { text: "Forms", href: "/components/forms" },
    { text: "Navigation", href: "/components/navigation" },
  ];

  // Handle toggle mobile nav event
  function handleToggleMobileNav(event: CustomEvent<boolean>) {
    isMobileNavOpen = event.detail;
  }

  // Update current section based on route
  $effect(() => {
    if (typeof window === "undefined") return;

    // Add js-enabled class to body
    document.body.classList.add("js-enabled");

    // Get current path
    const path = window.location.pathname;

    // Set current section based on path
    if (path.startsWith("/components")) {
      currentSection = "Components";
    } else if (path.startsWith("/patterns")) {
      currentSection = "Patterns";
    } else if (path.startsWith("/community")) {
      currentSection = "Community";
    } else {
      currentSection = "Home";
    }

    // Update navigation items
    navigationItems.forEach((item) => {
      item.current = item.text === currentSection;
    });

    // Update mobile sections
    mobileNavSections.forEach((section) => {
      section.current = section.title === currentSection;
    });
  });

  $effect(() => {
    if (typeof window === "undefined") return;
    // Set current page based on path
    currentPage = window.location.pathname.split("/").pop() || "";
  });
</script>

<div class="min-h-screen flex flex-col">
  <div class="flex-grow">
    <!-- Navigation with logo and mobile menu -->
    <HeaderNav
      serviceName="Service name"
      {navigationItems}
      {currentSection}
      on:toggleMobileNav={handleToggleMobileNav}
    />

    <!-- Mobile navigation -->
    <MobileNav
      isOpen={isMobileNavOpen}
      sections={mobileNavSections}
      {currentSection}
    />

    <div class="app-pane__body govuk-width-container">
      <div class="g-top-level-container mb-6">
        <Breadcrumbs collapseOnMobile={true} />
      </div>

      <div class="app-split-pane">
        <!-- Side navigation - only show on components, patterns, or community pages -->
        {#if currentSection === "Components"}
          <div class="app-split-pane__nav">
            <SideNav
              title="Components"
              items={componentNavItems}
              currentItem={currentPage}
            />
          </div>
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
