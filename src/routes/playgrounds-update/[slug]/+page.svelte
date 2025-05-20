<script>
  // @ts-nocheck
  import { page } from "$app/stores";

  let { data } = $props();

  /**
   * &&   Splits the URL into parts, then takes the last two entries, which are used for locating the relevant wrapper svelte file.
   * &&   Note that these variables are reactive so that if the user navigates directly to another component, the slugArray will update and so the current wrapper svelte file will be swapped for the new one.
   */
  let slugArray = $derived($page?.url.pathname.split("/").filter(Boolean));
  let wrapper = $derived(
    slugArray[slugArray.length - 1][0].toUpperCase() +
      slugArray[slugArray.length - 1].substring(1),
  );

  /**
   * &&   Imports the wrapper component, reports error if the URL does not correspond to a component.
   */
  let Component = $state();
  let errorImportingComponent = $state();

  $effect(() => {
    (async () => {
      try {
        const module = await import(
          /* @vite-ignore */
          `/src/wrappers/playgrounds/${wrapper}.svelte`
        );
        Component = module.default;
      } catch (error) {
        errorImportingComponent = true;
        console.log(error);
      }
    })();
  });
</script>

{#if Component}
  <svelte:component this={Component} {data}></svelte:component>
{:else if errorImportingComponent}
  <div class="g-top-level-container">
    <h3>Failed to import component</h3>
    <p>
      Oops...we've returned an error when trying to import the playground
      wrapper associated with this URL.
    </p>
    <p class="underline font-bold">Things to check</p>
    <div class="grid-container">
      <div>1.</div>
      <div>Does the playground wrapper file exist?</div>
      <div>2.</div>
      <div>
        Is the playground wrapper file called <span class="font-bold"
          >{wrapper}.svelte</span
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
