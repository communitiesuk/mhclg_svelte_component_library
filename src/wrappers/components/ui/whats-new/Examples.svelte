<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic usage with default content",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Custom title and simple news items",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Complex news items with release notes and component links",
      content: Example3,
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
  <div class="p-5 bg-white">
    <WhatsNew />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <WhatsNew
      title="Latest Updates"
      titleId="updates"
      newsItems={[
        {
          date: "March 2025",
          content:
            "We've improved the performance of our data visualization components by 40%.",
        },
        {
          date: "February 2025",
          content:
            "New accessibility features have been added to all form components.",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <WhatsNew
      title="Component Library Updates"
      titleId="component-updates"
      componentLinksIntroText="This release includes updates to the following components:"
      newsItems={[
        {
          date: "April 2025",
          content:
            "Released version 2.1.0 with enhanced chart components and improved TypeScript support.",
          releaseNotesUrl: "https://github.com/example/releases/tag/v2.1.0",
          releaseVersion: "v2.1.0",
          componentLinks: [
            {
              text: "Line Chart component",
              href: "/components/charts/line-chart",
            },
            {
              text: "Bar Chart component",
              href: "/components/charts/bar-chart",
            },
            { text: "Data Table component", href: "/components/ui/data-table" },
          ],
        },
        {
          date: "March 2025",
          content:
            "Minor bug fixes and accessibility improvements across all components.",
          releaseNotesUrl: "https://github.com/example/releases/tag/v2.0.1",
          releaseVersion: "v2.0.1",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
