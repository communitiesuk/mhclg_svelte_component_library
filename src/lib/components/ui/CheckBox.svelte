<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";

  import Button from "./Button.svelte";

  export type CheckboxOption = {
    value: string;
    label: string;
    hint?: string;
    exclusive?: boolean;
    conditional?: {
      id: string;
      content: string | Snippet;
    };
  };

  export type CheckboxSection = {
    heading: string;
    hint?: string;
    options: CheckboxOption[];
  };

  let {
    legend,
    hint,
    error,
    name,
    isPageHeading = false,
    legendSize = "l",
    small = false,
    options = [],
    sections = [],
    validate = undefined,
    selectedValues = $bindable([]),
    selectAllButton = false,
  } = $props<{
    legend: string;
    hint?: string;
    error?: string;
    name: string;
    isPageHeading?: boolean;
    legendSize?: "l" | "m" | "s";
    small?: boolean;

    /**
     * Use options for a single, ungrouped list.
     */
    options?: CheckboxOption[];

    /**
     * Use sections when the checkboxes need to be grouped.
     *
     * The component can render both options and sections if required.
     */
    sections?: CheckboxSection[];

    validate?: (values: string[]) => string | undefined;
    selectedValues?: string[];
    selectAllButton?: boolean;
  }>();

  let isSupported = $state(false);

  onMount(() => {
    isSupported =
            document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  /**
   * Combines the ungrouped options and all section options.
   *
   * This allows validation, exclusivity and Select all to work across
   * the entire checkbox component.
   */
  let allOptions = $derived([
    ...options,
    ...sections.flatMap((section) => section.options),
  ]);

  /**
   * Exclusive options, such as "None of the above", should not be selected
   * by the Select all button.
   */
  let selectableOptions = $derived(
          allOptions.filter((option) => !option.exclusive),
  );

  let selectableValues = $derived(
          selectableOptions.map((option) => option.value),
  );

  let isChecked = $derived((value: string) =>
          selectedValues.includes(value),
  );

  let validationError = $derived<string | undefined>(
          isSupported && validate ? validate(selectedValues) : undefined,
  );

  let displayedError = $derived(validationError || error);

  /**
   * All selectable options are selected.
   *
   * Exclusive options are deliberately ignored.
   */
  let allSelected = $derived(
          selectableValues.length > 0 &&
          selectableValues.every((value) => selectedValues.includes(value)),
  );

  function toggleCheckbox(option: CheckboxOption) {
    /*
     * If the supported GOV.UK Frontend class is not present, allow the
     * native checkbox behaviour to continue.
     */
    if (!isSupported) return;

    if (option.exclusive) {
      selectedValues = selectedValues.includes(option.value)
              ? []
              : [option.value];

      return;
    }

    if (selectedValues.includes(option.value)) {
      selectedValues = selectedValues.filter(
              (value) => value !== option.value,
      );

      return;
    }

    /*
     * Selecting a standard option removes any currently selected
     * exclusive options.
     */
    const valuesWithoutExclusiveOptions = selectedValues.filter(
            (selectedValue) =>
                    !allOptions.some(
                            (option) =>
                                    option.value === selectedValue && option.exclusive,
                    ),
    );

    selectedValues = [
      ...valuesWithoutExclusiveOptions,
      option.value,
    ];
  }

  function toggleSelectAll() {
    selectedValues = allSelected ? [] : [...selectableValues];
  }

  function getOptionId(
          sectionIndex: number | undefined,
          optionIndex: number,
  ) {
    if (sectionIndex === undefined) {
      return `${name}-option-${optionIndex}`;
    }

    return `${name}-section-${sectionIndex}-option-${optionIndex}`;
  }

  function getSectionId(sectionIndex: number) {
    return `${name}-section-${sectionIndex}`;
  }
</script>

<div
        class:govuk-form-group={true}
        class:govuk-form-group--error={Boolean(displayedError)}
>
  <fieldset
          class="govuk-fieldset"
          aria-describedby={[
      hint ? `${name}-hint` : null,
      displayedError ? `${name}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined}
  >
    <legend
            id={`${name}-legend`}
            class={`govuk-fieldset__legend govuk-fieldset__legend--${legendSize}`}
    >
      {#if isPageHeading}
        <h1 class="govuk-fieldset__heading">
          {legend}
        </h1>
      {:else}
        {legend}
      {/if}
    </legend>

    {#if hint}
      <div id={`${name}-hint`} class="govuk-hint">
        {hint}
      </div>
    {/if}

    {#if displayedError}
      <p id={`${name}-error`} class="govuk-error-message">
        <span class="govuk-visually-hidden">Error:</span>
        {displayedError}
      </p>
    {/if}

    {#if selectAllButton && selectableOptions.length > 0}
      <div class="checkbox-select-all">
        <Button
                buttonType={allSelected ? "warning" : "secondary"}
                textContent={allSelected ? "De-select all" : "Select all"}
                onClickFunction={toggleSelectAll}
                noPadding={true}
        />
      </div>
    {/if}

    <!-- Ungrouped options -->

    {#if options.length > 0}
      <div
              class:govuk-checkboxes={true}
              class:govuk-checkboxes--small={small}
              data-module="govuk-checkboxes"
      >
        {#each options as option, optionIndex}
          {@const optionId = getOptionId(undefined, optionIndex)}
          {@const labelId = `${optionId}-label`}
          {@const hintId = `${optionId}-hint`}
          {@const checked = isChecked(option.value)}

          {#if option.exclusive && optionIndex > 0}
            <div class="govuk-checkboxes__divider">
              or
            </div>
          {/if}

          <div class="govuk-checkboxes__item">
            <input
                    type="checkbox"
                    {name}
                    id={optionId}
                    class="govuk-checkboxes__input"
                    value={option.value}
                    checked={checked}
                    onchange={() => toggleCheckbox(option)}
                    data-aria-controls={option.conditional?.id}
                    data-behaviour={option.exclusive
                ? "exclusive"
                : undefined}
                    aria-expanded={option.conditional && isSupported
                ? checked
                : undefined}
                    aria-describedby={[
                option.hint ? hintId : null,
                option.conditional
                  ? option.conditional.id
                  : null,
              ]
                .filter(Boolean)
                .join(" ") || undefined}
            />

            <label
                    id={labelId}
                    class="govuk-label govuk-checkboxes__label"
                    for={optionId}
            >
              {option.label}
            </label>

            {#if option.hint}
              <div
                      id={hintId}
                      class="govuk-hint govuk-checkboxes__hint"
              >
                {option.hint}
              </div>
            {/if}
          </div>

          {#if option.conditional}
            <div
                    id={option.conditional.id}
                    class:govuk-checkboxes__conditional={true}
                    class:govuk-checkboxes__conditional--hidden={isSupported &&
                !checked}
                    aria-labelledby={labelId}
            >
              {#if typeof option.conditional.content === "string"}
                {@html option.conditional.content}
              {:else}
                {@render option.conditional.content()}
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    <!-- Grouped sections -->

    {#if sections.length > 0}
      <div class="checkbox-sections">
        {#each sections as section, sectionIndex}
          {@const sectionId = getSectionId(sectionIndex)}

          <section
                  class="checkbox-section"
                  aria-labelledby={`${sectionId}-heading`}
          >
            <h2
                    id={`${sectionId}-heading`}
                    class="govuk-heading-m checkbox-section__heading"
            >
              {section.heading}
            </h2>

            {#if section.hint}
              <div
                      id={`${sectionId}-hint`}
                      class="govuk-hint checkbox-section__hint"
              >
                {section.hint}
              </div>
            {/if}

            <div
                    class:govuk-checkboxes={true}
                    class:govuk-checkboxes--small={small}
                    data-module="govuk-checkboxes"
                    aria-describedby={section.hint
                ? `${sectionId}-hint`
                : undefined}
            >
              {#each section.options as option, optionIndex}
                {@const optionId = getOptionId(
                        sectionIndex,
                        optionIndex,
                )}
                {@const labelId = `${optionId}-label`}
                {@const hintId = `${optionId}-hint`}
                {@const checked = isChecked(option.value)}

                {#if option.exclusive && optionIndex > 0}
                  <div class="govuk-checkboxes__divider">
                    or
                  </div>
                {/if}

                <div class="govuk-checkboxes__item">
                  <input
                          type="checkbox"
                          {name}
                          id={optionId}
                          class="govuk-checkboxes__input"
                          value={option.value}
                          checked={checked}
                          onchange={() => toggleCheckbox(option)}
                          data-aria-controls={option.conditional?.id}
                          data-behaviour={option.exclusive
                      ? "exclusive"
                      : undefined}
                          aria-expanded={option.conditional && isSupported
                      ? checked
                      : undefined}
                          aria-describedby={[
                      option.hint ? hintId : null,
                      option.conditional
                        ? option.conditional.id
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" ") || undefined}
                  />

                  <label
                          id={labelId}
                          class="govuk-label govuk-checkboxes__label"
                          for={optionId}
                  >
                    {option.label}
                  </label>

                  {#if option.hint}
                    <div
                            id={hintId}
                            class="govuk-hint govuk-checkboxes__hint"
                    >
                      {option.hint}
                    </div>
                  {/if}
                </div>

                {#if option.conditional}
                  <div
                          id={option.conditional.id}
                          class:govuk-checkboxes__conditional={true}
                          class:govuk-checkboxes__conditional--hidden={isSupported &&
                      !checked}
                          aria-labelledby={labelId}
                  >
                    {#if typeof option.conditional.content ===
                    "string"}
                      {@html option.conditional.content}
                    {:else}
                      {@render option.conditional.content()}
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {/if}
  </fieldset>
</div>

<style>
  .checkbox-select-all {
    margin-bottom: 20px;
  }

  .checkbox-sections {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .checkbox-section__heading {
    margin-bottom: 10px;
  }

  .checkbox-section__hint {
    margin-bottom: 15px;
  }
</style>