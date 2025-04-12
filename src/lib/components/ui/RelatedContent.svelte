<script lang="ts">
  // Type definitions based on GOV.UK Publishing Components examples
  interface InternalLink {
    title: string;
    base_path: string; // Used by most internal link types
    [key: string]: any; // Allow other potential fields like document_type, locale
  }

  interface ExternalLink {
    title: string;
    url: string; // Used specifically for external links
    [key: string]: any; // Allow other potential fields like locale
  }

  // Define component props
  let {
    headingText = "Related content",
    headingLevel = 2 as 1 | 2 | 3 | 4 | 5 | 6, // Main heading level
    orderedRelatedItems = [] as InternalLink[],
    mainstreamBrowsePages = [] as InternalLink[],
    taxons = [] as InternalLink[],
    documentCollections = [] as InternalLink[],
    topicalEvents = [] as InternalLink[],
    worldLocations = [] as InternalLink[],
    relatedStatisticalDataSets = [] as InternalLink[],
    externalRelatedLinks = [] as ExternalLink[],
    otherContacts = [] as InternalLink[], // From links.related
    disableGa4 = false,
    listTruncateThreshold = 5, // Default threshold for truncating lists
  } = $props<{
    headingText?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    orderedRelatedItems?: InternalLink[];
    mainstreamBrowsePages?: InternalLink[];
    taxons?: InternalLink[];
    documentCollections?: InternalLink[];
    topicalEvents?: InternalLink[];
    worldLocations?: InternalLink[];
    relatedStatisticalDataSets?: InternalLink[];
    externalRelatedLinks?: ExternalLink[];
    otherContacts?: InternalLink[]; // From links.related
    disableGa4?: boolean;
    listTruncateThreshold?: number;
  }>();

  // Helper to generate unique IDs for section headings
  // Using a simpler approach than the Ruby component for Svelte context
  function getSectionHeadingId(suffix: string): string {
    return `related-navigation-${suffix}`;
  }

  // Combine mainstream browse pages and taxons for the 'Explore the topic' section
  // Prioritize mainstream browse pages if both exist, as per documentation
  let exploreTopicLinks = $derived(
    mainstreamBrowsePages?.length > 0
      ? mainstreamBrowsePages
      : taxons?.length > 0
        ? taxons
        : [],
  );

  // State to track expanded sections
  let sectionExpandedState = $state({
    orderedRelatedItems: false,
    documentCollections: false,
    exploreTopics: false,
    topicalEvents: false,
    worldLocations: false,
    relatedStatisticalDataSets: false,
    externalRelatedLinks: false,
    otherContacts: false,
  });

  // Helper function to toggle section expansion
  function toggleSection(sectionKey: string) {
    sectionExpandedState[sectionKey] = !sectionExpandedState[sectionKey];
  }

  // Add browser check for JavaScript support
  import { browser } from "$app/environment";

  // Track if JavaScript is supported
  let hasJavaScript = $state(false);

  // Set JavaScript support flag on mount
  $effect(() => {
    if (browser) {
      hasJavaScript = true;
    }
  });


</script>

<div
  data-module="ga4-link-tracker"
  class="gem-c-related-navigation govuk-!-display-none-print {hasJavaScript
    ? 'govuk-frontend-supported'
    : ''}"
  role="complementary"
