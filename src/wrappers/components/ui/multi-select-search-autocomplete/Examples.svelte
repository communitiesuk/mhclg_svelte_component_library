<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { SvelteMap } from "svelte/reactivity";

  // State variables for two-way binding example
  let globalColorMap = $state(new SvelteMap());
  let globalNextIndex = $state(0);
  let globalSelectedValues = $state([]); // Shared selected values between components

  // State variable for submit button demo
  let selectedValuesForSubmit = $state([]);

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
    {
      id: "7",
      heading: "7. Custom Source Selector Logic",
      content: Example7,
    },
    {
      id: "8",
      heading: "8. Submit Button Functionality",
      content: Example8,
    },
    {
      id: "9",
      heading: "9. LAD ↔ Postcode cross-selection messages",
      content: Example9,
    },
    {
      id: "10",
      heading: "10. Promote postcode selection to parent LAD (with context)",
      content: Example10,
    },
    {
      id: "11",
      heading: "11. Promote postcode selection to parent LSOA",
      content: Example11,
    },
  ];

  // Example 9 demo data and resolvers (top-level so snippets can reference them)
  // Demo LAD options (static)
  const ladOptions = [
    { value: "E09000018", text: "London Borough of Hounslow" },
    { value: "E09000033", text: "City of Westminster" },
    { value: "E08000003", text: "Manchester" },
    { value: "E07000173", text: "Mansfield" },
  ];

  // Fallback lookup table for postcodes.io API logic
  const postcodeToLadDemo = {
    "TW5 0AA": "E09000018", // Hounslow postcode → London Borough of Hounslow
    "TW3 1LR": "E09000018", // Another Hounslow postcode
    "SW1A 1AA": "E09000033", // Westminster postcode → City of Westminster
    "M1 1AE": "E08000003", // Manchester postcode → Manchester
  };

  // Cache resolved LAD codes per postcode to avoid repeated lookups
  const ladByPostcodeCache = new Map();

  /** Map a postcodes.io entry to its parent LAD (postcodes.io uses `codes.lau2`) */
  const apiParentResolver = (entry) => {
    if (!entry) return null;
    const code = entry?.codes?.lau2; // e.g. E09000018
    const label = entry?.admin_district ?? undefined; // e.g. Hounslow
    if (!code) return null;
    return { value: code, label };
  };

  /** Given a LAD code, return selected postcode strings that belong to it */
  const staticChildrenResolver = async (ladCode, selectedValues) => {
    const all = (selectedValues || []).map((v) => String(v));
    const pcs = all.filter((s) =>
      /[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}/i.test(s),
    );

    const found = [];
    const toFetch = [];

    for (const pcRaw of pcs) {
      const pc = pcRaw.toUpperCase();
      const cached = ladByPostcodeCache.get(pc) || postcodeToLadDemo[pc];
      if (cached) {
        ladByPostcodeCache.set(pc, cached);
        if (cached === ladCode) found.push(pcRaw);
      } else {
        toFetch.push(pc);
      }
    }

    if (toFetch.length > 0) {
      try {
        const res = await fetch("https://api.postcodes.io/postcodes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcodes: toFetch }),
        });
        const json = await res.json();
        const results = Array.isArray(json?.result) ? json.result : [];
        for (const r of results) {
          const pc = (r?.query || "").toUpperCase();
          const code = r?.result?.codes?.lau2 || r?.result?.codes?.lad;
          if (pc && code) {
            ladByPostcodeCache.set(pc, code);
            if (code === ladCode) {
              // find original casing from pcs
              const original = pcs.find((p) => p.toUpperCase() === pc) ?? pc;
              found.push(original);
            }
          }
        }
      } catch (e) {
        // ignore lookup errors in demo
      }
    }

    return found;
  };

  const tApiChildInSelectedParent = (child, parent) =>
    `${child} is in ${parent}, which is already selected`;

  const selectedChildParentResolver = (selectedValue) => {
    // For demo: selectedValue is a postcode string — look up its LAD via cache/map
    const pc = String(selectedValue).toUpperCase();
    const code = ladByPostcodeCache.get(pc) || postcodeToLadDemo[pc];
    if (!code) return null;
    // Map LAD codes to human-readable labels for demo resolver functions
    const labelMap = {
      E09000018: "London Borough of Hounslow",
      E09000033: "City of Westminster",
      E08000003: "Manchester",
    };
    return { value: code, label: labelMap[code] };
  };

  const tApiChildCoveredBySelectedChild = (child, parent, selectedChild) =>
    `${child} is in ${parent}, which is already covered by the selected postcode ${selectedChild}`;
  const tStaticParentContainsSelectedChildren = (parent, children) =>
    `${parent} contains ${children.join(", ")}, which ${
      children.length > 1 ? "are" : "is"
    } already selected`;

  const tPartialPostcodeInSelectedParent = (partialPostcode, parent) =>
    `Postcodes beginning ${partialPostcode}... are in ${parent}, which is already selected`;

  // Example 10: simple state for promotion demo
  let ladSelections10 = $state([]);

  // Debug Example 10 state changes
  $effect(() => {
    console.log("📋 Example 10 ladSelections10 changed:", {
      value: ladSelections10,
      length: ladSelections10?.length,
      type: typeof ladSelections10,
      isArray: Array.isArray(ladSelections10),
      stringified: JSON.stringify(ladSelections10),
    });
  });

  // Example 11: LSOA promotion demo data and resolvers
  // Demo LSOA options (static) - using actual LSOA codes and names
  const lsoaOptions = [
    { value: "E01002766", text: "Hounslow 018A" }, // LSOA in London Borough of Hounslow
    { value: "E01004736", text: "Westminster 018F" }, // LSOA in City of Westminster
    { value: "E01005212", text: "Manchester 057A" }, // LSOA in Manchester
    { value: "E01025287", text: "Islington 023B" }, // LSOA in Islington
  ];

  // Fallback lookup table for postcodes.io API logic (postcode -> LSOA)
  const postcodeToLsoaDemo = {
    "TW5 0AA": "E01002766", // Hounslow postcode → Hounslow 018A LSOA
    "TW3 1LR": "E01002766", // Another Hounslow postcode → Same LSOA
    "SW1A 1AA": "E01004736", // Westminster postcode → Westminster 018F LSOA
    "M1 1AE": "E01005212", // Manchester postcode → Manchester 057A LSOA
    "N1 2AB": "E01025287", // Islington postcode → Islington 023B LSOA
  };

  // Cache resolved LSOA codes per postcode to avoid repeated lookups
  const lsoaByPostcodeCache = new Map();

  /** Map a postcodes.io entry to its parent LSOA (postcodes.io uses `codes.lsoa`) */
  const lsoaApiParentResolver = (entry) => {
    if (!entry) return null;
    const code = entry?.codes?.lsoa; // e.g. E01002766
    const label = entry?.lsoa ?? undefined; // e.g. "Hounslow 018A"
    if (!code) return null;
    return { value: code, label };
  };

  /** Given an LSOA code, return selected postcode strings that belong to it */
  const lsoaStaticChildrenResolver = async (lsoaCode, selectedValues) => {
    const all = (selectedValues || []).map((v) => String(v));
    const pcs = all.filter((s) =>
      /[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}/i.test(s),
    );

    const found = [];
    const toFetch = [];

    for (const pcRaw of pcs) {
      const pc = pcRaw.toUpperCase();
      const cached = lsoaByPostcodeCache.get(pc) || postcodeToLsoaDemo[pc];
      if (cached) {
        lsoaByPostcodeCache.set(pc, cached);
        if (cached === lsoaCode) found.push(pcRaw);
      } else {
        toFetch.push(pc);
      }
    }

    if (toFetch.length > 0) {
      try {
        const res = await fetch("https://api.postcodes.io/postcodes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcodes: toFetch }),
        });
        const json = await res.json();
        const results = Array.isArray(json?.result) ? json.result : [];
        for (const r of results) {
          const pc = (r?.query || "").toUpperCase();
          const code = r?.result?.codes?.lsoa;
          if (pc && code) {
            lsoaByPostcodeCache.set(pc, code);
            if (code === lsoaCode) {
              // find original casing from pcs
              const original = pcs.find((p) => p.toUpperCase() === pc) ?? pc;
              found.push(original);
            }
          }
        }
      } catch (e) {
        // ignore lookup errors in demo
      }
    }

    return found;
  };

  const lsoaSelectedChildParentResolver = (selectedValue) => {
    // For demo: selectedValue is a postcode string — look up its LSOA via cache/map
    const pc = String(selectedValue).toUpperCase();
    const code = lsoaByPostcodeCache.get(pc) || postcodeToLsoaDemo[pc];
    if (!code) return null;
    // Map LSOA codes to human-readable labels for demo resolver functions
    const lsoaLabelMap = {
      E01002766: "Hounslow 018A",
      E01004736: "Westminster 018F",
      E01005212: "Manchester 057A",
      E01025287: "Islington 023B",
    };
    return { value: code, label: lsoaLabelMap[code] };
  };

  // Template functions for LSOA messaging
  const tLsoaApiChildInSelectedParent = (child, parent) =>
    `${child} is in ${parent}, which is already selected`;
  const tLsoaApiChildCoveredBySelectedChild = (child, parent, selectedChild) =>
    `${child} is in ${parent}, which is already covered by the selected postcode ${selectedChild}`;
  const tLsoaStaticParentContainsSelectedChildren = (parent, children) =>
    `${parent} contains ${children.join(", ")}, which ${
      children.length > 1 ? "are" : "is"
    } already selected`;
  const tLsoaPartialPostcodeInSelectedParent = (partialPostcode, parent) =>
    `Postcodes beginning ${partialPostcode}... are in ${parent}, which is already selected`;

  // Example 11: simple state for LSOA promotion demo
  let lsoaSelections11 = $state([]);
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

