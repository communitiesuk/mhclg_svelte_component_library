<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Tabs from "$lib/components/ui/Tabs.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Tabs Example",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Pre-selected Tab Example",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Tabs with Rich Content",
      content: Example3,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
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
    <Tabs
      title="Contents"
      tabs={[
        {
          id: "tab-1",
          label: "First Tab",
          content: `<h2 class="govuk-heading-l">First Tab Content</h2>
            <p class="govuk-body">This is the content for the first tab.</p>`,
        },
        {
          id: "tab-2",
          label: "Second Tab",
          content: `<h2 class="govuk-heading-l">Second Tab Content</h2>
            <p class="govuk-body">This is the content for the second tab.</p>`,
        },
        {
          id: "tab-3",
          label: "Third Tab",
          content: `<h2 class="govuk-heading-l">Third Tab Content</h2>
            <p class="govuk-body">This is the content for the third tab.</p>`,
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <Tabs
      title="Pre-selected Tab Example"
      tabs={[
        {
          id: "example-tab-1",
          label: "First Tab",
          content: `<h2 class="govuk-heading-l">First Tab Content</h2>
            <p class="govuk-body">This tab is not selected by default.</p>`,
        },
        {
          id: "example-tab-2",
          label: "Second Tab",
          selected: true,
          content: `<h2 class="govuk-heading-l">Second Tab Content</h2>
            <p class="govuk-body">This tab is selected by default because it has selected=true.</p>`,
        },
        {
          id: "example-tab-3",
          label: "Third Tab",
          content: `<h2 class="govuk-heading-l">Third Tab Content</h2>
            <p class="govuk-body">This tab is not selected by default.</p>`,
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <Tabs
      title="Rich Content Example"
      tabs={[
        {
          id: "rich-tab-1",
          label: "Charts & Data",
          content: `<h2 class="govuk-heading-l">Charts & Data</h2>
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-half">
                <table class="govuk-table">
                  <caption class="govuk-table__caption govuk-table__caption--m">Monthly statistics</caption>
                  <thead class="govuk-table__head">
                    <tr class="govuk-table__row">
                      <th scope="col" class="govuk-table__header">Month</th>
                      <th scope="col" class="govuk-table__header">Value</th>
                    </tr>
                  </thead>
                  <tbody class="govuk-table__body">
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">January</td>
                      <td class="govuk-table__cell">125</td>
                    </tr>
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">February</td>
                      <td class="govuk-table__cell">163</td>
                    </tr>
                    <tr class="govuk-table__row">
                      <td class="govuk-table__cell">March</td>
                      <td class="govuk-table__cell">142</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="govuk-grid-column-one-half">
                <div style="height: 200px; background-color: #f3f2f1; display: flex; align-items: center; justify-content: center;">
                  <p class="govuk-body">Chart Placeholder</p>
                </div>
              </div>
            </div>`,
        },
        {
          id: "rich-tab-2",
          label: "Forms & Input",
          content: `<h2 class="govuk-heading-l">Forms & Input</h2>
            <form class="govuk-form-group">
              <label class="govuk-label" for="example-input">Example input</label>
              <input class="govuk-input govuk-input--width-20" id="example-input" name="example-input" type="text">
              
              <div class="govuk-form-group" style="margin-top: 20px;">
                <fieldset class="govuk-fieldset">
                  <legend class="govuk-fieldset__legend">Select an option</legend>
                  <div class="govuk-radios">
                    <div class="govuk-radios__item">
                      <input class="govuk-radios__input" id="radio-1" name="radio" type="radio" value="yes">
                      <label class="govuk-label govuk-radios__label" for="radio-1">Yes</label>
                    </div>
                    <div class="govuk-radios__item">
                      <input class="govuk-radios__input" id="radio-2" name="radio" type="radio" value="no">
                      <label class="govuk-label govuk-radios__label" for="radio-2">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              
              <button type="button" class="govuk-button" style="margin-top: 20px;">Continue</button>
            </form>`,
        },
        {
          id: "rich-tab-3",
          label: "Media Content",
          content: `<h2 class="govuk-heading-l">Media Content</h2>
            <figure class="govuk-!-margin-bottom-6">
              <img src="https://via.placeholder.com/800x400" alt="Example image" style="max-width: 100%; height: auto;">
              <figcaption class="govuk-body-s govuk-!-margin-top-2">Example image caption</figcaption>
            </figure>
            <p class="govuk-body">Tabs can contain various types of media including images, videos, and interactive content.</p>`,
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
