<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
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
          "A header component that provides Ministry of Housing, Communities & Local Government (MHCLG) branding and identity for internal-facing services.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.justice.gov.uk/components/internal-header/" target="_blank" rel="noopener noreferrer">MOJ Design System internal header component</a> pattern, but styled for MHCLG use.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "The internal header shows users that they are on an MHCLG internal service and which service they are using.",
      },
      {
        content:
          "This component provides the MHCLG internal header which displays the crest, organisation name, service name, and account information.",
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
      // Content & Links
      {
        name: "organisationName",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "Organisation name",
      },
      {
        name: "serviceName",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "Service name",
      },
      {
        name: "homepageUrl",
        category: "Links",
        isProp: true,
        inputType: "input",
        value: "#",
      },
      {
        name: "serviceUrl",
        category: "Links",
        isProp: true,
        inputType: "input",
        value: "#",
      },

      // Account Settings
      {
        name: "accountName",
        category: "Account",
        isProp: true,
        inputType: "input",
        value: "John Smith",
      },
      {
        name: "signOutUrl",
        category: "Account",
        isProp: true,
        inputType: "input",
        value: "#",
      },
      {
        name: "showSignOut",
        category: "Account",
        isProp: true,
        inputType: "checkbox",
        value: "false",
      },

      // Styling Options
      {
        name: "headerBorder",
        category: "Styling",
        isProp: true,
        inputType: "input",
        value: "10px solid #00625E",
      },
      {
        name: "verticalLineSvgColor",
        category: "Styling",
        isProp: true,
        inputType: "input",
        value: "#00625E",
      },
      {
        name: "backgroundColor",
        category: "Styling",
        isProp: true,
        inputType: "input",
        value: "#0b0c0c",
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
            <InternalHeader {...parametersObject} />
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
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
</script>

<InternalHeader />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <InternalHeader />
      </div>
    </div>

    <!-- Example 2: With Custom Organization and Service Names -->
    <h3 class="govuk-heading-m">With Custom Organization and Service Names</h3>
    <CodeBlock
      code={`<script>
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
</script>

<InternalHeader 
  organisationName="MHCLG" 
  serviceName="Planning Applications" 
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <InternalHeader
          organisationName="MHCLG"
          serviceName="Planning Applications"
        />
      </div>
    </div>

    <!-- Example 3: With Account Name -->
    <h3 class="govuk-heading-m">With Account Name</h3>
    <CodeBlock
      code={`<script>
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
</script>

<InternalHeader 
  accountName="Jane Doe"
  showSignOut={true}
  signOutUrl="/logout"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <InternalHeader
          accountName="Jane Doe"
          showSignOut={true}
          signOutUrl="/logout"
        />
      </div>
    </div>

    <!-- Example 4: Combined Options -->
    <h3 class="govuk-heading-m">Combined Options</h3>
    <CodeBlock
      code={`<script>
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
</script>

<InternalHeader 
  organisationName="MHCLG"
  serviceName="Housing Development Portal"
  homepageUrl="https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government"
  serviceUrl="/housing-development"
  accountName="Jane Doe"
  showSignOut={true}
  signOutUrl="/logout"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <InternalHeader
          organisationName="MHCLG"
          serviceName="Housing Development Portal"
          homepageUrl="https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government"
          serviceUrl="/housing-development"
          accountName="Jane Doe"
          showSignOut={true}
          signOutUrl="/logout"
        />
      </div>
    </div>

    <!-- Example 5: Custom Styling -->
    <h3 class="govuk-heading-m">Custom Styling</h3>
    <CodeBlock
      code={`<script>
  import InternalHeader from "$lib/components/ui/InternalHeader.svelte";
</script>

<InternalHeader 
  headerBorder="10px solid #942828"
  verticalLineSvgColor="#942828"
  backgroundColor="#808080"
  organisationName="Civil Service"
  serviceName="Internal Portal"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <InternalHeader
          headerBorder="10px solid #942828"
          verticalLineSvgColor="#942828"
          backgroundColor="#808080"
          organisationName="Civil Service"
          serviceName="Internal Portal"
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
