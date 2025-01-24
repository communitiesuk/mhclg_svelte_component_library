<script>
  let { wrapper } = $props();
</script>

<h2>{wrapper.name}</h2>
<h4>{wrapper.folder}</h4>
{#if wrapper.component.WrapperNameAndStatus}
  {@render wrapper.component.WrapperNameAndStatus()}
{/if}
{#if wrapper.component.WrapperDescription}
  {@render wrapper.component.WrapperDescription()}
{/if}
{#if wrapper.component.WrapperContext}
  {@render wrapper.component.WrapperContext()}
{/if}
