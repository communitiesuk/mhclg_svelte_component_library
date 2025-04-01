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
      // Content category
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

      // UI Options category
      {
        name: "containerWidth",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "govuk-width-container",
      },
      // License-related UI options
      {
        name: "showLicence",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: true,
      },
      // Copyright-related UI options
      {
        name: "showCopyright",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: true,
      },
      {
        name: "copyrightText",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "© Crown copyright",
      },
      {
        name: "copyrightLogoUrl",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "/assets/images/govuk-crest.svg",
      },

      // Advanced Customisation category
      // License-related advanced options
      {
        name: "licenceTextBefore",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value: "All content is available under the ",
      },
      {
        name: "licenceLinkText",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value: "Open Government Licence v3.0",
      },
      {
        name: "licenceTextAfter",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value: ", except where otherwise stated",
      },
      {
        name: "licenceHref",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value:
          "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
      },
      {
        name: "crownSvgPath",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value:
          "M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145",
      },
      // Copyright-related advanced options
      {
        name: "copyrightHref",
        category: "Advanced Customisation",
        isProp: true,
        inputType: "input",
        value:
          "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/",
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
  copyrightLogoUrl="/assets/images/govuk-crest.svg"
  copyrightText="© Crown copyright"
  copyrightHref="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Open Government Licence v3.0"
  licenceTextAfter=", except where otherwise stated"
  licenceHref="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
  crownSvgPath="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
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
          copyrightLogoUrl="/assets/images/govuk-crest.svg"
          copyrightText="© Crown copyright"
          copyrightHref="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
          licenceTextBefore="All content is available under the "
          licenceLinkText="Open Government Licence v3.0"
          licenceTextAfter=", except where otherwise stated"
          licenceHref="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
          crownSvgPath="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
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

    <!-- Example 6: Custom Crown Copyright Logo -->
    <h3 class="govuk-heading-m">Custom Crown Copyright Logo</h3>
    <p class="govuk-body">
      You can customise the Crown Copyright logo by providing a different image
      URL:
    </p>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<!-- Using a custom logo image for the crown copyright section -->
<Footer copyrightLogoUrl="/path/to/your/custom-crest.svg" />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          copyrightLogoUrl="/assets/images/favicon.svg"
          metaCustomContent="This example shows a custom crown copyright logo"
        />
      </div>
    </div>

    <!-- Example 7: Custom Copyright Text -->
    <h3 class="govuk-heading-m">Custom Copyright Text</h3>
    <p class="govuk-body">
      You can also customise the copyright text displayed in the footer:
    </p>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<!-- Using custom copyright text -->
<Footer copyrightText="© Your Organization 2024" />`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          copyrightText="© Your Organization 2024"
          metaCustomContent="This example shows custom copyright text"
        />
      </div>
    </div>

    <!-- Example 8: Combined Customisations -->
    <h3 class="govuk-heading-m">Combined Customisations</h3>
    <p class="govuk-body">
      You can combine multiple customisations to fully personalise the footer:
    </p>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<!-- Using both custom logo and text -->
<Footer 
  copyrightLogoUrl="/path/to/your/organization-logo.svg"
  copyrightText="© Your Organization 2024"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          copyrightLogoUrl="/assets/images/favicon.svg"
          copyrightText="© Your Organisation 2024"
          metaCustomContent="Combined customisation example"
        />
      </div>
    </div>

    <!-- Example 9: Fully Customised Footer -->
    <h3 class="govuk-heading-m">Fully Customised Footer</h3>
    <p class="govuk-body">
      You can customise all aspects of the footer, including the licence text,
      URLs, and SVG paths:
    </p>
    <CodeBlock
      code={`<script>
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<!-- Fully customised footer with all customisable props -->
<Footer 
  copyrightLogoUrl="/path/to/your/logo.svg"
  copyrightText="© Your Organization 2024" 
  copyrightHref="https://your-org.com/copyright"
  licenceTextBefore="All content is available under the "
  licenceLinkText="Custom Licence v1.0"
  licenceTextAfter=", except where otherwise noted"
  licenceHref="https://your-org.com/licence"
  crownSvgPath="M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z" 
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Footer
          copyrightLogoUrl="/assets/images/favicon.svg"
          copyrightText="© Your Organisation 2024"
          copyrightHref="https://example.org/copyright"
          licenceTextBefore="All content is available under the "
          licenceLinkText="Custom Licence v1.0"
          licenceTextAfter=", except where otherwise noted"
          licenceHref="https://example.org/licence"
          crownSvgPath="M405 125V5l-100 65v160h200v-105zm-200-15c-20-20-45-30-75-30-55 0-100 45-100 100s45 100 100 100c55 0 95-40 95-85 0-30-15-45-35-60l90-60c-15-40-50-65-90-65-70 0-120 55-120 110-60 0-110 50-110 110 0 65 50 115 110 115 60 0 120-45 120-110 60 0 130 35 165 90l55-40v-180H240l45 45z"
          metaCustomContent="Fully customised footer example"
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
