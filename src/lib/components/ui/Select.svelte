<script lang="ts">
  import { clsx as cx } from "clsx";

  type SelectItem = {
    value: string | number;
    text: string;
    disabled?: boolean;
  };

  let {
    // Core attributes
    id = "select-1", // Default ID if not provided
    name,
    items = [] as SelectItem[], // Use simple default array
    value = $bindable(), // Use $bindable() for the value prop

    // Label and hints
    label,
    labelIsPageHeading = false, // If true, label is wrapped in H1 and gets larger style
    hint = undefined, // Optional hint text

    // Error handling
    errorMessage = undefined, // Optional error message
    error = false, // If true, applies error styles

    // Styling and layout
    formGroupClasses = "", // Additional classes for the form group wrapper
    fullWidth = false, // If true, applies full width style
    describedBy = "", // Optional override for aria-describedby
    ...attributes // Allow passing additional HTML attributes to the select element
  }: {
    id?: string;
    name: string;
    items?: SelectItem[];
    value?: string | number | undefined;
    label: string;
    labelIsPageHeading?: boolean;
    hint?: string;
    errorMessage?: string;
    error?: boolean;
    formGroupClasses?: string;
    fullWidth?: boolean;
    describedBy?: string;
  } & Omit<
    import("svelte/elements").HTMLSelectAttributes,
    "id" | "name" | "value" | "class" | "aria-describedby"
  > = $props();

  // Calculate aria-describedby based on props
  let describedByIds = $derived(() => {
    if (describedBy) {
      // Use the explicitly provided prop value if it exists
      return describedBy;
    }
    // Otherwise, construct it based on hint and error message presence
    const ids: string[] = [];
    if (hint) ids.push(`${id}-hint`);
    if (errorMessage && error) ids.push(`${id}-error`);
    const generated = ids.join(" ");
    return generated ? generated : undefined; // Return undefined if no ids, avoids empty aria-describedby
  });
</script>

<div
  class={cx(
    "govuk-form-group",
    error && "govuk-form-group--error",
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

  {#if errorMessage && error}
    <p id="{id}-error" class="govuk-error-message">
      <span class="govuk-visually-hidden">Error:</span>
      {errorMessage}
    </p>
  {/if}

  <select
    class={cx(
      "govuk-select",
      error && "govuk-select--error",
      fullWidth && "govuk-!-width-full",
    )}
    {id}
    {name}
    bind:value
    aria-describedby={describedByIds}
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
