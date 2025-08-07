<script>
  let {
    navState = $bindable({ open: false }),
    position = "left", // 'left' or 'right'
    width = "30%", // Percentage-based width for responsive scaling
    showToggle = true,
    toggleButtonClass = "",
    panelClass = "",
    overlayClass = "",
    children,
  } = $props();

  // Generate unique IDs for ARIA relationships
  let panelId = `side-panel-${Math.random().toString(36).slice(2, 11)}`;
  let toggleId = `toggle-${Math.random().toString(36).slice(2, 11)}`;

  // Toggle function - matches original pattern
  function toggle() {
    navState.open = !navState.open;
  }

  // Close panel when clicking overlay
  function closePanel() {
    navState.open = false;
  }

  // Handle overlay keyboard interaction
  function handleOverlayKeydown(event) {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      closePanel();
    }
  }

  // Declarative state for accessibility
  let panelElement;

  // Reactive announcement text for screen readers
  let announceText = $state("");

  // Reactive derivation to get focusable elements
  let focusableElements = $derived.by(() => {
    if (!panelElement || !navState.open) return [];
    return Array.from(
      panelElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
  });

  // Reactive focus management - Svelte handles the DOM updates
  $effect(() => {
    if (navState.open) {
      // Announce panel opened immediately, before focus moves
      announceText = "Navigation panel opened. Press Escape to close.";

      // Focus first focusable element in panel after brief delay
      setTimeout(() => {
        if (focusableElements.length > 0) {
          focusableElements[0]?.focus();
        }
      }, 150); // Slightly longer delay to let announcement complete
    } else {
      // Announce panel closed
      announceText = "Panel closed.";
    }
  });

  // Clean focus trapping using reactive focusableElements
  function handleTabInPanel(event) {
    if (!navState.open || event.key !== "Tab" || focusableElements.length === 0)
      return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Handle single focusable element
    if (focusableElements.length === 1) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      // Shift+Tab: if on first element, go to last
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab: if on last element, go to first
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  // Combined keydown handler for window
  function handleWindowKeydown(event) {
    // Handle escape key for closing panel
    if (navState.open && event.code === "Escape") {
      closePanel();
    }

    // Handle tab trapping when panel is open
    handleTabInPanel(event);
  }

  // Computed classes for cleaner template

  // Controls flex order on desktop - panel appears before/after main content
  let panelFlexOrder = $derived(
    position === "right" ? "lg:order-last" : "lg:order-first",
  );

  // Responsive positioning - panel slides from left/right edge with responsive spacing
  let panelPositioning = $derived(
    position === "right"
      ? "inset-y-0 left-[3rem] sm:left-[5rem] md:left-[7rem] right-0"
      : "inset-y-0 right-[3rem] sm:right-[5rem] md:right-[7rem] left-0",
  );

  // Transform animations - slides panel in/out on mobile, always visible on desktop
  let panelSlideAnimation = $derived(
    !navState.open
      ? position === "left"
        ? "-translate-x-full lg:translate-x-0"
        : "translate-x-full lg:translate-x-0"
      : "lg:translate-x-0",
  );

  // Overlay visibility and opacity - only visible on mobile when panel is open
  let overlayVisibility = $derived(
    navState.open ? "visible opacity-50" : "invisible opacity-0",
  );

  // Toggle button positioning - appears outside panel on left/right side
  let toggleButtonPosition = $derived(
    position === "left"
      ? "top-0 bottom-0 -right-[40px]"
      : "top-0 bottom-0 -left-[40px]",
  );

  // Toggle button border radius - rounded on the side facing away from panel
  let toggleButtonBorderRadius = $derived(
    position === "left" ? "rounded-r-md" : "rounded-l-md",
  );

  // Toggle button base styling - layout, colors, shadows, and interactions
  let toggleButtonBaseClasses = $derived(
    "relative flex flex-col justify-center items-center z-50 bg-white w-[40px] h-[76px] py-3 shadow-[6px_4px_10px_-1px_rgba(0,0,0,0.3)] transform-gpu hover:bg-gray-50 active:bg-white focus:outline-none focus:shadow-[0_0_0_3px_#ffdd00,0_0_0_6px_#0b0c0c]",
  );

  // Panel base styling - layout, positioning, and transitions
  let panelBaseClasses = $derived(
    "flex flex-col lg:flex-shrink-0 lg:relative transition-transform transform-gpu absolute z-20",
  );
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<!-- Declarative live region - Svelte reactively updates the content -->
<div class="sr-only" aria-live="polite" aria-atomic="true">
  {announceText}
</div>

<!-- Overlay - matches ONS Census Atlas pattern -->
<div
  class={[
    "lg:hidden bg-black absolute inset-0 z-20 cursor-pointer transition-opacity",
    overlayVisibility,
    overlayClass,
  ]}
  onclick={closePanel}
  onkeydown={handleOverlayKeydown}
  role="button"
  tabindex="0"
  aria-label="Close side panel and return to main content"
  aria-hidden={navState.open ? "false" : "true"}
></div>

<!-- Side Panel - matches ONS Census Atlas layout structure -->
<aside
  bind:this={panelElement}
  id={panelId}
  class={[
    panelBaseClasses,
    panelFlexOrder,
    panelPositioning,
    panelSlideAnimation,
    panelClass,
  ]}
  style="--panel-width: {width};"
  aria-label="Navigation panel"
  aria-describedby={navState.open ? `${panelId}-description` : undefined}
>
  <!-- Hidden description for screen readers -->
  {#if navState.open}
    <div id="{panelId}-description" class="sr-only">
      Navigation panel with search and menu options. Use Tab to move between
      items, Escape to close.
    </div>
  {/if}

  <section
    class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-white min-w-0"
    aria-label="Panel content"
  >
    {@render children?.()}
  </section>

  <!-- Toggle Button - attached to panel, mobile only (matches ONS Census Atlas) -->
  {#if showToggle}
    <div
      class={["lg:hidden absolute my-auto h-24 w-[40px]", toggleButtonPosition]}
    >
      <button
        id={toggleId}
        class={[
          toggleButtonBaseClasses,
          toggleButtonBorderRadius,
          toggleButtonClass,
        ]}
        onclick={toggle}
        aria-label={navState.open ? "Close side panel" : "Open side panel"}
        aria-expanded={navState.open}
        aria-controls={panelId}
      >
        {#if navState.open}
          <div class="text-gray-700">
            <!-- Close icon - arrow pointing in direction of panel -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {#if position === "left"}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              {/if}
            </svg>
          </div>
        {:else}
          <div class="flex items-center px-2">
            <!-- Menu icon -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
        {/if}
      </button>
    </div>
  {/if}
</aside>

<style>
  /* Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .transition-transform,
    .transition-opacity {
      transition: none;
    }
  }

  /* Dynamic width using CSS custom property */
  @media (min-width: 1024px) {
    aside[style*="--panel-width"] {
      width: var(--panel-width);
    }
  }
</style>
