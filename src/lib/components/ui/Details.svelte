<script>
  let {
    componentNameProp = undefined,
    summaryText = undefined,
    detailsText = undefined,
    detailsSnippet,
  } = $props();
</script>

<div class="p-4">
  <h4>{componentNameProp} component</h4>
</div>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">{summaryText}</span>
  </summary>
  <div class="govuk-details__text">
    <p>{detailsText}</p>
    {@render detailsSnippet()}
  </div>
</details>

<style>
</style>
