<script lang="ts">
  // Props
  export let sections: {
    heading: string;
    summary?: string; // new optional property
    content: string;
    id: string;
  }[] = [];

  export let hideAllSections: string = 'Hide all sections';
  export let hideSection: string = 'Hide';
  export let hideSectionAriaLabel: string = 'Hide this section';
  export let showAllSections: string = 'Show all sections';
  export let showSection: string = 'Show';
  export let showSectionAriaLabel: string = 'Show this section';

  // State
  let expandedSections = new Set<string>();
  $: allExpanded = expandedSections.size === sections.length;

  // Event handlers
  function toggleSection(id: string) {
    const newSet = new Set(expandedSections);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    expandedSections = newSet;
  }

  function toggleAll() {
    if (allExpanded) {
      expandedSections.clear();
    } else {
      expandedSections = new Set(sections.map(section => section.id));
    }
    expandedSections = expandedSections; // trigger reactivity
  }

  // Browser storage (optional)
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(() => {
    if (browser) {
      // Restore state from sessionStorage
      sections.forEach(section => {
        try {
          const stored = sessionStorage.getItem(section.id);
          if (stored === 'true') {
            expandedSections.add(section.id);
          }
        } catch (e) {
          // Handle storage errors gracefully
        }
      });
      expandedSections = expandedSections; // trigger reactivity
    }
  });

  // Update sessionStorage when sections change
  $: if (browser) {
    sections.forEach(section => {
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
</script>

<div class="govuk-accordion" data-module="govuk-accordion" id="accordion-default">
  <div class="govuk-accordion__controls">
    <button
      type="button"
      class="govuk-accordion__show-all"
      aria-expanded={allExpanded}
      on:click={toggleAll}
    >
      <span class="govuk-accordion__show-all-text">
        {allExpanded ? hideAllSections : showAllSections}
      </span>
      <span class="govuk-accordion-nav__chevron" class:govuk-accordion-nav__chevron--down={!allExpanded}></span>
    </button>
  </div>

  {#each sections as section}
    {@const isExpanded = expandedSections.has(section.id)}
    <div class="govuk-accordion__section" class:govuk-accordion__section--expanded={isExpanded}>
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <button
            type="button"
            aria-controls="{section.id}-content"
            class="govuk-accordion__section-button"
            aria-expanded={isExpanded}
            on:click={() => toggleSection(section.id)}
            aria-label="{section.heading}, {isExpanded ? hideSectionAriaLabel : showSectionAriaLabel}"
          >
            <span class="govuk-accordion__section-heading-text">
              <span class="govuk-accordion__section-heading-text-focus">{section.heading}</span>
            </span>

            {#if section.summary}
              <span class="govuk-visually-hidden govuk-accordion__section-heading-divider">, </span>
              <span class="govuk-accordion__section-summary govuk-body">
                <span class="govuk-accordion__section-summary-focus">{section.summary}</span>
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
