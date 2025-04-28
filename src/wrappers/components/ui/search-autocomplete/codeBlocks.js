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

// Example 7: Selected Value Binding
export const codeBlock7 = `
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';

  let demoSelectedAutocompleteValue: string | null = $state(null); // Initialise as null
</script>

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
   <p class="govuk-body mt-4 text-gray-500">
    No value selected yet.
  </p>
{/if}
`;

// Example 8: Used Inside a Form for progressive enhancement
export const codeBlockForm = `
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
  let { form } = $props(); // Accept form prop from parent (form request processed by server +page.server.ts)
</script>

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
    <strong>Note:</strong> submitting this form will trigger a page refresh...
  </p>
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
`;

// Example 9: Using enhance for Progressive Enhancement
export const codeBlockEnhance = `
<script lang="ts">
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
  import { enhance } from '$app/forms';

  let searchValue: string = $state("");
  let showSuccessBanner: boolean = $state(false);

  let { form } = $props(); // Accept form prop from parent (form request processed by server +page.server.ts)
</script>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // bind to selectedValue prop
    searchValue = searchValue;
    showSuccessBanner = true;
    // Prevent server submission
    cancel();
  }}
  // alternatively could still allow server submission to handle data processing and use "use:enhance" to just prevent the default refresh behaviour
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
`;
