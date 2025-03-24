<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";

  let { wrapper, homepage, wrapperType = null } = $props();

  let backgroundColor = {
    component: "bg-slate-100",
    playground: "bg-teal-50",
  }[wrapperType];
</script>

<div
  data-role="details-container"
  class="{homepage
    ? ''
    : 'g-top-level-container'} flex flex-col gap-4 px-5 rounded-lg {homepage
    ? `${backgroundColor} p-5 rounded-lg`
    : ''}"
>
  <div data-role="name-and-pill-container">
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
  {#if !homepage}
    <DividerLine></DividerLine>
  {/if}
</div>
