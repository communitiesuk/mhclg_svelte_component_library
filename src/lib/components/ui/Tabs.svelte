<script lang="ts">
  import { onMount } from "svelte";
  import { replaceState } from "$app/navigation";
  import type { SvelteComponent, Snippet } from "svelte";

  // Define Tab type
  export type TabItem = {
    id: string;
    label: string;
    content: string | typeof SvelteComponent | Snippet;
    selected?: boolean;
  };

  // Component props
  let {
    title = "Contents",
    tabs = [],
    idPrefix = "tab",
  } = $props<{
    title?: string;
    tabs: TabItem[];
    idPrefix?: string;
  }>();

  // Component state variables
  let isInitialized = $state(false);
  let isSupported = $state(false);
  let isMobile = $state(false);
  let selectedTabId = $state<string | null>(null);

  // DOM element references for programmatic focus
  let tabElements: { [key: string]: HTMLAnchorElement } = {};

  // Track media query for responsive behavior
  let tabletMql: MediaQueryList | null = null;

  // Handle tab selection
  function selectTab(tabId: string, shouldFocus = false) {
    // Don't select if not supported/initialized or already selected
    if (!isSupported || !isInitialized || selectedTabId === tabId) return;

    // Get references to current and next tabs
    const currentTabId = selectedTabId;

    // Update selected tab state
    selectedTabId = tabId;

    if (shouldFocus && tabElements[tabId]) {
      // Focus the tab element after the state update
      setTimeout(() => {
        const tabElement = tabElements[tabId];
        if (tabElement) {
          tabElement.focus();
        }
      }, 0);
    }

    if (!isMobile) {
      // Update URL hash in browser history without triggering navigation/scroll
      const currentUrl = window.location.href;
      const hashIndex = currentUrl.indexOf("#");
      const baseUrl =
        hashIndex !== -1 ? currentUrl.slice(0, hashIndex) : currentUrl;
      const newUrl = `${baseUrl}#${tabId}`;
      replaceState(newUrl, {});
    }
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent, currentIndex: number) {
    // Skip on mobile or when not properly initialized
    if (isMobile || !isSupported || !isInitialized) return;

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
  function handleTabClick(event: MouseEvent, tabId: string) {
    // On mobile or without JS support, let default browser behavior happen
    if (isMobile || !isSupported) return;
    event.preventDefault();
    selectTab(tabId);
  }

  // Handle hash change
  function handleHashChange() {
    // Skip on mobile or when not properly initialized
    if (isMobile || !isSupported || !isInitialized) return;

    const hash = window.location.hash.substring(1);
    if (hash && tabs.some((tab) => tab.id === hash)) {
      // Only select if the hash corresponds to a *different* tab
      if (selectedTabId !== hash) {
        selectTab(hash, true); // Focus the tab when navigating via hash change
      }
    }
  }

  // Initialize tabs on mount
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;

    // Set initial selected tab
    let initialTab = tabs.find((tab) => tab.selected) || tabs[0];

    // Check URL hash for deep linking
    const hash = window.location.hash.substring(1);
    if (hash) {
      const tabFromHash = tabs.find((tab) => tab.id === hash);
      if (tabFromHash) {
        initialTab = tabFromHash;
      }
    }

    if (initialTab) {
      // Set initial without triggering history update
      selectedTabId = initialTab.id;
    }

    // Setup responsive behavior
    if (window) {
      const breakpoint = getBreakpoint();
      if (breakpoint) {
        tabletMql = window.matchMedia(`(min-width: ${breakpoint})`);
        isMobile = !tabletMql.matches;

        if ("addEventListener" in tabletMql) {
          tabletMql.addEventListener("change", handleMediaChange);
        } else if (tabletMql) {
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
        } else if (tabletMql) {
          // @ts-ignore - Deprecated fallback
          tabletMql.removeListener(handleMediaChange);
        }
      }
      window.removeEventListener("hashchange", handleHashChange);

      // Clear tab references by deleting keys
      Object.keys(tabElements).forEach((key) => {
        delete tabElements[key];
      });
    };
  });

  // Handle media query changes
  function handleMediaChange(event: MediaQueryListEvent | MediaQueryList) {
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

  // Effect to ensure valid tab selection
  $effect(() => {
    // When tabs change, ensure selected tab exists or default to first tab
    if (
      isInitialized &&
      (!selectedTabId || !tabs.some((tab) => tab.id === selectedTabId))
    ) {
      // Check if tabs array is not empty before accessing index 0
      if (tabs.length > 0) {
        selectedTabId = tabs[0].id;
      } else {
        selectedTabId = null; // Handle the case where all tabs are removed
      }
    }
  });
</script>

<div class="govuk-tabs" data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">
    {title}
  </h2>

  <ul
    class="govuk-tabs__list"
    role={isSupported && !isMobile ? "tablist" : null}
  >
    {#each tabs as tab, index}
      {@const isSelected = selectedTabId === tab.id}
      {#key tab.id}
        <li
          class="govuk-tabs__list-item"
          class:govuk-tabs__list-item--selected={isSelected && !isMobile}
          role={isSupported && !isMobile ? "presentation" : null}
        >
          <!-- svelte-ignore binding_property_non_reactive -->
          <a
            class="govuk-tabs__tab"
            href={"#" + tab.id}
            id={isSupported && !isMobile ? `${idPrefix}_${tab.id}` : null}
            role={isSupported && !isMobile ? "tab" : null}
            aria-controls={isSupported && !isMobile ? tab.id : null}
            aria-selected={isSupported && !isMobile ? isSelected : null}
            tabindex={isSupported && !isMobile ? (isSelected ? 0 : -1) : null}
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
      class:govuk-tabs__panel--hidden={!isSelected && isSupported && !isMobile}
      id={tab.id}
      role={isSupported && !isMobile ? "tabpanel" : null}
      aria-labelledby={isSupported && !isMobile
        ? `${idPrefix}_${tab.id}`
        : null}
      hidden={!isSelected && isSupported && !isMobile}
    >
      {#if typeof tab.content === "string"}
        {@html tab.content}
      {:else if tab.content satisfies Snippet}
        {@render tab.content()}
      {:else}
        <svelte:component this={tab.content} />
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
</style>
