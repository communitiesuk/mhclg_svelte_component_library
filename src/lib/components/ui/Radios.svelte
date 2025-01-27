<script lang="ts">
  import type { SvelteComponent, Snippet } from "svelte";
  import { onMount } from "svelte";
  // Define the RadioOption type
  export type RadioOption = {
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
    inline = false,
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
    inline?: boolean;
    options?: RadioOption[];
    validate?: (value: string) => string | undefined;
  }>();

  // Component state for single selection
  let selectedValue = $state<string | null>(null);

  // Add support detection
  let isSupported = $state(false);
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  // Derived state to check if a value is selected and handle validation
  let isChecked = $derived((value: string) => selectedValue === value);
  let validationError = $derived<string | undefined>(
    isSupported && validate ? validate(selectedValue ?? "") : undefined,
  );

  function toggleRadio(option: RadioOption) {
    if (!isSupported) return;
    selectedValue = selectedValue === option.value ? null : option.value;
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
      class="govuk-radios{small ? ' govuk-radios--small' : ''}{inline ? ' govuk-radios--inline' : ''}"
      data-module="govuk-radios"
      role="radiogroup"
      aria-labelledby="{name}-legend"
    >
      {#each options as option, i}
        {#if option.exclusive && i > 0}
          <div
            class="govuk-radios__divider"
            role="separator"
            aria-orientation="horizontal"
          >
            or
          </div>
        {/if}

        <div
          class="govuk-radios__item"
          role="radio"
          aria-checked={isSupported ? isChecked(option.value) : null}
        >
          <input
            type="radio"
            {name}
            id="{name}-{i}"
            class="govuk-radios__input"
            value={option.value}
            data-aria-controls={option.conditional?.id}
            aria-describedby={[
              option.hint ? `${name}-${i}-hint` : null,
              option.conditional ? option.conditional.id : null,
            ]
              .filter(Boolean)
              .join(" ")}
            checked={isChecked(option.value)}
            onchange={() => toggleRadio(option)}
            data-behaviour={option.exclusive ? "exclusive" : undefined}
          />
          <label
            class="govuk-label govuk-radios__label"
            for="{name}-{i}"
            id="{name}-${i}-label"
          >
            {option.label}
          </label>

          {#if option.hint}
            <div
              id="{name}-{i}-hint"
              class="govuk-hint govuk-radios__hint"
              role="note"
            >
              {option.hint}
            </div>
          {/if}
        </div>

        {#if option.conditional}
          <div
            id={option.conditional.id}
            class="govuk-radios__conditional{!isSupported ||
            !isChecked(option.value)
              ? ' govuk-radios__conditional--hidden'
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