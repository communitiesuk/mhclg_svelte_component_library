<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import InternalHeader from "$lib/components/layout/InternalHeader.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Header with Service Name",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Header with Account Navigation",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Header with Organisation Name Only",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Header with Custom Styling",
      content: Example4,
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
  <div class="bg-white border border-dashed border-gray-400">
    <InternalHeader
      organisationName="Ministry of Housing, Communities and Local Government"
      serviceName="Internal Grants Management System"
      serviceUrl="/funding-service"
      homepageUrl="/"
    ></InternalHeader>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="bg-white border border-dashed border-gray-400">
    <InternalHeader
      organisationName="Ministry of Housing, Communities and Local Government"
      serviceUrl="/funding-service"
      homepageUrl="/"
      accountName="John Doe"
      showSignOut={true}
      signOutUrl="/auth/sign-out"
    ></InternalHeader>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="bg-white border border-dashed border-gray-400">
    <InternalHeader
      organisationName="Ministry of Housing, Communities and Local Government"
      serviceName=""
      serviceUrl=""
      accountName=""
      showSignOut={false}
    ></InternalHeader>
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="bg-white border border-dashed border-gray-400">
    <InternalHeader
      organisationName="Ministry of Justice"
      serviceName="Design System"
      serviceUrl="https://design-patterns.service.justice.gov.uk/components/header/"
      homepageUrl="https://design-patterns.service.justice.gov.uk/components/header/"
      headerBorder="10px solid #d53880"
      verticalLineSvgColor="#220051"
      backgroundColor="#220051"
    ></InternalHeader>
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}
