<script lang="ts">
  // Type definitions
  export interface InternalLink {
    title: string;
    base_path: string;
    [key: string]: any;
  }

  export interface ExternalLink {
    title: string;
    url: string;
    [key: string]: any;
  }

  export interface RelatedContentSection {
    type: "main" | "subheading" | "other";
    id: string; // Unique ID for keys and state
    title?: string; // For the main H2 heading (type 'main' only)
    subheading?: string; // For H3 subheadings (type 'subheading' or 'other')
    links: (InternalLink | ExternalLink)[];
    linkStyle?: "normal" | "other"; // Default determined by type if undefined
    truncateThreshold?: number; // Per-section override
    disableTruncation?: boolean; // Disable truncation for this section
  }

  // Define component props
  let {
    sections = [] as RelatedContentSection[],
    headingLevel = 2 as 1 | 2 | 3 | 4 | 5 | 6, // Main heading level (used by first 'main' section)
    listTruncateThreshold = 5, // Default threshold, can be overridden per section
    disableGa4 = false,
  } = $props<{
    sections?: RelatedContentSection[];
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    listTruncateThreshold?: number; // Default threshold
    disableGa4?: boolean;
  }>();

  // Helper to check if a link is external
  function isExternalLink(
    link: InternalLink | ExternalLink,
  ): link is ExternalLink {
    return "url" in link;
  }

  // State to track expanded sections, keyed by section.id
  let sectionExpandedState = $state<Record<string, boolean>>({});

  $effect(() => {
    // Initialize state when sections change
    const initialState: Record<string, boolean> = {};
    for (const section of sections) {
      initialState[section.id] = false;
    }
    sectionExpandedState = initialState;
  });

  // Helper function to toggle section expansion by ID
  function toggleSection(sectionId: string) {
    if (sectionId in sectionExpandedState) {
      sectionExpandedState[sectionId] = !sectionExpandedState[sectionId];
    }
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

  const mainSection = $derived(sections.find((s) => s.type === "main"));
</script>

<!-- Define snippets outside the script tag, in the markup area -->
{#snippet linkListItem(
  link,
  index,
  totalItems,
  sectionName,
  isOther = false,
  sectionIndex,
)}
  {@const isExternal = isExternalLink(link)}
  {@const href = isExternal ? link.url : link.base_path}
  {@const langAttr = link.locale}
  {@const ga4LinkData = !disableGa4
    ? JSON.stringify({
        event_name: "navigation",
        type: "related content",
        index_section: (sectionIndex + 1).toString(), // Use dynamic section index
        index_link: (index + 1).toString(),
        index_section_count: sections.length.toString(), // Total number of sections
        index_total: totalItems.toString(),
        section: sectionName, // Use subheading or main title as section name
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
      lang={langAttr}
    >
      {link.title}
    </a>
  </li>
{/snippet}

{#snippet toggleControl(items, sectionId, threshold)}
  {@const numHidden = items.length - threshold}
  {#if numHidden > 0}
    <li
      class="gem-c-related-navigation__link toggle-wrap"
      data-module="ga4-event-tracker"
    >
      <a
        class="gem-c-related-navigation__toggle"
        data-controls={`toggle_${sectionId}`}
        data-expanded={sectionExpandedState[sectionId]}
        data-toggled-text="Show {numHidden} more"
        data-ga4-event={JSON.stringify({
          event_name: "select_content",
          type: "related content",
        })}
        href={"#"}
        role="button"
        aria-controls={`toggle_${sectionId}`}
        aria-expanded={sectionExpandedState[sectionId]}
        onclick={(event) => {
          event.preventDefault();
          toggleSection(sectionId);
        }}
      >
        {sectionExpandedState[sectionId]
          ? "Show fewer"
          : `Show ${numHidden} more`}
      </a>
    </li>
  {/if}
{/snippet}

{#snippet truncatedItemsList(
  items,
  sectionId,
  sectionName,
  isOther = false,
  threshold,
  sectionIndex,
)}
  {@const truncatedItems = items.slice(threshold)}
  {#if truncatedItems.length > 0}
    <li
      class="gem-c-related-navigation__link gem-c-related-navigation__link--truncated-links"
    >
      <span
        id={`toggle_${sectionId}`}
        class="gem-c-related-navigation__toggle-more {sectionExpandedState[
          sectionId
        ]
          ? ''
          : 'js-hidden'}"
        aria-live="polite"
        role="region"
      >
        {#each truncatedItems as link, i (isExternalLink(link) ? link.url : link.base_path)}
          {@const isExternal = isExternalLink(link)}
          {@const href = isExternal ? link.url : link.base_path}
          {@const langAttr = link.locale}
          {@const itemClass = isOther
            ? "govuk-link govuk-link gem-c-related-navigation__section-link govuk-link gem-c-related-navigation__section-link--other-truncated"
            : "govuk-link govuk-link gem-c-related-navigation__section-link gem-c-related-navigation__section-link--inline"}
          {@const ga4LinkData = !disableGa4
            ? JSON.stringify({
                event_name: "navigation",
                type: "related content",
                index_section: (sectionIndex + 1).toString(),
                index_link: (threshold + i + 1).toString(), // Adjust index based on threshold
                index_section_count: sections.length.toString(),
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
            data-ga4-link={ga4LinkData}
            lang={langAttr}>{link.title}</a
          >
          {#if i < truncatedItems.length - 1}{i === truncatedItems.length - 2
              ? ", and "
              : ", "}{/if}
        {/each}
      </span>
    </li>
  {/if}
{/snippet}

{#snippet sectionHeading(id, text, isOther = false)}
  <h3
    {id}
    class="gem-c-related-navigation__sub-heading {isOther
      ? 'gem-c-related-navigation__sub-heading--other'
      : ''}"
    data-track-count={!isOther ? "sidebarRelatedItemSection" : undefined}
  >
    {text}
  </h3>
{/snippet}

<div
  data-module="ga4-link-tracker"
  class="gem-c-related-navigation govuk-!-display-none-print {hasJavaScript
    ? 'govuk-frontend-supported'
    : ''}"
  role="complementary"
>
  {#if mainSection && mainSection.title}
    <svelte:element
      this={`h${headingLevel}`}
      id={`related-nav-${mainSection.id}`}
      class="gem-c-related-navigation__main-heading"
    >
      {mainSection.title}
    </svelte:element>
  {/if}

  {#each sections as section, sectionIndex (section.id)}
    {@const sectionLinks = section.links ?? []}
    {@const threshold = section.truncateThreshold ?? listTruncateThreshold}
    {@const isTruncatable =
      !section.disableTruncation && sectionLinks.length > threshold}
    {@const defaultLinkStyle =
      section.type === "main" || section.type === "other" ? "other" : "normal"}
    {@const useOtherStyle = (section.linkStyle ?? defaultLinkStyle) === "other"}
    {@const sectionTitle =
      section.subheading ?? mainSection?.title ?? "Related content"}

    {#if sectionLinks.length > 0}
      <nav
        class="gem-c-related-navigation__nav-section"
        aria-labelledby={section.type !== "main"
          ? `related-nav-heading-${section.id}`
          : undefined}
        data-module={isTruncatable ? "gem-toggle" : undefined}
      >
        {#if section.type === "subheading" || section.type === "other"}
          {@render sectionHeading(
            `related-nav-heading-${section.id}`,
            section.subheading ?? "",
            section.type === "other",
          )}
        {/if}

        <ul class="gem-c-related-navigation__link-list">
          {#each sectionLinks.slice(0, isTruncatable ? threshold : sectionLinks.length) as link, i}
            {@render linkListItem(
              link,
              i,
              sectionLinks.length,
              sectionTitle,
              useOtherStyle,
              sectionIndex,
            )}
          {/each}
          {#if isTruncatable && hasJavaScript}
            {@render toggleControl(sectionLinks, section.id, threshold)}
            {@render truncatedItemsList(
              sectionLinks,
              section.id,
              sectionTitle,
              useOtherStyle,
              threshold,
              sectionIndex,
            )}
          {/if}
        </ul>
      </nav>
    {/if}
  {/each}
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
