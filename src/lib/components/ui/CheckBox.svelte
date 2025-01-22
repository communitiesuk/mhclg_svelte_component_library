<script lang="ts">
  import type { SvelteComponent } from "svelte";

  // Types
  type CheckboxOption = {
    value: string;
    label: string;
    hint?: string;
    exclusive?: boolean;
    conditional?: {
      id: string;
      content: string | SvelteComponent;
    };
  };

  type Props = {
    legend: string;
    hint?: string;
    error?: string;
    isPageHeading?: boolean;
    legendSize?: "l" | "m" | "s";
    small?: boolean;
    name: string;
    options: CheckboxOption[];
  };

  // Props
  const props: Props = $props();
  const {
    legend,
    hint,
    error,
    isPageHeading = false,
    legendSize = "l",
    small = false,
    name,
    options,
  } = props;

  // State
  let root: HTMLDivElement;
  let selectedValues = $state<Array<string>>([]);
  let exclusiveValue = $state<string | null>(null);

  // Derived values
  const ariaDescribedBy = $derived(() => {
    const parts = [hint && "hint", error && "error"].filter(Boolean);
    return parts.length ? parts.join(" ") : undefined;
  });

  const isSelected = $derived((value: string) =>
    selectedValues.includes(value),
  );

  // Effects for managing conditional reveals
  $effect(() => {
    const inputs = root?.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    if (!inputs) return;

    inputs.forEach((input) => {
      const targetId = input.getAttribute("data-aria-controls");
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) {
        console.error(`Conditional reveal (id="${targetId}") not found`);
        return;
      }

      // Update ARIA attributes
      input.setAttribute("aria-controls", targetId);
      input.removeAttribute("data-aria-controls");

      // Update conditional visibility
      const isChecked = selectedValues.includes(input.value);
      input.setAttribute("aria-expanded", isChecked.toString());
      target.classList.toggle(
        "govuk-checkboxes__conditional--hidden",
        !isChecked,
      );
    });
  });

  // Handle checkbox changes
  function handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const isExclusive = input.getAttribute("data-behaviour") === "exclusive";

    if (isExclusive) {
      if (input.checked) {
        selectedValues = [value];
        exclusiveValue = value;
      } else {
        selectedValues = [];
        exclusiveValue = null;
      }
    } else {
      if (input.checked) {
        // If checking a regular option, uncheck exclusive option
        if (exclusiveValue !== null) {
          selectedValues = [];
          exclusiveValue = null;
        }
        selectedValues = [...selectedValues, value];
      } else {
        selectedValues = selectedValues.filter((v) => v !== value);
      }
    }
  }
</script>

<div
  class="govuk-form-group {error ? 'govuk-form-group--error' : ''}"
  bind:this={root}
>
  <fieldset class="govuk-fieldset" aria-describedby={ariaDescribedBy()}>
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--{legendSize}">
      {#if isPageHeading}
        <h1 class="govuk-fieldset__heading">
          {legend}
        </h1>
      {:else}
        {legend}
      {/if}
    </legend>

    {#if hint}
      <div id="hint" class="govuk-hint">
        {hint}
      </div>
    {/if}

    {#if error}
      <p id="error" class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {error}
      </p>
    {/if}

    <div
      class="govuk-checkboxes {small ? 'govuk-checkboxes--small' : ''}"
      data-module="govuk-checkboxes"
    >
      {#each options as option, i}
        <div class="govuk-checkboxes__item">
          <input
            class="govuk-checkboxes__input"
            id="{name}-{i}"
            {name}
            type="checkbox"
            value={option.value}
            checked={isSelected(option.value)}
            data-behaviour={option.exclusive ? "exclusive" : undefined}
            data-aria-controls={option.conditional?.id}
            aria-describedby={option.hint ? `${name}-${i}-hint` : undefined}
            onchange={handleChange}
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
            class="govuk-checkboxes__conditional govuk-checkboxes__conditional--hidden"
            id={option.conditional.id}
          >
            {#if typeof option.conditional.content === "string"}
              {@html option.conditional.content}
            {:else}
              {#key option.conditional.content}
                {option.conditional.content}
              {/key}
            {/if}
          </div>
        {/if}
        {#if option.exclusive}
          <div class="govuk-checkboxes__divider">or</div>
        {/if}
      {/each}
    </div>
  </fieldset>
</div>
