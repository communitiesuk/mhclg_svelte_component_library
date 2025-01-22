<script lang="ts">
  import type { SvelteComponent } from "svelte";

  // Define the CheckboxOption type
  export type CheckboxOption = {
    value: string;
    label: string;
    hint?: string;
    exclusive?: boolean;
    conditional?: {
      id: string;
      content: string | typeof SvelteComponent;
    };
  };

  // Component props
  const {
    legend,
    hint,
    error,
    name,
    isPageHeading = false,
    legendSize = "l",
    small = false,
    options = [],
    validate = undefined,
  } = $props<{
    legend: string;
    hint?: string;
    error?: string;
    name: string;
    isPageHeading?: boolean;
    legendSize?: "l" | "m" | "s";
    small?: boolean;
    options?: CheckboxOption[];
    validate?: (values: string[]) => string | undefined;
  }>();

  // Component state
  let selectedValues = $state<string[]>([]);

  // Derived state to check if a value is selected and handle validation
  let isChecked = $derived((value: string) => selectedValues.includes(value));
  let validationError = $derived(
    validate ? validate(selectedValues) : undefined,
  );

  // Function to toggle checkbox selection
  function toggleCheckbox(option: CheckboxOption) {
    if (option.exclusive) {
      selectedValues = selectedValues.includes(option.value)
        ? []
        : [option.value];
    } else {
      selectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter((v) => v !== option.value)
        : [
            ...selectedValues.filter(
              (v) => !options.find((o) => o.value === v && o.exclusive),
            ),
            option.value,
          ];
    }
  }
</script>

<div
  class="govuk-form-group{validationError || error
    ? ' govuk-form-group--error'
    : ''}"
>
  <fieldset
    class="govuk-fieldset"
    aria-describedby={hint ? `${name}-hint` : null}
  >
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--{legendSize}">
      {#if isPageHeading}
        <h1 class="govuk-fieldset__heading">{legend}</h1>
      {:else}
        {legend}
      {/if}
    </legend>

    {#if hint}
      <div id="{name}-hint" class="govuk-hint">{hint}</div>
    {/if}

    {#if validationError || error}
      <p id="{name}-error" class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {validationError || error}
      </p>
    {/if}

    <div
      class="govuk-checkboxes{small ? ' govuk-checkboxes--small' : ''}"
      data-module="govuk-checkboxes"
    >
      {#each options as option, i}
        {#if option.exclusive && i > 0}
          <div class="govuk-checkboxes__divider">or</div>
        {/if}

        <div class="govuk-checkboxes__item">
          <input
            type="checkbox"
            {name}
            id="{name}-{i}"
            class="govuk-checkboxes__input"
            value={option.value}
            aria-controls={option.conditional?.id}
            aria-expanded={isChecked(option.value)}
            aria-describedby={option.hint ? `${name}-${i}-hint` : null}
            checked={isChecked(option.value)}
            onchange={() => toggleCheckbox(option)}
          />
          <label class="govuk-label govuk-checkboxes__label" for="{name}-{i}">
            {option.label}
          </label>

          {#if option.hint}
            <div id="{name}-{i}-hint" class="govuk-hint govuk-checkboxes__hint">
              {option.hint}
            </div>
          {/if}
        </div>

        {#if option.conditional}
          <div
            id={option.conditional.id}
            class="govuk-checkboxes__conditional{isChecked(option.value)
              ? ''
              : ' govuk-checkboxes__conditional--hidden'}"
          >
            {#if typeof option.conditional.content === "string"}
              {@html option.conditional.content}
            {:else}
              <option.conditional.content />
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </fieldset>
</div>
