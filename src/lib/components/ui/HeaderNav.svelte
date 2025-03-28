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
    productName = "Design System",
    homeHref = "/",
    logoText = "DWP",
    navigationItems = [],
    currentSection = $bindable(""),
  } = $props<{
    productName?: string;
    homeHref?: string;
    logoText?: string;
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

<header class="govuk-header app-header">
  <div
    class="govuk-header__container app-width-container app-header__container"
  >
    <div class="govuk-header__logo app-header__logo">
      <a
        href={homeHref}
        class="govuk-header__link govuk-header__link--homepage"
      >
        <span class="govuk-header__logotype">
          <span class="govuk-header__logotype-text">{logoText}</span>
        </span>
        <span class="govuk-header__product-name">{productName}</span>
      </a>
    </div>
    <div class="app-header-mobile-nav-toggler-wrapper">
      <button
        id="app-mobile-nav-toggler"
        class="govuk-button app-header-mobile-nav-toggler {mobileNavOpen
          ? 'app-header-mobile-nav-toggler--active'
          : ''}"
        aria-controls="app-mobile-nav"
        aria-expanded={mobileNavOpen}
        on:click={toggleMobileNav}
      >
        Menu
      </button>
    </div>
  </div>
</header>

<nav class="app-navigation govuk-clearfix" aria-label="main" role="navigation">
  <ul class="app-navigation__list app-width-container">
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
</nav>

<style>
  /* Navigation styles */
  .app-navigation {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.25;
    box-sizing: border-box;
    width: 100%;
    background-color: #f8f8f8;
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
    .app-navigation {
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

  /* Header styles */
  .app-header {
    border-bottom: 10px solid #00625e;
  }

  .app-header__container {
    margin-bottom: 0;
    border-bottom: 0;
  }

  .app-header__logo {
    display: inline;
    float: left;
  }

  @media (min-width: 40.0625em) {
    .app-header__logo {
      width: 100%;
      display: block;
    }
  }

  .app-header-mobile-nav-toggler-wrapper {
    margin-top: -10px;
    display: block;
    float: right;
  }

  .app-header-mobile-nav-toggler {
    display: none;
    min-height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-right: 5px;
    padding-left: 5px;
    border: 1px solid #505a5f;
    color: #000;
    background-color: #fff;
    box-shadow: none;
    font-size: 1rem;
  }

  .app-header-mobile-nav-toggler:hover {
    background-color: #f3f2f1;
  }

  .app-header-mobile-nav-toggler::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-top-color: currentColor;
    border-width: 5px 5px 0 5px;
    margin-left: 5px;
  }

  .app-header-mobile-nav-toggler--active::after {
    border-width: 0 5px 5px 5px;
    border-top-color: transparent;
    border-bottom-color: currentColor;
  }

  @media (max-width: 40.0525em) {
    .app-header-mobile-nav-toggler {
      display: inline;
    }
  }
</style>
