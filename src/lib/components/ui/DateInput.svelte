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

  interface ErrorMessage {
    text?: string;
    html?: string;
    id?: string; // Will be automatically generated if not provided
    visuallyHiddenText?: string;
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
    errorMessage = {} as ErrorMessage,
    formGroup = {} as FormGroup,
    classes = "", // Classes for the main govuk-date-input container
    attributes = {} as Record<string, unknown>,
  }: {
    id: string;
    namePrefix?: string;
    items: DateInputItem[];
    fieldset?: Fieldset;
    hint?: Hint;
    errorMessage?: ErrorMessage;
    formGroup?: FormGroup;
    classes?: string;
    attributes?: Record<string, unknown>;
  } = $props();

  // --- Derived State ---
  let hasError = $derived(
    errorMessage && (errorMessage.text || errorMessage.html),
  );
  let hintId = $derived(
    hint.id || (hint.text || hint.html ? `${id}-hint` : undefined),
  );
  let errorId = $derived(
    errorMessage.id || (hasError ? `${id}-error` : undefined),
  );

  let describedBy = $derived(
    fieldset?.describedBy ||
      [hintId, errorId].filter(Boolean).join(" ") ||
      undefined,
  );

  function getItemName(item: DateInputItem): string {
    return namePrefix ? `${namePrefix}-${item.name}` : item.name;
  }

  function getItemId(item: DateInputItem): string {
    return item.id || `${id}-${item.name}`;
  }
</script>

<div
  class="govuk-form-group {formGroup.classes || ''} {hasError
    ? 'govuk-form-group--error'
    : ''}"
  {...formGroup.attributes}
>
  <fieldset
    class="govuk-fieldset {fieldset.classes || ''}"
    role={fieldset.role || "group"}
    aria-describedby={describedBy}
    {...fieldset.attributes}
  >
    {#if fieldset.legend}
      <legend
        class="govuk-fieldset__legend {fieldset.legend.classes || ''} {fieldset
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

    {#if hint.text || hint.html}
      <div
        id={hintId}
        class="govuk-hint {hint.classes || ''}"
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
      <p
        id={errorId}
        class="govuk-error-message {errorMessage.classes || ''}"
        {...errorMessage.attributes}
      >
        <span class="govuk-visually-hidden"
          >{errorMessage.visuallyHiddenText || "Error:"}</span
        >
        {#if errorMessage.html}
          {@html errorMessage.html}
        {:else}
          {errorMessage.text}
        {/if}
      </p>
    {/if}

    <div class="govuk-date-input {classes}" {id} {...attributes}>
      {#each items as item (item.name)}
        {@const inputId = getItemId(item)}
        {@const inputName = getItemName(item)}
        <div class="govuk-date-input__item {item.itemClasses || ''}">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label" for={inputId}>
              {item.label ||
                item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </label>
            <input
              class="govuk-input govuk-date-input__input {item.classes ||
                ''} {hasError && item.hasError ? 'govuk-input--error' : ''}"
              id={inputId}
              name={inputName}
              type={item.type || "text"}
              bind:value={item.value}
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
