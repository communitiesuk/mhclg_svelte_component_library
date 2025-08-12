<script lang="ts">
  import { clsx as cx } from "clsx";

  export type SelectItem = {
    value: string | number;
    text: string;
    disabled?: boolean;
  };

  export type SelectGroup = {
    label: string;
    disabled?: boolean;
    choices: SelectItem[];
  };

  let {
    // Core attributes
    id,
    name,
    items = [],
    groups = [],
    value = $bindable<(string | number)[] | string | number | undefined>(),
    multiple = false,

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
    disabled = false, // Add disabled support
    
    // Expose select element reference
    selectElement = $bindable<HTMLSelectElement | undefined>(),
    
    ...attributes // Allow passing additional HTML attributes to the select element
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
    formGroupClasses?: string;
    fullWidth?: boolean;
    describedBy?: string;
    disabled?: boolean;
    selectElement?: HTMLSelectElement | undefined;
  } & Omit<
    import("svelte/elements").HTMLSelectAttributes,
    "id" | "name" | "value" | "class" | "aria-describedby" | "multiple" | "disabled"
  > = $props();

  // Client-side validation result
  const validationError = $derived(validate ? validate(value) : undefined);

  // Generate all items including groups
  const allSelectItems = $derived(() => {
    const result: (SelectItem | SelectGroup)[] = [];
    result.push(...items);
    result.push(...groups);
    return result;
  });

  // Computed classes for select element (shared between both versions)
  const selectClasses = $derived(cx(
    "govuk-select",
    (validationError || error) && "govuk-select--error",
    fullWidth && "govuk-!-width-full",
  ));

  // Computed aria-describedby (shared between both versions)
  const computedAriaDescribedBy = $derived(
    describedBy ||
    [
      hint ? `${id}-hint` : null,
      validationError || error ? `${id}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") ||
    undefined
  );
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
    <p id="{id}-error" class="govuk-error-message">
      <span class="govuk-visually-hidden">Error:</span>
      {validationError || error}
    </p>
  {/if}

  {#if multiple}
    <select
      bind:this={selectElement}
      class={selectClasses}
      {id}
      {name}
      multiple
      {disabled}
      bind:value
      aria-describedby={computedAriaDescribedBy}
      {...attributes}
    >
      {#each allSelectItems() as item}
        {#if "choices" in item}
          <optgroup
            label={(item as SelectGroup).label}
            disabled={(item as SelectGroup).disabled}
          >
            {#each (item as SelectGroup).choices as choice}
              <option value={choice.value} disabled={choice.disabled}>
                {choice.text}
              </option>
            {/each}
          </optgroup>
        {:else}
          <option value={(item as SelectItem).value} disabled={(item as SelectItem).disabled}>
            {(item as SelectItem).text}
          </option>
        {/if}
      {/each}
    </select>
  {:else}
    <select
      bind:this={selectElement}
      class={selectClasses}
      {id}
      {name}
      {disabled}
      bind:value
      aria-describedby={computedAriaDescribedBy}
      {...attributes}
    >
      {#each allSelectItems() as item}
        {#if "choices" in item}
          <optgroup
            label={(item as SelectGroup).label}
            disabled={(item as SelectGroup).disabled}
          >
            {#each (item as SelectGroup).choices as choice}
              <option value={choice.value} disabled={choice.disabled}>
                {choice.text}
              </option>
            {/each}
          </optgroup>
        {:else}
          <option value={(item as SelectItem).value} disabled={(item as SelectItem).disabled}>
            {(item as SelectItem).text}
          </option>
        {/if}
      {/each}
    </select>
  {/if}
</div>

<style>
</style>
