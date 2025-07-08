<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  import hierarchyData from "$lib/data/geographic-hierarchy-flat.json";

  // Example state variables
  let basicExample = $state("");
  let essentialOnly = $state("");
  let customPlaceholder = $state("");
  let largeSize = $state("");
  let onBlueBackground = $state("");
  let requiredField = $state("");
  let customDataExample = $state("");
  let regexTypeLabelsExample = $state("");
  let customLabelsExample = $state("");
  let customGeoTypesExample = $state("");
  let limitedSuggestionsExample = $state("");
  let hierarchyDataExample = $state("");

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
    {
      id: "7",
      heading: "7. Custom data for non-UK locations",
      content: CustomDataExample,
    },
    {
      id: "8",
      heading: "8. Regex-based type classification",
      content: RegexTypeLabelsExample,
    },
    {
      id: "9",
      heading: "9. Custom type labels and grouping",
      content: CustomTypesExample,
    },
    {
      id: "10",
      heading: "10. Custom geographic types (authorities & statistical areas)",
      content: CustomGeoTypesExample,
    },
    {
      id: "11",
      heading: "11. Limiting suggestions for performance",
      content: LimitedSuggestionsExample,
    },
    {
      id: "12",
      heading: "12. Using geographic hierarchy data",
      content: HierarchyDataExample,
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

{#snippet CustomDataExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Use custom places data for non-UK locations. This example shows US states
      and major cities:
    </p>
    <PostcodeOrAreaSearch
      customPlacesData={[
        // US Country (top level)
        { areacd: "USA", areanm: "United States", parentcd: "" },
        // States (3-char codes: "US1", "US2", etc.)
        { areacd: "US1", areanm: "California", parentcd: "USA" },
        { areacd: "US2", areanm: "New York", parentcd: "USA" },
        { areacd: "US3", areanm: "Texas", parentcd: "USA" },
        { areacd: "US4", areanm: "Florida", parentcd: "USA" },
        { areacd: "US5", areanm: "Illinois", parentcd: "USA" },
        // Cities (3-char codes: "CA1", "NY1", etc.)
        { areacd: "CA1", areanm: "Los Angeles", parentcd: "US1" },
        { areacd: "CA2", areanm: "San Francisco", parentcd: "US1" },
        { areacd: "NY1", areanm: "New York City", parentcd: "US2" },
        { areacd: "TX1", areanm: "Houston", parentcd: "US3" },
      ]}
      customTypeLookup={{
        // 3-character lookups that match areacd.slice(0,3)
        USA: { label: "Country", plural: "Countries" },
        US1: { label: "State", plural: "States" },
        US2: { label: "State", plural: "States" },
        US3: { label: "State", plural: "States" },
        US4: { label: "State", plural: "States" },
        US5: { label: "State", plural: "States" },
        CA1: { label: "California City", plural: "California Cities" },
        CA2: { label: "California City", plural: "California Cities" },
        NY1: { label: "New York City", plural: "New York Cities" },
        TX1: { label: "Texas City", plural: "Texas Cities" },
      }}
      customEssGeocodes={["US1", "US2", "US3", "US4", "US5"]}
      label_text="Search US states and cities"
      placeholder="e.g. California, New York, Los Angeles"
      hint="Custom geographic data with hierarchical relationships"
      bind:selectedValue={customDataExample}
    />
    {#if customDataExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {customDataExample}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.customData} language="svelte"></CodeBlock>
{/snippet}

{#snippet RegexTypeLabelsExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Use regex patterns to classify area codes with unique, clear types. This
      demonstrates how to create custom groupings based on code patterns:
    </p>
    <PostcodeOrAreaSearch
      customGetTypeLabel={(type) => {
        // Pattern matching for different area types
        if (/^E0[6-9]/.test(type)) return "Local Authority"; // E06, E07, E08, E09
        if (/^E1[0-2]/.test(type)) return "Regional Area"; // E10, E11, E12
        if (/^W0[1-6]/.test(type)) return "Welsh Territory"; // W01-W06
        if (/^S1[0-5]/.test(type)) return "Scottish Zone"; // S10-S15
        if (/^N0[1-9]/.test(type)) return "Northern Ireland"; // N01-N09

        // Statistical areas with different patterns
        if (/^[EW]0[01]/.test(type)) return "Small Statistical Area"; // E00, E01, W00, W01
        if (/^[EW]02/.test(type)) return "Medium Statistical Area"; // E02, W02

        // Fallback for anything else
        return "Other Area";
      }}
      label_text="Search with regex classification"
      hint="Area types determined by regex patterns instead of lookup tables"
      placeholder="e.g. Southampton, East of England, Cardiff"
      bind:selectedValue={regexTypeLabelsExample}
    />
    {#if regexTypeLabelsExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {regexTypeLabelsExample}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.regexTypeLabels} language="svelte"></CodeBlock>
{/snippet}

{#snippet CustomTypesExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Customise type labels and grouping with custom lookup functions:
    </p>
    <PostcodeOrAreaSearch
      customGetTypeLabel={(type) => {
        const labels = {
          E06: "Council Area",
          E07: "District Council",
          E08: "Metropolitan Borough",
          E09: "London Borough",
          E10: "County Council",
          E12: "English Region",
        };
        return labels[type] || "Area";
      }}
      customSourceSelector={(query, options) => {
        // Only use API for full postcodes (with space)
        return query.includes(" ") && /\d/.test(query) ? "api" : "options";
      }}
      label_text="Find your council area"
      hint="More specific postcode detection"
      bind:selectedValue={customLabelsExample}
    />
    {#if customLabelsExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {customLabelsExample}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.customTypes} language="svelte"></CodeBlock>
{/snippet}

{#snippet CustomGeoTypesExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Configure custom geographic types based on specific UK administrative and
      statistical areas. This example focuses on 6 geoTypes categories: cauth,
      utla, ltla, msoa, lsoa, and oa:
    </p>
    <PostcodeOrAreaSearch
      customTypeLookup={{
        // Combined/Upper-tier authorities (cauth codes)
        E06: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        E09: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        E10: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        E47: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        N09: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        S12: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },
        W06: {
          label: "upper-tier/combined authority",
          plural: "upper-tier/combined authorities",
        },

        // Upper-tier/unitary authorities (utla codes - overlaps with cauth but different grouping)
        E08: {
          label: "upper-tier/unitary authority",
          plural: "upper-tier/unitary authorities",
        },

        // Lower-tier/unitary authorities (ltla codes)
        E07: {
          label: "lower-tier/unitary authority",
          plural: "lower-tier/unitary authorities",
        },

        // MSOAs
        E02: { label: "MSOA", plural: "MSOAs" },
        W02: { label: "MSOA", plural: "MSOAs" },

        // LSOAs
        E01: { label: "LSOA", plural: "LSOAs" },
        W01: { label: "LSOA", plural: "LSOAs" },

        // Output areas
        E00: { label: "output area", plural: "output areas" },
        W00: { label: "output area", plural: "output areas" },
      }}
      customEssGeocodes={[
        // cauth (upper-tier/combined authority)
        "E06",
        "E09",
        "E10",
        "E47",
        "N09",
        "S12",
        "W06",
        // utla (upper-tier/unitary authority) - E08 is unique to utla
        "E08",
        // ltla (lower-tier/unitary authority) - E07 is unique to ltla
        "E07",
        // msoa
        "E02",
        "W02",
        // lsoa
        "E01",
        "W01",
        // oa (output area)
        "E00",
        "W00",
      ]}
      essOnly={true}
      label_text="Search authorities and statistical areas"
      hint="Filtered to cauth, utla, ltla, msoa, lsoa, and oa categories from geoTypes"
      bind:selectedValue={customGeoTypesExample}
    />
    {#if customGeoTypesExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {customGeoTypesExample}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.customGeoTypes} language="svelte"></CodeBlock>
{/snippet}

{#snippet LimitedSuggestionsExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Limit the number of suggestions displayed for better performance with
      large datasets. This example limits suggestions to 5 results:
    </p>
    <PostcodeOrAreaSearch
      maxSuggestions={5}
      label_text="Search UK areas (max 5 suggestions)"
      hint="Only the first 5 matching areas will be shown"
      placeholder="e.g. Westminster, Birmingham"
      bind:selectedValue={limitedSuggestionsExample}
    />
    {#if limitedSuggestionsExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {limitedSuggestionsExample}
      </p>
    {/if}
    <p class="mt-3 text-sm text-gray-600">
      <strong>Note:</strong> This limit only applies to local area suggestions. Postcode
      API results are controlled by the external API.
    </p>
  </div>
  <CodeBlock code={codeBlocks.limitedSuggestions} language="svelte"></CodeBlock>
{/snippet}

{#snippet HierarchyDataExample()}
  <div class="p-5 bg-white">
    <p class="mb-4 text-gray-700">
      Use the bundled geographic hierarchy data file for comprehensive UK area
      search. This demonstrates using the complete ONS geographic hierarchy with
      all area levels:
    </p>
    <PostcodeOrAreaSearch
      customPlacesData={hierarchyData.data}
      customTypeLookup={{
        // Area type mappings based on the hierarchy data
        E00: { label: "OA", plural: "Output Areas" },
        E01: { label: "LSOA", plural: "Lower Super Output Areas" },
        E02: { label: "MSOA", plural: "Middle Super Output Areas" },
        E06: { label: "LAD", plural: "Local Authority Districts" },
        E07: { label: "LAD", plural: "Local Authority Districts" },
        E08: { label: "LAD", plural: "Local Authority Districts" },
        E09: { label: "LAD", plural: "Local Authority Districts" },
        W00: { label: "OA", plural: "Output Areas" },
        W01: { label: "LSOA", plural: "Lower Super Output Areas" },
        W02: { label: "MSOA", plural: "Middle Super Output Areas" },
        W06: { label: "LAD", plural: "Local Authority Districts" },
        S00: { label: "OA", plural: "Output Areas" },
        S01: { label: "LSOA", plural: "Data Zones" },
        S02: { label: "MSOA", plural: "Intermediate Zones" },
        S12: { label: "LAD", plural: "Council Areas" },
        N00: { label: "OA", plural: "Output Areas" },
        N01: { label: "LSOA", plural: "Super Output Areas" },
        N02: { label: "MSOA", plural: "Super Output Areas" },
        N09: { label: "LAD", plural: "Local Government Districts" },
      }}
      maxSuggestions={15}
      label_text="Search UK Geographic Areas"
      hint="Uses the complete ONS geographic data - all area levels (OA, LSOA, MSOA, LAD)"
      placeholder="e.g. Westminster, Birmingham, specific output areas"
      bind:selectedValue={hierarchyDataExample}
    />
    {#if hierarchyDataExample}
      <p class="mt-3 font-semibold">
        <strong>Selected:</strong>
        {hierarchyDataExample}
      </p>
      <p class="mt-2 text-sm text-gray-600">
        <strong>Total areas available in dataset:</strong>
        {hierarchyData.data.length.toLocaleString()}
      </p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.hierarchyData} language="svelte"></CodeBlock>
{/snippet}
