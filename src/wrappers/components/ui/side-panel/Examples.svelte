<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import SidePanel from "$lib/components/ui/SidePanel.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import ServiceNavigation from "$lib/components/layout/ServiceNavigation.svelte";
  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import GdsAccordion from "$lib/components/ui/Accordion.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  // Local state for the examples
  let navState1 = $state({ open: true });
  let navState2 = $state({ open: false });

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Left panel with percentage width (default usage)",
      content: Example1,
    },
    {
      id: "2",
      heading:
        "2. Right panel with no toggle, programmatic control and custom styling",
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
  <div class="p-4 bg-white rounded border">
    <div
      class="relative h-[460px] w-full max-w-[1100px] mx-auto flex bg-white min-w-0 overflow-hidden"
    >
      <SidePanel width="30%" bind:navState={navState1}>
        <Header rebrand={true} />
        <ServiceNavigation
          serviceName="Indices of Deprivation"
          serviceUrl="/"
        />
        <PhaseBanner
          tagText="PROTOTYPE"
          bannerText="This is not a live service. "
          linkText="Give feedback"
          linkHref="/feedback"
        />
        <div class="p-4 space-y-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Maps</h2>
          <GdsAccordion
            sections={[
              {
                id: "index-geography",
                heading: "Select index and geography level",
                content: "Choose an index and a geography level for the map.",
                expanded: false,
              },
            ]}
            allSectionToggle={false}
            headingLevel="h3"
          />
          <PostcodeOrAreaSearch
            label_text="Search for a postcode or an area"
            placeholder=""
            input_width="full"
            margin_bottom={4}
            minLength={3}
          />
        </div>
        <Footer
          rebrand={true}
          showLicence={true}
          inlineLinks={[
            { href: "/accessibility", label: "Accessibility statement" },
            { href: "/cookies", label: "Cookies" },
            { href: "/privacy", label: "Privacy" },
          ]}
        />
      </SidePanel>
      <div class="flex-1 bg-gray-100 min-w-0"></div>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte" />
{/snippet}

{#snippet Example2()}
  <div class="p-4 bg-white rounded border">
    <div class="mb-2">
      <p class="govuk-body">
        Panel Status: <strong>{navState2.open ? "Open" : "Closed"}</strong>
      </p>
      <p class="govuk-body-s">
        This example shows a right-side panel with custom styling, no toggle
        button, and programmatic control.
      </p>
      <p class="govuk-body-s">
        <strong>Note:</strong> the panel only slides in or out on mobile view; on
        desktop it remains persistently visible.
      </p>
    </div>
    <div class="mb-3 flex gap-3">
      <Button
        textContent="Open panel"
        buttonType="default"
        onClickFunction={() => (navState2.open = true)}
        noPadding={true}
      />
      <Button
        textContent="Close panel"
        buttonType="secondary"
        onClickFunction={() => (navState2.open = false)}
        noPadding={true}
      />
    </div>
    <div
      class="relative h-[460px] w-full max-w-[1100px] mx-auto flex bg-white min-w-0 overflow-hidden"
    >
      <SidePanel
        position="right"
        width="35%"
        bind:navState={navState2}
        showToggle={false}
        panelClass="shadow-xl border-l border-gray-200"
        overlayClass="bg-black/40"
        toggleButtonClass="ring-2 ring-blue-600"
      >
        <Header rebrand={true} />
        <ServiceNavigation
          serviceName="Indices of Deprivation"
          serviceUrl="/"
        />
        <PhaseBanner
          tagText="BETA"
          bannerText="This is a new service. "
          linkText="Send feedback"
          linkHref="/feedback"
        />
        <div class="p-4 space-y-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Filters</h2>
          <GdsAccordion
            sections={[
              {
                id: "data-sources",
                heading: "Data sources",
                content: "Official ONS sources updated regularly.",
                expanded: false,
              },
              {
                id: "tips",
                heading: "Tips",
                content: "Use the search, then refine with filters.",
                expanded: false,
              },
            ]}
            allSectionToggle={false}
            headingLevel="h3"
          />
          <PostcodeOrAreaSearch
            label_text="Find a location"
            placeholder=""
            input_width="full"
            minLength={3}
          />
        </div>
        <Footer rebrand={true} showLicence={false} />
      </SidePanel>
      <div class="flex-1 bg-gray-100 min-w-0"></div>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte" />
{/snippet}
