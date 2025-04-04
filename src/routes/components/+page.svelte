<script>
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import LoadArrayOfComponents from "../local-lib/LoadArrayOfComponents.svelte";

  let { data } = $props();

  /**
   * && 		Description of the code, how it works and what it does.
   * ? 		  Descriptions of parameters - where they come from and what they do.
   * ! 		  Known limitations, issues, bugs or warnings - anything that developers need to be mindful of.
   * TODO		Remaining actions relating to this section of code.
   * <> 		Accessibility notes.
   */
</script>

<div class="flex flex-col gap-6">
  <div>
    <h1 class="govuk-heading-xl mb-6">Components</h1>
    <p class="govuk-body">
      The components available in this library are listed below.
    </p>
    <p class="govuk-body mb-6">
      Click on a link to visit a component's wrapper page, where you can view
      and test out the component's parameters and see example use cases.
    </p>
    <DividerLine margin="1rem 0rem"></DividerLine>

    {#each data.componentsSubFolders as subFolder}
      {#if subFolder.subFolders.length > 0}
        <h2 class="govuk-heading-l mt-10 mb-8">
          {subFolder.label}
        </h2>
        <LoadArrayOfComponents {subFolder}></LoadArrayOfComponents>
        <DividerLine margin="1rem 0rem"></DividerLine>
      {/if}
    {/each}
  </div>
</div>

<style>
  /**
	* &&		
	* ?			
	* !			
	* TODO		
	* <>		
	*/
</style>
