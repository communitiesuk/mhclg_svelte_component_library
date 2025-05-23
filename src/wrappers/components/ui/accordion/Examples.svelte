<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import AccordionGDS from "$lib/components/ui/Accordion.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Accordion with snippet-based content",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Accordion with minimum sections for toggle",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Accordion respecting expanded session state",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Accordion with custom toggle labels",
      content: Example4,
    },
  ];

  let snippetSections = [
    {
      id: "1",
      heading: "Section 1",
      content: content1,
    },
    {
      id: "2",
      heading: "Section 2",
      content: content2,
    },
    {
      id: "3",
      heading: "Section 3",
      content: content3,
    },
  ];

  const sampleLineData = [
    { x: 0, y: 0 },
    { x: 10, y: 30 },
    { x: 20, y: 10 },
    { x: 30, y: 50 },
  ];

  function simpleLineFunction(dArray) {
    let path = "M " + dArray[0].x * 10 + " " + (200 - dArray[0].y * 4);
    for (let i = 1; i < dArray.length; i++) {
      path += " L " + dArray[i].x * 10 + " " + (200 - dArray[i].y * 4);
    }
    return path;
  }
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
    <AccordionGDS sections={snippetSections}></AccordionGDS>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <AccordionGDS
      sections={[
        {
          id: "example1",
          heading: "Title One",
          content: "Some content for the first section.",
        },
      ]}
      allSectionToggle={true}
      minSectionsAllSectionToggle={2}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <AccordionGDS
      sections={[
        {
          id: "example2",
          heading: "Remember state 1",
          content: "This section's expansion will be saved in sessionStorage.",
          expanded: true,
        },
        {
          id: "example3",
          heading: "Remember state 2",
          content: "Session state is also saved here.",
        },
      ]}
      rememberIsExpandedState={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <AccordionGDS
      sections={[
        {
          id: "example4",
          heading: "Custom Toggle Section",
          summary: "Showing override for labels",
          content: "This accordion uses custom hide/show labels.",
        },
      ]}
      minSectionsAllSectionToggle={0}
      hideAllSections="Collapse All"
      hideSection="Collapse"
      showAllSections="Expand All"
      showSection="Expand"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet content1()}
  <p>
    This is a more complex content for section 1, including <strong
      >HTML elements</strong
    >.
  </p>
{/snippet}

{#snippet content2()}
  <p>
    For section 2, you can have <em>even more markup</em> such as lists and headings:
  </p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
{/snippet}

{#snippet content3()}
  <p>
    Section 3 snippet: advanced <strong>HTML</strong> or media elements could go
    here.
  </p>
  <svg viewBox="0 0 300 200" width="300" height="200">
    <Line
      dataArray={sampleLineData}
      xFunction={(val) => val * 10}
      yFunction={(val) => 200 - val * 4}
      lineFunction={simpleLineFunction}
      pathStrokeColor="blue"
      pathStrokeWidth={2}
      includeMarkers={true}
      markerRadius={4}
    />
  </svg>
{/snippet}
