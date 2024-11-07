<script>
	import { libFoldersExcludedFromPreviewing } from '$lib/config.js';
	import LibSubFolders from './lib/LibSubFolders.svelte';

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
	const componentsObj = import.meta.glob('/src/lib/component-wrappers/**/*.svelte');

	/**
	 * && Based on the urls of the svelte files, identify the component-wrapper's sub-folders
	 */
	const uniqueSubFolders = [
		...new Set(
			Object.keys(componentsObj).map((url) => {
				const match = url.match(/\/src\/lib\/component-wrappers\/([^/]+)/);
				return match ? match[1] : null;
			})
		)
	].filter((el) => !libFoldersExcludedFromPreviewing.includes(el));
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
				This library has been developed by members of the Office for Local Government's Data Tools
				team to house components for use in the organisation's public facing products.
			</p>
		</div>
		<div>
			<h2 class="mb-6">Components</h2>
			<p>The components available in this library are listed below.</p>
			<p>
				Click on a link to visit a component's wrapper page, where you can view and test out the
				component's parameters and see example use cases.
			</p>
		</div>
	</div>
</div>

<div>
	{#each uniqueSubFolders as subFolder}
		<LibSubFolders {data} {subFolder} {componentsObj}></LibSubFolders>
	{/each}
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
