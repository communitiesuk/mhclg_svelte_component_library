<script>
	// @ts-nocheck
	let { detailsOnly, name, description, childComponents } = $props();
</script>

<div class="g-top-level-container">
	<div class="flex flex-col gap-6 {detailsOnly ? 'bg-slate-300 p-5 rounded-lg' : ''}">
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
	</div>
</div>
