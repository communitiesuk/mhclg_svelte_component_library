<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import SearchAutocomplete from "$lib/components/ui/SearchAutocomplete.svelte";

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
      heading: "6. Behaviour (Default & Confirm)",
      content: ExampleBehaviour,
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

<!-- Example 6: Behaviour (Default & Confirm) -->
{#snippet ExampleBehaviour()}
  <div class="p-5 bg-white">
    <SearchAutocomplete
      options={["One", "Two", "Three"]}
      defaultValue="Two"
      confirmOnBlur={true}
      placeholder="Confirm on blur..."
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte" />
{/snippet}
