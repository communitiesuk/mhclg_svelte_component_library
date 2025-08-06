<script>
  let {
    navState = $bindable({ open: false }),
    position = "left", // 'left' or 'right'
    width = "27rem", // Using rem like the original
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

<!-- Toggle Button - matches ONS Census Atlas pattern -->
{#if showToggle}
  <button
    class="relative flex flex-col justify-center items-center z-50 bg-white w-[40px] h-[76px] py-3 shadow-[6px_4px_10px_-1px_rgba(0,0,0,0.3)] transform-gpu hover:bg-gray-50 active:bg-white {position ===
    'left'
      ? 'rounded-r-md'
      : 'rounded-l-md'} {toggleButtonClass}"
    style="position: fixed; {position}: 0; top: 50%; transform: translateY(-50%);"
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
{/if}

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
  class="absolute flex inset-0 {position === 'right'
    ? 'left-[3rem] sm:left-[5rem] md:left-[7rem]'
    : 'right-[3rem] sm:right-[5rem] md:right-[7rem]'} lg:relative lg:w-[{width}] xl:w-[{width ===
  '27rem'
    ? '32rem'
    : width}] transition-transform transform-gpu z-20 {!navState.open
    ? position === 'left'
      ? '-translate-x-full'
      : 'translate-x-full'
    : ''} lg:translate-x-0 {panelClass}"
  style="{position === 'left' ? 'left' : 'right'}: 0;"
>
  <div class="grow flex flex-col overflow-y-auto bg-white">
    {@render children?.()}
  </div>
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
