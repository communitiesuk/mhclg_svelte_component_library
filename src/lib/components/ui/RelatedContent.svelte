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

<!-- Define snippets outside the script tag, in the markup area -->
{#snippet linkListItem(
  link,
  index,
  totalItems,
  sectionName,
  isOther = false,
  isExternal = false,
)}
  {@const href = isExternal ? link.url : link.base_path}
  {@const ga4LinkData = !disableGa4
    ? JSON.stringify({
        event_name: "navigation",
        type: "related content",
        index_section: "1",
        index_link: (index + 1).toString(),
        index_section_count: "1",
        index_total: totalItems.toString(),
        section: sectionName,
        ...(isExternal && { external: "true" }),
      })
    : undefined}

  <li class="gem-c-related-navigation__link">
    <a
      {href}
      class="govuk-link govuk-link gem-c-related-navigation__section-link {isOther
        ? 'govuk-link gem-c-related-navigation__section-link--other'
        : ''}"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer external" : undefined}
      data-ga4-link={ga4LinkData}
    >
      {link.title}
    </a>
  </li>
{/snippet}

{#snippet toggleControl(items, sectionKey)}
  <li
    class="gem-c-related-navigation__link toggle-wrap"
    data-module="ga4-event-tracker"
  >
    <a
      class="gem-c-related-navigation__toggle"
      data-controls="toggle_{sectionKey}"
      data-expanded={sectionExpandedState[sectionKey]}
      data-toggled-text="Show {items.length - listTruncateThreshold} more"
      data-ga4-event={JSON.stringify({
        event_name: "select_content",
        type: "related content",
      })}
      href={"#"}
      role="button"
      aria-controls="toggle_{sectionKey}"
      aria-expanded={sectionExpandedState[sectionKey]}
      on:click|preventDefault={() => toggleSection(sectionKey)}
    >
      {sectionExpandedState[sectionKey]
        ? "Show fewer"
        : `Show ${items.length - listTruncateThreshold} more`}
    </a>
  </li>
{/snippet}

{#snippet truncatedItemsList(
  items,
  sectionKey,
  sectionName,
  isOther = false,
  isExternal = false,
)}
  {@const truncatedItems = items.slice(listTruncateThreshold)}
  <li
    class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
  >
    <span
      id="toggle_{sectionKey}"
      class="gem-c-related-navigation__toggle-more {sectionExpandedState[
        sectionKey
      ]
        ? ''
        : 'js-hidden'}"
      aria-live="polite"
      role="region"
    >
      {#each truncatedItems as link, i (link.url ?? link.base_path)}
        {@const href = isExternal ? link.url : link.base_path}
        {@const itemClass = isOther
          ? "govuk-link govuk-link gem-c-related-navigation__section-link govuk-link gem-c-related-navigation__section-link--other-truncated"
          : "govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"}
        {@const ga4LinkData = !disableGa4
          ? JSON.stringify({
              event_name: "navigation",
              type: "related content",
              index_section: "1",
              index_link: (listTruncateThreshold + i + 1).toString(),
              index_section_count: "1",
              index_total: items.length.toString(),
              section: sectionName,
              ...(isExternal && { external: "true" }),
            })
          : undefined}
        <a
          {href}
          class={itemClass}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer external" : undefined}
          data-ga4-link={ga4LinkData}>{link.title}</a
        >{#if i < truncatedItems.length - 1}{i === truncatedItems.length - 2
            ? ", and "
            : ", "}{/if}
      {/each}
    </span>
  </li>
{/snippet}

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
        {#each orderedRelatedItems.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            orderedRelatedItems.length,
            "Related content",
            true,
            false,
          )}
        {/each}
        {#if orderedRelatedItems.length > listTruncateThreshold}
          {@render toggleControl(orderedRelatedItems, "orderedRelatedItems")}
          {@render truncatedItemsList(
            orderedRelatedItems,
            "orderedRelatedItems",
            "Related content",
            true,
            false,
          )}
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
        {#each documentCollections.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            documentCollections.length,
            "Collection",
            false,
            false,
          )}
        {/each}
        {#if documentCollections.length > listTruncateThreshold}
          {@render toggleControl(documentCollections, "documentCollections")}
          {@render truncatedItemsList(
            documentCollections,
            "documentCollections",
            "Collection",
            false,
            false,
          )}
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Explore the Topic -->
  {#if exploreTopicLinks.length > 0}
    {@const sectionId = getSectionHeadingId("explore-topic")}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Explore the topic
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each exploreTopicLinks.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            exploreTopicLinks.length,
            "Explore the topic",
            false,
            false,
          )}
        {/each}
        {#if exploreTopicLinks.length > listTruncateThreshold}
          {@render toggleControl(exploreTopicLinks, "exploreTopics")}
          {@render truncatedItemsList(
            exploreTopicLinks,
            "exploreTopics",
            "Explore the topic",
            false,
            false,
          )}
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Topical Events -->
  {#if topicalEvents?.length > 0}
    {@const sectionId = getSectionHeadingId("topical-events")}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Topical event
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each topicalEvents.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            topicalEvents.length,
            "Topical event",
            false,
            false,
          )}
        {/each}
        {#if topicalEvents.length > listTruncateThreshold}
          {@render toggleControl(topicalEvents, "topicalEvents")}
          {@render truncatedItemsList(
            topicalEvents,
            "topicalEvents",
            "Topical event",
            false,
            false,
          )}
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
      data-gem-toggle-module-started="true"
    >
      <h3
        id={sectionId}
        class="gem-c-related-navigation__sub-heading"
        data-track-count="sidebarRelatedItemSection"
      >
        World locations
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each worldLocations.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            worldLocations.length,
            "World locations",
            false,
            false,
          )}
        {/each}
        {#if worldLocations.length > listTruncateThreshold}
          {@render toggleControl(worldLocations, "worldLocations")}
          {@render truncatedItemsList(
            worldLocations,
            "worldLocations",
            "World locations",
            false,
            false,
          )}
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Statistical Data Sets -->
  {#if relatedStatisticalDataSets?.length > 0}
    {@const sectionId = getSectionHeadingId("statistical-data-sets")}
    <nav
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Statistical data set
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each relatedStatisticalDataSets.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            relatedStatisticalDataSets.length,
            "Statistical data set",
            false,
            false,
          )}
        {/each}
        {#if relatedStatisticalDataSets.length > listTruncateThreshold}
          {@render toggleControl(
            relatedStatisticalDataSets,
            "relatedStatisticalDataSets",
          )}
          {@render truncatedItemsList(
            relatedStatisticalDataSets,
            "relatedStatisticalDataSets",
            "Statistical data set",
            false,
            false,
          )}
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- External Related Links -->
  {#if externalRelatedLinks?.length > 0}
    {@const sectionId = getSectionHeadingId("external-links")}
    <nav
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
        {#each externalRelatedLinks.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            externalRelatedLinks.length,
            "Elsewhere on the web",
            true,
            true,
          )}
        {/each}
        {#if externalRelatedLinks.length > listTruncateThreshold}
          {@render toggleControl(externalRelatedLinks, "externalRelatedLinks")}
          {@render truncatedItemsList(
            externalRelatedLinks,
            "externalRelatedLinks",
            "Elsewhere on the web",
            true,
            true,
          )}
        {/if}
      </ul>
    </nav>
  {/if}

  <!-- Other Contacts -->
  {#if otherContacts?.length > 0}
    {@const sectionId = getSectionHeadingId("other-contacts")}
    <nav
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
        {#each otherContacts.slice(0, listTruncateThreshold) as link, i}
          {@render linkListItem(
            link,
            i,
            otherContacts.length,
            "Other contacts",
            true,
            false,
          )}
        {/each}
        {#if otherContacts.length > listTruncateThreshold}
          {@render toggleControl(otherContacts, "otherContacts")}
          {@render truncatedItemsList(
            otherContacts,
            "otherContacts",
            "Other contacts",
            true,
            false,
          )}
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
