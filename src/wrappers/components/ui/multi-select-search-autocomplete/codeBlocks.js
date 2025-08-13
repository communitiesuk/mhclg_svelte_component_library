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
