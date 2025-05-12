<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface FieldsetLegend {
    text?: string;
    isPageHeading?: boolean;
    classes?: string;
  }

  interface Fieldset {
    legend?: FieldsetLegend;
    role?: string;
    describedBy?: string; // Will be automatically generated if not provided
    classes?: string;
    attributes?: Record<string, unknown>;
  }

  interface Hint {
    text?: string;
    id?: string; // Will be automatically generated if not provided
    classes?: string;
    attributes?: Record<string, unknown>;
  }

  interface DateInputItem extends Omit<HTMLInputAttributes, "value"> {
    id?: string; // Will be automatically generated if not provided
    name: string; // e.g., 'day', 'month', 'year'
    label?: string;
    value?: string | number | undefined; // Make value optional
    classes?: string; // Classes for the input element itself
    itemClasses?: string; // Classes for the govuk-date-input__item container
    inputmode?: HTMLInputAttributes["inputmode"]; // Use stricter type
    autocomplete?: HTMLInputAttributes["autocomplete"]; // Use stricter type
    pattern?: string; // e.g., '[0-9]*'
    attributes?: Record<string, unknown>; // Attributes for the input element
    hasError?: boolean; // Flag to indicate if this specific input has an error
  }

  interface FormGroup {
    classes?: string;
    attributes?: Record<string, unknown>;
  }

  // --- Component Props ---
  let {
    id, // Required: Base ID for the component and its parts
    namePrefix = "", // Optional prefix for input names
    items = [], // Required: Array for day, month, year inputs
    fieldset = {} as Fieldset,
    hint = {} as Hint,
    errorMessage = undefined as string | undefined | null, // Changed type to string | undefined | null
    formGroup = {} as FormGroup,
    classes = "", // Classes for the main govuk-date-input container
    attributes = {} as Record<string, unknown>,
    legendSize, // Destructure without default
    dayValue = $bindable<string | number | undefined>(undefined),
    monthValue = $bindable<string | number | undefined>(undefined),
    yearValue = $bindable<string | number | undefined>(undefined),
    // Client-side validation function
    validate = undefined as
      | ((values: {
          day?: string | number | undefined;
          month?: string | number | undefined;
          year?: string | number | undefined;
        }) => string | undefined)
      | undefined,
  }: {
    id: string;
    namePrefix?: string;
    items: DateInputItem[];
    fieldset?: Fieldset;
    hint?: Hint;
    errorMessage?: string | undefined | null; // Changed type here as well
    formGroup?: FormGroup;
    classes?: string;
    attributes?: Record<string, unknown>;
    legendSize?: "l" | "m" | "s" | undefined; // Type is optional
    dayValue?: string | number | undefined;
    monthValue?: string | number | undefined;
    yearValue?: string | number | undefined;
    validate?: (values: {
      day?: string | number | undefined;
      month?: string | number | undefined;
      year?: string | number | undefined;
    }) => string | undefined; // Added validate prop type
  } = $props();

  // console.log(`DateInput (${id}): received legendSize =`, legendSize); // Remove console.log

  // --- Derived State ---
  // Server/manual error check
  let serverErrorPresent = $derived(
    typeof errorMessage === "string" && errorMessage.trim() !== "",
  );
  // Client-side validation
  let validationError = $derived(
    validate
      ? validate({ day: dayValue, month: monthValue, year: yearValue })
      : undefined,
  );
  // Combined error state
  let hasAnyError = $derived(!!validationError || serverErrorPresent);
  let displayedError = $derived(validationError ?? errorMessage); // Prioritize client error

  // Use optional chaining and nullish coalescing (??)
  let hintId = $derived(hint?.id ?? (hint?.text ? `${id}-hint` : undefined));
  // Update errorId derivation based on combined state
  let errorId = $derived(hasAnyError ? `${id}-error` : undefined);

  // Use optional chaining
  let describedBy = $derived(
    fieldset?.describedBy ?? // Check fieldset first
      ([hintId, errorId].filter(Boolean).join(" ") || undefined),
  );

  function getItemName(item: DateInputItem): string {
    return namePrefix ? `${namePrefix}[${item.name}]` : item.name;
  }

  function getItemId(item: DateInputItem): string {
    return item?.id || `${id}-${item.name}`;
  }
</script>

<div
  class="govuk-form-group {formGroup?.classes ?? ''} {hasAnyError
    ? 'govuk-form-group--error'
    : ''}"
  {...formGroup?.attributes}
>
  <fieldset
    class="govuk-fieldset {fieldset?.classes ?? ''}"
    role={fieldset?.role ?? "group"}
    aria-describedby={describedBy}
    {...fieldset?.attributes}
  >
    {#if fieldset?.legend}
      <legend
        class="govuk-fieldset__legend {fieldset.legend.classes ??
          ''} {legendSize ? `govuk-fieldset__legend--${legendSize}` : ''}"
      >
        {#if fieldset.legend.isPageHeading}
          <h1 class="govuk-fieldset__heading">
            {fieldset.legend.text}
          </h1>
        {:else}
          {fieldset.legend.text}
        {/if}
      </legend>
    {/if}

    {#if hint?.text}
      <div
        id={hintId}
        class="govuk-hint {hint.classes ?? ''}"
        {...hint.attributes}
      >
        {hint.text}
      </div>
    {/if}

    {#if hasAnyError}
      <p id={errorId} class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {displayedError}
      </p>
    {/if}

    <div class="govuk-date-input {classes}" {id} {...attributes}>
      {#each items as item (item.name)}
        {@const inputId = getItemId(item)}
        {@const inputName = getItemName(item)}

        {@const handleInput = (event: Event) => {
          const target = event.target as HTMLInputElement;
          const newValue = target.value;
          if (item.name === "day") {
            dayValue = newValue;
          } else if (item.name === "month") {
            monthValue = newValue;
          } else if (item.name === "year") {
            yearValue = newValue;
          }
        }}

        {@const getCurrentValue = () => {
          switch (item.name) {
            case "day":
              return dayValue;
            case "month":
              return monthValue;
            case "year":
              return yearValue;
            default:
              return item.value; // Fallback to item.value if provided and no bindable prop matches
          }
        }}

        {@const inputClasses = (() => {
          let classList = ["govuk-input", "govuk-date-input__input"];
          const providedClasses = item.classes || "";

          // Check if a specific width is provided via item.classes
          if (!providedClasses.includes("govuk-input--width-")) {
            // Apply default width if none is provided
            if (item.name === "year") {
              classList.push("govuk-input--width-4");
            } else if (item.name === "day" || item.name === "month") {
              classList.push("govuk-input--width-2");
            }
          }

          // Add provided classes (they might override defaults or add others)
          if (providedClasses) {
            classList.push(providedClasses);
          }

          // Add error class conditionally (based on server error + item flag)
          if (serverErrorPresent && item.hasError) {
            classList.push("govuk-input--error");
          }

          // Join classes, removing potential duplicate spaces
          return classList.join(" ").trim().replace(/\s+/g, " ");
        })()}

        <div class="govuk-date-input__item {item.itemClasses || ''}">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label" for={inputId}>
              {item.label ||
                item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </label>
            <input
              class={inputClasses}
              id={inputId}
              name={inputName}
              type={item.type || "text"}
              value={getCurrentValue()}
              oninput={handleInput}
              inputmode={item.inputmode || "numeric"}
              autocomplete={item.autocomplete}
              pattern={item.pattern || "[0-9]*"}
              {...item.attributes}
              aria-describedby={hasAnyError ? errorId : undefined}
            />
          </div>
        </div>
      {/each}
    </div>
  </fieldset>
</div>

<style>
</style>
