<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { page } from "$app/state";
  import { enhance } from "$app/forms";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import FilterPanel from "$lib/components/ui/FilterPanel.svelte";

  // Accept form prop from parent (runes mode)
  let { form } = $props();

  // Get metrics data from page store (used for defining filter sections)
  let metrics = $derived(page.data.metrics || []);
  let areas = $derived(page.data.areas || []);
  let years = $derived(page.data.years || []);

  // For enhanced client-side form example
  let clientFilteredResults = $state([]);
  let clientResultsCount = $state("Ready to filter");
  let clientFormSubmitted = $state(false);

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

  // Client-side helper function to filter data (used by enhanced example)
  function filterData(metric, areas, year) {
    let results = [];

    if (page.data.dataInFormatForLineChart) {
      // Start with all line chart data
      let filteredData = [...page.data.dataInFormatForLineChart];

      // Filter by metric if selected
      if (metric && metric !== "all") {
        // Check if metric is not 'all' or empty
        filteredData = filteredData.filter((item) => item.metric === metric);
      }

      // For each metric grouping
      filteredData.forEach((metricGroup) => {
        // Filter lines by selected areas or use all if none selected
        const areaLines =
          areas.length > 0
            ? metricGroup.lines.filter((line) => areas.includes(line.areaCode))
            : metricGroup.lines;

        // Filter by year if not "all"
        areaLines.forEach((line) => {
          const yearData =
            year === "all" || !year // Check if year is 'all' or empty
              ? line.data
              : line.data.filter((point) => point.x.toString() === year);

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

    return results;
  }

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Server Form Submission (Full Page Reload)",
      content: ServerFormExample,
    },
    {
      id: "2",
      heading: "2. Progressive Enhancement with use:enhance",
      content: EnhancedFormExample,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">Form Submission Examples</h5>
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

{#snippet ServerFormExample()}
  <div class="p-5 bg-white">
    <h3 class="text-xl font-bold mb-4">Server-side Form Submission</h3>
    <p class="mb-4">
      This example demonstrates a traditional form submission that sends data to
      the server (`+page.server.ts`) and causes a full page reload. The results
      are passed back via the `form` prop.
    </p>

    <form method="POST">
      <FilterPanel
        sectionsData={metricsFilterSections}
        resultsCount={form?.filterData?.count !== undefined
          ? `${form.filterData.count} results found`
          : "Select filters"}
        filterButtonText="Filter metrics"
        applyButtonText="Submit to server"
        ga4BaseEvent={{ event_name: "filter_data", type: "server_submit" }}
      />
    </form>

    <!-- Display results returned from the server via the form prop -->
    {#if form?.filterData?.results}
      <div class="mt-8 border-t pt-4">
        <div
          class="govuk-notification-banner govuk-notification-banner--success"
          role="region"
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
                <th class="px-4 py-2 border">Year</th>
                <th class="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {#each form.filterData.results.slice(0, 5) as result}
                <tr>
                  <td class="px-4 py-2 border">{result.metric}</td>
                  <td class="px-4 py-2 border">{result.area}</td>
                  <td class="px-4 py-2 border">{result.year}</td>
                  <td class="px-4 py-2 border">{result.value}</td>
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
    {:else if form?.filterData?.count === 0}
      <div class="mt-8 border-t pt-4">
        <p class="italic">
          No results match your filter criteria (processed by server).
        </p>
      </div>
    {/if}
  </div>

  <CodeBlock
    code={`<!-- Server form example -->
<form method="POST">
  <FilterPanel
    sectionsData={filterSections}
    resultsCount={form?.filterData?.count !== undefined ? \`\\\${form.filterData.count} results found\` : "Select filters"}
    filterButtonText="Filter metrics"
    applyButtonText="Submit to server"
    ga4BaseEvent={{ event_name: "filter_submit", type: "server" }}
  />
</form>

<!-- Results displayed using \`form\` prop -->
{#if form?.filterData?.results}\n  <!-- ... results table ... -->\n{/if}\n

<!-- In +page.server.ts -->
export const actions = {\n  default: async ({ request }) => {\n    const formData = await request.formData();\n    \n    // Extract form data\n    const metric = formData.get('metric');\n    const areas = formData.getAll('areas[]');\n    const year = formData.get('year');\n    \n    // Process filters on the server (e.g. database query)\n    // const serverResults = await db.query(...)\n    \n    // Return the form data and results\n    return {\n      filterData: { // IMPORTANT: Wrap results in a key\n        metric,\n        \'areas[]\': areas,\n        year,\n        results: serverResults,\n        count: serverResults.length\n      }\n    };\n  }\n};`}
    language="svelte"
  ></CodeBlock>
{/snippet}

{#snippet EnhancedFormExample()}
  <div class="p-5 bg-white">
    <h3 class="text-xl font-bold mb-4">
      Progressive Enhancement with use:enhance
    </h3>
    <p class="mb-4">
      This example demonstrates progressive enhancement with <code
        >use:enhance</code
      > - it works without JavaScript (falling back to the server action above),
      but when JavaScript is available, it provides a better user experience by processing
      client-side without page reloads.
    </p>

    <form
      method="POST"
      use:enhance={({ formData, cancel }) => {
        // Get filter values
        const selectedMetric = formData.get("metric") || null;
        const selectedAreas = Array.from(formData.getAll("areas[]"));
        const selectedYear = formData.get("year");

        // Process client-side (prevents server submission)
        cancel();

        // Filter data client-side using helper function
        const results = filterData(selectedMetric, selectedAreas, selectedYear);

        // Update client state
        clientFilteredResults = results;
        clientResultsCount = `${results.length} results found`;
        clientFormSubmitted = true;

        // Return nothing - no server update needed
        return;
      }}
    >
      <FilterPanel
        sectionsData={metricsFilterSections}
        resultsCount={clientResultsCount}
        filterButtonText="Filter metrics"
        applyButtonText="Apply with enhancement"
        ga4BaseEvent={{ event_name: "filter_data", type: "enhanced" }}
      />

      {#if clientFormSubmitted && clientFilteredResults.length > 0}
        <div class="mt-8 border-t pt-4">
          <div
            class="govuk-notification-banner govuk-notification-banner--success"
            role="alert"
            aria-labelledby="enhance-success"
          >
            <h2 class="govuk-notification-banner__title" id="enhance-success">
              Enhanced Form Processing (Client-side)
            </h2>
            <div class="govuk-notification-banner__content">
              <p>
                Client-side processing completed with {clientFilteredResults.length}
                results.
              </p>
              <p class="italic text-sm mt-2">
                (With JavaScript disabled, this would have been processed by the
                server instead.)
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
                  <th class="px-4 py-2 border">Data Points</th>
                </tr>
              </thead>
              <tbody>
                {#each clientFilteredResults.slice(0, 5) as result}
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
                {#if clientFilteredResults.length > 5}
                  <tr>
                    <td colspan="4" class="px-4 py-2 border text-center italic">
                      ...and {clientFilteredResults.length - 5} more results
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        </div>
      {:else if clientFormSubmitted}
        <div class="mt-8 border-t pt-4">
          <p class="italic">
            No results match your filter criteria (processed client-side).
          </p>
        </div>
      {/if}
    </form>
  </div>

  <CodeBlock
    code={`<script>\n  import { enhance } from "$app/forms";\n  import { page } from "$app/state";\n  import FilterPanel from "$lib/components/ui/FilterPanel.svelte";\n  \n  // For tracking filtered results client-side\n  let clientResults = $state([]);\n  let resultsCount = $state("Ready to filter");\n  \n  // Filter helper function (client-side implementation)\n  function filterData(metric, areas, year) {\n    // Filter logic here using available page.data...\n    return results;\n  }\n</script>\n\n<form\n  method="POST"\n  use:enhance={({ formData, cancel }) => {\n    // Get filter values\n    const metric = formData.get("metric");\n    const areas = formData.getAll("areas[]"); \n    const year = formData.get("year");\n    \n    // Cancel server submission and process client-side\n    cancel();\n    \n    // Filter data\n    const results = filterData(metric, areas, year);\n    \n    // Update state variables\n    clientResults = results;\n    resultsCount = \`\\\${results.length} results found\`;\n    \n    // No server action needed\n    return;\n  }}\n>\n  <FilterPanel\n    sectionsData={filterSections}\n    resultsCount={resultsCount} // Use client-side count\n    filterButtonText="Filter metrics"\n    applyButtonText="Apply with enhancement"\n    ga4BaseEvent={{ event_name: "filter_data", type: "enhanced" }}\n  />\n  \n  <!-- Display clientResults -->\n  {#if clientResults.length > 0}\n     <!-- ... results table ... -->\n  {/if}\n</form>\n\n<!-- In +page.server.ts (handles non-JS fallback) -->\nexport const actions = {\n  default: async ({ request }) => {\n    const formData = await request.formData();\n    // Process server-side when JavaScript is disabled\n    // ...\n    return { filterData: { /* results */ } }; // Remember to wrap!\n  }\n};`}
    language="svelte"
  ></CodeBlock>
{/snippet}
