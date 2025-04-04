<script>
  let { textContent, buttonType } = $props();

  let buttonClass = $derived(
    buttonType === "default"
      ? "govuk-button"
      : buttonType === "secondary"
        ? "govuk-button govuk-button--secondary"
        : undefined,
  );
</script>

<button type="submit" class={buttonClass} data-module="govuk-button">
  {textContent}
</button>
