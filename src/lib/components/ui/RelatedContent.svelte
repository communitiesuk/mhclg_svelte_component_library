<script lang="ts">
  // Define the structure for related links and sections
  interface RelatedLink {
    text: string;
    path: string;
  }

  interface RelatedSection {
    title: string;
    links: RelatedLink[];
  }

  // Define component props
  let {
    // Array of sections, each with a title and links
    sections = [] as RelatedSection[],
    // The main heading text for the related content block
    mainHeadingText = "Related content",
    // ID for the main heading, used for aria-labelledby
    mainHeadingId = "related-nav-related_items",
  } = $props<{
    sections?: RelatedSection[];
    mainHeadingText?: string;
    mainHeadingId?: string;
  }>();

  // Helper to generate unique IDs for section headings
  function getSectionHeadingId(title: string): string {
    return `related-nav-${title.toLowerCase().replace(/\s+/g, "-")}`;
  }
</script>

<div class="gem-c-related-navigation" role="complementary">
  <h2 id={mainHeadingId} class="gem-c-related-navigation__main-heading">
    {mainHeadingText}
  </h2>

  {#each sections as section}
    {@const sectionHeadingId = getSectionHeadingId(section.title)}
    <nav
      role="navigation"
      class="gem-c-related-navigation__nav-section"
      aria-labelledby={sectionHeadingId}
    >
      <h3 class="gem-c-related-navigation__sub-heading" id={sectionHeadingId}>
        {section.title}
      </h3>

      {#if section.links && section.links.length > 0}
        <ul class="gem-c-related-navigation__link-list">
          {#each section.links as link}
            <li class="gem-c-related-navigation__list-item">
              <a class="gem-c-related-navigation__link" href={link.path}>
                {link.text}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </nav>
  {/each}
</div>

<style>
  /* Based on _contextual-sidebar.scss */
  .gem-c-related-navigation {
    border-top: 2px solid #1d70b8; /* $govuk-border-colour */
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
    margin-bottom: 20px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__main-heading {
      font-size: 1.5rem; /* 24px */
      line-height: 1.25;
    }
  }

  .gem-c-related-navigation__nav-section {
    margin-bottom: 30px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__nav-section {
      margin-bottom: 50px;
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
    font-size: 0.875rem; /* 14px */
    line-height: 1.42857;
    margin-bottom: 10px;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__sub-heading {
      font-size: 1rem; /* 16px */
      line-height: 1.25;
    }
  }

  .gem-c-related-navigation__link-list {
    font-family: "GDS Transport", Arial, sans-serif; /* $govuk-font-family */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 0.875rem; /* 14px */
    line-height: 1.42857;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 40.0625em) {
    /* $govuk-breakpoint-tablet */
    .gem-c-related-navigation__link-list {
      font-size: 1rem; /* 16px */
      line-height: 1.25;
    }
  }

  .gem-c-related-navigation__list-item {
    margin-bottom: 10px;
    border-bottom: 1px solid #bfc1c3; /* $govuk-border-colour */
    padding-bottom: 10px;
  }

  .gem-c-related-navigation__list-item:last-child {
    margin-bottom: 0;
    border-bottom: 0;
    padding-bottom: 0;
  }

  .gem-c-related-navigation__link {
    color: #1d70b8; /* $govuk-link-colour */
    text-decoration: underline;
  }

  .gem-c-related-navigation__link:visited {
    color: #4c2c92; /* $govuk-link-visited-colour */
  }

  .gem-c-related-navigation__link:hover {
    color: #003078; /* $govuk-link-hover-colour */
  }

  .gem-c-related-navigation__link:focus {
    outline: 3px solid rgba(0, 0, 0, 0); /* $govuk-focus-width */
    color: #0b0c0c; /* $govuk-focus-text-colour */
    background-color: #ffdd00; /* $govuk-focus-colour */
    box-shadow:
      0 -2px #ffdd00,
      0 4px #0b0c0c; /* $govuk-focus-colour, $govuk-focus-text-colour */
    text-decoration: none;
  }
</style>
