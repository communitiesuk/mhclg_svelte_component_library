<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import Select, { type SelectItem, type SelectGroup } from "./Select.svelte";
  import IconSearch from "../../icons/IconSearch.svelte";
  import crossIconUrl from "./../../assets/govuk_publishing_components/images/cross-icon.svg?url";

  // Import Choices.js dynamically to avoid SSR issues
  let Choices: any;

  // Extend SelectItem to allow additional properties for group key functionality
  type ExtendedSelectItem = SelectItem & { [key: string]: any };
  type ExtendedSelectGroup = SelectGroup & { choices: ExtendedSelectItem[] };

  let {
    // Core attributes - pass through to Select component
    id,
    name,
    items = [],
    groups = [],
    value = $bindable<(string | number)[] | string | number | undefined>(),
    multiple = false,

    // Bindable state props for external synchronization
    bindSelectedItemIndexMap = $bindable(new Map<string, number>()),
    bindNextSelectionIndex = $bindable(0),

    // Label and hints - pass through to Select component
    label,
    labelIsPageHeading = false,
    hint = undefined,

    // Error handling - pass through to Select component
    error = undefined,
    validate = undefined,

    // Search-specific options
    searchPlaceholder = "Search in list",
    allowHTML = true,
    shouldSort = false,
    searchResultLimit = 100,
    removeItemButton = true, // Will default to multiple if not specified

    // Styling and layout - pass through to Select component
    formGroupClasses = "",
    fullWidth = false,
    describedBy = "",
    disabled = false,

    // Placeholder options
    placeholderText = undefined, // Will auto-generate if not provided

    // Choices.js specific options
    choicesOptions = {},

    // Dynamic options sources (static or API)
    // If provided, component can fetch options from an API based on user input
    source_url = undefined,
    source_key = undefined,
    source_property = undefined,
    /**
     * Decide whether to use 'api' or 'options' for a given query.
     * Defaults to using API when source_url/source_key are present and query length >= 3
     */
    sourceSelector = undefined,

    // Minimum length and too-short text (mirrors SearchAutocomplete)
    minLength = 0,
    tTooShort = (n: number) => `Enter ${n} or more characters for suggestions`,

    // Group key for displaying additional context in options
    groupKey = undefined,

    // Custom styling props
    choicesItemBackgroundColor = "#f3f2f1",
    choicesItemBorderColor = "#b1b4b6",
    choicesItemTextColor = "black",
    choicesItemDividerPadding = "10px",
    // Circle feature props
    enableSelectedItemCircles = true,
    selectedItemCircleColor = "#1d70b8", // Default color when not using palette
    selectedItemCircleColorPalette = [
      // Complete GOV.UK Design System palette (19 colors)
      // Maximum selections = 19 before colors start cycling
      "#1d70b8", // Blue (primary)
      "#d4351c", // Red
      "#00703c", // Green
      "#f47738", // Orange
      "#4c2c92", // Purple
      "#801650", // Bright purple
      "#28a197", // Turquoise
      "#b58840", // Brown
      "#d53880", // Pink
      "#6f72af", // Light purple
      "#f499be", // Light pink
      "#85994b", // Light green
      "#ffdd00", // Yellow
      "#12436d", // Dark blue
      "#505a5f", // Dark grey
      "#626a6e", // Mid grey
      "#b1b4b6", // Light grey
      "#0b0c0c", // Black
    ], // Complete GOV.UK Design System palette (19 colors)

    ...attributes
  }: {
    id: string;
    name: string;
    items?: ExtendedSelectItem[];
    groups?: ExtendedSelectGroup[];
    value?: (string | number)[] | string | number | undefined;
    multiple?: boolean;
    label: string;
    labelIsPageHeading?: boolean;
    hint?: string;
    error?: string;
    validate?: (value: any) => string | undefined;
    searchPlaceholder?: string;
    allowHTML?: boolean;
    shouldSort?: boolean;
    searchResultLimit?: number;
    removeItemButton?: boolean;
    formGroupClasses?: string;
    fullWidth?: boolean;
    describedBy?: string;
    disabled?: boolean;
    placeholderText?: string;
    choicesOptions?: any;
    source_url?: string;
    source_key?: string;
    source_property?: string;
    sourceSelector?: (query: string, options: any[]) => "api" | "options";
    minLength?: number;
    tTooShort?: (n: number) => string;
    groupKey?: string;
    choicesItemBackgroundColor?: string;
    choicesItemBorderColor?: string;
    choicesItemTextColor?: string;
    choicesItemDividerPadding?: string;
    enableSelectedItemCircles?: boolean;
    selectedItemCircleColor?: string;
    selectedItemCircleColorPalette?: string[];

    // Bindable state props for external synchronization
    // Use these to sync color state with other components
    bindSelectedItemIndexMap?: Map<string, number> | SvelteMap<string, number>; // Maps item values to their color indices
    bindNextSelectionIndex?: number; // Next available color index
  } & Omit<
    import("svelte/elements").HTMLSelectAttributes,
    | "id"
    | "name"
    | "value"
    | "class"
    | "aria-describedby"
    | "multiple"
    | "disabled"
  > = $props();

  // Select element reference from child component
  let selectElement = $state<HTMLSelectElement | undefined>();
  let choicesInstance: any;
  let searchInputElement: HTMLInputElement | null = null;
  let debounceTimer: any = null;
  let lastQuery = "";
  const baseNoChoicesText = "No choices to choose from";

  // Helper function for getting group text
  function getGroupText(item: any): string | undefined {
    if (!groupKey || !item || typeof item !== "object") return undefined;
    return item[groupKey] ? String(item[groupKey]) : undefined;
  }

  // Helper function to ensure group text is applied to choices
  function ensureGroupTextApplied(choices: any[]) {
    if (!groupKey || !choices || choices.length === 0) return choices;

    console.log("🔧 Ensuring group text is applied to choices");

    return choices.map((choice) => {
      // Find the original item to get group text
      const originalItem = staticChoices.find(
        (item) => String(item.value) === String(choice.value),
      );

      if (originalItem && originalItem.label !== choice.label) {
        console.log("✅ Applying group text to choice:", {
          value: choice.value,
          originalLabel: choice.label,
          newLabel: originalItem.label,
        });
        return {
          ...choice,
          label: originalItem.label,
        };
      }

      return choice;
    });
  }

  // HTML escaping function (simple version)
  function escapeHtml(text: string): string {
    if (typeof document === "undefined") return text; // SSR safety
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Sequential color mapping: each selected item gets a unique color based on selection order
  // This ensures perfect visual distinction and predictable color assignment
  // 1st selection = color[0], 2nd selection = color[1], 3rd selection = color[2], etc.

  // Architecture: Single source of truth using external bindings with fallbacks
  // This eliminates state duplication and sync complexity
  // Use $derived for reading external bindings reactively
  // This ensures that when external bindings change, our local state updates automatically
  let selectedItemIndexMap = $derived(
    bindSelectedItemIndexMap || new SvelteMap<string, number>(),
  );
  let nextSelectionIndex = $derived(bindNextSelectionIndex ?? 0);

  // Helper function to update external bindings when we modify state
  function updateNextSelectionIndex(newValue: number) {
    if (bindNextSelectionIndex !== undefined) {
      bindNextSelectionIndex = newValue;
    }
  }

  // Get the maximum number of selections allowed (limited by palette size)
  // With 19 GOV.UK colors, maximum selections = 19 before cycling begins
  const maxSelections = selectedItemCircleColorPalette.length;

  // Function to get color for a selected item based on its selection order
  function getColorForSelectedItem(itemValue: string | number): string {
    const valueKey = String(itemValue);

    // If this item already has an index, use it
    if (selectedItemIndexMap.has(valueKey)) {
      const index = selectedItemIndexMap.get(valueKey)!;
      console.log("🎨 Color index map hit (existing item):", {
        itemValue: valueKey,
        existingColorIndex: index,
        existingColor: selectedItemCircleColorPalette[index],
        totalMappedItems: selectedItemIndexMap.size,
      });
      return selectedItemCircleColorPalette[index];
    }

    // If we've reached the palette limit, cycle back to the beginning
    // This means the 20th selection will get color[0], 21st will get color[1], etc.
    if (nextSelectionIndex >= maxSelections) {
      updateNextSelectionIndex(0);
    }

    // Assign the next available color index to this item
    const colorIndex = nextSelectionIndex;
    // SvelteMap.set() automatically triggers reactivity and updates external bindings
    selectedItemIndexMap.set(valueKey, colorIndex);
    updateNextSelectionIndex(colorIndex + 1);

    // Log the index map update for debugging
    console.log("🎨 Color index map updated:", {
      itemValue: valueKey,
      assignedColorIndex: colorIndex,
      assignedColor: selectedItemCircleColorPalette[colorIndex],
      nextSelectionIndex: colorIndex + 1,
      totalMappedItems: selectedItemIndexMap.size,
      currentMap: Object.fromEntries(selectedItemIndexMap),
    });

    return selectedItemCircleColorPalette[colorIndex];
  }

  // Color cache to ensure consistent colors for the same values
  const colorCache = new Map<string, string>();

  /**
   * Generate a consistent, deterministic color for a given value.
   * Uses sequential index-based mapping for perfect visual distinction.
   * Each selected item gets a unique color based on selection order.
   */
  function colorForValue(val: unknown): string {
    const key = String(val).toLowerCase().trim();
    const cached = colorCache.get(key);
    if (cached) return cached;

    // Use sequential color mapping instead of hash-based approach
    const color = getColorForSelectedItem(String(val));
    colorCache.set(key, color);
    return color;
  }

  // Computed values for component configuration
  let computedPlaceholderText = $derived(
    placeholderText || (multiple ? "Select all that apply" : "Select one"),
  );

  let computedRemoveItemButton = $derived(
    removeItemButton !== undefined ? removeItemButton : multiple,
  );

  // Enhanced items with placeholder for single select
  let enhancedItems = $derived.by(() => {
    if (multiple) return items;
    return [
      { value: "", text: computedPlaceholderText, disabled: false },
      ...items,
    ];
  });

  // Flatten current select items (including groups) into Choices-compatible objects
  type ChoiceItem = {
    value: string | number;
    label: string;
    disabled?: boolean;
  };
  const staticChoices = $derived.by<ChoiceItem[]>(() => {
    /** @type {ChoiceItem[]} */
    const flattened: ChoiceItem[] = [];
    // Include enhancedItems() first (single-select placeholder support)
    for (const it of enhancedItems) {
      const groupText = getGroupText(it);
      const safeLabel = escapeHtml(String(it.text));
      const safeGroup = groupText ? escapeHtml(groupText) : "";

      flattened.push({
        value: it.value,
        label: safeGroup
          ? `<span class="choices__item-label">
               <span class="choices__item-main">${safeLabel}</span>
               <span class="gem-c-select-with-search__suggestion-group">${safeGroup}</span>
             </span>`
          : safeLabel,
        disabled: it.disabled,
      });
    }
    // Then any explicit groups
    for (const g of groups) {
      for (const choice of g.choices) {
        const groupText = getGroupText(choice);
        const safeLabel = escapeHtml(String(choice.text));
        const safeGroup = groupText ? escapeHtml(groupText) : "";

        flattened.push({
          value: choice.value,
          label: safeGroup
            ? `<span class="choices__item-label">
                 <span class="choices__item-main">${safeLabel}</span>
                 <span class="gem-c-select-with-search__suggestion-group">${safeGroup}</span>
               </span>`
            : safeLabel,
          disabled: g.disabled || choice.disabled,
        });
      }
    }
    return flattened;
  });

  // Strip tags so a custom sourceSelector can reason about labels
  const staticPlainOptions = $derived.by(() =>
    staticChoices.map((c) => ({
      ...c,
      label: String(c.label).replace(/<[^>]*>/g, ""),
    })),
  );

  // Helper function to detect if a query looks like a postcode
  function looksLikePostcode(query: string): boolean {
    // UK postcode pattern: A1 1AA, A11 1AA, AA1 1AA, AA11 1AA
    const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i;
    return postcodePattern.test(query);
  }

  // Define the search modes
  type Mode = "short" | "options" | "api";
  let currentMode: Mode = "options";

  // Determine component configuration type
  const hasApi = Boolean(source_url && source_key);
  const hasStatic = staticChoices.length > (multiple ? 0 : 1); // (>1 if single because of placeholder)
  const isDual = hasApi && hasStatic;
  const isOptionsOnly = !hasApi && hasStatic;

  // Decide which search mode to use based on query and configuration
  function decideMode(query: string): Mode {
    const q = query.trim();

    console.log("🔍 Mode decision factors:", {
      query: q,
      queryLength: q.length,
      minLength,
      hasApi,
      hasStatic,
      isDual,
      isOptionsOnly,
      itemsCount: items?.length || 0,
      groupsCount: groups?.length || 0,
    });

    // For dual-mode, gate initially until user types
    if (isDual) {
      if (q.length < minLength) {
        console.log("🎯 Dual-mode: gating initially (query too short)");
        return "short";
      }

      // Let sourceSelector override if provided
      if (typeof sourceSelector === "function") {
        try {
          const pick = sourceSelector(q, staticPlainOptions);
          console.log("🎯 sourceSelector returned:", pick);
          if (pick === "api" && hasApi) return "api";
          if (pick === "options" && hasStatic) return "options";
        } catch (error) {
          console.warn("⚠️ sourceSelector error:", error);
        }
      }

      // Default dual-mode logic: postcode → API, else → options
      const defaultMode = looksLikePostcode(q) ? "api" : "options";
      console.log("🎯 Dual-mode default decision:", defaultMode);
      return defaultMode;
    }

    // For options-only, show immediately
    if (isOptionsOnly) {
      console.log("🎯 Options-only: showing immediately");
      return "options";
    }

    // For API-only, gate until minLength
    if (hasApi && !hasStatic) {
      if (q.length < minLength) {
        console.log("🎯 API-only: gating until minLength");
        return "short";
      }
      console.log("🎯 API-only: using API");
      return "api";
    }

    // Fallback
    console.log("🎯 Fallback: using options");
    return "options";
  }

  // Apply the selected mode to Choices.js configuration
  function applyMode(newMode: Mode) {
    if (!choicesInstance || currentMode === newMode) return;

    // Ensure the instance is fully initialized
    if (!choicesInstance.initialised) {
      console.log(
        "⚠️ Choices instance not fully initialized, skipping mode application",
      );
      return;
    }

    currentMode = newMode;

    console.log("🔄 Applying mode:", newMode);

    if (newMode === "short") {
      choicesInstance.config.searchChoices = false;
      choicesInstance.config.noChoicesText = tTooShort(minLength);
      choicesInstance.clearChoices();
      choicesInstance.setChoices([], "value", "label", true);
      // Force refresh to show the message
      return;
    }

    if (newMode === "options") {
      // For options mode, we control the list (not Choices' internal filter)
      choicesInstance.config.searchChoices = false;

      if (hasStatic) {
        resetToStaticChoices(); // ensure full dataset is present with group text
        // Don't set noChoicesText here - let the search logic handle it
        // This allows us to show "No results found" vs "No choices to choose from"
      } else {
        // No static options available - show appropriate message
        choicesInstance.config.noChoicesText = "No static options available";
        choicesInstance.clearChoices();
        choicesInstance.setChoices([], "value", "label", true);
      }
      return;
    }

    // mode === "api"
    choicesInstance.config.searchChoices = false; // we own filtering & list
    choicesInstance.config.noChoicesText = "No choices to choose from";
    // Clear choices and force refresh to show the message
    choicesInstance.clearChoices();
    choicesInstance.setChoices([], "value", "label", true);
    // Force refresh to show the message
  }

  // Default selection logic between API and static options
  function selectSource(query: string): "api" | "options" {
    if (typeof sourceSelector === "function") {
      try {
        return sourceSelector(query, staticPlainOptions);
      } catch {
        // fall through to default
      }
    }

    // Check if we have static options (items or groups with choices)
    const hasStaticOptions =
      (items && items.length > 0) ||
      (groups && groups.some((g) => g.choices && g.choices.length > 0));

    // If we have static options, use them; otherwise default to API if configured
    if (hasStaticOptions) {
      return "options";
    } else if (source_url && source_key && query.trim().length >= minLength) {
      return "api";
    } else {
      return "options"; // fallback to options even if empty
    }
  }

  // Build URL for API requests. Replaces {query} placeholder or appends ?q=
  function buildApiUrl(query: string): string {
    if (!source_url) return "";
    if (source_url.includes("{query}")) {
      return source_url.replace("{query}", encodeURIComponent(query));
    }
    const separator = source_url.includes("?") ? "&" : "?";
    return `${source_url}${separator}q=${encodeURIComponent(query)}`;
  }

  function toLabel(o: any): string {
    if (o == null) return "";
    if (typeof o === "string") return o;
    if (source_property && o[source_property] != null)
      return String(o[source_property]);
    if (o.label != null) return String(o.label);
    if (o.postcode != null) return String(o.postcode);
    if (o.name != null) return String(o.name);
    if (o.title != null) return String(o.title);
    try {
      return JSON.stringify(o);
    } catch {
      return String(o);
    }
  }

  function toValue(o: any, label: string): string | number {
    if (o && typeof o === "object" && "value" in o && o.value != null)
      return o.value as string | number;
    return label;
  }

  async function fetchApiChoices(query: string): Promise<ChoiceItem[]> {
    const url = buildApiUrl(query);
    if (!url) return [];
    const res = await fetch(url);
    const json = await res.json();
    const data = (json && source_key ? json[source_key] : undefined) as
      | any[]
      | undefined;
    if (!Array.isArray(data)) return [];

    const mapped: ChoiceItem[] = data.map((entry) => {
      const label = toLabel(entry);
      const groupText = getGroupText(entry);
      const safeLabel = escapeHtml(label);
      const safeGroup = groupText ? escapeHtml(groupText) : "";

      return {
        value: toValue(entry, label),
        label: safeGroup
          ? `<span class="choices__item-label">
               <span class="choices__item-main">${safeLabel}</span>
               <span class="gem-c-select-with-search__suggestion-group">${safeGroup}</span>
             </span>`
          : safeLabel,
      };
    });

    return mapped;
  }

  function resetToStaticChoices() {
    if (!choicesInstance || !choicesInstance.initialised) {
      console.log(
        "⚠️ Choices instance not ready, skipping resetToStaticChoices",
      );
      return;
    }

    console.log("🔄 resetToStaticChoices called");

    // Get currently selected values to exclude from static choices
    let selectedValues: string[] = [];
    try {
      const currentValue = choicesInstance.getValue(true);
      console.log("🎯 Current value from choicesInstance:", currentValue);

      if (Array.isArray(currentValue)) {
        selectedValues = currentValue.map((item: any) =>
          String(item.value || item),
        );
      } else if (currentValue && typeof currentValue === "object") {
        // Handle single selection case
        selectedValues = [String(currentValue.value || currentValue)];
      } else if (currentValue) {
        // Handle primitive value case
        selectedValues = [String(currentValue)];
      }
    } catch (error) {
      console.warn("⚠️ Error getting current value:", error);
      selectedValues = [];
    }

    console.log("🎯 Selected values to exclude:", selectedValues);

    // For grouped options, we need to restore the original structure
    if (groups && groups.length > 0) {
      console.log("📋 Restoring grouped options structure");

      // Clear current choices
      choicesInstance.clearChoices();

      // Restore the original select element structure
      if (selectElement) {
        // Remove all existing options
        while (selectElement.firstChild) {
          selectElement.removeChild(selectElement.firstChild);
        }

        // Add placeholder option for single select
        if (!multiple) {
          const placeholderOption = document.createElement("option");
          placeholderOption.value = "";
          placeholderOption.textContent = computedPlaceholderText;
          placeholderOption.selected = true;
          selectElement.appendChild(placeholderOption);
        }

        // Add grouped options
        groups.forEach((group) => {
          const optgroup = document.createElement("optgroup");
          optgroup.label = group.label;

          group.choices.forEach((choice) => {
            const option = document.createElement("option");
            option.value = String(choice.value);
            option.textContent = String(choice.text);
            option.disabled =
              choice.disabled || false || group.disabled || false;

            // Check if this option is currently selected
            if (selectedValues.includes(String(choice.value))) {
              option.selected = true;
            }

            optgroup.appendChild(option);
          });

          if (selectElement) {
            selectElement.appendChild(optgroup);
          }
        });

        // Reinitialize Choices.js with the restored structure
        choicesInstance.destroy();
        if (selectElement) {
          choicesInstance = new Choices(selectElement, {
            allowHTML,
            searchPlaceholderValue: searchPlaceholder,
            shouldSort: false, // Force false to preserve placeholder position
            placeholder: true, // Ensure placeholder option is treated as placeholder
            itemSelectText: "",
            searchResultLimit,
            removeItemButton: computedRemoveItemButton,
            labelId:
              id +
              "-label " +
              (selectElement.getAttribute("aria-describedby") || ""),
            searchFloor: minLength,
            // Don't set searchChoices here - let applyMode handle it
            // Don't set noChoicesText here - let the search logic handle it
            duplicateItemsAllowed: false,
            fuseOptions: {
              ignoreLocation: true,
              threshold: 0,
            },
            // Add the custom template callback to preserve colored circles
            callbackOnCreateTemplates: function (strToEl: any) {
              // public class names exposed by Choices
              const cn = this.config.classNames;
              const isMulti = this.passedElement?.element?.multiple === true;

              // small escape for when allowHTML=false
              const esc = (s: string) =>
                String(s)
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");

              // try to keep any existing templates if your build exposes them
              const base = (this as any)._templates ?? {};

              return {
                ...base,

                // Custom item template for chips (selected items), not dropdown choices
                item: (_classNames: any, data: any) => {
                  const classes = [
                    cn.item,
                    data.highlighted ? cn.highlightedState : cn.itemSelectable,
                    data.placeholder ? cn.placeholder : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  // ✅ Decide if this chip should be deletable
                  const showRemove =
                    isMulti && this.config.removeItemButton && !data.disabled;

                  // Circle
                  let circle = "";
                  if (enableSelectedItemCircles && isMulti && data.active) {
                    const color = colorForValue(data.value); // ✅ value-only, stable
                    circle = `<span class="choices__item-circle" style="background:${color}"></span>`;
                  }

                  // Label
                  const labelHtml = allowHTML ? data.label : esc(data.label);

                  // Remove button (same markup Choices normally generates)
                  const removeBtn = showRemove
                    ? `<button type="button"
                               class="${cn.button}"
                               data-button
                               aria-label="Remove ${esc(String(data.value))}"></button>`
                    : "";

                  return strToEl(
                    `<div class="${classes}"
                          data-item
                          data-id="${data.id}"
                          data-value="${String(data.value)}"
                          ${showRemove ? "data-deletable" : ""}
                          ${data.active ? 'aria-selected="true"' : ""}
                          ${data.disabled ? 'aria-disabled="true"' : ""}>
                        ${circle}${labelHtml}${removeBtn}
                     </div>`,
                  );
                },
              };
            },
            ...choicesOptions,
          });

          // Store reference on the element for external access
          (selectElement as any).choices = choicesInstance;

          // Re-apply the current mode after reinitialization
          setTimeout(() => {
            if (choicesInstance) {
              applyMode(currentMode);
              console.log(
                "🔄 Re-applied current mode after reinitialization:",
                currentMode,
              );
            }
          }, 0);

          // Restore focus to the main Choices container after reinitialization
          setTimeout(() => {
            if (choicesInstance?.containerOuter?.element) {
              choicesInstance.containerOuter.element.focus();
              console.log("🎯 Focus restored to Choices container");
            }
          }, 0);
        }

        console.log("✅ Restored grouped options structure");
      }
    } else {
      // For non-grouped options, use the existing logic
      console.log("📋 Restoring flat options structure");

      // For options-only mode, show all choices; for search results, filter by selected values
      const choicesToShow =
        currentMode === "options" && !isDual
          ? staticChoices // Show all choices for options-only mode
          : staticChoices.filter(
              (choice) => !selectedValues.includes(String(choice.value)),
            ); // Filter for dual-mode

      console.log("🔍 Static choices to show:", {
        total: staticChoices.length,
        toShow: choicesToShow.length,
        mode: currentMode,
        isDual,
        isOptionsOnly,
        excluded: staticChoices.length - choicesToShow.length,
      });

      choicesInstance.clearChoices();

      // Ensure placeholder is first in the choices array
      const choicesWithPlaceholder = [
        // Add placeholder option first if it's a single select
        ...(multiple
          ? []
          : [
              {
                value: "",
                label: computedPlaceholderText,
                disabled: false,
                placeholder: true,
              },
            ]),
        // Add choices to show
        ...choicesToShow.map((c) => ({
          value: String(c.value),
          label: c.label,
          disabled: c.disabled,
        })),
      ];

      // Ensure group text is applied to choices
      const choicesWithGroupText = ensureGroupTextApplied(
        choicesWithPlaceholder,
      );

      choicesInstance.setChoices(choicesWithGroupText, "value", "label", true);
      console.log(
        "✅ Set static choices with group text:",
        choicesWithGroupText.length,
      );

      // Custom templates are automatically applied when setChoices is called
      // No need for additional refresh calls
    }
  }

  // Initialize Choices.js
  onMount(async () => {
    console.log("🔧 MultiSelectSearchAutocomplete: onMount started", {
      id,
      name,
      multiple,
      items: items.length,
      groups: groups.length,
      source_url,
      source_key,
      minLength,
    });

    try {
      // Import Choices.js dynamically
      const ChoicesModule = await import("choices.js");
      Choices = ChoicesModule.default;
      console.log("✅ Choices.js imported successfully");

      if (!selectElement) {
        console.error("❌ Select element not found");
        return;
      }

      // Ensure the DOM structure is correct before Choices.js initializes
      if (!multiple && (items.length > 0 || groups.length > 0)) {
        console.log("🔧 Ensuring correct DOM structure for placeholder");

        // Log the current DOM structure before any changes
        console.log("📋 DOM structure BEFORE placeholder check:", {
          totalOptions: selectElement.options.length,
          options: Array.from(selectElement.options).map((opt, idx) => ({
            index: idx,
            value: (opt as HTMLOptionElement).value,
            text: (opt as HTMLOptionElement).text,
            selected: (opt as HTMLOptionElement).selected,
            disabled: (opt as HTMLOptionElement).disabled,
          })),
        });

        // Check if placeholder option already exists
        const existingPlaceholder = selectElement.querySelector(
          'option[value=""]',
        ) as HTMLOptionElement | null;
        console.log("🔍 Existing placeholder check:", {
          found: !!existingPlaceholder,
          placeholder: existingPlaceholder
            ? {
                value: existingPlaceholder.value,
                text: existingPlaceholder.textContent,
                selected: existingPlaceholder.selected,
              }
            : null,
        });

        if (!existingPlaceholder) {
          // Create placeholder option if it doesn't exist
          const placeholderOption = document.createElement("option");
          placeholderOption.value = "";
          placeholderOption.textContent = computedPlaceholderText;
          placeholderOption.selected = true;
          selectElement.insertBefore(
            placeholderOption,
            selectElement.firstChild,
          );
          console.log("✅ Added placeholder option to DOM");
        }

        // If groupKey is provided, update all existing options to include group text
        if (groupKey && selectElement) {
          console.log("🔧 Updating DOM options with group text");
          // Update items options
          items.forEach((item, index) => {
            const optionIndex = multiple ? index : index + 1; // +1 for placeholder
            if (selectElement && selectElement.options[optionIndex]) {
              const groupText = getGroupText(item);
              const safeLabel = escapeHtml(String(item.text));
              const safeGroup = groupText ? escapeHtml(groupText) : "";
              const option = selectElement.options[optionIndex];

              if (safeGroup) {
                option.innerHTML = `<span class="choices__item-label">
                  <span class="choices__item-main">${safeLabel}</span>
                  <span class="gem-c-select-with-search__suggestion-group">${safeGroup}</span>
                </span>`;
                console.log(
                  "✅ Updated item option with group text:",
                  option.innerHTML,
                );
              }
            }
          });

          // Update grouped options
          let optionIndex = multiple ? items.length : items.length + 1; // +1 for placeholder
          groups.forEach((group) => {
            group.choices.forEach((choice) => {
              if (selectElement && selectElement.options[optionIndex]) {
                const groupText = getGroupText(choice);
                const safeLabel = escapeHtml(String(choice.text));
                const safeGroup = groupText ? escapeHtml(groupText) : "";
                const option = selectElement.options[optionIndex];

                if (safeGroup) {
                  option.innerHTML = `<span class="choices__item-label">
                  <span class="choices__item-main">${safeLabel}</span>
                  <span class="gem-c-select-with-search__suggestion-group">${safeGroup}</span>
                </span>`;
                  console.log(
                    "✅ Updated grouped option with group text:",
                    option.innerHTML,
                  );
                }
              }
              optionIndex++;
            });
          });
        }

        // Log the DOM structure after ensuring placeholder exists
        console.log("📋 DOM structure AFTER placeholder check:", {
          totalOptions: selectElement.options.length,
          options: Array.from(selectElement.options).map((opt, idx) => ({
            index: idx,
            value: (opt as HTMLOptionElement).value,
            text: (opt as HTMLOptionElement).text,
            innerHTML: (opt as HTMLOptionElement).innerHTML,
            selected: (opt as HTMLOptionElement).selected,
            disabled: (opt as HTMLOptionElement).disabled,
          })),
        });
      }

      console.log("🎯 Select element found:", {
        tagName: selectElement.tagName,
        id: selectElement.id,
        name: selectElement.name,
        multiple: selectElement.multiple,
        options: selectElement.options.length,
        value: selectElement.value,
        selectedOptions: Array.from(selectElement.selectedOptions).map(
          (opt) => ({
            value: opt.value,
            text: opt.text,
            selected: opt.selected,
          }),
        ),
      });

      const ariaDescribedBy =
        selectElement.getAttribute("aria-describedby") || "";

      // Determine initial noChoicesText based on whether we have static choices
      const hasStaticOptions =
        (items && items.length > 0) ||
        (groups && groups.some((g) => g.choices && g.choices.length > 0));
      const initialNoChoicesText = hasStaticOptions
        ? baseNoChoicesText
        : tTooShort(minLength);

      const hasApiConfig = source_url && source_key;

      console.log("📊 Initial configuration:", {
        hasStaticOptions,
        hasApiConfig,
        initialNoChoicesText,
        staticChoices: staticChoices.length,
        enhancedItems: enhancedItems.length,
      });

      // Initialize Choices.js with GOV.UK settings
      const defaultOptions = {
        allowHTML,
        searchPlaceholderValue: searchPlaceholder,
        shouldSort: false, // Force false to preserve placeholder position
        placeholder: true, // Tells Choices.js to use first option with empty value as placeholder
        itemSelectText: "",
        searchResultLimit,
        removeItemButton: computedRemoveItemButton,
        labelId: id + "-label " + ariaDescribedBy,
        // Link minLength behaviour to Choices
        searchFloor: minLength,
        // Don't set searchChoices initially - let applyMode handle it
        noChoicesText: initialNoChoicesText,
        // Prevent duplicate selections
        duplicateItemsAllowed: false,
        callbackOnInit: function () {
          console.log("🎉 Choices.js initialized successfully");

          // Remove the MutationObserver setup and circle refresh logic
          // Circles are now handled by callbackOnCreateTemplates

          // Don't apply group text here - let the mode logic handle it
          // This prevents showing static options when we should be in "short" mode

          // For multiple select, move input field to top of feedback area
          if (this.dropdown.type === "select-multiple") {
            const inner = this.containerInner.element;
            const input = this.input.element;
            inner.prepend(input);
            console.log("🔄 Moved input field to top for multiple select");
          }

          // Set initial mode after Choices.js is fully initialized
          setTimeout(() => {
            // Determine initial mode based on component configuration
            const initialMode = decideMode("");
            console.log("🎯 Initial mode decision:", {
              mode: initialMode,
              isDual,
              isOptionsOnly,
              hasApi,
              hasStatic,
              minLength,
            });

            // Apply the initial mode - this will show options immediately for options-only mode
            applyMode(initialMode);
          }, 0);
        },
        // Add the template customization to add circles at creation time
        callbackOnCreateTemplates: function (strToEl: any) {
          // public class names exposed by Choices
          const cn = this.config.classNames;
          const isMulti = this.passedElement?.element?.multiple === true;

          // small escape for when allowHTML=false
          const esc = (s: string) =>
            String(s)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

          // try to keep any existing templates if your build exposes them
          const base = (this as any)._templates ?? {};

          return {
            ...base,

            // Custom item template for chips (selected items), not dropdown choices
            item: (_classNames: any, data: any) => {
              // Debug: Log template data to understand what we're working with
              console.log("🎨 Template data for item:", {
                value: data.value,
                label: data.label,
                active: data.active,
                highlighted: data.highlighted,
                placeholder: data.placeholder,
                disabled: data.disabled,
                isMulti,
                enableSelectedItemCircles,
              });

              const classes = [
                cn.item,
                data.highlighted ? cn.highlightedState : cn.itemSelectable,
                data.placeholder ? cn.placeholder : "",
              ]
                .filter(Boolean)
                .join(" ");

              // ✅ Decide if this chip should be deletable
              const showRemove =
                isMulti && this.config.removeItemButton && !data.disabled;

              // Circle
              let circle = "";
              if (enableSelectedItemCircles && isMulti) {
                const color = colorForValue(data.value); // ✅ value-only, stable
                circle = `<span class="choices__item-circle" style="background:${color}"></span>`;
                console.log("🎨 Adding circle with color:", {
                  value: data.value,
                  color,
                });
              }

              // Label
              const labelHtml = allowHTML ? data.label : esc(data.label);

              // Remove button (same markup Choices normally generates)
              const removeBtn = showRemove
                ? `<button type="button"
                           class="${cn.button}"
                           data-button
                           aria-label="Remove ${esc(String(data.value))}"></button>`
                : "";

              return strToEl(
                `<div class="${classes}"
                      data-item
                      data-id="${data.id}"
                      data-value="${String(data.value)}"
                      ${showRemove ? "data-deletable" : ""}
                      ${data.active ? 'aria-selected="true"' : ""}
                      ${data.disabled ? 'aria-disabled="true"' : ""}>
                    ${circle}${labelHtml}${removeBtn}
                 </div>`,
              );
            },
          };
        },
        // Fuse.js options for search
        fuseOptions: {
          ignoreLocation: true, // matches any part of the string
          threshold: 0, // only matches when characters are sequential
        },
        ...choicesOptions,
      };

      console.log("⚙️ Choices.js options:", defaultOptions);

      choicesInstance = new Choices(selectElement, defaultOptions);

      // Store reference on the element for external access
      (selectElement as any).choices = choicesInstance;

      // For options-only components, apply group text immediately after initialization
      // For dual-mode components, let the mode logic handle it
      if (
        isOptionsOnly &&
        groupKey &&
        choicesInstance &&
        staticChoices.length > 0
      ) {
        console.log(
          "🔧 Options-only component: applying group text immediately",
        );
        // Force refresh of choices with group text
        setTimeout(() => {
          if (choicesInstance) {
            choicesInstance.clearChoices();
            choicesInstance.setChoices(
              staticChoices.map((c) => ({
                value: String(c.value),
                label: c.label,
                disabled: c.disabled,
              })),
              "value",
              "label",
              true,
            );
            console.log(
              "✅ Initial choices refreshed with group text for options-only component",
            );
          }
        }, 0);
      }

      // Set initial mode after Choices.js is initialized - moved to callbackOnInit
      // setTimeout(() => {
      //   const initialQuery = (searchInputElement?.value ?? "").trim();
      //   applyMode(decideMode(initialQuery));
      // }, 0);

      // Log the DOM structure after Choices.js initialization
      console.log("🔍 DOM structure AFTER Choices.js initialization:", {
        totalOptions: selectElement.options.length,
        options: Array.from(selectElement.options).map((opt, idx) => ({
          index: idx,
          value: (opt as HTMLOptionElement).value,
          text: (opt as HTMLOptionElement).text,
          selected: (opt as HTMLOptionElement).selected,
          disabled: (opt as HTMLOptionElement).disabled,
        })),
        choicesInstance: {
          config: choicesInstance.config,
          choices: choicesInstance.choices,
          items: choicesInstance.items,
        },
      });

      console.log("🎯 Choices instance created:", {
        instance: choicesInstance,
        element: selectElement,
        config: choicesInstance.config,
      });

      // Handle value changes from Choices.js
      selectElement.addEventListener("change", handleChoicesChange);

      // Listen for choice selection to reset search
      selectElement.addEventListener("choice", () => {
        console.log("🎯 Choice selected, resetting search");
        // When an item is selected, clear the search and show all unselected options
        if (searchInputElement) {
          searchInputElement.value = "";
          lastQuery = "";
        }

        // Only reset to static choices if we're in "options" mode
        // If we're in "short" mode, we should stay in "short" mode
        if (currentMode === "options") {
          setTimeout(() => {
            const hasStaticOptions =
              (items && items.length > 0) ||
              (groups && groups.some((g) => g.choices && g.choices.length > 0));
            if (
              hasStaticOptions &&
              choicesInstance &&
              choicesInstance.initialised
            ) {
              resetToStaticChoices();
              console.log(
                "🔄 Reset to static choices after selection (options mode)",
              );

              // Restore focus to the main Choices container after reset
              setTimeout(() => {
                if (choicesInstance?.containerOuter?.element) {
                  choicesInstance.containerOuter.element.focus();
                  console.log(
                    "🎯 Focus restored to Choices container after reset",
                  );
                }
              }, 0);
            }
          }, 0);
        } else {
          console.log(
            "🔄 Staying in current mode after selection:",
            currentMode,
          );
          // For "short" or "api" modes, just clear the search input
          // The mode will be re-evaluated on the next search input
        }
      });

      // Handle dropdown show event to enforce mode logic
      selectElement.addEventListener("showDropdown", () => {
        // Ensure choicesInstance is ready before proceeding
        if (!choicesInstance || !choicesInstance.initialised) {
          console.log(
            "⚠️ Choices instance not ready, skipping dropdown mode application",
          );
          return;
        }

        const q = (searchInputElement?.value ?? "").trim();
        applyMode(decideMode(q));
      });

      // Capture the internal search input and attach API search handling
      searchInputElement = choicesInstance?.input?.element ?? null;
      if (searchInputElement) {
        console.log("🔍 Search input element captured:", {
          element: searchInputElement,
          type: searchInputElement.type,
          placeholder: searchInputElement.placeholder,
          value: searchInputElement.value,
        });

        // Always add custom search handling to filter out selected values
        searchInputElement.addEventListener("input", () => {
          const raw = searchInputElement!.value || "";
          lastQuery = raw;
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            const q = raw.trim();
            console.log("🔍 Search input changed:", {
              query: q,
              queryLength: q.length,
              minLength,
              lastQuery,
              currentMode,
            });

            // Ensure choicesInstance is ready before proceeding
            if (!choicesInstance || !choicesInstance.initialised) {
              console.log("⚠️ Choices instance not ready, skipping search");
              return;
            }

            const newMode = decideMode(q);
            console.log("🎯 Mode decision:", {
              from: currentMode,
              to: newMode,
              query: q,
            });
            applyMode(newMode);

            // For short mode, don't process search - just return early
            if (newMode === "short") return;

            // Get currently selected values to exclude from new choices
            let selectedValues: string[] = [];
            try {
              const currentValue = choicesInstance.getValue(true);
              console.log(
                "🎯 Current value from choicesInstance (search):",
                currentValue,
              );

              if (Array.isArray(currentValue)) {
                selectedValues = currentValue.map((item: any) =>
                  String(item.value || item),
                );
              } else if (currentValue && typeof currentValue === "object") {
                // Handle single selection case
                selectedValues = [String(currentValue.value || currentValue)];
              } else if (currentValue) {
                // Handle primitive value case
                selectedValues = [String(currentValue)];
              }
            } catch (error) {
              console.warn(
                "⚠️ Error getting current value during search:",
                error,
              );
              selectedValues = [];
            }

            console.log("🎯 Currently selected values:", selectedValues);

            if (newMode === "api") {
              console.log("🌐 Using API mode for search");

              // Check if the query exactly matches what's already selected
              const queryMatchesSelected = selectedValues.some(
                (selected) =>
                  selected.toLowerCase().includes(q.toLowerCase()) ||
                  q.toLowerCase().includes(selected.toLowerCase()),
              );

              console.log("🔍 Query vs selected values check:", {
                query: q,
                selectedValues,
                queryMatchesSelected,
                matches: selectedValues.filter(
                  (selected) =>
                    selected.toLowerCase().includes(q.toLowerCase()) ||
                    q.toLowerCase().includes(selected.toLowerCase()),
                ),
              });

              try {
                const apiChoices = await fetchApiChoices(q);
                console.log("📡 API response:", {
                  query: q,
                  apiChoices: apiChoices.length,
                  rawChoices: apiChoices,
                });

                if (!choicesInstance) return;

                // Filter out already selected values from API results
                const filteredApiChoices = apiChoices.filter(
                  (choice) => !selectedValues.includes(String(choice.value)),
                );

                console.log("🔍 Filtered API choices:", {
                  total: apiChoices.length,
                  filtered: filteredApiChoices.length,
                  excluded: apiChoices.length - filteredApiChoices.length,
                  apiResults: apiChoices.map((c) => ({
                    value: c.value,
                    label: c.label,
                  })),
                  selectedValues,
                  filteringDetails: apiChoices.map((choice) => ({
                    choiceValue: String(choice.value),
                    choiceLabel: choice.label,
                    isSelected: selectedValues.includes(String(choice.value)),
                    selectedValuesMatch: selectedValues,
                  })),
                });

                if (filteredApiChoices.length === 0) {
                  // No new results from API. Determine the correct message.
                  if (apiChoices.length === 0) {
                    // API returned no results for the query.
                    choicesInstance.config.noChoicesText = "No results found";
                    console.log("❌ API returned no results");
                  } else {
                    // API returned results, but they are all already selected.
                    // Double-check this by looking at the actual values
                    const allResultsSelected = apiChoices.every((choice) =>
                      selectedValues.includes(String(choice.value)),
                    );

                    if (allResultsSelected) {
                      choicesInstance.config.noChoicesText =
                        "All results are already selected";
                      console.log(
                        "ℹ️ API returned results but all are already selected",
                        {
                          apiResults: apiChoices.map((c) => c.value),
                          selectedValues,
                          allResultsSelected,
                        },
                      );
                    } else {
                      // This shouldn't happen, but fallback to a generic message
                      choicesInstance.config.noChoicesText =
                        "No new results available";
                      console.log(
                        "⚠️ Unexpected: API returned results but filtering logic failed",
                        {
                          apiResults: apiChoices.map((c) => c.value),
                          selectedValues,
                          filteredCount: filteredApiChoices.length,
                        },
                      );
                    }
                  }
                  // Clear the list and show the message.
                  choicesInstance.setChoices([], "value", "label", true);
                  // Force refresh to show the message
                } else if (queryMatchesSelected && apiChoices.length > 0) {
                  // Special case: API returned results but they're similar to what's already selected
                  // This handles cases like typing "tw5 0ew" when "TW5 0EW London" is already selected
                  const allResultsSimilarToSelected = apiChoices.every(
                    (choice) => {
                      const choiceValue = String(choice.value).toLowerCase();
                      return selectedValues.some(
                        (selected) =>
                          choiceValue.includes(selected.toLowerCase()) ||
                          selected.toLowerCase().includes(choiceValue),
                      );
                    },
                  );

                  if (allResultsSimilarToSelected) {
                    choicesInstance.config.noChoicesText =
                      "All results are already selected";
                    console.log(
                      "🎯 Query matches selected items, showing 'all selected' message",
                      {
                        query: q,
                        apiResults: apiChoices.map((c) => c.value),
                        selectedValues,
                        allResultsSimilarToSelected,
                      },
                    );
                    // Clear choices to show the message
                    choicesInstance.setChoices([], "value", "label", true);
                  } else {
                    // Show the filtered results

                    // Ensure group text is applied to filtered API choices
                    const filteredApiChoicesWithGroupText =
                      ensureGroupTextApplied(
                        filteredApiChoices.map((c) => ({
                          value: String(c.value),
                          label: c.label,
                        })),
                      );

                    choicesInstance.setChoices(
                      filteredApiChoicesWithGroupText,
                      "value",
                      "label",
                      true,
                    );
                    console.log(
                      "✅ Set filtered API choices (some similar to selected):",
                      filteredApiChoices.length,
                    );
                  }
                } else {
                  // We have new, unselected results to show.
                  // Don't set noChoicesText when we have results - let Choices.js handle it

                  // Ensure group text is applied to API choices
                  const apiChoicesWithGroupText = ensureGroupTextApplied(
                    filteredApiChoices.map((c) => ({
                      value: String(c.value),
                      label: c.label,
                    })),
                  );

                  choicesInstance.setChoices(
                    apiChoicesWithGroupText,
                    "value",
                    "label",
                    true,
                  );

                  // Custom templates are automatically applied when setChoices is called
                  // No need for additional refresh calls

                  console.log(
                    "✅ Set new API choices:",
                    filteredApiChoices.length,
                  );
                }
              } catch (e) {
                console.error("❌ Failed to fetch API choices:", e);
                if (choicesInstance) {
                  choicesInstance.config.noChoicesText = "No results found";
                  // Clear choices and force refresh to show error message
                  choicesInstance.setChoices([], "value", "label", true);
                }
              }
            } else {
              // newMode === "options": Choices handles filtering automatically
              console.log("📋 Using static choices mode for search");

              // For empty queries, restore the full grouped structure
              if (q === "" && groups && groups.length > 0) {
                console.log(
                  "🔄 Empty query with grouped options - restoring full structure",
                );
                resetToStaticChoices();
                return;
              }

              // For static choices, filter both by search term and exclude selected values
              if (choicesInstance) {
                // Filter static choices by search term and exclude selected values
                const searchTerm = q.toLowerCase();

                // First, find choices that match the search term (regardless of selection)
                const matchingChoices = staticChoices.filter((choice) =>
                  choice.label.toLowerCase().includes(searchTerm),
                );

                console.log("🔍 Static choices matching search:", {
                  searchTerm,
                  totalStatic: staticChoices.length,
                  matching: matchingChoices.length,
                  matches: matchingChoices.map((c) => ({
                    value: c.value,
                    label: c.label,
                  })),
                });

                // Then filter out selected values from the matching choices
                const filteredStaticChoices = matchingChoices.filter(
                  (choice) => !selectedValues.includes(String(choice.value)),
                );

                console.log("🔍 Final filtered static choices:", {
                  matching: matchingChoices.length,
                  filtered: filteredStaticChoices.length,
                  excluded:
                    matchingChoices.length - filteredStaticChoices.length,
                });

                choicesInstance.clearChoices();

                if (filteredStaticChoices.length === 0) {
                  // No choices to show - distinguish between no matches vs all selected
                  if (matchingChoices.length === 0) {
                    // No search matches at all
                    choicesInstance.config.noChoicesText = "No results found";
                    console.log("❌ No static choices match search term");
                  } else {
                    // Found matches but all are already selected
                    choicesInstance.config.noChoicesText =
                      "All matching options are already selected";
                    console.log(
                      "ℹ️ Found static matches but all are already selected",
                    );
                  }
                  // Clear choices to show the message
                  choicesInstance.setChoices([], "value", "label", true);
                } else {
                  // Have choices to show
                  // Don't set noChoicesText when we have choices - let Choices.js handle it

                  // Ensure group text is applied to filtered choices
                  const choicesWithGroupText = ensureGroupTextApplied(
                    filteredStaticChoices.map((c) => ({
                      value: String(c.value),
                      label: c.label,
                      disabled: c.disabled,
                    })),
                  );

                  choicesInstance.setChoices(
                    choicesWithGroupText,
                    "value",
                    "label",
                    true,
                  );

                  // Custom templates are automatically applied when setChoices is called
                  // No need for additional refresh calls

                  console.log(
                    "✅ Set filtered static choices:",
                    filteredStaticChoices.length,
                  );
                }
              }
            }
          }, 120);
        });
      } else {
        console.warn("⚠️ Search input element not found");
      }
    } catch (error) {
      console.error("❌ Failed to initialize Choices.js:", error);
    }
  });

  // Handle changes from Choices.js
  function handleChoicesChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log("🔄 Choices change event:", {
      event: event.type,
      target: target.tagName,
      value: target.value,
      selectedOptions: Array.from(target.selectedOptions).map((opt) => ({
        value: opt.value,
        text: opt.text,
        selected: opt.selected,
      })),
      multiple: target.multiple,
    });

    if (multiple) {
      const selectedValues = Array.from(target.selectedOptions).map(
        (option) => option.value,
      );
      console.log("📝 Setting multiple value:", selectedValues);
      value = selectedValues;
    } else {
      console.log("📝 Setting single value:", target.value);
      value = target.value;
    }
  }

  // Update Choices.js when value changes externally
  $effect(() => {
    console.log("🔄 Value changed externally:", {
      value,
      type: typeof value,
      isArray: Array.isArray(value),
      choicesInstance: !!choicesInstance,
    });

    if (choicesInstance && choicesInstance.initialised && value !== undefined) {
      if (multiple && Array.isArray(value)) {
        console.log("🔄 Updating multiple choices:", value);
        choicesInstance.removeActiveItems();
        value.forEach((val: string | number) => {
          choicesInstance.setChoiceByValue(String(val));
        });
      } else if (!multiple && !Array.isArray(value)) {
        console.log("🔄 Updating single choice:", value);
        choicesInstance.setChoiceByValue(String(value));
      }
    }
  });

  // Cleanup
  onDestroy(() => {
    console.log("🧹 MultiSelectSearchAutocomplete: onDestroy called");
    if (choicesInstance) {
      // No more MutationObserver to clean up
      selectElement?.removeEventListener("change", handleChoicesChange);
      selectElement?.removeEventListener("choice", () => {});
      choicesInstance.destroy();
      console.log("✅ Choices instance destroyed");
    }
  });

  // Log component state changes
  $inspect(
    id,
    name,
    multiple,
    value,
    items,
    groups,
    enhancedItems,
    staticChoices,
    computedPlaceholderText,
    computedRemoveItemButton,
  );
