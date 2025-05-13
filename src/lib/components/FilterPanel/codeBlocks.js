export const serverFormExampleCode = `// ... see previous examples for FilterPanel setup ...

<script lang="ts">
	import FilterPanel from '$lib/components/FilterPanel/FilterPanel.svelte';
	import type { Section, FilteredResult } from '$lib/components/FilterPanel/types';
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { serverFormExampleCode } from '$lib/components/FilterPanel/codeBlocks.js'; // Assuming this file is aliased

	export let form: {
		data?: FilteredResult[];
		error?: string;
		message?: string;
	} | null = null;

	const sectionsData: Section[] = [
		{
			type: "checkboxes" as "checkboxes",
			title: "Select Metrics (Server)",
			name: "metrics",
			options: [
				{ label: "Household waste recycling rates", value: "Household waste recycling rates" },
				{ label: "Percentage of household waste sent to landfill", value: "Percentage of household waste sent to landfill" },
				{ label: "Total fly-tipping incidents", value: "Total fly-tipping incidents" },
			],
		},
		{
			type: "radio" as "radio",
			title: "Select Year (Server)",
			name: "year",
			options: [
				{ label: "2019/20", value: "2019/20" },
				{ label: "2020/21", value: "2020/21" },
				{ label: "2021/22", value: "2021/22" },
			],
		},
		{
			type: "select" as "select",
			title: "Select Area Type (Server)",
			name: "areaType",
			options: [
				{ label: "District", value: "District" },
				{ label: "Unitary Authority", value: "Unitary Authority" },
				{ label: "County Council", value: "County Council" },
				{ label: "Region", value: "Region" },
			],
		}
	];
</script>

<Accordion single>
	<div class="accordion-item py-4" data-title="Example 3: Server Form Submission">
		<p class="text-sm text-surface-500 mb-4">
			This example demonstrates a form that submits data to a server action.
			The filtering logic is handled on the server-side in <code>+page.server.ts</code>.
			The results are then returned and displayed.
		</p>
		<FilterPanel
			formClasses="p-4 border rounded-lg"
			fieldSetClasses="mb-4 p-2 border-t"
			legendClasses="text-lg font-semibold"
			showSubmitButton={true}
			submitButtonText="Filter on Server"
			target="?/serverFilter"
			{sectionsData}
			resultsHeaderText="Server Form Submission Results (Filtered in +page.server.ts)"
		>
			<svelte:fragment slot="results">
				{#if form?.data}
					<div class="mt-4 p-4 border rounded-lg bg-surface-100 dark:bg-surface-800">
						<h3 class="text-xl font-semibold mb-2">Results</h3>
						<p class="text-sm text-surface-600 dark:text-surface-300">
							Displaying {form.data.length} results. Filtered by the server.
						</p>
						<div class="overflow-x-auto mt-2">
							<table class="table table-compact w-full">
								<thead>
									<tr>
										<th>Metric</th>
										<th>Area</th>
										<th>Years (X)</th>
										<th>Values (Y)</th>
									</tr>
								</thead>
								<tbody>
									{#each form.data as result}
										<tr>
											<td>{result.metricName}</td>
											<td>{result.areaName}</td>
											<td>{result.data.map(d => d.x).join(', ')}</td>
											<td>{result.data.map(d => d.y).join(', ')}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{:else if form?.error}
					<div class="mt-4 p-4 border rounded-lg bg-error-100 dark:bg-error-800 text-error-700 dark:text-error-200">
						<h3 class="text-xl font-semibold mb-2">Error</h3>
						<p>{form.error}</p>
					</div>
				{:else if form?.message}
					 <div class="mt-4 p-4 border rounded-lg bg-warning-100 dark:bg-warning-800 text-warning-700 dark:text-warning-200">
						<h3 class="text-xl font-semibold mb-2">Info</h3>
						<p>{form.message}</p>
					</div>
				{/if}
			</svelte:fragment>
		</FilterPanel>
		<h4 class="text-lg font-semibold mt-6 mb-2">Code:</h4>
		<CodeBlock language="svelte" code={serverFormExampleCode} />
	</div>
</Accordion>
`;

