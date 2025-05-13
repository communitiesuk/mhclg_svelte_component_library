// Server form example
export const serverFormExampleCode = `
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  import { page } from '$app/state';
  
  // Accept form prop from parent (server form submission response)
  let { form } = $props();
  
  // Sample filter sections (typically derived from your data)
  const filterSections = [
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "metric-select",
          name: "metric",
          label: "Select metric",
          options: [
            { value: "", label: "All metrics", disabled: false },
            { value: "metric1", label: "Metric 1" },
            { value: "metric2", label: "Metric 2" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Areas",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select areas",
      options: [
        { value: "area1", label: "Area 1" },
        { value: "area2", label: "Area 2" },
        { value: "area3", label: "Area 3" }
      ]
    },
    {
      id: "years",
      type: "radios",
      title: "Years",
      ga4Section: "years_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "year",
      legend: "Select year",
      options: [
        { value: "all", label: "All years" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" }
      ],
      selectedValue: "all"
    }
  ];
</script>

<!-- Server form example -->
<form method="POST">
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={form?.filterData?.count !== undefined ? \`\${form.filterData.count} results found\` : "Select filters"}
    filterButtonText="Filter metrics"
    applyButtonText="Submit to server"
    ga4BaseEvent={{ event_name: "filter_submit", type: "server" }}
  />
</form>

<!-- Results displayed using \`form\` prop -->
{#if form?.filterData?.results}
  <!-- Results table -->
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Area</th>
        <th>Year</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {#each form.filterData.results as result}
        <tr>
          <td>{result.metric}</td>
          <td>{result.area}</td>
          <td>{result.year}</td>
          <td>{result.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<!-- In +page.server.js -->
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    
    // Extract form data
    const metric = formData.get('metric');
    const areas = formData.getAll('areas[]');
    const year = formData.get('year');
    
    // Process filters on the server (e.g. database query)
    // const serverResults = await db.query(...);
    const serverResults = [
      { metric: "metric1", area: "area1", year: "2023", value: 123 },
      // More results...
    ];
    
    // Return the form data and results
    return {
      filterData: { // IMPORTANT: Wrap results in a key
        metric,
        'areas[]': areas,
        year,
        results: serverResults,
        count: serverResults.length
      }
    };
  }
};
`;

// Enhanced form example with client-side processing
export const enhancedFormExampleCode = `
<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // For tracking filtered results client-side
  let clientResults = $state([]);
  let resultsCount = $state("Ready to filter");
  let clientFormSubmitted = $state(false);
  
  // Sample filter sections (typically derived from your data)
  const filterSections = [
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "metric-select",
          name: "metric",
          label: "Select metric",
          options: [
            { value: "", label: "All metrics", disabled: false },
            { value: "metric1", label: "Metric 1" },
            { value: "metric2", label: "Metric 2" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Areas",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select areas",
      options: [
        { value: "area1", label: "Area 1" },
        { value: "area2", label: "Area 2" },
        { value: "area3", label: "Area 3" }
      ]
    },
    {
      id: "years",
      type: "radios",
      title: "Years",
      ga4Section: "years_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "year",
      legend: "Select year",
      options: [
        { value: "all", label: "All years" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" }
      ],
      selectedValue: "all"
    }
  ];
  
  // Filter helper function (client-side implementation)
  function filterData(metric, areas, year) {
    // Sample data for demonstration
    const allData = [
      { metric: "metric1", area: "area1", year: "2023", value: 123 },
      { metric: "metric1", area: "area2", year: "2023", value: 456 },
      { metric: "metric2", area: "area1", year: "2022", value: 789 },
      { metric: "metric2", area: "area3", year: "2022", value: 321 }
    ];
    
    // Filter logic
    return allData.filter(item => {
      // Filter by metric if specified
      if (metric && metric !== "") {
        if (item.metric !== metric) return false;
      }
      
      // Filter by areas if any selected
      if (areas && areas.length > 0) {
        if (!areas.includes(item.area)) return false;
      }
      
      // Filter by year if not "all"
      if (year && year !== "all") {
        if (item.year !== year) return false;
      }
      
      return true;
    });
  }
</script>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // Get filter values
    const metric = formData.get("metric");
    const areas = formData.getAll("areas[]"); 
    const year = formData.get("year");
    
    // Cancel server submission and process client-side
    cancel();
    
    // Filter data
    const results = filterData(metric, areas, year);
    
    // Update state variables
    clientResults = results;
    resultsCount = \`\${results.length} results found\`;
    clientFormSubmitted = true;
    
    // No server action needed
    return;
  }}
>
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={resultsCount} // Use client-side count
    filterButtonText="Filter metrics"
    applyButtonText="Apply with enhancement"
    ga4BaseEvent={{ event_name: "filter_data", type: "enhanced" }}
  />
  
  <!-- Display clientResults -->
  {#if clientFormSubmitted && clientResults.length > 0}
    <div class="mt-8 border-t pt-4">
      <div class="success-banner" role="alert">
        <h2>Enhanced Form Processing (Client-side)</h2>
        <div>
          <p>Client-side processing completed with {clientResults.length} results.</p>
          <p class="italic text-sm">
            (With JavaScript disabled, this would have been processed by the server instead.)
          </p>
        </div>
      </div>
      
      <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
      <table class="min-w-full bg-white border">
        <thead>
          <tr class="bg-gray-100">
            <th>Metric</th>
            <th>Area</th>
            <th>Years</th>
            <th>Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each clientResults as result}
            <tr>
              <td>{result.metric}</td>
              <td>{result.areaName}</td>
              <td>{result.data.map((d) => d.x).join(", ")}</td>
              <td>{result.data.map((d) => d.y).join(", ")}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else if clientFormSubmitted}
    <div class="mt-8 border-t pt-4">
      <p class="italic">No results match your filter criteria (processed client-side).</p>
    </div>
  {/if}
</form>

<!-- In +page.server.js (handles non-JS fallback) -->
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    // Process server-side when JavaScript is disabled
    // ...
    return { filterData: { /* results */ } }; // Remember to wrap!
  }
};
`;

