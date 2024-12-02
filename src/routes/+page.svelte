<script>
  import DividerLine from '$lib/components/layout/DividerLine.svelte';
  import LoadArrayOfComponents from './local-lib/LoadArrayOfComponents.svelte';

  let { data } = $props();

  $inspect(data);

  /**
   * && 		Description of the code, how it works and what it does.
   * ? 		  Descriptions of parameters - where they come from and what they do.
   * ! 		  Known limitations, issues, bugs or warnings - anything that developers need to be mindful of.
   * TODO		Remaining actions relating to this section of code.
   * <> 		Accessibility notes.
   */
</script>

<!--
&&			
?			
!			
TODO		
<>		
-->
<div class="g-top-level-container">
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="mb-6">Introduction</h4>
      <p>
        This library has been developed by members of the MHCLG's Data Tools
        team to house components for use in the organisation's public facing
        products.
      </p>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>

    <div>
      <h4 class="mb-6">Components</h4>
      <p>The components available in this library are listed below.</p>
      <p>
        Click on a link to visit a component's wrapper page, where you can view
        and test out the component's parameters and see example use cases.
      </p>

      {#each data.componentsSubFolders as subFolder}
        {#if subFolder.subFolders.length > 0}
          <h5 class="underline underline-offset-4 mt-10 mb-8">
            {subFolder.label}
          </h5>
          <LoadArrayOfComponents {subFolder}></LoadArrayOfComponents>
        {/if}
      {/each}
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
    <div>
      <h4 class="mb-6 mt-10">Playground</h4>
      <p>
        The playground is a sandbox space where developers can test code and
        practice combining components.
      </p>
      <p>All our playground examples are listed below.</p>
      <LoadArrayOfComponents subFolder={data.playgroundFolders}
      ></LoadArrayOfComponents>
    </div>
    <DividerLine margin="1rem 0rem"></DividerLine>
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
