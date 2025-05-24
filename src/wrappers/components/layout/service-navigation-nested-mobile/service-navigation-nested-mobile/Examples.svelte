<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import ServiceNavigationNestedMobile from "$lib/components/layout/service-navigation-nested-mobile/ServiceNavigationNestedMobile.svelte";

  // Sample data for navigation
  let sampleNavItems = [
    { text: "Home", href: "/", current: true },
    { text: "Components", href: "/components", current: false },
    { text: "Patterns", href: "/patterns", current: false },
    { text: "Community", href: "/community", current: false },
  ];

  let sampleMobileSections = [
    {
      title: "Home",
      href: "/",
      current: true,
      items: [{ text: "Overview", href: "/" }],
    },
    {
      title: "Components",
      href: "/components",
      current: false,
      items: [
        {
          title: "Forms",
          items: [
            { text: "Button", href: "/components/ui/button" },
            { text: "Checkbox", href: "/components/ui/checkbox" },
            { text: "Select", href: "/components/ui/select" },
          ],
        },
        {
          title: "Layout",
          items: [
            {
              text: "Internal Header",
              href: "/components/layout/internal-header",
            },
            { text: "Phase Banner", href: "/components/layout/phase-banner" },
          ],
        },
      ],
    },
    {
      title: "Patterns",
      href: "/patterns",
      current: false,
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
      current: false,
      items: [
        { text: "Updates", href: "/community/updates" },
        { text: "Contributing", href: "/community/contributing" },
      ],
    },
  ];

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Mobile View (Forced)",
      content: Example2,
    },
  ];
</script>

<div>
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass="w-full"
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
  <div
    class="p-5 bg-white border border-dashed border-gray-400 relative h-48 overflow-hidden"
  >
    <ServiceNavigationNestedMobile
      serviceName="Example Service"
      homeHref="/"
      navigationItems={sampleNavItems}
      mobileNavSections={sampleMobileSections}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <p class="mb-4">
      This example demonstrates the mobile navigation by embedding an iframe
      with a mobile viewport width to properly trigger the CSS media queries.
    </p>

    <!-- Using an iframe to ensure media queries get triggered properly -->
    <div
      class="border border-dashed border-gray-400 mx-auto mobile-example mobile-frame"
      style="width: 420px; height: 480px;"
    >
      <iframe
        src="/components/layout/service-navigation-nested-mobile/mobile-demo"
        title="Mobile Navigation Demo"
        style="width: 100%; height: 100%; border: none;"
        frameborder="0"
      ></iframe>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

<style>
  .mobile-example {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: white;
    min-width: 0; /* Ensure it can shrink */
  }

  .mobile-frame {
    /* Mobile device simulation */
    border-radius: 2px;
    max-width: 100%; /* Ensure it doesn't overflow parent */
    overflow: hidden; /* Hide any content that might overflow */
  }
</style>
