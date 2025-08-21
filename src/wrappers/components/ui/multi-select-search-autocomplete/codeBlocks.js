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
