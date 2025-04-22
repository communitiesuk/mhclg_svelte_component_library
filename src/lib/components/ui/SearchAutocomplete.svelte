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
    size, // Pass size down
    on_govuk_blue, // Pass blue status down
    homepage, // Pass homepage status down
    hint: undefined, // Ensure hint is not passed down, as autocomplete handles it
    value: undefined, // Don't pass initial value, let autocomplete handle it
  });

  // --- Lifecycle & Autocomplete Initialization ---
  onMount(() => {
    // console.log("SearchAutocomplete: onMount started.");

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
      inputClasses: searchInput.classList, // Pass original classes directly
      source: getResults,
      minLength: 3,
      confirmOnBlur: false,
      showNoOptionsFound: false,
      defaultValue: searchInput.value, // Start with any value already in the input
      displayMenu: "overlay", // Use overlay menu by default
      cssNamespace: "gem-c-search-with-autocomplete",
      onConfirm: handleConfirm,
      templates: {
        suggestion: suggestionTemplate,
        // inputValue: optional template to transform displayed value
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

    // Post-initialization tweaks
    if (autocompleteInputElement) {
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
</style>
