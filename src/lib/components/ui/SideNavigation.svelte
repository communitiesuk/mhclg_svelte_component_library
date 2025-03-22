<script lang="ts">
  import { onMount } from "svelte";

  // Define types for items and subitems
  export type NavItem = {
    id?: string;
    text: string;
    href: string;
    subItems?: NavSubItem[];
  };

  export type NavSubItem = {
    id?: string;
    text: string;
    href: string;
  };

  // Component props
  let {
    items = [],
    ariaLabel = "Side",
    selectedItem = $bindable(""),
    selectedSubItem = $bindable(""),
    mobile = {
      disabled: false,
      showButtonText: "Show navigation",
      hideButtonText: "Hide navigation",
    },
  } = $props<{
    items: NavItem[];
    ariaLabel?: string;
    selectedItem?: string;
    selectedSubItem?: string;
    mobile?: {
      disabled?: boolean;
      showButtonText?: string;
      hideButtonText?: string;
    };
  }>();

  // State for mobile navigation
  let expanded = $state(false);
  let isJsEnabled = $state(false);
  let mobileClosed = $state(false);

  // Check if JavaScript is enabled on mount
  onMount(() => {
    isJsEnabled = true;
    // Initialize mobileClosed based on initial state
    mobileClosed = isJsEnabled && !expanded && !mobile.disabled;
  });

  // Toggle mobile navigation
  function toggleSideNavigation(event: Event) {
    event.preventDefault();
    expanded = !expanded;
    // Update mobileClosed when expanded changes
    mobileClosed = isJsEnabled && !expanded && !mobile.disabled;
  }
</script>

{#if !mobile.disabled}
  <button
    class="dwp-side-navigation__button"
    data-module="dwp-side-navigation"
    data-target="dwp-side-navigation-panel"
    aria-expanded={expanded}
    onclick={toggleSideNavigation}
  >
    <span class="dwp-side-navigation__section-toggle-focus">
      <span
        class="dwp-side-navigation__chevron {expanded
          ? 'dwp-side-navigation__chevron--down'
          : ''}"
      ></span>
      <span class="dwp-side-navigation__section-toggle-text">
        {expanded ? mobile.hideButtonText : mobile.showButtonText}
      </span>
    </span>
  </button>
{/if}

<nav
  class="dwp-side-navigation {mobileClosed
    ? 'dwp-side-navigation--mobile'
    : ''}"
  aria-label={ariaLabel}
  role="navigation"
