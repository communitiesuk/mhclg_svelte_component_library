<script>
  // @ts-nocheck
  import { page } from "$app/stores";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import Accordion from "$lib/components/ui/Accordion.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as examples from "./codeBlocks.js";

  let { data, homepage = undefined, folders } = $props();

  let snippetSections = [
    {
      id: "1",
      heading: "Section 1",
      content: content1,
    },
    {
      id: "2",
      heading: "Section 2",
      content: content2,
    },
    {
      id: "3",
      heading: "Section 3",
      content: content3,
    },
  ];

  let details = {
    status: "in_progress",
    description: [
      {
        content:
          "An expandable and collapsible section component that allows users to show and hide content.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/accordion/" target="_blank" rel="noopener noreferrer">GOV.UK Design System accordion component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the accordion component to let users show and hide sections of related content on a page.",
      },
      {
        content:
          "Only use an accordion if there is evidence it is helpful for users.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "sections",
        category: "Content",
        isProp: true,
        inputType: "textArea",
        value: JSON.stringify(
          [
            {
              id: "1",
              heading: "Writing well for the web",
              summary: "Learn about writing content for your website",
              content: "This is the content for Writing well for the web.",
              expanded: true,
            },
            {
              id: "2",
              heading: "Writing well for specialists",
              summary: "Guidance for writing technical content",
              content: "This is the content for Writing well for specialists.",
              expanded: false,
            },
            {
              id: "3",
              heading: "Know your audience",
              summary: "Understanding who your users are",
              content: "This is the content for Know your audience.",
            },
          ],
          null,
          2,
        ),
      },
      {
        name: "headingLevel",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "h4",
      },
      {
        name: "hideAllSections",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Hide all sections",
      },
      {
        name: "hideSection",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Hide",
      },
      {
        name: "hideSectionAriaLabel",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Hide this section",
      },
      {
        name: "showAllSections",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Show all sections",
      },
      {
        name: "showSection",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Show",
      },
      {
        name: "showSectionAriaLabel",
        category: "UI Toggle Labels",
        isProp: true,
        inputType: "input",
        value: "Show this section",
      },
      {
        name: "allSectionToggle",
        category: "Accordion Toggle Options",
        isProp: true,
        inputType: "checkbox",
        value: "true",
      },
      {
        name: "minSectionsAllSectionToggle",
        category: "Accordion Toggle Options",
        isProp: true,
        inputType: "input",
        value: "2",
      },
      {
        name: "rememberIsExpandedState",
        category: "Accordion Toggle Options",
        isProp: true,
        inputType: "checkbox",
        value: "true",
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let sections = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "sections",
        ),
      ),
  );

  let derivedParametersObject = $derived(homepage ?? { sections });

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  // $inspect(parametersValuesArray);

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );

  // Example data/line function
  const sampleLineData = [
    { x: 0, y: 0 },
    { x: 10, y: 30 },
    { x: 20, y: 10 },
    { x: 30, y: 50 },
  ];

  function simpleLineFunction(dArray) {
    let path = "M " + dArray[0].x * 10 + " " + (200 - dArray[0].y * 4);
    for (let i = 1; i < dArray.length; i++) {
      path += " L " + dArray[i].x * 10 + " " + (200 - dArray[i].y * 4);
    }
    return path;
  }

  function copyHighlightedCode(event) {
    const block = event.currentTarget.closest(".code-block");
    if (!block) return;

    const codeElement = block.querySelector("code");
    if (!codeElement) return;

    // Get text content while preserving new lines
    const text = codeElement.innerText || codeElement.textContent;
    navigator.clipboard.writeText(text);
  }
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    {parametersVisibleArray}
    bind:parametersValuesArray
  ></ParametersSection>

  <div data-role="demo-section">
    <h5 id="component-demo" class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex flex-col gap-4">
        <div class="app-example-wrapper">
          <div
            class="app-example__frame app-example__frame--resizable app-example__frame--xl p-6"
          >
            <Accordion {...parametersObject}></Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 id="examples" class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <h6>Accordion with snippet-based content</h6>
    <CodeBlock code={examples.codeBlockOne} />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--xl p-6"
      >
        <Accordion sections={snippetSections} />
      </div>
    </div>

    <h6>Accordion with minimum sections for toggle</h6>
    <CodeBlock code={examples.codeBlockTwo} />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Accordion
          sections={[
            {
              id: "example1",
              heading: "Title One",
              content: "Some content for the first section.",
            },
          ]}
          allSectionToggle={true}
          minSectionsAllSectionToggle={2}
        />
      </div>
    </div>

    <h6>Accordion respecting expanded session state</h6>
    <CodeBlock code={examples.codeBlockThree} />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--l p-6"
      >
        <Accordion
          sections={[
            {
              id: "example2",
              heading: "Remember state 1",
              content:
                "This section's expansion will be saved in sessionStorage.",
              expanded: true,
            },
            {
              id: "example3",
              heading: "Remember state 2",
              content: "Session state is also saved here.",
            },
          ]}
          rememberIsExpandedState={true}
        />
      </div>
    </div>

    <h6>Accordion with custom toggle labels</h6>
    <CodeBlock code={examples.codeBlockFour} />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Accordion
          sections={[
            {
              id: "example4",
              heading: "Custom Toggle Section",
              summary: "Showing override for labels",
              content: "This accordion uses custom hide/show labels.",
            },
          ]}
          minSectionsAllSectionToggle={0}
          hideAllSections="Collapse All"
          hideSection="Collapse"
          showAllSections="Expand All"
          showSection="Expand"
        />
      </div>
    </div>
  </div>
{/if}

{#snippet content1()}
  <p>
    This is a more complex content for section 1, including <strong
      >HTML elements</strong
    >.
  </p>
{/snippet}

{#snippet content2()}
  <p>
    For section 2, you can have <em>even more markup</em> such as lists and headings:
  </p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
{/snippet}

{#snippet content3()}
  <p>
    Section 3 snippet: advanced <strong>HTML</strong> or media elements could go
    here.
  </p>
  <svg viewBox="0 0 300 200" width="300" height="200">
    <Line
      dataArray={sampleLineData}
      xFunction={(val) => val * 10}
      yFunction={(val) => 200 - val * 4}
      lineFunction={simpleLineFunction}
      pathStrokeColor="blue"
      pathStrokeWidth={2}
      includeMarkers={true}
      markerRadius={4}
    />
  </svg>
{/snippet}

<style>
  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role="demo-section"] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }

  [data-role="component-container-centered"] {
    /* background-color: #f8f8f8; */
    padding: 20px 0px;
  }
</style>
