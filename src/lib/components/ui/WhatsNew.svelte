<script lang="ts">
  /**
   * Represents a single news item in the What's New section
   */
  interface NewsItem {
    /** The date of the news item (e.g., "June 2025") */
    date: string;
    /** The main content/description of the news item */
    content: string;
    /** Optional URL to release notes or more information */
    releaseNotesUrl?: string;
    /** Optional version number for releases (e.g., "v0.1.16") */
    releaseVersion?: string;
    /** Optional array of component links to display as a bulleted list */
    componentLinks?: Array<{
      /** Display text for the link */
      text: string;
      /** URL/href for the link */
      href: string;
    }>;
  }

  /**
   * WhatsNew Component
   *
   * A flexible component for displaying news, updates, and release information.
   * Commonly used on homepages or documentation sites to communicate recent changes,
   * new features, or important announcements to users.
   *
   * @example
   * ```svelte
   * <!-- Basic usage with defaults -->
   * <WhatsNew />
   *
   * <!-- Custom usage -->
   * <WhatsNew
   *   title="Latest Updates"
   *   titleId="updates"
   *   componentLinksIntroText="New components available:"
   *   newsItems={[
   *     {
   *       date: "June 2025",
   *       content: "Released new component library",
   *       releaseNotesUrl: "https://github.com/example/releases/tag/v1.0.0",
   *       releaseVersion: "v1.0.0",
   *       componentLinks: [
   *         { text: "Button component", href: "/components/button" }
   *       ]
   *     }
   *   ]}
   * />
   * ```
   */

  // Define component props with types and default values
  let {
    /** The main heading text for the news section */
    title = "What's new",
    /** The HTML id attribute for the heading element (useful for anchor links) */
    titleId = "whats-new",
    /**
     * Introductory text that appears before component links lists.
     * Set to empty string to hide this text entirely.
     */
    componentLinksIntroText = "This the first step to refresh the GOV.UK brand. It includes updates to the:",
    /**
     * Array of news items to display. Each item can include:
     * - date: When the news occurred
     * - content: Main description
     * - releaseNotesUrl & releaseVersion: For linking to release notes
     * - componentLinks: For displaying related component links
     */
    newsItems = [
      {
        date: "15 May 2025",
        content:
          "We released GOV.UK Frontend v5.10.1 with the correct colour for the dot in the refreshed GOV.UK logo, as well as small fixes to the implementation of the brand refresh.",
        releaseNotesUrl:
          "https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.1",
        releaseVersion: "v5.10.1",
      },
      {
        date: "1 May 2025",
        content: "We released GOV.UK Frontend v5.10.0.",
        releaseNotesUrl:
          "https://github.com/alphagov/govuk-frontend/releases/tag/v5.10.0",
        releaseVersion: "v5.10.0",
        componentLinks: [
          { text: "GOV.UK header component", href: "/components/header/" },
          { text: "GOV.UK footer component", href: "/components/footer/" },
          {
            text: "Service navigation component",
            href: "/components/service-navigation/",
          },
          {
            text: "Cookie banner component",
            href: "/components/cookie-banner/",
          },
        ],
      },
    ] as NewsItem[],
  } = $props<{
    title?: string;
    titleId?: string;
    componentLinksIntroText?: string;
    newsItems?: NewsItem[];
  }>();
</script>

<div class="app-whats-new">
  <div class="govuk-width-container">
    <div class="govuk-main-wrapper govuk-main-wrapper--l">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds-from-desktop">
          <h2 id={titleId} class="govuk-heading-l">{title}</h2>

          {#each newsItems as item, index}
            <p class="govuk-body">
              <strong>{item.date}:</strong>
              {item.content}
            </p>

            {#if item.releaseNotesUrl && item.releaseVersion}
              <p class="govuk-body">
                Read the <a href={item.releaseNotesUrl} class="govuk-link"
                  >release notes for {item.releaseVersion}</a
                > to see what's changed.
              </p>
            {/if}

            {#if item.componentLinks && item.componentLinks.length > 0}
              <p class="govuk-body">
                {componentLinksIntroText}
              </p>
              <ul class="govuk-list govuk-list--bullet">
                {#each item.componentLinks as link}
                  <li>
                    <a href={link.href} class="govuk-link">{link.text}</a>
                  </li>
                {/each}
              </ul>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .app-whats-new {
    border-bottom: 1px solid #b1b4b6;
    background-color: #f8f8f8;
  }
</style>
