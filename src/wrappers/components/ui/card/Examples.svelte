<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Card from "$lib/components/ui/Card.svelte";
  import PositionChart from "$lib/components/data-vis/position-chart/PositionChart.svelte";
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import Button from "$lib/components/ui/Button.svelte";

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
    {
      id: "6",
      heading:
        "6. Example 6 - a card with non-standard content in the header and body",
      content: Example6,
    },
    {
      id: "7",
      heading: "7. Example 7 - multiple cards in a grid with dynamic props",
      content: Example7,
    },
  ];

  const metrics = [
    { metric: "Adult social care", value: 3 },
    { metric: "Best start in life", value: 8 },
    { metric: "Transport and local infrastructure", value: 4 },
    { metric: "Housing", value: 1 },
    { metric: "Neighbourhoods", value: 1 },
    { metric: "Homelessness and rough sleeping", value: 6 },
    { metric: "Environment, waste and climate change", value: 1 },
    { metric: "Every child achieving and thriving", value: 1 },
    { metric: "Adult social care independence", value: 6 },
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
  <div class="p-5 bg-grey">
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
  <div class="p-5 bg-grey">
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
  <div class="p-5 bg-grey">
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
  <div class="p-5 bg-grey">
    <p>
      If you want something more complex in the body you can pass a snippet or a
      child component.
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
  <div class="p-5 bg-grey">
    <p>
      If you want something more complex in the body you can pass a snippet or a
      child component.
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

{#snippet Example6()}
  <div class="p-5 bg-grey">
    <p>
      If you want something more complex in the header and the body you can pass
      a snippet and a child component respectively or you can pass a snippet to
      each. The reason the child option is only available to the body is because
      with two '@render children' in the component it renders all children in
      both places it is called (there might be a way around this).
    </p>
    <p class="pb-6">
      In this example the postcode search component is passed into the header
      with a snippet and some text with a link is passed into body via children.
    </p>
    <Card
      headerIsLink={false}
      headerText="Adult social care quality"
      onlyTextInBody={false}
      headerSnippet={headerSnippet2}
      ><p>Some text with a <a href="">link</a></p>
    </Card>
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}

{#snippet headerSnippet2()}
  <PostcodeOrAreaSearch
    label_text="Search for a postcode"
    placeholder="e.g. NG8 5GT"
    margin_bottom="2"
    customPlacesData={[]}
    customSourceSelector={() => "api"}
  ></PostcodeOrAreaSearch>
{/snippet}

{#snippet Example7()}
  <div class="p-5 bg-grey">
    <p>
      Multiple cards with charts in a grid using an each block. A metric name
      and value is passed down through the card and into the chart.
    </p>
    <p class="pb-6">
      The charts must be called as a child component rather than a snippet for
      this to work. If you're using a snippet you can achieve this with
      '...restProps'.
    </p>
    <div class="card-grid">
      {#each metrics as { metric, value }}
        <Card
          headerIsLink={true}
          headerText={metric}
          headerSize="s"
          onlyTextInBody={false}
          ><PositionChart {value} min="0" max="10" chartHeight="20"
          ></PositionChart>
        </Card>
      {/each}
    </div>
  </div>
{/snippet}

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
</style>