</script>

<div
  class="gem-c-select-with-search"
  style={`--cross-icon-url: url("${crossIconUrl}"); --choices-item-bg-color: ${choicesItemBackgroundColor}; --choices-item-border-color: ${choicesItemBorderColor}; --choices-item-text-color: ${choicesItemTextColor}; --choices-item-divider-padding: ${choicesItemDividerPadding}; --selected-item-circle-color: ${selectedItemCircleColor};`}
  data-group-key={groupKey}
  data-enable-circles={enableSelectedItemCircles}
  data-circle-palette={selectedItemCircleColorPalette.join(",")}
>
  {#snippet rightIcon()}
    <button
      type="button"
      class="search-addon-btn"
      aria-label="Search"
      title="Search"
    >
      <span class="search-addon-icon"><IconSearch /></span>
    </button>
  {/snippet}

  <Select
    {id}
    {name}
    items={enhancedItems}
    {groups}
    bind:value
    {multiple}
    {label}
    {labelIsPageHeading}
    {hint}
    {error}
    {validate}
    {formGroupClasses}
    {fullWidth}
    {describedBy}
    {disabled}
    bind:selectElement
    renderRight={rightIcon}
    {...attributes}
  />
</div>

<style>
  /* Make the field border butt up against the addon button (like Search component) */
  :global(.gem-c-select-with-search .choices__inner) {
    min-height: 46px; /* align baseline height to Search button */
  }

  /* Add border-bottom to choices input with more specific selectors */
  :global(
    .gem-c-select-with-search .choices[data-type*="select-one"] .choices__input
  ) {
    border-bottom: 1px solid #ddd;
    margin: 0;
  }

  /* Also target the cloned input that appears when dropdown is active */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-one"]
      .choices__input--cloned
  ) {
    border-bottom: 1px solid #ddd;
  }

  /* Target the input when dropdown is active */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-one"].is-active
      .choices__input
  ) {
    border-bottom: 1px solid #ddd;
  }

  /* Target the input when focused */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-one"]
      .choices__input:focus
  ) {
    border-bottom: 1px solid #ddd;
  }

  :global(.govuk-label) {
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
    color: #0b0c0c;
    display: block;
    margin-bottom: 5px;
  }

  /* Addon button visual to match gem-c-search submit */
  .search-addon-btn {
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

  @media print {
    :global(.govuk-label) {
      font-family: sans-serif;
    }
  }
  @media print {
    :global(.govuk-label) {
      font-size: 14pt;
      line-height: 1.15;
    }
  }
  @media print {
    :global(.govuk-label) {
      color: #000;
    }
  }
  :global(.govuk-label--xl),
  :global(.govuk-label--l),
  :global(.govuk-label--m) {
    font-weight: 700;
    margin-bottom: 15px;
  }
  :global(.govuk-label--xl) {
    font-size: 2rem;
    line-height: 1.09375;
  }
  @media (min-width: 40.0625em) {
    :global(.govuk-label--xl) {
      font-size: 3rem;
      line-height: 1.0416666667;
    }
  }
  @media print {
    :global(.govuk-label--xl) {
      font-size: 32pt;
      line-height: 1.15;
    }
  }
  :global(.govuk-label--l) {
    font-size: 1.6875rem;
    line-height: 1.1111111111;
  }
  @media (min-width: 40.0625em) {
    :global(.govuk-label--l) {
      font-size: 2.25rem;
      line-height: 1.1111111111;
    }
  }
  @media print {
    :global(.govuk-label--l) {
      font-size: 24pt;
      line-height: 1.05;
    }
  }
  :global(.govuk-label--m) {
    font-size: 1.3125rem;
    line-height: 1.1904761905;
  }
  @media (min-width: 40.0625em) {
    :global(.govuk-label--m) {
      font-size: 1.5rem;
      line-height: 1.25;
    }
  }
  @media print {
    :global(.govuk-label--m) {
      font-size: 18pt;
      line-height: 1.15;
    }
  }
  :global(.govuk-label--s) {
    font-weight: 700;
  }
  :global(.govuk-label-wrapper) {
    margin: 0;
  }
  :global(.choices) {
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
    font-size: 19px;
  }
  :global(.choices:focus) {
    outline: none;
  }
  :global(.choices:last-child) {
    margin-bottom: 0;
  }
  :global(.choices.is-open) {
    overflow: visible;
  }
  :global(.choices.is-disabled .choices__inner),
  :global(.choices.is-disabled .choices__input) {
    background-color: #eaeaea;
    cursor: not-allowed;
    user-select: none;
  }
  :global(.choices.is-disabled .choices__item) {
    cursor: not-allowed;
  }
  :global(.choices [hidden]) {
    display: none !important;
  }
  :global(.choices[data-type*="select-one"]) {
    cursor: pointer;
  }
  /* :global(.choices[data-type*="select-one"] .choices__inner) {
    padding-bottom: 7.5px;
  } */
  :global(.choices[data-type*="select-one"] .choices__input) {
    display: block;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    margin: 0;
  }
  :global(.choices[data-type*="select-one"] .choices__button) {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==");
    padding: 0;
    background-size: 8px;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -10px;
    margin-right: 25px;
    height: 20px;
    width: 20px;
    border-radius: 10em;
    opacity: 0.25;
  }
  :global(.choices[data-type*="select-one"] .choices__button:hover),
  :global(.choices[data-type*="select-one"] .choices__button:focus) {
    opacity: 1;
  }
  :global(.choices[data-type*="select-one"] .choices__button:focus) {
    box-shadow: 0 0 0 2px #fff;
  }
  :global(
    .choices[data-type*="select-one"]
      .choices__item[data-placeholder]
      .choices__button
  ) {
    display: none;
  }
  :global(.choices[data-type*="select-one"]::after) {
    content: "";
    height: 0;
    width: 0;
    border-style: solid;
    border-color: #0b0c0c rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    border-width: 5px;
    position: absolute;
    right: 11.5px;
    top: 50%;
    margin-top: -2.5px;
    pointer-events: none;
  }
  :global(.choices[data-type*="select-one"].is-open::after) {
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #0b0c0c;
    margin-top: -7.5px;
  }
  :global(.choices[data-type*="select-one"][dir="rtl"]::after) {
    left: 11.5px;
    right: auto;
  }
  :global(.choices[data-type*="select-one"][dir="rtl"] .choices__button) {
    right: auto;
    left: 0;
    margin-left: 25px;
    margin-right: 0;
  }
  :global(.choices[data-type*="select-multiple"] .choices__inner),
  :global(.choices[data-type*="text"] .choices__inner) {
    cursor: text;
  }

  :global(.choices__inner) {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    background-color: #fff;
    padding: 7.5px 7.5px 3.75px;
    border: 1px solid #ddd;
    border-radius: 0;
    font-size: 19px;
    min-height: 44px;
    overflow: hidden;
  }
  :global(.is-focused .choices__inner),
  :global(.is-open .choices__inner) {
    border-color: hsl(0, 0%, 71.6666666667%);
  }
  :global(.is-open .choices__inner) {
    border-radius: 0 0 0 0;
  }
  :global(.is-flipped.is-open .choices__inner) {
    border-radius: 0 0 0 0;
  }
  :global(.choices__list) {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }
  :global(.choices__list--single) {
    display: inline-block;
    padding: 0;
    width: 100%;
    border-color: transparent;
  }
  :global([dir="rtl"] .choices__list--single) {
    padding: 0;
  }
  :global(.choices__list--single .choices__item) {
    width: 100%;
  }
  :global(.choices__list--multiple) {
    display: inline;
  }

  :global(.choices__list--multiple .choices__item[data-deletable]) {
    padding-right: 5px;
  }
  :global([dir="rtl"] .choices__list--multiple .choices__item) {
    margin-right: 0;
    margin-left: 3.75px;
  }
  :global(.choices__list--multiple .choices__item.is-highlighted) {
    background-color: hsl(0, 0%, 95%);
    border: 1px solid hsl(0, 0%, 90%);
  }
  :global(.is-disabled .choices__list--multiple .choices__item) {
    background-color: hsl(0, 0%, 66.7647058824%);
    border: 1px solid hsl(0, 0%, 56.7647058824%);
  }
  :global(.choices__list--dropdown),
  :global(.choices__list[aria-expanded]) {
    display: none;
    z-index: 5;
    position: absolute;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    top: 100%;
    margin-top: 3px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    overflow: hidden;
    word-break: break-all;
  }
  :global(.is-active.choices__list--dropdown),
  :global(.is-active.choices__list[aria-expanded]) {
    display: block;
  }
  :global(.is-open .choices__list--dropdown),
  :global(.is-open .choices__list[aria-expanded]) {
    border-color: hsl(0, 0%, 71.6666666667%);
  }
  :global(.is-flipped .choices__list--dropdown),
  :global(.is-flipped .choices__list[aria-expanded]) {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 3px;
    border-bottom: none;
    border-radius: 0.25rem 0.25rem 0 0;
  }
  :global(.choices__list--dropdown .choices__list),
  :global(.choices__list[aria-expanded] .choices__list) {
    position: relative;
    max-height: 300px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    will-change: scroll-position;
  }
  :global(.choices__list--dropdown .choices__item),
  :global(.choices__list[aria-expanded] .choices__item) {
    position: relative;
    padding: 12px 10px;
    font-size: 19px;
    display: flex;
    align-items: center;
    min-height: 44px;
  }
  :global([dir="rtl"] .choices__list--dropdown .choices__item),
  :global([dir="rtl"] .choices__list[aria-expanded] .choices__item) {
    text-align: right;
  }
  @media (min-width: 640px) {
    :global(
      .choices__list--dropdown .choices__item--selectable[data-select-text]
    ),
    :global(
      .choices__list[aria-expanded] .choices__item--selectable[data-select-text]
    ) {
      padding-right: 100px;
      display: flex;
      align-items: center;
      min-height: 44px;
    }
    :global(
      .choices__list--dropdown
        .choices__item--selectable[data-select-text]::after
    ),
    :global(
      .choices__list[aria-expanded]
        .choices__item--selectable[data-select-text]::after
    ) {
      content: attr(data-select-text);
      font-size: 19px;
      opacity: 0;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    :global(
      [dir="rtl"]
        .choices__list--dropdown
        .choices__item--selectable[data-select-text]
    ),
    :global(
      [dir="rtl"]
        .choices__list[aria-expanded]
        .choices__item--selectable[data-select-text]
    ) {
      text-align: right;
      padding-left: 100px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      min-height: 44px;
    }
    :global(
      [dir="rtl"]
        .choices__list--dropdown
        .choices__item--selectable[data-select-text]::after
    ),
    :global(
      [dir="rtl"]
        .choices__list[aria-expanded]
        .choices__item--selectable[data-select-text]::after
    ) {
      right: auto;
      left: 10px;
    }
  }
  :global(.choices__list--dropdown .choices__item--selectable.is-highlighted),
  :global(
    .choices__list[aria-expanded] .choices__item--selectable.is-highlighted
  ) {
    background-color: hsl(0, 0%, 95%);
  }
  :global(
    .choices__list--dropdown .choices__item--selectable.is-highlighted::after
  ),
  :global(
    .choices__list[aria-expanded]
      .choices__item--selectable.is-highlighted::after
  ) {
    opacity: 0.5;
  }
  :global(.choices__item) {
    cursor: default;
  }
  :global(.choices__item--selectable) {
    cursor: pointer;
  }
  :global(.choices__item--disabled) {
    cursor: not-allowed;
    user-select: none;
    opacity: 0.5;
  }
  :global(.choices__heading) {
    font-weight: 600;
    font-size: 19px;
    padding: 10px;
    border-bottom: 1px solid rgb(246.5, 246.5, 246.5);
    color: hsl(0, 0%, 50%);
  }
  :global(.choices__button) {
    text-indent: -9999px;
    appearance: none;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  :global(.choices__button:focus) {
    outline: none;
  }
  :global(.choices__input) {
    display: inline-block;
    vertical-align: baseline;
    background-color: #fff;
    font-size: 19px;
    margin-bottom: 5px;
    border: 0;
    border-radius: 0;
    max-width: 100%;
    padding: 4px 0 4px 2px;
  }
  :global(.gem-c-select-with-search .choices__input:focus) {
    outline: 0;
    border: none;
    box-shadow: none;
  }
  :global(
    .gem-c-select-with-search .choices__input.choices__input--cloned--single
  ) {
    margin: 0;
    /* For the cloned single-input variant we want no padding so the input lines up
     exactly with the surrounding UI. Use !important to override Choices.js inline
     styles if necessary. */
    padding: 0;
    border: none;
    box-shadow: none;
  }
  :global(.gem-c-select-with-search .choices__input::-webkit-search-decoration),
  :global(.choices__input::-webkit-search-cancel-button),
  :global(.choices__input::-webkit-search-results-button),
  :global(.choices__input::-webkit-search-results-decoration) {
    display: none;
  }
  :global(.choices__input::-ms-clear),
  :global(.choices__input::-ms-reveal) {
    display: none;
    width: 0;
    height: 0;
  }
  :global([dir="rtl"] .choices__input) {
    padding-right: 2px;
    padding-left: 0;
  }
  :global(.choices__placeholder) {
    opacity: 0.5;
  }
  :global(.gem-c-select-with-search .choices *) {
    box-sizing: border-box;
    font-family: "GDS Transport", arial, sans-serif;
  }
  :global(
    .gem-c-select-with-search
      .choices[data-type="select-one"]
      .choices__list--dropdown
      .choices__list
      .choices__placeholder
  ) {
    opacity: 1;
  }
  :global(.gem-c-select-with-search .choices[data-type*="select-one"]::after) {
    content: "";
    position: absolute;
    top: 50%;
    right: 12px;
    width: 40px;
    height: 40px;
    margin: 0;
    border: none; /* override Choices default triangle */
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    transform: translateY(-50%) rotate(0deg);
  }
  :global(
    .gem-c-select-with-search .choices.is-open[data-type*="select-one"]::after
  ) {
    transform: translateY(-50%) rotate(180deg);
  }
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button
  ),
  :global(
    .gem-c-select-with-search .choices[data-type*="text"] .choices__button
  ) {
    border-color: #b1b4b6;
    border-right: 1px solid #b1b4b6;
    padding: 10px 20px 10px 10px;
    margin-right: 0;
  }
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button:hover
  ),
  :global(
    .gem-c-select-with-search .choices[data-type*="text"] .choices__button:hover
  ) {
    background-color: #b1b4b6;
    border-color: #505a5f;
    box-shadow: 0 2px 0 #505a5f;
  }
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button:focus
  ),
  :global(
    .gem-c-select-with-search .choices[data-type*="text"] .choices__button:focus
  ) {
    background-color: #fd0;
    box-shadow: 0 2px 0 #0b0c0c;
  }
  :global(
    .gem-c-select-with-search
      .choices.is-disabled
      .choices__item[data-deletable]
  ) {
    background-color: #fff;
  }
  :global(.gem-c-select-with-search .choices.is-disabled .choices__button) {
    display: none;
  }
  :global(.gem-c-select-with-search .choices__input) {
    display: block;
    margin-bottom: 0;
  }
  :global(.gem-c-select-with-search .choices__inner) {
    padding: 5px;
    border: 2px solid #0b0c0c;
    margin: 0;
  }
  :global(
    .gem-c-select-with-search.govuk-form-group--error
      .choices:not(.is-active):not(.is-focused):not(.is-open)
      .choices__inner
  ) {
    border-color: #d4351c;
  }
  :global(.gem-c-select-with-search .choices.is-focused),
  :global(.gem-c-select-with-search .choices.is-open) {
    overflow: visible;
  }
  :global(.gem-c-select-with-search .choices.is-flipped .choices__list) {
    border-radius: 0;
    border-width: 2px;
  }
  :global(.gem-c-select-with-search .choices.is-focused .choices__inner),
  :global(.gem-c-select-with-search .choices.is-open .choices__inner) {
    border: 2px solid #0b0c0c;
    min-height: 46px;
    /* keep inner padding on focus/open so height doesn't jump */
    padding: 5px;
    outline: 3px solid #fd0;
    outline-offset: 0;
    box-shadow: inset 0 0 0 2px #0b0c0c;
    border-color: #0b0c0c;
  }
  :global(.gem-c-select-with-search .choices__list--multiple) {
    display: block;
  }
  :global(.gem-c-select-with-search .choices__list--multiple:not(:empty)) {
    margin-block-start: 6px;
    border-block-start: 1px solid #b1b4b6;
    padding-block-end: 5px;
  }
  :global(
    .is-disabled
      .gem-c-select-with-search
      .choices__list--multiple
      .choices__item
  ) {
    opacity: 0.5;
  }
  :global(.gem-c-select-with-search .choices__list--dropdown),
  :global(.gem-c-select-with-search .choices__list[aria-expanded]) {
    border: 2px solid #0b0c0c;
    border-top-width: 0;
  }
  :global(.is-flipped .gem-c-select-with-search .choices__list--dropdown),
  :global(.is-flipped .gem-c-select-with-search .choices__list[aria-expanded]) {
    border-top-width: 2px;
    border-bottom-width: 0;
  }

  /* Remove the full-width divider and add pseudo-element dividers */
  :global(.gem-c-select-with-search .choices__list--dropdown .choices__item),
  :global(
    .gem-c-select-with-search .choices__list[aria-expanded] .choices__item
  ) {
    border-bottom: none;
    position: relative; /* for the ::after divider */
  }

  /* Inset divider with configurable padding */
  :global(
    .gem-c-select-with-search .choices__list--dropdown .choices__item::after
  ),
  :global(
    .gem-c-select-with-search
      .choices__list[aria-expanded]
      .choices__item::after
  ) {
    content: "";
    position: absolute;
    left: var(--choices-item-divider-padding, 15px);
    right: var(--choices-item-divider-padding, 15px);
    bottom: 0;
    height: 1px;
    background: var(--choices-item-border-color, #b1b4b6);
  }

  /* No divider on the last item */
  :global(
    .gem-c-select-with-search
      .choices__list--dropdown
      .choices__item:last-child::after
  ),
  :global(
    .gem-c-select-with-search
      .choices__list[aria-expanded]
      .choices__item:last-child::after
  ) {
    display: none;
  }

  :global(
    .gem-c-select-with-search
      .choices__list--dropdown
      .choices__item--selectable.is-highlighted
  ),
  :global(
    .gem-c-select-with-search
      .choices__list[aria-expanded]
      .choices__item--selectable.is-highlighted
  ) {
    background-color: var(--choices-item-bg-color, #1d70b8);
    border-color: var(--choices-item-border-color, #1d70b8);
    color: var(--choices-item-text-color, #fff);
    outline: none;
  }
  :global(.gem-c-select-with-search .choices__heading) {
    font-weight: 700;
    color: #0b0c0c;
    padding: 30px 10px 10px;
    border-bottom: 1px solid #b1b4b6;
    cursor: default;
  }

  :global(.gem-c-select-with-search .choices__inner) {
    padding: 5px;
  }

  /* Ensure consistent vertical centering for single-select items */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-one"]
      .choices__list--single
  ) {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 5px;
  }

  /* Set max height for single-select choices__inner */
  :global(
    .gem-c-select-with-search .choices[data-type*="select-one"] .choices__inner
  ) {
    max-height: 46px;
    display: flex;
    align-items: center;
  }

  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-one"]
      .choices__list--single
      .choices__item
  ) {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 44px;
  }

  /* Ensure consistent dropdown item heights */
  :global(.gem-c-select-with-search .choices__list--dropdown .choices__item),
  :global(
    .gem-c-select-with-search .choices__list[aria-expanded] .choices__item
  ) {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  /* Target the actual dropdown items that appear in the dropdown list */
  :global(
    .gem-c-select-with-search
      .choices__list--dropdown
      .choices__list
      .choices__item
  ) {
    padding-left: 10px;
  }

  /* Also target the base Choices.js dropdown items to ensure consistency */
  :global(.gem-c-select-with-search .choices__list--dropdown .choices__item) {
    padding-left: 10px;
  }

  /* Add padding to multi-select choices__inner for proper spacing */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__inner
  ) {
    padding: 4px 8px;
  }

  /* Group text styling similar to SearchAutocomplete */
  :global(
    .gem-c-select-with-search
      .choices__item
      .gem-c-select-with-search__suggestion-group
  ) {
    opacity: 0.8;
    font-size: smaller;
    font-weight: normal;
  }

  /* Flex container for label + group text alignment */
  :global(.gem-c-select-with-search .choices__item-label) {
    display: inline-flex;
    align-items: baseline; /* aligns text baselines for consistent vertical alignment */
    gap: 5px; /* spacing between label and group text */
  }

  /* Main text styling */
  /* :global(.gem-c-select-with-search .choices__item-main) {
    font-weight: bold;
  } */

  /* Override the bold weight for the group text specifically */
  :global(
    .gem-c-select-with-search
      .choices__item
      .gem-c-select-with-search__suggestion-group
  ) {
    font-weight: normal;
  }

  /* Ensure proper alignment of circle with text in selected items */
  :global(.gem-c-select-with-search .choices__list--multiple .choices__item) {
    display: inline-flex;
    align-items: center;
    gap: 0;
  }

  /* Chips (selected items) */
  :global(.gem-c-select-with-search .choices__list--multiple .choices__item) {
    display: inline-flex;
    align-items: center;
    border: 0;
    padding: 0 0px 0 10px; /* right padding for button divider */
    margin: 10px 10px 0 0;
    background-color: #f3f2f1;
    box-shadow: 0 2px 0 #b1b4b6;
    line-height: 1;
    color: #0b0c0c;
  }

  /* Circle */
  :global(.gem-c-select-with-search .choices__item-circle) {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 8px;
  }

  /* Remove button */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button
  ),
  :global(
    .gem-c-select-with-search .choices[data-type*="text"] .choices__button
  ) {
    margin-left: 8px;
    width: 16px;
    height: 40px;
    padding-left: 12px; /* space for the divider */
    border-left: 1px solid #b1b4b6;
    background-image: var(--cross-icon-url);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
    opacity: 0.75;
  }

  /* Hover/focus states */
  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button:hover
  ) {
    background-color: #b1b4b6;
    border-color: #505a5f;
    box-shadow: 0 2px 0 #505a5f;
  }

  :global(
    .gem-c-select-with-search
      .choices[data-type*="select-multiple"]
      .choices__button:focus
  ) {
    background-color: #fd0;
    box-shadow: 0 2px 0 #0b0c0c;
  }
</style>
