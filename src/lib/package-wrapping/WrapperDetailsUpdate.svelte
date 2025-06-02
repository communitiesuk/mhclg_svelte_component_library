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
  class="flex flex-col gap-4 rounded-lg min-w-0 {homepage
    ? `p-5 ${backgroundColor}`
    : ''}"
>
  <div data-role="name-and-pill-container">
    {#if wrapper.component.WrapperNameAndStatus && wrapper?.name}
      {@render wrapper.component.WrapperNameAndStatus(
        wrapper.name,
        wrapper.folder,
        wrapper.subFolder,
        homepage,
      )}
    {/if}
  </div>

  <div
    data-role="component-information-container"
    class="flex flex-col gap-4 mt-2"
  >
    {#if wrapper.component.WrapperInformation}
      {@render wrapper.component.WrapperInformation(homepage)}
    {/if}
  </div>
  {#if !homepage}
    <DividerLine></DividerLine>
  {/if}
</div>
