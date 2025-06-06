export const codeBlock1 = `
<script lang="ts">
  import MobileNav from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";
  // Import NavSection and SubNavItem types if you need to define 'sections' data elsewhere
  // import type { NavSection, SubNavItem } from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";

  let isOpen = $state(false);
  const sections = [
    {
      title: "Dashboard",
      href: "#/dashboard",
      items: [
        { text: "Overview", href: "#/dashboard/overview" },
        { text: "Analytics", href: "#/dashboard/analytics" },
      ],
    },
    {
      title: "Settings",
      href: "#/settings",
      items: [
        { text: "Profile", href: "#/settings/profile" },
        { text: "Account", href: "#/settings/account" },
        {
          title: "Preferences", // Nested group
          items: [
            { text: "Notifications", href: "#/settings/preferences/notifications" },
            { text: "Theme", href: "#/settings/preferences/theme" },
          ]
        }
      ],
    },
    {
      title: "Help",
      href: "#/help",
      items: [
        { text: "FAQ", href: "#/help/faq" },
        { text: "Support", href: "#/help/support" },
      ],
    },
  ];
  let activeSectionHref = $state("#/dashboard");
  let activeDetailHref = $state("#/dashboard/overview");

  function toggleMobileNav() {
    isOpen = !isOpen;
  }

  function handleNavigate(href: string, event?: MouseEvent) { // Make event optional
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    alert("Navigating to: " + href + ". Default navigation prevented.");
    // Update active states for the example upon navigation
    activeDetailHref = href;
    const newActiveSection = sections.find(section => href.startsWith(section.href || '@@@no-href@@@'));
    if (newActiveSection && newActiveSection.href) {
        activeSectionHref = newActiveSection.href;
    }
    // Potentially close nav: isOpen = false;
    // Potentially navigate: goto(href);
  }
</script>

<button class="govuk-button" onclick={toggleMobileNav}>
  {isOpen ? "Close" : "Open"} Mobile Menu
</button>

{#if isOpen} 
  <div class="relative mt-2 border border-gray-300 p-2 min-h-[300px]">
    <MobileNav
      {isOpen} 
      {sections}
      {activeSectionHref}
      {activeDetailHref}
      {onNavigate}
    />
    <p class="text-xs text-gray-500 mt-2">Container for MobileNav (panel might be positioned absolutely)</p>
  </div>
{/if}
`;
