<script lang="ts">
  import type { Snippet } from 'svelte';

  import { onMount } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';

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
    headingLevel = 'h4',
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
    headingLevel?: string;
  } = $props();

  //Attempt to ensure that ids are unique by attaching extra characters
  let uniqueSections = sections.map((section, i) => {
    return {
      ...section,
      uniqueid:
        section.id +
        section.heading.slice(1, 3) +
        (section?.summary?.slice(0, 2) ?? ''),
    };
  });

  let expandedSections = new SvelteSet(
    uniqueSections
      .filter((section) => section.expanded)
      .map((section) => section.uniqueid)
  );

  let allExpanded = $derived(expandedSections.size === sections.length);

  let ariaLiveValue: 'polite' | 'off' | 'assertive' | null | undefined =
    $state('polite');

  // Event handlers

  function toggleSection(uniqueid: string) {
    if (expandedSections.has(uniqueid)) {
      expandedSections.delete(uniqueid);
    } else {
      expandedSections.add(uniqueid);
    }
    //Announce the contents change when an accoridion section is expanded
    ariaLiveValue = 'polite';
  }

  function toggleAll() {
    if (!allExpanded) {
      uniqueSections.forEach((section) =>
        expandedSections.add(section.uniqueid)
      );
    } else {
      expandedSections.clear();
    }
    //Don't announce all of the changes when we open all sections - this gets noisy and the content isn't associated with the label
    ariaLiveValue = 'off';
  }

  // Only use session storage logic if rememberIsExpandedState is true
  onMount(() => {
    if (rememberIsExpandedState) {
      uniqueSections.forEach((section) => {
        // If the section is explicitly expanded, respect that.
        // Otherwise, try to restore from session storage.
        if (section.expanded) {
          expandedSections.add(section.uniqueid);
        } else {
          const stored = sessionStorage.getItem(section.uniqueid);
          if (stored === 'true') {
            expandedSections.add(section.uniqueid);
          }
        }
      });
    } else {
      // If rememberIsExpandedState is false, just respect the initial `section.expanded` values
      uniqueSections.forEach((section) => {
        if (section.expanded) {
          expandedSections.add(section.uniqueid);
        }
      });
    }
  });

  // Effect to update sessionStorage when uniqueSections change
  $effect(() => {
    if (rememberIsExpandedState) {
      uniqueSections.forEach((section) => {
        sessionStorage.setItem(
          section.uniqueid,
          expandedSections.has(section.uniqueid).toString()
        );
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
    hidden={!allSectionToggle ||
      uniqueSections.length < minSectionsAllSectionToggle}
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

  {#snippet headerContent(section, isExpanded)}
    <button
      type="button"
      aria-controls="{section.uniqueid}-content"
      id="{section.uniqueid}-button"
      class="govuk-accordion__section-button"
      aria-expanded={isExpanded}
      onclick={() => toggleSection(section.uniqueid)}
      aria-label="{section.heading}, {section.summary
        ? section.summary + ','
        : ''} {isExpanded ? hideSectionAriaLabel : showSectionAriaLabel}"
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
  {/snippet}

  {#each uniqueSections as section}
    {@const isExpanded = expandedSections.has(section.uniqueid)}
    <div
      class="govuk-accordion__section"
      class:govuk-accordion__section--expanded={isExpanded}
    >
      <div class="govuk-accordion__section-header">
        {#if headingLevel.toLowerCase() == 'h2'}
          <h2 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h2>
        {:else if headingLevel.toLowerCase() == 'h3'}
          <h3 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h3>
        {:else if headingLevel.toLowerCase() == 'h4'}
          <h4 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h4>
        {:else if headingLevel.toLowerCase() == 'h5'}
          <h5 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h5>
        {:else if headingLevel.toLowerCase() == 'h6'}
          <h6 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h6>
        {/if}
      </div>
      <div
        id="{section.uniqueid}-content"
        class="govuk-accordion__section-content"
        aria-live={ariaLiveValue}
        hidden={!isExpanded}
        role={uniqueSections.length < 6 ? 'region' : ''}
        aria-labelledby={uniqueSections.length < 6
          ? section.uniqueid + '-button'
          : ''}
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
