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

  // Initialize Choices.js
  onMount(async () => {
    try {
      // Import Choices.js dynamically
      const ChoicesModule = await import("choices.js");
      Choices = ChoicesModule.default;

      if (!selectElement) {
        console.error("Select element not found");
        return;
      }

      const ariaDescribedBy =
        selectElement.getAttribute("aria-describedby") || "";

      // Initialize Choices.js with GOV.UK settings
      const defaultOptions = {
        allowHTML,
        searchPlaceholderValue: searchPlaceholder,
        shouldSort,
        itemSelectText: "",
        searchResultLimit,
        removeItemButton: computedRemoveItemButton,
        labelId: id + "-label " + ariaDescribedBy,
        callbackOnInit: function () {
          // For multiple select, move input field to top of feedback area
          if (this.dropdown.type === "select-multiple") {
            const inner = this.containerInner.element;
            const input = this.input.element;
            inner.prepend(input);
          }
        },
        // Fuse.js options for search
        fuseOptions: {
          ignoreLocation: true, // matches any part of the string
          threshold: 0, // only matches when characters are sequential
        },
        ...choicesOptions,
      };

      choicesInstance = new Choices(selectElement, defaultOptions);

      // Store reference on the element for external access
      (selectElement as any).choices = choicesInstance;

      // Handle value changes from Choices.js
      selectElement.addEventListener("change", handleChoicesChange);
    } catch (error) {
      console.error("Failed to initialize Choices.js:", error);
    }
  });

  // Handle changes from Choices.js
  function handleChoicesChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (multiple) {
      const selectedValues = Array.from(target.selectedOptions).map(
        (option) => option.value,
      );
      value = selectedValues;
    } else {
      value = target.value;
    }
  }

  // Update Choices.js when value changes externally
  $effect(() => {
    if (choicesInstance && value !== undefined) {
      if (multiple && Array.isArray(value)) {
        choicesInstance.removeActiveItems();
        value.forEach((val: string | number) => {
          choicesInstance.setChoiceByValue(String(val));
        });
      } else if (!multiple && !Array.isArray(value)) {
        choicesInstance.setChoiceByValue(String(value));
      }
    }
  });

  // Cleanup
  onDestroy(() => {
    if (choicesInstance) {
      selectElement?.removeEventListener("change", handleChoicesChange);
      choicesInstance.destroy();
    }
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
    padding: 4px 16px 4px 4px;
    width: 100%;
    border-color: transparent;
  }
  :global([dir="rtl"] .choices__list--single) {
    padding-right: 4px;
    padding-left: 16px;
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
    padding: 10px;
    font-size: 19px;
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
  :global(.gem-c-select-with-search .choices__input.choices__input--cloned) {
    margin: 0;
    padding: 3px 0 3px 2px;
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
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
    -webkit-clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
    border-width: 8.66px 5px 0 5px;
    border-top-color: inherit;
    -webkit-transform: translateY(-50%) rotate(0) scale(1);
    -ms-transform: translateY(-50%) rotate(0) scale(1);
    transform: translateY(-50%) rotate(0) scale(1);
    margin: 0;
  }
  :global(
    .gem-c-select-with-search .choices.is-open[data-type*="select-one"]::after
  ) {
    margin: 0;
    bottom: 0.0526315789em;
    -webkit-transform: translateY(-50%) rotate(180deg) scale(1);
    -ms-transform: translateY(-50%) rotate(180deg) scale(1);
    transform: translateY(-50%) rotate(180deg) scale(1);
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

  .gem-c-select-with-search .choices.is-flipped .choices__list {
    border-radius: 0;
    border-width: 0p !important;
  }
</style>
