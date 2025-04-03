<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import ServiceNavigation from "$lib/components/layout/ServiceNavigation.svelte";
  import Header from "$lib/components/layout/Header.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Service Name Only",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With Navigation Items",
      content: Example2,
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
  <div class=" bg-white">
    <Header fullWidthBorder={true} />
    <ServiceNavigation serviceName="My Service" serviceUrl="/my-service" />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class=" bg-white">
    <Header fullWidthBorder={true} />
    <ServiceNavigation
      serviceName="My Service"
      serviceUrl="/my-service"
      navigationItems={[
        { href: "#item1", label: "Item 1" },
        { href: "#item2", label: "Item 2", isActive: true },
        { href: "#item3", label: "Item 3" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}
