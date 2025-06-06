<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Footer from "$lib/components/layout/Footer.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With Inline Links",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With Navigation Sections",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Full Featured Footer",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. With Language Attributes (Welsh Example)",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. Custom Crown Copyright Logo",
      content: Example6,
    },
    {
      id: "7",
      heading: "7. Custom Copyright Text",
      content: Example7,
    },
    {
      id: "8",
      heading: "8. Combined Customisations",
      content: Example8,
    },
    {
      id: "9",
      heading: "9. Fully Customised Footer",
      content: Example9,
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
  <div class="py-5 bg-white">
    <Footer />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="py-5 bg-white">
    <Footer
      inlineLinks={[
        { href: "/help", label: "Help" },
        { href: "/contact", label: "Contact" },
        { href: "/terms", label: "Terms and conditions" },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="py-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="py-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="py-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="py-5 bg-white">
    <p class="govuk-body">
      You can customise the Crown Copyright logo by providing a different image
      URL:
    </p>
    <Footer
      copyrightLogoUrl="/assets/images/favicon.svg"
      metaCustomContent="This example shows a custom crown copyright logo"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example7()}
  <div class="py-5 bg-white">
    <p class="govuk-body">
      You can also customise the copyright text displayed in the footer:
    </p>
    <Footer
      copyrightText="© Your Organization 2024"
      metaCustomContent="This example shows custom copyright text"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example8()}
  <div class="py-5 bg-white">
    <p class="govuk-body">
      You can combine multiple customisations to fully personalise the footer:
    </p>
    <Footer
      copyrightLogoUrl="/assets/images/favicon.svg"
      copyrightText="© Your Organisation 2024"
      metaCustomContent="Combined customisation example"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example9()}
  <div class="py-5 bg-white">
    <p class="govuk-body">
      You can customise all aspects of the footer, including the licence text,
      URLs, and SVG paths:
    </p>
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
  <CodeBlock code={codeBlocks.codeBlock9} language="svelte"></CodeBlock>
{/snippet}
