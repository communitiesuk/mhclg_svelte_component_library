<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import PhaseBanner from "$lib/components/layout/PhaseBanner.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Default Alpha Phase Banner",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Beta Phase Banner with Custom Link",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Custom Tag and Text",
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
    <!-- Default Alpha Banner -->
    <PhaseBanner />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <!-- Beta Banner with custom link -->
    <PhaseBanner
      tagText="Beta"
      bannerText="This service is in beta. Help us improve it and "
      linkText="provide feedback"
      linkHref="/feedback"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <!-- Custom Tag and Text -->
    <PhaseBanner
      tagText="Feedback"
      bannerText="Your feedback helps us improve this service. "
      linkText="Take our short survey"
      linkHref="/survey"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
