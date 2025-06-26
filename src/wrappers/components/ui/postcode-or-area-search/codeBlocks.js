export const basicExample = `<script>
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  
  let selectedValue = $state("");
</script>

<PostcodeOrAreaSearch bind:selectedValue />

{#if selectedValue}
  <p>Selected: {selectedValue}</p>
{/if}`;

export const essentialOnly = `<PostcodeOrAreaSearch 
  essOnly={true}
  label_text="Search for a postcode or major area"
  hint="Searches major administrative areas only"
  bind:selectedValue 
/>`;

export const customLabels = `<PostcodeOrAreaSearch 
  label_text="Where do you live?"
  button_text="Find location"
  placeholder="Type your postcode or town name"
  hint="We'll use this to find services in your area"
  name="user_location"
  bind:selectedValue 
/>`;

export const largeSize = `<PostcodeOrAreaSearch 
  size="large"
  label_text="Find your constituency"
  placeholder="Enter your postcode or area name"
  bind:selectedValue 
/>`;

export const onBlueBackground = `<div style="background-color: #1d70b8; padding: 2rem;">
  <PostcodeOrAreaSearch 
    on_govuk_blue={true}
    label_text="Search locations"
    bind:selectedValue 
  />
</div>`;

export const requiredField = `<form>
  <PostcodeOrAreaSearch 
    required={true}
    label_text="Your location (required)"
    name="required_location"
    bind:selectedValue 
  />
  <button class="govuk-button" type="submit">
    Submit
  </button>
</form>`;

export const customData = `<script>
  const usPlaces = [
    { areacd: "US-CA", areanm: "California", parentcd: "US" },
    { areacd: "US-NY", areanm: "New York", parentcd: "US" },
    { areacd: "US-TX", areanm: "Texas", parentcd: "US" },
    { areacd: "US-FL", areanm: "Florida", parentcd: "US" },
    { areacd: "US-IL", areanm: "Illinois", parentcd: "US" },
    { areacd: "US-CA-LA", areanm: "Los Angeles", parentcd: "US-CA" },
    { areacd: "US-CA-SF", areanm: "San Francisco", parentcd: "US-CA" },
    { areacd: "US-NY-NYC", areanm: "New York City", parentcd: "US-NY" },
    { areacd: "US-TX-HOU", areanm: "Houston", parentcd: "US-TX" }
  ];
  
  const usGeoNames = {
    "US-": { label: "State", plural: "States" },
    "US-CA-": { label: "California City", plural: "California Cities" },
    "US-NY-": { label: "New York City", plural: "New York Cities" },
    "US-TX-": { label: "Texas City", plural: "Texas Cities" }
  };
</script>

<PostcodeOrAreaSearch 
  customPlacesData={usPlaces}
  customGeoNames={usGeoNames}
  customEssGeocodes={["US-"]}
  label_text="Search US states and cities"
  placeholder="e.g. California, New York, Los Angeles"
  hint="Custom geographic data with hierarchical relationships"
  bind:selectedValue 
/>

<!-- Demonstrates hierarchical geographic data structure -->`;

export const customTypes = `<script>
  const customTypeLabels = (type) => {
    const labels = {
      'E06': 'Council Area',
      'E07': 'District Council', 
      'E08': 'Metropolitan Borough',
      'E09': 'London Borough',
      'E10': 'County Council',
      'E12': 'English Region'
    };
    return labels[type] || 'Area';
  };
  
  const customSourceLogic = (query, options) => {
    // Only use API for full postcodes (with space)
    return query.includes(' ') && /\\d/.test(query) ? 'api' : 'options';
  };
</script>

<PostcodeOrAreaSearch 
  customGetTypeLabel={customTypeLabels}
  customSourceSelector={customSourceLogic}
  label_text="Find your council area"
  hint="More specific postcode detection"
  bind:selectedValue 
/>`;
