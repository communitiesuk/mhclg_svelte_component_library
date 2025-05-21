<!-- 
  This component acts as a parent container for HeaderNav and MobileNav,
  managing the shared state and interactions for nested mobile navigation.
-->
<script lang="ts">
  import HeaderNav from "./HeaderNav.svelte";
  import MobileNav from "./MobileNav.svelte";
  import type { NavigationItem } from "./HeaderNav.svelte";
  import type { NavSection } from "./MobileNav.svelte";

  // --- Props ---
  let {
    serviceName = "Service Name",
    homeHref,
    mobileNavSections,
    activeSectionHref, // Path of the active section, e.g. "/components"
    activeDetailHref, // Path of the specific active item, e.g. "/components/forms/button#examples"
  }: {
    serviceName?: string;
    homeHref: string;
    mobileNavSections: NavSection[];
    activeSectionHref: string;
    activeDetailHref: string;
  } = $props();

  // --- State ---
  let isMobileNavOpen = $state(false);

  // --- Derived headerNavigationItems for HeaderNav ---
  let headerNavigationItems = $derived(
    mobileNavSections.map(({ title, href }) => ({
      text: title,
      href: href ?? "",
    })),
  );

  // --- Handlers ---
  // Toggle the mobile nav open/closed state
  function handleToggleMobileNav() {
    isMobileNavOpen = !isMobileNavOpen;
  }

  // Handle navigation request from mobile menu
  function handleMobileNavigation() {
    isMobileNavOpen = false;
  }
</script>

<div>
  {#if headerNavigationItems && headerNavigationItems.length > 0}
    <HeaderNav
      {serviceName}
      {homeHref}
      navigationItems={headerNavigationItems}
      bind:isMobileNavOpen
      activeItemHref={activeSectionHref}
      onToggle={handleToggleMobileNav}
    />
  {/if}
</div>

{#if isMobileNavOpen}
  <MobileNav
    sections={mobileNavSections}
    {activeSectionHref}
    {activeDetailHref}
    onNavigate={handleMobileNavigation}
    isOpen={isMobileNavOpen}
  />
{/if}
