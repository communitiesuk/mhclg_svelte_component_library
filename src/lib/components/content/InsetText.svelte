<script lang="ts">
  import type { Snippet } from "svelte";

  // Define component props with types and default values
  let {
    content = "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  } = $props<{
    content?: string | Snippet;
  }>();
</script>

<div class="govuk-inset-text">
  {#if typeof content === "string"}
    {content}
  {:else if content}
    {@render content()}
  {/if}
</div>

<style>
</style>
