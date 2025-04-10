<script>
  let { summaryText, detailedText } = $props();
</script>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">{summaryText}</span>
  </summary>
  <div class="govuk-details__text">
    {detailedText}
  </div>
</details>
