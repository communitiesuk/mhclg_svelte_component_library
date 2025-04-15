<script lang="ts">
  import { clsx as cx } from "clsx";

  type SelectItem = {
    value: string | number;
    text: string;
    selected?: boolean;
    disabled?: boolean;
  };

  let {
    // Core attributes
    id = "select-1", // Default ID if not provided
    name,
    items = [] as SelectItem[], // Use simple default array
    value: valueProp = undefined, // Rename prop to avoid conflict with bind:value if needed, use simple undefined default

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

  let value = $state(valueProp); // Initialize local state with prop value

  $effect(() => {
    value = valueProp;
  });

  let describedByIds = describedBy;
  if (!describedByIds) {
    const ids: string[] = [];
    if (hint) ids.push(`${id}-hint`);
    if (errorMessage && error) ids.push(`${id}-error`);
    describedByIds = ids.join(" ");
  }

  // Initialize value based on selected item if value is not initially provided via prop
  if (value === undefined) {
    const selectedItem = items.find((item) => item.selected);
    if (selectedItem) {
      value = selectedItem.value;
    } else if (
      items.length > 0 &&
      !items.some((item) => item.disabled && item.selected !== false)
    ) {
      const firstEnabledItem = items.find((item) => !item.disabled);
      if (firstEnabledItem) {
        value = firstEnabledItem.value;
      }
    }
  }
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
    aria-describedby={describedByIds || undefined}
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
  /* Ensure GOV.UK Frontend styles are imported globally or via a layout component */
</style>
