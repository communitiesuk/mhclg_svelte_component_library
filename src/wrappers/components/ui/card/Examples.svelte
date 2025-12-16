<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Card from "$lib/components/ui/Card.svelte";

  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - a simple card with heading link, and body text",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - a card with a chart in the body",
      content: Example2,
    },
    {
      id: "3",
      heading:
        "3. Example 3 - a card with a search component instead heading link",
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
    <Card
      linkCard={true}
      linkText="Card heading"
      bodyText="Text in the body of the card"
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <Card
      linkCard={true}
      linkText="Adult social care quality"
      onlyTextInBody={false}
      {cardBottomSnippet}
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet cardBottomSnippet()}
  <PositionChart
    value="4.5"
    min="0"
    max="10"
    annotation="East Sussex"
    showAxis={false}
    chartHeight={30}
  ></PositionChart>
  <p class="pt-4 pl-3">East Sussex: around average.</p>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <Card
      linkCard={false}
      onlyTextInBody={true}
      bodyText="The interaction in the card header is a search component instead of a link."
      {cardTopSnippet}
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet cardTopSnippet()}
  <PostcodeOrAreaSearch
    hint=""
    label_text="Search for a postcode"
    label_size="m"
    placeholder="e.g. NG8 5GT"
    margin_bottom="2"
    autoFocusSubmitOnSelection={true}
    hideHint={false}
    autoselect={false}
    customPlacesData={[]}
    customSourceSelector={() => "api"}
    minLength={3}
    label_id="postcode-search"
    wrap_label_in_a_heading={true}
  ></PostcodeOrAreaSearch>
{/snippet}
