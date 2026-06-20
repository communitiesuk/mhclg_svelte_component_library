<script lang="ts">
  let {
    summaryText,
    detailedText,
    renderHeadingAsHTML = false,
    renderStringAsHTML = false,
    noInset = false,
    overlapBelow = false,
    expanded = $bindable(false),
    groupName = undefined,
  } = $props();
</script>

<details class="govuk-details" open={expanded} name={groupName}>
  {#if renderHeadingAsHTML}
    <summary class="govuk-details__summary-text">
      {@html summaryText}
    </summary>
  {:else}
    <summary class="govuk-details__summary-text">{summaryText}</summary>
  {/if}

  <div
    class={`govuk-details__text ${noInset === true ? "no-inset" : ""} ${overlapBelow === true ? "overlap-below" : ""}`}
  >
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

  details {
    position: relative;
  }

  .overlap-below {
    position: absolute;
    background-color: white;
  }
</style>
