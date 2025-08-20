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
