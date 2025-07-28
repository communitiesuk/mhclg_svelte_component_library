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

// Example 6: Options with grouping
export const codeBlock6 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={[
    { label: "London", value: "london", region: "A large city in England" },
    { label: "Birmingham", value: "birmingham", region: "England" },
    { label: "Manchester", value: "manchester", region: "England" },
    { label: "Edinburgh", value: "edinburgh", region: "Scotland" },
    { label: "Glasgow", value: "glasgow", region: "Scotland" },
    { label: "Cardiff", value: "cardiff", region: "Wales" },
    { label: "Swansea", value: "swansea", region: "Wales" },
    { label: "Belfast", value: "belfast", region: "Northern Ireland" },
  ]}
  groupKey="region"
  placeholder="Search UK cities..."
  label_text="Select a UK city"
/>`;

// Example 7: RESTful Path-based API
export const codeBlockPathBased = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  source_url="https://api.zippopotam.us/us"
  source_key="places"
  source_property="place name"
  pathBasedApi={true}
  placeholder="Enter a US zip code (e.g., 90210, 10001)..."
  label_text="Search US locations by zip code"
  minLength={5}
  hint="Uses Zippopotam.us RESTful API - enter a 5-digit zip code"
/>

<!-- 
  pathBasedApi={true} constructs URLs like:
  https://api.zippopotam.us/us/90210
  
  Instead of query parameter URLs like:
  https://api.zippopotam.us/us?q=90210
-->`;

// Example 8: Dynamic source selection
export const codeBlock7 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={[
    { label: "London", value: "london", region: "England" },
    { label: "Birmingham", value: "birmingham", region: "England" },
    { label: "Manchester", value: "manchester", region: "England" },
    { label: "Edinburgh", value: "edinburgh", region: "Scotland" },
  ]}
  source_url="https://www.gov.uk/api/search.json?suggest=autocomplete"
  source_key="suggested_autocomplete"
  groupKey="region"
  placeholder="Type a city name or search term..."
  label_text="Search cities or GOV.UK content"
  minLength={3}
/>

<!-- Example sourceSelector function (not used in this example):
  sourceSelector={(query, options) => {
    // If input has 3+ chars and contains a digit, use API (postcode search)
    // Otherwise use local options
    return query.length >= 3 && /\\d/.test(query) ? 'api' : 'options';
  }}
-->`;

// Example 8: Behaviour (Default & Confirm)
export const codeBlock8 = `
<script>
  import SearchAutocomplete from '$lib/components/ui/SearchAutocomplete.svelte';
</script>

<SearchAutocomplete
  options={['One', 'Two', 'Three']}
  defaultValue="Two"
  confirmOnBlur={true}
  placeholder="Confirm on blur..."
/>`;

// Example 9: Selected Value Binding
export const codeBlock9 = `
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

// Example 10: Used Inside a Form for progressive enhancement
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

// Example 11: Using enhance for Progressive Enhancement
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
