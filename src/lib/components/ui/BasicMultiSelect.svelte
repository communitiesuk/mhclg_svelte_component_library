<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import IconSearch from "../../icons/IconSearch.svelte";

  type Option = { id: string | number; label: string };
  type SelectedWithColor = Option & { color: string };
  type SelectedItem = Option | SelectedWithColor;

  // ---------- Props ----------
  let {
    options = [],
    selected = $bindable<SelectedItem[]>([]),
    colorArray = ["#808080"],
    placeholder = "Search and select…",
    label = "Choose options",
    hint,

    // NEW: toggle colours/dots
    enableColors = true,
  }: {
    options?: Option[];
    selected?: SelectedItem[];
    colorArray?: string[];
    placeholder?: string;
    label?: string;
    hint?: string;
    enableColors?: boolean;
  } = $props();

  let showDropdown = $state(false);
  let search = $state("");

  // Cursor used ONLY when palette is exhausted (Option 2)
  let colorCursor = $state(0);

  function nextColorPreferUnused(used?: Set<string>) {
    if (!Array.isArray(colorArray) || colorArray.length === 0) return "#808080";

    const usedColors =
      used ??
      new Set(
        selected
          .filter((s): s is SelectedWithColor => "color" in s && !!s.color)
          .map((s) => s.color),
      );

    // 1) Prefer unused
    const unused = colorArray.find((c) => !usedColors.has(c));
    if (unused) return unused;

    // 2) Otherwise cycle
    const color = colorArray[colorCursor % colorArray.length];
    colorCursor = (colorCursor + 1) % colorArray.length;
    return color;
  }

  // ---------- Assign colours to incoming items (missing colours only) ----------
  $effect(() => {
    if (!enableColors) return; // NEW: turn off all color assignment
    if (!Array.isArray(selected)) return;
    if (!Array.isArray(colorArray) || colorArray.length === 0) return;

    if (colorCursor >= colorArray.length) colorCursor = 0;

    const used = new Set(
      selected
        .filter((s): s is SelectedWithColor => "color" in s && !!s.color)
        .map((s) => s.color),
    );

    let changed = false;

    const updated = selected.map((item) => {
      if ("color" in item && item.color) return item;

      const color = nextColorPreferUnused(used);
      used.add(color);
      changed = true;

      return { ...(item as Option), color };
    });

    if (changed) selected = updated;
  });

  // ---------- Compute filtered options ----------
  const filteredOptions = $derived.by(() => {
    const q = search.trim().toLowerCase();
    const selectedIds = new Set(selected.map((s) => s.id));

    return options.filter(
      (o) => !selectedIds.has(o.id) && o.label.toLowerCase().includes(q),
    );
  });

  // ---------- Actions ----------
  function selectOption(option: Option) {
    if (enableColors) {
      const color = nextColorPreferUnused();
      selected = [...selected, { ...option, color }];
    } else {
      selected = [...selected, option]; // plain option, no color
    }

    search = "";
    showDropdown = false;
  }

  function remove(id: Option["id"]) {
    selected = selected.filter((s) => s.id !== id);
  }

  // Close dropdown on outside click — browser only
  let container: HTMLDivElement | null = null;
  let inputEl: HTMLInputElement | null = null;

  function open() {
    showDropdown = true;
    queueMicrotask(() => inputEl?.focus());
  }

  onMount(() => {
    if (!browser) return;

    function handleOutside(e: MouseEvent) {
      if (container && !container.contains(e.target as Node)) {
        showDropdown = false;
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  });
</script>

<div class="gem-c-select-with-search" bind:this={container}>
  <label class="govuk-label" for="ms-input">{label}</label>
  {#if hint}
    <div class="govuk-hint">{hint}</div>
  {/if}

  <div
    class:choices={true}
    class:is-open={showDropdown}
    class:is-focused={showDropdown}
    data-type="select-multiple"
    on:click={open}
  >
    <!-- BOX wraps input + chips -->
    <div class="choices__box">
      <div class="choices__inner">
        <input
          id="ms-input"
          class="choices__input"
          bind:this={inputEl}
          bind:value={search}
          {placeholder}
          autocomplete="off"
          on:focus={() => (showDropdown = true)}
          on:input={() => (showDropdown = true)}
        />
      </div>

      {#if selected.length}
        <div class="ms-divider" aria-hidden="true"></div>

        <div
          class="choices__list choices__list--multiple"
          aria-label="Selected items"
        >
          {#each selected as item (item.id)}
            <span class="choices__item">
              {#if enableColors && "color" in item}
                <span
                  class="choices__item-circle"
                  style={`background:${item.color}`}
                ></span>
              {/if}

              <span class="choices__item-label">{item.label}</span>

              <button
                type="button"
                class="choices__button"
                on:click|stopPropagation={() => remove(item.id)}
                aria-label={`Remove ${item.label}`}
                title={`Remove ${item.label}`}
              >
                ×
              </button>
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- ICON BUTTON as sibling -->
    <button
      type="button"
      class="search-addon-btn"
      aria-label="Search"
      title="Search"
      on:click|stopPropagation={() => open()}
    >
      <span class="search-addon-icon"><IconSearch /></span>
    </button>

    {#if showDropdown}
      <div
        class="choices__list choices__list--dropdown"
        role="listbox"
        aria-label="Options"
      >
        {#each filteredOptions as o (o.id)}
          <div
            class="choices__item choices__item--selectable"
            role="option"
            on:click={() => selectOption(o)}
          >
            {o.label}
          </div>
        {/each}

        {#if filteredOptions.length === 0}
          <div class="choices__item" aria-disabled="true" style="opacity:0.75">
            No results found
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  /* ========================================
     TOKENS
  ======================================== */

  :root {
    --govuk-black: #0b0c0c;
    --govuk-blue: #1d70b8;
    --govuk-grey: #b1b4b6;
    --govuk-light-grey: #f3f2f1;
    --govuk-focus: #fd0;

    --select-height: 46px;
    --item-height: 44px;
  }

  /* ========================================
     LABEL (your rules)
  ======================================== */

  :global(.govuk-label) {
    font-family: "GDS Transport", arial, sans-serif;
    font-size: 1.1875rem;
    line-height: 1.31;
    color: var(--govuk-black);
    display: block;
    margin-bottom: 5px;
  }

  /* ========================================
     CHOICES BASE
  ======================================== */

  :global(.gem-c-select-with-search) .choices {
    position: relative;
    font-size: 19px;

    display: flex;
    align-items: stretch; /* makes both children same height */
    gap: 0; /* no gap between box and button */
  }

  /* Outer box contains BOTH input and chips */
  :global(.gem-c-select-with-search) .choices__box {
    border: 2px solid var(--govuk-black);
    border-radius: 0;
    background: white;

    flex: 1 1 auto;
    min-width: 0;
  }

  /* Yellow focus ring around WHOLE box */
  :global(.gem-c-select-with-search) .choices.is-focused .choices__box,
  :global(.gem-c-select-with-search) .choices.is-open .choices__box {
    outline: 3px solid var(--govuk-focus);
    outline-offset: 0;
    box-shadow: inset 0 0 0 2px var(--govuk-black);
  }

  :global(.gem-c-select-with-search) .choices__inner {
    border: 0;
    background: white;
    min-height: var(--select-height);
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 8px;
    cursor: text;
  }

  :global(.gem-c-select-with-search) .choices__input {
    border: none;
    font-size: 19px;
    margin: 0;
    width: 100%;
    min-width: 0;
  }

  :global(.gem-c-select-with-search) .choices__input:focus {
    outline: none;
  }

  .ms-searchIcon {
    display: inline-flex;
    color: #505a5f;
    flex: 0 0 auto;
    margin-left: 4px;
  }

  /* Divider between input and chips */
  .ms-divider {
    border-top: 1px solid var(--govuk-grey);
    margin: 0;
  }

  /* ========================================
     MULTI SELECT CHIPS
  ======================================== */

  /* IMPORTANT: padding so chips don't clip the bottom */
  :global(.gem-c-select-with-search) .choices__list--multiple {
    padding: 0 5px 8px;
  }

  :global(.gem-c-select-with-search) .choices__list--multiple .choices__item {
    display: inline-flex;
    align-items: center;
    background: var(--govuk-light-grey);
    color: var(--govuk-black);
    box-shadow: 0 2px 0 var(--govuk-grey);
    border-radius: 0;

    min-height: 32px; /* was 40px */
    padding: 2px 0 2px 10px; /* trim top/bottom + remove right padding */
    margin: 4px 10px 0 0; /* slightly less gap above */
    line-height: 1.2; /* keeps text neat */
  }

  /* circle indicator (only rendered when enableColors = true) */
  :global(.gem-c-select-with-search) .choices__item-circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 8px;
    border: 1px solid var(--govuk-black);
  }

  :global(.gem-c-select-with-search) .choices__item-label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 26ch;
  }

  /* Remove button: square, centered, slightly darker on hover */
  :global(.gem-c-select-with-search)
    .choices[data-type*="select-multiple"]
    .choices__button {
    width: 32px;
    height: 32px;
    padding: 0;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: 0;
    border-left: 1px solid var(--govuk-grey);
    margin-left: 8px;

    background: transparent;
    color: var(--govuk-black);
    font-size: 20px;
    line-height: 1;

    opacity: 0.85;
    cursor: pointer;
    transition:
      background-color 120ms ease,
      opacity 120ms ease;
  }

  :global(.gem-c-select-with-search)
    .choices[data-type*="select-multiple"]
    .choices__button:hover {
    background-color: #e0e0e0;
    opacity: 1;
  }

  :global(.gem-c-select-with-search)
    .choices[data-type*="select-multiple"]
    .choices__button:focus {
    outline: 3px solid var(--govuk-focus);
    outline-offset: 0;
    opacity: 1;
  }

  /* ========================================
     DROPDOWN
  ======================================== */

  :global(.gem-c-select-with-search) .choices__list--dropdown {
    border: 2px solid var(--govuk-black);
    border-top: none;
    background: white;
    max-height: 300px;
    overflow-y: auto;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown .choices__item {
    display: flex;
    align-items: center;
    min-height: var(--item-height);
    padding: 12px 10px;
    position: relative;
    max-width: 100%;
  }

  /* divider lines between dropdown items */
  :global(.gem-c-select-with-search)
    .choices__list--dropdown
    .choices__item::after {
    content: "";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    background: var(--govuk-grey);
  }

  :global(.gem-c-select-with-search)
    .choices__list--dropdown
    .choices__item:last-child::after {
    display: none;
  }

  /* highlight on hover */
  :global(.gem-c-select-with-search) .choices__item--selectable:hover {
    background: var(--govuk-blue);
    color: white;
    cursor: pointer;
  }
  .search-addon-btn {
    flex: 0 0 auto;
    width: 46px;
    height: var(--select-height); /* 46px */
    align-items: center;
    justify-content: center;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 100%;
    background-color: #1d70b8;
    color: #fff;
    border: 0;
    padding: 0;
    font-size: 19px;
    font-family: "GDS Transport", arial, sans-serif;
  }
  .search-addon-btn:focus-visible {
    outline: 3px solid #fd0;
    box-shadow: inset 0 0 0 4px #0b0c0c;
  }

  .search-addon-icon {
    position: relative;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
