<script>
	// @ts-nocheck
	let { data, urlMatch, componentsObj, detailsOnly = false } = $props();

	/**
	 * && Filters for only components that exist within this sub-folder.
	 */
	const filteredComponents = Object.keys(componentsObj)
		.filter((key) => key.includes(urlMatch))
		.reduce((obj, key) => {
			obj[key] = componentsObj[key];
			return obj;
		}, {});

	/**
	 * && Loads all components, puts them in an array.
	 */
	let componentsArray = $state([]);
	Promise.all(Object.values(filteredComponents).map((loader) => loader())).then((modules) => {
		// @ts-ignore
		componentsArray = modules.map((module) => module.default);
	});
</script>

<ul class="flex flex-column gap-10">
	{#each componentsArray as Component}
		<li class="w-full">
			<Component {data} {detailsOnly} />
		</li>
	{/each}
</ul>