export const enhancedFormExampleCode = `// ... see previous examples for FilterPanel setup ...

<script lang="ts">
	import FilterPanel from '$lib/components/FilterPanel/FilterPanel.svelte';
	import type { Section, FilterPanelData, FilteredResult } from '$lib/components/FilterPanel/types';
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { enhancedFormExampleCode } from '$lib/components/FilterPanel/codeBlocks.js';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	// Reactive state for results
	let clientFilteredResults: FilteredResult[] = $state([]);
	let formMessage: string | undefined = $state(undefined);
	let formError: string | undefined = $state(undefined);

	// Data for the line chart from +page.ts load function
	const allDataForChart: FilteredResult[] = $page.data.dataInFormatForLineChart || [];

	const sectionsData: Section[] = [
		// ... same sectionsData as client-side filtering example ...
		{
			type: "checkboxes" as "checkboxes",
			title: "Select Metrics (Client - Enhanced)",
			name: "metrics",
			options: [
				{ label: "Household waste recycling rates", value: "Household waste recycling rates" },
				{ label: "Percentage of household waste sent to landfill", value: "Percentage of household waste sent to landfill" },
				{ label: "Total fly-tipping incidents", value: "Total fly-tipping incidents" },
			],
		},
		{
			type: "radio" as "radio",
			title: "Select Year (Client - Enhanced)",
			name: "year",
			options: [
				{ label: "2019/20", value: "2019/20" },
				{ label: "2020/21", value: "2020/21" },
				{ label: "2021/22", value: "2021/22" },
			],
		},
		{
			type: "select" as "select",
			title: "Select Area Type (Client - Enhanced)",
			name: "areaType",
			options: [
				{ label: "District", value: "District" },
				{ label: "Unitary Authority", value: "Unitary Authority" },
				{ label: "County Council", value: "County Council" },
				{ label: "Region", value: "Region" },
			],
		}
	];

	function filterData(allChartData: FilteredResult[], formData: FilterPanelData): FilteredResult[] {
		const selectedMetrics = formData.metrics as string[] | string | undefined;
		const selectedYear = formData.year as string | undefined;
		const selectedAreaType = formData.areaType as string | undefined;

		let results = allChartData;

		if (selectedMetrics && selectedMetrics.length > 0) {
			const metricsArray = Array.isArray(selectedMetrics) ? selectedMetrics : [selectedMetrics];
			results = results.filter(item => metricsArray.includes(item.metricName));
		}

		if (selectedAreaType) {
			results = results.filter(item => item.areaType === selectedAreaType);
		}

		if (selectedYear) {
			results = results.map(metricEntry => {
				const filteredDataPoints = metricEntry.data.filter(dp => dp.x === selectedYear);
				return { ...metricEntry, data: filteredDataPoints };
			}).filter(metricEntry => metricEntry.data.length > 0);
		}
		return results;
	}
</script>

<Accordion single>
	<div class="accordion-item py-4" data-title="Example 4: Progressive Enhancement (Client-Side Filtering from Server Action)">
		<p class="text-sm text-surface-500 mb-4">
			This example uses <code>use:enhance</code> for progressive enhancement. The form submits to a server action
			(<code>?/enhancedFilter</code>), which currently just echoes back the form data.
			The client-side JavaScript then takes this echoed data and performs filtering using
			the same <code>allDataForChart</code> data source as the pure client-side example.
			This demonstrates handling server responses and updating the UI on the client.
		</p>
		<form
			method="POST"
			action="?/enhancedFilter"
			use:enhance={({ form, data, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					formMessage = undefined;
					formError = undefined;
					clientFilteredResults = [];

					if (result.type === 'success' && result.data?.formData) {
						const rawFormData = result.data.formData as Record<string, FormDataEntryValue>;
						const processedFormData: FilterPanelData = {};
						for (const key in rawFormData) {
							// Handling array values for checkboxes
							if (data.getAll(key).length > 1) {
								processedFormData[key] = data.getAll(key).map(val => val.toString());
							} else {
								processedFormData[key] = rawFormData[key]?.toString();
							}
						}
						clientFilteredResults = filterData(allDataForChart, processedFormData);
						if (clientFilteredResults.length === 0) {
							formMessage = "No results found for your selection (client-filtered).";
						}
					} else if (result.type === 'failure') {
						formError = result.data?.message || 'Filtering failed on the server.';
					} else if (result.type === 'error') {
						formError = result.error?.message || 'An unexpected error occurred.';
					}
				};
			}}
		>
			<FilterPanel
				formClasses="p-4 border rounded-lg"
				fieldSetClasses="mb-4 p-2 border-t"
				legendClasses="text-lg font-semibold"
				showSubmitButton={true}
				submitButtonText="Filter with Enhancement"
				{sectionsData}
				resultsHeaderText="Client-Filtered Results (from Enhanced Server Action)"
			>
				<svelte:fragment slot="results">
					{#if clientFilteredResults.length > 0}
						<div class="mt-4 p-4 border rounded-lg bg-surface-100 dark:bg-surface-800">
							<h3 class="text-xl font-semibold mb-2">Results</h3>
							<p class="text-sm text-surface-600 dark:text-surface-300">
								Displaying {clientFilteredResults.length} results. Filtered by client after server echo.
							</p>
							<div class="overflow-x-auto mt-2">
								<table class="table table-compact w-full">
									<thead>
										<tr>
											<th>Metric</th>
											<th>Area</th>
											<th>Years (X)</th>
											<th>Values (Y)</th>
										</tr>
									</thead>
									<tbody>
										{#each clientFilteredResults as result}
											<tr>
												<td>{result.metricName}</td>
												<td>{result.areaName}</td>
												<td>{result.data.map(d => d.x).join(', ')}</td>
												<td>{result.data.map(d => d.y).join(', ')}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{:else if formError}
						<div class="mt-4 p-4 border rounded-lg bg-error-100 dark:bg-error-800 text-error-700 dark:text-error-200">
							<h3 class="text-xl font-semibold mb-2">Error</h3>
							<p>{formError}</p>
						</div>
					{:else if formMessage}
						<div class="mt-4 p-4 border rounded-lg bg-warning-100 dark:bg-warning-800 text-warning-700 dark:text-warning-200">
							<h3 class="text-xl font-semibold mb-2">Info</h3>
							<p>{formMessage}</p>
						</div>
					{/if}
				</svelte:fragment>
			</FilterPanel>
		</form>
		<h4 class="text-lg font-semibold mt-6 mb-2">Code:</h4>
		<CodeBlock language="svelte" code={enhancedFormExampleCode} />
	</div>
</Accordion>
`;

