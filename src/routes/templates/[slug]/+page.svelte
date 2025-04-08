<script>
  import { Banner } from "flowbite-svelte";

  // @ts-nocheck
  import { page } from "$app/state";
  import { kebabToPascalCase } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { data } = $props();

  /**
   * &&   Splits the URL into parts, then takes the last two entries, which are used for locating the relevant wrapper svelte file.
   * &&   Note that these variables are reactive so that if the user navigates directly to another component, the slugArray will update and so the current wrapper svelte file will be swapped for the new one.
   */
  let slugArray = $derived(page?.url.pathname.split("/").filter(Boolean));
  let folder = $derived(slugArray[slugArray.length - 2]);
  let wrapper = $derived(
    kebabToPascalCase(
      slugArray[slugArray.length - 1][0].toUpperCase() +
        slugArray[slugArray.length - 1].substring(1),
    ),
  );

  /**
   * &&   Imports the wrapper component, reports error if the URL does not correspond to a component.
   */
  let Component = $state();
  let errorImportingComponent = $state();

  $effect(() => {
    (async () => {
      try {
        const module = await import(`/src/${folder}/${wrapper}Wrapper.svelte`);
        Component = module.default;
      } catch (error) {
        errorImportingComponent = true;
        console.log(error);
      }
    })();
  });

  // $inspect(Component);
</script>

{#if Component}
  <div>
    {#if wrapper === "BaseTemplate"}
      <Banner
        id="cta-banner"
        position="sticky"
        bannerType="cta"
        class="sticky z-10 flex justify-between p-4 dark:bg-gray-700 dark:border-gray-600 flex-row bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-5xl top-6 mx-auto"
      >
        <div>
          <p class="mt-2">
            This page can be copied, renamed and used as the base for a new
            component using the <code>create-component-and-wrapper-pages</code> script.
          </p>
          <p class="mb-2">
            More information on how to create a new component is provided in the <a
              href="/user-guide">user guide.</a
            >
          </p>
        </div>
      </Banner>
    {/if}
    <svelte:component this={Component} {data}></svelte:component>
  </div>
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
