<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { SvelteMap } from "svelte/reactivity";

  // State variables for two-way binding example
  let globalColorMap = new SvelteMap();
  let globalNextIndex = 0;
  let globalSelectedValues = []; // Shared selected values between components

  // GOV.UK color palette for the example
  const selectedItemCircleColorPalette = [
    "#1d70b8", // Blue (primary)
    "#d4351c", // Red
    "#00703c", // Green
    "#f47738", // Orange
    "#4c2c92", // Purple
    "#801650", // Bright purple
    "#28a197", // Turquoise
    "#b58840", // Brown
    "#d53880", // Pink
    "#6f72af", // Light purple
    "#f499be", // Light pink
    "#85994b", // Light green
    "#ffdd00", // Yellow
    "#12436d", // Dark blue
    "#505a5f", // Dark grey
    "#626a6e", // Mid grey
    "#b1b4b6", // Light grey
    "#0b0c0c", // Black
  ];

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Single Select with Search",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Multiple Select with Colors",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Grouped Options with Countries",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Group Key Feature with Locations",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Remote API source (postcodes.io)",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. Two-Way Binding with Color State",
      content: Example6,
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
  <div class="p-5 bg-white">
    <MultiSelectSearchAutocomplete
      id="country-select"
      name="country"
      label="Select a country"
      hint="Start typing to search for a country"
      items={[
        { value: "england", text: "England" },
        { value: "scotland", text: "Scotland" },
        { value: "wales", text: "Wales" },
        { value: "northern-ireland", text: "Northern Ireland" },
        { value: "france", text: "France" },
        { value: "germany", text: "Germany" },
        { value: "spain", text: "Spain" },
        { value: "italy", text: "Italy" },
      ]}
      multiple={false}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <MultiSelectSearchAutocomplete
      id="colors-select"
      name="colors"
      label="Select multiple colors"
      hint="You can select multiple options"
      items={[
        { value: "red", text: "Red" },
        { value: "blue", text: "Blue" },
        { value: "green", text: "Green" },
        { value: "yellow", text: "Yellow" },
        { value: "purple", text: "Purple" },
        { value: "orange", text: "Orange" },
      ]}
      multiple={true}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <MultiSelectSearchAutocomplete
      id="grouped-select"
      name="grouped"
      label="Select from grouped options"
      hint="Options are grouped by region"
      groups={[
        {
          label: "UK Countries",
          choices: [
            { value: "england", text: "England" },
            { value: "scotland", text: "Scotland" },
            { value: "wales", text: "Wales" },
            { value: "northern-ireland", text: "Northern Ireland" },
          ],
        },
        {
          label: "European Countries",
          choices: [
            { value: "france", text: "France" },
            { value: "germany", text: "Germany" },
            { value: "spain", text: "Spain" },
            { value: "italy", text: "Italy" },
          ],
        },
      ]}
      multiple={false}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 4: Group Key Feature with Locations -->
{#snippet Example4()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="font-semibold mb-3">Single Select with Group Key:</h6>
      <MultiSelectSearchAutocomplete
        id="location-select-single"
        name="location-single"
        label="Select a location"
        hint="Options show location name and region"
        groupKey="region"
        items={[
          { value: "hounslow", text: "Hounslow", region: "London" },
          { value: "birmingham", text: "Birmingham", region: "West Midlands" },
          { value: "manchester", text: "Manchester", region: "North West" },
          { value: "leeds", text: "Leeds", region: "Yorkshire" },
          { value: "bristol", text: "Bristol", region: "South West" },
          { value: "cardiff", text: "Cardiff", region: "Wales" },
          { value: "edinburgh", text: "Edinburgh", region: "Scotland" },
          { value: "belfast", text: "Belfast", region: "Northern Ireland" },
        ]}
        multiple={false}
      />
    </div>

    <div>
      <h6 class="font-semibold mb-3">Multiple Select with Group Key:</h6>
      <MultiSelectSearchAutocomplete
        id="location-select-multiple"
        name="location-multiple"
        label="Select multiple locations"
        hint="You can select multiple locations from different regions"
        groupKey="region"
        items={[
          { value: "hounslow", text: "Hounslow", region: "London" },
          { value: "birmingham", text: "Birmingham", region: "West Midlands" },
          { value: "manchester", text: "Manchester", region: "North West" },
          { value: "leeds", text: "Leeds", region: "Yorkshire" },
          { value: "bristol", text: "Bristol", region: "South West" },
          { value: "cardiff", text: "Cardiff", region: "Wales" },
          { value: "edinburgh", text: "Edinburgh", region: "Scotland" },
          { value: "belfast", text: "Belfast", region: "Northern Ireland" },
        ]}
        multiple={true}
      />
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 5: Remote API source (postcodes.io) -->
{#snippet Example5()}
  <div class="p-5 bg-white">
    <!-- Uses postcodes.io API: https://postcodes.io/ -->
    <MultiSelectSearchAutocomplete
      id="postcode-select"
      name="postcode"
      label="Search UK postcodes"
      hint="Start typing a postcode"
      multiple={true}
      source_url="https://api.postcodes.io/postcodes/"
      source_key="result"
      source_property="postcode"
      choicesOptions={{}}
      minLength={3}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlockApi} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 6: Two-Way Binding with Color State -->
<!-- This example demonstrates how to use the new bindable state props to sync color state between multiple components -->
{#snippet Example6()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h2 class="govuk-heading-m">
        Two-Way Binding Demo: Synchronised Multi-Select Components
      </h2>
      <p class="govuk-body">
        Both components below share the same options and color state. Select or
        deselect items in either component to see them sync in real-time.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <h6 class="font-semibold mb-3 text-gray-800">
          Component 1 - Left Panel
        </h6>
        <MultiSelectSearchAutocomplete
          id="bound-select-1"
          name="bound-1"
          label="Select fruits (Component 1)"
          hint="Select items here and watch Component 2 sync automatically"
          items={[
            { value: "apple", text: "🍎 Apple" },
            { value: "banana", text: "🍌 Banana" },
            { value: "cherry", text: "🍒 Cherry" },
            { value: "date", text: "📅 Date" },
            { value: "elderberry", text: "🫐 Elderberry" },
            { value: "fig", text: "🫒 Fig" },
            { value: "grape", text: "🍇 Grape" },
            { value: "honeydew", text: "🍈 Honeydew" },
            { value: "kiwi", text: "🥝 Kiwi" },
            { value: "lemon", text: "🍋 Lemon" },
            { value: "mango", text: "🥭 Mango" },
            { value: "nectarine", text: "🍑 Nectarine" },
          ]}
          multiple={true}
          bind:value={globalSelectedValues}
          bind:bindSelectedItemIndexMap={globalColorMap}
          bind:bindNextSelectionIndex={globalNextIndex}
        />
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <h6 class="font-semibold mb-3 text-gray-800">
          Component 2 - Right Panel
        </h6>
        <MultiSelectSearchAutocomplete
          id="bound-select-2"
          name="bound-2"
          label="Select fruits (Component 2)"
          hint="This component automatically syncs with Component 1"
          items={[
            { value: "apple", text: "🍎 Apple" },
            { value: "banana", text: "🍌 Banana" },
            { value: "cherry", text: "🍒 Cherry" },
            { value: "date", text: "📅 Date" },
            { value: "elderberry", text: "🫐 Elderberry" },
            { value: "fig", text: "🫒 Fig" },
            { value: "grape", text: "🍇 Grape" },
            { value: "honeydew", text: "🍈 Honeydew" },
            { value: "kiwi", text: "🥝 Kiwi" },
            { value: "lemon", text: "🍋 Lemon" },
            { value: "mango", text: "🥭 Mango" },
            { value: "nectarine", text: "🍑 Nectarine" },
          ]}
          multiple={true}
          bind:value={globalSelectedValues}
          bind:bindSelectedItemIndexMap={globalColorMap}
          bind:bindNextSelectionIndex={globalNextIndex}
        />
      </div>
    </div>

    <div>
      <h2 class="govuk-heading-m">🎨 Live Colour State Synchronisation</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">Next Color Index:</span>
            <span
              class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-mono"
            >
              {globalNextIndex}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">Total Selected Items:</span>
            <span
              class="px-3 py-1 bg-green-100 text-green-800 rounded-full font-mono"
            >
              {globalColorMap.size}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">Available Colors:</span>
            <span
              class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-mono"
            >
              {selectedItemCircleColorPalette.length - globalColorMap.size}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">Selected Values:</span>
            <span
              class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-mono"
            >
              {globalSelectedValues.length}
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <span class="font-medium text-gray-700 block mb-2"
            >Color Mapping:</span
          >
          <div class="max-h-32 overflow-y-auto space-y-1">
            {#each Array.from(globalColorMap.entries()) as [itemValue, colorIndex]}
              <div class="flex items-center gap-2 p-2 bg-white rounded border">
                <span
                  class="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style="background-color: {selectedItemCircleColorPalette[
                    colorIndex
                  ]}"
                ></span>
                <span class="text-sm font-medium">{itemValue}</span>
                <span class="text-xs text-gray-500 ml-auto"
                  >→ Color {colorIndex}</span
                >
              </div>
            {/each}
            {#if globalColorMap.size === 0}
              <div
                class="text-sm text-gray-500 italic p-2 bg-white rounded border"
              >
                No items selected yet
              </div>
            {/if}
          </div>
        </div>
      </div>

      <div class="govuk-!-margin-top-6 govuk-button-group">
        <Button
          buttonType="warning"
          textContent="Reset All Selections"
          onClickFunction={() => {
            // Reset all state - single source of truth means no need for component resets!
            globalColorMap.clear();
            globalNextIndex = 0;
            globalSelectedValues = [];
          }}
        />
        <Button
          buttonType="secondary"
          textContent="Add Demo Selections"
          onClickFunction={() => {
            // Add some demo selections
            globalColorMap.set("apple", 0);
            globalColorMap.set("banana", 1);
            globalColorMap.set("cherry", 2);
            globalNextIndex = 3;
            globalSelectedValues = ["apple", "banana", "cherry"];
          }}
        />
        <Button
          buttonType="default"
          textContent="Debug State"
          onClickFunction={() => {
            console.log("🔍 Debug State:", {
              globalColorMap: Object.fromEntries(globalColorMap),
              globalNextIndex,
              globalSelectedValues,
              mapSize: globalColorMap.size,
            });
          }}
        />
      </div>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock6} language="svelte"></CodeBlock>
{/snippet}
