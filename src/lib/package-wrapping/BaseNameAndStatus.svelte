<script>
  import ListOfComponentStatuses from "$lib/package-wrapping/ListOfComponentStatuses.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { homepage, statusObject, folder, name, parentFolder } = $props();
</script>

{#if homepage}
  <a
    class="link-to-other-page"
    href={`/${parentFolder}${folder ? "/" + folder : ""}/${textStringConversion(name, "kebab")}`}
  >
    <h6>{name}</h6>
  </a>
{:else}
  <h2>{name}</h2>
{/if}
{#if statusObject}
  <ListOfComponentStatuses {statusObject}></ListOfComponentStatuses>
{/if}
