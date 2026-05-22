<script>
  let {
    summaryText,
    detailedText,
    renderStringAsHTML = false,
    noInset = false,
    expanded = $bindable(false),
  } = $props();
</script>

<details class="govuk-details" bind:open={expanded}>
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">{summaryText}</span>
  </summary>
  <div class={`govuk-details__text ${noInset === true ? "no-inset" : ""}`}>
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

<style>
  .no-inset {
    padding: 0;
    border: 0;
  }
</style>
