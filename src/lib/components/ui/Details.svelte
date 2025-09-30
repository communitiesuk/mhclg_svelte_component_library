<script>
  let { summaryText, detailedText, renderStringAsHTML = false } = $props();
</script>

<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">{summaryText}</span>
  </summary>
  <div class="govuk-details__text">
    {#if typeof detailedText === "string"}
      {#if renderStringAsHTML}
        {@html detailedText}
      {:else}
        {detailedText}
      {/if}
    {:else if detailedText}
      {@render detailedText()}
    {/if}
  </div>
</details>
