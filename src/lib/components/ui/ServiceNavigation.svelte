<!-- Service Navigation component 
Use the component with or without navigation items based on your needs. -->

<script lang="ts">
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

  // Derive whether we have navigation items
  let hasNavigation = $derived(navigationItems && navigationItems.length > 0);
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
            hidden
          >
            Menu
          </button>
          <ul class="govuk-service-navigation__list" id="navigation">
            {#each navigationItems as item, i}
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
