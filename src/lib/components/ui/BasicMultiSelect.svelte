<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import IconSearch from "../../icons/IconSearch.svelte";
  import crossIconUrl from "./../../assets/govuk_publishing_components/images/cross-icon.svg";

  type Option = { id: string | number; label: string };

  let {
    options = [],
    selected = $bindable<(string | number)[]>([]),
    colorArray = ["#808080"],
    placeholder = "Search and select…",
    label = "Choose options",
    hint,
    enableColors = true,
    startsWithSearch = true,
    resetButton = false,
  }: {
    options?: Option[];
    selected?: (string | number)[];
    colorArray?: string[];
    placeholder?: string;
    label?: string;
    hint?: string;
    enableColors?: boolean;
    startsWithSearch?: boolean;
    resetButton?: boolean;
  } = $props();

  let showDropdown = $state(false);
  let search = $state("");

  // Internal color map: id → color
  let colorMap = $state<Map<string | number, string>>(new Map());

  // Stores the initial selected ids for reset support
  let initialSelected: (string | number)[] = [];

  const isAtDefault = $derived(() => {
    if (!hasInitialSelection) return true;
    const current = [...selected].sort().join(",");
    const initial = [...initialSelected].sort().join(",");
    return current === initial;
  });

  const hasInitialSelection = $derived(() => initialSelected.length > 0);

  function resetToInitial() {
    selected = [...initialSelected];
    // Prune colorMap to only keep ids in the reset selection
    for (const id of colorMap.keys()) {
      if (!selected.includes(id)) colorMap.delete(id);
    }
    search = "";
    queueMicrotask(() => inputEl?.focus());
  }

  // Cursor used ONLY when palette is exhausted
  let colorCursor = $state(0);

  function nextColorPreferUnused(used?: Set<string>) {
    if (!Array.isArray(colorArray) || colorArray.length === 0) return "#808080";

    const usedColors = used ?? new Set(colorMap.values());

    // 1) Prefer unused
    const unused = colorArray.find((c) => !usedColors.has(c));
    if (unused) return unused;

    // 2) Otherwise cycle
    const color = colorArray[colorCursor % colorArray.length];
    colorCursor = (colorCursor + 1) % colorArray.length;
    return color;
  }

  // Keep colorMap in sync with selected ids
  $effect(() => {
    if (!enableColors) return;
    if (!Array.isArray(selected)) return;
    if (!Array.isArray(colorArray) || colorArray.length === 0) return;

    if (colorCursor >= colorArray.length) colorCursor = 0;

    const used = new Set(colorMap.values());

    for (const id of selected) {
      if (!colorMap.has(id)) {
        const color = nextColorPreferUnused(used);
        used.add(color);
        colorMap.set(id, color);
      }
    }

    // Prune removed ids
    for (const id of colorMap.keys()) {
      if (!selected.includes(id)) colorMap.delete(id);
    }
  });

  const filteredOptions = $derived.by(() => {
    const q = search.trim().toLowerCase();
    const selectedIds = new Set(selected);

    // remove already-selected
    const available = options
      .filter((o) => !selectedIds.has(o.id))
      .slice()
      .sort((a, b) =>
        a.label.localeCompare(b.label, undefined, {
          sensitivity: "base",
          numeric: true,
        }),
      );

    const matched = q
      ? available.filter((o) => {
          const lbl = o.label.toLowerCase();
          return startsWithSearch ? lbl.startsWith(q) : lbl.includes(q);
        })
      : available;

    return matched;
  });

  function selectOption(option: Option) {
    if (enableColors) {
      const color = nextColorPreferUnused();
      colorMap.set(option.id, color);
    }
    selected = [...selected, option.id];
    search = "";
  }

  function remove(id: string | number) {
    selected = selected.filter((s) => s !== id);
    colorMap.delete(id);
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
    if (resetButton === true) {
      initialSelected = [...selected];
    }

    function handleOutside(e: MouseEvent) {
      if (container && !container.contains(e.target as Node)) {
        showDropdown = false;
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  });

  function clearAll() {
    selected = [];
    colorMap = new Map();
    search = "";
    queueMicrotask(() => inputEl?.focus());
  }
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
    <div class="choices__search-row">
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
          <div
            class="choices__list choices__list--multiple"
            aria-label="Selected items"
          >
            {#each selected as id (id)}
              {@const item = options.find((o) => o.id === id)}
              {#if item}
                <span class="choices__item">
                  {#if enableColors && colorMap.has(id)}
                    <span
                      class="choices__item-circle"
                      style={`background:${colorMap.get(id)}`}
                    ></span>
                  {/if}

                  <span class="choices__item-label">{item.label}</span>

                  <button
                    type="button"
                    class="choices__button"
                    on:click|stopPropagation={() => remove(id)}
                    aria-label={`Remove ${item.label}`}
                    title={`Remove ${item.label}`}
                  >
                    <img
                      src={crossIconUrl}
                      alt=""
                      aria-hidden="true"
                      width="18"
                      height="18"
                    />
                  </button>
                </span>
              {/if}
            {/each}
          </div>
        {/if}

        {#if selected.length || (resetButton && hasInitialSelection && !isAtDefault)}
          <div class="choices__actions">
            {#if selected.length}
              <button
                type="button"
                class="choices__clear-all"
                on:click|stopPropagation={clearAll}
              >
                Clear all
              </button>
            {/if}

            {#if resetButton && hasInitialSelection && !isAtDefault}
              <button
                type="button"
                class="choices__reset"
                on:click|stopPropagation={resetToInitial}
              >
                Reset to default
              </button>
            {/if}
          </div>
        {/if}
      </div>

      <button
        type="button"
        class="search-addon-btn"
        aria-label="Search"
        on:click|stopPropagation={() => open()}
      >
        <span class="search-addon-icon"><IconSearch /></span>
      </button>
    </div>
  </div>

  {#if showDropdown}
    <div
      class="choices__list choices__list--dropdown"
      class:is-open={showDropdown}
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

<style>
  :root {
    --govuk-black: #0b0c0c;
    --govuk-blue: #1d70b8;
    --govuk-grey: #b1b4b6;
    --govuk-light-grey: #f3f2f1;
    --govuk-focus: #fd0;

    --select-height: 46px;
    --item-height: 44px;
    --addon-width: 46px;
  }

  :global(.gem-c-select-with-search) {
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

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
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .choices__search-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
  }

  :global(.gem-c-select-with-search) .choices__box {
    border: 2px solid var(--govuk-black);
    border-radius: 0;
    background: white;

    flex: 1 1 auto;
    min-width: 0;

    display: flex;
    flex-direction: column;

    padding-right: 0;
    box-sizing: border-box;
  }

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
    flex: 0 0 var(--select-height);
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

  .ms-divider {
    border-top: 1px solid var(--govuk-grey);
    margin: 0 5px;
  }

  /* ========================================
     MULTI SELECT CHIPS
  ======================================== */

  :global(.gem-c-select-with-search) .choices__list--multiple {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 4px 10px;
    width: 100%;

    border-top: 1px solid var(--govuk-grey);
    margin: 0 5px;
    padding: 8px 8px 10px;
    width: calc(100% - 10px);

    box-sizing: border-box;
  }

  :global(.gem-c-select-with-search) .choices__list--multiple .choices__item {
    display: inline-flex;
    align-items: center;
    background: var(--govuk-light-grey);
    color: var(--govuk-black);
    box-shadow: 0 2px 0 var(--govuk-grey);
    border-radius: 0;

    min-height: 32px;
    padding: 2px 0 2px 10px;
    margin: 4px 10px 0 0;
    line-height: 1.2;

    max-width: 100%;
    box-sizing: border-box;
  }

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
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    word-break: break-word;
    max-width: 26ch;
    line-height: 1.2;
  }

  :global(.gem-c-select-with-search)
    .choices[data-type*="select-multiple"]
    .choices__button {
    width: 32px;
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

    align-self: stretch;
    height: auto;
    min-height: 100%;
    padding: 0 10px;
    border-left: 1px solid var(--govuk-grey);
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
     SEARCH BUTTON
  ======================================== */

  .search-addon-btn {
    width: var(--addon-width);
    height: var(--select-height);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--govuk-blue);
    color: #fff;
    border: 0;
    padding: 0;
    font-size: 19px;
    font-family: "GDS Transport", arial, sans-serif;
    cursor: pointer;
  }

  .search-addon-btn:focus-visible {
    outline: 3px solid var(--govuk-focus);
    box-shadow: inset 0 0 0 4px var(--govuk-black);
  }

  .search-addon-icon {
    position: relative;
    width: var(--addon-width);
    height: var(--addon-width);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown {
    position: static !important;
    inset: auto !important;
    transform: none !important;

    display: block !important;
    width: 100%;
    box-sizing: border-box;

    margin-top: 0;
    border: 2px solid var(--govuk-black);
    border-top: none;
    background: white;

    max-height: 300px;
    overflow-y: auto;
    z-index: auto;
    width: calc(100% - var(--addon-width));
    margin-left: 0;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown .choices__item {
    display: flex;
    align-items: center;
    min-height: var(--item-height);
    padding: 12px 10px;
    position: relative;
    width: 100%;

    box-sizing: border-box;
    flex: 0 0 auto;
    white-space: normal;
  }

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

  :global(.gem-c-select-with-search) .choices__item--selectable:hover {
    background: var(--govuk-blue);
    color: white;
    cursor: pointer;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown {
    display: block !important;
  }

  :global(.gem-c-select-with-search)
    .choices.is-open
    .choices__box
    .choices__inner,
  :global(.gem-c-select-with-search)
    .choices.is-focused
    .choices__box
    .choices__inner {
    border-bottom: 0;
    box-shadow: none;
    margin-bottom: 0 !important;
  }

  :global(.gem-c-select-with-search)
    .choices.is-open
    .choices__box:has(.choices__list--multiple)
    .choices__inner,
  :global(.gem-c-select-with-search)
    .choices.is-focused
    .choices__box:has(.choices__list--multiple)
    .choices__inner {
    border-bottom: 0;
    padding-bottom: 0;
  }

  :global(.gem-c-select-with-search) .choices.is-focused .choices__box,
  :global(.gem-c-select-with-search) .choices.is-open .choices__box {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--govuk-black);
  }

  .search-addon-btn:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--govuk-black);
  }

  :global(.gem-c-select-with-search)
    .choices[data-type*="select-multiple"]
    .choices__button:focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--govuk-black);
  }

  .choices__actions {
    display: block;
    width: 100%;
    box-sizing: border-box;

    margin: 0 5px;
    width: calc(100% - 10px);
    padding: 8px 8px 10px;

    text-align: left;
  }

  .choices__clear-all {
    background: transparent;
    border: 0;
    padding: 0;
    color: var(--govuk-blue);
    font-family: "GDS Transport", arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    text-decoration: underline;
  }

  .choices__clear-all:hover {
    color: #003078;
  }

  .choices__clear-all:focus-visible {
    outline: 3px solid var(--govuk-focus);
    outline-offset: 0;
    box-shadow: inset 0 0 0 3px var(--govuk-black);
    text-decoration: none;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown {
    margin: 0px 1px !important;
    padding: 0;
  }

  .choices__reset {
    background: transparent;
    border: 0;
    padding: 0;
    margin-left: 16px;

    color: var(--govuk-blue);
    font-family: "GDS Transport", arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    text-decoration: underline;
  }

  .choices__reset:hover {
    color: #003078;
  }

  .choices__reset:focus-visible {
    outline: 3px solid var(--govuk-focus);
    outline-offset: 0;
    box-shadow: inset 0 0 0 3px var(--govuk-black);
    text-decoration: none;
  }

  :global(.gem-c-select-with-search) .choices__list--dropdown {
    scrollbar-width: thin;
  }

  :global(.gem-c-select-with-search)
    .choices__list--dropdown::-webkit-scrollbar {
    width: 10px;
  }

  :global(.gem-c-select-with-search)
    .choices__list--dropdown::-webkit-scrollbar-thumb {
    background-color: var(--govuk-grey);
    border-radius: 0;
  }

  .choices__actions:empty {
    display: none;
  }
</style>
