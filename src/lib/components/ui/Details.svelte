<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    summaryText,
    detailedText,
    renderStringAsHTML = false,
    noInset = false,
    overlapBelow = false,
    expanded = $bindable(false),
    groupName = undefined,
    noBottomMargin = false,
  }: {
    summaryText: string;
    detailedText: string | Snippet;
    renderStringAsHTML?: boolean;
    noInset?: boolean;
    overlapBelow?: boolean;
    expanded?: boolean;
    groupName?: string;
    noBottomMargin?: boolean;
  } = $props();
</script>

<details
  class="govuk-details"
  class:details-no-margin={noBottomMargin}
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

  .details-no-margin {
    margin-bottom: 0;
  }

  .overlap-below {
    position: absolute;
    background-color: white;
  }
</style>
