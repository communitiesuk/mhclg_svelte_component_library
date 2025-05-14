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
    homeHref = "/",
    // Used for the top desktop navigation and determining the current section
    navigationItems = [],
    // Used for the detailed structure within the mobile flyout menu
    mobileNavSections = [],
  } = $props<{
    serviceName?: string;
    homeHref?: string;
    navigationItems: NavigationItem[];
    mobileNavSections: NavSection[];
  }>();

  // --- State ---
  let isMobileNavOpen = $state(false); // State for mobile menu visibility - reinstated $state
  let currentSection = $state(""); // Tracks the active top-level section - reinstated $state

  // --- Effects ---
  // Update current section based on route changes
  $effect(() => {
    const path = $page.url.pathname;

    // Find the matching top-level navigation item based on the current path
    const activeItem = navigationItems.find((item) =>
      path === "/"
        ? item.href === "/"
        : item.href !== "/" && path.startsWith(item.href),
    );

    currentSection = activeItem
      ? activeItem.text
      : path === "/"
        ? navigationItems[0]?.text || ""
        : "";
  });

  // --- Handlers ---
  // Toggle the mobile nav open/closed state
  function handleToggleMobileNav() {
    isMobileNavOpen = !isMobileNavOpen;
  }

  // Handle navigation request from mobile menu
  function handleMobileNavigation(href: string) {
    isMobileNavOpen = false; // Close the menu
    if (typeof window !== "undefined") {
      goto(href); // Navigate using SvelteKit's router
    }
  }
</script>

<!-- Render the HeaderNav -->
<HeaderNav
  {serviceName}
  {homeHref}
  {navigationItems}
  {currentSection}
  mobileNavIsOpen={isMobileNavOpen}
  onToggle={handleToggleMobileNav}
/>

<!-- Render the MobileNav -->
<MobileNav
  isOpen={isMobileNavOpen}
  sections={mobileNavSections}
  {currentSection}
  onNavigate={handleMobileNavigation}
/>
