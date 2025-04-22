<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

import SearchAutocomplete from "$lib/components/ui/SearchAutocomplete.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - describe the use case here",
      content: Example1,
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
    <Template
      componentNameProp="Example 1"
      checkboxProp={true}
      dropdownProp="Dragonfruit"
      jsObjectProp={[
        {
          name: "Borussia Dortmund",
          country: "Germany",
          color: "#fdff7d",
        },
        { name: "Liverpool FC", country: "UK", color: "#f59fad" },
        {
          name: "SSC Napoli",
          country: "Italy",
          color: "#69bfff",
        },
        {
          name: "S.L. Benfica",
          country: "Portugal",
          color: "#ff8c96",
        },
      ]}
      functionProp={function () {
        window.alert(`Example 1 functionProp has been triggered.`);
      }}
    ></Template>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
