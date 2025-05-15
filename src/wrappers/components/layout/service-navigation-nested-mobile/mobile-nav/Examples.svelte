<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import MobileNav from "$lib/components/layout/service-navigation-nested-mobile/MobileNav.svelte";

  // Example 1: Basic MobileNav with an external toggle button
  let ex1IsOpen = $state(false);
  const ex1Sections = [
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
            {
              text: "Notifications",
              href: "#/settings/preferences/notifications",
            },
            { text: "Theme", href: "#/settings/preferences/theme" },
          ],
        },
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
  let ex1ActiveSectionHref = $state("#/dashboard");
  let ex1ActiveDetailHref = $state("#/dashboard/overview");

  function ex1ToggleMobileNav() {
    ex1IsOpen = !ex1IsOpen;
  }

  function ex1HandleNavigate(href: string, event?: MouseEvent) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    alert(`Example 1: Navigating to ${href}. Default navigation prevented.`);
    const newActiveSection = ex1Sections.find((section) =>
      href.startsWith(section.href || "@@@no-href@@@"),
    );
    if (newActiveSection && newActiveSection.href) {
      ex1ActiveSectionHref = newActiveSection.href;
    }
    ex1ActiveDetailHref = href;

    // In a real app, you might close the nav here: ex1IsOpen = false;
    // And then use SvelteKit's goto(href);
  }

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. MobileNav with External Toggle Button",
      content: Example1,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
  >
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet Example1()}
  <div class="p-5 bg-white border border-neutral-300 relative">
    <p class="govuk-body mb-4">
      This example shows how to control the <code>MobileNav</code> component's visibility
      using an external button. Click the button below to toggle the navigation panel.
      The panel is styled to appear even on desktop for this demo.
    </p>
    <button class="govuk-button mb-4" onclick={ex1ToggleMobileNav}>
      {ex1IsOpen ? "Close" : "Open"} Mobile Menu
    </button>

    <div
      class="demo-mobile-nav-container relative min-h-[300px] border border-dashed border-gray-400 bg-gray-50 p-2"
    >
      {#if ex1IsOpen}
        <MobileNav
          isOpen={ex1IsOpen}
          sections={ex1Sections}
          activeSectionHref={ex1ActiveSectionHref}
          activeDetailHref={ex1ActiveDetailHref}
          onNavigate={ex1HandleNavigate}
        />
      {:else}
        <p class="text-center text-gray-500 italic p-4">
          MobileNav is closed. Click the button above to open.
        </p>
      {/if}
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

<style>
  /* Styles from MobileNavWrapper to force visibility in demo */
  .demo-mobile-nav-container
    :global(nav.app-mobile-nav.app-mobile-nav--active) {
    display: block !important;
    /* For demo purposes, let's make it appear within the container */
    position: absolute; /* Or relative, depending on desired effect */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
</style>
