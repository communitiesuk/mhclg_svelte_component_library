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
  {#if detailsText != undefined}
    <div class="govuk-details__text"><p>{detailsText}</p></div>
  {/if}
  {#if detailsSnippet != undefined}
    <div class="govuk-details__text">{@render detailsSnippet()}</div>
  {/if}
</details>

<style>
</style>
