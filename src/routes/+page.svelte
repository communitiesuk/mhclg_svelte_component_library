<script>
  import LoadComponentsArray from './local-lib/LoadComponentsArray.svelte';

  let { data } = $props();

  $inspect(data);

  /**
   * && 		Description of the code, how it works and what it does.
   * ? 		Descriptions of parameters - where they come from and what they do.
   * ! 		Known limitations, issues, bugs or warnings - anything that developers need to be mindful of.
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
<div class="g-top-level-container mt-16">
  <div class="flex flex-col gap-6">
    <div>
      <h2 class="mb-6">Introduction</h2>
      <p>
        This library has been developed by members of the Office for Local
        Government's Data Tools team to house components for use in the
        organisation's public facing products.
      </p>
    </div>
    <div>
      <h2 class="mb-6">Components</h2>
      <p>The components available in this library are listed below.</p>
      <p>
        Click on a link to visit a component's wrapper page, where you can view
        and test out the component's parameters and see example use cases.
      </p>

      {#each data.componentsSubFolders as subFolder}
        {#if subFolder.subFolders.length > 0}
          <h3 class="underline underline-offset-4 mt-10 mb-6">
            {subFolder.label}
          </h3>
          <LoadComponentsArray {subFolder}></LoadComponentsArray>
        {/if}
      {/each}
    </div>
    <div>
      <h2 class="mb-6 mt-10">Playground</h2>
      <p>
        The playground is a sandbox space where developers can test code and
        practice combining components.
      </p>
      <p>
        All our playground examples are listed below. Click on a link to view.
      </p>
      <LoadComponentsArray subFolder={data.playgroundFolders}
      ></LoadComponentsArray>
    </div>
  </div>
</div>

<!-- <div>
  {#each uniqueSubFolders as subFolder}
    <LibSubFolders {data} {subFolder} {componentsObj}></LibSubFolders>
  {/each}

  {#if LineChart}
    <svelte:component this={LineChart} />
  {/if}
</div> -->

<style>
  /**
	* &&		
	* ?			
	* !			
	* TODO		
	* <>		
	*/
</style>
