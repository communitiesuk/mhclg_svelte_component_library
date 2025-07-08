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
  
  const usTypeLookup = {
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
  customTypeLookup={usTypeLookup}
  customEssGeocodes={["US1", "US2", "US3", "US4", "US5"]}
  label_text="Search US states and cities"
  placeholder="e.g. California, New York, Los Angeles"
  hint="Custom geographic data with hierarchical relationships"
  bind:selectedValue 
/>

<!-- Demonstrates hierarchical geographic data structure -->`;

export const regexTypeLabels = `<script>
  // Use regex patterns to classify area codes with unique, clear types
  const regexTypeLabels = (type) => {
    // Pattern matching for different area types
    if (/^E0[6-9]/.test(type)) return 'Local Authority';     // E06, E07, E08, E09
    if (/^E1[0-2]/.test(type)) return 'Regional Area';       // E10, E11, E12
    if (/^W0[1-6]/.test(type)) return 'Welsh Territory';     // W01-W06
    if (/^S1[0-5]/.test(type)) return 'Scottish Zone';       // S10-S15
    if (/^N0[1-9]/.test(type)) return 'Northern Ireland';    // N01-N09
    
    // Statistical areas with different patterns
    if (/^[EW]0[01]/.test(type)) return 'Small Statistical Area';   // E00, E01, W00, W01
    if (/^[EW]02/.test(type)) return 'Medium Statistical Area';     // E02, W02
    
    // Fallback for anything else
    return 'Other Area';
  };
</script>

<PostcodeOrAreaSearch 
  customGetTypeLabel={regexTypeLabels}
  label_text="Search with regex classification"
  hint="Area types determined by regex patterns instead of lookup tables"
  placeholder="e.g. Westminster, Birmingham, Cardiff"
  bind:selectedValue 
/>

<!-- Demonstrates regex-based type classification with distinct, clear categories -->`;

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
  // Custom type lookup based on specific geoTypes categories
  const customTypeLookup = {
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
  customTypeLookup={customTypeLookup}
  customEssGeocodes={customEssGeocodes}
  essOnly={true}
  label_text="Search authorities and statistical areas"
  hint="Filtered to cauth, utla, ltla, msoa, lsoa, and oa categories from geoTypes"
  bind:selectedValue 
/>

<!-- Demonstrates custom geographic type configuration based on geoTypes -->`;

export const limitedSuggestions = `<script>
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  
  let selectedValue = $state("");
</script>

<PostcodeOrAreaSearch 
  maxSuggestions={5}
  label_text="Search UK areas (max 5 suggestions)"
  hint="Only the first 5 matching areas will be shown"
  placeholder="e.g. Westminster, Birmingham"
  bind:selectedValue 
/>

{#if selectedValue}
  <p>Selected: {selectedValue}</p>
{/if}

<!-- Limits suggestions to 5 for better performance with large datasets -->`;

export const hierarchyData = `<script>
  import PostcodeOrAreaSearch from "$lib/components/ui/PostcodeOrAreaSearch.svelte";
  import hierarchyData from "$lib/data/geographic-hierarchy-flat.json";
  
  let selectedValue = $state("");
</script>

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
  bind:selectedValue 
/>

{#if selectedValue}
  <p>Selected: {selectedValue}</p>
  <p>Total areas available: {hierarchyData.data.length.toLocaleString()}</p>
{/if}

<!-- Uses the bundled geographic-hierarchy-flat.json data file with 277,565+ UK areas -->`;
