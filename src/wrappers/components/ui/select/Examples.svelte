<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Select from "$lib/components/ui/Select.svelte";

  // Shared items for examples
  let basicItems = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];

  let itemsWithErrorOption = [
    { value: "", text: "Please select" },
    ...basicItems,
  ];

  // New items array for default example with placeholder
  let itemsWithPlaceholder = [
    { value: "", text: "Please select" },
    ...basicItems,
  ];

  let itemsWithDisabled = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated", disabled: true },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];

  let itemsForValidation = [
    { value: "", text: "Please select" },
    { value: "allowed", text: "Allowed Option" },
    { value: "disallowed", text: "Disallowed Option (Client Validation)" },
    { value: "other", text: "Other Option" },
  ];

  let itemsForExtraProps = [
    { value: "alpha", text: "Alpha" },
    { value: "beta", text: "Beta" },
    { value: "gamma", text: "Gamma" },
  ];

  // Client-side validation function for example 6
  function validateSelectExample(value) {
    if (!value) {
      return "You must select an option.";
    }
    if (value === "disallowed") {
      return "This option is not permitted.";
    }
    return undefined; // Valid
  }

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Minimum required usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Default value selection (with placeholder)",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With hint text",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. With server-side error message",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. As page heading and full width",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. With a disabled option",
      content: Example6,
    },
    {
      id: "7",
      heading: "7. With client-side validation",
      content: Example7,
    },
    {
      id: "8",
      heading:
        "8. With other props (formGroupClasses, describedBy, attributes)",
      content: Example8,
    },
    {
      id: "9",
      heading: "9. Using bind:value",
      content: Example9,
    },
  ];

  // Add state for the new bindable example
  let selectedValue9 = $state("updated");

  // Reactive variables for binding in examples
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
    <Select id="sort-basic" name="sort-basic" items={basicItems} />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <Select
      id="sort-default"
      name="sort-default"
      label="Sort by (Default Value - with Placeholder)"
      items={itemsWithPlaceholder}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <Select
      id="sort-hint"
      name="sort-hint"
      label="Sort by"
      hint="Choose the order items are displayed in."
      items={basicItems}
      value="updated"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <Select
      id="sort-error"
      name="sort-error"
      label="Sort by"
      error="You must select a sort option."
      items={itemsWithErrorOption}
      value=""
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <Select
      id="sort-heading-full"
      name="sort-heading-full"
      label="Sort results by"
      labelIsPageHeading={true}
      fullWidth={true}
      items={basicItems}
      value="updated"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white">
    <Select
      id="sort-disabled"
      name="sort-disabled"
      label="Sort by (with disabled option)"
      items={itemsWithDisabled}
      value="published"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example7()}
  <div class="p-5 bg-white">
    <Select
      id="sort-validation"
      name="sort-validation"
      label="Select (with validation)"
      hint="Try selecting the disallowed option."
      items={itemsForValidation}
      value=""
      validate={validateSelectExample}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example8()}
  <div class="p-5 bg-white">
    <div id="extra-description" class="govuk-body-s govuk-!-margin-bottom-1">
      This text provides extra context.
    </div>
    <Select
      id="sort-extra-props"
      name="sort-extra-props"
      label="Select with extra props"
      items={itemsForExtraProps}
      value="beta"
      formGroupClasses="my-custom-form-group another-class"
      describedBy="extra-description"
      data-custom-attribute="example-value"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example9()}
  <div class="p-5 bg-white">
    <div class="govuk-body mb-2">
      <p>
        Selected value (bound): <code class="bg-gray-200 p-1 rounded"
          >{selectedValue9}</code
        >
      </p>
    </div>
    <Select
      id="sort-bind"
      name="sort-bind"
      label="Sort by (bind:value)"
      items={basicItems}
      bind:value={selectedValue9}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock9} language="svelte"></CodeBlock>
{/snippet}
