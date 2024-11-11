<script>
	// @ts-nocheck
	import ComponentDetails from '$lib/package-specific/ComponentDetails.svelte';
	import { toUrlSlug } from '$lib/utils/url-conversion/toUrlSlug.js';
	//import WrapperInputs
	//import LineChart

	let { data, detailsOnly = false } = $props();

	$inspect(data?.jsonData);
</script>

{#snippet name()}
	{@const nameDetails = { name: 'Line chart', folder: 'data-vis' }}
	{#if detailsOnly}
		<a href="/{nameDetails.folder}/{toUrlSlug(nameDetails.name)}">
			<h5 class="underline underline-offset-4">{nameDetails.name}</h5></a
		>
	{:else}
		<h1>{nameDetails.name}</h1>
	{/if}
{/snippet}

{#snippet description()}
	<div class="pr-5">
		<p>This component takes flat data and renders a line chart.</p>
		<p>
			Using its child components, it provides options for styling each line differently, the setting
			of scales, the placement of labels and more.
		</p>
	</div>
{/snippet}

{#snippet childComponents()}
	{@const childComponentsArray = [
		{ name: 'Line', folder: 'data-vis' },
		{ name: 'Axis', folder: 'data-vis' },
		{ name: 'Label', folder: 'data-vis' },
		{ name: 'Legend', folder: 'data-vis' },
		{ name: 'Button', folder: 'ui' }
	]}
	{#each childComponentsArray as component}
		<li>
			<a href="/{component.folder}/{toUrlSlug(component.name)}">
				{component.name}
			</a>
		</li>
	{/each}
	<!-- <li>None specified</li> -->
{/snippet}

<ComponentDetails {detailsOnly} {name} {description} {childComponents}></ComponentDetails>

