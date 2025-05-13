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
{#if form?.filterData?.results && form.filterData.results.length > 0}
  <div class="mt-8 border-t pt-4">
    <div
      class="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="form-success"
    >
      <h2 class="govuk-notification-banner__title" id="form-success">
        Form submitted to server
      </h2>
      <div class="govuk-notification-banner__content">
        <p>
          The server processed your request and found {form.filterData
            .count} results.
        </p>
        <p class="mt-2 text-sm italic">
          Selected Filters: Metric: {form.filterData.metric || "Any"},
          Areas: {form.filterData["areas[]"]?.length > 0
            ? form.filterData["areas[]"].join(", ")
            : "Any"}, Year: {form.filterData.year || "Any"}
        </p>
      </div>
    </div>

    <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each form.filterData.results.slice(0, 5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.x).join(", ")}</td
              >
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.y).join(", ")}</td
              >
            </tr>
          {/each}
          {#if form.filterData.results.length > 5}
            <tr>
              <td colspan="4" class="px-4 py-2 border text-center italic">
                ...and {form.filterData.results.length - 5} more results
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
{:else if form?.filterData?.count === 0 && form?.filterData?.results !== undefined}
  <div class="mt-8 border-t pt-4">
    <p class="italic">
      No results match your filter criteria (processed by server).
    </p>
  </div>
{/if}

<!-- In +page.server.js -->
// Example implementation (should read and filter actual data)
/*
import { fail } from '@sveltejs/kit';
import { read } from '$app/server'; // Import the read function

// Define types for filtered results (mirroring the client-side definition)
interface FilteredResult {
	metric: string;
	areaCode: string;
	areaName: string;
	data: { x: string | number; y: string | number }[];
}


export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const metric = formData.get("metric")?.toString() || null;
    const areas = Array.from(formData.getAll("areas[]")).map(value => value.toString());
    const year = formData.get("year")?.toString() || "all";

		// --- Server-side Data Loading and Transformation ---
		// Read the testData.json file
		let testData;
		try {
			const dataContent = await read('static/data/testData.json');
			testData = JSON.parse(dataContent.toString());
		} catch (e) {
			console.error("Failed to read testData.json:", e);
			return fail(500, { message: "Failed to load data." });
		}

		// Replicate data transformation to get dataInFormatForLineChart
		const metrics = [...new Set(testData.flatMetricData.map(d => d.metric))];
		const areaCodes = [...new Set(testData.flatMetricData.map(el => el.areaCode))];

		let dataInFormatForLineChart = metrics.map(m => ({
			metric: m,
			lines: areaCodes.map(a => ({
				areaCode: a,
				data: testData.flatMetricData.filter(el => el.areaCode === a && el.metric === m),
			})),
		}));
		// --- End Data Loading and Transformation ---


		// --- Replicate Client-side Filtering Logic ---
		let results: FilteredResult[] = [];

		if (dataInFormatForLineChart) {
			// Start with all line chart data
			let filteredData = [...dataInFormatForLineChart];

			// Filter by metric if selected
			if (metric && metric !== "all") { // Check if metric is not 'all' or empty
				filteredData = filteredData.filter(item => item.metric === metric);
			}

			// For each metric grouping
			filteredData.forEach(metricGroup => {
				// Filter lines by selected areas or use all if none selected
				const areaLines = areas.length > 0
					? metricGroup.lines.filter(line => areas.includes(line.areaCode))
					: metricGroup.lines;

				// Filter by year if not "all"
				areaLines.forEach(line => {
					const yearData = year === "all" || !year // Check if year is 'all' or empty
						? line.data
						: line.data.filter(point => point.x.toString() === year);

					if (yearData.length > 0) {
						results.push({
							metric: metricGroup.metric,
							areaCode: line.areaCode,
							areaName: testData.areaCodeLookup?.[line.areaCode] || line.areaCode,
							data: yearData,
						});
					}
				});
			});
		}
		// --- End Filtering Logic ---


    return {
      filterData: {
        metric,
        'areas[]': areas,
        year,
        results,
        count: results.length
      }
    };
  }
};
*/
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
    // Sample data for demonstration - IN A REAL APP, THIS WOULD COME FROM A SHARED SOURCE OR PAGE DATA
    const allData = [
      { metric: "metric1", areaCode: "area1", areaName: "Area One", data: [{x: "2023", y: 123}, {x: "2022", y: 100}] },
      { metric: "metric1", areaCode: "area2", areaName: "Area Two", data: [{x: "2023", y: 456}] },
      { metric: "metric2", areaCode: "area1", areaName: "Area One", data: [{x: "2022", y: 789}] },
      { metric: "metric2", areaCode: "area3", areaName: "Area Three", data: [{x: "2022", y: 321}, {x:"2021", y:300}] }
    ];
    
    let results = [];

		if (allData) { // Assuming allData is structured like dataInFormatForLineChart
			let filteredDataSource = [...allData]; // Use a more descriptive name

			// Filter by metric if selected
			if (metric && metric !== "all" && metric !== "") {
				filteredDataSource = filteredDataSource.filter(item => item.metric === metric);
			}

			// For each item in the (potentially metric-filtered) data source
			filteredDataSource.forEach(item => {
				let itemMatchesArea = true;
				if (areas && areas.length > 0) {
					if (!areas.includes(item.areaCode)) {
						itemMatchesArea = false;
					}
				}

				if (itemMatchesArea) {
					const yearDataPoints = (year && year !== "all" && year !== "")
						? item.data.filter(point => point.x.toString() === year)
						: item.data;

					if (yearDataPoints.length > 0) {
						results.push({
							metric: item.metric,
							areaCode: item.areaCode,
							areaName: item.areaName,
							data: yearDataPoints,
						});
					}
				}
			});
		}
		return results;
  }