>
  <ul class="dwp-side-navigation__list">
    {#each items as item}
      {@const currentSection = item.href && item.href === selectedItem}
      {@const selected = selectedSubItem || selectedItem}
      <li
        class="dwp-side-navigation__item{currentSection
          ? ' dwp-side-navigation__item--selected'
          : ''}"
      >
        <a
          id={item.id}
          href={item.href}
          class="dwp-side-navigation__link{selected === item.href
            ? ' dwp-side-navigation__link--selected'
            : ''}"
          aria-current={selected === item.href ? "true" : undefined}
        >
          {item.text}
        </a>
        {#if currentSection && item.subItems && item.subItems.length > 0}
          <ul
            class="dwp-side-navigation__list dwp-side-navigation__list--sub-item"
          >
            {#each item.subItems as subItem}
              <li class="dwp-side-navigation__sub-item">
                <a
                  id={subItem.id}
                  href={subItem.href}
                  class="dwp-side-navigation__link{selected === subItem.href
                    ? ' dwp-side-navigation__link--selected'
                    : ''}"
                  aria-current={selected === subItem.href ? "true" : undefined}
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
</nav>

<style>
  .dwp-side-navigation {
    margin-bottom: var(--govuk-spacing-2, 10px);
  }

  @media (max-width: 767px) {
    .dwp-side-navigation {
      max-width: 220px;
    }
  }

  .dwp-side-navigation__button {
    display: none;
    font-size: 19px;
    line-height: 1.25;
    margin-bottom: var(--govuk-spacing-2, 10px);
    padding: var(--govuk-spacing-1, 5px) 2px var(--govuk-spacing-1, 5px) 0;
    border-width: 0;
    color: var(--govuk-link-colour, #1d70b8);
    background: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  @media (max-width: 767px) {
    .dwp-side-navigation__button {
      padding: var(--govuk-spacing-2, 10px) var(--govuk-spacing-2, 10px)
        var(--govuk-spacing-2, 10px) 0;
    }
  }

  .dwp-side-navigation__button:hover {
    color: #0b0c0c;
    background: #f3f2f1;
  }

  .dwp-side-navigation__button:hover .dwp-side-navigation__chevron {
    color: #0b0c0c;
    background: #0b0c0c;
  }

  .dwp-side-navigation__button:hover .dwp-side-navigation__chevron::after {
    color: #f3f2f1;
  }

  .dwp-side-navigation__button:focus {
    outline: 3px solid transparent;
    color: #0b0c0c;
    background-color: #ffdd00;
    box-shadow:
      0 -2px #ffdd00,
      0 4px #0b0c0c;
    text-decoration: none;
  }

  .dwp-side-navigation__button:focus .dwp-side-navigation__chevron {
    color: #0b0c0c;
    background: #0b0c0c;
  }

  .dwp-side-navigation__button:focus .dwp-side-navigation__chevron::after {
    color: #ffdd00;
  }

  .dwp-side-navigation__section-toggle-text {
    margin-left: var(--govuk-spacing-2, 10px);
    vertical-align: middle;
  }

  .dwp-side-navigation__chevron {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid;
    border-radius: 50%;
    vertical-align: middle;
  }

  .dwp-side-navigation__chevron--down {
    transform: rotate(180deg);
  }

  .dwp-side-navigation__chevron::after {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    bottom: 5px;
    left: 6px;
    width: 6px;
    height: 6px;
    transform: rotate(-45deg);
    border-top: 2px solid;
    border-right: 2px solid;
  }

  .dwp-side-navigation__list {
    font-size: 19px;
    line-height: 1.25;
    margin-top: 0;
    margin-bottom: 30px;
    padding-left: 0;
    list-style-type: none;
  }

  .dwp-side-navigation__list > li {
    margin-bottom: var(--govuk-spacing-1, 5px);
  }

  .dwp-side-navigation__list--sub-item {
    margin-top: var(--govuk-spacing-1, 5px);
  }

  .dwp-side-navigation__item {
    box-sizing: border-box;
    padding: var(--govuk-spacing-1, 5px) 0 0;
  }

  @media (max-width: 767px) {
    .dwp-side-navigation__item {
      padding: 0;
    }
  }

  .dwp-side-navigation__item--selected {
    margin: var(--govuk-spacing-2, 10px) 0 var(--govuk-spacing-1, 5px) -14px;
    padding: var(--govuk-spacing-1, 5px) 0 var(--govuk-spacing-1, 5px)
      var(--govuk-spacing-2, 10px);
    border-left: 4px solid var(--govuk-link-colour, #1d70b8);
    background-color: #f3f2f1;
  }

  @media (max-width: 767px) {
    .dwp-side-navigation__item--selected {
      margin-left: 0;
      padding: 0 0 0 var(--govuk-spacing-2, 10px);
    }
  }

  .dwp-side-navigation__item :last-child {
    margin-bottom: 0;
  }

  .dwp-side-navigation__link {
    font-size: 16px;
    text-decoration: none;
    color: var(--govuk-link-colour, #1d70b8);
  }

  .dwp-side-navigation__link:hover {
    color: #003078;
    text-decoration: underline;
  }

  .dwp-side-navigation__link:focus {
    outline: 3px solid transparent;
    color: #0b0c0c;
    background-color: #ffdd00;
    box-shadow:
      0 -2px #ffdd00,
      0 4px #0b0c0c;
    text-decoration: none;
  }

  @media (max-width: 767px) {
    .dwp-side-navigation__link {
      display: inline-block;
      padding: calc(var(--govuk-spacing-2, 10px) - 1px) 0;
    }
  }

  .dwp-side-navigation__link--selected {
    font-weight: bold;
  }

  .dwp-side-navigation__sub-item {
    box-sizing: border-box;
    padding: var(--govuk-spacing-1, 5px) 0 0;
  }

  @media (max-width: 767px) {
    .dwp-side-navigation__sub-item {
      padding: 0;
    }
  }

  .dwp-side-navigation__sub-item::before {
    content: "—";
    color: #505a5f;
    font-size: 16px;
    font-weight: 700;
  }

  .dwp-side-navigation__sub-item:last-child {
    padding-bottom: var(--govuk-spacing-1, 5px);
  }

  /* JavaScript enabled styles */
  :global(.js-enabled) .dwp-side-navigation__button {
    display: none;
  }

  @media (max-width: 767px) {
    :global(.js-enabled) .dwp-side-navigation__button {
      display: block;
    }
  }

  @media (max-width: 767px) {
    :global(.js-enabled) .dwp-side-navigation--mobile {
      display: none;
    }
  }
</style>
