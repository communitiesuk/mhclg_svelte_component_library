<script lang="ts">
  import { onMount } from "svelte";
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
    responsive = true,
  } = $props<{
    title?: string;
    tabs: TabItem[];
    idPrefix?: string;
    responsive?: boolean;
  }>();

  // State
  let jsHiddenClass = "govuk-tabs__panel--hidden";
  let isInitialized = $state(false);
  let isSupported = $state(false);
  let isMobile = $state(false);
  let selectedTabId = $state<string | null>(null);
  let tabsElement: HTMLDivElement;

  // Track media query for responsive behavior
  let tabletMql: MediaQueryList | null = null;

  // Handle tab selection
  function selectTab(tabId: string) {
    if (!isSupported || !isInitialized) return;
    selectedTabId = tabId;

    if (responsive && !isMobile) {
      // Update URL hash without scrolling
      const currentUrl = window.location.href;
      const hashIndex = currentUrl.indexOf("#");
      const baseUrl =
        hashIndex !== -1 ? currentUrl.slice(0, hashIndex) : currentUrl;
      const newUrl = `${baseUrl}#${tabId}`;
      window.history.replaceState(null, "", newUrl);
    }
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent, currentIndex: number) {
    if (!isSupported || !isInitialized) return;

    if (event.key === "ArrowLeft" || event.key === "Left") {
      event.preventDefault();
      const newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      selectTab(tabs[newIndex].id);
    } else if (event.key === "ArrowRight" || event.key === "Right") {
      event.preventDefault();
      const newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      selectTab(tabs[newIndex].id);
    }
  }

  // Handle tab click
  function handleTabClick(event: MouseEvent, tabId: string) {
    event.preventDefault();
    selectTab(tabId);
  }

  // Handle hash change
  function handleHashChange() {
    if (!isSupported || !isInitialized) return;

    const hash = window.location.hash.substring(1);
    if (hash && tabs.some((tab) => tab.id === hash)) {
      selectTab(hash);
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
      selectedTabId = initialTab.id;
    }

    // Setup responsive behavior
    if (responsive && window) {
      const breakpoint = getBreakpoint();
      if (breakpoint) {
        tabletMql = window.matchMedia(`(min-width: ${breakpoint})`);
        isMobile = !tabletMql.matches;

        if ("addEventListener" in tabletMql) {
          tabletMql.addEventListener("change", handleMediaChange);
        } else if (tabletMql) {
          // For older browsers that use the deprecated approach
          // @ts-ignore - Some older browsers still use this API
          tabletMql.addListener(handleMediaChange);
        }
      }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    isInitialized = true;

    return () => {
      if (tabletMql) {
        if ("removeEventListener" in tabletMql) {
          tabletMql.removeEventListener("change", handleMediaChange);
        } else if (tabletMql) {
          // @ts-ignore - Some older browsers still use this API
          tabletMql.removeListener(handleMediaChange);
        }
      }
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  // Handle media query changes
  function handleMediaChange(event: MediaQueryListEvent) {
    isMobile = !event.matches;
  }

  // Get breakpoint from CSS custom property
  function getBreakpoint(): string | null {
    const property = `--govuk-frontend-breakpoint-tablet`;
    const value = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(property);
    return value ? value.trim() : null;
  }

  // Derived values
  $derived: {
    // Ensure we have a selected tab at all times
    if (
      isInitialized &&
      (!selectedTabId || !tabs.some((tab) => tab.id === selectedTabId))
    ) {
      selectedTabId = tabs[0]?.id ?? null;
    }
  }

  function isTabSelected(tabId: string): boolean {
    return selectedTabId === tabId;
  }
</script>

<div class="govuk-tabs" data-module="govuk-tabs" bind:this={tabsElement}>
  <h2 class="govuk-tabs__title">
    {title}
  </h2>

  <ul class="govuk-tabs__list" role={isSupported ? "tablist" : undefined}>
    {#each tabs as tab, index}
      <li
        class="govuk-tabs__list-item{isTabSelected(tab.id)
          ? ' govuk-tabs__list-item--selected'
          : ''}"
        role={isSupported ? "presentation" : undefined}
      >
        <a
          class="govuk-tabs__tab"
          href={"#" + tab.id}
          id={isSupported ? `${idPrefix}_${tab.id}` : undefined}
          role={isSupported ? "tab" : undefined}
          aria-controls={isSupported ? tab.id : undefined}
          aria-selected={isSupported
            ? isTabSelected(tab.id)
              ? "true"
              : "false"
            : null}
          tabindex={isSupported ? (isTabSelected(tab.id) ? 0 : -1) : null}
          on:click={(e) => handleTabClick(e, tab.id)}
          on:keydown={(e) => handleKeydown(e, index)}
        >
          {tab.label}
        </a>
      </li>
    {/each}
  </ul>

  {#each tabs as tab}
    <div
      class="govuk-tabs__panel{!isTabSelected(tab.id)
        ? ' ' + jsHiddenClass
        : ''}"
      id={tab.id}
      role={isSupported ? "tabpanel" : undefined}
      aria-labelledby={isSupported ? `${idPrefix}_${tab.id}` : undefined}
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
</style>
