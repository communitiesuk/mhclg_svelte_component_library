<script lang="ts">
  import type { Snippet } from 'svelte';
  // Browser storage
  import { browser } from '$app/environment'; //Do we need this? Will the app ever NOT run in the browser?
  import { onMount } from 'svelte';

  // Props
  let {
    sections = [],
    hideAllSections = 'Hide all sections',
    hideSection = 'Hide',
    hideSectionAriaLabel = 'Hide this section',
    showAllSections = 'Show all sections',
    showSection = 'Show',
    showSectionAriaLabel = 'Show this section',
    allSectionToggle = true,
    minSectionsAllSectionToggle = 2,
    rememberIsExpandedState = true,
  }: {
    sections: {
      heading: string;
      summary?: string;
      content: string | Snippet;
      id: string;
      expanded?: boolean;
    }[];
    hideAllSections?: string;
    hideSection?: string;
    hideSectionAriaLabel?: string;
    showAllSections?: string;
    showSection?: string;
    showSectionAriaLabel?: string;
    allSectionToggle?: boolean;
    minSectionsAllSectionToggle?: number;
    rememberIsExpandedState?: boolean;
  } = $props();

  // State and derived stores
  let expandedSections: string[] = $state(
    []
    // sections
    //   .filter((section) => section.expanded)
    //   .map((section) => section.id + section.heading.slice(0, 2))
  );
  $inspect(expandedSections.length);
  let allExpanded = $derived(expandedSections.length === sections.length);

  // Event handlers

  function toggleSection(id: string) {
    // const update = new SvelteSet(expandedSections);
    // Create a new reference to trigger Svelte 5 reactivity
    if (expandedSections.includes(id)) {
      let index = expandedSections.indexOf(id);
      expandedSections.splice(index, 1);
    } else {
      expandedSections.push(id);
    }
  }

  function toggleAll() {
    // const update = new SvelteSet(expandedSections);

    if (!allExpanded) {
      expandedSections = [];
      sections.forEach((section) => expandedSections.push(section.id));
    } else {
      expandedSections = [];
    }
  }

  // Only use session storage logic if rememberIsExpandedState is true
  onMount(() => {
    if (browser && rememberIsExpandedState) {
      sections.forEach((section) => {
        // If the section is explicitly expanded, respect that.
        // Otherwise, try to restore from session storage.
        // **** Is this the behaviour we want? Shouldn't it be the other way around?
        if (section.expanded) {
          expandedSections.push(section.id);
        } else {
          // try {
          const stored = sessionStorage.getItem(section.id);
          if (stored === 'true') {
            expandedSections.push(section.id);
          }
          // } catch (e) {
          //   // Handle storage errors gracefully (e.g. private mode)
          // }
        }
      });
    } else {
      // If rememberIsExpandedState is false, just respect the initial `section.expanded` values
      sections.forEach((section) => {
        if (section.expanded) {
          expandedSections.push(section.id);
        }
      });
    }
  });

  // Effect to update sessionStorage when sections change
  $effect(() => {
    if (browser && rememberIsExpandedState) {
      sections.forEach((section) => {
        // try {
        sessionStorage.setItem(
          section.id,
          expandedSections.includes(section.id).toString()
        );
        // } catch (e) {
        //   // Handle storage errors gracefully
        // }
      });
    }
  });
</script>

<div
  class="govuk-accordion"
  data-module="govuk-accordion"
  id="accordion-default"
>
  <div
    class="govuk-accordion__controls"
    hidden={!allSectionToggle || sections.length < minSectionsAllSectionToggle}
  >
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
    {@const isExpanded = expandedSections.includes(section.id)}
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
        {#if typeof section.content === 'string'}
          <p class="govuk-body">{section.content}</p>
        {:else}
          {@render section.content()}
        {/if}
      </div>
    </div>
  {/each}
</div>
