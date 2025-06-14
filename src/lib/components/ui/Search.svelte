<script lang="ts">
  import { clsx } from "clsx";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import IconSearch from "$lib/icons/IconSearch.svelte";
  import closeIconUrl from "$lib/assets/govuk_publishing_components/images/icon-close.svg?url";

  // SSR-safe HTML sanitizer: no-op on server
  let sanitize = $state<(html: string) => string>((html) => html);

  // Hook up DOMPurify sanitize in browser
  onMount(async () => {
    if (browser) {
      const DOMPurify = (await import("dompurify")).default;
      sanitize = DOMPurify.sanitize;
    }
  });

  // Define the props based on GOV.UK documentation
  type Props = {
    value?: string; // Initial input value
    label_text?: string; // Text for the label
    label_id?: string; // ID for the input, connects label
    inline_label?: boolean; // Label appears inline (default depends on label_size)
    hint?: string; // Add hint prop
    on_govuk_blue?: boolean; // Style for blue background
    homepage?: boolean; // Style for homepage use
    size?: "large" | ""; // Size variation
    name?: string; // Name attribute for input
    aria_controls?: string; // ID of controlled element
    button_text?: string; // Visually hidden button text
    label_size?: "xl" | "l" | "m" | "s" | "" | null; // Add "" to the type
    wrap_label_in_a_heading?: boolean; // Wrap label in heading
    heading_level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level
    margin_bottom?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // Component margin
    label_margin_bottom?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined; // Label margin
    label_custom_class?: string; // Custom class for label
    disable_corrections?: boolean; // Disable mobile autocorrect/caps
    input_width?:
      | "full"
      | "three-quarters"
      | "two-thirds"
      | "one-half"
      | "one-third"
      | "one-quarter"
      | ""
      | null; // GOV.UK input width class
    // Standard wrapper props
    id?: string;
    classes?: string;
    dataAttributes?: Record<string, string>;
    aria?: Record<string, string>;
    role?: string;
    lang?: string;
    dir?: "rtl" | "ltr" | "auto";
    button_background_color?: string; // Add prop for custom button bg
  };

  // --- Prop Defaults & Processing ---
  let {
    value = $bindable(""), // Make value bindable
    label_text = "Search on GOV.UK",
    label_id = undefined,
    inline_label = undefined, // Default depends on label_size
    hint = undefined, // Add hint default
    on_govuk_blue = false,
    homepage = false,
    size = "",
    name = "q",
    aria_controls = undefined,
    button_text = "Search",
    label_size = null,
    wrap_label_in_a_heading = false,
    heading_level = 2,
    margin_bottom = 6, // Matching default in Ruby template
    label_margin_bottom = undefined,
    label_custom_class = undefined,
    disable_corrections = false,
    input_width = null, // Add default for input_width
    id = undefined,
    classes = "",
    dataAttributes = {},
    aria = {},
    role = undefined,
    lang = undefined,
    dir = undefined,
    button_background_color = undefined, // Add default
  }: Props = $props();

  // Generate default ID if none provided (only in browser)
  const defaultId = $derived(
    label_id ||
      (browser
        ? `search-main-${crypto.randomUUID().slice(0, 8)}`
        : "search-main-ssr"),
  );

  // Determine if label should be inline
  // If label_size is set, force isInlineLabel = false
  // Otherwise, respect inline_label if set to false, default to true
  const isInlineLabel = $derived(
    label_size
      ? false // If label_size is set, it's NOT inline
      : inline_label === false
        ? false // If no size, but explicitly set to false, it's NOT inline
        : true, // Otherwise (no size, inline_label is true or undefined), it IS inline
  );

  // --- Derived Classes & Attributes ---
  const correctionValue = $derived(disable_corrections ? "off" : undefined);

  const wrapperClasses = $derived(
    clsx(
      "gem-c-search",
      "govuk-!-display-none-print",
      input_width && `govuk-!-width-${input_width}`, // Apply width class to the wrapper
      `govuk-!-margin-bottom-${margin_bottom}`,
      size === "large" && "gem-c-search--large",
      homepage && "gem-c-search--homepage",
      on_govuk_blue || homepage
        ? "gem-c-search--on-govuk-blue"
        : "gem-c-search--on-white",
      !isInlineLabel && "gem-c-search--separate-label",
      classes,
    ),
  );

  const derivedLabelClasses = $derived(
    clsx(
      label_custom_class
        ? label_custom_class // If custom class, use it...
        : [
            // Otherwise calculate standard classes:
            isInlineLabel ? "gem-c-search__label" : "govuk-label", // Base class depends on inline status
            !isInlineLabel && label_size ? `govuk-label--${label_size}` : null, // Size modifier only if separate and size set
            (!isInlineLabel && on_govuk_blue) || homepage
              ? "gem-c-search__label--white"
              : null, // White text only if separate and on blue
          ],
      // Margin applies if NOT inline, regardless of custom class
      !isInlineLabel &&
        label_margin_bottom !== undefined &&
        label_margin_bottom >= 0 &&
        label_margin_bottom <= 9 &&
        `govuk-!-margin-bottom-${label_margin_bottom}`,
    ),
  );

  const inputClasses = $derived(
    clsx(
      "gem-c-search__item",
      "gem-c-search__input",
      "js-class-toggle", // Assumed for JS interaction, kept from Ruby template
    ),
  );

  const buttonClasses = $derived(clsx("gem-c-search__submit"));

  const wrapperDataAttrs = $derived({
    module: "gem-toggle-input-class-on-focus", // Kept from Ruby template
    ...dataAttributes,
  });

  // --- Render Logic ---
  // Define Tag based on heading_level
  const Tag = $derived(`h${heading_level}`);
