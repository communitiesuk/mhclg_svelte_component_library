<script lang="ts">
  import { onMount } from "svelte";
  import { clsx } from "clsx";
  import Search from "./Search.svelte"; // Base component
  import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
  import { browser } from "$app/environment";
  import suggestionIconUrl from "./../../assets/govuk_publishing_components/images/icon-autocomplete-search-suggestion.svg?url";
  import closeIconUrl from "./../../assets/govuk_publishing_components/images/icon-close.svg?url"; // Import for the cancel button

  // SSR-safe HTML sanitizer: no-op on server
  let sanitize: (html: string) => string = (html) => html;

  // --- Define Props ---
  type SuggestionObject = { label: string; value: any; [key: string]: any }; // Allow additional properties for grouping
  type Suggestion = string | SuggestionObject;
  type Props = {
    // User can supply either an options array or an API source
    options?: Suggestion[]; // Predefined suggestions list
    source_url?: string; // Optional: URL for autocomplete suggestions
    source_key?: string; // Optional: Key in the JSON response containing suggestions array
    source_property?: string; // Property to extract from API objects
    pathBasedApi?: boolean; // Whether to use path-based URLs (RESTful) instead of query parameters
    groupKey?: string; // Optional: Key to group suggestions by (e.g., "region", "category")
    sourceSelector?: (
      query: string,
      options: Suggestion[],
    ) => "api" | "options"; // Function to determine which source to use
    outerClasses?: string; // Optional classes for the outer wrapper
    outerDataAttributes?: Record<string, string>; // Optional data attributes for the outer wrapper
    // Add other expected props passed down (e.g., size, on_govuk_blue, id, name etc.)
    size?: "large" | "";
    on_govuk_blue?: boolean;
    homepage?: boolean;
    id?: string;
    name?: string;
    label_text?: string;
    button_text?: string;
    // Include any other props you expect to pass through
    [key: string]: any; // Allow other props via rest spread, less type-safe
    // --- Add new props for accessible-autocomplete config ---
    minLength?: number;
    confirmOnBlur?: boolean;
    showNoOptionsFound?: boolean;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    tNoResults?: () => string; // Function prop
    tAssistiveHint?: () => string; // Function prop
    menuAttributes?: Record<string, any>; // Object prop
    menuClasses?: string | null;
    hint?: string; // Add hint prop
    selectedValue?: any; // Bindable selected value, updated on selection
  };

  let {
    options = undefined,
    source_url = undefined,
    source_key = undefined,
    source_property = undefined,
    pathBasedApi = false,
    groupKey = undefined,
    sourceSelector = undefined,
    size = "",
    on_govuk_blue = false,
    homepage = false,
    outerClasses = "",
    outerDataAttributes = {},
    id, // Pass down id
    name = "q", // Pass down name or use default
    label_text = "Search", // Example: Default label
    button_text = "Search", // Pass down button text
    // --- Destructure new props ---
    minLength = 3, // Default from accessible-autocomplete
    confirmOnBlur = false, // Default from accessible-autocomplete
    showNoOptionsFound = true, // Default from accessible-autocomplete
    defaultValue = "", // Default to empty string
    placeholder = "",
    required = false,
    tNoResults = () => "No results found", // Default function
    tAssistiveHint = () =>
      "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.", // Default function
    menuAttributes = {},
    menuClasses = "", // Default to empty string
    hint = undefined, // Add hint destructuring
    selectedValue = $bindable(), // Bindable prop for selected value
    ...restSearchProps // Other props for the base Search component
  }: Props = $props();

  let containerElement: HTMLDivElement; // bind:this target for the outer div
  let autocompleteInstance: { inputElement?: HTMLInputElement } | null = null; // To store instance if needed

  // Track which source is currently being used for dynamic data attributes
  let currentSource = $state<"api" | "options" | "auto">("auto");
  let currentSourceUrl = $state<string | undefined>(undefined);
  let currentSourceKey = $state<string | undefined>(undefined);
  let currentSourceProperty = $state<string | undefined>(undefined);

  // --- Derived Values ---
  const wrapperClasses = $derived(
    clsx(
      "gem-c-search-with-autocomplete",
      size === "large" && "gem-c-search-with-autocomplete--large",
      (on_govuk_blue || homepage) &&
        "gem-c-search-with-autocomplete--on-govuk-blue", // Apply blue style if either is true
      // TODO: Replicate margin logic from Ruby template if needed using govuk utility classes
      outerClasses,
    ),
  );

  // Prepare props for the inner Search component
  const searchComponentOptions = $derived({
    ...restSearchProps,
    label_text, // Pass down explicitly
    button_text, // Pass down explicitly
    id, // Pass id down
    name, // Pass name down
    inline_label: false, // Force separate label for autocomplete compatibility
    size, // Pass size down
    on_govuk_blue, // Pass blue status down
    homepage, // Pass homepage status down
    hint, // Pass the hint prop down
    value: undefined, // Don't pass initial value, let autocomplete handle it
  });

  // custom "too-short" message
  function tooShort(min: number) {
    return `Enter ${min} or more characters for suggestions`;
  }

  // --- Lifecycle & Autocomplete Initialisation ---
  onMount(async () => {
    // console.log("SearchAutocomplete: onMount started.");

    if (browser) {
      // hook up DOMPurify sanitize in browser
      const DOMPurify = (await import("dompurify")).default;
      sanitize = DOMPurify.sanitize;

      // now load autocomplete
      const accessibleAutocomplete = (await import("accessible-autocomplete"))
        .default;

      // Assert type for querySelector results
      const targetInputWrapper = containerElement?.querySelector(
        ".js-search-input-wrapper",
      ) as HTMLDivElement | null;
      const searchInput = containerElement?.querySelector(
        'input[type="search"]',
      ) as HTMLInputElement | null; // Assert as HTMLInputElement

      if (!targetInputWrapper || !searchInput) {
        console.error(
          "SearchAutocomplete: Could not find target elements for initialisation.",
        );
        return;
      }

      // --- Define Source Functions ---

      // Source function for fetching from API
      const getResultsFromApi = (
        query: string,
        populateResults: (results: string[]) => void,
      ) => {
        // Update current source tracking
        currentSource = "api";
        currentSourceUrl = source_url;
        currentSourceKey = source_key;
        currentSourceProperty = source_property;

        if (!source_url || !source_key) {
          console.error(
            "SearchAutocomplete: source_url and source_key are required for API mode.",
          );
          populateResults([]);
          return;
        }

        // Construct URL based on pathBasedApi setting
        let url: URL;
        if (pathBasedApi) {
          // For RESTful APIs like Zippopotam.us: append query to path
          const baseUrl = source_url.endsWith("/")
            ? source_url.slice(0, -1)
            : source_url;
          url = new URL(`${baseUrl}/${encodeURIComponent(query)}`);
        } else {
          // For query parameter APIs: add ?q=query
          url = new URL(source_url);
          url.searchParams.set("q", query);
        }

        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => {
            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
          })
          .then((data) => {
            // console.log("SearchAutocomplete: Data fetched:", data);
            const results = data[source_key] || [];
            if (!Array.isArray(results)) {
              console.error(
                "SearchAutocomplete: Source key did not return an array.",
              );
              populateResults([]);
              return;
            }
            // --- API MAPPING LOGIC ---
            populateResults(
              results.map((item: any) => {
                if (typeof item === "string") {
                  return item;
                } else if (item && typeof item === "object") {
                  // 1. Try the specified source_property if provided
                  if (source_property && source_property in item) {
                    return String(item[source_property]);
                  }
                  // 2. Fallback to 'label'
                  if ("label" in item) return String(item.label);
                  // 3. Fallback to 'postcode' (for backwards compatibility/common case)
                  if ("postcode" in item) return String(item.postcode);
                  // 4. If none found, stringify the object (might be undesirable)
                  console.warn(
                    "SearchAutocomplete: Could not find 'label', 'postcode', or specified 'source_property' in object:",
                    item,
                  );
                }
                // 5. Final fallback: stringify the item
                return String(item ?? ""); // Ensure null/undefined becomes empty string
              }),
            );
          })
          .catch((error) => {
            console.error("SearchAutocomplete: Error fetching results:", error);
            populateResults([]);
          });
      };

      // Source function for using provided options array
      const getResultsFromOptions = (
        query: string,
        populateResults: (results: Suggestion[]) => void,
      ) => {
        // Update current source tracking
        currentSource = "options";
        currentSourceUrl = undefined;
        currentSourceKey = undefined;
        currentSourceProperty = undefined;

        if (!options) {
          populateResults([]);
          return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = options.filter((option) => {
          const label = typeof option === "string" ? option : option.label;
          return label.toLowerCase().includes(lowerQuery);
        });
        populateResults(filtered);
      };

      // Determine which source to use
      const useOptions = Array.isArray(options) && options.length > 0;
      const sourceFunction = useOptions
        ? getResultsFromOptions
        : getResultsFromApi;

      // Initialise current source tracking based on initial configuration
      if (sourceSelector) {
        currentSource = "auto"; // Will be determined dynamically
        currentSourceUrl = source_url;
        currentSourceKey = source_key;
        currentSourceProperty = source_property;
      } else if (useOptions) {
        currentSource = "options";
        currentSourceUrl = undefined;
        currentSourceKey = undefined;
        currentSourceProperty = undefined;
      } else {
        currentSource = "api";
        currentSourceUrl = source_url;
        currentSourceKey = source_key;
        currentSourceProperty = source_property;
      }

      // If sourceSelector is provided, create a dynamic source function
      const dynamicSourceFunction = sourceSelector
        ? (query: string, populateResults: (results: Suggestion[]) => void) => {
            const selectedSource = sourceSelector(query, options || []);
            // Handle invalid returns by falling back to default logic
            if (selectedSource === "api") {
              getResultsFromApi(query, populateResults);
            } else if (selectedSource === "options") {
              getResultsFromOptions(query, populateResults);
            } else {
              // Fall back to default logic if invalid return value
              sourceFunction(query, populateResults);
            }
          }
        : null;

      // Use dynamic source if available, otherwise fall back to original logic
      const finalSourceFunction = dynamicSourceFunction || sourceFunction;

      // Define suggestion template function (sanitize and highlight)
      const suggestionTemplate = (result: Suggestion): string => {
        const displayLabel = typeof result === "string" ? result : result.label;
        // Basic sanitization
        const scratch = document.createElement("div");
        scratch.textContent = displayLabel;
        const sanitizedResult = sanitize(scratch.innerHTML);

        // Get the input value directly from the DOM input created by the library
        const inputElement = containerElement?.querySelector(
          ".gem-c-search-with-autocomplete__input",
        ) as HTMLInputElement | null; // Find the specific input
        const currentInputValue = inputElement?.value?.toLowerCase() || ""; // Get its value

        const index = currentInputValue
          ? sanitizedResult.toLowerCase().indexOf(currentInputValue)
          : -1;
        let html = sanitizedResult;

        if (currentInputValue && index !== -1) {
          const before = sanitizedResult.slice(0, index);
          const match = sanitizedResult.slice(
            index,
            index + currentInputValue.length,
          );
          const after = sanitizedResult.slice(index + currentInputValue.length);
          html = `${before}<mark class="gem-c-search-with-autocomplete__suggestion-highlight">${match}</mark>${after}`;
        }

        // Get group text if groupKey is provided and result is an object
        const groupText =
          groupKey && typeof result === "object" && result[groupKey]
            ? ` <span class="gem-c-search-with-autocomplete__suggestion-group">${sanitize(String(result[groupKey]))}</span>`
            : "";

        // Match the GOV.UK structure with integrated group text
        return `
          <div class="gem-c-search-with-autocomplete__option-wrapper">
            <span class="gem-c-search-with-autocomplete__suggestion-icon"></span>
            <span class="gem-c-search-with-autocomplete__suggestion-text">${html}${groupText}</span>
          </div>
        `;
      };

      // Define inputValue template function (handles objects)
      const inputValueTemplate = (result: Suggestion | undefined): string => {
        if (result === undefined) return "";
        // Use label for input value if it's an object, otherwise use the string
        return typeof result === "string" ? result : result.label;
      };

      // Define confirm function
      let isSubmitting = false; // Prevent double submit
      const handleConfirm = (confirmedValue: Suggestion | undefined) => {
        if (confirmedValue === undefined || isSubmitting) return;

        // Re-assign selectedValue before any form-based guard checks (!form) so bindings still update
        // (e.g. when no <form> exists around the component usage) and search component value is being used clienside without a page reload
        selectedValue =
          typeof confirmedValue === "string"
            ? confirmedValue
            : confirmedValue.value;

        // Type assertion needed here
        const inputElement =
          autocompleteInstance?.inputElement as HTMLInputElement;
        const form = containerElement?.closest("form");

        if (!inputElement || !form) return;

        isSubmitting = true;
        inputElement.value = inputValueTemplate(confirmedValue);
        inputElement.dataset.autocompleteAccepted = "true"; // Set tracking attribute

        // Submit form
        if (form.requestSubmit) {
          form.requestSubmit();
        } else {
          form.submit(); // Fallback for older browsers
        }
        // Reset flag after a short delay in case submission fails/is prevented
        setTimeout(() => {
          isSubmitting = false;
        }, 500);
      };

      // Initialise accessible-autocomplete
      autocompleteInstance = accessibleAutocomplete({
        element: targetInputWrapper, // Target the div *containing* the input
        id: searchInput.id, // Use the ID from the *rendered* Search input
        name: searchInput.name, // Use the name from the *rendered* Search input
        inputClasses: searchInput.classList, // Pass original classes directly
        source: finalSourceFunction,
        minLength: minLength,
        confirmOnBlur: confirmOnBlur,
        showNoOptionsFound: showNoOptionsFound,
        defaultValue: defaultValue,
        placeholder: placeholder,
        required: required,
        tNoResults: tNoResults,
        tAssistiveHint: tAssistiveHint,
        menuAttributes: menuAttributes,
        menuClasses: menuClasses,
        tStatusQueryTooShort: tooShort,
        displayMenu: "overlay",
        cssNamespace: "gem-c-search-with-autocomplete",
        onConfirm: handleConfirm,
        templates: {
          suggestion: suggestionTemplate,
          inputValue: inputValueTemplate, // optional template to transform displayed value
          // noOptionsFound: optional template
        },
      });

      // Query the DOM for the input element *created* by the library
      const autocompleteInputElement = containerElement?.querySelector(
        ".gem-c-search-with-autocomplete__input",
      ) as HTMLInputElement | null;
      // console.log(
      //   "SearchAutocomplete: Input element queried from DOM:",
      //   autocompleteInputElement,
      // ); // Updated log

      // Post-initialisation tweaks
      if (autocompleteInputElement) {
        // Post-init: dynamically show a 'too-short' warning when the user types fewer than minLength characters
        // Find the dropdown menu <ul> generated by accessible-autocomplete
        const suggestionsMenu =
          containerElement.querySelector<HTMLUListElement>(
            ".gem-c-search-with-autocomplete__menu",
          );
        // Listen for input changes on the autocomplete field
        autocompleteInputElement.addEventListener("input", () => {
          const val = autocompleteInputElement.value;
          // Remove any existing 'too-short' warning before adding a new one to ensure we don't accumulate multiple warning items.
          suggestionsMenu
            ?.querySelector(
              ".gem-c-search-with-autocomplete__option--too-short",
            )
            ?.remove();
          if (val.length < minLength) {
            // Force the menu open so the warning is shown
            autocompleteInputElement.setAttribute("aria-expanded", "true");
            suggestionsMenu?.classList.add(
              "gem-c-search-with-autocomplete__menu--visible",
            );
            suggestionsMenu?.classList.remove(
              "gem-c-search-with-autocomplete__menu--hidden",
            );
            // Create a new <li> element with the warning text. Classes match the library's own suggestion items (so it looks and behaves consistently). Set role="option" and aria-disabled="true" for accessibility
            const li = document.createElement("li");
            li.className =
              "gem-c-search-with-autocomplete__option gem-c-search-with-autocomplete__option--too-short";
            li.setAttribute("role", "option");
            li.setAttribute("aria-disabled", "true");
            li.textContent = tooShort(minLength);
            // Insert the warning at the top of the suggestions list menu
            suggestionsMenu?.prepend(li);
          }
        });
        autocompleteInputElement.setAttribute("type", "search"); // Ensure input type is search
        // autocompleteInputElement.classList.add("autocomplete__input"); // Add specific class if needed

        // Add Enter key workaround from original JS
        autocompleteInputElement.addEventListener("keydown", (e) => {
          if (isSubmitting) return; // Don't interfere if already submitting
          const dropdownVisible =
            autocompleteInputElement.getAttribute("aria-expanded") === "true";
          if (dropdownVisible && e.key === "Enter") {
            const form = containerElement?.closest("form");
            if (form) {
              isSubmitting = true;
              if (form.requestSubmit) form.requestSubmit();
              else form.submit();
              setTimeout(() => {
                isSubmitting = false;
              }, 500);
            }
          }
        });

        // console.log(
        //   "Autocomplete input classes AFTER add:",
        //   Array.from(autocompleteInputElement.classList),
        // );
      }

      // IMPORTANT: Remove the original Search.svelte input, as accessible-autocomplete replaces it.
      // We render it initially so accessible-autocomplete can grab its id, name, value.
      if (searchInput) {
        searchInput.remove(); // Use remove() instead of hiding
      }
      // Also remove the original label if it's still present inside targetInputWrapper
      const originalLabel = targetInputWrapper.querySelector(
        "label",
      ) as HTMLLabelElement | null;
      if (originalLabel) {
        originalLabel.remove(); // Use remove() instead of hiding
      }
    }
  }); // End of onMount