</script>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    // Get filter values
    const metric = formData.get("metric")?.toString() || null; // Ensure toString for safety
    const areas = Array.from(formData.getAll("areas[]")).map(value => value.toString()); 
    const year = formData.get("year")?.toString() || "all"; // Ensure toString
    
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
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each clientResults.slice(0,5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border">{result.data.map((d) => d.x).join(", ")}</td>
              <td class="px-4 py-2 border">{result.data.map((d) => d.y).join(", ")}</td>
            </tr>
          {/each}
          {#if clientResults.length > 5}
             <tr><td colspan="4" class="text-center italic p-2 border">...and {clientResults.length - 5} more results</td></tr>
          {/if}
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
/*
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    // Process server-side when JavaScript is disabled
    // ... (this should mirror the logic in the client-side filterData and server-side data loading)
    return { filterData: { // results } }; // Remember to wrap!
  }
};
*/
`;

// Server form example WITH BASIC use:enhance (no custom callback)
export const serverFormWithBasicEnhanceCode = `
<script>
  import FilterPanel from '$lib/components/ui/FilterPanel.svelte';
  import { page } from '$app/state';
  import { enhance } from "$app/forms"; // Added for use:enhance

  // Accept form prop from parent (server form submission response)
  let { form } = $props();

  // Sample filter sections (typically derived from your data)
  // This would usually come from a load function or be defined based on page.data
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

<!-- Server form example with basic use:enhance -->
<form method="POST" use:enhance> {/* use:enhance added here */}
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={form?.filterData?.count !== undefined ? \`\${form.filterData.count} results found\` : "Select filters"}
    filterButtonText="Filter metrics"
    applyButtonText="Submit (Enhanced)"
    ga4BaseEvent={{ event_name: "filter_submit", type: "server_enhanced" }}
  />
</form>

<!-- Results displayed using \`form\` prop (updated by SvelteKit automatically) -->
{#if form?.filterData?.results && form.filterData.results.length > 0}
  <div class="mt-8 border-t pt-4">
    <div
      class="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="form-success-enhanced"
    >
      <h2 class="govuk-notification-banner__title" id="form-success-enhanced">
        Form submitted (Enhanced by SvelteKit)
      </h2>
      <div class="govuk-notification-banner__content">
        <p>
          The server processed your request and found {form.filterData.count} results.
          (Submitted without full page reload thanks to use:enhance)
        </p>
        <p class="mt-2 text-sm italic">
          Selected Filters: Metric: {form.filterData.metric || "Any"},
          Areas: {form.filterData["areas[]"]?.length > 0
            ? form.filterData["areas[]"].join(", ")
            : "Any"}, Year: {form.filterData.year || "Any"}
        </p>
      </div>
    </div>

    <h4 class="text-lg font-semibold mb-2 mt-4">Results:</h4>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Metric</th>
            <th class="px-4 py-2 border">Area</th>
            <th class="px-4 py-2 border">Years</th>
            <th class="px-4 py-2 border">Data Points</th>
          </tr>
        </thead>
        <tbody>
          {#each form.filterData.results.slice(0, 5) as result}
            <tr>
              <td class="px-4 py-2 border">{result.metric}</td>
              <td class="px-4 py-2 border">{result.areaName}</td>
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.x).join(", ")}</td
              >
              <td class="px-4 py-2 border"
                >{result.data.map((d) => d.y).join(", ")}</td
              >
            </tr>
          {/each}
          {#if form.filterData.results.length > 5}
            <tr>
              <td colspan="4" class="px-4 py-2 border text-center italic">
                ...and {form.filterData.results.length - 5} more results
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
{:else if form?.filterData?.count === 0 && form?.filterData?.results !== undefined}
  <div class="mt-8 border-t pt-4">
    <p class="italic">
      No results match your filter criteria (processed by server with enhancement).
    </p>
  </div>
{/if}

<!-- 
  In +page.server.js, the same action as the non-enhanced server form
  would handle this submission. SvelteKit's 'use:enhance' intercepts
  the form submission, sends it via fetch, and updates the 'form' prop
  with the action's return value.
-->
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
