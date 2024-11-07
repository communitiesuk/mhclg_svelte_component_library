<script>
	// @ts-nocheck
	import { subFoldersLookup } from '$lib/config.js';
	import DynamicallyRenderComponents from '$lib/package-specific/DynamicallyRenderComponents.svelte';

	let { data, subFolder, componentsObj } = $props();
</script>

{#if Object.keys(componentsObj).length > 0}
	<div class="subfolder-container">
		<div class="g-top-level-container mb-0">
			<div>
				<h3 class="underline underline-offset-4">
					{subFoldersLookup[subFolder]?.label || subFolder}
				</h3>
			</div>
		</div>
		<!--
    && Loops through components. Since details = true, the component will render only information about the component, not the content of the component itself.				
    -->
		<DynamicallyRenderComponents
			{data}
			urlMatch={`/${subFolder}/`}
			{componentsObj}
			detailsOnly={true}
		></DynamicallyRenderComponents>
	</div>
{/if}