</script>

<div
  bind:this={containerElement}
  class={wrapperClasses}
  data-module="gem-search-with-autocomplete"
  data-source-url={currentSourceUrl}
  data-source-key={currentSourceKey}
  data-source-property={currentSourceProperty}
  data-group-key={groupKey}
  data-current-source={currentSource}
  {...outerDataAttributes}
  style={`--suggestion-icon: url("${suggestionIconUrl}"); --cancel-icon: url("${closeIconUrl}")`}
>
  <!-- Render the base Search component initially -->
  <!-- accessible-autocomplete will enhance the input inside it -->
  <Search {...searchComponentOptions} />
</div>

<style>
  /* global to prevent css namespace conflict with original library*/
  :global {
    .gem-c-search-with-autocomplete__wrapper {
      position: relative;
    }

    .gem-c-search-with-autocomplete__menu {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      background-color: #fff;
      border: 1px solid #b1b4b6;
      border-top: 0;
      margin-right: -40px;
    }

    .gem-c-search-with-autocomplete__menu--visible {
      display: block;
    }

    .gem-c-search-with-autocomplete__menu--hidden {
      display: none;
    }

    .gem-c-search-with-autocomplete__menu--inline {
      position: relative;
    }

    .gem-c-search-with-autocomplete__option {
      display: block;
      cursor: pointer;
      font-family: "GDS Transport", arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-weight: 400;
      font-size: 1.1875rem;
      line-height: 1.3157894737;
    }

    @media print {
      .gem-c-search-with-autocomplete__option {
        font-family: sans-serif;
      }
    }

    @media print {
      .gem-c-search-with-autocomplete__option {
        font-size: 14pt;
        line-height: 1.15;
      }
    }

    .gem-c-search-with-autocomplete__option > * {
      pointer-events: none;
    }

    .gem-c-search-with-autocomplete__option > span {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    .gem-c-search-with-autocomplete__option--focused,
    .gem-c-search-with-autocomplete__option:hover,
    .gem-c-search-with-autocomplete__option:focus-visible {
      background-color: #f3f2f1;
      outline: none;
      text-decoration: underline;
      text-decoration-thickness: max(1px, 0.0625rem);
      text-underline-offset: 0.1578em;
      text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
      -webkit-text-decoration-skip-ink: none;
      text-decoration-skip-ink: none;
      -webkit-text-decoration-skip: none;
      text-decoration-skip: none;
    }

    .gem-c-search-with-autocomplete__option--focused
      .gem-c-search-with-autocomplete__suggestion-icon,
    .gem-c-search-with-autocomplete__option:hover
      .gem-c-search-with-autocomplete__suggestion-icon,
    .gem-c-search-with-autocomplete__option:focus-visible
      .gem-c-search-with-autocomplete__suggestion-icon {
      background-color: #0b0c0c;
    }

    .gem-c-search-with-autocomplete__option:focus-visible
      .gem-c-search-with-autocomplete__suggestion-text {
      background-color: #fd0;
    }

    .gem-c-search-with-autocomplete__option-wrapper {
      display: flex;
      align-items: center;
      margin: 0 15px;
      padding: 5px 0;
      border-bottom: 1px solid #b1b4b6;
    }

    .gem-c-search-with-autocomplete__option:last-child
      .gem-c-search-with-autocomplete__option-wrapper {
      border-bottom: 0;
    }

    .gem-c-search-with-autocomplete__suggestion-icon {
      width: 20px;
      height: 40px;
      margin-right: 10px;
      flex: none;
      mask-image: var(--suggestion-icon);
      -webkit-mask-image: var(--suggestion-icon);
      background-color: #505a5f;
    }

    .gem-c-search-with-autocomplete__suggestion-text {
      font-weight: bold;
    }

    .gem-c-search-with-autocomplete__suggestion-highlight {
      font-weight: normal;
      background: none;
    }

    .gem-c-search-with-autocomplete__suggestion-group {
      opacity: 0.8;
      font-size: smaller;
      font-weight: normal;
    }

    .gem-c-search-with-autocomplete.gem-c-search-with-autocomplete--large
      .gem-c-search-with-autocomplete__menu {
      margin-right: -50px;
    }

    .gem-c-search-with-autocomplete.gem-c-search-with-autocomplete--large
      .gem-c-search-with-autocomplete__option {
      min-height: 50px;
    }

    .gem-c-search-with-autocomplete.gem-c-search-with-autocomplete--on-govuk-blue
      .gem-c-search-with-autocomplete__menu {
      border-top: 1px solid #b1b4b6;
    }

    @media (forced-colors: active) {
      .gem-c-search-with-autocomplete__menu {
        border-color: FieldText;
      }

      .gem-c-search-with-autocomplete__option {
        forced-color-adjust: none;
        background-color: Field;
        color: FieldText;
      }

      .gem-c-search-with-autocomplete__option--focused,
      .gem-c-search-with-autocomplete__option:hover,
      .gem-c-search-with-autocomplete__option:focus-visible {
        background-color: Highlight;
        color: HighlightText;
        border-color: FieldText;
      }

      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-text,
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-text,
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-text {
        background: none;
      }

      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-highlight,
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-highlight,
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-highlight {
        color: HighlightText;
      }

      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-icon,
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-icon,
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-icon {
        background-color: HighlightText;
      }

      .gem-c-search-with-autocomplete__option:focus-visible:not(:hover) {
        background-color: SelectedItem;
        color: SelectedItemText;
      }

      .gem-c-search-with-autocomplete__option:focus-visible:not(:hover)
        .gem-c-search-with-autocomplete__suggestion-highlight {
        color: SelectedItemText;
      }

      .gem-c-search-with-autocomplete__option:focus-visible:not(:hover)
        .gem-c-search-with-autocomplete__suggestion-icon {
        background-color: SelectedItemText;
      }

      .gem-c-search-with-autocomplete__suggestion-highlight {
        color: FieldText;
      }

      .gem-c-search-with-autocomplete__suggestion-icon {
        background-color: FieldText;
      }
    }
  }
</style>
