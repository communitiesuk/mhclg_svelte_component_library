<script lang="ts">
  export type SideNavItem = {
    text: string;
    href: string;
    subItems?: { text: string; href: string }[];
  };

  export type SideNavGroup = {
    title?: string;
    items: SideNavItem[]; // Items here won't have their .current property mutated by this component
  };

  let {
    title = "Pages in this section",
    items = $bindable([] as SideNavItem[]),
    groups = $bindable([] as SideNavGroup[]),
    currentItem = $bindable(""), // This prop is the SOLE driver for active state
    activeItemBackgroundColor = $bindable("transparent"),
  } = $props<{
    title?: string;
    items?: SideNavItem[];
    groups?: SideNavGroup[];
    currentItem?: string; // Value from parent, or updated by internal clicks
    activeItemBackgroundColor?: string;
  }>();

  // Simplified calculateIsActive: relies only on the item and the currentItem prop
  function calculateIsActive(
    item: { href: string; subItems?: { href: string }[] }, // Simplified type for this function's direct needs
    activePropValue: string | undefined,
  ): boolean {
    if (!activePropValue) {
      return false; // If currentItem prop is not set, nothing is active by it
    }

    // Check 1: Direct match with item's href
    if (item.href === activePropValue) {
      return true;
    }

    // Check 2: If activePropValue is a sub-item of this item
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.href === activePropValue) {
          return true; // Parent item is active because its sub-item is the active one
        }
      }
    }

    // Check 3: If item.href is the base path of activePropValue (when activePropValue has a hash)
    // e.g., activePropValue="/page#section1", item.href="/page"
    const activePropBasePath = activePropValue.split("#")[0];
    if (item.href === activePropBasePath && activePropValue.includes("#")) {
      return true;
    }

    return false;
  }
</script>

{#snippet navItem(item: SideNavItem, activeGlobalItem: string)}
  {@const isActive = calculateIsActive(item, activeGlobalItem)}
  <li
    class="app-subnav__section-item {isActive
      ? 'app-subnav__section-item--current app-subnav__section-item--bold app-subnav__section-item--top'
      : ''}"
    style={isActive ? `background-color: ${activeItemBackgroundColor};` : ""}
  >
    <a
      class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
      href={item.href}
      aria-current={isActive ? "location" : undefined}
    >
      {item.text}
    </a>

    {#if isActive && item.subItems && item.subItems.length > 0}
      <!-- Nested list for sub-items of the current active item -->
      <ul class="app-subnav__section app-subnav__section--nested">
        {#each item.subItems as subItem (subItem.href)}
          {@const isSubActive = subItem.href === activeGlobalItem}
          <li class="app-subnav__section-item">
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              class:app-subnav__link--bold={isSubActive}
              href={subItem.href}
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
          {@render navItem(item, currentItem)}
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
          {@render navItem(item, currentItem)}
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
