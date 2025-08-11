<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Single Select with Search",
      content: Example1,
    },
    {
      id: "2", 
      heading: "2. Multiple Select with Colors",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Grouped Options with Countries",
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
    <MultiSelectSearchAutocomplete
      id="country-select"
      name="country"
      label="Select a country"
      hint="Start typing to search for a country"
      items={[
        { value: "england", text: "England" },
        { value: "scotland", text: "Scotland" },
        { value: "wales", text: "Wales" },
        { value: "northern-ireland", text: "Northern Ireland" },
        { value: "france", text: "France" },
        { value: "germany", text: "Germany" },
        { value: "spain", text: "Spain" },
        { value: "italy", text: "Italy" }
      ]}
      multiple={false}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <MultiSelectSearchAutocomplete
      id="colors-select"
      name="colors"
      label="Select multiple colors"
      hint="You can select multiple options"
      items={[
        { value: "red", text: "Red" },
        { value: "blue", text: "Blue" },
        { value: "green", text: "Green" },
        { value: "yellow", text: "Yellow" },
        { value: "purple", text: "Purple" },
        { value: "orange", text: "Orange" }
      ]}
      multiple={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <MultiSelectSearchAutocomplete
      id="grouped-select"
      name="grouped"
      label="Select from grouped options"
      hint="Options are grouped by region"
      groups={[
        {
          label: "UK Countries",
          choices: [
            { value: "england", text: "England" },
            { value: "scotland", text: "Scotland" },
            { value: "wales", text: "Wales" },
            { value: "northern-ireland", text: "Northern Ireland" }
          ]
        },
        {
          label: "European Countries",
          choices: [
            { value: "france", text: "France" },
            { value: "germany", text: "Germany" },
            { value: "spain", text: "Spain" },
            { value: "italy", text: "Italy" }
          ]
        }
      ]}
      multiple={false}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
