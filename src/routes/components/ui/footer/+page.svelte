<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
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
          "A footer component that provides navigation, meta information, and licensing details.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/footer/" target="_blank" rel="noopener noreferrer">GOV.UK Design System footer component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the footer component to help users navigate your service and find meta information.",
      },
      {
        content:
          "The footer can be configured to show different levels of navigation, from a simple copyright notice to a full navigation menu.",
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
        inputType: "javascript",
        value: JSON.stringify(
          [
            {
              title: "Services and information",
              columns: 2,
              items: [
                { href: "#", label: "Benefits" },
                { href: "#", label: "Births, deaths, marriages and care" },
                { href: "#", label: "Business and self-employed" },
              ],
            },
            {
              title: "Departments and policy",
              items: [
                { href: "#", label: "How government works" },
                { href: "#", label: "Departments" },
                { href: "#", label: "Worldwide" },
              ],
            },
          ],
          null,
          2,
        ),
      },
      {
        name: "inlineLinks",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          [
            { href: "#", label: "Help" },
            { href: "#", label: "Cookies" },
            { href: "#", label: "Contact" },
          ],
          null,
          2,
        ),
      },
      {
        name: "metaCustomContent",
        category: "Content",
        isProp: true,
        inputType: "input",
        value:
          'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>',
      },
      {
        name: "containerWidth",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "govuk-width-container",
      },
      {
        name: "showLicence",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: true,
      },
      {
        name: "showCopyright",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: true,
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

  let inlineLinks = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "inlineLinks",
        ),
      ),
  );

  let derivedParametersObject = $derived(homepage ?? { sections, inlineLinks });

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
            <Footer {...parametersObject} />
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
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<Footer />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer />
      </div>
    </div>

    <!-- Example 2: With Inline Links -->
    <h3 class="govuk-heading-m">With Inline Links</h3>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms and conditions" }
  ];
</script>

<Footer {inlineLinks} />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          inlineLinks={[
            { href: "/help", label: "Help" },
            { href: "/contact", label: "Contact" },
            { href: "/terms", label: "Terms and conditions" },
          ]}
        />
      </div>
    </div>

    <!-- Example 3: With Navigation Sections -->
    <h3 class="govuk-heading-m">With Navigation Sections</h3>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];
</script>

<Footer {sections} />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          sections={[
            {
              title: "Services and information",
              columns: 2,
              items: [
                { href: "/benefits", label: "Benefits" },
                { href: "/business", label: "Business and self-employed" },
              ],
            },
            {
              title: "Departments and policy",
              items: [
                {
                  href: "/how-government-works",
                  label: "How government works",
                },
                { href: "/departments", label: "Departments" },
              ],
            },
          ]}
        />
      </div>
    </div>

    <!-- Example 4: Full Featured Footer -->
    <h3 class="govuk-heading-m">Full Featured Footer</h3>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";

  const sections = [
    {
      title: "Services and information",
      columns: 2,
      items: [
        { href: "/benefits", label: "Benefits" },
        { href: "/business", label: "Business and self-employed" }
      ]
    },
    {
      title: "Departments and policy",
      items: [
        { href: "/how-government-works", label: "How government works" },
        { href: "/departments", label: "Departments" }
      ]
    }
  ];

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/cookies", label: "Cookies" },
    { href: "/contact", label: "Contact" }
  ];

  const metaCustomContent = 'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>';
</script>

<Footer
  {sections}
  {inlineLinks}
  {metaCustomContent}
  showLicence={true}
  showCopyright={true}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          sections={[
            {
              title: "Services and information",
              columns: 2,
              items: [
                { href: "/benefits", label: "Benefits" },
                { href: "/business", label: "Business and self-employed" },
              ],
            },
            {
              title: "Departments and policy",
              items: [
                {
                  href: "/how-government-works",
                  label: "How government works",
                },
                { href: "/departments", label: "Departments" },
              ],
            },
          ]}
          inlineLinks={[
            { href: "/help", label: "Help" },
            { href: "/cookies", label: "Cookies" },
            { href: "/contact", label: "Contact" },
          ]}
          metaCustomContent={'Built by the <a href="#" class="govuk-footer__link">Government Digital Service</a>'}
          showLicence={true}
          showCopyright={true}
        />
      </div>
    </div>

    <!-- Example 5: With Language Attributes (Welsh Example) -->
    <h3 class="govuk-heading-m">With Language Attributes (Welsh Example)</h3>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";

  const inlineLinks = [
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    { 
      href: "/welsh", 
      label: "Rhestr o Wasanaethau Cymraeg",
      lang: "cy",        // ISO 639-1 Welsh language code
      hrefLang: "cy"     // Indicates linked document is in Welsh
    }
  ];
</script>

<Footer {inlineLinks} />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          inlineLinks={[
            { href: "/help", label: "Help" },
            { href: "/contact", label: "Contact" },
            {
              href: "/welsh",
              label: "Rhestr o Wasanaethau Cymraeg",
              lang: "cy",
              hrefLang: "cy",
            },
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
