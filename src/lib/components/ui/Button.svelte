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
        : undefined,
  );
</script>

<div class="p-4">
  <h4>{componentNameProp} component</h4>
  <br />
  <button
    type="submit"
    class={buttonClass}
    data-module="govuk-button"
    onclick={buttonFunction}
  >
    {textContent}
  </button>
</div>

<div>
  Clicking this button calculates 2 x 2 and logs the answer in the console.
</div>

<style>
</style>
