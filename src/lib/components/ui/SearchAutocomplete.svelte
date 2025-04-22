<script lang="ts">
  import { onMount } from "svelte";
  import { clsx } from "clsx";
  import Search from "$lib/components/ui/Search.svelte"; // Base component
  import accessibleAutocomplete from "accessible-autocomplete";
  import "accessible-autocomplete/dist/accessible-autocomplete.min.css"; // Import CSS

  // --- Define Props ---
  // Minimal type definition locally if needed, or rely on inference
  type Props = {
    source_url: string; // Required: URL for autocomplete suggestions
    source_key: string; // Required: Key in the JSON response containing suggestions array
    outerClasses?: string; // Optional classes for the outer wrapper
    outerDataAttributes?: Record<string, string>; // Optional data attributes for the outer wrapper
    // Add other expected props passed down (e.g., size, on_govuk_blue, id, name etc.)
    // Type these loosely or specifically as needed
    size?: "large" | "";
    on_govuk_blue?: boolean;
    homepage?: boolean;
    id?: string;
    name?: string;
    label_text?: string;
    button_text?: string;
    // Include any other props you expect to pass through
    [key: string]: any; // Allow other props via rest spread, less type-safe
  };

  let {
    source_url,
    source_key,
    size = "", // Default size from Search
    on_govuk_blue = false,
    homepage = false, // Added homepage prop handling
    outerClasses = "",
    outerDataAttributes = {},
    id, // Pass down id
    name = "q", // Pass down name or use default
    label_text = "Search", // Example: Default label
    button_text = "Search", // Pass down button text
    ...restSearchProps // Other props for the base Search component
  }: Props = $props();

  let containerElement: HTMLDivElement; // bind:this target for the outer div
  let autocompleteInstance: { inputElement?: HTMLInputElement } | null = null; // To store instance if needed

  // --- Derived Values ---
  const wrapperClasses = $derived(
    clsx(
      "gem-c-search-with-autocomplete",
      size === "large" && "gem-c-search-with-autocomplete--large",
      (on_govuk_blue || homepage) &&
        "gem-c-search-with-autocomplete--on-govuk-blue", // Apply blue style if either is true
      // TODO: Replicate margin logic from Ruby template if needed using govuk utility classes
      // Example: margin_bottom prop handling could go here
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
    margin_bottom: 0, // Remove margin from inner component
    size, // Pass size down
    on_govuk_blue, // Pass blue status down
    homepage, // Pass homepage status down
    hint: undefined, // Ensure hint is not passed down, as autocomplete handles it
    value: undefined, // Don't pass initial value, let autocomplete handle it
  });

  // --- Lifecycle & Autocomplete Initialization ---
  onMount(() => {
    // Assert type for querySelector results
    const targetInputWrapper = containerElement?.querySelector(
      ".js-search-input-wrapper",
    ) as HTMLDivElement | null;
    const searchInput = containerElement?.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement | null; // Assert as HTMLInputElement

    if (!targetInputWrapper || !searchInput) {
      console.error(
        "SearchAutocomplete: Could not find target elements for initialization.",
      );
      return;
    }

    // Define source function
    const getResults = (
      query: string,
      populateResults: (results: string[]) => void,
    ) => {
      const url = new URL(source_url);
      url.searchParams.set("q", query);
      fetch(url, { headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          const results = data[source_key] || [];
          if (!Array.isArray(results)) {
            console.error(
              "SearchAutocomplete: Source key did not return an array.",
            );
            populateResults([]);
            return;
          }
          // TODO: Add tracking attribute logic here if needed (see original JS)
          // Ensure results are strings. Handle potential null/undefined in data.
          populateResults(results.map((item) => String(item ?? "")));
        })
        .catch((error) => {
          console.error("SearchAutocomplete: Error fetching results:", error);
          populateResults([]);
        });
    };

    // Define suggestion template function (sanitize and highlight)
    const suggestionTemplate = (result: string): string => {
      // Basic sanitization
      const scratch = document.createElement("div");
      scratch.textContent = result;
      const sanitizedResult = scratch.innerHTML;

      // Type assertion needed here
      const currentInputValue =
        (
          autocompleteInstance?.inputElement as HTMLInputElement
        )?.value?.toLowerCase() || "";
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

      // Match the GOV.UK structure
      return `
        <div class="gem-c-search-with-autocomplete__option-wrapper">
          <span class="gem-c-search-with-autocomplete__suggestion-icon"></span>
          <span class="gem-c-search-with-autocomplete__suggestion-text">${html}</span>
        </div>
      `;
    };

    // Define confirm function
    let isSubmitting = false; // Prevent double submit
    const handleConfirm = (confirmedValue: string | undefined) => {
      if (confirmedValue === undefined || isSubmitting) return;

      // Type assertion needed here
      const inputElement =
        autocompleteInstance?.inputElement as HTMLInputElement;
      const form = containerElement?.closest("form");

      if (!inputElement || !form) return;

      isSubmitting = true;
      inputElement.value = confirmedValue;
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

    // Initialize accessible-autocomplete
    autocompleteInstance = accessibleAutocomplete({
      element: targetInputWrapper, // Target the div *containing* the input
      id: searchInput.id, // Use the ID from the *rendered* Search input
      name: searchInput.name, // Use the name from the *rendered* Search input
      source: getResults,
      minLength: 3,
      confirmOnBlur: false,
      showNoOptionsFound: false,
      defaultValue: searchInput.value, // Start with any value already in the input
      displayMenu: "overlay", // Use overlay menu by default
      cssNamespace: "gem-c-search-with-autocomplete", // Use the specific namespace
      onConfirm: handleConfirm,
      templates: {
        suggestion: suggestionTemplate,
        // inputValue: optional template to transform displayed value
        // noOptionsFound: optional template
      },
    });

    // Post-initialization tweaks
    // Type assertion needed here
    const autocompleteInputElement =
      autocompleteInstance?.inputElement as HTMLInputElement;
    if (autocompleteInputElement) {
      autocompleteInputElement.setAttribute("type", "search"); // Ensure input type is search
      autocompleteInputElement.classList.add(...searchInput.classList); // Re-apply classes from original input
      autocompleteInputElement.classList.add("autocomplete__input"); // Add specific class if needed

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
    }

    // IMPORTANT: Hide the original Search.svelte input, as accessible-autocomplete replaces it.
    // We render it initially so accessible-autocomplete can grab its id, name, value, classes.
    searchInput.style.display = "none";
    // Also hide the original label if it's still present inside targetInputWrapper (it shouldn't be with inline_label:false)
    const originalLabel = targetInputWrapper.querySelector(
      "label",
    ) as HTMLLabelElement | null;
    if (originalLabel) originalLabel.style.display = "none";
  }); // End of onMount
</script>

<div
  bind:this={containerElement}
  class={wrapperClasses}
  data-module="gem-search-with-autocomplete"
  data-source-url={source_url}
  data-source-key={source_key}
  {...outerDataAttributes}
>
  <!-- Render the base Search component initially -->
  <!-- accessible-autocomplete will enhance the input inside it -->
  <Search {...searchComponentOptions} />
</div>

<style>
  /* Styles copied/adapted from original CSS */
  /* Ensure :global() is used where necessary if these styles need */
  /* to affect elements generated by accessible-autocomplete library */

  /* Wrapper for the autocomplete instance */
  :global(.gem-c-search-with-autocomplete__wrapper) {
    position: relative;
  }

  /* Autocomplete menu styling */
  :global(.gem-c-search-with-autocomplete__menu) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #fff;
    border: 1px solid #b1b4b6;
    border-top: 0;
    /* Adjust margin-right based on button width (large vs default) */
    margin-right: -40px; /* Default size */
    position: absolute; /* Ensure it overlays */
    width: calc(100% + 40px); /* Extend width to cover button area */
    z-index: 10; /* Ensure it's above other elements */
  }

  :global(.gem-c-search-with-autocomplete__menu--visible) {
    display: block;
  }

  :global(.gem-c-search-with-autocomplete__menu--hidden) {
    display: none;
  }

  /* Option styling */
  :global(.gem-c-search-with-autocomplete__option) {
    display: block;
    cursor: pointer;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 1.3157894737;
    color: #0b0c0c; /* Ensure text color */
  }
  /* Print styles */
  @media print {
    :global(.gem-c-search-with-autocomplete__option) {
      font-family: sans-serif;
      font-size: 14pt;
      line-height: 1.15;
    }
  }

  :global(.gem-c-search-with-autocomplete__option > *) {
    pointer-events: none; /* Prevent clicks on inner elements */
  }

  /* Visually hidden accessibility text (e.g., "Option X of Y") */
  :global(.gem-c-search-with-autocomplete__option > span) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    clip: rect(0 0 0 0) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    border: 0 !important;
    white-space: nowrap !important;
  }

  /* Focused/hovered option styling */
  :global(.gem-c-search-with-autocomplete__option--focused),
  :global(.gem-c-search-with-autocomplete__option:hover),
  :global(.gem-c-search-with-autocomplete__option:focus-visible) {
    background-color: #f3f2f1; /* GOV.UK grey */
    outline: none;
    color: #0b0c0c; /* Ensure text color contrasts */
    text-decoration: underline;
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    text-underline-offset: 0.1578em;
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
  }

  /* Icon color on hover/focus */
  :global(
    .gem-c-search-with-autocomplete__option--focused
      .gem-c-search-with-autocomplete__suggestion-icon
  ),
  :global(
    .gem-c-search-with-autocomplete__option:hover
      .gem-c-search-with-autocomplete__suggestion-icon
  ),
  :global(
    .gem-c-search-with-autocomplete__option:focus-visible
      .gem-c-search-with-autocomplete__suggestion-icon
  ) {
    background-color: #0b0c0c; /* Black icon */
  }

  /* Focus-visible specific styles (e.g., keyboard nav) */
  :global(
    .gem-c-search-with-autocomplete__option:focus-visible
      .gem-c-search-with-autocomplete__suggestion-text
  ) {
    /* GOV.UK yellow focus on text */
    background-color: #fd0;
    box-shadow:
      0 -2px #fd0,
      0 4px #0b0c0c;
    color: #0b0c0c;
    outline: none;
  }

  /* Wrapper inside each option */
  :global(.gem-c-search-with-autocomplete__option-wrapper) {
    display: flex;
    align-items: center;
    margin: 0 15px;
    padding: 5px 0;
    border-bottom: 1px solid #b1b4b6;
  }

  /* Remove border from last option */
  :global(
    .gem-c-search-with-autocomplete__option:last-child
      .gem-c-search-with-autocomplete__option-wrapper
  ) {
    border-bottom: 0;
  }

  /* Suggestion icon */
  :global(.gem-c-search-with-autocomplete__suggestion-icon) {
    width: 20px;
    height: 40px;
    margin-right: 10px;
    flex: none;
    /* Use background-image for SVG */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 27' fill='none'%3E%3Ccircle cx='12.016' cy='11.016' r='8.516' stroke='%230b0c0c' stroke-width='3'/%3E%3Cline x1='17.867' y1='17.359' x2='26.447' y2='25.939' stroke='%230b0c0c' stroke-width='3'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-color: transparent; /* Default state */
    /* Use mask-image if needed for color control, but background-color might be simpler */
    /* mask-image: url(/path/to/icon.svg); */
    /* -webkit-mask-image: url(/path/to/icon.svg); */
    /* background-color: #505a5f; */ /* Color applied via background if using mask */
  }

  /* Suggestion text */
  :global(.gem-c-search-with-autocomplete__suggestion-text) {
    font-weight: bold; /* Match original */
  }

  /* Highlighted part of suggestion text */
  :global(.gem-c-search-with-autocomplete__suggestion-highlight) {
    font-weight: normal; /* Match original */
    background: none; /* Remove background */
    text-decoration: none; /* Remove underline from highlight */
  }

  /* Adjustments for large size */
  .gem-c-search-with-autocomplete--large
    :global(.gem-c-search-with-autocomplete__menu) {
    margin-right: -50px; /* Match larger button width */
    width: calc(100% + 50px);
  }

  /* No min-height needed? Check rendering */
  /* .gem-c-search-with-autocomplete--large :global(.gem-c-search-with-autocomplete__option) { */
  /*   min-height: 50px; */
  /* } */

  /* Adjustments for blue background */
  .gem-c-search-with-autocomplete--on-govuk-blue
    :global(.gem-c-search-with-autocomplete__menu) {
    /* Original CSS adds border-top: 1px solid #b1b4b6; */
    /* This seems counter-intuitive if the top border was removed before? */
    /* Let's omit this for now unless testing shows it's needed. */
    /* border-top: 1px solid #b1b4b6; */
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :global(.gem-c-search-with-autocomplete__menu) {
      border-color: FieldText;
    }
    :global(.gem-c-search-with-autocomplete__option) {
      forced-color-adjust: none;
      background-color: Field;
      color: FieldText;
    }
    :global(.gem-c-search-with-autocomplete__option--focused),
    :global(.gem-c-search-with-autocomplete__option:hover),
    :global(.gem-c-search-with-autocomplete__option:focus-visible) {
      background-color: Highlight;
      color: HighlightText;
      border-color: FieldText;
    }
    :global(
      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-text
    ),
    :global(
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-text
    ),
    :global(
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-text
    ) {
      background: none;
    }
    :global(
      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-highlight
    ),
    :global(
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-highlight
    ),
    :global(
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-highlight
    ) {
      color: HighlightText;
    }
    :global(
      .gem-c-search-with-autocomplete__option--focused
        .gem-c-search-with-autocomplete__suggestion-icon
    ),
    :global(
      .gem-c-search-with-autocomplete__option:hover
        .gem-c-search-with-autocomplete__suggestion-icon
    ),
    :global(
      .gem-c-search-with-autocomplete__option:focus-visible
        .gem-c-search-with-autocomplete__suggestion-icon
    ) {
      background-color: HighlightText !important;
    } /* Use !important to override inline bg */
    :global(.gem-c-search-with-autocomplete__option:focus-visible:not(:hover)) {
      background-color: SelectedItem;
      color: SelectedItemText;
    }
    :global(
      .gem-c-search-with-autocomplete__option:focus-visible:not(:hover)
        .gem-c-search-with-autocomplete__suggestion-highlight
    ) {
      color: SelectedItemText;
    }
    :global(
      .gem-c-search-with-autocomplete__option:focus-visible:not(:hover)
        .gem-c-search-with-autocomplete__suggestion-icon
    ) {
      background-color: SelectedItemText !important;
    }
    :global(.gem-c-search-with-autocomplete__suggestion-highlight) {
      color: FieldText;
    }
    :global(.gem-c-search-with-autocomplete__suggestion-icon) {
      background-color: FieldText !important;
    }
  }
</style>
