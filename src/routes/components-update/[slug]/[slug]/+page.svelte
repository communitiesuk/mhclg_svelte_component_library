<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let components = [];

  // Reactive statement to update slugArray when the URL changes
  let slugArray = $derived($page?.url.pathname.split("/").filter(Boolean));

  $inspect(slugArray);

  // Function to dynamically import components based on slugArray
  async function loadComponents() {
    components = await Promise.all(
      slugArray.map(async (slug) => {
        try {
          const module = await import(`/src/wrapper/data-vis/Line.svelte`);
          return { component: module.default, slug };
        } catch (error) {
          console.error(`Failed to load component for slug: ${slug}`, error);
          return null;
        }
      }),
    );
    // Filter out any null components due to import errors
    components = components.filter(Boolean);
  }

  // Load components on component mount
  onMount(loadComponents);
</script>

<!-- Render the dynamically imported components -->
{#each components as { component: Component, slug }}
  <svelte:component this={Component} />
{/each}
