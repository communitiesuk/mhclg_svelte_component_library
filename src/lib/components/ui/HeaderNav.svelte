<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

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
  } = $props<{
    serviceName?: string;
    homeHref?: string;
    navigationItems: NavigationItem[];
    currentSection?: string;
  }>();

  // Track mobile nav state
  let mobileNavOpen = $state(false);

  // Toggle mobile navigation
  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
  }

  // Emit custom event for mobile nav toggle
  const dispatch = createEventDispatcher<{
    toggleMobileNav: boolean;
  }>();

  $effect(() => {
    dispatch("toggleMobileNav", mobileNavOpen);
  });

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

<nav class="app-navigation govuk-clearfix" aria-label="main" role="navigation">
  <div class="app-width-container">
    <div class="app-navigation__header">
      <div class="app-navigation__service-name">
        <a href={homeHref} class="app-navigation__service-link">
          {serviceName}
        </a>
      </div>
      <div class="app-mobile-nav-toggler-wrapper">
        <button
          id="app-mobile-nav-toggler"
          class="app-mobile-nav-toggler {mobileNavOpen
            ? 'app-mobile-nav-toggler--active'
            : ''}"
          aria-controls="app-mobile-nav"
          aria-expanded={mobileNavOpen}
          on:click={toggleMobileNav}
        >
          Menu
        </button>
      </div>
    </div>
    <ul class="app-navigation__list">
      {#each navigationItems as item}
        <li
          class="app-navigation__list-item {item.current
            ? 'app-navigation__list-item--current'
            : ''}"
        >
          <a
            class="govuk-link govuk-link--no-visited-state app-navigation__link"
            href={item.href}
            data-topnav={item.text}
            aria-current={item.current ? "page" : undefined}
          >
            {item.text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  /* Navigation styles */
  .app-navigation {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    box-sizing: border-box;
    width: 100%;
    background-color: #f8f8f8;
  }

  .app-navigation__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #f8f8f8;
    border-top: 10px solid #1d70b8;
    border-bottom: 1px solid #b1b4b6;
  }

  .app-navigation__service-name {
    font-weight: 700;
    font-size: 1.125rem;
  }

  .app-navigation__service-link {
    text-decoration: none;
    color: #0b0c0c;
  }

  @media print {
    .app-navigation {
      font-family: sans-serif;
    }
  }

  @media (min-width: 40.0625em) {
    .app-navigation {
      font-size: 1.1875rem;
      line-height: 1.31579;
    }
  }

  @media print {
    .app-navigation {
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  @media (max-width: 40.0525em) {
    .app-navigation__list {
      display: none;
    }
  }

  .app-navigation__list {
    position: relative;
    left: -15px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .app-navigation__list-item {
    box-sizing: border-box;
    display: block;
    position: relative;
    height: 50px;
    padding: 0 15px;
    float: left;
    line-height: 50px;
    margin: 0;
  }

  .app-navigation__list-item--selected,
  .app-navigation__list-item--current {
    border-bottom: 4px solid #4c2c92;
  }

  .app-navigation__link {
    font-weight: bold;
    text-decoration: none;
  }

  .app-navigation__link:not(:focus):hover {
    color: #4c2c92;
    text-decoration: underline;
  }

  .app-navigation__link:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .app-navigation__list-item--current .app-navigation__link:hover {
    text-decoration: none;
  }

  /* Mobile toggle button */
  .app-mobile-nav-toggler-wrapper {
    display: block;
  }

  .app-mobile-nav-toggler {
    display: inline-block;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: #1d70b8;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    font-family: Helvetica, Arial, sans-serif;
  }

  .app-mobile-nav-toggler::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-top-color: currentColor;
    border-width: 5px 5px 0 5px;
    margin-left: 5px;
    vertical-align: middle;
  }

  .app-mobile-nav-toggler--active::after {
    border-width: 0 5px 5px 5px;
    border-top-color: transparent;
    border-bottom-color: currentColor;
  }

  @media (min-width: 40.0625em) {
    .app-mobile-nav-toggler {
      display: none;
    }
  }
</style>
