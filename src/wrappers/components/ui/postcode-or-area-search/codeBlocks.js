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
    { areacd: "TX1", areanm: "Houston", parentcd: "US3" }
  ];
  
  const usGeoNames = {
    // 3-character lookups that match areacd.slice(0,3)
    "USA": { label: "Country", plural: "Countries" },
    "US1": { label: "State", plural: "States" },
    "US2": { label: "State", plural: "States" },
    "US3": { label: "State", plural: "States" },
    "US4": { label: "State", plural: "States" },
    "US5": { label: "State", plural: "States" },
    "CA1": { label: "California City", plural: "California Cities" },
    "CA2": { label: "California City", plural: "California Cities" },
    "NY1": { label: "New York City", plural: "New York Cities" },
    "TX1": { label: "Texas City", plural: "Texas Cities" }
  };
</script>

<PostcodeOrAreaSearch 
  customPlacesData={usPlaces}
  customGeoNames={usGeoNames}
  customEssGeocodes={["US1", "US2", "US3", "US4", "US5"]}
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

export const customGeoTypes = `<script>
  // Custom GeoNames based on specific geoTypes categories
  const customGeoNames = {
    // Combined/Upper-tier authorities (cauth codes)
    'E06': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'E09': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'E10': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'E47': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'N09': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'S12': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    'W06': { label: 'upper-tier/combined authority', plural: 'upper-tier/combined authorities' },
    
    // Upper-tier/unitary authorities (utla codes - overlaps with cauth but different grouping)
    'E08': { label: 'upper-tier/unitary authority', plural: 'upper-tier/unitary authorities' },
    
    // Lower-tier/unitary authorities (ltla codes)
    'E07': { label: 'lower-tier/unitary authority', plural: 'lower-tier/unitary authorities' },
    
    // MSOAs
    'E02': { label: 'MSOA', plural: 'MSOAs' },
    'W02': { label: 'MSOA', plural: 'MSOAs' },
    
    // LSOAs
    'E01': { label: 'LSOA', plural: 'LSOAs' },
    'W01': { label: 'LSOA', plural: 'LSOAs' },
    
    // Output areas
    'E00': { label: 'output area', plural: 'output areas' },
    'W00': { label: 'output area', plural: 'output areas' }
  };
  
  // Custom essential geocodes based on the 6 geoTypes categories requested
  const customEssGeocodes = [
    // cauth (upper-tier/combined authority)
    'E06', 'E09', 'E10', 'E47', 'N09', 'S12', 'W06',
    // utla (upper-tier/unitary authority) - E08 is unique to utla
    'E08',
    // ltla (lower-tier/unitary authority) - E07 is unique to ltla  
    'E07',
    // msoa
    'E02', 'W02',
    // lsoa
    'E01', 'W01',
    // oa (output area)
    'E00', 'W00'
  ];
</script>

<PostcodeOrAreaSearch 
  customGeoNames={customGeoNames}
  customEssGeocodes={customEssGeocodes}
  essOnly={true}
  label_text="Search authorities and statistical areas"
  hint="Filtered to cauth, utla, ltla, msoa, lsoa, and oa categories from geoTypes"
  bind:selectedValue 
/>

<!-- Demonstrates custom geographic type configuration based on geoTypes -->`;
