<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import SideNavigation from "$lib/components/layout/SideNavigation.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With Subitems",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With Selected Subitem",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Mobile Navigation Configuration",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Disabled Mobile Toggle",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. Bindable Value",
      content: Example6,
    },
  ];

  let demoSelectedItem = $state("/support");
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
  <div class="p-5 bg-white">
    <SideNavigation
      items={[
        { id: "nav-1", text: "Home", href: "/home" },
        { id: "nav-2", text: "Services", href: "/services" },
        { id: "nav-3", text: "Support", href: "/support" },
        { id: "nav-4", text: "Contact", href: "/contact" },
      ]}
      selectedItem="/home"
      ariaLabel="Main navigation"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <SideNavigation
      items={[
        { id: "nav-1", text: "Dashboard", href: "/dashboard" },
        {
          id: "nav-2",
          text: "Account",
          href: "/account",
          subItems: [
            { id: "subnav-1", text: "Profile", href: "/account/profile" },
            { id: "subnav-2", text: "Settings", href: "/account/settings" },
            { id: "subnav-3", text: "Security", href: "/account/security" },
          ],
        },
        { id: "nav-3", text: "Help", href: "/help" },
      ]}
      selectedItem="/account"
      ariaLabel="Account navigation"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <SideNavigation
      items={[
        { id: "nav-1", text: "Policies", href: "/policies" },
        {
          id: "nav-2",
          text: "Applications",
          href: "/applications",
          subItems: [
            {
              id: "subnav-1",
              text: "New Applications",
              href: "/applications/new",
            },
            {
              id: "subnav-2",
              text: "In Progress",
              href: "/applications/in-progress",
            },
            {
              id: "subnav-3",
              text: "Completed",
              href: "/applications/completed",
            },
          ],
        },
        { id: "nav-3", text: "Reports", href: "/reports" },
      ]}
      selectedItem="/applications"
      selectedSubItem="/applications/in-progress"
      ariaLabel="Applications navigation"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <SideNavigation
      items={[
        { id: "nav-1", text: "Home", href: "/home" },
        { id: "nav-2", text: "About", href: "/about" },
        { id: "nav-3", text: "Services", href: "/services" },
      ]}
      selectedItem="/about"
      mobile={{
        disabled: false,
        showButtonText: "Open menu",
        hideButtonText: "Close menu",
      }}
      ariaLabel="Site navigation"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <SideNavigation
      items={[
        { id: "nav-1", text: "Documentation", href: "/docs" },
        { id: "nav-2", text: "API Reference", href: "/api" },
        { id: "nav-3", text: "Examples", href: "/examples" },
      ]}
      selectedItem="/api"
      mobile={{
        disabled: true,
      }}
      ariaLabel="Documentation navigation"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white">
    <div class="govuk-form-group">
      <label class="govuk-label" for="nav-select">
        Select a navigation item:
      </label>
      <select
        class="govuk-select"
        id="nav-select"
        bind:value={demoSelectedItem}
      >
        <option value="/home">Home</option>
        <option value="/products">Products</option>
        <option value="/support">Support</option>
        <option value="/contact">Contact</option>
      </select>
    </div>

    <div class="mt-4">
      <SideNavigation
        items={[
          { id: "nav-1", text: "Home", href: "/home" },
          { id: "nav-2", text: "Products", href: "/products" },
          { id: "nav-3", text: "Support", href: "/support" },
          { id: "nav-4", text: "Contact", href: "/contact" },
        ]}
        bind:selectedItem={demoSelectedItem}
        ariaLabel="Main navigation"
      />
    </div>

    <p class="govuk-body mt-4">Currently selected: {demoSelectedItem}</p>
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}