>
  <svelte:element
    this={`h${headingLevel}`}
    id="related-nav-related_items"
    class="gem-c-related-navigation__main-heading"
  >
    {headingText}
  </svelte:element>

  <!-- Ordered Related Items -->
  {#if orderedRelatedItems?.length > 0}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby="related-nav-related_items"
      data-module="gem-toggle"
    >
      <ul class="gem-c-related-navigation__link-list">
        {#each orderedRelatedItems.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link govuk-link gem-c-related-navigation__section-link--other"
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_section: "1",
                    index_link: (
                      orderedRelatedItems.indexOf(link) + 1
                    ).toString(),
                    index_section_count: "1",
                    index_total: orderedRelatedItems.length.toString(),
                    section: "Related content",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}

        {#if orderedRelatedItems.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_related_items"
              data-expanded={sectionExpandedState.orderedRelatedItems}
              data-toggled-text="Show {orderedRelatedItems.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_related_items"
              aria-expanded={sectionExpandedState.orderedRelatedItems}
              on:click|preventDefault={() =>
                toggleSection("orderedRelatedItems")}
            >
              {sectionExpandedState.orderedRelatedItems
                ? "Show fewer"
                : `Show ${orderedRelatedItems.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_related_items"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.orderedRelatedItems
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each orderedRelatedItems.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link
                  gem-c-related-navigation__section-link--other-truncated"
                  data-ga4-link={JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_section: "1",
                    index_link: (listTruncateThreshold + i + 1).toString(),
                    index_section_count: "1",
                    index_total: orderedRelatedItems.length.toString(),
                    section: "Related content",
                  })}>{link.title}</a
                >{#if i < orderedRelatedItems.slice(listTruncateThreshold).length - 1}{i ===
                  orderedRelatedItems.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Document Collections -->
  {#if documentCollections?.length > 0}
    {@const sectionId = getSectionHeadingId("collections")}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
      data-module="gem-toggle"
    >
      <h3
        id={sectionId}
        class="gem-c-related-navigation__sub-heading"
        data-track-count="sidebarRelatedItemSection"
      >
        Collection
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each documentCollections.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link"
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_section: "1",
                    index_link: (
                      documentCollections.indexOf(link) + 1
                    ).toString(),
                    index_section_count: "1",
                    index_total: documentCollections.length.toString(),
                    section: "Collection",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}

        {#if documentCollections.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_collections"
              data-expanded={sectionExpandedState.documentCollections}
              data-toggled-text="Show {documentCollections.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_collections"
              aria-expanded={sectionExpandedState.documentCollections}
              on:click|preventDefault={() =>
                toggleSection("documentCollections")}
            >
              {sectionExpandedState.documentCollections
                ? "Show fewer"
                : `Show ${documentCollections.length - listTruncateThreshold} more`}
            </a>
          </li>

          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_collections"
              class="gem-c-related-navigation__toggle-more {!sectionExpandedState.documentCollections
                ? 'js-hidden'
                : ''}"
              aria-live="polite"
              role="region"
            >
              {#each documentCollections.slice(listTruncateThreshold) as link, i}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: documentCollections.length.toString(),
                        section: "Collection",
                      })
                    : undefined}>{link.title}</a
                >{#if i < documentCollections.slice(listTruncateThreshold).length - 1}{i ===
                  documentCollections.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Explore the Topic (Mainstream Browse Pages OR Taxons) -->
  {#if exploreTopicLinks.length > 0}
    {@const sectionId = getSectionHeadingId("explore-topic")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Explore the topic
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each exploreTopicLinks.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: exploreTopicLinks.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: exploreTopicLinks.indexOf(link) + 1,
                    index_total: exploreTopicLinks.length,
                    section: "Explore the topic",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
        {#if exploreTopicLinks.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_explore_topics"
              data-expanded={sectionExpandedState.exploreTopics}
              data-toggled-text="Show {exploreTopicLinks.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_explore_topics"
              aria-expanded={sectionExpandedState.exploreTopics}
              on:click|preventDefault={() => toggleSection("exploreTopics")}
            >
              {sectionExpandedState.exploreTopics
                ? "Show fewer"
                : `Show ${exploreTopicLinks.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_explore_topics"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.exploreTopics
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each exploreTopicLinks.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: exploreTopicLinks.length.toString(),
                        section: "Explore the topic",
                      })
                    : undefined}>{link.title}</a
                >{#if i < exploreTopicLinks.slice(listTruncateThreshold).length - 1}{i ===
                  exploreTopicLinks.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Topical Events -->
  {#if topicalEvents?.length > 0}
    {@const sectionId = getSectionHeadingId("topical-events")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Topical event
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each topicalEvents.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: topicalEvents.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: topicalEvents.indexOf(link) + 1,
                    index_total: topicalEvents.length,
                    section: "Topical event",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
        {#if topicalEvents.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_topical_events"
              data-expanded={sectionExpandedState.topicalEvents}
              data-toggled-text="Show {topicalEvents.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_topical_events"
              aria-expanded={sectionExpandedState.topicalEvents}
              on:click|preventDefault={() => toggleSection("topicalEvents")}
            >
              {sectionExpandedState.topicalEvents
                ? "Show fewer"
                : `Show ${topicalEvents.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_topical_events"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.topicalEvents
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each topicalEvents.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: topicalEvents.length.toString(),
                        section: "Topical event",
                      })
                    : undefined}>{link.title}</a
                >{#if i < topicalEvents.slice(listTruncateThreshold).length - 1}{i ===
                  topicalEvents.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- World Locations -->
  {#if worldLocations?.length > 0}
    {@const sectionId = getSectionHeadingId("world-locations")}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
      data-module="gem-toggle"
    >
      <h3
        id={sectionId}
        class="gem-c-related-navigation__sub-heading"
        data-track-count="sidebarRelatedItemSection"
      >
        World locations
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each worldLocations.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link"
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_section: "1",
                    index_link: (worldLocations.indexOf(link) + 1).toString(),
                    index_section_count: "1",
                    index_total: worldLocations.length.toString(),
                    section: "World locations",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}

        {#if worldLocations.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_world_locations"
              data-expanded={sectionExpandedState.worldLocations}
              data-toggled-text="Show {worldLocations.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_world_locations"
              aria-expanded={sectionExpandedState.worldLocations}
              on:click|preventDefault={() => toggleSection("worldLocations")}
            >
              {sectionExpandedState.worldLocations
                ? "Show fewer"
                : `Show ${worldLocations.length - listTruncateThreshold} more`}
            </a>
          </li>

          <!-- This is a critical change - make the truncated links as a direct child of the list item -->
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_world_locations"
              class="gem-c-related-navigation__toggle-more {!sectionExpandedState.worldLocations
                ? 'js-hidden'
                : ''}"
              aria-live="polite"
              role="region"
            >
              {#each worldLocations.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: worldLocations.length.toString(),
                        section: "World locations",
                      })
                    : undefined}>{link.title}</a
                >{#if i < worldLocations.slice(listTruncateThreshold).length - 1}{i ===
                  worldLocations.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Statistical Data Sets -->
  {#if relatedStatisticalDataSets?.length > 0}
    {@const sectionId = getSectionHeadingId("statistical-data-sets")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Statistical data set
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each relatedStatisticalDataSets.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: relatedStatisticalDataSets.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: relatedStatisticalDataSets.indexOf(link) + 1,
                    index_total: relatedStatisticalDataSets.length,
                    section: "Statistical data set",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
        {#if relatedStatisticalDataSets.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_statistical_data_sets"
              data-expanded={sectionExpandedState.relatedStatisticalDataSets}
              data-toggled-text="Show {relatedStatisticalDataSets.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_statistical_data_sets"
              aria-expanded={sectionExpandedState.relatedStatisticalDataSets}
              on:click|preventDefault={() =>
                toggleSection("relatedStatisticalDataSets")}
            >
              {sectionExpandedState.relatedStatisticalDataSets
                ? "Show fewer"
                : `Show ${relatedStatisticalDataSets.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_statistical_data_sets"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.relatedStatisticalDataSets
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each relatedStatisticalDataSets.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total:
                          relatedStatisticalDataSets.length.toString(),
                        section: "Statistical data set",
                      })
                    : undefined}>{link.title}</a
                >{#if i < relatedStatisticalDataSets.slice(listTruncateThreshold).length - 1}{i ===
                  relatedStatisticalDataSets.slice(listTruncateThreshold)
                    .length -
                    2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- External Related Links -->
  {#if externalRelatedLinks?.length > 0}
    {@const sectionId = getSectionHeadingId("external-links")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3
        id={sectionId}
        class="gem-c-related-navigation__sub-heading gem-c-related-navigation__sub-heading--other"
      >
        Elsewhere on the web
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each externalRelatedLinks.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.url}
              class="govuk-link govuk-link gem-c-related-navigation__section-link govuk-link gem-c-related-navigation__section-link--other"
              target="_blank"
              rel="noopener noreferrer external"
              data-track-category="relatedLinkClicked"
              data-track-action={link.url}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: externalRelatedLinks.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: externalRelatedLinks.indexOf(link) + 1,
                    index_total: externalRelatedLinks.length,
                    external: "true",
                    section: "Elsewhere on the web",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
        {#if externalRelatedLinks.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_external_links"
              data-expanded={sectionExpandedState.externalRelatedLinks}
              data-toggled-text="Show {externalRelatedLinks.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_external_links"
              aria-expanded={sectionExpandedState.externalRelatedLinks}
              on:click|preventDefault={() =>
                toggleSection("externalRelatedLinks")}
            >
              {sectionExpandedState.externalRelatedLinks
                ? "Show fewer"
                : `Show ${externalRelatedLinks.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_external_links"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.externalRelatedLinks
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each externalRelatedLinks.slice(listTruncateThreshold) as link, i (link.url)}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer external"
                  class="govuk-link govuk-link gem-c-related-navigation__section-link govuk-link govuk-link gem-c-related-navigation__section-link--other-truncated"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: externalRelatedLinks.length.toString(),
                        section: "Elsewhere on the web",
                        external: "true",
                      })
                    : undefined}>{link.title}</a
                >{#if i < externalRelatedLinks.slice(listTruncateThreshold).length - 1}{i ===
                  externalRelatedLinks.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Other Contacts (from links.related) -->
  {#if otherContacts?.length > 0}
    {@const sectionId = getSectionHeadingId("other-contacts")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3
        id={sectionId}
        class="gem-c-related-navigation__sub-heading gem-c-related-navigation__sub-heading--other"
      >
        Other contacts
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each otherContacts.slice(0, listTruncateThreshold) as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link govuk-link gem-c-related-navigation__section-link govuk-link gem-c-related-navigation__section-link--other"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: otherContacts.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: otherContacts.indexOf(link) + 1,
                    index_total: otherContacts.length,
                    section: "Other contacts",
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
        {#if otherContacts.length > listTruncateThreshold}
          <li
            class="gem-c-related-navigation__link toggle-wrap"
            data-module="ga4-event-tracker"
          >
            <a
              class="gem-c-related-navigation__toggle"
              data-controls="toggle_other_contacts"
              data-expanded={sectionExpandedState.otherContacts}
              data-toggled-text="Show {otherContacts.length -
                listTruncateThreshold} more"
              data-ga4-event={JSON.stringify({
                event_name: "select_content",
                type: "related content",
              })}
              href="#"
              role="button"
              aria-controls="toggle_other_contacts"
              aria-expanded={sectionExpandedState.otherContacts}
              on:click|preventDefault={() => toggleSection("otherContacts")}
            >
              {sectionExpandedState.otherContacts
                ? "Show fewer"
                : `Show ${otherContacts.length - listTruncateThreshold} more`}
            </a>
          </li>
          <li
            class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
          >
            <span
              id="toggle_other_contacts"
              class="gem-c-related-navigation__toggle-more {sectionExpandedState.otherContacts
                ? ''
                : 'js-hidden'}"
              aria-live="polite"
              role="region"
            >
              {#each otherContacts.slice(listTruncateThreshold) as link, i (link.base_path)}
                <a
                  href={link.base_path}
                  class="govuk-link govuk-link gem-c-related-navigation__section-link govuk-link govuk-link gem-c-related-navigation__section-link--other-truncated"
                  data-ga4-link={!disableGa4
                    ? JSON.stringify({
                        event_name: "navigation",
                        type: "related content",
                        index_section: "1",
                        index_link: (listTruncateThreshold + i + 1).toString(),
                        index_section_count: "1",
                        index_total: otherContacts.length.toString(),
                        section: "Other contacts",
                      })
                    : undefined}>{link.title}</a
                >{#if i < otherContacts.slice(listTruncateThreshold).length - 1}{i ===
                  otherContacts.slice(listTruncateThreshold).length - 2
                    ? ", and "
                    : ", "}{/if}
              {/each}
            </span>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}
</div>

<style>
  .gem-c-related-navigation {
    border-top: 2px solid #1d70b8;
    margin-bottom: 60px;
    color: #0b0c0c;
  }

  @media print {
    .gem-c-related-navigation {
      color: #000;
    }
  }

  .gem-c-related-navigation__main-heading {
    margin-top: 15px;
    margin-bottom: 10px;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  @media print {
    .gem-c-related-navigation__main-heading {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-related-navigation__main-heading {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  .gem-c-related-navigation__sub-heading {
    border-top: 1px solid #b1b4b6;
    margin: 0;
    padding-top: 15px;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
  }

  @media print {
    .gem-c-related-navigation__sub-heading {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-related-navigation__sub-heading {
      font-size: 14pt;
      line-height: 1.2;
    }
  }

  .gem-c-related-navigation__sub-heading--footer {
    border-top: 0;
    padding-top: 0;
    margin-top: 15px;
    margin-bottom: 10px;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  @media print {
    .gem-c-related-navigation__sub-heading--footer {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-related-navigation__sub-heading--footer {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  .gem-c-related-navigation__main-heading
    + .gem-c-related-navigation__sub-heading {
    border-top: 0;
    padding-top: 0;
  }

  .gem-c-related-navigation__sub-heading--other {
    border-top: 0;
    padding-top: 0;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
  }

  @media print {
    .gem-c-related-navigation__sub-heading--other {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-related-navigation__sub-heading--other {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  .gem-c-related-navigation__nav-section {
    margin-bottom: 30px;
  }

  .gem-c-related-navigation__link {
    list-style-type: none;
    margin-top: 15px;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.45;
  }

  @media print {
    .gem-c-related-navigation__link {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-related-navigation__link {
      font-size: 14pt;
      line-height: 1.45;
    }
  }

  @media (min-width: 40.0625em) {
    .gem-c-related-navigation__link {
      line-height: 1.28;
    }
  }

  .gem-c-related-navigation__link:focus,
  .gem-c-related-navigation__link:active:focus,
  .gem-c-related-navigation__link:link:focus,
  .gem-c-related-navigation__link:visited:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important;
  }

  .gem-c-related-navigation__link--truncated-links {
    margin-top: 10px;
  }

  .gem-c-related-navigation__toggle {
    display: none;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: underline;
    text-decoration-thickness: max(1px, 0.0625rem);
    text-underline-offset: 0.1578em;
  }

  @media print {
    .gem-c-related-navigation__toggle {
      font-family: sans-serif;
    }
  }

  .gem-c-related-navigation__toggle:hover {
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none;
  }

  .gem-c-related-navigation__toggle:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .gem-c-related-navigation__toggle:link {
    color: #1d70b8;
  }

  .gem-c-related-navigation__toggle:visited {
    color: #1d70b8;
  }

  .gem-c-related-navigation__toggle:hover {
    color: #003078;
  }

  .gem-c-related-navigation__toggle:active {
    color: #0b0c0c;
  }

  .gem-c-related-navigation__toggle:focus {
    color: #0b0c0c;
  }

  .govuk-frontend-supported .gem-c-related-navigation__toggle {
    display: inline-block;
  }

  .gem-c-related-navigation__section-link {
    font-weight: bold;
  }

  .gem-c-related-navigation__section-link:focus,
  .gem-c-related-navigation__section-link:active:focus,
  .gem-c-related-navigation__section-link:link:focus,
  .gem-c-related-navigation__section-link:visited:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important;
  }

  .gem-c-related-navigation__section-link--other {
    font-weight: normal;
  }

  .gem-c-related-navigation__section-link--other:focus,
  .gem-c-related-navigation__section-link--other:active:focus,
  .gem-c-related-navigation__section-link--other:link:focus,
  .gem-c-related-navigation__section-link--other:visited:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important;
  }

  .gem-c-related-navigation__section-link--footer:focus,
  .gem-c-related-navigation__section-link--footer:active:focus,
  .gem-c-related-navigation__section-link--footer:link:focus,
  .gem-c-related-navigation__section-link--footer:visited:focus {
    outline: 3px solid rgba(0, 0, 0, 0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important;
  }

  .gem-c-related-navigation__section-link--inline {
    line-height: 1.45;
  }

  .gem-c-related-navigation__link-list {
    padding: 0;
    margin: 0;
    list-style: none;
    margin-bottom: 1.25em;
  }

  @media (min-width: 40.0625em) {
    .gem-c-related-navigation__toggle-more
      .gem-c-related-navigation__section-link {
      line-height: 1.45;
    }
  }

  .govuk-frontend-supported .gem-c-related-navigation__toggle-more.js-hidden {
    display: none;
  }

  /* Add new rules to override govuk-link default font weight */
  a.govuk-link.gem-c-related-navigation__section-link {
    font-weight: bold;
  }

  a.govuk-link.gem-c-related-navigation__section-link--other {
    font-weight: normal;
  }

  /* New rules for truncated links with the --other modifiers */
  a.govuk-link.gem-c-related-navigation__section-link--other-truncated {
    line-height: 1.45;
    font-weight: normal;
  }
</style>
