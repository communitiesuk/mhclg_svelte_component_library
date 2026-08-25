<script lang="ts">
  import type { Snippet } from "svelte";

  import { onMount } from "svelte";
  import { SvelteSet } from "svelte/reactivity";

  let {
    sections = [],
    hideAllSections = "Hide all sections",
    hideSection = "Hide",
    hideSectionAriaLabel = "Hide this section",
    showAllSections = "Show all sections",
    showSection = "Show",
    showSectionAriaLabel = "Show this section",
    allSectionToggle = true,
    minSectionsAllSectionToggle = 2,
    rememberIsExpandedState = true,
    headingLevel = "h4",
    useCustomSectionIcon = false,
    useLightweightAccordionStyles = false,
    openSections = [],
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
    useCustomSectionIcon?: boolean;
    useLightweightAccordionStyles?: boolean;
    openSections?: string[];
  } = $props();

  // Attempt to ensure that ids are unique by attaching extra characters
  let uniqueSections = $derived(
    sections.map((section) => {
      return {
        ...section,
        uniqueid:
          section.id +
          section.heading.slice(1, 3) +
          (section?.summary?.slice(0, 2) ?? ""),
      };
    }),
  );

  let expandedSections = $derived(
    new SvelteSet(
      uniqueSections
        .filter((section) => section.expanded)
        .map((section) => section.uniqueid),
    ),
  );

  let allExpanded = $derived(expandedSections.size === sections.length);

  let ariaLiveValue: "polite" | "off" | "assertive" | null | undefined =
    $state("polite");

  function toggleSection(uniqueid: string) {
    if (expandedSections.has(uniqueid)) {
      expandedSections.delete(uniqueid);
    } else {
      expandedSections.add(uniqueid);
    }

    ariaLiveValue = "polite";
  }

  function toggleAll() {
    if (!allExpanded) {
      uniqueSections.forEach((section) =>
        expandedSections.add(section.uniqueid),
      );
    } else {
      expandedSections.clear();
    }

    ariaLiveValue = "off";
  }

  onMount(() => {
    if (rememberIsExpandedState) {
      uniqueSections.forEach((section) => {
        if (section.expanded) {
          expandedSections.add(section.uniqueid);
        } else {
          const stored = sessionStorage.getItem(section.uniqueid);
          if (stored === "true") {
            expandedSections.add(section.uniqueid);
          }
        }
      });
    } else {
      uniqueSections.forEach((section) => {
        if (section.expanded) {
          expandedSections.add(section.uniqueid);
        }
      });
    }
  });

  $effect(() => {
    if (rememberIsExpandedState) {
      uniqueSections.forEach((section) => {
        sessionStorage.setItem(
          section.uniqueid,
          expandedSections.has(section.uniqueid).toString(),
        );
      });
    }
  });

  $effect(() => {
    for (const id of openSections) {
      const match = uniqueSections.find((section) => section.id === id);
      if (match) {
        expandedSections.add(match.uniqueid);
      }
    }
  });
</script>

<div
  class="govuk-accordion"
  class:govuk-accordion--download-style={useLightweightAccordionStyles}
  data-module="govuk-accordion"
  id="accordion-default"
