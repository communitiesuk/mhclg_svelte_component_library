<script lang="ts">
  import { onMount, type Snippet } from "svelte";

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
    disabled?: boolean;
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
    validate,
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
    options?: CheckboxOption[];
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

  /*
   * Option state
   */

  const enabledSectionOptions = $derived(
    sections
      .filter((section) => !section.disabled)
      .flatMap((section) => section.options),
  );

  const allEnabledOptions = $derived([...options, ...enabledSectionOptions]);

  /*
   * Select all includes every enabled option, including
   * exclusive options, to retain the existing behaviour.
   */
  const selectableValues = $derived(
    allEnabledOptions.map((option) => option.value),
  );

  const isChecked = $derived((value: string) => selectedValues.includes(value));

  const validationError = $derived<string | undefined>(
    isSupported && validate ? validate(selectedValues) : undefined,
  );

  const displayedError = $derived(validationError || error);

  const allSelected = $derived(
    selectableValues.length > 0 &&
      selectableValues.every((value) => selectedValues.includes(value)),
  );

  /*
   * Interaction handlers
   */

  function toggleCheckbox(option: CheckboxOption, disabled = false): void {
    if (!isSupported || disabled) {
      return;
    }

    /*
     * Selecting an exclusive option clears all other
     * selections. Selecting it again clears it.
     */
    if (option.exclusive) {
      selectedValues = selectedValues.includes(option.value)
        ? []
        : [option.value];

      return;
    }

    /*
     * Remove a normal option if it is already selected.
     */
    if (selectedValues.includes(option.value)) {
      selectedValues = selectedValues.filter((value) => value !== option.value);

      return;
    }

    /*
     * Selecting a normal option removes any selected
     * exclusive option.
     */
    selectedValues = [
      ...selectedValues.filter(
        (selectedValue) =>
          !allEnabledOptions.some(
            (availableOption) =>
              availableOption.value === selectedValue &&
              availableOption.exclusive,
          ),
      ),
      option.value,
    ];
  }

  function toggleSelectAll(): void {
    if (!isSupported) {
      return;
    }

    if (allSelected) {
      /*
       * Remove the enabled options, but preserve values
       * belonging to disabled sections.
       */
      selectedValues = selectedValues.filter(
        (value) => !selectableValues.includes(value),
      );

      return;
    }

    /*
     * Preserve existing values and add all enabled options.
     * This includes exclusive options to retain the previous
     * Select all behaviour.
     */
    selectedValues = [...new Set([...selectedValues, ...selectableValues])];
  }

  /*
   * ID helpers
   */

  function getOptionId(
    sectionIndex: number | undefined,
    optionIndex: number,
  ): string {
    if (sectionIndex === undefined) {
      return `${name}-option-${optionIndex}`;
    }

    return `${name}-section-${sectionIndex}-option-${optionIndex}`;
  }

  function getSectionId(sectionIndex: number): string {
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
        <span class="govuk-visually-hidden"> Error: </span>

        {displayedError}
      </p>
    {/if}

    {#if selectAllButton && selectableValues.length > 0}
      <div class="checkbox-select-all">
        <Button
          buttonType={allSelected ? "warning" : "secondary"}
          textContent={allSelected ? "Deselect all" : "Select all"}
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
            <div class="govuk-checkboxes__divider">or</div>
          {/if}

          <div class="govuk-checkboxes__item">
            <input
              type="checkbox"
              {name}
              id={optionId}
              class="govuk-checkboxes__input"
              value={option.value}
              {checked}
              onchange={() => toggleCheckbox(option)}
              data-aria-controls={option.conditional?.id}
              data-behaviour={option.exclusive ? "exclusive" : undefined}
              aria-expanded={option.conditional && isSupported
                ? checked
                : undefined}
              aria-describedby={[
                option.hint ? hintId : null,
                option.conditional ? option.conditional.id : null,
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
              <div id={hintId} class="govuk-hint govuk-checkboxes__hint">
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
            class:checkbox-section--disabled={section.disabled}
            aria-labelledby={`${sectionId}-heading`}
            aria-describedby={section.hint ? `${sectionId}-hint` : undefined}
          >
            {#if section.heading}
              <h3
                id={`${sectionId}-heading`}
                class="govuk-heading-s checkbox-section__heading"
              >
                {section.heading}
              </h3>
            {/if}

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
            >
              {#each section.options as option, optionIndex}
                {@const optionId = getOptionId(sectionIndex, optionIndex)}

                {@const labelId = `${optionId}-label`}
                {@const hintId = `${optionId}-hint`}

                {@const checked = isChecked(option.value)}

                {#if option.exclusive && optionIndex > 0}
                  <div class="govuk-checkboxes__divider">or</div>
                {/if}

                <div class="govuk-checkboxes__item">
                  <input
                    type="checkbox"
                    {name}
                    id={optionId}
                    class="govuk-checkboxes__input"
                    value={option.value}
                    {checked}
                    disabled={section.disabled}
                    onchange={() => toggleCheckbox(option, section.disabled)}
                    data-aria-controls={option.conditional?.id}
                    data-behaviour={option.exclusive ? "exclusive" : undefined}
                    aria-expanded={option.conditional && isSupported
                      ? checked
                      : undefined}
                    aria-describedby={[
                      option.hint ? hintId : null,
                      option.conditional ? option.conditional.id : null,
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
                    <div id={hintId} class="govuk-hint govuk-checkboxes__hint">
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

  .checkbox-section--disabled .checkbox-section__heading,
  .checkbox-section--disabled .checkbox-section__hint {
    color: #505a5f;
  }
</style>
