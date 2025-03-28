<script lang="ts">
  import { onMount } from "svelte";

  // Define the navigation item type
  export type SideNavItem = {
    text: string;
    href: string;
    current?: boolean;
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
  } = $props<{
    title?: string;
    items?: SideNavItem[];
    groups?: SideNavGroup[];
    currentItem?: string;
  }>();

  // Mark current item based on currentItem prop
  $effect(() => {
    if (currentItem) {
      // Update current property on items
      items = items.map((item) => ({
        ...item,
        current: item.text === currentItem || item.href === currentItem,
      }));

      // Update current property on grouped items
      groups = groups.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
          ...item,
          current: item.text === currentItem || item.href === currentItem,
        })),
      }));
    }
  });
</script>

<div class="app-pane__subnav">
  <nav
    class="app-subnav"
    aria-labelledby="app-subnav-heading"
    role="navigation"
  >
    <h2 class="govuk-visually-hidden" id="app-subnav-heading">
      {title}
    </h2>

    <!-- Single list of items (not grouped) -->
    {#if items.length > 0}
      <ul class="app-subnav__section">
        {#each items as item}
          <li
            class="app-subnav__section-item {item.current
              ? 'app-subnav__section-item--current'
              : ''}"
          >
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              href={item.href}
            >
              {item.text}
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <!-- Grouped items with titles -->
    {#each groups as group}
      {#if group.title}
        <h3 class="app-subnav__theme">{group.title}</h3>
      {/if}
      <ul
        class="app-subnav__section {group.title
          ? 'app-subnav__section--nested'
          : ''}"
      >
        {#each group.items as item}
          <li
            class="app-subnav__section-item {item.current
              ? 'app-subnav__section-item--current'
              : ''}"
          >
            <a
              class="govuk-link govuk-link--no-visited-state govuk-link--no-underline app-subnav__link"
              href={item.href}
            >
              {item.text}
            </a>
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
    color: #513184;
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
    border-left: 4px solid #4c2c92;
    background-color: #f8f8f8;
  }

  .app-subnav__section-item--current .app-subnav__link {
    font-weight: bold;
  }

  .app-subnav__section-item--top .app-subnav__link {
    position: relative;
    z-index: 2;
  }

  .app-subnav__section-item--top:after {
    content: "";
    display: block;
    padding-left: 15px;
    border-left: 4px solid #4c2c92;
    background-color: #f8f8f8;
    position: absolute;
    top: 0;
    left: -19px;
    width: 100%;
    height: 35px;
  }

  .app-subnav__section-item--bold .app-subnav__link {
    font-weight: bold;
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
