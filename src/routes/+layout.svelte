<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="g-top-level-container">
	<div class="flex flex-row gap-10 items-center">
		<img src="/images/oflog_crest_black.png" alt="MHCLG crest" />
		<div class="flex flex-col leading-tight">
			<h1>Svelte Component Library</h1>
			<p class="font-normal italic m-0 text-3xl">Office for Local Government</p>
		</div>
	</div>
</div>

{@render children()}
