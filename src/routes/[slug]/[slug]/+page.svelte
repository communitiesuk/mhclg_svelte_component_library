<script>
	import { page } from '$app/stores';
	import DynamicallyRenderComponents from '$lib/package-specific/DynamicallyRenderComponents.svelte';
	import { toPascalCase } from '$lib/utils/url-conversion/toPascalCase.js';

	let { data } = $props();

	let pathname = $derived($page.url.pathname);

	let [folder, componentName] = $derived(pathname.substring(1).split('/'));

	const componentsObj = import.meta.glob('/src/lib/component-wrappers/**/*.svelte');
</script>

{#key pathname}
	<DynamicallyRenderComponents
		{data}
		detailsOnly={false}
		urlMatch={'/src/lib/component-wrappers/' +
			folder +
			'/' +
			toPascalCase(componentName) +
			'Wrapper.svelte'}
		{componentsObj}
	></DynamicallyRenderComponents>
{/key}
