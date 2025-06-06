<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";
  import InsetText from "$lib/components/content/InsetText.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Default Text",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Custom String Content",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Content with Snippet (including link)",
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
    <!-- Default InsetText -->
    <InsetText />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <!-- Custom String Content -->
    <InsetText
      content="You will need your National Insurance number and proof of identity."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet SnippetContent()}
  You can <a href="#" class="govuk-link">get help with your application</a> if you
  need it.
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <!-- Content with Snippet -->
    <InsetText content={SnippetContent} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
