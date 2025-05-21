<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";
  import HeaderNav from "$lib/components/layout/service-navigation-nested-mobile/HeaderNav.svelte";
  import { onMount } from "svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic HeaderNav Example with Hash-Driven Active State",
      content: Example1,
    },
  ];

  // Props for Example 1
  let ex1ServiceName = "My Application";
  let ex1HomeHref = "#/";
  let ex1NavigationItems = [
    { text: "Home", href: "#/home" },
    { text: "Features", href: "#/features" },
    { text: "Pricing", href: "#/pricing" },
    { text: "Contact", href: "#/contact" },
  ];
  let ex1ActiveItemHref = $state("#/home");
  let ex1IsMobileNavOpen = $state(false);

  function ex1ToggleMobileNav() {
    ex1IsMobileNavOpen = !ex1IsMobileNavOpen;
  }

  function updateActiveItemFromHash() {
    const hash = window.location.hash;
    const matched = ex1NavigationItems.find((item) =>
      hash.startsWith(item.href),
    );
    ex1ActiveItemHref = matched ? matched.href : "#/home";
    ex1IsMobileNavOpen = false;
  }

  onMount(updateActiveItemFromHash);
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
      Current active link (driven by ex1ActiveItemHref/URL Hash): <strong
        class="text-orange-600">{ex1ActiveItemHref}</strong
      >
    </p>
    <HeaderNav
      serviceName={ex1ServiceName}
      homeHref={ex1HomeHref}
      navigationItems={ex1NavigationItems}
      activeItemHref={ex1ActiveItemHref}
      bind:isMobileNavOpen={ex1IsMobileNavOpen}
      onToggle={ex1ToggleMobileNav}
    />
    {#if ex1IsMobileNavOpen}
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

<svelte:window on:hashchange={updateActiveItemFromHash} />
