<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface FieldsetLegend {
    text?: string;
    html?: string;
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
    html?: string;
    id?: string; // Will be automatically generated if not provided
    classes?: string;
    attributes?: Record<string, unknown>;
  }

  interface DateInputItem extends Omit<HTMLInputAttributes, "value"> {
    id?: string; // Will be automatically generated if not provided
    name: string; // e.g., 'day', 'month', 'year'
    label?: string;
    value?: string | number;
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
  } = $props();

  // --- Derived State ---
  // Update hasError derivation for string type
  let hasError = $derived(
    typeof errorMessage === "string" && errorMessage.trim() !== "",
  );
  // Use optional chaining and nullish coalescing (??)
  let hintId = $derived(
    hint?.id ?? (hint?.text || hint?.html ? `${id}-hint` : undefined),
  );
  // Update errorId derivation
  let errorId = $derived(hasError ? `${id}-error` : undefined);

  // Use optional chaining
  let describedBy = $derived(
    fieldset?.describedBy ?? // Check fieldset first
      ([hintId, errorId].filter(Boolean).join(" ") || undefined),
  );

  function getItemName(item: DateInputItem): string {
    return namePrefix ? `${namePrefix}-${item.name}` : item.name;
  }

  function getItemId(item: DateInputItem): string {
    return item?.id || `${id}-${item.name}`;
  }
</script>

<div
  class="govuk-form-group {formGroup?.classes ?? ''} {hasError
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
        class="govuk-fieldset__legend {fieldset.legend.classes ?? ''} {fieldset
          .legend.isPageHeading
          ? 'govuk-fieldset__legend--xl' // Example, adjust as needed based on design system specs for heading size
          : ''}"
      >
        {#if fieldset.legend.isPageHeading}
          <h1 class="govuk-fieldset__heading">
            {#if fieldset.legend.html}
              {@html fieldset.legend.html}
            {:else}
              {fieldset.legend.text}
            {/if}
          </h1>
        {:else if fieldset.legend.html}
          {@html fieldset.legend.html}
        {:else}
          {fieldset.legend.text}
        {/if}
      </legend>
    {/if}

    {#if hint?.text || hint?.html}
      <div
        id={hintId}
        class="govuk-hint {hint.classes ?? ''}"
        {...hint.attributes}
      >
        {#if hint.html}
          {@html hint.html}
        {:else}
          {hint.text}
        {/if}
      </div>
    {/if}

    {#if hasError}
      <p id={errorId} class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {errorMessage}
      </p>
    {/if}

    <div class="govuk-date-input {classes}" {id} {...attributes}>
      {#each items as item (item.name)}
        {@const inputId = getItemId(item)}
        {@const inputName = getItemName(item)}
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

          // Add error class conditionally
          if (hasError && item.hasError) {
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
              value={item.value}
              inputmode={item.inputmode || "numeric"}
              autocomplete={item.autocomplete}
              pattern={item.pattern || "[0-9]*"}
              {...item.attributes}
              aria-describedby={hasError && item.hasError ? errorId : undefined}
            />
          </div>
        </div>
      {/each}
    </div>
  </fieldset>
</div>

<style>
  /* Ensure styles are loaded from govuk-frontend or similar */
  /* No component-specific styles needed if using the design system's CSS */
</style>