// Basic Filter Panel Example
export const basicExampleCode = `
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // Define filter sections
  const basicFilterSections = [
    {
      id: "categories",
      type: "checkboxes",
      title: "Categories",
      ga4Section: "categories_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 2,
      name: "categories[]",
      legend: "Select categories",
      options: [
        { value: "food", label: "Food & Drink" },
        { value: "travel", label: "Travel" },
        { value: "tech", label: "Technology" }
      ]
    },
    {
      id: "rating",
      type: "radios",
      title: "Rating",
      ga4Section: "rating_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 2,
      name: "rating",
      legend: "Select minimum rating",
      options: [
        { value: "any", label: "Any rating" },
        { value: "3", label: "3 stars & above" },
        { value: "4", label: "4 stars & above" },
        { value: "5", label: "5 stars only" }
      ],
      selectedValue: "any"
    }
  ];
  
  // Track results count
  let resultsCountText = $state("Select filters to begin");
</script>

<FilterPanel
  sectionsData={basicFilterSections}
  resultsCount={resultsCountText}
  filterButtonText="Show filters"
  applyButtonText="Apply filters"
  ga4BaseEvent={{ event_name: "filter_items", type: "basic" }}
/>
`;

// Example with select and date picker
export const advancedExampleCode = `
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  
  // Define more complex filter sections including select and date range
  const advancedFilterSections = [
    {
      id: "location",
      type: "select",
      title: "Location",
      ga4Section: "location_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [
        {
          id: "region-select",
          name: "region",
          label: "Select region",
          options: [
            { value: "", label: "All regions", disabled: false },
            { value: "north", label: "North" },
            { value: "south", label: "South" },
            { value: "east", label: "East" },
            { value: "west", label: "West" }
          ],
          fullWidth: true
        },
        {
          id: "city-select",
          name: "city",
          label: "Select city (optional)",
          options: [
            { value: "", label: "All cities", disabled: false },
            { value: "london", label: "London" },
            { value: "manchester", label: "Manchester" },
            { value: "birmingham", label: "Birmingham" },
            { value: "leeds", label: "Leeds" }
          ],
          fullWidth: true
        }
      ]
    },
    {
      id: "price",
      type: "radios",
      title: "Price Range",
      ga4Section: "price_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "price",
      legend: "Select price range",
      options: [
        { value: "any", label: "Any price" },
        { value: "low", label: "£ (Budget)" },
        { value: "medium", label: "££ (Mid-range)" },
        { value: "high", label: "£££ (Premium)" }
      ],
      selectedValue: "any"
    },
    {
      id: "features",
      type: "checkboxes",
      title: "Features",
      ga4Section: "features_filter",
      ga4IndexSection: 3,
      ga4IndexSectionCount: 3,
      name: "features[]",
      legend: "Select desired features",
      options: [
        { value: "wifi", label: "Free Wi-Fi" },
        { value: "parking", label: "Parking" },
        { value: "accessible", label: "Wheelchair accessible" },
        { value: "pets", label: "Pet friendly" }
      ]
    }
  ];
</script>

<FilterPanel
  sectionsData={advancedFilterSections}
  resultsCount="56 results found"
  filterButtonText="View filters"
  applyButtonText="Update results"
  ga4BaseEvent={{ event_name: "filter_listings", type: "advanced" }}
/>
`;
