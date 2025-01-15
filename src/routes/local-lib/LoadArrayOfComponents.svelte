<script>
  let { subFolder } = $props();

  // Store dynamically imported components
  let components = $state();

  // Import all components dynamically
  Promise.all(
    subFolder.subFolders.map(async (folders) => {
      const module = await import(
        folders.length === 5
          ? `./../${folders[2]}/${folders[3]}/${folders[4]}/+page.svelte`
          : `./../${folders[2]}/${folders[3]}/+page.svelte`
      );
      return { module: module.default, folders: folders };
    })
  ).then((loadedComponents) => {
    components = loadedComponents;
  });
</script>

<div class="flex flex-col gap-10">
  {#each components as component}
    <svelte:component
      this={component.module}
      folders={component.folders}
      homepage={true}
    />
  {/each}
</div>
