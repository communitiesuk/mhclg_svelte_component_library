<script lang="ts">
  import type { Snippet } from "svelte";

  // Define component props with types and default values
  let {
    content = "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
    renderStringAsHTML = false,
  } = $props<{
    content?: string | Snippet;
    renderStringAsHTML?: boolean;
  }>();
</script>

<div class="govuk-inset-text">
  {#if typeof content === "string"}
    {#if renderStringAsHTML}
      {@html content}
    {:else}
      {content}
    {/if}
  {:else if content}
    {@render content()}
  {/if}
</div>

<style>
</style>
