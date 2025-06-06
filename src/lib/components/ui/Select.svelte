<script lang="ts">
  import { clsx as cx } from "clsx";

  type SelectItem = {
    value: string | number;
    text: string;
    disabled?: boolean;
  };

  let {
    // Core attributes
    id,
    name,
    items,
    value = $bindable<string | number | undefined>(), // Use bindable value

    // Label and hints
    label,
    labelIsPageHeading = false,
    hint = undefined,

    // Error handling
    error = undefined, // serverside error message
    validate = undefined, // Client-side validation function

    // Styling and layout
    formGroupClasses = "", // Additional classes for the form group wrapper
    fullWidth = false, // If true, applies full width style
    describedBy = "", // Optional override for aria-describedby
    ...attributes // Allow passing additional HTML attributes to the select element
  }: {
    id: string;
    name: string;
    items: SelectItem[];
    value?: string | number | undefined;
    label: string;
    labelIsPageHeading?: boolean;
    hint?: string;
    error?: string; // Changed back from serverErrorMessage
    validate?: (value: string | number | undefined) => string | undefined;
    formGroupClasses?: string;
    fullWidth?: boolean;
    describedBy?: string;
  } & Omit<
    import("svelte/elements").HTMLSelectAttributes,
    "id" | "name" | "value" | "class" | "aria-describedby"
  > = $props();

  // Client-side validation result
  let validationError = $derived(validate ? validate(value) : undefined);
</script>

<div
  class={cx(
    "govuk-form-group",
    (validationError || error) && "govuk-form-group--error", // Check both validation and server error
    formGroupClasses,
  )}
>
  {#if labelIsPageHeading}
    <h1 class="govuk-label-wrapper">
      <label class="govuk-label govuk-label--l" for={id}>
        {label}
      </label>
    </h1>
  {:else}
    <label class="govuk-label" for={id}>
      {label}
    </label>
  {/if}

  {#if hint}
    <div id="{id}-hint" class="govuk-hint">
      {hint}
    </div>
  {/if}

  {#if validationError || error}
    <!-- Check both validation and server error -->
    <p id="{id}-error" class="govuk-error-message">
      <span class="govuk-visually-hidden">Error:</span>
      {validationError || error}
      <!-- Display whichever error exists (client first) -->
    </p>
  {/if}

  <select
    class={cx(
      "govuk-select",
      (validationError || error) && "govuk-select--error", // Check both validation and server error
      fullWidth && "govuk-!-width-full",
    )}
    {id}
    {name}
    bind:value
    aria-describedby={// Recompute directly here based on new logic
    describedBy ||
      [
        hint ? `${id}-hint` : null,
        validationError || error ? `${id}-error` : null,
      ]
        .filter(Boolean)
        .join(" ") ||
      undefined}
    {...attributes}
  >
    {#each items as item (item.value)}
      <option value={item.value} disabled={item.disabled}>
        {item.text}
      </option>
    {/each}
  </select>
</div>

<style>
</style>
