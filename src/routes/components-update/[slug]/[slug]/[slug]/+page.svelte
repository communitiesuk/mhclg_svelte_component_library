<script>
  // @ts-nocheck
  import { page } from "$app/state";
  import { kebabToPascalCase } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { data } = $props();

  /**
   * &&   Splits the URL into parts, then takes the last two entries, which are used for locating the relevant wrapper svelte file.
   * &&   Note that these variables are reactive so that if the user navigates directly to another component, the slugArray will update and so the current wrapper svelte file will be swapped for the new one.
   */
  let slugArray = $derived(page?.url.pathname.split("/").filter(Boolean));
  let folder = $derived(slugArray[slugArray.length - 3]);
  let subFolder = $derived(slugArray[slugArray.length - 2]);
  let wrapper = $derived(
    kebabToPascalCase(
      slugArray[slugArray.length - 1][0].toUpperCase() +
        slugArray[slugArray.length - 1].substring(1),
    ),
  );

  $inspect(wrapper);

  /**
   * &&   Imports the wrapper component, reports error if the URL does not correspond to a component.
   */
  let Component = $state();
  let errorImportingComponent = $state();

  $effect(() => {
    (async () => {
      try {
        const module = await import(
          `/src/wrappers/components/${folder}/${subFolder}/${wrapper}Wrapper.svelte`
        );
        Component = module.default;
      } catch (error) {
        errorImportingComponent = true;
        console.log(error);
      }
    })();
  });

  $inspect(Component);
</script>

{#if Component}
  <svelte:component this={Component} {data}></svelte:component>
{:else if errorImportingComponent}
  <div class="g-top-level-container">
    <h3>Failed to import componnet</h3>
    <p>
      Oops...we've returned an error when trying to import the component wrapper
      associated with this URL.
    </p>
    <p class="underline font-bold">Things to check</p>
    <div class="grid-container">
      <div>1.</div>
      <div>Does the component wrapper file exist?</div>
      <div>2.</div>
      <div>
        Is the component wrapper file called <span class="font-bold"
          >{wrapper}Wrapper.svelte</span
        >?
      </div>
      <div>3.</div>
      <div>
        Is the component wrapper file contained within a folder called <span
          class="font-bold">{folder}</span
        >?
      </div>
    </div>
  </div>
{/if}

<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px; /* Adjusts the space between grid items */
  }
</style>
