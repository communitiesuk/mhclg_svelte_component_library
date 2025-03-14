<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Header from "$lib/components/ui/Header.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";

  let { data, homepage = undefined, folders } = $props();

  let details = {
    status: "in_progress",
    description: [
      {
        content:
          "A header component that provides site branding and navigation.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/header/" target="_blank" rel="noopener noreferrer">GOV.UK Design System header component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the header component to display your service name, GOV.UK branding, and navigation links if needed.",
      },
      {
        content:
          "The header can be configured to display with or without a full-width bottom border.",
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
      // UI Options category
      {
        name: "fullWidthBorder",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: false,
      },
      {
        name: "homepageUrl",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "/",
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let derivedParametersObject = $derived(homepage ?? {});

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );
</script>

<ComponentDetails {homepage} {details} />

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    bind:parametersValuesArray
    {parametersVisibleArray}
  />

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth />
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex flex-col gap-4">
        <div class="app-example-wrapper">
          <div
            class="app-example__frame app-example__frame--resizable app-example__frame--l p-6"
          >
            <Header {...parametersObject} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px" />
    <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <!-- Example 1: Basic Usage -->
    <h3 class="govuk-heading-m">Basic Usage</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header />
      </div>
    </div>

    <!-- Example 2: With Full Width Border -->
    <h3 class="govuk-heading-m">With Full Width Border</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header fullWidthBorder={true} />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header fullWidthBorder={true} />
      </div>
    </div>

    <!-- Example 3: With Custom Homepage URL -->
    <h3 class="govuk-heading-m">With Custom Homepage URL</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header homepageUrl="https://www.example.gov.uk" />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header homepageUrl="https://www.example.gov.uk" />
      </div>
    </div>

    <!-- Example 4: Combined Options -->
    <h3 class="govuk-heading-m">Combined Options</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header 
  fullWidthBorder={true}
  homepageUrl="https://www.example.gov.uk" 
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header
          fullWidthBorder={true}
          homepageUrl="https://www.example.gov.uk"
        />
      </div>
    </div>
  </div>
{/if}

<style>
  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0 auto;
  }
  [data-role="demo-section"] {
    max-width: 1024px;
    margin: 0 auto;
  }
  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }
  [data-role="component-container-centered"] {
    padding: 20px 0;
  }
</style>
