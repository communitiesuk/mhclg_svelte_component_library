<script lang="ts">
  let {
    summaryText,
    detailedText,
    renderStringAsHTML = false,
    noInset = false,
    expanded = $bindable(false),
    groupName
  } = $props();
</script>

<details
        class="govuk-details"
        open={expanded}
        name={groupName}
>
  {#if renderStringAsHTML}
    <summary class="govuk-details__summary-text">
      {@html summaryText}
    </summary>
  {:else}
    <summary class="govuk-details__summary-text">{summaryText}</summary>
  {/if}

  <div class={`govuk-details__text ${noInset === true ? 'no-inset' : ''}`}>
    {#if typeof detailedText === 'string'}
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
