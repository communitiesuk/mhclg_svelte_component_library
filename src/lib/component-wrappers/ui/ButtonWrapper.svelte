<script>
	import ComponentDetails from '$lib/package-specific/ComponentDetails.svelte';
	import { toUrlSlug } from '$lib/utils/url-conversion/toUrlSlug.js';
	//import WrapperInputs
	//import LineChart

	let { data, detailsOnly = false } = $props();
</script>

{#snippet name()}
	{@const nameDetails = { name: 'Button', folder: 'ui' }}
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
		<p>This component is a simple button.</p>
		<p>Some more detail on how it works etc.</p>
	</div>
{/snippet}

{#snippet childComponents()}
	<li>None specified</li>
{/snippet}

<ComponentDetails {detailsOnly} {name} {description} {childComponents}></ComponentDetails>
