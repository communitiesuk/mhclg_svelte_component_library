<script lang="ts">
  import { onMount } from "svelte";

  // Types for navigation items
  export type SubNavItem = {
    text: string;
    href: string;
    current?: boolean; // Will be determined by activeDetailHref
  };

  export type NavItem = {
    text: string;
    href: string;
    current?: boolean; // Will be set based on activeDetailHref
    description?: string;
  };

  export type NavSection = {
    title: string;
    href?: string; // Optional: Href for the main section link itself
    current?: boolean; // Will be determined by activeSectionHref
    items: (
      | SubNavItem
      | {
          // Represents a group within a section
          title?: string;
          items: SubNavItem[];
        }
    )[];
  };

  // Component props
  let {
    isOpen = false,
    sections = [] as NavSection[],
    activeSectionHref = "", // Href for the active section header, e.g. /components
    activeDetailHref = "", // Href for the detailed active item, e.g. /components/x/y#z
    currentSection = "", // Text name for initial expansion
    onNavigate = (href: string, event?: MouseEvent) => {},
  } = $props<{
    isOpen?: boolean;
    sections?: NavSection[];
    activeSectionHref?: string;
    activeDetailHref?: string;
    currentSection?: string;
    onNavigate?: (href: string, event?: MouseEvent) => void;
  }>();

  // Track which sections are expanded
  let expandedSections = $state<Record<string, boolean>>({});

  // Toggle a section's expanded state
  function toggleSection(sectionTitle: string) {
    expandedSections[sectionTitle] = !expandedSections[sectionTitle];
  }

  // Initialise expanded sections based on currentSection prop (text match)
  $effect(() => {
    if (currentSection) {
      const newExpandedState: Record<string, boolean> = {};
      for (const section of sections) {
        newExpandedState[section.title] = section.title === currentSection;
      }
      expandedSections = newExpandedState;
    }
  });

  // Effect to update .current states based on href props
  $effect(() => {
    for (const section of sections) {
      // Highlight section header if its href matches activeSectionHref
      section.current = !!section.href && section.href === activeSectionHref;

      for (const item of section.items) {
        if ("items" in item && Array.isArray(item.items)) {
          // This is a group of SubNavItems
          for (const subItem of item.items) {
            subItem.current = subItem.href === activeDetailHref;
          }
        } else if ("href" in item) {
          // This is a direct SubNavItem
          (item as SubNavItem).current =
            (item as SubNavItem).href === activeDetailHref;
        }
      }
    }
    // To ensure reactivity when sections array itself changes structure or items are added/removed.
    // This is a common pattern to trigger updates if the array reference changes.
    sections = [...sections];
  });

  // Function to determine if a section is expanded
  function isSectionExpanded(sectionTitle: string): boolean {
    return !!expandedSections[sectionTitle];
  }

  // When a navigation happens, call the onNavigate prop
  function handleNavigate(href: string, event: MouseEvent) {
    if (!event.defaultPrevented) {
      onNavigate(href, event);
    }
  }
</script>

<nav
  id="app-mobile-nav"
  class:app-mobile-nav={true}
  class:js-app-mobile-nav={true}
  class:app-mobile-nav--active={isOpen}
  aria-label="mobile navigation"
  aria-hidden={!isOpen}
>
  <div class="app-mobile-nav__wrapper">
    <ul class="app-mobile-nav__list">
      {#each sections as section (section.title)}
        <li class="app-mobile-nav__section">
          <div class="app-mobile-nav__section-header">
            <a
              href={section.href || "#"}
              class="app-mobile-nav__section-link"
              class:app-mobile-nav__section-link--current={section.current}
              onclick={(event) => {
                event.preventDefault();
                toggleSection(section.title);
              }}
            >
              {section.title}
            </a>
          </div>

          <ul
            class="app-mobile-nav__list app-mobile-nav__section-items"
            class:app-mobile-nav__section-items--active={isSectionExpanded(
              section.title,
            )}
            aria-label={section.title}
          >
            {#each section.items as item, i (i)}
              {#if "items" in item && Array.isArray(item.items)}
                <!-- Grouped items with title -->
                <li class="app-mobile-nav__group">
                  {#if item.title}
                    <h2 class="app-mobile-nav__group-title">{item.title}</h2>
                  {/if}
                  <ul class="app-mobile-nav__list">
                    {#each item.items as subItem, k (k)}
                      <li>
                        <a
                          class="app-mobile-nav__link"
                          class:app-mobile-nav__link--current={subItem.current}
                          href={subItem.href}
                          onclick={(e) => handleNavigate(subItem.href, e)}
                        >
                          {subItem.text}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </li>
              {:else if "href" in item && "text" in item}
                <!-- Single navigation item -->
                {@const navItem = item as SubNavItem}
                <li>
                  <a
                    class="app-mobile-nav__link"
                    class:app-mobile-nav__link--current={navItem.current}
                    href={navItem.href}
                    onclick={(e) => handleNavigate(navItem.href, e)}
                  >
                    {navItem.text}
                  </a>
                </li>
              {/if}
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .app-mobile-nav {
    display: none;
    border-bottom: 1px solid #b1b4b6;
    background-color: #f8f8f8;
  }

  .app-mobile-nav--active {
    display: block;
  }

  @media (min-width: 40.0625em) {
    .app-mobile-nav--active {
      display: none;
    }
  }

  .app-mobile-nav__wrapper {
    padding: 0;
  }

  .app-mobile-nav__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .app-mobile-nav__section {
    border-bottom: 1px solid #f3f2f1;
  }

  .app-mobile-nav__section-header {
    display: block;
    background-color: #f3f2f1;
    font-weight: 700;
  }

  .app-mobile-nav__section-link {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: #1d70b8;
    font-weight: 700;
  }

  .app-mobile-nav__section-link--current {
    /* border-left: 4px solid #1d70b8; */
    padding-left: 11px;
  }

  .app-mobile-nav__section-items {
    display: none;
    background-color: #fff;
  }

  .app-mobile-nav__section-items--active {
    display: block;
  }

  .app-mobile-nav__link {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: #1d70b8;
  }

  .app-mobile-nav__link--current {
    border-left: 4px solid #1d70b8;
    padding-left: 11px;
    /* background-color: #f3f2f1; */
  }

  .app-mobile-nav__group-title {
    margin: 0;
    padding: 15px 15px 5px 15px;
    color: #505a5f;
    font-size: 19px;
    font-weight: normal;
    font-family: Helvetica, Arial, sans-serif;
  }
</style>
