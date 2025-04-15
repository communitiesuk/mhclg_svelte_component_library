<script>
  let {
    textContent = undefined,
    buttonType,
    componentNameProp = undefined,
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
  <button type="submit" class={buttonClass} data-module="govuk-button">
    {textContent}
  </button>
</div>

<div>test commit</div>

<style>
</style>
