<script lang="ts">
  import HeaderNav from "./HeaderNav.svelte";
  import MobileNav from "./MobileNav.svelte";
  import SideNav from "./SideNav.svelte";
  import { onMount } from "svelte";

  // Example navigation data
  const topNavItems = [
    { text: "Get started", href: "/get-started" },
    { text: "Components", href: "/components", current: true },
    { text: "Patterns", href: "/patterns" },
    { text: "Community", href: "/community" },
  ];

  // Current section
  let currentSection = $state("Components");

  // Mobile nav sections
  const mobileNavSections = [
    {
      title: "Get started",
      href: "/get-started",
      items: [
        {
          text: "Accessibility testing",
          href: "/get-started/accessibility-testing",
        },
        { text: "Install DWP Frontend", href: "/get-started/npm" },
      ],
    },
    {
      title: "Components",
      href: "/components",
      current: true,
      items: [
        {
          text: "External service footer",
          href: "/components/external-service-footer",
        },
        { text: "Header navigation", href: "/components/header-navigation" },
        { text: "Timeline", href: "/components/timeline" },
      ],
    },
    {
      title: "Patterns",
      href: "/patterns",
      items: [
        {
          title: "Help users to...",
          items: [
            { text: "Add another thing", href: "/patterns/add-another-thing" },
          ],
        },
        {
          title: "Pages",
          items: [{ text: "Cookies page", href: "/patterns/cookies-page" }],
        },
      ],
    },
    {
      title: "Community",
      href: "/community",
      items: [{ text: "Latest updates", href: "/community/latest-updates" }],
    },
  ];

  // Side nav items
  const sideNavItems = [
    {
      text: "External service footer",
      href: "/components/external-service-footer",
    },
    { text: "Header navigation", href: "/components/header-navigation" },
    { text: "Timeline", href: "/components/timeline", current: true },
  ];

  // Mobile nav state
  let isMobileNavOpen = $state(false);

  // Handle toggle mobile nav event
  function handleToggleMobileNav(event: CustomEvent<boolean>) {
    isMobileNavOpen = event.detail;
  }
</script>

<div class="app-pane">
  <!-- Header with top navigation -->
  <HeaderNav
    productName="Design System"
    logoText="DWP"
    navigationItems={topNavItems}
    {currentSection}
    on:toggleMobileNav={handleToggleMobileNav}
  />

  <!-- Mobile navigation -->
  <MobileNav
    isOpen={isMobileNavOpen}
    sections={mobileNavSections}
    {currentSection}
  />

  <div class="app-pane__body">
    <!-- Side navigation -->
    <SideNav
      title="Pages in this section"
      items={sideNavItems}
      currentItem="Timeline"
    />

    <!-- Main content area would go here -->
    <div class="app-pane__content">
      <h1>Example content</h1>
      <p>This demonstrates the three navigation components working together.</p>
    </div>
  </div>
</div>
