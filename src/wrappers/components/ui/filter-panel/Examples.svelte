<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { page } from "$app/state";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import FilterPanel from "$lib/components/ui/FilterPanel.svelte";

  // Get metrics data from page store
  let metrics = $derived(page.data.metrics || []);
  let areas = $derived(page.data.areas || []);
  let years = $derived(page.data.years || []);

  // For tracking filtered results
  let filteredResults = $state([]);
  let resultsCount = $state("0 results found");
  let formSubmitted = $state(false);

  // Create filter sections based on metrics data
  let metricsFilterSections = $derived([
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
            ...metrics.map((metric) => ({
              value: metric,
              label: metric,
            })),
          ],
          fullWidth: true,
        },
      ],
    },
    {
      id: "areas",
      type: "checkboxes",
      title: "Local Authorities",
      ga4Section: "areas_filter",
      ga4IndexSection: 2,
      ga4IndexSectionCount: 3,
      name: "areas[]",
      legend: "Select local authorities",
      options: areas.slice(0, 5).map((area) => ({
        value: area,
        label: page.data.areaCodeLookup?.[area] || area,
      })),
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
        ...years.map((year) => ({
          value: year.toString(),
          label: year.toString(),
        })),
      ],
      selectedValue: "all",
    },
  ]);

  // Handle form submission
  function handleFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Get filter values
    const selectedMetric = formData.get("metric") || null;
    const selectedAreas = formData.getAll("areas[]");
    const selectedYear = formData.get("year");

    // Filter the data
    let results = [];

    if (page.data.dataInFormatForLineChart) {
      // Start with all line chart data
      let filteredData = [...page.data.dataInFormatForLineChart];

      // Filter by metric if selected
      if (selectedMetric) {
        filteredData = filteredData.filter(
          (item) => item.metric === selectedMetric,
        );
      }

      // For each metric grouping
      filteredData.forEach((metricGroup) => {
        // Filter lines by selected areas or use all if none selected
        const areaLines =
          selectedAreas.length > 0
            ? metricGroup.lines.filter((line) =>
                selectedAreas.includes(line.areaCode),
              )
            : metricGroup.lines;

        // Filter by year if not "all"
        areaLines.forEach((line) => {
          const yearData =
            selectedYear === "all"
              ? line.data
              : line.data.filter(
                  (point) => point.x.toString() === selectedYear,
                );

          if (yearData.length > 0) {
            results.push({
              metric: metricGroup.metric,
              areaCode: line.areaCode,
              areaName:
                page.data.areaCodeLookup?.[line.areaCode] || line.areaCode,
              data: yearData,
            });
          }
        });
      });
    }

    // Update results state
    filteredResults = results;
    resultsCount = `${results.length} results found`;
    formSubmitted = true;
  }

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - describe the use case here",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Filtering Local Authority Metrics Data",
      content: LAMetricsExample,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
  >
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet Example1()}
  <div class="p-5 bg-white">
    <Template
      componentNameProp="Example 1"
      checkboxProp={true}
      dropdownProp="Dragonfruit"
      jsObjectProp={[
        {
          name: "Borussia Dortmund",
          country: "Germany",
          color: "#fdff7d",
        },
        { name: "Liverpool FC", country: "UK", color: "#f59fad" },
        {
          name: "SSC Napoli",
          country: "Italy",
          color: "#69bfff",
        },
        {
          name: "S.L. Benfica",
          country: "Portugal",
          color: "#ff8c96",
        },
      ]}
      functionProp={function () {
        window.alert(`Example 1 functionProp has been triggered.`);
      }}
    ></Template>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet LAMetricsExample()}
  <div class="p-5 bg-white">
    <h3 class="text-xl font-bold mb-4">Local Authority Metrics Filter</h3>
    <p class="mb-4">
      This example demonstrates using the FilterPanel to filter Local Authority
      metrics data:
    </p>

    <form method="POST" onsubmit={handleFilter}>
      <FilterPanel
        sectionsData={metricsFilterSections}
        {resultsCount}
        filterButtonText="Filter metrics"
        applyButtonText="Apply filters"
        ga4BaseEvent={{ event_name: "filter_data", type: "la_metrics" }}
      />

      {#if formSubmitted && filteredResults.length > 0}
        <div class="mt-8 border-t pt-4">
          <h4 class="text-lg font-semibold mb-2">Filtered Results:</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-2 border">Metric</th>
                  <th class="px-4 py-2 border">Area</th>
                  <th class="px-4 py-2 border">Data Points</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredResults.slice(0, 5) as result}
                  <tr>
                    <td class="px-4 py-2 border">{result.metric}</td>
                    <td class="px-4 py-2 border">{result.areaName}</td>
                    <td class="px-4 py-2 border">
                      {result.data.map((d) => `${d.x}: ${d.y}`).join(", ")}
                    </td>
                  </tr>
                {/each}
                {#if filteredResults.length > 5}
                  <tr>
                    <td colspan="3" class="px-4 py-2 border text-center italic">
                      ...and {filteredResults.length - 5} more results
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        </div>
      {:else if formSubmitted}
        <div class="mt-8 border-t pt-4">
          <p class="italic">No results match your filter criteria.</p>
        </div>
      {/if}
    </form>
  </div>

  <CodeBlock
    code={`<script>
  import { page } from "$app/state";
  import FilterPanel from "$lib/components/ui/FilterPanel.svelte";
  
  // Get metrics data from page store
  let metrics = $derived(page.data.metrics || []);
  let areas = $derived(page.data.areas || []);
  let years = $derived(page.data.years || []);
  
  // For tracking filtered results
  let filteredResults = $state([]);
  let resultsCount = $state('0 results found');
  
  // Create filter sections based on metrics data
  let metricsFilterSections = $derived([
    {
      id: "metrics",
      type: "select",
      title: "Metrics",
      ga4Section: "metrics_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 3,
      selects: [{
        id: "metric-select",
        name: "metric",
        label: "Select metric",
        options: [
          { value: "", label: "All metrics" },
          ...metrics.map(metric => ({ 
            value: metric, 
            label: metric 
          }))
        ],
        fullWidth: true,
      }]
    },
    // Additional filters for areas and years...
  ]);

  // Handle form submission
  function handleFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Get filter values
    const selectedMetric = formData.get('metric') || null;
    const selectedAreas = formData.getAll('areas[]');
    const selectedYear = formData.get('year');
    
    // Filter the data...
    filteredResults = results;
    resultsCount = \`\${results.length} results found\`;
  }
</script>

<form method="POST" onsubmit={handleFilter}>
  <FilterPanel 
    sectionsData={metricsFilterSections}
    resultsCount={resultsCount}
    filterButtonText="Filter metrics"
    applyButtonText="Apply filters"
    ga4BaseEvent={{ event_name: "filter_data", type: "la_metrics" }}
  />
  
  <!-- Display filtered results -->
</form>`}
    language="svelte"
  ></CodeBlock>

  <CodeBlock
    code={`// Server-side implementation in +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    
    // Extract filter parameters
    const metric = formData.get('metric');
    const selectedAreas = formData.getAll('areas[]');
    const year = formData.get('year');
    
    // Filter data (could be from a database query)
    const filteredData = await filterMetricsData(metric, selectedAreas, year);
    
    // Return filtered results
    return {
      success: true,
      count: filteredData.length,
      results: filteredData
    };
  },
};

// Example of how this could be used in a page with form:
// <form method="POST" action="?/filter">
//   <FilterPanel ... />
// </form>
`}
    language="javascript"
  ></CodeBlock>
{/snippet}
