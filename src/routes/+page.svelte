<script>
  import { libFoldersExcludedFromPreviewing } from '$lib/config.js';
  import LoadComponentsArray from './lib/LoadComponentsArray.svelte';

  let { data } = $props();

  $inspect(data);

  /**
   * && 		Description of the code, how it works and what it does.
   * ? 		Descriptions of parameters - where they come from and what they do.
   * ! 		Known limitations, issues, bugs or warnings - anything that developers need to be mindful of.
   * TODO		Remaining actions relating to this section of code.
   * <> 		Accessibility notes.
   */

  /**
   * && Finds all svelte files in the library's component-wrappers folder.
   */
  const componentsObj = import.meta.glob(
    '/src/lib/component-wrappers/**/*.svelte'
  );

  /**
   * && Based on the urls of the svelte files, identify the component-wrapper's sub-folders
   */
  const uniqueSubFolders = [
    ...new Set(
      Object.keys(componentsObj).map((url) => {
        const match = url.match(/\/src\/lib\/component-wrappers\/([^/]+)/);
        return match ? match[1] : null;
      })
    ),
  ].filter((el) => !libFoldersExcludedFromPreviewing.includes(el));

  /*let LineChart = $state();
  import('./components/data-vis/line-chart/+page.svelte').then((module) => {
    LineChart = module.default;
  });*/

  // Store dynamically imported components
  let components = $state();

  // Import all components dynamically
  /*Promise.all(
    data.playgroundFolders.map(async (info) => {
      const module = await import(`./${data.p}/${data.c}/+page.svelte`);
      return module.default;
    })
  ).then((loadedComponents) => {
    components = loadedComponents;
  });*/

  $inspect(components);
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
