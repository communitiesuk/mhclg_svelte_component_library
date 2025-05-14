<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import { onMount } from "svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic HeaderNav Example with Hash Navigation",
      content: Example1,
    },
  ];

  // Props for Example 1
  let ex1ServiceName = "My Application";
  let ex1NavigationItems = $state([
    { text: "Home", href: "#/home", current: true },
    { text: "Features", href: "#/features", current: false },
    { text: "Pricing", href: "#/pricing", current: false },
    { text: "Contact", href: "#/contact", current: false },
  ]);
  let ex1CurrentSection = $state("Home");
  let ex1MobileNavOpen = $state(false);

  function ex1ToggleMobileNav() {
    ex1MobileNavOpen = !ex1MobileNavOpen;
  }

  function updateSectionFromHash() {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      let section = "Home"; // Default section
      if (hash.startsWith("#/features")) {
        section = "Features";
      } else if (hash.startsWith("#/pricing")) {
        section = "Pricing";
      } else if (hash.startsWith("#/contact")) {
        section = "Contact";
      } else if (hash.startsWith("#/home")) {
        section = "Home";
      }
      ex1CurrentSection = section;
      // Also update the current status in navigationItems for visual feedback if HeaderNav doesn't do it automatically based on currentSection prop alone
      ex1NavigationItems = ex1NavigationItems.map((item) => ({
        ...item,
        current: item.text === section,
      }));
      // Optionally close mobile nav on navigation
      if (ex1MobileNavOpen) {
        ex1MobileNavOpen = false;
      }
    }
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      // Initial update based on current hash, if any
      updateSectionFromHash();
      window.addEventListener("hashchange", updateSectionFromHash);
      return () => {
        window.removeEventListener("hashchange", updateSectionFromHash);
      };
    }
  });
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
  <div class="p-5 bg-white border border-neutral-300">
    <p class="govuk-body">
      To test the mobile menu, please reduce your screen width to below a
      typical mobile breakpoint.
    </p>
    <p class="mb-2 text-sm text-gray-600">
      Current simulated section: <strong class="text-orange-600"
        >{ex1CurrentSection}</strong
      > (Click links below)
    </p>
    <HeaderNav
      serviceName={ex1ServiceName}
      navigationItems={ex1NavigationItems}
      bind:currentSection={ex1CurrentSection}
      bind:mobileNavIsOpen={ex1MobileNavOpen}
      onToggle={ex1ToggleMobileNav}
    />
    {#if ex1MobileNavOpen}
      <div class="p-4 bg-gray-100 mt-2">
        <p class="font-semibold mb-2">Mobile Menu (Simulated)</p>
        <ul>
          {#each ex1NavigationItems as item}
            <li>
              <a href={item.href} class="text-blue-600 hover:underline"
                >{item.text}</a
              >
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
