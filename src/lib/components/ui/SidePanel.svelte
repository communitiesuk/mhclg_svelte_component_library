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
  let panelId = `side-panel-${Math.random().toString(36).substr(2, 9)}`;
  let toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`;

  // Toggle function - matches original pattern
  function toggle() {
    navState = { open: !navState.open };
  }

  // Close panel when clicking overlay
  function closePanel() {
    navState = { open: false };
  }

  // Handle escape key - matches original pattern
  function handleKeydown(event) {
    if (navState.open && event.code === "Escape") {
      navState = { open: false };
    }
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
  let previouslyFocusedElement;

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
      // Store current focus before opening
      previouslyFocusedElement = document.activeElement;
      announceText = "Side panel opened";

      // Focus first focusable element in panel
      setTimeout(() => {
        if (focusableElements.length > 0) {
          focusableElements[0]?.focus();
        }
      }, 100);
    } else {
      announceText = "Side panel closed";

      // Restore focus when closing
      if (previouslyFocusedElement) {
        setTimeout(() => {
          previouslyFocusedElement?.focus();
          previouslyFocusedElement = null;
        }, 100);
      }
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
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Declarative live region - Svelte reactively updates the content -->
<div class="sr-only" aria-live="polite" aria-atomic="true">
  {announceText}
</div>

<!-- Overlay - matches ONS Census Atlas pattern -->
<div
  class="lg:hidden bg-black absolute inset-0 z-20 cursor-pointer transition-opacity {navState.open
    ? 'visible opacity-50'
    : 'invisible opacity-0'} {overlayClass}"
  onclick={closePanel}
  onkeydown={handleOverlayKeydown}
  role="button"
  tabindex="0"
  aria-label="Close side panel overlay"
  aria-hidden={navState.open ? "false" : "true"}
></div>

<!-- Side Panel - matches ONS Census Atlas layout structure -->
<aside
  bind:this={panelElement}
  onkeydown={handleTabInPanel}
  id={panelId}
  class="flex flex-col lg:max-w-[24rem] lg:flex-shrink-0 lg:relative transition-transform transform-gpu {position ===
  'right'
    ? 'lg:order-last'
    : 'lg:order-first'} absolute {position === 'right'
    ? 'inset-y-0 left-[3rem] sm:left-[5rem] md:left-[7rem] right-0'
    : 'inset-y-0 right-[3rem] sm:right-[5rem] md:right-[7rem] left-0'} lg:inset-auto z-20 {!navState.open
    ? position === 'left'
      ? '-translate-x-full lg:translate-x-0'
      : 'translate-x-full lg:translate-x-0'
    : 'lg:translate-x-0'} {panelClass}"
  style="--panel-width: {width};"
  aria-label="Side panel navigation"
  aria-hidden={navState.open ? "false" : "true"}
>
  <section
    class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-white min-w-0"
    aria-label="Panel content"
  >
    {@render children?.()}
  </section>

  <!-- Toggle Button - attached to panel, mobile only (matches ONS Census Atlas) -->
  {#if showToggle}
    <div
      class="lg:hidden absolute {position === 'left'
        ? 'top-0 bottom-0 -right-[40px]'
        : 'top-0 bottom-0 -left-[40px]'} my-auto h-24 w-[40px]"
      class:hidden={false}
    >
      <button
        id={toggleId}
        class="relative flex flex-col justify-center items-center z-50 bg-white w-[40px] h-[76px] py-3 shadow-[6px_4px_10px_-1px_rgba(0,0,0,0.3)] transform-gpu hover:bg-gray-50 active:bg-white focus:outline-none focus:shadow-[0_0_0_3px_#ffdd00,0_0_0_6px_#0b0c0c] {position ===
        'left'
          ? 'rounded-r-md'
          : 'rounded-l-md'} {toggleButtonClass}"
        onclick={toggle}
        aria-label={navState.open ? "Close side panel" : "Open side panel"}
        aria-expanded={navState.open}
        aria-controls={panelId}
      >
        {#if navState.open}
          <div class="text-2xl text-gray-700">
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
          <div class="flex items-center px-2 text-2xl">
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
  /* Custom styles for smooth transitions */
  .transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .transition-colors {
    transition-property:
      color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

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