<!-- Example 7: Custom Source Selector Logic -->
{#snippet Example7()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="govuk-heading-s">Smart Source Selection:</h6>
      <p class="govuk-body">
        This example demonstrates how to use the <code>sourceSelector</code> prop
        to intelligently choose between API and static options based on the search
        query. Try searching for:
      </p>
      <ul class="govuk-list govuk-list--bullet">
        <li>
          <strong>Postcodes</strong> (e.g., "SW1A 1AA", "M1", "B1") → Uses API
        </li>
        <li>
          <strong>Partial postcodes</strong> (e.g., "SW1", "M1A") → Uses API
        </li>
        <li>
          <strong>Area names</strong> (e.g., "london", "manchester") → Uses static
          options
        </li>
      </ul>

      <MultiSelectSearchAutocomplete
        id="smart-selector-demo"
        name="smart-selector"
        label="Smart search with custom source selection"
        hint="Search for postcodes, names, or short queries to see different behaviors"
        items={[
          { value: "london", text: "London", region: "England" },
          { value: "manchester", text: "Manchester", region: "England" },
          { value: "birmingham", text: "Birmingham", region: "England" },
          { value: "leeds", text: "Leeds", region: "England" },
          { value: "bristol", text: "Bristol", region: "England" },
          { value: "cardiff", text: "Cardiff", region: "Wales" },
          { value: "edinburgh", text: "Edinburgh", region: "Scotland" },
          { value: "belfast", text: "Belfast", region: "Northern Ireland" },
        ]}
        groupKey="region"
        multiple={true}
        source_url="https://api.postcodes.io/postcodes/"
        source_key="result"
        source_property="postcode"
        minLength={3}
        sourceSelector={(query, staticOptions) => {
          // Custom logic to decide between API and static options
          const q = query.toLowerCase().trim();

          // More robust UK postcode detection
          // Can detect partial postcodes as they're being typed
          const isLikelyPostcode = (input) => {
            const trimmed = input.trim().toUpperCase();

            // Full postcode patterns
            const fullPostcodePatterns = [
              /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/, // A1 1AA, A11 1AA, AA1 1AA, AA11 1AA
              /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/, // A1A1AA, A11A1AA, AA1A1AA, AA11A1AA (no spaces)
            ];

            // Partial postcode patterns (as user types)
            const partialPostcodePatterns = [
              /^[A-Z]{1,2}$/, // Just area code (e.g., "SW", "M")
              /^[A-Z]{1,2}[0-9]$/, // Area + district (e.g., "SW1", "M1")
              /^[A-Z]{1,2}[0-9][A-Z0-9]?$/, // Area + district + sector (e.g., "SW1A", "M1A")
              /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*$/, // Area + district + sector + space
              /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9]$/, // Area + district + sector + space + unit number
            ];

            // Check if it's a complete postcode
            if (fullPostcodePatterns.some((pattern) => pattern.test(trimmed))) {
              return true;
            }

            // Check if it's a partial postcode (more than 2 chars to avoid false positives)
            if (
              trimmed.length > 2 &&
              partialPostcodePatterns.some((pattern) => pattern.test(trimmed))
            ) {
              return true;
            }

            // Additional heuristic: if it starts with area code pattern and has numbers
            // This catches cases like "SW1", "M1", "B1" etc.
            if (/^[A-Z]{1,2}[0-9]/.test(trimmed) && trimmed.length >= 3) {
              return true;
            }

            return false;
          };

          // If it looks like a postcode (even partial), use API
          if (isLikelyPostcode(q)) {
            console.log("Query looks like postcode, using API:", q);
            return "api";
          }

          // For everything else, use static options
          console.log("Query is not postcode-like, using static options:", q);
          return "options";
        }}
      />
    </div>

    <div class="govuk-inset-text">
      <h6 class="govuk-heading-s govuk-!-margin-top-0">How it works:</h6>
      <div class="govuk-body">
        <p>
          <strong>sourceSelector</strong> is a function that receives the search
          query and available static options, then returns either "api" or "options"
          to control the search behavior.
        </p>
        <p>
          <strong>Priority order:</strong>
        </p>
        <ol class="govuk-list govuk-list--number">
          <li>Below <code>minLength</code> → "short" mode (no search)</li>
          <li>
            Your <code>sourceSelector</code> function → "api" or "options"
          </li>
          <li>Fallback logic → postcode detection or static options</li>
        </ol>
        <p>
          This gives you full control over when to use API vs static options
          while maintaining the existing fallback behavior for edge cases.
        </p>
        <p
          class="govuk-!-margin-top-4 govuk-!-padding-3 govuk-body govuk-!-font-weight-bold"
        >
          <strong>Smart Postcode Detection:</strong> The example uses robust UK postcode
          patterns that can detect both complete postcodes (e.g., "SW1A 1AA") and
          partial ones (e.g., "SW1", "M1A") as users type, automatically switching
          to API mode for postcode-like queries and static options for everything
          else.
        </p>
      </div>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock7} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 8: Submit Button Functionality -->
{#snippet Example8()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="govuk-heading-s">Submit Button Demo:</h6>
      <p class="govuk-body">
        This example demonstrates how the submit button (search icon) works when
        the component is placed inside a form. Click the search icon to see the
        currently selected values.
      </p>
    </div>

    <form
      onsubmit={(e) => {
        e.preventDefault();
        alert(
          `Form submitted with selected values: ${JSON.stringify(selectedValuesForSubmit, null, 2)}`,
        );
      }}
      class="govuk-form-group"
    >
      <MultiSelectSearchAutocomplete
        id="submit-demo-select"
        name="submit-demo"
        label="Select multiple options"
        hint="Select some options, then click the search icon to submit the form"
        items={[
          { value: "option1", text: "Option 1" },
          { value: "option2", text: "Option 2" },
          { value: "option3", text: "Option 3" },
          { value: "option4", text: "Option 4" },
          { value: "option5", text: "Option 5" },
        ]}
        multiple={true}
        bind:value={selectedValuesForSubmit}
      />

      <div class="govuk-!-margin-top-4">
        <Button
          buttonType="default"
          textContent="Submit Form (Regular Button)"
          noPadding={true}
          onClickFunction={() => {
            // This will be handled by the form's onsubmit
          }}
        />

        <div class="govuk-body govuk-! govuk-!-margin-top-2">
          <span class="govuk-!-margin-right-2"
            >Or click the search icon above to submit</span
          >
          <span class="govuk-!-font-weight-bold">→</span>
        </div>
      </div>
    </form>

    <div class="govuk-inset-text">
      <h6 class="govuk-heading-s govuk-!-margin-top-0">How it works:</h6>
      <div class="govuk-body">
        <p>
          The search icon button inside <code
            >MultiSelectSearchAutocomplete</code
          >
          has <code>type="submit"</code>, making it functional when placed
          inside a form.
        </p>
        <p>
          <strong>Current selected values:</strong>
          {selectedValuesForSubmit.length > 0
            ? selectedValuesForSubmit.join(", ")
            : "None selected"}
        </p>
        <p
          class="govuk-!-margin-top-4 govuk-! govuk-body govuk-!-font-weight-bold"
        >
          <strong>Try it:</strong> Select some options above, then click the search
          icon to submit the form and see the selected values.
        </p>
      </div>
    </div>
  </div>
  <CodeBlock code={codeBlocks.codeBlock8} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 9: LAD static options with Postcodes API and cross-selection resolvers -->
{#snippet Example9()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="govuk-heading-s">LAD ↔ Postcode cross-selection demo</h6>
      <p class="govuk-body">
        Static options are LADs; API suggestions are postcodes from
        postcodes.io. If you type a postcode within an already-selected LAD, the
        list will show a dynamic message instead of suggestions. Likewise, if
        you type a LAD name that contains already-selected postcodes, a message
        explains which ones are already selected.
      </p>
    </div>

    <MultiSelectSearchAutocomplete
      id="lad-postcode-cross"
      name="lad-postcode-cross"
      label="Search LADs (static) and postcodes (API)"
      hint="Try selecting an LAD (e.g. Hounslow) then type a postcode like TW5 0AA"
      items={ladOptions}
      multiple={true}
      source_url="https://api.postcodes.io/postcodes/"
      source_key="result"
      source_property="postcode"
      minLength={3}
      groupKey={undefined}
      sourceSelector={(query) => {
        const q = query.toUpperCase().trim();
        if (q.length < 3) return "options"; // mirror Example 5 gating

        // Consider partial postcodes as postcode-like (similar to Example 7)
        const full = [
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/,
        ];
        const partial = [
          /^[A-Z]{1,2}$/,
          /^[A-Z]{1,2}[0-9]$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9]$/,
        ];
        const looksPc =
          full.some((p) => p.test(q)) ||
          partial.some((p) => p.test(q)) ||
          /\d/.test(q); // heuristic: contains a digit

        return looksPc ? "api" : "options";
      }}
      resetApiSuggestionsAfterSelection={true}
      {apiParentResolver}
      {staticChildrenResolver}
      {selectedChildParentResolver}
      {tApiChildInSelectedParent}
      {tApiChildCoveredBySelectedChild}
      {tStaticParentContainsSelectedChildren}
    />
  </div>

  <CodeBlock code={codeBlocks.codeBlock9} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 10: Promote postcode to LAD selection with context -->
{#snippet Example10()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="govuk-heading-s">Promote postcode to LAD selection</h6>
      <p class="govuk-body">
        Selecting a postcode will instead select its parent LAD. The chip shows
        contextual text with the originating postcode.
      </p>
    </div>

    <MultiSelectSearchAutocomplete
      id="promote-postcode-to-lad"
      name="promote-postcode-to-lad"
      label="Find your local authority"
      hint="Type a postcode; selecting it will select the parent LAD"
      items={ladOptions}
      multiple={true}
      bind:value={ladSelections10}
      source_url="https://api.postcodes.io/postcodes/"
      source_key="result"
      source_property="postcode"
      minLength={3}
      resetApiSuggestionsAfterSelection={true}
      promoteApiChildToParent={true}
      groupKey="context"
      sourceSelector={(query) => {
        const q = query.toUpperCase().trim();
        if (q.length < 3) return "options";
        const looksPc = /\d/.test(q);
        return looksPc ? "api" : "options";
      }}
      {apiParentResolver}
      {staticChildrenResolver}
      {selectedChildParentResolver}
      {tApiChildInSelectedParent}
      {tApiChildCoveredBySelectedChild}
      {tStaticParentContainsSelectedChildren}
      {tPartialPostcodeInSelectedParent}
    />
    <p class="govuk-body">
      Selected: {ladSelections10.length > 0
        ? ladSelections10.join(", ")
        : "None selected"}
    </p>
  </div>

  <CodeBlock code={codeBlocks.codeBlock10} language="svelte"></CodeBlock>
{/snippet}

<!-- Example 11: Promote postcode selection to parent LSOA -->
{#snippet Example11()}
  <div class="p-5 bg-white space-y-6">
    <div>
      <h6 class="govuk-heading-s">Postcode to LSOA promotion demo</h6>
      <p class="govuk-body">
        This example shows how postcodes can be promoted to their parent LSOA
        (Lower Layer Super Output Area). Static options are LSOAs; API
        suggestions are postcodes from postcodes.io. When you select a postcode,
        it gets promoted to its containing LSOA automatically.
      </p>
      <p class="govuk-body">
        <strong>Try this:</strong> Type "TW5 0AA" (Hounslow postcode) and select
        it. It will be promoted to "Hounslow 018A" LSOA. Or type "SW1A 1AA" (Westminster)
        to see it promoted to "Westminster 018F" LSOA.
      </p>
    </div>

    <MultiSelectSearchAutocomplete
      id="lsoa-promotion-demo"
      name="lsoa-promotion"
      label="Search and select LSOAs or postcodes"
      hint="Type an LSOA name or postcode - postcodes will be promoted to their parent LSOA"
      items={lsoaOptions}
      multiple={true}
      source_url="https://api.postcodes.io/postcodes/"
      source_key="result"
      source_property="postcode"
      minLength={3}
      groupKey={undefined}
      sourceSelector={(query) => {
        const q = query.toUpperCase().trim();
        if (q.length < 3) return "options";

        // Postcode detection patterns (same as Example 10)
        const full = [
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/,
        ];
        const partial = [
          /^[A-Z]{1,2}$/,
          /^[A-Z]{1,2}[0-9]$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*$/,
          /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9]$/,
        ];
        const looksPc =
          full.some((p) => p.test(q)) ||
          partial.some((p) => p.test(q)) ||
          /\d/.test(q); // heuristic: contains a digit

        return looksPc ? "api" : "options";
      }}
      resetApiSuggestionsAfterSelection={true}
      promoteApiChildToParent={true}
      apiParentResolver={lsoaApiParentResolver}
      staticChildrenResolver={lsoaStaticChildrenResolver}
      selectedChildParentResolver={lsoaSelectedChildParentResolver}
      tApiChildInSelectedParent={tLsoaApiChildInSelectedParent}
      tApiChildCoveredBySelectedChild={tLsoaApiChildCoveredBySelectedChild}
      tStaticParentContainsSelectedChildren={tLsoaStaticParentContainsSelectedChildren}
      tPartialPostcodeInSelectedParent={tLsoaPartialPostcodeInSelectedParent}
      bind:value={lsoaSelections11}
      enableSelectedItemCircles={true}
      selectedItemCircleColorPalette={selectedItemCircleColorPalette}
      matchBorderToCircleColor={true}
      selectedChipBackgroundColor="#FFF"
      choicesItemBorderRadius="5px"
    />
    <p class="govuk-body">
      Selected: {lsoaSelections11.length > 0
        ? lsoaSelections11.join(", ")
        : "None selected"}
    </p>
  </div>

  <CodeBlock code={codeBlocks.codeBlock11} language="svelte"></CodeBlock>
{/snippet}
