<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Select, { type SelectItem, type SelectGroup } from "./Select.svelte";
  import IconSearch from "../../icons/IconSearch.svelte";
  import crossIconUrl from "./../../assets/govuk_publishing_components/images/cross-icon.svg?url";

  // Import Choices.js dynamically to avoid SSR issues
  let Choices: any;

  let {
    // Core attributes - pass through to Select component
    id,
    name,
    items = [],
    groups = [],
    value = $bindable<(string | number)[] | string | number | undefined>(),
    multiple = false,

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
    removeItemButton = undefined, // Will default to multiple if not specified

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

    ...attributes
  }: {
    id: string;
    name: string;
    items?: SelectItem[];
    groups?: SelectGroup[];
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
      flattened.push({
        value: it.value,
        label: String(it.text),
        disabled: it.disabled,
      });
    }
    // Then any explicit groups
    for (const g of groups) {
      for (const choice of g.choices) {
        flattened.push({
          value: choice.value,
          label: String(choice.text),
          disabled: g.disabled || choice.disabled,
        });
      }
    }
    return flattened;
  });

  // Default selection logic between API and static options
  function selectSource(query: string): "api" | "options" {
    if (typeof sourceSelector === "function") {
      try {
        return sourceSelector(query, staticChoices);
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
      return { value: toValue(entry, label), label };
    });
    return mapped;
  }

  function resetToStaticChoices() {
    if (!choicesInstance) return;

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
            shouldSort,
            itemSelectText: "",
            searchResultLimit,
            removeItemButton: computedRemoveItemButton,
            labelId:
              id +
              "-label " +
              (selectElement.getAttribute("aria-describedby") || ""),
            searchFloor: minLength,
            searchChoices: !(source_url && source_key),
            noChoicesText: baseNoChoicesText,
            duplicateItemsAllowed: false,
            fuseOptions: {
              ignoreLocation: true,
              threshold: 0,
            },
            ...choicesOptions,
          });

          // Store reference on the element for external access
          (selectElement as any).choices = choicesInstance;

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

      // Filter out already selected values from static choices
      const filteredStaticChoices = staticChoices.filter(
        (choice) => !selectedValues.includes(String(choice.value)),
      );

      console.log("🔍 Filtered static choices:", {
        total: staticChoices.length,
        filtered: filteredStaticChoices.length,
        excluded: selectedValues.length,
      });

      choicesInstance.clearChoices();
      choicesInstance.setChoices(
        filteredStaticChoices.map((c) => ({
          value: String(c.value),
          label: c.label,
          disabled: c.disabled,
        })),
        "value",
        "label",
        true,
      );
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
        shouldSort,
        itemSelectText: "",
        searchResultLimit,
        removeItemButton: computedRemoveItemButton,
        labelId: id + "-label " + ariaDescribedBy,
        // Link minLength behaviour to Choices
        searchFloor: minLength,
        searchChoices: !hasApiConfig,
        noChoicesText: initialNoChoicesText,
        // Prevent duplicate selections
        duplicateItemsAllowed: false,
        callbackOnInit: function () {
          console.log("🎉 Choices.js initialized successfully");
          // For multiple select, move input field to top of feedback area
          if (this.dropdown.type === "select-multiple") {
            const inner = this.containerInner.element;
            const input = this.input.element;
            inner.prepend(input);
            console.log("🔄 Moved input field to top for multiple select");
          }
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
        // Reset to filtered static choices (excluding newly selected items)
        setTimeout(() => {
          const hasStaticOptions =
            (items && items.length > 0) ||
            (groups && groups.some((g) => g.choices && g.choices.length > 0));
          if (hasStaticOptions && choicesInstance) {
            resetToStaticChoices();
            console.log("🔄 Reset to static choices after selection");

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
          const q = searchInputElement!.value || "";
          lastQuery = q;
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            console.log("🔍 Search input changed:", {
              query: q,
              queryLength: q.length,
              minLength,
              lastQuery,
            });

            // Empty query handling: reset to static choices if available
            if (lastQuery.trim().length === 0) {
              console.log("🔄 Empty query, resetting to static choices");
              const hasStaticOptions =
                (items && items.length > 0) ||
                (groups &&
                  groups.some((g) => g.choices && g.choices.length > 0));
              if (hasStaticOptions && choicesInstance) {
                choicesInstance.config.noChoicesText = baseNoChoicesText;
                resetToStaticChoices();
              }
              return;
            }

            // Too-short handling: show helpful message and don't search
            if (lastQuery.trim().length < minLength) {
              console.log("⚠️ Query too short, showing too-short message");
              if (choicesInstance) {
                choicesInstance.config.noChoicesText = tTooShort(minLength);
                // Reset to static choices for short queries or use static ones if available
                const hasStaticOptions =
                  (items && items.length > 0) ||
                  (groups &&
                    groups.some((g) => g.choices && g.choices.length > 0));
                if (hasStaticOptions) {
                  resetToStaticChoices();
                } else {
                  choicesInstance.clearChoices();
                }
              }
              return;
            }

            const hasApiConfig = source_url && source_key;

            if (hasApiConfig) {
              console.log("🌐 Using API mode for search");
              // Use API mode when API is configured
              try {
                const apiChoices = await fetchApiChoices(lastQuery);
                console.log("📡 API response:", {
                  query: lastQuery,
                  apiChoices: apiChoices.length,
                  rawChoices: apiChoices,
                });

                if (!choicesInstance) return;

                // Get currently selected values to exclude from new choices
                let selectedValues: string[] = [];
                try {
                  const currentValue = choicesInstance.getValue(true);
                  console.log(
                    "🎯 Current value from choicesInstance (API):",
                    currentValue,
                  );

                  if (Array.isArray(currentValue)) {
                    selectedValues = currentValue.map((item: any) =>
                      String(item.value || item),
                    );
                  } else if (currentValue && typeof currentValue === "object") {
                    // Handle single selection case
                    selectedValues = [
                      String(currentValue.value || currentValue),
                    ];
                  } else if (currentValue) {
                    // Handle primitive value case
                    selectedValues = [String(currentValue)];
                  }
                } catch (error) {
                  console.warn(
                    "⚠️ Error getting current value during API search:",
                    error,
                  );
                  selectedValues = [];
                }

                console.log("🎯 Currently selected values:", selectedValues);

                // Filter out already selected values from API results
                const filteredApiChoices = apiChoices.filter(
                  (choice) => !selectedValues.includes(String(choice.value)),
                );

                console.log("🔍 Filtered API choices:", {
                  total: apiChoices.length,
                  filtered: filteredApiChoices.length,
                  excluded: apiChoices.length - filteredApiChoices.length,
                });

                if (filteredApiChoices.length === 0) {
                  // No new results from API. Determine the correct message.
                  if (apiChoices.length === 0) {
                    // API returned no results for the query.
                    choicesInstance.config.noChoicesText = "No results found";
                    console.log("❌ API returned no results");
                  } else {
                    // API returned results, but they are all already selected.
                    choicesInstance.config.noChoicesText = baseNoChoicesText;
                    console.log(
                      "ℹ️ API returned results but all are already selected",
                    );
                  }
                  // Clear the list and show the message.
                  choicesInstance.setChoices([], "value", "label", true);
                } else {
                  // We have new, unselected results to show.
                  choicesInstance.config.noChoicesText = baseNoChoicesText;
                  choicesInstance.setChoices(
                    filteredApiChoices.map((c) => ({
                      value: String(c.value),
                      label: c.label,
                    })),
                    "value",
                    "label",
                    true,
                  );
                  console.log(
                    "✅ Set new API choices:",
                    filteredApiChoices.length,
                  );
                }
              } catch (e) {
                console.error("❌ Failed to fetch API choices:", e);
                if (choicesInstance) {
                  choicesInstance.config.noChoicesText = "No results found";
                }
              }
            } else {
              console.log("📋 Using static choices mode for search");
              // For static choices, filter both by search term and exclude selected values
              if (choicesInstance) {
                // Get currently selected values to exclude - use safe getValue logic
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
                    selectedValues = [
                      String(currentValue.value || currentValue),
                    ];
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

                console.log(
                  "🎯 Currently selected values (static mode):",
                  selectedValues,
                );

                // Filter static choices by search term and exclude selected values
                const searchTerm = lastQuery.toLowerCase();

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
                    choicesInstance.config.noChoicesText = baseNoChoicesText;
                    console.log(
                      "ℹ️ Found static matches but all are already selected",
                    );
                  }
                } else {
                  // Have choices to show
                  choicesInstance.config.noChoicesText = baseNoChoicesText;
                  choicesInstance.setChoices(
                    filteredStaticChoices.map((c) => ({
                      value: String(c.value),
                      label: c.label,
                      disabled: c.disabled,
                    })),
                    "value",
                    "label",
                    true,
                  );
                  console.log(
                    "✅ Set filtered static choices:",
                    filteredStaticChoices.length,
                  );
                }
              }
            }
          }, 0);
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

    if (choicesInstance && value !== undefined) {
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
      selectElement?.removeEventListener("change", handleChoicesChange);
      selectElement?.removeEventListener("choice", () => {});
      choicesInstance.destroy();
      console.log("✅ Choices instance destroyed");
    }
  });

  // Log component state changes
  $effect(() => {
    console.log("📊 Component state updated:", {
      id,
      name,
      multiple,
      value,
      items: items.length,
      groups: groups.length,
      enhancedItems: enhancedItems.length,
      staticChoices: staticChoices.length,
      computedPlaceholderText,
      computedRemoveItemButton,
    });
  });
