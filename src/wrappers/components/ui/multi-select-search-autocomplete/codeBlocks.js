export const codeBlock1 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
</script>

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
    { value: "italy", text: "Italy" }
  ]}
  multiple={false}
/>`;

export const codeBlock2 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
</script>

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
    { value: "orange", text: "Orange" }
  ]}
  multiple={true}
/>`;

export const codeBlock3 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
</script>

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
        { value: "northern-ireland", text: "Northern Ireland" }
      ]
    },
    {
      label: "European Countries",
      choices: [
        { value: "france", text: "France" },
        { value: "germany", text: "Germany" },
        { value: "spain", text: "Spain" },
        { value: "italy", text: "Italy" }
      ]
    }
  ]}
  multiple={false}
/>`;

export const codeBlockApi = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
<\/script>

<!-- Uses postcodes.io API: https://postcodes.io/ -->
<MultiSelectSearchAutocomplete
  id="postcode-select"
  name="postcode"
  label="Search UK postcodes"
  hint="Start typing a postcode"
  multiple={false}
  source_url="https://api.postcodes.io/postcodes"
  source_key="result"
  source_property="postcode"
  minLength={3}
/>`;

export const codeBlock4 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
</script>

<!-- Single Select with Group Key -->
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
    { value: "belfast", text: "Belfast", region: "Northern Ireland" }
  ]}
  multiple={false}
/>

<!-- Multiple Select with Group Key -->
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
    { value: "belfast", text: "Belfast", region: "Northern Ireland" }
  ]}
  multiple={true}
/>`;

export const codeBlock6 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
  import { SvelteMap } from "svelte/reactivity";
  
  // State variables for two-way binding
  let globalColorMap = new SvelteMap();
  let globalNextIndex = 0;
  let globalSelectedValues = []; // Shared selected values between components
  
  // GOV.UK color palette
  const selectedItemCircleColorPalette = [
    "#1d70b8", "#d4351c", "#00703c", "#f47738", "#4c2c92",
    "#801650", "#28a197", "#b58840", "#d53880", "#6f72af",
    "#f499be", "#85994b", "#ffdd00", "#12436d", "#505a5f",
    "#626a6e", "#b1b4b6", "#0b0c0c"
  ];
</script>

 <!-- Info banner explaining the demo -->
 <div>
   <h2 class="govuk-heading-m">
     Two-Way Binding Demo: Synchronised Multi-Select Components
   </h2>
   <p class="govuk-body">
     Both components below share the same options and color state. 
     Select or deselect items in either component to see them sync in real-time.
   </p>
 </div>

<!-- Two synchronized components in a grid layout -->
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
        { value: "nectarine", text: "🍑 Nectarine" }
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
        { value: "nectarine", text: "🍑 Nectarine" }
      ]}
      multiple={true}
      bind:value={globalSelectedValues}
      bind:bindSelectedItemIndexMap={globalColorMap}
      bind:bindNextSelectionIndex={globalNextIndex}
    />
  </div>
</div>

 <!-- Live color state display with enhanced UI -->
 <div>
  <h2 class="govuk-heading-m">
    🎨 Live Colour State Synchronisation
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">Next Color Index:</span>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-mono">
          {globalNextIndex}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">Total Selected Items:</span>
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full font-mono">
          {globalColorMap.size}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">Available Colors:</span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-mono">
          {selectedItemCircleColorPalette.length - globalColorMap.size}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">Selected Values:</span>
        <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-mono">
          {globalSelectedValues.length}
        </span>
      </div>
    </div>

    <div class="space-y-2">
      <span class="font-medium text-gray-700 block mb-2">Color Mapping:</span>
      <div class="max-h-32 overflow-y-auto space-y-1">
        {#each Array.from(globalColorMap.entries()) as [itemValue, colorIndex]}
          <div class="flex items-center gap-2 p-2 bg-white rounded border">
            <span
              class="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style="background-color: {selectedItemCircleColorPalette[colorIndex]}"
            ></span>
            <span class="text-sm font-medium">{itemValue}</span>
            <span class="text-xs text-gray-500 ml-auto">→ Color {colorIndex}</span>
          </div>
        {/each}
        {#if globalColorMap.size === 0}
          <div class="text-sm text-gray-500 italic p-2 bg-white rounded border">
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
           mapSize: globalColorMap.size
         });
       }}
     />
   </div>
</div>`;

export const codeBlock7 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
</script>

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
    { value: "belfast", text: "Belfast", region: "Northern Ireland" }
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
        /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/,   // A1A1AA, A11A1AA, AA1A1AA, AA11A1AA (no spaces)
      ];
      
      // Partial postcode patterns (as user types)
      const partialPostcodePatterns = [
        /^[A-Z]{1,2}$/,                    // Just area code (e.g., "SW", "M")
        /^[A-Z]{1,2}[0-9]$/,              // Area + district (e.g., "SW1", "M1")
        /^[A-Z]{1,2}[0-9][A-Z0-9]?$/,    // Area + district + sector (e.g., "SW1A", "M1A")
        /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*$/, // Area + district + sector + space
        /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9]$/, // Area + district + sector + space + unit number
      ];
      
      // Check if it's a complete postcode
      if (fullPostcodePatterns.some(pattern => pattern.test(trimmed))) {
        return true;
      }
      
      // Check if it's a partial postcode (more than 2 chars to avoid false positives)
      if (trimmed.length > 2 && partialPostcodePatterns.some(pattern => pattern.test(trimmed))) {
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
      console.log("🎯 Query looks like postcode, using API:", q);
      return "api";
    }
    
    // For everything else, use static options
    console.log("🎯 Query is not postcode-like, using static options:", q);
    return "options";
  }}
/>`;

export const codeBlock8 = `
<script>
  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  
  // State variable for submit button demo
  let selectedValuesForSubmit = [];
</script>

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
      alert(\`Form submitted with selected values: \${JSON.stringify(selectedValuesForSubmit, null, 2)}\`);
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
        { value: "option5", text: "Option 5" }
      ]}
      multiple={true}
      bind:value={selectedValuesForSubmit}
    />
    
    <div class="govuk-button-group">
      <Button
        buttonType="default"
        textContent="Submit Form (Regular Button)"
        noPadding={true}
        onClickFunction={() => {
          // This will be handled by the form's onsubmit
        }}
      />
      
      <div class="govuk-body govuk-! govuk-!-margin-top-2">
        <span class="govuk-!-margin-right-2">Or click the search icon above to submit</span>
        <span class="govuk-!-font-weight-bold">→</span>
      </div>
    </div>
  </form>

  <div class="govuk-inset-text">
    <h6 class="govuk-heading-s govuk-!-margin-top-0">How it works:</h6>
    <div class="govuk-body">
      <p>
        The search icon button inside <code>MultiSelectSearchAutocomplete</code>
        has <code>type="submit"</code>, making it functional when placed
        inside a form.
      </p>
      <p>
        <strong>Current selected values:</strong>
        {selectedValuesForSubmit.length > 0
          ? selectedValuesForSubmit.join(", ")
          : "None selected"}
      </p>
      <p class="govuk-!-margin-top-4 govuk-! govuk-body govuk-!-font-weight-bold">
        <strong>Try it:</strong> Select some options above, then click the search
        icon to submit the form and see the selected values.
      </p>
    </div>
  </div>
</div>`;
