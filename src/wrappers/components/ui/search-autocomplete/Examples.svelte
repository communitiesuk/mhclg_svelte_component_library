<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { enhance } from "$app/forms";
  let searchValue: string = $state("");
  let showSuccessBanner: boolean = $state(false);
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import SearchAutocomplete from "$lib/components/ui/SearchAutocomplete.svelte";

  // Accept form prop from parent (runes mode)
  let { form } = $props();

  // Initialize state to null to show it only updates on confirmation
  let demoSelectedAutocompleteValue: string | null = $state(null);

  // Define the list of example snippets to show in the accordion
  let accordionSnippetSections = [
    { id: "1", heading: "1. Local options list", content: ExampleOptions },
    { id: "2", heading: "2. Remote API source", content: ExampleApi },
    {
      id: "3",
      heading: "3. Custom minLength & placeholder",
      content: ExampleMinLength,
    },
    {
      id: "4",
      heading: "4. Custom 'no results' text",
      content: ExampleCustomNoResults,
    },
    {
      id: "5",
      heading: "5. Options as objects",
      content: ExampleObjectOptions,
    },
    {
      id: "6",
      heading: "6. Options with grouping",
      content: ExampleGroupedOptions,
    },
    {
      id: "7",
      heading: "7. Behaviour (Default & Confirm)",
      content: ExampleBehaviour,
    },
    {
      id: "8",
      heading: "8. With Selected Value Binding",
      content: Example7,
    },
    {
      id: "9",
      heading: "9. Used Inside a Form for progressive enhancement",
      content: ExampleForm,
    },
    {
      id: "10",
      heading: "10. Using enhance for Progressive Enhancement",
      content: ExampleEnhance,
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

<!-- Example 1: Local options list -->
{#snippet ExampleOptions()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={["Apple", "Banana", "Cherry", "Date", "Elderberry"]}
      placeholder="Type a fruit..."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte" />
{/snippet}

<!-- Example 2: Remote API source -->
{#snippet ExampleApi()}
  <div class="p-5 bg-white">
    <!-- Uses postcodes.io API: https://postcodes.io/ -->
    <SearchAutocomplete
      source_url="https://api.postcodes.io/postcodes"
      source_key="result"
      source_property="postcode"
      placeholder="Enter postcode query..."
      minLength={1}
      tNoResults={() => "No matching postcodes found"}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte" />
{/snippet}

<!-- Example 3: Custom minLength & placeholder -->
{#snippet ExampleMinLength()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={["Alpha", "Beta", "Gamma", "Delta"]}
      minLength={1}
      placeholder="Start typing (min 1)..."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte" />
{/snippet}

<!-- Example 4: Custom 'no results' text -->
{#snippet ExampleCustomNoResults()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={["X", "Y", "Z"]}
      tNoResults={() => "Sorry, no matches found"}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte" />
{/snippet}

<!-- Example 5: Options as objects -->
{#snippet ExampleObjectOptions()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={[
        { label: "Apple", value: "fruit_a" },
        { label: "Banana", value: "fruit_b" },
        { label: "Cherry", value: "fruit_c" },
      ]}
      placeholder="Select a fruit object..."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte" />
{/snippet}

<!-- Example 6: Options with grouping -->
{#snippet ExampleGroupedOptions()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={[
        {
          label: "London",
          value: "london",
          region: " A large city in England",
        },
        { label: "Birmingham", value: "birmingham", region: "England" },
        { label: "Manchester", value: "manchester", region: "England" },
        { label: "Edinburgh", value: "edinburgh", region: "Scotland" },
        { label: "Glasgow", value: "glasgow", region: "Scotland" },
        { label: "Cardiff", value: "cardiff", region: "Wales" },
        { label: "Swansea", value: "swansea", region: "Wales" },
        { label: "Belfast", value: "belfast", region: "Northern Ireland" },
      ]}
      groupKey="region"
      placeholder="Search UK cities..."
      label_text="Select a UK city"
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte" />
{/snippet}

<!-- Example 7: Behaviour (Default & Confirm) -->
{#snippet ExampleBehaviour()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={["One", "Two", "Three"]}
      defaultValue="Two"
      confirmOnBlur={true}
      placeholder="Confirm on blur..."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte" />
{/snippet}

<!-- Example 8: With Selected Value Binding -->
{#snippet Example7()}
  <div class="p-5 bg-white">
    <div class="mt-4">
      <SearchAutocomplete
        label_text="Select a country"
        options={[
          { label: "United States of America", value: "USA" },
          { label: "Canada", value: "CAN" },
          { label: "Mexico", value: "MEX" },
          { label: "United Kingdom", value: "GBR" },
        ]}
        bind:selectedValue={demoSelectedAutocompleteValue}
        placeholder="Start typing a country name..."
      />
    </div>

    {#if demoSelectedAutocompleteValue !== null}
      <p class="govuk-body mt-4">
        Confirmed selected value: {demoSelectedAutocompleteValue}
      </p>
    {:else}
      <p class="govuk-body mt-4 text-gray-500">No value selected yet.</p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 9: Used Inside a Form for progressive enhancement -->
{#snippet ExampleForm()}
  <div class="p-5 bg-white">
    <form method="POST" class="govuk-form-group">
      <SearchAutocomplete
        name="search"
        options={[
          { label: "United States of America", value: "USA" },
          { label: "Canada", value: "CAN" },
          { label: "Mexico", value: "MEX" },
        ]}
        placeholder="Search countries..."
      />
      <p class="govuk-body mt-4">
        <strong>Note:</strong> submitting this form will trigger a page refresh,
        come back to this section to see if this submission worked and we retrieve
        the value searched from the server. This ensures that the component will
        submit without JavaScript on a fully progressively enhancened site (our site
        isn't fully progressively enhanced yet so the examples accordian won't render
        without JS).
      </p>
      <!-- icon button inside SearchAutocomplete handles submission -->
    </form>
    {#if form?.search}
      <div
        class="govuk-notification-banner govuk-notification-banner--success mt-4"
        role="region"
        aria-labelledby="submission-success"
      >
        <h2 class="govuk-notification-banner__title" id="submission-success">
          Search submitted
        </h2>
        <p class="govuk-notification-banner__content">
          You searched for: <strong>{form.search}</strong>
        </p>
      </div>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlockForm} language="svelte" />
{/snippet}

<!-- Example 10: Using enhance for Progressive Enhancement -->
{#snippet ExampleEnhance()}
  <div class="p-5 bg-white">
    <form
      method="POST"
      use:enhance={({ formData, cancel }) => {
        // bind to selectedValue prop
        searchValue = searchValue;
        showSuccessBanner = true;
        // Prevent server submission
        cancel();
      }}
      class="govuk-form-group"
    >
      <SearchAutocomplete
        name="search"
        options={[
          { label: "United States of America", value: "USA" },
          { label: "Canada", value: "CAN" },
          { label: "Mexico", value: "MEX" },
        ]}
        placeholder="Search countries (client-side handling)..."
        bind:selectedValue={searchValue}
      />
      <!-- icon button inside SearchAutocomplete handles submission -->
    </form>

    {#if showSuccessBanner}
      <div
        class="govuk-notification-banner govuk-notification-banner--success mt-4"
        role="alert"
        aria-labelledby="enhance-success-title"
      >
        <h2 class="govuk-notification-banner__title" id="enhance-success-title">
          Client-side Search Handled
        </h2>
        <div class="govuk-notification-banner__content">
          <p>You searched for: <strong>{searchValue}</strong></p>
        </div>
      </div>
    {/if}
    {#if form?.search}
      <div
        class="govuk-notification-banner govuk-notification-banner--success mt-4"
        role="region"
        aria-labelledby="submission-success"
      >
        <h2 class="govuk-notification-banner__title" id="submission-success">
          Search submitted
        </h2>
        <p class="govuk-notification-banner__content">
          You searched for: <strong>{form.search}</strong>
        </p>
      </div>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlockEnhance} language="svelte" />
{/snippet}
