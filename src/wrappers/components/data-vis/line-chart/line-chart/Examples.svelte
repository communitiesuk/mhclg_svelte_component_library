<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import Template from "$lib/package-wrapping/templates/Template.svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import LineChart from "$lib/components/data-vis/line-chart/LineChart.svelte";

  let { data } = $props();
  const lineChartData = (() => {
    const found = data.dataInFormatForLineChart.find(
      (el) => el.metric === "Household waste recycling rate",
    );
    return found ? { ...found, lines: found.lines.slice(0, 5) } : null;
  })();

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Static line chart",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Interactive line chart",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Chart with different tiers",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Chart with markers",
      content: Example4,
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
    <LineChart {lineChartData} x="x" y="y" series="areaCode"></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <LineChart {lineChartData} x="x" y="y" series="areaCode"></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <LineChart {lineChartData} x="x" y="y" series="areaCode"></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet ContentSnippet()}
  <p>Service update</p>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{ markers: true, interactive: true }}
      tooltipContent={ContentSnippet}
    ></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
