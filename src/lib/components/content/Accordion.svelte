<script>
	import { onMount } from 'svelte';
	import Accordion from '../govuk-esm/components/accordion/accordion.mjs';
	/**
	 * @typedef Heading
	 * @type {object}
	 * @property {string=} text Required. The title of each section. If heading.html is supplied, this is ignored.
	 * @property {string=} html Required. The HTML content of the header for each section. Used as the title for each section. The header is inside the HTML <button> element, so you can only add phrasing content to it.
	 *
	 * @typedef Summary
	 * @type {object}
	 * @property {string=} text Text content for summary line. If summary.html is supplied, this is ignored.
	 * @property {string=} html The HTML content for the summary line. The summary line is inside the HTML <button> element, so you can only add phrasing content to it.
	 *
	 * @typedef Content
	 * @type {object}
	 * @property {string=} text Required. The text content of each section, which is hidden when the section is closed. If content.html is supplied, this is ignored.
	 * @property {string=} html Required. The HTML content of each section, which is hidden when the section is closed.
	 *
	 * @typedef Item
	 * @type {object}
	 * @property {Heading} heading
	 * @property {Summary=} summary
	 * @property {Content} content
	 * @property {boolean=} expanded Sets whether the section should be expanded when the page loads for the first time. Defaults to false.
	 */
	/** @type {string} */
	export let id = '';
	/** @type {number=} */
	export let headingLevel = 2;
	/** @type {string=} */
	export let classes = '';
	/** @type {object=} */
	export let attributes = {};
	/** @type {boolean=} */
	export let rememberExpanded = true;
	/** @type {string=} */
	export let hideAllSectionsText = 'Hide all sections';
	/** @type {string=} */
	export let hideSectionText = 'Hide';
	/** @type {string=} */
	export let hideSectionAriaLabelText = 'Hide this section';
	/** @type {string=} */
	export let showAllSectionsText = 'Show all sections';
	/** @type {string=} */
	export let showSectionText = 'Show';
	/** @type {string=} */
	export let showSectionAriaLabelText = 'Show this section';
	/** @type {Array<Item>} */
	export let items = [];

	const a = {
		class: `govuk-accordion${classes ? ` ${classes}` : ''}`,
		'data-module': 'govuk-accordion',
		id,
		...(hideAllSectionsText && { 'data-i18n.hide-all-sections': hideAllSectionsText }),
		...(hideSectionText && { 'data-i18n.hide-section': hideSectionText }),
		...(hideSectionAriaLabelText && {
			'data-i18n.hide-section-aria-label': hideSectionAriaLabelText
		}),
		...(showAllSectionsText && { 'data-i18n.show-all-sections': showAllSectionsText }),
		...(showSectionText && { 'data-i18n.show-section': showSectionText }),
		...(showSectionAriaLabelText && {
			'data-i18n.show-section-aria-label': showSectionAriaLabelText
		}),
		...(rememberExpanded !== undefined && { 'data-remember-expanded': rememberExpanded }),
		...attributes
	};

	/** @type {Element} */
	let module;
	onMount(() => new Accordion(module).init());
</script>

<div {...a} bind:this={module}>
	{#each items as item, index}
		{#if item}
			<div
				class={`govuk-accordion__section${
					item.expanded ? ' govuk-accordion__section--expanded' : ''
				}`}
			>
				<div class="govuk-accordion__section-header">
					<svelte:element this={`h${headingLevel}`} class="govuk-accordion__section-heading">
						<span class="govuk-accordion__section-button" id={`${id}-heading-${index + 1}`}>
							{#if item.heading.html}
								{@html item.heading.html}
							{:else}
								{item.heading.text}
							{/if}
						</span>
					</svelte:element>
					{#if item.summary?.html || item.summary?.text}
						<div
							class="govuk-accordion__section-summary govuk-body"
							id={`${id}-summary-${index + 1}`}
						>
							{#if item.summary.html}
								{@html item.summary.html}
							{:else}
								{item.summary.text}
							{/if}
						</div>
					{/if}
				</div>
				<div
					id={`${id}-content-${index + 1}`}
					class="govuk-accordion__section-content"
					aria-labelledby={`${id}-heading-${index + 1}`}
				>
					{#if item.content.html}
						{@html item.content.html}
					{:else if item.content.text}
						<p class="govuk-body">{item.content.text}</p>
					{/if}
				</div>
			</div>
		{/if}
	{/each}
</div>
