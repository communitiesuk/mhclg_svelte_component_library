<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import PositionChartAxis from "$lib/components/data-vis/position-chart/PositionChartAxis.svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - single position chart with axis and label",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - single position chart with axis but no label",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Example 3 - stacked position chart",
      content: Example3,
    },
  ];

  let { data } = $props();

  let dummyData = $state([
    ["Overall", 3],
    ["Income", 2.5],
    ["Living Environment", 5],
    ["Barriers to Housing & Services", 1],
    ["Employment", 3],
    ["Education", 7],
    ["Health", 6],
    ["Crime", 6],
  ]);
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
    <PositionChart value="7" min="0" max="10" label="Education"></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <PositionChart value="7" min="0" max="10"></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <div
      class="grid"
      style="display: grid;
    grid-template-columns: minmax(100px, 30%) 1fr;
    grid-auto-rows: 1fr;
    align-items: center;
    column-gap: 2%;
    row-gap: 0;"
    >
      {#each dummyData as item, i}
        <PositionChart
          value={item[1]}
          min="0"
          max="10"
          label={item[0]}
          stacked={true}
          numberOfPositionCharts={dummyData.length}
          showAxis={dummyData.length == i + 1}
        ></PositionChart>
      {/each}
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
