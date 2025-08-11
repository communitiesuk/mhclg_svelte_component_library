<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - trivial example",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - stacking multiple position charts",
      content: Example2,
    },
  ];

  let { data } = $props();

  let dummyData = $state([
    ["Overall", 3],
    ["Income", 2],
    ["Employment", 3],
    ["Education", 7],
    ["Health", 6],
    ["Crime", 6],
  ]);

  // ["Living Environment", 5],
  //   ["Barriers to Housing & Services", 1],
  //   ["Living Environment", 5],
  //   ["Income Deprivation Affecting Children", 1],
  //   ["Income Deprivation Affecting Older People", 2],
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
    <div class="flex-div" style="display:flex">
      <PositionChart value="5" min="1" max="10" label="Label"></PositionChart>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    {#each dummyData as item}
      <PositionChart value={item[1]} min="0" max="10" label={item[0]}
      ></PositionChart>
    {/each}
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
