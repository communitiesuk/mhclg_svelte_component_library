<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Tabs from "$lib/components/ui/Tabs.svelte";
  import Radios from "$lib/components/ui/Radios.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Tabs Example with String Content",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Using Snippets with Pre-selected Tab",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Complex Content Using Svelte Snippets",
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

{#snippet example1Tab1Content()}
  <p class="govuk-body">This tab is not selected by default.</p>
{/snippet}

{#snippet example1Tab2Content()}
  <p class="govuk-body">
    This tab is now selected by default via the selectedTabId prop.
  </p>
{/snippet}

{#snippet example1Tab3Content()}
  <p class="govuk-body">This tab is not selected by default.</p>
{/snippet}

{#snippet chartsTabContent()}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-one-half">
      <table class="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--m"
          >Monthly statistics</caption
        >
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
      <div
        style="height: 200px; background-color: #f3f2f1; display: flex; align-items: center; justify-content: center;"
      >
        <p class="govuk-body">Chart Placeholder</p>
      </div>
    </div>
  </div>
{/snippet}

{#snippet formsTabContent()}
  <form class="govuk-form-group">
    <label class="govuk-label" for="example-input">Example input</label>
    <input
      class="govuk-input govuk-input--width-20"
      id="example-input"
      name="example-input"
      type="text"
    />

    <div class="govuk-form-group" style="margin-top: 20px;">
      <Radios
        name="example-radios"
        legend="Select an option"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
    </div>

    <div style="margin-top: 20px;">
      <Button textContent="Continue" buttonType="default" />
    </div>
  </form>
{/snippet}

{#snippet mediaTabContent()}
  <figure class="govuk-!-margin-bottom-6">
    <img
      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      alt="Person working on laptop with notebook and coffee"
      style="max-width: 100%; height: auto;"
    />
    <figcaption class="govuk-body-s govuk-!-margin-top-2">
      Modern workspace with laptop and notebook
    </figcaption>
  </figure>
  <p class="govuk-body">
    Tabs can contain various types of media including images, videos, and
    interactive content.
  </p>
{/snippet}

{#snippet Example1()}
  <div class="p-5 bg-white">
    <Tabs
      title="Contents"
      tabs={[
        {
          id: "tab-1",
          label: "First Tab",
          content:
            "Welcome to the first tab! This is a simple example showing how tabs can display basic text content.",
        },
        {
          id: "tab-2",
          label: "Second Tab",
          content:
            "Here's the second tab with some different content. Tabs are great for organizing related information.",
        },
        {
          id: "tab-3",
          label: "Third Tab",
          content:
            "And finally, the third tab. You can navigate between tabs using either your mouse or keyboard.",
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
      selectedTabId={"example-tab-2"}
      tabs={[
        {
          id: "example-tab-1",
          label: "First Tab",
          content: example1Tab1Content,
        },
        {
          id: "example-tab-2",
          label: "Second Tab",
          content: example1Tab2Content,
        },
        {
          id: "example-tab-3",
          label: "Third Tab",
          content: example1Tab3Content,
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
          content: chartsTabContent,
        },
        {
          id: "rich-tab-2",
          label: "Forms & Input",
          content: formsTabContent,
        },
        {
          id: "rich-tab-3",
          label: "Media Content",
          content: mediaTabContent,
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}
