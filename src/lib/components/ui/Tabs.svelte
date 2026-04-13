<script lang="ts">
  import { onMount } from "svelte";
  import { replaceState } from "$app/navigation";
  import type { SvelteComponent, Snippet } from "svelte";
  import DOMPurify from "dompurify";

  // Define Tab type
  export type TabItem = {
    id: string;
    label: string;
    content: string | typeof SvelteComponent | Snippet;
    contentIsHtml?: boolean;
  };

  // Component props
  let {
    title = "Contents",
    tabs = [],
    idPrefix = "tab",
    selectedTabId = $bindable(),
    autoAddHeadings = true,
    forceTabBehavior = false,
  } = $props<{
    title?: string;
    tabs: TabItem[];
    idPrefix?: string;
    selectedTabId?: string | null;
    autoAddHeadings?: boolean;
    forceTabBehavior?: boolean;
  }>();

  // Component state variables
  let isInitialized = $state(false);
  let isSupported = $state(false);
  let isMobile = $state(false);

  // Derived value: use mobile behavior only if isMobile is true AND forceTabBehavior is false
  let useMobileBehavior = $derived(isMobile && !forceTabBehavior);

  // DOM element references for programmatic focus
  let tabElements: { [key: string]: HTMLAnchorElement } = {};

  // Track media query for responsive behavior
  let tabletMql: MediaQueryList | null = null;

  // Handle tab selection - integrate focus and hash logic directly
  function selectTab(tabId: string, shouldFocus = false): void {
    // Skip if component isn't ready, or tab is already selected
    if (!isSupported || !isInitialized || selectedTabId === tabId) return;

    // Update the core bindable state
    selectedTabId = tabId;

    // Handle optional focus
    if (shouldFocus && tabElements[tabId]) {
      // Use setTimeout to defer focus until after Svelte updates the DOM (e.g., tabindex)
      setTimeout(() => {
        const tabElement = tabElements[tabId];
        tabElement?.focus(); // Optional chaining for safety
      }, 0);
    }

    // Update URL hash on non-mobile views
    if (!useMobileBehavior) {
      // Use history.replaceState to update the displayed URL hash without causing scroll/navigation.
      const currentUrl = window.location.href;
      const hashIndex = currentUrl.indexOf("#");
      const baseUrl =
        hashIndex !== -1 ? currentUrl.slice(0, hashIndex) : currentUrl;
      const newUrl = `${baseUrl}#${tabId}`;
      replaceState(newUrl, {}); // Use SvelteKit's function
    }
  }

  //$inspect(isSupported, "isSupported");

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent, currentIndex: number): void {
    // Skip navigation on mobile or if component isn't ready
    if (useMobileBehavior || !isSupported || !isInitialized) return;

    // Initialize to null, indicating no valid navigation key pressed yet.
    // Will be updated to a valid index (0+) if ArrowLeft/Right is pressed.
    let newIndex: number | null = null;
    const numTabs = tabs.length;
    if (numTabs === 0) return; // Cannot navigate an empty list

    // Define indices and conditions for readability
    const isFirstTab = currentIndex === 0;
    const isLastTab = currentIndex === numTabs - 1;
    const previousIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    const firstIndex = 0;
    const lastIndex = numTabs - 1;

    if (event.key === "ArrowLeft" || event.key === "Left") {
      event.preventDefault();
      // If it's the first tab, wrap to last, otherwise go to previous.
      newIndex = isFirstTab ? lastIndex : previousIndex;
    } else if (event.key === "ArrowRight" || event.key === "Right") {
      event.preventDefault();
      // If it's the last tab, wrap to first, otherwise go to next.
      newIndex = isLastTab ? firstIndex : nextIndex;
    }

    // If a navigation key was pressed (newIndex is not null) and the index is valid
    if (newIndex !== null && tabs[newIndex]) {
      const targetTabId = tabs[newIndex].id;
      // Pass true to ensure focus shifts to the new tab
      selectTab(targetTabId, true);
    }
  }

  // Handle tab click
  function handleTabClick(event: MouseEvent, tabId: string): void {
    // On mobile or without JS support, let default browser behavior happen
    if (useMobileBehavior || !isSupported) return;
    event.preventDefault();
    selectTab(tabId);
  }

  // Handle hash change
  function handleHashChange(): void {
    // Skip on mobile or when not properly initialized
    if (useMobileBehavior || !isSupported || !isInitialized) return;

    const hash = window.location.hash.substring(1);
    if (hash && tabs.some((tab) => tab.id === hash)) {
      // Only select if the hash corresponds to a *different* tab
      if (selectedTabId !== hash) {
        // Focus the tab when navigating via hash change
        selectTab(hash, true);
      }
    }
  }

  // Initialize tabs on mount
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;

    // Check URL hash for deep linking AFTER initial prop value is set
    const hash = window.location.hash.substring(1);
    if (hash) {
      const tabFromHash = tabs.find((tab) => tab.id === hash);
      if (tabFromHash && tabFromHash.id !== selectedTabId) {
        // Update state if hash points to a valid, different tab
        // Use selectTab to handle focus and potential URL update if needed
        selectTab(tabFromHash.id, true);
      }
    }

    // If after hash check, no tab is selected AND we have tabs, select the first one.
    // This handles the case where the initial prop value was null/invalid and no valid hash was present.
    if (!selectedTabId && tabs.length > 0) {
      selectedTabId = tabs[0].id;
    }

    // Setup responsive behavior
    if (window) {
      const breakpoint = getBreakpoint();
      if (breakpoint) {
        tabletMql = window.matchMedia(`(min-width: ${breakpoint})`);
        isMobile = !tabletMql.matches;

        if ("addEventListener" in tabletMql) {
          tabletMql.addEventListener("change", handleMediaChange);
        } else {
          // @ts-ignore - Deprecated fallback
          tabletMql.addListener(handleMediaChange);
        }
      }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    isInitialized = true;

    // Cleanup
    return () => {
      if (tabletMql) {
        if ("removeEventListener" in tabletMql) {
          tabletMql.removeEventListener("change", handleMediaChange);
        } else {
          // @ts-ignore - Deprecated fallback
          tabletMql.removeListener(handleMediaChange);
        }
      }
      window.removeEventListener("hashchange", handleHashChange);

      // Clear tab element references to prevent memory leaks
      Object.keys(tabElements).forEach((key) => {
        delete tabElements[key];
      });
    };
  });

  // Handle media query changes
  function handleMediaChange(
    event: MediaQueryListEvent | MediaQueryList,
  ): void {
    // Handle both modern and deprecated event/object types
    isMobile = !event.matches;
  }

  // Get breakpoint from CSS custom property
  function getBreakpoint(): string | null {
    if (typeof window === "undefined") return null; // Guard for SSR
    const property = `--govuk-frontend-breakpoint-tablet`;
    const value = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(property);
    return value ? value.trim() : null;
  }

  // Effect to ensure valid tab selection if tabs array changes externally
  $effect(() => {
    // Run this effect whenever isInitialized or tabs changes
    // Check if the currently selected tab ID still exists in the updated tabs array
    if (
      isInitialized &&
      selectedTabId && // Only run if a tab is actually selected
      !tabs.some((tab) => tab.id === selectedTabId)
    ) {
      // If selected tab ID is no longer valid, default to the first available tab
      console.log(
        `Effect: selectedTabId '${selectedTabId}' no longer valid. Resetting.`,
      ); // Optional Debug
      selectedTabId = tabs[0]?.id ?? null; // Use optional chaining and nullish coalescing
    }
  });
