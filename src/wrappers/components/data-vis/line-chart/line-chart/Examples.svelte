<script>
  //@ts-nocheck
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

  const dataForOneLine = (() => {
    const found = data.dataInFormatForLineChart.find(
      (el) => el.metric === "Household waste recycling rate",
    );
    return found ? { ...found, lines: found.lines.slice(0, 1) } : null;
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
      heading: "3. Line chart with different tiers",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Line chart with interactive markers",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Line chart with shaded area",
      content: Example5,
    },
  ];

  let activeMarkerId = $state();
  let clickedSeries = $state();
  let hoveredSeries = $state();
  let clickedTier = $state();
  let hoveredTier = $state();
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
    <LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{ interactiveLines: true }}
      tieredLineParams={{
        all: {},
        hover: { pathStrokeWidth: 4 },
        clicked: {
          pathStrokeWidth: 5,
        },
      }}
      bind:clickedSeries
      bind:hoveredSeries
    ></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      getLine={(tier, el) => {
        if (tier === "primary") {
          return ["E07000224"].includes(el.areaCode);
        } else return true;
      }}
      tieredLineParams={{
        secondary: { pathStrokeColor: "grey" },
        primary: {
          halo: true,
          pathStrokeWidth: 5,
          pathStrokeColor: "red",
        },
      }}
    ></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet tooltipSnippet(activeMarkerId)}
  <div
    style="border: 1px solid black; padding: 0.5rem; background-color: white; pointer-events: none"
  >
    <i>Value:</i>
    {activeMarkerId.y}<br /><i>Year:</i>
    {activeMarkerId.x}
  </div>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <LineChart
      {lineChartData}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{ interactiveMarkers: true, markers: true }}
      {tooltipSnippet}
    ></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <LineChart
      lineChartData={dataForOneLine}
      x="x"
      y="y"
      series="areaCode"
      basicLineParams={{
        includeArea: true,
        pathStrokeColor: "darkgrey",
        areaFillColor: "lightgrey",
      }}
    ></LineChart>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}
