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
    customiseServiceNameLink = false,
    serviceNameLinkStyle = "govuk-link no-underline",
  } = $props<{
    serviceName?: string;
    serviceUrl?: string;
    navigationItems?: NavigationItem[];
    customiseServiceNameLink?: boolean;
    serviceNameLinkStyle?: string;
  }>();

  // Reactive state declarations
  let hasNavigation = $derived(navigationItems && navigationItems.length > 0);
  let menuIsOpen = $state(false);

  // References to DOM elements
  let navigationElement = $state<HTMLElement | null>(null);
  let buttonElement = $state<HTMLButtonElement | null>(null);
</script>

<section
  aria-label="Service information"
  class="govuk-service-navigation"
  data-module="govuk-service-navigation"
>
  <div class="govuk-width-container">
    <div class="govuk-service-navigation__container">
      <span class="govuk-service-navigation__service-name">
        <a
          href={serviceUrl}
          class={customiseServiceNameLink
            ? serviceNameLinkStyle
            : "govuk-service-navigation__link"}
        >
          {serviceName}
        </a>
      </span>

      {#if hasNavigation}
        <nav aria-label="Menu" class="govuk-service-navigation__wrapper">
          <button
            type="button"
            class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle menu-button"
            onclick={() => (menuIsOpen = !menuIsOpen)}
            aria-controls="navigation"
            aria-expanded={menuIsOpen}
            bind:this={buttonElement}
          >
            Menu
          </button>
          <ul
            class="govuk-service-navigation__list menu-list"
            class:is-open={menuIsOpen}
            id="navigation"
            bind:this={navigationElement}
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

<style>
  .no-underline {
    text-decoration: none;
  }
  .no-underline:hover {
    text-decoration: underline;
  }

  /* Mobile-first: button visible, menu hidden unless open */
  .menu-button {
    display: block;
  }
  .menu-list {
    display: none;
  }
  .menu-list.is-open {
    display: block;
  }

  /* Desktop: button hidden, menu always visible */
  @media (min-width: 768px) {
    .menu-button {
      display: none;
    }
    .menu-list {
      display: block;
    }
  }
</style>
