<script lang="ts">
  import type { SvelteComponent, Snippet } from "svelte";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import InsetText from "../content/InsetText.svelte";
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
  let {
    selectedValue = $bindable(null),
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
    selectedValue?: string | null;
  }>();

  // Add support detection
  let isSupported = $state(false);
  onMount(() => {
    isSupported =
      document.body?.classList.contains("govuk-frontend-supported") ?? false;
  });

  let validationError = $derived<string | undefined>(
    isSupported && validate ? validate(selectedValue ?? "") : undefined,
  );

  let moreInfoTogglesArray = $state(
    Array.from({ length: options.length }, () => false),
  );

  function updateMoreInfoTogglesArray(index) {
    moreInfoTogglesArray = moreInfoTogglesArray.map((el, i) =>
      i === index ? !el : el,
    );
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
      class="govuk-radios{small ? ' govuk-radios--small' : ''}{inline
        ? ' govuk-radios--inline'
        : ''}"
      data-module="govuk-radios"
      role="radiogroup"
      aria-labelledby="{name}-legend"
    >
      {#each options as option, i}
        {#if option.divider}
          <div
            class="mt-2"
            style="border-bottom: solid; border-color: #e8ebed; border-width: 0.5px;"
          ></div>
        {/if}
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
          class={option.moreInfo ? "item-and-more-info-button-container" : ""}
        >
          <div
            class="govuk-radios__item item-container"
            role="radio"
            aria-checked={isSupported ? selectedValue === option.value : null}
          >
            <input
              type="radio"
              {name}
              id="{name}-{i}"
              class="govuk-radios__input"
              value={option.value}
              bind:group={selectedValue}
              data-aria-controls={option.conditional?.id}
              aria-describedby={[
                option.hint ? `${name}-${i}-hint` : null,
                option.conditional ? option.conditional.id : null,
              ]
                .filter(Boolean)
                .join(" ")}
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

          {#if option.moreInfo}
            <Button
              textContent="i"
              buttonType="moreInfo"
              noPadding={true}
              onClickFunction={() => updateMoreInfoTogglesArray(i)}
            ></Button>
          {/if}
        </div>

        {#if option.conditional}
          <div
            id={option.conditional.id}
            class="govuk-radios__conditional{!isSupported ||
            selectedValue !== option.value
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

        {#if moreInfoTogglesArray[i]}
          <InsetText content={option.moreInfo} renderStringAsHTML={true}
          ></InsetText>
        {/if}
      {/each}
    </div>
  </fieldset>
</div>

<style>
  .item-and-more-info-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .item-container {
    flex: 1;
  }
</style>
