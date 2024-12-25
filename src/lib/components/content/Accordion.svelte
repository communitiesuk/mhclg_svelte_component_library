<script lang="ts">
  import { onMount } from 'svelte';
  import { Accordion } from 'govuk-frontend/govuk/components/accordion/accordion';

  interface Heading {
    text?: string;
    html?: string;
  }

  interface Summary {
    text?: string; 
    html?: string;
  }

  interface Content {
    text?: string;
    html?: string;
  }

  interface Item {
    heading: Heading;
    summary?: Summary;
    content: Content;
    expanded?: boolean;
  }

  export let id = 'accordion-default';
  export let headingLevel = 2;
  export let classes = '';
  export let attributes = {};
  export let rememberExpanded = true;
  export let hideAllSectionsText = 'Hide all sections';
  export let hideSectionText = 'Hide';
  export let hideSectionAriaLabelText = 'Hide this section';
  export let showAllSectionsText = 'Show all sections';
  export let showSectionText = 'Show';
  export let showSectionAriaLabelText = 'Show this section';
  export let items: Item[] = [];

  const accordionAttributes = {
    class: `govuk-accordion${classes ? ` ${classes}` : ''}`,
    'data-module': 'govuk-accordion',
    id,
    ...(hideAllSectionsText && {
      'data-i18n.hide-all-sections': hideAllSectionsText,
    }),
    ...(hideSectionText && { 'data-i18n.hide-section': hideSectionText }),
    ...(hideSectionAriaLabelText && {
      'data-i18n.hide-section-aria-label': hideSectionAriaLabelText,
    }),
    ...(showAllSectionsText && {
      'data-i18n.show-all-sections': showAllSectionsText,
    }),
    ...(showSectionText && { 'data-i18n.show-section': showSectionText }),
    ...(showSectionAriaLabelText && {
      'data-i18n.show-section-aria-label': showSectionAriaLabelText,
    }),
    ...(rememberExpanded !== undefined && {
      'data-remember-expanded': rememberExpanded,
    }),
    ...attributes,
  };

  let module: HTMLElement;

  onMount(() => {
    new Accordion(module).init();
  });
</script>

<div {...accordionAttributes} bind:this={module}>
  {#each items as item, index}
    {#if item}
      <div
        class={`govuk-accordion__section${
          item.expanded ? ' govuk-accordion__section--expanded' : ''
        }`}
      >
        <div class="govuk-accordion__section-header">
          <svelte:element
            this={`h${headingLevel}`}
            class="govuk-accordion__section-heading"
          >
            <span
              class="govuk-accordion__section-button"
              id={`${id}-heading-${index + 1}`}
            >
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