>
  <div
    class="govuk-accordion__controls"
    hidden={!allSectionToggle ||
      uniqueSections.length < minSectionsAllSectionToggle}
    style="display: flex; flex-direction: row"
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
        <span class="govuk-accordion__section-heading-text-focus">
          {section.heading}
        </span>
      </span>

      {#if section.summary}
        <span
          class="govuk-visually-hidden govuk-accordion__section-heading-divider"
        >
          ,
        </span>
        <span class="govuk-accordion__section-summary govuk-body">
          <span class="govuk-accordion__section-summary-focus">
            {section.summary}
          </span>
        </span>
      {/if}

      <span class="govuk-accordion__section-toggle" data-nosnippet>
        <span class="govuk-accordion__section-toggle-focus">
          {#if useCustomSectionIcon}
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              aria-hidden="true"
              class="govuk-accordion__custom-icon"
            >
              <g
                transform="translate({12 + (isExpanded ? 3 : 0)},{15 +
                  (isExpanded ? -3 : 0)}) rotate({isExpanded ? -45 : -135})"
              >
                {#each [-5, 5] as cxcy}
                  <circle
                    data-role={isExpanded
                      ? "button-circle-selected"
                      : "button-circle-unselected"}
                    cx={cxcy}
                    cy={cxcy}
                  ></circle>
                {/each}

                <path
                  data-role={isExpanded
                    ? "button-path-selected"
                    : "button-path-unselected"}
                  d="M -5 -5 l0 9.75 m0.25 0.25 l9.75 0"
                ></path>

                <rect
                  data-role={isExpanded
                    ? "button-rect-selected"
                    : "button-rect-unselected"}
                  transform="translate(-6, 4)"
                  width="2"
                  height="2"
                  rx="4px"
                ></rect>
              </g>
            </svg>
          {:else}
            <span
              class="govuk-accordion-nav__chevron"
              class:govuk-accordion-nav__chevron--down={!isExpanded}
            ></span>
          {/if}

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
        {#if headingLevel.toLowerCase() == "h2"}
          <h2 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h2>
        {:else if headingLevel.toLowerCase() == "h3"}
          <h3 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h3>
        {:else if headingLevel.toLowerCase() == "h4"}
          <h4 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h4>
        {:else if headingLevel.toLowerCase() == "h5"}
          <h5 class="govuk-accordion__section-heading">
            {@render headerContent(section, isExpanded)}
          </h5>
        {:else if headingLevel.toLowerCase() == "h6"}
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
        role={uniqueSections.length < 6 ? "region" : ""}
        aria-labelledby={uniqueSections.length < 6
          ? section.uniqueid + "-button"
          : ""}
      >
        {#if typeof section.content === "string"}
          <p class="govuk-body">{section.content}</p>
        {:else}
          {@render section.content()}
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .govuk-accordion__custom-icon {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    margin-right: 0.35rem;
  }

  [data-role="button-circle-unselected"] {
    fill: #0b0c0c;
    stroke: #0b0c0c;
    stroke-width: 1.5;
  }

  [data-role="button-circle-selected"] {
    fill: #0b0c0c;
    stroke: #0b0c0c;
    stroke-width: 1.5;
  }

  [data-role="button-path-unselected"] {
    stroke: #0b0c0c;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
  }

  [data-role="button-path-selected"] {
    stroke: #0b0c0c;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
  }

  [data-role="button-rect-unselected"] {
    fill: #0b0c0c;
  }

  [data-role="button-rect-selected"] {
    fill: #0b0c0c;
  }

  /* Alternative style mode */
  .govuk-accordion--download-style {
    background: #f8f8f8;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e0e0;
  }

  .govuk-accordion--download-style.govuk-accordion {
    border-bottom: 0;
  }

  .govuk-accordion--download-style .govuk-accordion__section {
    border-bottom: 1px solid #b1b4b6;
  }

  .govuk-accordion--download-style .govuk-accordion__section-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 0;
    border: 0;
  }

  .govuk-accordion--download-style .govuk-accordion__section-button:hover {
    color: #0b0c0c;
  }

  .govuk-accordion--download-style .govuk-accordion__section-toggle {
    order: -1;
    margin: 0;
    min-width: 1rem;
    display: flex;
    align-items: center;
  }

  .govuk-accordion--download-style .govuk-accordion__section-toggle-focus {
    display: flex;
    align-items: center;
  }

  .govuk-accordion--download-style .govuk-accordion__section-toggle-text {
    display: none;
  }

  .govuk-accordion--download-style
    .govuk-accordion__section-content
    .govuk-body {
    padding-top: 0;
    margin-top: 0;
  }

  .govuk-accordion--download-style .govuk-accordion__section-heading-text {
    margin-bottom: 0;
  }

  .govuk-accordion--download-style .govuk-hint {
    all: unset;
    display: block;
    margin-bottom: 0.5rem;
  }
</style>
