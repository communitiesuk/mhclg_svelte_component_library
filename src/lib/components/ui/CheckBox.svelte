<script lang="ts">
  import type { SvelteComponent, Snippet } from "svelte";
  import { onMount } from "svelte";
  // Define the CheckboxOption type
  export type CheckboxOption = {
    value: string;
    label: string;
    hint?: string;
    exclusive?: boolean;
    conditional?: {
      id: string;
      content: string | typeof SvelteComponent | Snippet;
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

  // Add support detection
  let isSupported = $state(false);
  // Check for browser support on mount
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  // Derived state to check if a value is selected and handle validation
  let isChecked = $derived((value: string) => selectedValues.includes(value));
  let validationError = $derived<string | undefined>(
    isSupported && validate ? validate(selectedValues) : undefined,
  );

  // Modify toggleCheckbox to handle non-JS scenarios
  function toggleCheckbox(option: CheckboxOption) {
    // If JS/modern features aren't supported, let the native checkbox behavior work
    if (!isSupported) return;

    if (option.exclusive) {
      selectedValues = selectedValues.includes(option.value)
        ? []
        : [option.value];
    } else {
      selectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter((v: string) => v !== option.value)
        : [
            ...selectedValues.filter(
              (v: string) => !options.find((o) => o.value === v && o.exclusive),
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
  role="group"
  aria-labelledby="{name}-legend"
>
  <fieldset
    class="govuk-fieldset"
    aria-describedby={[
      hint ? `${name}-hint` : null,
      error || validationError ? `${name}-error` : null,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <legend
      id="{name}-legend"
      class="govuk-fieldset__legend govuk-fieldset__legend--{legendSize}"
    >
      {#if isPageHeading}
        <h1 class="govuk-fieldset__heading">{legend}</h1>
      {:else}
        {legend}
      {/if}
    </legend>

    {#if hint}
      <div id="{name}-hint" class="govuk-hint" role="note">
        {hint}
      </div>
    {/if}

    {#if (isSupported && validationError) || error}
      <p id="{name}-error" class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {validationError || error}
      </p>
    {/if}

    <div
      class="govuk-checkboxes{small ? ' govuk-checkboxes--small' : ''}"
      data-module="govuk-checkboxes"
      role="group"
      aria-labelledby="{name}-legend"
    >
      {#each options as option, i}
        {#if option.exclusive && i > 0}
          <div
            class="govuk-checkboxes__divider"
            role="separator"
            aria-orientation="horizontal"
          >
            or
          </div>
        {/if}

        <div
          class="govuk-checkboxes__item"
          role="checkbox"
          aria-checked={isSupported ? isChecked(option.value) : null}
        >
          <input
            type="checkbox"
            {name}
            id="{name}-{i}"
            class="govuk-checkboxes__input"
            value={option.value}
            data-aria-controls={option.conditional?.id}
            aria-expanded={isSupported ? isChecked(option.value) : null}
            aria-describedby={[
              option.hint ? `${name}-${i}-hint` : null,
              option.conditional ? option.conditional.id : null,
            ]
              .filter(Boolean)
              .join(" ")}
            checked={isChecked(option.value)}
            onchange={() => toggleCheckbox(option)}
            data-behaviour={option.exclusive ? "exclusive" : undefined}
          />
          <label
            class="govuk-label govuk-checkboxes__label"
            for="{name}-{i}"
            id="{name}-${i}-label"
          >
            {option.label}
          </label>

          {#if option.hint}
            <div
              id="{name}-{i}-hint"
              class="govuk-hint govuk-checkboxes__hint"
              role="note"
            >
              {option.hint}
            </div>
          {/if}
        </div>

        {#if option.conditional}
          <div
            id={option.conditional.id}
            class="govuk-checkboxes__conditional{!isSupported ||
            !isChecked(option.value)
              ? ' govuk-checkboxes__conditional--hidden'
              : ''}"
            role="region"
            aria-labelledby="{name}-${i}-label"
          >
            {#if typeof option.conditional.content === "string"}
              {@html option.conditional.content}
            {:else if option.conditional.content satisfies Snippet}
              {@render option.conditional.content()}
            {:else}
              <option.conditional.content />
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </fieldset>
</div>
