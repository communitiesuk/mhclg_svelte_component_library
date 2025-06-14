<!-- Service Navigation component 
Use the component with or without navigation items based on your needs. -->

<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // Define types for navigation items
  type NavigationItem = {
    href: string;
    label: string;
    isActive?: boolean;
  };

  let {
    serviceName = "Service name",
    serviceUrl = "#",
    navigationItems = undefined,
  } = $props<{
    serviceName?: string;
    serviceUrl?: string;
    navigationItems?: NavigationItem[];
  }>();

  // Reactive state declarations
  let hasNavigation = $derived(navigationItems && navigationItems.length > 0);
  let menuIsOpen = $state(false);
  let isDesktopView = $state(true); // Default to desktop view until we can check
  let tabletBreakpoint = $state("");

  // References to DOM elements
  let navigationElement = $state<HTMLElement | null>(null);
  let buttonElement = $state<HTMLButtonElement | null>(null);

  // Derived values for UI state
  let isMenuVisible = $derived(isDesktopView || menuIsOpen);
  let isButtonHidden = $derived(isDesktopView);

  onMount(() => {
    if (!browser) return;

    // Get the breakpoint from CSS custom property
    const property = "--govuk-frontend-breakpoint-tablet";
    const value = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();

    tabletBreakpoint = value || "768px";

    if (!value) {
      console.warn(
        "CSS custom property (--govuk-frontend-breakpoint-tablet) not found, using fallback",
      );
    }

    // Initialize media query
    const mql = window.matchMedia(`(min-width: ${tabletBreakpoint})`);

    // Set initial state
    isDesktopView = mql.matches;

    // Set up event listener for viewport changes
    const handleViewportChange = (e: MediaQueryListEvent) => {
      isDesktopView = e.matches;
      if (isDesktopView) {
        // Reset menu state when switching to desktop
        menuIsOpen = false;
      }
    };

    mql.addEventListener("change", handleViewportChange);

    return () => {
      mql.removeEventListener("change", handleViewportChange);
    };
  });

  // Handle menu button click
  function toggleMenu() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<section
  aria-label="Service information"
  class="govuk-service-navigation"
  data-module="govuk-service-navigation"
>
  <div class="govuk-width-container">
    <div class="govuk-service-navigation__container">
      <span class="govuk-service-navigation__service-name">
        <a href={serviceUrl} class="govuk-service-navigation__link">
          {serviceName}
        </a>
      </span>

      {#if hasNavigation}
        <nav aria-label="Menu" class="govuk-service-navigation__wrapper">
          <button
            type="button"
            class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
            aria-controls="navigation"
            aria-expanded={menuIsOpen}
            onclick={toggleMenu}
            bind:this={buttonElement}
            hidden={isButtonHidden}
          >
            Menu
          </button>
          <ul
            class="govuk-service-navigation__list"
            id="navigation"
            bind:this={navigationElement}
            hidden={!isMenuVisible}
          >
            {#each navigationItems as item}
              <li
                class="govuk-service-navigation__item{item.isActive
                  ? ' govuk-service-navigation__item--active'
                  : ''}"
              >
                <a
                  class="govuk-service-navigation__link"
                  href={item.href}
                  aria-current={item.isActive ? "true" : undefined}
                >
                  {#if item.isActive}
                    <strong class="govuk-service-navigation__active-fallback"
                      >{item.label}</strong
                    >
                  {:else}
                    {item.label}
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
    </div>
  </div>
</section>