export const serverFormWithBasicEnhanceExampleCode = `// Basic progressive enhancement with use:enhance
// This form submits to the same '/serverFilter' action as Example 3.
// SvelteKit will automatically handle the form submission via fetch,
// update the 'form' prop, and invalidate data if the action is successful.

<script lang="ts">
	import FilterPanel from '$lib/components/FilterPanel/FilterPanel.svelte';
	import type { Section, FilteredResult } from '$lib/components/FilterPanel/types';
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { serverFormWithBasicEnhanceExampleCode } from '$lib/components/FilterPanel/codeBlocks.js';
	import { enhance } from '$app/forms'; // Import enhance

	// 'form' prop will be populated by SvelteKit after action completes
	export let form: {
		data?: FilteredResult[];
		error?: string;
		message?: string;
	} | null = null;

	const sectionsData: Section[] = [
		{
			type: "checkboxes" as "checkboxes",
			title: "Select Metrics (Server - Basic Enhance)",
			name: "metrics",
			options: [
				{ label: "Household waste recycling rates", value: "Household waste recycling rates" },
				{ label: "Percentage of household waste sent to landfill", value: "Percentage of household waste sent to landfill" },
				{ label: "Total fly-tipping incidents", value: "Total fly-tipping incidents" },
			],
		},
		{
			type: "radio" as "radio",
			title: "Select Year (Server - Basic Enhance)",
			name: "year",
			options: [
				{ label: "2019/20", value: "2019/20" },
				{ label: "2020/21", value: "2020/21" },
				{ label: "2021/22", value: "2021/22" },
			],
		},
		{
			type: "select" as "select",
			title: "Select Area Type (Server - Basic Enhance)",
			name: "areaType",
			options: [
				{ label: "District", value: "District" },
				{ label: "Unitary Authority", value: "Unitary Authority" },
				{ label: "County Council", value: "County Council" },
				{ label: "Region", value: "Region" },
			],
		}
	];
</script>

<Accordion single>
	<div class="accordion-item py-4" data-title="Example 5: Server Form with Basic Progressive Enhancement">
		<p class="text-sm text-surface-500 mb-4">
			This example is identical to Example 3 (Server Form Submission) but adds <code>use:enhance</code>
			to the form tag. SvelteKit handles the form submission client-side by default,
			updating the <code>form</code> prop automatically upon completion of the server action.
			No custom client-side filtering or result handling is needed beyond what SvelteKit provides.
		</p>
		<form method="POST" action="?/serverFilter" use:enhance> {/* Added use:enhance here */}
			<FilterPanel
				formClasses="p-4 border rounded-lg"
				fieldSetClasses="mb-4 p-2 border-t"
				legendClasses="text-lg font-semibold"
				showSubmitButton={true}
				submitButtonText="Filter (Basic Enhance)"
				{sectionsData} /* No target needed as form action is used */
				resultsHeaderText="Server Form Results (via Basic Enhance)"
			>
				<svelte:fragment slot="results">
					{#if form?.data}
						<div class="mt-4 p-4 border rounded-lg bg-surface-100 dark:bg-surface-800">
							<h3 class="text-xl font-semibold mb-2">Results</h3>
							<p class="text-sm text-surface-600 dark:text-surface-300">
								Displaying {form.data.length} results. Filtered by server, handled by <code>use:enhance</code>.
							</p>
							<div class="overflow-x-auto mt-2">
								<table class="table table-compact w-full">
									<thead>
										<tr>
											<th>Metric</th>
											<th>Area</th>
											<th>Years (X)</th>
											<th>Values (Y)</th>
										</tr>
									</thead>
									<tbody>
										{#each form.data as result}
											<tr>
												<td>{result.metricName}</td>
												<td>{result.areaName}</td>
												<td>{result.data.map(d => d.x).join(', ')}</td>
												<td>{result.data.map(d => d.y).join(', ')}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{:else if form?.error}
						<div class="mt-4 p-4 border rounded-lg bg-error-100 dark:bg-error-800 text-error-700 dark:text-error-200">
							<h3 class="text-xl font-semibold mb-2">Error</h3>
							<p>{form.error}</p>
						</div>
					{:else if form?.message}
						 <div class="mt-4 p-4 border rounded-lg bg-warning-100 dark:bg-warning-800 text-warning-700 dark:text-warning-200">
							<h3 class="text-xl font-semibold mb-2">Info</h3>
							<p>{form.message}</p>
						</div>
					{/if}
				</svelte:fragment>
			</FilterPanel>
		</form>
		<h4 class="text-lg font-semibold mt-6 mb-2">Code:</h4>
		<CodeBlock language="svelte" code={serverFormWithBasicEnhanceExampleCode} />
	</div>
</Accordion>
`;
