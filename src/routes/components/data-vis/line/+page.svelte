<script>
  // @ts-nocheck
  import ComponentDetails from '$lib/package-specific/ComponentDetails.svelte';
  import { details } from './details.js';

  let { data, homepage = false } = $props();
</script>

<!-- {#snippet name()}
  {@const nameDetails = { name: 'Line', folder: 'data-vis' }}
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
    <p>
      This component takes flat time-series data, x and y scales and creates an
      SVG line.
    </p>
  </div>
{/snippet}

{#snippet childComponents()}
  {@const childComponentsArray = []}
  {#each childComponentsArray as component}
    <li>
      <a href="/{component.folder}/{toUrlSlug(component.name)}">
        {component.name}
      </a>
    </li>
  {/each}
<li>None specified</li>
{/snippet} -->

<ComponentDetails {homepage} {details}></ComponentDetails>
