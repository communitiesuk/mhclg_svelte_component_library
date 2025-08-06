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
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Overlay - matches ONS Census Atlas pattern -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="lg:hidden bg-black absolute inset-0 z-20 cursor-pointer transition-opacity {navState.open
    ? 'visible opacity-50'
    : 'invisible opacity-0'} {overlayClass}"
  onclick={closePanel}
  role="button"
  tabindex="-1"
></div>

<!-- Side Panel - matches ONS Census Atlas layout structure -->
<div
  class="flex flex-col lg:w-[{width}] lg:max-w-[24rem] lg:flex-shrink-0 lg:relative transition-transform transform-gpu {position ===
  'right'
    ? 'lg:order-last'
    : 'lg:order-first'} absolute {position === 'right'
    ? 'inset-y-0 left-[3rem] sm:left-[5rem] md:left-[7rem] right-0'
    : 'inset-y-0 right-[3rem] sm:right-[5rem] md:right-[7rem] left-0'} lg:inset-auto z-20 {!navState.open
    ? position === 'left'
      ? '-translate-x-full lg:translate-x-0'
      : 'translate-x-full lg:translate-x-0'
    : 'lg:translate-x-0'} {panelClass}"
>
  <div
    class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-white min-w-0"
  >
    {@render children?.()}
  </div>

  <!-- Toggle Button - attached to panel, mobile only (matches ONS Census Atlas) -->
  {#if showToggle}
    <div
      class="lg:hidden absolute inset-0 {position === 'left'
        ? 'left-[100%]'
        : 'right-[100%]'} my-auto h-24"
      class:hidden={false}
    >
      <button
        class="relative flex flex-col justify-center items-center z-50 bg-white w-[40px] h-[76px] py-3 shadow-[6px_4px_10px_-1px_rgba(0,0,0,0.3)] transform-gpu hover:bg-gray-50 active:bg-white {position ===
        'left'
          ? 'rounded-r-md'
          : 'rounded-l-md'} {toggleButtonClass}"
        onclick={toggle}
        aria-label={navState.open ? "Close side panel" : "Open side panel"}
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
</div>

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
</style>