</script>

<div
  class="govuk-tabs"
  data-module="govuk-tabs"
  data-force-desktop={forceTabBehavior || null}
>
  <h2 class="govuk-tabs__title">
    {title}
  </h2>

  <ul
    class="govuk-tabs__list"
    role={isSupported && !useMobileBehavior ? "tablist" : null}
  >
    {#each tabs as tab, index}
      {@const isSelected = selectedTabId === tab.id}
      {#key tab.id}
        <li
          class="govuk-tabs__list-item"
          class:govuk-tabs__list-item--selected={isSelected &&
            !useMobileBehavior}
          role={isSupported && !useMobileBehavior ? "presentation" : null}
        >
          <!-- svelte-ignore binding_property_non_reactive -->
          <a
            class="govuk-tabs__tab"
            href={"#" + tab.id}
            id={isSupported && !useMobileBehavior
              ? `${idPrefix}_${tab.id}`
              : null}
            role={isSupported && !useMobileBehavior ? "tab" : null}
            aria-controls={isSupported && !useMobileBehavior ? tab.id : null}
            aria-selected={isSupported && !useMobileBehavior
              ? isSelected
              : null}
            tabindex={isSupported && !useMobileBehavior
              ? isSelected
                ? 0
                : -1
              : null}
            onclick={(e) => handleTabClick(e, tab.id)}
            onkeydown={(e) => handleKeydown(e, index)}
            bind:this={tabElements[tab.id]}
          >
            {tab.label}
          </a>
        </li>
      {/key}
    {/each}
  </ul>

  {#each tabs as tab}
    {@const isSelected = selectedTabId === tab.id}
    <div
      class="govuk-tabs__panel"
      class:govuk-tabs__panel--hidden={!isSelected &&
        isSupported &&
        !useMobileBehavior}
      id={tab.id}
      role={isSupported && !useMobileBehavior ? "tabpanel" : null}
      aria-labelledby={isSupported && !useMobileBehavior
        ? `${idPrefix}_${tab.id}`
        : null}
      hidden={!isSelected && isSupported && !useMobileBehavior}
    >
      {#if autoAddHeadings}
        <h2 class="govuk-heading-l">{tab.label}</h2>
      {/if}

      {#if typeof tab.content === "string"}
        {#if tab.contentIsHtml}
          {@html DOMPurify.sanitize(tab.content)}
        {:else}
          <p class="govuk-body">{tab.content}</p>
        {/if}
      {:else if tab.content satisfies Snippet}
        {@render tab.content()}
      {:else if tab.content}
        {@const Component = tab.content}
        <Component />
      {/if}
    </div>
  {/each}
</div>

<style>
  /* Override components.css tab panel style adding top margin to tab panels */
  .govuk-tabs__panel[role="tabpanel"] {
    margin-top: 0;
  }

  /* Ensure hidden panels are truly hidden */
  .govuk-tabs__panel--hidden {
    display: none;
  }

  /* 
   * Force desktop tab appearance when forceTabBehavior is enabled
   * These styles are copied verbatim from GOV.UK Frontend's desktop (40.0625em+) styles
   * but applied at mobile breakpoints when data-force-desktop attribute is present
   */
  @media (max-width: 40.0624em) {
    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list {
      margin-bottom: 0;
      border-bottom: 1px solid #b1b4b6;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list:after {
      content: "";
      display: block;
      clear: both;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__title {
      display: none;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list-item {
      position: relative;
      margin-right: 5px;
      margin-bottom: 0;
      margin-left: 0;
      padding: 10px 20px;
      float: left;
      background-color: #f3f2f1;
      text-align: center;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list-item:before {
      content: none;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list-item--selected {
      position: relative;
      margin-top: -5px;
      margin-bottom: -1px;
      padding: 14px 19px 16px;
      border: 1px solid #b1b4b6;
      border-bottom: 0;
      background-color: #fff;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__list-item--selected
      .govuk-tabs__tab {
      text-decoration: none;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab {
      margin-bottom: 0;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:link,
    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:visited {
      color: #0b0c0c;
    }

    @media print {
      :global(.govuk-frontend-supported)
        .govuk-tabs[data-force-desktop]
        .govuk-tabs__tab:link,
      :global(.govuk-frontend-supported)
        .govuk-tabs[data-force-desktop]
        .govuk-tabs__tab:visited {
        color: #000;
      }
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:hover {
      color: rgba(11, 12, 12, 0.99);
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:active,
    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:focus {
      color: #0b0c0c;
    }

    @media print {
      :global(.govuk-frontend-supported)
        .govuk-tabs[data-force-desktop]
        .govuk-tabs__tab:active,
      :global(.govuk-frontend-supported)
        .govuk-tabs[data-force-desktop]
        .govuk-tabs__tab:focus {
        color: #000;
      }
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__tab:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__panel {
      margin-bottom: 0;
      padding: 30px 20px;
      border: 1px solid #b1b4b6;
      border-top: 0;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__panel
      > :last-child {
      margin-bottom: 0;
    }

    :global(.govuk-frontend-supported)
      .govuk-tabs[data-force-desktop]
      .govuk-tabs__panel--hidden {
      display: none;
    }
  }
</style>
