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
.gem-c-related-navigation {
    border-top: 2px solid #1d70b8;
    margin-bottom: 60px;
    color: #0b0c0c;
}

@media print {
    .gem-c-related-navigation {
        color: #000
    }
}

.gem-c-related-navigation__main-heading {
    margin-top: 15px;
    margin-bottom: 10px;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737
}

@media print {
    .gem-c-related-navigation__main-heading {
        font-family: sans-serif
    }
}

@media print {
    .gem-c-related-navigation__main-heading {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-related-navigation__sub-heading {
    border-top: 1px solid #b1b4b6;
    margin: 0;
    padding-top: 15px;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25
}

@media print {
    .gem-c-related-navigation__sub-heading {
        font-family: sans-serif
    }
}

@media print {
    .gem-c-related-navigation__sub-heading {
        font-size: 14pt;
        line-height: 1.2
    }
}

.gem-c-related-navigation__sub-heading--footer {
    border-top: 0;
    padding-top: 0;
    margin-top: 15px;
    margin-bottom: 10px;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737
}

@media print {
    .gem-c-related-navigation__sub-heading--footer {
        font-family: sans-serif
    }
}

@media print {
    .gem-c-related-navigation__sub-heading--footer {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-related-navigation__main-heading+.gem-c-related-navigation__sub-heading {
    border-top: 0;
    padding-top: 0
}

.gem-c-related-navigation__sub-heading--other {
    border-top: 0;
    padding-top: 0;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 1.1875rem;
    line-height: 1.3157894737
}

@media print {
    .gem-c-related-navigation__sub-heading--other {
        font-family: sans-serif
    }
}

@media print {
    .gem-c-related-navigation__sub-heading--other {
        font-size: 14pt;
        line-height: 1.15
    }
}

.gem-c-related-navigation__nav-section {
    margin-bottom: 30px
}

.gem-c-related-navigation__link {
    list-style-type: none;
    margin-top: 15px;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.45
}

@media print {
    .gem-c-related-navigation__link {
        font-family: sans-serif
    }
}

@media print {
    .gem-c-related-navigation__link {
        font-size: 14pt;
        line-height: 1.45
    }
}

@media(min-width: 40.0625em) {
    .gem-c-related-navigation__link {
        line-height:1.28
    }
}

.gem-c-related-navigation__link:focus,.gem-c-related-navigation__link:active:focus,.gem-c-related-navigation__link:link:focus,.gem-c-related-navigation__link:visited:focus {
    outline: 3px solid rgba(0,0,0,0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important
}

.gem-c-related-navigation__link--truncated-links {
    margin-top: 10px
}

.gem-c-related-navigation__toggle {
    display: none;
    font-family: "GDS Transport",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-decoration: underline;
    text-decoration-thickness: max(1px, .0625rem);
    text-underline-offset: .1578em
}

@media print {
    .gem-c-related-navigation__toggle {
        font-family: sans-serif
    }
}

.gem-c-related-navigation__toggle:hover {
    text-decoration-thickness: max(3px, .1875rem, .12em);
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
    -webkit-text-decoration-skip: none;
    text-decoration-skip: none
}

.gem-c-related-navigation__toggle:focus {
    outline: 3px solid rgba(0,0,0,0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone
}

.gem-c-related-navigation__toggle:link {
    color: #1d70b8
}

.gem-c-related-navigation__toggle:visited {
    color: #1d70b8
}

.gem-c-related-navigation__toggle:hover {
    color: #003078
}

.gem-c-related-navigation__toggle:active {
    color: #0b0c0c
}

.gem-c-related-navigation__toggle:focus {
    color: #0b0c0c
}

.govuk-frontend-supported .gem-c-related-navigation__toggle {
    display: inline-block
}

.gem-c-related-navigation__section-link {
    font-weight: bold
}

.gem-c-related-navigation__section-link:focus,.gem-c-related-navigation__section-link:active:focus,.gem-c-related-navigation__section-link:link:focus,.gem-c-related-navigation__section-link:visited:focus {
    outline: 3px solid rgba(0,0,0,0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important
}

.gem-c-related-navigation__section-link--other {
    font-weight: normal
}

.gem-c-related-navigation__section-link--other:focus,.gem-c-related-navigation__section-link--other:active:focus,.gem-c-related-navigation__section-link--other:link:focus,.gem-c-related-navigation__section-link--other:visited:focus {
    outline: 3px solid rgba(0,0,0,0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important
}

.gem-c-related-navigation__section-link--footer:focus,.gem-c-related-navigation__section-link--footer:active:focus,.gem-c-related-navigation__section-link--footer:link:focus,.gem-c-related-navigation__section-link--footer:visited:focus {
    outline: 3px solid rgba(0,0,0,0);
    color: #0b0c0c;
    background-color: #fd0;
    box-shadow: 0 -2px #fd0,0 4px #0b0c0c;
    text-decoration: none;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: #0b0c0c !important
}

.gem-c-related-navigation__section-link--inline {
    line-height: 1.45
}

.gem-c-related-navigation__link-list {
    padding: 0;
    margin: 0;
    list-style: none;
    margin-bottom: 1.25em
}

@media(min-width: 40.0625em) {
    .gem-c-related-navigation__toggle-more .gem-c-related-navigation__section-link {
        line-height:1.45
    }
}

.govuk-frontend-supported .gem-c-related-navigation__toggle-more.js-hidden {
    display: none
}
</style>