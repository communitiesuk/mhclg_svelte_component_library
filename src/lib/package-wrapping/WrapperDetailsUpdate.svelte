<script>
  let { wrapper, homepage } = $props();

  $inspect(wrapper);
</script>

<div
  data-role="details-container"
  class="{homepage
    ? ''
    : 'g-top-level-container'} flex flex-col gap-4 p-5 rounded-lg {homepage
    ? 'bg-slate-100 p-5 rounded-lg'
    : ''}"
>
  <div
    data-role="name-and-pill-container"
    class="flex flex-row items-center gap-4"
  >
    {#if wrapper.component.WrapperNameAndStatus && wrapper?.name}
      {@render wrapper.component.WrapperNameAndStatus(
        wrapper.name,
        wrapper.folder,
        homepage,
      )}
    {/if}
  </div>

  <div data-role="component-information-container" class="flex flex-col gap-4">
    {#if wrapper.component.WrapperInformation}
      {@render wrapper.component.WrapperInformation(homepage)}
    {/if}
  </div>
</div>
