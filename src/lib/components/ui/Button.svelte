<script>
  let {
    textContent = undefined,
    buttonType,
    componentNameProp = undefined,
    buttonFunction,
  } = $props();

  let buttonClass = $derived(
    buttonType === "default"
      ? "govuk-button"
      : buttonType === "secondary"
        ? "govuk-button govuk-button--secondary"
        : buttonType === "warning"
          ? "govuk-button govuk-button--warning"
          : buttonType === "dark background"
            ? "govuk-button govuk-button--inverse"
            : undefined,
  );
</script>

<div class="p-4">
  <h4>{componentNameProp} component</h4>
  <br />
  {#if buttonType === "start"}
    <a
      href="#"
      role="button"
      draggable="false"
      class="govuk-button govuk-button--start"
      data-module="govuk-button"
      onclick={buttonFunction}
    >
      Start now
      <svg
        class="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
      </svg>
    </a>
  {:else if buttonType === "disabled"}
    <button
      type="submit"
      disabled
      aria-disabled="true"
      class="govuk-button"
      data-module="govuk-button"
      onclick={buttonFunction}
    >
      {textContent}
    </button>
  {:else}
    <button
      type="submit"
      class={buttonClass}
      data-module="govuk-button"
      onclick={buttonFunction}
    >
      {textContent}
    </button>
  {/if}
</div>

<style>
</style>
