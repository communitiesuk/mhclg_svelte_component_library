<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";
  import WarningText from "$lib/components/content/WarningText.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Default Warning Text",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Custom Text and Assistive Text",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Warning Text with Snippet (including link)",
      content: Example3,
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
  <div class="p-5 bg-white">
    <!-- Default WarningText -->
    <WarningText />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <!-- Custom Text and Assistive Text -->
    <WarningText
      assistiveText="Important Notice"
      text="Your application will be automatically saved, but any changes made in the last 5 minutes may be lost if you close your browser."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet WarningSnippet()}
  There is a high chance of delays. Check <a href="#" class="govuk-link"
    >travel updates</a
  > before you leave.
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <!-- Warning Text with Snippet -->
    <WarningText text={WarningSnippet} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
