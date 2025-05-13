<script lang="ts">
  import { AccordionItem, Accordion } from "flowbite-svelte";
  import { page } from "$app/state";
  import { enhance } from "$app/forms";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import {
    serverFormExampleCode,
    enhancedFormExampleCode,
    basicExampleCode,
    advancedExampleCode,
  } from "./codeBlocks.js";

  import FilterPanel from "$lib/components/ui/FilterPanel.svelte";

  // Accept form prop from parent (runes mode)
  let { form } = $props();

  // Define types for filtered results
  interface FilteredResult {
    metric: string;
    areaCode: string;
    areaName: string;
    data: { x: string | number; y: string | number }[];
  }

  // Get metrics data from page store (used for defining filter sections)
  let metrics = $derived(page.data.metrics || []);
  let areas = $derived(page.data.areas || []);
  let years = $derived(page.data.years || []);

  // For enhanced client-side form example
  let clientFilteredResults = $state<FilteredResult[]>([]);
  let clientResultsCount = $state("Ready to filter");
  let clientFormSubmitted = $state(false);

  // Basic filter sections for use in examples
  const basicFilterSections = [
    {
      id: "categories",
      type: "checkboxes" as "checkboxes",
      title: "Categories",
      ga4Section: "categories_filter",
      ga4IndexSection: 1,
      ga4IndexSectionCount: 2,
      name: "categories[]",
      legend: "Select categories",
      options: [
        { value: "food", label: "Food & Drink" },
        { value: "travel", label: "Travel" },
        { value: "tech", label: "Technology" },
      ],
    },
    {
      id: "rating",
      type: "radios" as "radios",
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
        { value: "5", label: "5 stars only" },
      ],
      selectedValue: "any",
    },
  ];

  // Advanced filter sections for use in examples
  const advancedFilterSections = [
    {
      id: "location",
      type: "select" as "select",
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
            { value: "west", label: "West" },
          ],
          fullWidth: true,
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
            { value: "leeds", label: "Leeds" },
          ],
          fullWidth: true,
        },
      ],
    },
    {
      id: "price",
      type: "radios" as "radios",
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
        { value: "high", label: "£££ (Premium)" },
      ],
      selectedValue: "any",
    },
    {
      id: "features",
      type: "checkboxes" as "checkboxes",
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
        { value: "pets", label: "Pet friendly" },
      ],
    },
  ];

  // Create filter sections based on metrics data
  let metricsFilterSections = $derived([
    {
      id: "metrics",
      type: "select" as "select",
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
      type: "checkboxes" as "checkboxes",
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
      type: "radios" as "radios",
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
  function filterData(
    metric: string | null,
    areas: string[],
    year: string,
  ): FilteredResult[] {
    let results: FilteredResult[] = [];

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
      heading: "1. Basic Filter Panel Example",
      content: BasicFilterExample,
    },
    {
      id: "2",
      heading: "2. Advanced Filter Panel with Multiple Select and Options",
      content: AdvancedFilterExample,
    },
    {
      id: "3",
      heading: "3. Server Form Submission (Full Page Reload)",
      content: ServerFormExample,
    },
    {
      id: "4",
      heading: "4. Progressive Enhancement with use:enhance",
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

{#snippet BasicFilterExample()}
  <div class="p-5 bg-white">
    <h3 class="text-xl font-bold mb-4">Basic Filter Panel</h3>
    <p class="mb-4">
      This example demonstrates a simple filter panel with checkboxes and radio
      buttons for category and rating filters.
    </p>

    <FilterPanel
      sectionsData={basicFilterSections}
      resultsCount={"26 results found"}
      filterButtonText="Show filters"
      applyButtonText="Apply filters"
      ga4BaseEvent={{ event_name: "filter_items", type: "basic" }}
    />
  </div>

  <CodeBlock code={basicExampleCode} language="svelte"></CodeBlock>
{/snippet}

{#snippet AdvancedFilterExample()}
  <div class="p-5 bg-white">
    <h3 class="text-xl font-bold mb-4">Advanced Filter Panel</h3>
    <p class="mb-4">
      This example demonstrates a more complex filter panel with select
      dropdowns, radio buttons, and checkboxes for location, price, and feature
      filters.
    </p>

    <FilterPanel
      sectionsData={advancedFilterSections}
      resultsCount="56 results found"
      filterButtonText="View filters"
      applyButtonText="Update results"
      ga4BaseEvent={{ event_name: "filter_listings", type: "advanced" }}
    />
  </div>

  <CodeBlock code={advancedExampleCode} language="svelte"></CodeBlock>
{/snippet}

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
    {#if form?.filterData?.results && form.filterData.results.length > 0}
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
  </div>

  <CodeBlock code={serverFormExampleCode} language="svelte"></CodeBlock>
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
        const selectedMetric = formData.get("metric")?.toString() || null;
        const selectedAreas = Array.from(formData.getAll("areas[]")).map(
          (value) => value.toString(),
        );
        const selectedYear = formData.get("year")?.toString() || "all";

        // Process client-side (prevents server submission)
        cancel();

        // Filter data
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
                  <th class="px-4 py-2 border">Years</th>
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

  <CodeBlock code={enhancedFormExampleCode} language="svelte"></CodeBlock>
{/snippet}
