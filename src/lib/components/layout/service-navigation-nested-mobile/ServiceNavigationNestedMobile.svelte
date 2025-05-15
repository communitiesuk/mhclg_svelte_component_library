<!-- 
  This component acts as a parent container for HeaderNav and MobileNav,
  managing the shared state and interactions for nested mobile navigation.
-->
<script lang="ts">
  // Removed import for $effect and $state as they are globals in Svelte 5
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import HeaderNav from "./HeaderNav.svelte";
  import MobileNav from "./MobileNav.svelte";
  import type { NavigationItem } from "./HeaderNav.svelte";
  import type { NavSection } from "./MobileNav.svelte";

  // --- Props ---
  let {
    serviceName = "Service Name",
    homeHref,
    // Used for the top desktop navigation
    navigationItems,
    // Used for the detailed structure within the mobile flyout menu
    mobileNavSections,
    currentSection, // Text for the current section, e.g., "Components"
    activeSectionHref, // Path of the active section, e.g. "/components"
    activeDetailHref, // Path of the specific active item, e.g. "/components/forms/button#examples"
  }: {
    serviceName?: string;
    homeHref: string;
    navigationItems: NavigationItem[];
    mobileNavSections: NavSection[];
    currentSection: string;
    activeSectionHref: string;
    activeDetailHref: string;
  } = $props();

  // --- State ---
  let isMobileNavOpen = $state(false);

  // --- Effects ---
  // Internal logic for deriving currentSection is removed.
  // The component now relies on the currentSection prop passed from the parent.

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
  {#if navigationItems && navigationItems.length > 0}
    <HeaderNav
      {serviceName}
      {homeHref}
      {navigationItems}
      bind:isMobileNavOpen
      activeItemHref={activeSectionHref}
      onToggle={handleToggleMobileNav}
    />
  {/if}
</div>

{#if isMobileNavOpen}
  <MobileNav
    sections={mobileNavSections}
    {currentSection}
    {activeSectionHref}
    {activeDetailHref}
    onNavigate={handleMobileNavigation}
    isOpen={isMobileNavOpen}
  />
{/if}
