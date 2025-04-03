<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Breadcrumbs from "$lib/components/ui/Breadcrumbs.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";

  interface PageProps {
    data: any;
    homepage?: boolean;
    folders?: string[];
  }

  interface ComponentMetadata {
    status: string;
    description: Array<{
      content: string;
      markdown?: boolean;
    }>;
    context: Array<{
      content: string;
    }>;
    childComponents: undefined;
    requirements: undefined;
    name?: string;
    folder?: string;
  }

  let { data, homepage = undefined, folders } = $props();

  let details: ComponentMetadata = {
    status: "complete_in_use",
    description: [
      {
        content:
          "A navigation component that helps users understand where they are in a website's hierarchy.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/breadcrumbs/" target="_blank" rel="noopener noreferrer">GOV.UK Design System breadcrumbs component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the breadcrumbs component to help users understand where they are in the website's hierarchy and navigate back to higher levels.",
      },
      {
        content:
          "The component automatically generates breadcrumbs based on the current route, but can also accept custom items.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };

  let pageInfo = $page.route?.id?.split("/") ?? [];

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
        name: "items",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          [
            { text: "Home", href: "/" },
            { text: "Components", href: "/components" },
            { text: "UI Components", href: "/components/ui" },
            { text: "Breadcrumbs", href: "/components/ui/breadcrumbs" },
          ],
          null,
          2,
        ),
      },
      {
        name: "collapseOnMobile",
        category: "Display Options",
        isProp: true,
        inputType: "checkbox",
        value: true,
      },
      {
        name: "inverse",
        category: "Display Options",
        isProp: true,
        inputType: "checkbox",
        value: false,
      },
      {
        name: "ariaLabel",
        category: "Accessibility",
        isProp: true,
        inputType: "input",
        value: "Breadcrumb",
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let items = $derived(homepage ?? JSON.parse(parametersValuesArray[0]));

  let derivedParametersObject = $derived(homepage ?? { items });

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
            class="app-example__frame app-example__frame--resizable app-example__frame--xs p-6"
          >
            <Breadcrumbs {...parametersObject}></Breadcrumbs>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 id="examples" class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <h6>Basic Automatically Generated Breadcrumbs</h6>
    <CodeBlock
      code={`
<script>
  import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
<\/script>

<Breadcrumbs />
`}
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--xs p-6"
      >
        <Breadcrumbs />
      </div>
    </div>

    <h6>Custom Specified Breadcrumbs Items</h6>
    <CodeBlock
      code={`
<Breadcrumbs
  items={[
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
    { text: "Category", href: "/products/category" }
  ]}
/>
`}
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--xs p-6"
      >
        <Breadcrumbs
          items={[
            { text: "Home", href: "/" },
            { text: "Products", href: "/products" },
            { text: "Category", href: "/products/category" },
          ]}
        />
      </div>
    </div>

    <h6>Collapsed on Mobile with Inverse Colors</h6>
    <CodeBlock
      code={`
<div class="bg-[#1d70b8] p-4">
  <Breadcrumbs
    items={[
      { text: "Home", href: "/" },
      { text: "Services", href: "/services" },
      { text: "Support", href: "/services/support" }
    ]}
    collapseOnMobile={true}
    inverse={true}
  />
</div>
`}
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--xs p-6"
      >
        <div class="bg-[#1d70b8] p-4">
          <Breadcrumbs
            items={[
              { text: "Home", href: "/" },
              { text: "Services", href: "/services" },
              { text: "Support", href: "/services/support" },
            ]}
            collapseOnMobile={true}
            inverse={true}
          />
        </div>
      </div>
    </div>
  </div>
{/if}

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
    padding: 20px 0px;
  }
</style>