</script>

<div
  class="gem-c-select-with-search"
  style={`--cross-icon-url: url("${crossIconUrl}")`}
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
  :global(.choices[data-type*="select-multiple"] .choices__button),
  :global(.choices[data-type*="text"] .choices__button) {
    position: relative;
    display: inline-block;
    margin-top: 0;
    margin-right: -4px;
    margin-bottom: 0;
    margin-left: 8px;
    padding-left: 16px;
    border-left: 1px solid hsl(0, 0%, 90%);
    background-image: var(--cross-icon-url);
    background-size: 12px;
    width: 12px;
    line-height: 1;
    opacity: 0.75;
    border-radius: 0;
  }
  :global(.choices[data-type*="select-multiple"] .choices__button:hover),
  :global(.choices[data-type*="select-multiple"] .choices__button:focus),
  :global(.choices[data-type*="text"] .choices__button:hover),
  :global(.choices[data-type*="text"] .choices__button:focus) {
    opacity: 1;
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
  :global(.choices__list--multiple .choices__item) {
    display: inline-block;
    vertical-align: middle;
    border-radius: 0;
    padding: 4px 10px;
    font-size: 19px;
    font-weight: 500;
    margin-right: 3.75px;
    margin-bottom: 3.75px;
    background-color: #fff;
    border: 1px solid hsl(0, 0%, 95%);
    color: #fff;
    word-break: break-all;
    box-sizing: border-box;
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
    /* Remove the 4px offset added on focus/open which increases the visual
     height and mis-centres the placeholder. Keep the min-height but reset
     padding so content stays vertically centred. Use !important to override
     Choices.js inline styles. */
    padding: 0px;
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
  :global(.gem-c-select-with-search .choices__list--multiple .choices__item) {
    display: inline-flex;
    align-items: center;
    border: 0;
    padding: 0 0 0 10px;
    margin: 10px 10px 0 0;
    background-color: #f3f2f1;
    box-shadow: 0 2px 0 #b1b4b6;
    line-height: 1;
    color: #0b0c0c;
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
  :global(.gem-c-select-with-search .choices__list--dropdown .choices__item),
  :global(
    .gem-c-select-with-search .choices__list[aria-expanded] .choices__item
  ) {
    position: relative;
    border-bottom: 1px solid #b1b4b6;
  }
  :global(
    .gem-c-select-with-search .choices__list--dropdown .choices__item:last-child
  ),
  :global(
    .gem-c-select-with-search
      .choices__list[aria-expanded]
      .choices__item:last-child
  ) {
    border-bottom: 0;
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
    background-color: #1d70b8;
    border-color: #1d70b8;
    color: #fff;
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
    padding: 0px;
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
    padding: 0 12px;
  }

  /* Set max height for single-select choices__inner */
  :global(
    .gem-c-select-with-search .choices[data-type*="select-one"] .choices__inner
  ) {
    max-height: 46px;
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
</style>
