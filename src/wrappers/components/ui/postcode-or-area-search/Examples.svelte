<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";

  // Example state variables
  let basicExample = $state("");
  let essentialOnly = $state("");
  let customPlaceholder = $state("");
  let largeSize = $state("");
  let onBlueBackground = $state("");
  let requiredField = $state("");

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic postcode or area search",
      content: BasicExample,
    },
    {
      id: "2",
      heading: "2. Essential areas only",
      content: EssentialOnlyExample,
    },
    {
      id: "3",
      heading: "3. Custom labels and placeholder",
      content: CustomLabelsExample,
    },
    {
      id: "4",
      heading: "4. Large size variant",
      content: LargeSizeExample,
    },
    {
      id: "5",
      heading: "5. On blue background",
      content: OnBlueBackgroundExample,
    },
    {
      id: "6",
      heading: "6. Required field",
      content: RequiredFieldExample,
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

{#snippet BasicExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      A simple postcode and area search with default settings. Try typing "SW1A"
      for postcode search or "Westminster" for area search.
    </p>
    <PostcodeOrAreaSearch bind:selectedValue={basicExample} />
    {#if basicExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {basicExample}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.basicExample} language="svelte"></CodeBlock>
{/snippet}

{#snippet EssentialOnlyExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Filter to essential geocodes only (major administrative boundaries like
      countries, regions, counties, and local authorities).
    </p>
    <PostcodeOrAreaSearch
      essOnly={true}
      label_text="Search for a postcode or major area"
      hint="Searches major administrative areas only"
      bind:selectedValue={essentialOnly}
    />
    {#if essentialOnly}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {essentialOnly}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.essentialOnly} language="svelte"></CodeBlock>
{/snippet}

{#snippet CustomLabelsExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Customize the label, button text, placeholder, and hint to suit your use
      case.
    </p>
    <PostcodeOrAreaSearch
      label_text="Where do you live?"
      button_text="Find location"
      placeholder="Type your postcode or town name"
      hint="We'll use this to find services in your area"
      name="user_location"
      bind:selectedValue={customPlaceholder}
    />
    {#if customPlaceholder}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {customPlaceholder}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.customLabels} language="svelte"></CodeBlock>
{/snippet}

{#snippet LargeSizeExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Use the large size variant for prominent search functionality.
    </p>
    <PostcodeOrAreaSearch
      size="large"
      label_text="Find your constituency"
      placeholder="Enter your postcode or area name"
      bind:selectedValue={largeSize}
    />
    {#if largeSize}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {largeSize}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.largeSize} language="svelte"></CodeBlock>
{/snippet}

{#snippet OnBlueBackgroundExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Styling variant for use on dark blue backgrounds.
    </p>
    <div style="background-color: #1d70b8; padding: 2rem;" class="rounded">
      <PostcodeOrAreaSearch
        on_govuk_blue={true}
        label_text="Search locations"
        bind:selectedValue={onBlueBackground}
      />
      {#if onBlueBackground}
        <p style="color: white;" class="mt-3">
          <strong>Selected:</strong>
          {onBlueBackground}
        </p>
      {/if}
    </div>
  </div>
  <CodeBlock code={codeBlocks.onBlueBackground} language="svelte"></CodeBlock>
{/snippet}

{#snippet RequiredFieldExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Make the field required for form validation.
    </p>
    <form>
      <PostcodeOrAreaSearch
        required={true}
        label_text="Your location (required)"
        name="required_location"
        bind:selectedValue={requiredField}
      />
      <button
        class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="submit"
      >
        Submit
      </button>
    </form>
    {#if requiredField}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {requiredField}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.requiredField} language="svelte"></CodeBlock>
{/snippet}
