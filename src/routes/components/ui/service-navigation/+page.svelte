<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";
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
          "A service navigation component that provides service name and navigation options.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/service-navigation/" target="_blank" rel="noopener noreferrer">GOV.UK Design System service navigation component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the Service navigation component to show your service name and give users access to links relevant to your service.",
      },
      {
        content:
          "The Service navigation component should be used together with a header component that has full-width border enabled.",
      },
      {
        content:
          "This component can be displayed with a service name only, or with both a service name and navigation links.",
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
      // Content category
      {
        name: "serviceName",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "Service name",
      },
      {
        name: "serviceUrl",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "#",
      },
      {
        name: "navigationItems",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          [
            { href: "#", label: "Navigation item 1" },
            { href: "#", label: "Navigation item 2", isActive: true },
            { href: "#", label: "Navigation item 3" },
          ],
          null,
          2,
        ),
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let navigationItems = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "navigationItems",
        ),
      ),
  );

  let derivedParametersObject = $derived(homepage ?? { navigationItems });

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
    <h5 id="component-demo" class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
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
            <Header fullWidthBorder={true} />
            <ServiceNavigation {...parametersObject} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px" />
    <h5 id="examples" class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <!-- Example 1: Service Name Only -->
    <h3 class="govuk-heading-m">Service Name Only</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";
</script>

<Header fullWidthBorder={true} />
<ServiceNavigation serviceName="My Service" serviceUrl="/my-service" />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header fullWidthBorder={true} />
        <ServiceNavigation serviceName="My Service" serviceUrl="/my-service" />
      </div>
    </div>

    <!-- Example 2: With Navigation Items -->
    <h3 class="govuk-heading-m">With Navigation Items</h3>
    <CodeBlock
      code={`<script>
  import Header from "$lib/components/ui/Header.svelte";
  import ServiceNavigation from "$lib/components/ui/ServiceNavigation.svelte";

  const navigationItems = [
    { href: "/item1", label: "Item 1" },
    { href: "/item2", label: "Item 2", isActive: true },
    { href: "/item3", label: "Item 3" }
  ];
</script>

<Header fullWidthBorder={true} />
<ServiceNavigation 
  serviceName="My Service" 
  serviceUrl="/my-service"
  {navigationItems}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Header fullWidthBorder={true} />
        <ServiceNavigation
          serviceName="My Service"
          serviceUrl="/my-service"
          navigationItems={[
            { href: "/item1", label: "Item 1" },
            { href: "/item2", label: "Item 2", isActive: true },
            { href: "/item3", label: "Item 3" },
          ]}
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
