<script lang="ts">
  // Props
  let {
    sections = [],
    hideAllSections = 'Hide all sections',
    hideSection = 'Hide',
    hideSectionAriaLabel = 'Hide this section',
    showAllSections = 'Show all sections',
    showSection = 'Show',
    showSectionAriaLabel = 'Show this section'
  }: {
    sections: {
      heading: string;
      summary?: string;
      content: string;
      id: string;
      expanded?: boolean;
    }[];
    hideAllSections?: string;
    hideSection?: string;
    hideSectionAriaLabel?: string;
    showAllSections?: string;
    showSection?: string;
    showSectionAriaLabel?: string;
  } = $props();

  // State and derived stores
  let expandedSections = $state(new Set<string>());
  let allExpanded = $derived(expandedSections.size === sections.length);

  // Event handlers

  function toggleSection(id: string) {
    // Create a new reference to trigger Svelte 5 reactivity
    const updatedExpandedSections = new Set(expandedSections);
    if (updatedExpandedSections.has(id)) {
      updatedExpandedSections.delete(id);
    } else {
      updatedExpandedSections.add(id);
    }
    // Reassign so Svelte treats this as a new value
    expandedSections = updatedExpandedSections;
  }

  function toggleAll() {
    // Create a new reference to trigger Svelte 5 reactivity
    const updatedExpandedSections = new Set(expandedSections);
    if (allExpanded) {
      updatedExpandedSections.clear();
    } else {
      sections.forEach(section => updatedExpandedSections.add(section.id));
    }
    // Reassign so Svelte treats this as a new value
    expandedSections = updatedExpandedSections;
  }

  // Browser storage
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(() => {
    if (browser) {
      // Initialise expanded sections from props first
      const updatedExpandedSections = new Set(expandedSections);
      sections.forEach((section) => {
        if (section.expanded) {
          updatedExpandedSections.add(section.id);
        } else {
          // Fall back to sessionStorage only if expanded is not specified
          try {
            const stored = sessionStorage.getItem(section.id);
            if (stored === 'true') {
              updatedExpandedSections.add(section.id);
            }
          } catch (e) {
            // Handle storage errors gracefully
          }
        }
      });
      expandedSections = updatedExpandedSections; // trigger reactivity
    }
  });

  // Effect to update sessionStorage when sections change
  $effect(() => {
    if (browser) {
      sections.forEach((section) => {
        try {
          sessionStorage.setItem(
            section.id,
            expandedSections.has(section.id).toString()
          );
        } catch (e) {
          // Handle storage errors gracefully
        }
      });
    }
  });
</script>

<div
  class="govuk-accordion"
  data-module="govuk-accordion"
  id="accordion-default"
>
  <div class="govuk-accordion__controls">
    <button
      type="button"
      class="govuk-accordion__show-all"
      aria-expanded={allExpanded}
      onclick={toggleAll}
    >
      <span class="govuk-accordion__show-all-text">
        {allExpanded ? hideAllSections : showAllSections}
      </span>
      <span
        class="govuk-accordion-nav__chevron"
        class:govuk-accordion-nav__chevron--down={!allExpanded}
      ></span>
    </button>
  </div>

  {#each sections as section}
    {@const isExpanded = expandedSections.has(section.id)}
    <div
      class="govuk-accordion__section"
      class:govuk-accordion__section--expanded={isExpanded}
    >
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <button
            type="button"
            aria-controls="{section.id}-content"
            class="govuk-accordion__section-button"
            aria-expanded={isExpanded}
            onclick={() => toggleSection(section.id)}
            aria-label="{section.heading}, {isExpanded
              ? hideSectionAriaLabel
              : showSectionAriaLabel}"
          >
            <span class="govuk-accordion__section-heading-text">
              <span class="govuk-accordion__section-heading-text-focus"
                >{section.heading}</span
              >
            </span>

            {#if section.summary}
              <span
                class="govuk-visually-hidden govuk-accordion__section-heading-divider"
                >,
              </span>
              <span class="govuk-accordion__section-summary govuk-body">
                <span class="govuk-accordion__section-summary-focus"
                  >{section.summary}</span
                >
              </span>
            {/if}

            <span class="govuk-accordion__section-toggle" data-nosnippet>
              <span class="govuk-accordion__section-toggle-focus">
                <span
                  class="govuk-accordion-nav__chevron"
                  class:govuk-accordion-nav__chevron--down={!isExpanded}
                ></span>
                <span class="govuk-accordion__section-toggle-text">
                  {isExpanded ? hideSection : showSection}
                </span>
              </span>
            </span>
          </button>
        </h2>
      </div>
      <div
        id="{section.id}-content"
        class="govuk-accordion__section-content"
        aria-labelledby="{section.id}-heading"
        hidden={!isExpanded}
      >
        <p class="govuk-body">{section.content}</p>
      </div>
    </div>
  {/each}
</div>
