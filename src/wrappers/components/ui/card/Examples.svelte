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
      heading:
        "1. Example 1 - a simple card with a link in the header and plain text in the body",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - a card with different colors",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Example 3 - a card with a search component in the header",
      content: Example3,
    },
    {
      id: "4",
      heading:
        "4. Example 4 - a card with a chart in the body using the snippet method",
      content: Example4,
    },
    {
      id: "5",
      heading:
        "5. Example 5 - a card with a chart in the body using the children method",
      content: Example5,
    },
    // {
    //   id: "6",
    //   heading:
    //     "6. Example 6 - a card with non-standard content in header and body",
    //   content: Example6,
    // },
    // {
    //   id: "7",
    //   heading: "7. Example 7 - multiple cards in a grid with dynamic props",
    //   content: Example7,
    // }
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
    <p>
      This is the default card. If you don't pass any snippets or childen into
      the component you get this.
    </p>
    <p class="pb-6">
      headerIsLink and onlyTextInBody are set to their default values of true.
    </p>
    <Card
      headerIsLink={true}
      headerText="Card heading"
      onlyTextInBody={true}
      bodyText="Text in the body of the card"
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <p class="pb-6">
      A card with different colors for the text, background and borders.
    </p>
    <Card
      headerTextColor="black"
      headerBackgroundColor="lightblue"
      bodyTextColor="grey"
      bodyBackgroundColor="lightgreen"
      bodyBottomBorderColor="red"
      bodyTopBorderColor="purple"
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <p class="pb-6">
      A card with a snippet passed to the header instead of the default link and
      chevron. In this example the snippet contains the postcode search
      component.
    </p>
    <Card
      headerIsLink={false}
      onlyTextInBody={true}
      bodyText="Enter your postcode to find out about deprivation in your local area."
      {headerSnippet}
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet headerSnippet()}
  <PostcodeOrAreaSearch
    label_text="Search for a postcode"
    placeholder="e.g. NG8 5GT"
    margin_bottom="2"
    customPlacesData={[]}
    customSourceSelector={() => "api"}
  ></PostcodeOrAreaSearch>{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <p>
      If you something more complex in the body you can pass a snippet or child
      component.
    </p>
    <p class="pb-6">
      In this example a chart is passed in using the snippet method.
    </p>
    <Card
      headerIsLink={true}
      headerText="Adult social care quality"
      onlyTextInBody={false}
      {bodySnippet}
    ></Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet bodySnippet()}
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

{#snippet Example5()}
  <div class="p-5 bg-white">
    <p>
      If you something more complex in the body you can pass a snippet or child
      component.
    </p>
    <p class="pb-6">
      In this example a chart is passed in as a child component.
    </p>
    <Card
      headerIsLink={true}
      headerText="Adult social care quality"
      onlyTextInBody={false}
      ><PositionChart
        value="4.5"
        min="0"
        max="10"
        annotation="East Sussex"
        showAxis={false}
        chartHeight={30}
      ></PositionChart>
      <p class="pt-4 pl-3">East Sussex: around average.</p></Card
    >
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

<!-- {#snippet Example5()}
  <div class="p-5 bg-white">
    {#each [1, 2, 3] as number}
      <Card
        headerIsLink={true}
        headerText="Adult social care quality"
        onlyTextInBody={false}
        ><PositionChart value={number} min="0" max="10"></PositionChart>
        <p>some text</p></Card
      >
    {/each}
  </div>
{/snippet} -->
