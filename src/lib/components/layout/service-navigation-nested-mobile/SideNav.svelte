<script lang="ts">
  import { page } from "$app/state";

  export type SideNavItem = {
    text: string;
    href: string;
    current?: boolean;
    subItems?: { text: string; href: string }[];
  };

  export type SideNavGroup = {
    title?: string;
    items: SideNavItem[];
  };

  let {
    title = "Pages in this section",
    items = $bindable([] as SideNavItem[]), // For a flat list of navigation items
    groups = $bindable([] as SideNavGroup[]), // For grouped sections of navigation items
    currentItem = $bindable(""), // Tracks the href of the currently active item/subItem
    activeItemBackgroundColor = $bindable("transparent"),
  } = $props<{
    title?: string;
    items?: SideNavItem[];
    groups?: SideNavGroup[];
    currentItem?: string;
    activeItemBackgroundColor?: string;
  }>();

  // Determines if a navigation item or its sub-item is currently active
  function calculateIsActive(
    item: SideNavItem,
    currentHref: string,
    currentPath: string,
    resolvedActiveIdentifier: string,
  ): boolean {
    const isParentOfActiveSubItem = !!(
      item.subItems && item.subItems.some((sub) => sub.href === currentHref)
    );
    return (
      item.href === currentHref ||
      isParentOfActiveSubItem ||
      item.href === currentPath ||
      (currentPath.endsWith("/" + resolvedActiveIdentifier) &&
        item.text.toLowerCase() === resolvedActiveIdentifier.toLowerCase())
    );
  }

  // Effect to reactively update the 'current' state of items based on URL or currentItem prop changes
  $effect(() => {
    const path = page.url.pathname;
    const activeItemFromPath = path.split("/").pop() || "";
    const resolvedActiveItemIdentifier = currentItem || activeItemFromPath;

    const updateItemCurrentState = (item: SideNavItem) => ({
      ...item,
      current: calculateIsActive(
        item,
        currentItem,
        path,
        resolvedActiveItemIdentifier,
      ),
    });

    items = items.map(updateItemCurrentState);

    groups = groups.map((group) => ({
      ...group,
      items: group.items.map(updateItemCurrentState),
    }));
  });
</script>

{#snippet navItem(item: SideNavItem)}
  <!-- Reusable snippet for rendering a single navigation item and its potential sub-items -->
  
  <!-- Represents a single item in the navigation list -->
  <li
    class="app-subnav__section-item {item.current
      ? 'app-subnav__section-item--current app-subnav__section-item--bold app-subnav__section-item--top'
      : ''}"
    style={item.current
      ? `background-color: ${activeItemBackgroundColor};`
      : ""}
  >
    <!-- The clickable link for the navigation item -->
    <a
      class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
      href={item.href}
      aria-current={item.current ? "location" : undefined}
      onclick={() => {
        if (item.href) {
          currentItem = item.href;
        }
      }}
    >
      {item.text}
    </a>

    {#if item.current && item.subItems && item.subItems.length > 0}
      <!-- Nested list for sub-items of the current active item -->
      <ul class="app-subnav__section app-subnav__section--nested">
        {#each item.subItems as subItem (subItem.href)}
          <li class="app-subnav__section-item">
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              class:app-subnav__link--bold={subItem.href.split("#")[1] ===
                page.url.hash.substring(1)}
              href={subItem.href}
              onclick={() => {
                if (subItem.href) {
                  currentItem = subItem.href;
                }
              }}
            >
              {subItem.text}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </li>
{/snippet}

<div class="app-pane__subnav">
  <!-- Main container for the side navigation -->
  <nav class="app-subnav" aria-labelledby="app-subnav-heading">
    <h2 class="govuk-visually-hidden" id="app-subnav-heading">
      {title}
    </h2>

    {#if items.length > 0}
      <!-- Renders the flat list of items, if provided -->
      <ul class="app-subnav__section">
        {#each items as item (item.href)}
          {@render navItem(item)}
        {/each}
      </ul>
    {/if}

    {#each groups as group (group.title || group.items[0]?.href)}
      <!-- Renders grouped sections of items -->
      {#if group.title}
        <h3 class="app-subnav__theme">{group.title}</h3>
      {/if}
      <ul class="app-subnav__section">
        {#each group.items as item (item.href)}
          {@render navItem(item)}
        {/each}
      </ul>
    {/each}
  </nav>
</div>

<style>
  .app-subnav {
    margin-bottom: 100px;
    padding: 30px 15px 0 0;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.14286;
  }

  @media print {
    .app-subnav {
      font-family: sans-serif;
    }
  }

  @media (min-width: 40.0625em) {
    .app-subnav {
      font-size: 1rem;
      line-height: 1.25;
    }
  }

  @media print {
    .app-subnav {
      font-size: 14pt;
      line-height: 1.2;
    }
  }

  .app-subnav__section {
    margin: 0 0 20px;
    padding: 0;
    list-style-type: none;
  }

  .app-subnav__link {
    padding: 2px 0;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.14286;
  }

  @media print {
    .app-subnav__link {
      font-family: sans-serif;
    }
  }

  @media (min-width: 40.0625em) {
    .app-subnav__link {
      font-size: 1rem;
      line-height: 1.25;
    }
  }

  @media print {
    .app-subnav__link {
      font-size: 14pt;
      line-height: 1.2;
    }
  }

  .app-subnav__link:not(:focus):hover {
    color: #1a65a6;
  }

  .app-subnav__section-item {
    position: relative;
    margin-bottom: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .app-subnav__section-item--current {
    margin-left: -19px;
    padding-left: 15px;
    border-left: 4px solid #1a65a6;
    background-color: #f8f8f8;
  }

  .app-subnav__section-item--bold .app-subnav__link {
    font-weight: bold;
  }

  .app-subnav__section-item--top .app-subnav__link {
    position: relative;
    z-index: 2;
  }

  .app-subnav__section--nested {
    margin-top: 10px;
    margin-bottom: 0;
    padding-left: 20px;
  }

  .app-subnav__section--nested .app-subnav__section-item::before {
    margin-left: -20px;
    color: #505a5f;
    content: "—";
  }

  .app-subnav__section--nested .app-subnav__link {
    padding-left: 0;
    font-weight: normal;
  }

  .app-subnav__section--nested .app-subnav__link--bold {
    padding-left: 0;
    font-weight: bold;
  }

  .app-subnav__theme {
    margin: 0;
    padding: 10px 15px 10px 0;
    color: #505a5f;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
  }

  @media print {
    .app-subnav__theme {
      font-family: sans-serif;
    }
  }

  @media (min-width: 40.0625em) {
    .app-subnav__theme {
      font-size: 1.1875rem;
      line-height: 1.31579;
    }
  }

  @media print {
    .app-subnav__theme {
      font-size: 14pt;
      line-height: 1.15;
    }
  }
</style>
