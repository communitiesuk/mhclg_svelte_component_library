<script>
  // @ts-nocheck
  import { toUrlSlug } from '$lib/utils/url-conversion/toUrlSlug.js';

  let { homepage, details } = $props();

  $inspect(details);
</script>

<div
  class="flex flex-col gap-6 {homepage ? 'bg-slate-100 p-5 rounded-lg' : ''}"
>
  {#if homepage}
    <a href="/components/{details.folder}/{toUrlSlug(details.name)}">
      <h5 class="underline underline-offset-4">{details.name}</h5></a
    >
  {:else}
    <h1>{details.name}</h1>
  {/if}
</div>

<!-- <div class="flex flex-col gap-6 {detailsOnly ? 'bg-slate-100 p-5 rounded-lg' : ''}">
	<div class={detailsOnly ? '' : 'mb-6'}>
		{@render name()}
	</div>
	<div>
		{#if !detailsOnly}
			<h5>Description:</h5>
		{/if}
		{@render description()}
	</div>

	{#if childComponents}
		<div>
			<figure class="flex {detailsOnly ? 'flex-row gap-4' : 'flex-col gap-6'}">
				{#if detailsOnly}
					<figcaption>Child components:</figcaption>
				{:else}
					<h5>Child components:</h5>
				{/if}
				<ul class="flex flex-row gap-4">
					{@render childComponents()}
				</ul>
			</figure>
		</div>
	{/if}
</div> -->
