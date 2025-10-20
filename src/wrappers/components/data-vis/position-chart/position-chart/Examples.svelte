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
      heading: "3. Example 3 - single position chart with multiple values",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Example 4 - stacked position chart",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Example 5 - stacked position chart",
      content: Example5,
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
    <PositionChart value={7} min={0} max={10} label="Education"></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <PositionChart value={7} min={0} max={10}></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <PositionChart
      min={0}
      max={10}
      rowData={[
        { value: 2, colour: "orange" },
        { value: 3, colour: "purple" },
      ]}
      label="Hello"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <PositionChart
      min={0}
      max={10}
      colour="grey"
      opacity={0.5}
      tooltipContent="value"
      showIcon
      allData={[
        {
          rowData: [
            { value: 4, opacity: 1, annotation: "hello" },
            { value: 5 },
            { value: 5.5 },
          ],
          label: "first",
          moreInfo: "eo",
        },
        {
          rowData: [{ value: 80, opacity: 1 }, { value: 30 }, { value: 10 }],
          label: "second",
          min: 0,
          max: 100,
        },
      ]}
      markerStyles={{
        primary: { colour: "blue", opacity: 1 },
        secondary: { colour: "red", opacity: 0.6 },
      }}
      assignMarkerTier={(tier, chart, rowData, idx) => {
        if (tier === "primary") {
          return rowData.value == 5;
        }
        if (tier === "secondary") {
          return true;
        }
        return false;
      }}
    ></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet tooltipSnippet(activeMarkerId)}
  <div
    style="border: 1px solid black; padding: 0.5rem; background-color: white; pointer-events: none"
  >
    More deprived than
    <b>{100 - activeMarkerId.value}%</b> of neighbourhoods
  </div>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <PositionChart
      value={70}
      min={0}
      max={100}
      label="Education"
      {tooltipSnippet}
      annotation="hello"
      moreInfo="this is some additional information"
      showIcon={true}
    ></PositionChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
