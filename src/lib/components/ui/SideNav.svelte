<script lang="ts">
  import { page } from "$app/stores";

  // Define the navigation item type
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

  // Component props
  let {
    title = "Pages in this section",
    items = [],
    groups = [],
    currentItem = $bindable(""),
    activeItemBackgroundColor = $bindable("transparent"),
  } = $props<{
    title?: string;
    items?: SideNavItem[];
    groups?: SideNavGroup[];
    currentItem?: string;
    activeItemBackgroundColor?: string;
  }>();

  // Handle URL path to determine current active item
  $effect(() => {
    const path = $page?.url?.pathname || "";

    // Check if currentItem is set or derive from URL path
    const activeItem = currentItem || path.split("/").pop() || "";

    // Update current property on items
    items = items.map((item) => {
      // Check if the current URL path includes this item's path
      const isActive =
        item.href === path ||
        path.includes(item.href) ||
        item.text.toLowerCase() === activeItem.toLowerCase();
      return {
        ...item,
        current: isActive,
      };
    });

    // Update current property on grouped items
    groups = groups.map((group) => ({
      ...group,
      items: group.items.map((item) => {
        // Check if the current URL path includes this item's path
        const isActive =
          item.href === path ||
          path.includes(item.href) ||
          item.text.toLowerCase() === activeItem.toLowerCase();
        return {
          ...item,
          current: isActive,
        };
      }),
    }));
  });
</script>

<div class="app-pane__subnav">
  <nav class="app-subnav" aria-labelledby="app-subnav-heading">
    <h2 class="govuk-visually-hidden" id="app-subnav-heading">
      {title}
    </h2>

    <!-- Single list of items (not grouped) -->
    {#if items.length > 0}
      <ul class="app-subnav__section">
        {#each items as item}
          <li
            class="app-subnav__section-item {item.current
              ? 'app-subnav__section-item--current app-subnav__section-item--bold app-subnav__section-item--top'
              : ''}"
            style={item.current
              ? `background-color: ${activeItemBackgroundColor};`
              : ""}
          >
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              href={item.href}
              aria-current={item.current ? "location" : undefined}
            >
              {item.text}
            </a>

            {#if item.current && item.subItems && item.subItems.length > 0}
              <ul class="app-subnav__section app-subnav__section--nested">
                {#each item.subItems as subItem}
                  <li class="app-subnav__section-item">
                    <a
                      class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
                      class:app-subnav__link--bold={subItem.href.split(
                        "#",
                      )[1] === $page.url.hash.substring(1)}
                      href={subItem.href}
                    >
                      {subItem.text}
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}

    <!-- Grouped items with titles -->
    {#each groups as group}
      {#if group.title}
        <h3 class="app-subnav__theme">{group.title}</h3>
      {/if}
      <ul class="app-subnav__section">
        {#each group.items as item}
          <li
            class="app-subnav__section-item {item.current
              ? 'app-subnav__section-item--current app-subnav__section-item--bold app-subnav__section-item--top'
              : ''}"
            style={item.current
              ? `background-color: ${activeItemBackgroundColor};`
              : ""}
          >
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              href={item.href}
              aria-current={item.current ? "location" : undefined}
            >
              {item.text}
            </a>

            {#if item.current && item.subItems && item.subItems.length > 0}
              <ul class="app-subnav__section app-subnav__section--nested">
                {#each item.subItems as subItem}
                  <li class="app-subnav__section-item">
                    <a
                      class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
                      class:app-subnav__link--bold={subItem.href.split(
                        "#",
                      )[1] === $page.url.hash.substring(1)}
                      href={subItem.href}
                    >
                      {subItem.text}
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
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

  /* Only apply dash/hyphen to nested items */
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
