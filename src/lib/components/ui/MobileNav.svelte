<script lang="ts">
  import { onMount } from "svelte";

  // Types for navigation items
  export type SubNavItem = {
    text: string;
    href: string;
    current?: boolean;
  };

  export type NavSection = {
    title: string;
    href: string;
    current?: boolean;
    items: (
      | SubNavItem
      | {
          title?: string;
          items: SubNavItem[];
        }
    )[];
  };

  // Component props
  let {
    isOpen = $bindable(false),
    sections = [],
    currentSection = "",
  } = $props<{
    isOpen?: boolean;
    sections: NavSection[];
    currentSection?: string;
  }>();

  // Track which sections are expanded
  let expandedSections = $state<Record<string, boolean>>({});

  // Toggle a section's expanded state
  function toggleSection(sectionTitle: string) {
    expandedSections[sectionTitle] = !expandedSections[sectionTitle];
  }

  // Initialize expanded sections based on current section
  $effect(() => {
    if (currentSection) {
      sections.forEach((section) => {
        if (section.title === currentSection) {
          expandedSections[section.title] = true;
        }
      });
    }
  });

  // Function to determine if a section is expanded
  function isSectionExpanded(sectionTitle: string): boolean {
    return !!expandedSections[sectionTitle];
  }

  // Check if a section or item is the current one
  function isCurrent(item: { title?: string; current?: boolean }): boolean {
    return !!item.current || item.title === currentSection;
  }
</script>

<nav
  id="app-mobile-nav"
  class="app-mobile-nav js-app-mobile-nav {isOpen
    ? 'app-mobile-nav--active'
    : ''}"
  aria-label="main"
  role="navigation"
  aria-hidden={!isOpen}
>
  <ul class="app-mobile-nav__list">
    {#each sections as section}
      <li>
        <div
          class="app-mobile-nav-subnav-toggler {isCurrent(section)
            ? 'app-mobile-nav__subnav-toggler--active'
            : ''}"
        >
          <a
            class="govuk-link govuk-link--no-visited-state app-mobile-nav-subnav-toggler__link js-mobile-nav-subnav-toggler"
            href={section.href}
            id="js-mobile-nav-subnav-toggler-{section.title}"
            on:click|preventDefault={() => toggleSection(section.title)}
          >
            {section.title}
          </a>
        </div>
        <ul
          class="app-mobile-nav__list app-mobile-nav__subnav js-app-mobile-nav-subnav {isSectionExpanded(
            section.title,
          )
            ? 'app-mobile-nav__subnav--active'
            : ''}"
          aria-label={section.title}
        >
          <li
            class="app-mobile-nav__subnav-item {isCurrent(section)
              ? 'app-mobile-nav__subnav-item--current'
              : ''}"
          >
            <a
              class="govuk-link govuk-link--no-visited-state app-mobile-nav__link"
              href={section.href}
            >
              {section.title} overview
            </a>
          </li>

          {#each section.items as item}
            {#if "title" in item && "items" in item && Array.isArray(item.items)}
              <!-- Grouped items with title -->
              <li>
                <h2 class="app-mobile-nav__theme">{item.title}</h2>
                <ul class="app-mobile-nav__list">
                  {#each item.items as subItem}
                    <li
                      class="app-mobile-nav__subnav-item {isCurrent(subItem)
                        ? 'app-mobile-nav__subnav-item--current'
                        : ''}"
                    >
                      <a
                        class="govuk-link govuk-link--no-visited-state app-mobile-nav__link"
                        href={subItem.href}
                      >
                        {subItem.text}
                      </a>
                    </li>
                  {/each}
                </ul>
              </li>
            {:else if "href" in item && "text" in item}
              <!-- Single navigation item -->
              <li
                class="app-mobile-nav__subnav-item {isCurrent(item)
                  ? 'app-mobile-nav__subnav-item--current'
                  : ''}"
              >
                <a
                  class="govuk-link govuk-link--no-visited-state app-mobile-nav__link"
                  href={item.href}
                >
                  {item.text}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .app-mobile-nav {
    display: none;
    border-bottom: 1px solid #b1b4b6;
  }

  .app-mobile-nav--active {
    display: block;
  }

  @media (min-width: 40.0625em) {
    .app-mobile-nav--active {
      display: none;
    }
  }

  @media (max-width: 40.0525em) {
    .app-mobile-nav {
      display: block;
    }

    :global(.js-enabled) .app-mobile-nav {
      display: none;
    }

    :global(.js-enabled) .app-mobile-nav--active {
      display: block;
    }
  }

  .app-mobile-nav__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .app-mobile-nav-subnav-toggler {
    position: relative;
    padding: 16px 20px 17px 20px;
    background-color: #f3f2f1;
  }

  .app-mobile-nav-subnav-toggler__link {
    font-weight: 700;
    font-size: 19px;
    font-size: 1.1875rem;
  }

  .app-mobile-nav-subnav-toggler__link:not(:focus):hover {
    color: #513184;
  }

  .app-mobile-nav-subnav-toggler__link,
  .app-mobile-nav__link {
    text-decoration: none;
  }

  .app-mobile-nav-subnav-toggler__link:after,
  .app-mobile-nav__link:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .app-mobile-nav__subnav {
    display: none;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #f3f2f1;
    border-bottom: 1px solid #f3f2f1;
  }

  .app-mobile-nav__subnav--active {
    display: block;
  }

  .app-mobile-nav__section-item {
    position: relative;
  }

  .app-mobile-nav__subnav-item {
    display: block;
    position: relative;
    padding: 12px 20px;
  }

  .app-mobile-nav__subnav-item--current {
    padding-left: 16px;
    border-left: 4px solid #4c2c92;
  }

  .app-mobile-nav__theme {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 20px 20px 5px 20px;
    color: #505a5f;
    font-size: 19px;
    font-size: 1.1875rem;
    font-weight: normal;
  }

  @media print {
    .app-mobile-nav__theme {
      font-family: sans-serif;
    }
  }
</style>
