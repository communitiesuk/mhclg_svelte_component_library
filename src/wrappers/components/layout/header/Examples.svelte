<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Header from "$lib/components/layout/Header.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With Full Width Border",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With Custom Homepage URL",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Combined Options",
      content: Example4,
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
  <div class=" bg-white">
    <Header />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class=" bg-white">
    <Header fullWidthBorder={true} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class=" bg-white">
    <Header homepageUrl="https://www.example.gov.uk" />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class=" bg-white">
    <Header fullWidthBorder={true} homepageUrl="https://www.example.gov.uk" />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}
