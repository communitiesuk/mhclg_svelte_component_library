// Example 1: Local options list
export const codeBlock1 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  placeholder="Type a fruit..."
/>`;

// Example 2: Remote API source
// Uses postcodes.io API: https://postcodes.io/
export const codeBlock2 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  source_url="https://api.postcodes.io/postcodes"
  source_key="result" // Assumes results are under 'result' key
  source_property="postcode"
  placeholder="Enter postcode query..."
  minLength={1}
  tNoResults={() => "No matching postcodes found"}
/>`;

// Example 3: Custom minLength & placeholder
export const codeBlock3 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={['Alpha', 'Beta', 'Gamma', 'Delta']}
  minLength={1}
  placeholder="Start typing (min 1)..."
/>`;

// Example 4: Custom 'no results' text
export const codeBlock4 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={['X', 'Y', 'Z']}
  tNoResults={() => 'Sorry, no matches found'}
/>`;

// Example 5: Options as objects
export const codeBlock5 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={[
    { label: 'Apple', value: 'fruit_a' },
    { label: 'Banana', value: 'fruit_b' },
    { label: 'Cherry', value: 'fruit_c' },
  ]}
  placeholder="Select a fruit object..."
/>`;

// Example 6: Behaviour (Default & Confirm)
export const codeBlock6 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={['One', 'Two', 'Three']}
  defaultValue="Two"
  confirmOnBlur={true}
  placeholder="Confirm on blur..."
/>`;
