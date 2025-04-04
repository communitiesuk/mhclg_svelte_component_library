<script lang="ts">
  import { onMount } from "svelte";

  // Define navigation item type
  export type NavigationItem = {
    text: string;
    href: string;
    current?: boolean;
  };

  // Component props
  let {
    serviceName = "Service name",
    homeHref = "/",
    navigationItems = [],
    currentSection = $bindable(""),
    mobileNavIsOpen = false, // Receive open state from parent
    onToggle, // Callback function prop
  } = $props<{
    serviceName?: string;
    homeHref?: string;
    navigationItems: NavigationItem[];
    currentSection?: string;
    mobileNavIsOpen?: boolean; // Prop to receive state
    onToggle: () => void; // Callback function prop
  }>();

  // Check whether current section is set
  $effect(() => {
    // Update current property on nav items when currentSection changes
    if (currentSection) {
      navigationItems = navigationItems.map((item) => ({
        ...item,
        current: item.text === currentSection,
      }));
    }
  });
</script>

<nav class="govuk-service-navigation" aria-label="main">
  <div class="govuk-width-container">
    <div class="govuk-service-navigation__container">
      <span class="govuk-service-navigation__service-name">
        <a href={homeHref} class="govuk-service-navigation__link">
          {serviceName}
        </a>
      </span>

      <!-- Desktop navigation -->
      <ul class="govuk-service-navigation__list">
        {#each navigationItems as item}
          <li
            class="govuk-service-navigation__item {item.current
              ? 'govuk-service-navigation__item--active'
              : ''}"
          >
            <a
              class="govuk-service-navigation__link"
              href={item.href}
              data-topnav={item.text}
              aria-current={item.current ? "page" : undefined}
            >
              {item.text}
            </a>
          </li>
        {/each}
      </ul>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
        aria-controls="app-mobile-nav"
        aria-expanded={mobileNavIsOpen}
        onclick={onToggle}
      >
        Menu
      </button>
    </div>
  </div>
</nav>

<style>
  /* Only add styles that are not covered by the govuk CSS */
  @media (min-width: 40.0625em) {
    .govuk-service-navigation__toggle {
      display: none;
    }
  }

  @media (max-width: 40.0525em) {
    .govuk-service-navigation__list {
      display: none;
    }

    .govuk-service-navigation__toggle {
      padding: 5px 10px;
      background-color: #ffdd00;
      margin-bottom: 5px;
    }
  }
</style>
