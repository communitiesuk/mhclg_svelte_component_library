<script lang="ts">
  import type { Snippet } from "svelte";

  // Define component props with types and default values
  let {
    assistiveText = "Warning",
    text = "You can be fined up to £5,000 if you do not register.",
  } = $props<{
    assistiveText?: string;
    text?: string | Snippet;
  }>();
</script>

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">{assistiveText}</span>
    {#if typeof text === "string"}
      {text}
    {:else if text}
      {@render text()}
    {/if}
  </strong>
</div>

<style>
</style>