</script>

{#snippet LabelContent()}
  <label for={defaultId} class={derivedLabelClasses}>
    {@html sanitize(label_text)}
  </label>
{/snippet}

<div
  class={wrapperClasses}
  {id}
  data-module={wrapperDataAttrs.module}
  {...aria}
  {...dataAttributes}
  {role}
  {lang}
  {dir}
>
  {#if wrap_label_in_a_heading}
    <svelte:element this={Tag} class="govuk-!-margin-0">
      {@render LabelContent()}
    </svelte:element>
  {:else}
    {@render LabelContent()}
  {/if}

  {#if hint && !isInlineLabel && !(homepage || on_govuk_blue)}
    <div id="{defaultId}-hint" class="govuk-hint">
      {hint}
    </div>
  {/if}

  <div class="gem-c-search__item-wrapper">
    <div class="js-search-input-wrapper">
      <input
        aria-controls={aria_controls}
        enterkeyhint="search"
        class={inputClasses}
        id={defaultId}
        {name}
        title="Search"
        type="search"
        placeholder={hint && !isInlineLabel && (homepage || on_govuk_blue)
          ? hint
          : undefined}
        bind:value
        aria-describedby={hint
          ? `${defaultId}-hint`
          : label_text
            ? `${defaultId}-label`
            : undefined}
        autocorrect={correctionValue}
        autocapitalize={correctionValue}
        style={`--cancel-icon: url("${closeIconUrl}")`}
      />
    </div>
    <div class="gem-c-search__item gem-c-search__submit-wrapper">
      <button
        class={buttonClasses}
        type="submit"
        enterkeyhint="search"
        style={button_background_color && !on_govuk_blue && !homepage
          ? `background-color: ${button_background_color};`
          : undefined}
      >
        <span class="govuk-visually-hidden">{button_text}</span>
        <IconSearch class="gem-c-search__icon" />
      </button>
    </div>
  </div>
</div>

<style>
  .gem-c-search {
    position: relative;
  }

  .gem-c-search__label {
    display: block;
    color: #0b0c0c;
    cursor: text;
    text-overflow: ellipsis;
    height: 90%;
    overflow: hidden;
    white-space: nowrap;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 2.1052631579;
  }

  @media print {
    .gem-c-search__label {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-search__label {
      font-size: 14pt;
      line-height: 40px;
    }
  }

  .gem-c-search__label h1 {
    margin: 0;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 2.1052631579;
  }

  @media print {
    .gem-c-search__label h1 {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-search__label h1 {
      font-size: 14pt;
      line-height: 40px;
    }
  }

  /* Apply :global() to the external .govuk-frontend-supported class as it's not scoped to the component */
  :global(.govuk-frontend-supported) .gem-c-search__label {
    position: absolute;
    left: 2px;
    top: 2px;
    bottom: 2px;
    max-width: 68%;
    padding-left: 15px;
    z-index: 1;
    color: #505a5f;
    background: #fff;
  }

  /* Apply :global() to the external .govuk-frontend-supported class as it's not scoped to the component */
  :global(.govuk-frontend-supported)
    .gem-c-search--separate-label
    .gem-c-search__label {
    color: #0b0c0c;
  }

  /* REMOVED :global() - Restore original scoped rule */
  .gem-c-search__input[type="search"] {
    margin: 0;
    width: 100%;
    height: 2.1052631579em;
    padding: 0.3157894737em;
    border: 2px solid #0b0c0c;
    background: #fff;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 1.4736842105;
  }

  @media print {
    .gem-c-search__input[type="search"] {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-search__input[type="search"] {
      font-size: 14pt;
      line-height: 1.4736842105;
    }
  }

  .gem-c-search__input[type="search"]:focus,
  .gem-c-search__input[type="search"].focus {
    z-index: 2;
  }

  .gem-c-search__input[type="search"]:focus {
    outline: 3px solid #fd0;
    outline-offset: 0;
    box-shadow: inset 0 0 0 2px;
  }

  .gem-c-search__input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    background-image: var(--cancel-icon);
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    height: 20px;
    margin-left: 0;
    margin-right: 0;
    width: 20px;
  }

  .gem-c-search__submit {
    border: 0;
    cursor: pointer;
    border-radius: 0;
    outline: 2px solid rgba(0, 0, 0, 0);
    outline-offset: 0;
    position: relative;
    padding: 0;
    width: 40px;
    height: 40px;
    text-indent: -5000px;
    overflow: hidden;
  }

  .gem-c-search__submit:focus {
    z-index: 2;
    outline: 3px solid #fd0;
    box-shadow: inset 0 0 0 4px #0b0c0c;
  }

  .gem-c-search__submit::-moz-focus-inner {
    border: 0;
  }

  .gem-c-search__item-wrapper {
    display: table;
    width: 100%;
    background: #fff;
    /* Override inherited line-height from global styles (currently from govuk-frontend) */
    /* that can cause incorrect height calculation in table display which was causing the wrapper to be too tall */
    line-height: 0;
  }

  .gem-c-search__item {
    position: relative;
    display: table-cell;
    vertical-align: top;
  }

  .gem-c-search__submit-wrapper {
    width: 1%;
  }

  .gem-c-search--on-govuk-blue .gem-c-search__label {
    color: #fff;
  }

  .gem-c-search--on-govuk-blue .gem-c-search__input {
    border-width: 0;
    outline: 2px solid rgba(0, 0, 0, 0);
    outline-offset: 0;
  }

  .gem-c-search--on-govuk-blue .gem-c-search__input:focus {
    outline: 3px solid #fd0;
    outline-offset: 0;
    box-shadow: inset 0 0 0 2px;
    box-shadow: inset 0 0 0 4px;
  }

  .gem-c-search--on-govuk-blue .gem-c-search__submit {
    background-color: #0b0c0c;
    color: #fff;
  }

  .gem-c-search--on-govuk-blue .gem-c-search__submit:hover {
    background-color: hsl(180, 4.347826087%, 9.5098039216%);
  }

  :global(.govuk-frontend-supported)
    .gem-c-search--on-govuk-blue
    .gem-c-search__label {
    color: #505a5f;
  }

  .gem-c-search--homepage .gem-c-search__submit {
    background-color: #d2e2f1;
    color: #1d70b8;
  }

  .gem-c-search--homepage .gem-c-search__submit:hover {
    background-color: hsl(209.0322580645, 52.5423728814%, 93.431372549%);
  }

  .gem-c-search--on-white .gem-c-search__submit {
    background-color: #1d70b8;
    color: #fff;
  }

  .gem-c-search--on-white .gem-c-search__submit:hover {
    background-color: rgb(32.4718309859, 125.4084507042, 206.0281690141);
  }

  .gem-c-search--on-white .gem-c-search__input[type="search"] {
    border-right-width: 0;
  }

  .gem-c-search--on-white .gem-c-search__input[type="search"]:focus {
    border-right-width: 2px;
  }

  .govuk-label.gem-c-search__label--white {
    color: #fff;
  }

  .gem-c-search--large .gem-c-search__label {
    font-family: "GDS Transport", arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    font-size: 1.1875rem;
    line-height: 2.6315789474;
  }

  @media print {
    .gem-c-search--large .gem-c-search__label {
      font-family: sans-serif;
    }
  }

  @media print {
    .gem-c-search--large .gem-c-search__label {
      font-size: 14pt;
      line-height: 50px;
    }
  }

  .gem-c-search--large .gem-c-search__input[type="search"] {
    height: 50px;
  }

  .gem-c-search--large .gem-c-search__submit {
    width: 50px;
    height: 50px;
  }

  .gem-c-search--large .gem-c-search__submit .gem-c-search__icon {
    transform: scale(0.4);
  }

  .gem-c-search--separate-label .gem-c-search__label {
    position: relative;
    top: auto;
    left: auto;
    padding-left: 0;
  }
</style>
