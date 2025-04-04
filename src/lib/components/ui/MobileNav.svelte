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
    isOpen = false, // Use isOpen directly, no binding
    sections = [],
    currentSection = "",
    onNavigate, // Add onNavigate prop
  } = $props<{
    isOpen?: boolean;
    sections: NavSection[];
    currentSection?: string;
    onNavigate: (href: string) => void; // Define prop type
  }>();

  // Track which sections are expanded
  let expandedSections = $state<Record<string, boolean>>({});

  // Toggle a section's expanded state
  function toggleSection(sectionTitle: string) {
    expandedSections[sectionTitle] = !expandedSections[sectionTitle];
  }
  
  // Initialise expanded sections based on current section
  $effect(() => {
    if (currentSection) {
      sections.forEach((section) => {
        if (section.title === currentSection) {
          expandedSections[section.title] = true;
        } else {
          // Ensure other sections are collapsed when the current section changes
          expandedSections[section.title] = false;
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

  // When a navigation happens, dispatch event - MODIFIED
  function handleNavigate(href: string, event: MouseEvent) {
    // Only handle clicks if not prevented already (e.g. by router)
    if (!event.defaultPrevented) {
      // dispatch("navigate", href); // Remove dispatch
      onNavigate(href); // Call the prop instead
    }
  }
</script>

<nav
  id="app-mobile-nav"
  class="app-mobile-nav js-app-mobile-nav {isOpen
    ? 'app-mobile-nav--active'
    : ''}"
  aria-label="mobile navigation"
  aria-hidden={!isOpen}
>
  <div class="app-mobile-nav__wrapper">
    <ul class="app-mobile-nav__list">
      {#each sections as section}
        <li class="app-mobile-nav__section">
          <div class="app-mobile-nav__section-header">
            <a
              href={section.href}
              class="app-mobile-nav__section-link {section.current
                ? 'app-mobile-nav__section-link--current'
                : ''}"
              onclick={(event) => {
                event.preventDefault(); // Call preventDefault explicitly
                toggleSection(section.title);
              }}
            >
              {section.title}
            </a>
          </div>

          <ul
            class="app-mobile-nav__list app-mobile-nav__section-items {isSectionExpanded(
              section.title,
            )
              ? 'app-mobile-nav__section-items--active'
              : ''}"
            aria-label={section.title}
          >
            {#each section.items as item}
              {#if "title" in item && "items" in item && Array.isArray(item.items)}
                <!-- Grouped items with title -->
                <li class="app-mobile-nav__group">
                  {#if item.title}
                    <h2 class="app-mobile-nav__group-title">{item.title}</h2>
                  {/if}
                  <ul class="app-mobile-nav__list">
                    {#each item.items as subItem}
                      <li>
                        <a
                          class="app-mobile-nav__link {isCurrent(subItem)
                            ? 'app-mobile-nav__link--current'
                            : ''}"
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
                <li>
                  <a
                    class="app-mobile-nav__link {isCurrent(item)
                      ? 'app-mobile-nav__link--current'
                      : ''}"
                    href={item.href}
                    onclick={(e) => handleNavigate(item.href, e)}
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
    border-left: 4px solid #1d70b8;
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
    background-color: #f3f2f1;
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
