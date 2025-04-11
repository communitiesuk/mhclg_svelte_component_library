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
</script>

<div class="gem-c-related-navigation" role="complementary">
  <svelte:element
    this={`h${headingLevel}`}
    id="related-nav-related_items"
    class="gem-c-related-navigation__main-heading"
  >
    {headingText}
  </svelte:element>

  <!-- Ordered Related Items (No Subheading) -->
  {#if orderedRelatedItems?.length > 0}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby="related-nav-related_items"
    >
      <ul class="gem-c-related-navigation__link-list">
        {#each orderedRelatedItems as link}
          <li class="gem-c-related-navigation__link">
            <!-- NOTE: GOV.UK ERB renders these directly, not in <li>, adjusted for valid HTML list -->
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: orderedRelatedItems.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: orderedRelatedItems.indexOf(link) + 1,
                    index_total: orderedRelatedItems.length,
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <!-- Document Collections -->
  {#if documentCollections?.length > 0}
    {@const sectionId = getSectionHeadingId("collections")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Collection
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each documentCollections as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: documentCollections.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: documentCollections.indexOf(link) + 1,
                    index_total: documentCollections.length,
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
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
        {#each exploreTopicLinks as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
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
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
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
        {#each topicalEvents as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
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
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <!-- World Locations -->
  {#if worldLocations?.length > 0}
    {@const sectionId = getSectionHeadingId("world-locations")}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionId}
    >
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        World locations
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each worldLocations as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
              data-track-category="relatedLinkClicked"
              data-track-action={link.base_path}
              data-track-label={link.title}
              data-track-options={!disableGa4
                ? JSON.stringify({
                    dimension28: worldLocations.length,
                    dimension29: link.title,
                  })
                : undefined}
              data-ga4-link={!disableGa4
                ? JSON.stringify({
                    event_name: "navigation",
                    type: "related content",
                    index_link: worldLocations.indexOf(link) + 1,
                    index_total: worldLocations.length,
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
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
        {#each relatedStatisticalDataSets as link}
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
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
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
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Elsewhere on the web
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each externalRelatedLinks as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.url}
              class="govuk-link gem-c-related-navigation__section-link"
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
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
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
      <h3 id={sectionId} class="gem-c-related-navigation__sub-heading">
        Other contacts
      </h3>
      <ul class="gem-c-related-navigation__link-list">
        {#each otherContacts as link}
          <li class="gem-c-related-navigation__link">
            <a
              href={link.base_path}
              class="govuk-link gem-c-related-navigation__section-link"
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
                  })
                : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</div>

<style>
  /* Based on _related-navigation.scss */
  .gem-c-related-navigation {
    border-top: 2px solid #1d70b8; /* $govuk-link-colour */
    margin-top: 30px;
    padding-top: 20px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation {
      margin-top: 50px;
    }
  }

  .gem-c-related-navigation__main-heading {
    font-family: "GDS Transport", Arial, sans-serif; /* $govuk-font-family */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.125rem; /* 18px */
    line-height: 1.11111;
    margin-top: 0;
    margin-bottom: 20px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__main-heading {
      font-size: 1.5rem; /* 24px */
      line-height: 1.25;
      margin-bottom: 30px;
    }
  }

  .gem-c-related-navigation__nav-section {
    margin-bottom: 20px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__nav-section {
      margin-bottom: 30px;
    }
  }

  .gem-c-related-navigation__nav-section:last-child {
    margin-bottom: 0;
  }

  .gem-c-related-navigation__sub-heading {
    font-family: "GDS Transport", Arial, sans-serif; /* $govuk-font-family */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1rem; /* 16px */
    line-height: 1.25;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .gem-c-related-navigation__link-list {
    font-family: "GDS Transport", Arial, sans-serif; /* $govuk-font-family */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem; /* 16px */
    line-height: 1.25;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Note: Adjusted list item structure vs ERB for valid HTML */
  .gem-c-related-navigation__link {
    display: block; /* Make the whole area clickable if needed, or style link directly */
    margin-bottom: 10px;
  }

  .gem-c-related-navigation__link:last-child {
    margin-bottom: 0;
  }

  .gem-c-related-navigation__section-link {
    color: #1d70b8; /* $govuk-link-colour */
    text-decoration: underline;
  }

  .gem-c-related-navigation__section-link:visited {
    color: #4c2c92; /* $govuk-link-visited-colour */
  }

  .gem-c-related-navigation__section-link:hover {
    color: #003078; /* $govuk-link-hover-colour */
  }

  .gem-c-related-navigation__section-link:focus {
    outline: 3px solid rgba(0, 0, 0, 0); /* $govuk-focus-width */
    color: #0b0c0c; /* $govuk-focus-text-colour */
    background-color: #ffdd00; /* $govuk-focus-colour */
    box-shadow:
      0 -2px #ffdd00,
      0 4px #0b0c0c; /* $govuk-focus-colour, $govuk-focus-text-colour */
    text-decoration: none;
  }

  /* GOV.UK Frontend link styles included for completeness */
  .govuk-link {
    font-family: "GDS Transport", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1d70b8;
    text-decoration: underline;
  }
  .govuk-link:visited {
    color: #4c2c92;
  }
  .govuk-link:hover {
    color: #003078;
  }
  .govuk-link:focus {
    outline: 3px solid transparent;
    color: #0b0c0c;
    background-color: #ffdd00;
    box-shadow:
      0 -2px #ffdd00,
      0 4px #0b0c0c;
    text-decoration: none;
  }

  /* Inverse link styles (often used on dark backgrounds, but applied here as per ERB) */
  /* These might need adjustment depending on actual background */
  .govuk-link--inverse:link,
  .govuk-link--inverse:visited {
    color: #ffffff; /* $govuk-inverse-link-colour */
  }
  .govuk-link--inverse:hover {
    color: #ffffff; /* $govuk-inverse-link-hover-colour (same as link) */
  }
  .govuk-link--inverse:focus {
    color: #0b0c0c; /* $govuk-focus-text-colour */
  }
</style>
