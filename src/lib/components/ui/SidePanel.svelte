<!--
@component
# SidePanel

A responsive, accessible side panel component that slides in from left or right.
Features focus trapping, screen reader announcements, and smooth transitions.

## Features
- Responsive design (overlay on mobile, persistent on desktop)
- Full keyboard navigation and focus management
- Screen reader announcements
- Configurable position (left/right)
- Respects user motion preferences
- ARIA-compliant accessibility

@example
```svelte
<script>
  import { SidePanel } from '$lib/components/ui';
  
  let panelState = $state({ open: false });
</script>

<SidePanel bind:navState={panelState} position="left" width="300px">
  {#snippet children()}
    <nav>Navigation content</nav>
  {/snippet}
</SidePanel>
```
-->

<script lang="ts">
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import type { Snippet } from "svelte";

  /**
   * Props interface for the SidePanel component
   */
  interface Props {
    /** Bindable state object controlling panel visibility */
    navState?: { open: boolean };
    /** Position of the panel - 'left' or 'right' side of screen */
    position?: "left" | "right";
    /** Width of the panel as CSS value (e.g., '30%', '300px') */
    width?: string;
    /** Whether to show the mobile toggle button */
    showToggle?: boolean;
    /** Additional CSS classes for the toggle button */
    toggleButtonClass?: string;
    /** Additional CSS classes for the panel container */
    panelClass?: string;
    /** Additional CSS classes for the overlay */
    overlayClass?: string;
    /** Snippet content to render inside the panel */
    children?: Snippet;
  }

  let {
    navState = $bindable({ open: false }),
    position = "left",
    width = "30%",
    showToggle = true,
    toggleButtonClass = "",
    panelClass = "",
    overlayClass = "",
    children,
  }: Props = $props();

  // Generate unique IDs for ARIA relationships
  const panelId: string = `side-panel-${Math.random().toString(36).slice(2, 11)}`;
  const toggleId: string = `toggle-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Toggles the panel open/closed state
   */
  function toggle(): void {
    navState.open = !navState.open;
  }

  /**
   * Closes the panel (sets open state to false)
   */
  function closePanel(): void {
    navState.open = false;
  }

  /**
   * Handles keyboard interactions on the overlay
   * @param event - The keyboard event
   */
  function handleOverlayKeydown(event: KeyboardEvent): void {
    if (event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      closePanel();
    }
  }

  // Declarative state for accessibility
  let panelElement: HTMLElement;

  // Reactive announcement text for screen readers
  let announceText = $state<string>("");

  // Reactive derivation to get focusable elements
  let focusableElements = $derived.by((): HTMLElement[] => {
    if (!panelElement || !navState.open) return [];
    return Array.from(
      panelElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];
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

  /**
   * Manages focus trapping within the panel when Tab key is pressed
   * Ensures focus cycles between focusable elements inside the panel
   * @param event - The keyboard event
   */
  function handleTabInPanel(event: KeyboardEvent): void {
    if (!navState.open || event.key !== "Tab" || focusableElements.length === 0)
      return;

    const firstElement: HTMLElement = focusableElements[0];
    const lastElement: HTMLElement = focusableElements[focusableElements.length - 1];

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

  /**
   * Combined keydown handler for window-level keyboard events
   * Handles Escape key to close panel and delegates Tab trapping
   * @param event - The keyboard event
   */
  function handleWindowKeydown(event: KeyboardEvent): void {
    // Handle escape key for closing panel
    if (navState.open && event.code === "Escape") {
      closePanel();
    }

    // Handle tab trapping when panel is open
    handleTabInPanel(event);
  }

  // Respect reduced motion preferences for transitions
  let transitionDuration = $derived<number>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 300,
  );

  // Computed classes for cleaner template

  // Controls flex order on desktop - panel appears before/after main content
  let panelFlexOrder = $derived<string>(
    position === "right" ? "lg:order-last" : "lg:order-first",
  );

  // Responsive positioning - panel slides from left/right edge with responsive spacing
  let panelPositioning = $derived<string>(
    position === "right"
      ? "inset-y-0 left-[3rem] sm:left-[5rem] md:left-[7rem] right-0"
      : "inset-y-0 right-[3rem] sm:right-[5rem] md:right-[7rem] left-0",
  );

  // Transform animations - slides panel in/out on mobile, always visible on desktop
  let panelSlideAnimation = $derived<string>(
    !navState.open
      ? position === "left"
        ? "-translate-x-full lg:translate-x-0"
        : "translate-x-full lg:translate-x-0"
      : "lg:translate-x-0",
  );

  // Toggle button positioning - appears outside panel on left/right side
  let toggleButtonPosition = $derived<string>(
    position === "left"
      ? "top-0 bottom-0 -right-[40px]"
      : "top-0 bottom-0 -left-[40px]",
  );

  // Toggle button border radius - rounded on the side facing away from panel
  let toggleButtonBorderRadius = $derived<string>(
    position === "left" ? "rounded-r-md" : "rounded-l-md",
  );

  // Toggle button base styling - layout, colors, shadows, and interactions
  let toggleButtonBaseClasses = $derived<string>(
    "relative flex flex-col justify-center items-center z-50 bg-white w-[40px] h-[76px] py-3 shadow-[6px_4px_10px_-1px_rgba(0,0,0,0.3)] transform-gpu hover:bg-gray-50 active:bg-white focus:outline-none focus:shadow-[0_0_0_3px_#ffdd00,0_0_0_6px_#0b0c0c]",
  );

  // Panel base styling - layout, positioning, and transitions
  let panelBaseClasses = $derived<string>(
    "flex flex-col lg:flex-shrink-0 lg:relative transition-transform transform-gpu absolute z-20",
  );
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<!-- Declarative live region - Svelte reactively updates the content -->
<div class="sr-only" aria-live="polite" aria-atomic="true">
  {announceText}
</div>

<!-- Overlay - matches ONS Census Atlas pattern -->
{#if navState.open}
  <div
    class={[
      "lg:hidden bg-black bg-opacity-50 absolute inset-0 z-20 cursor-pointer",
      overlayClass,
    ]}
    transition:fade={{ duration: transitionDuration, easing: cubicOut }}
    onclick={closePanel}
    onkeydown={handleOverlayKeydown}
    role="button"
    tabindex="0"
    aria-label="Close side panel and return to main content"
  ></div>
{/if}

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
    /* Disable Tailwind CSS transitions */
    .transition-transform,
    .transition-opacity {
      transition: none;
    }

    /* Disable all CSS transitions on the panel */
    aside {
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
