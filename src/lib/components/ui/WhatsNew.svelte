<script lang="ts">
  // Define types for news items
  interface NewsItem {
    date: string;
    content: string;
    releaseNotesUrl?: string;
    releaseVersion?: string;
    componentLinks?: Array<{
      text: string;
      href: string;
    }>;
  }

  // Define component props with types and default values
  let {
    title = "What's new",
    titleId = "whats-new",
    componentLinksIntroText = "This the first step to refresh the GOV.UK brand. It includes updates to the:",
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
