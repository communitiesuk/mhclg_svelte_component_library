<script>
  import SidebarContainer from "./SidebarContainer.svelte";
  import OverlayAndComponentContainer from "./OverlayAndComponentContainer.svelte";

  let {
    Component,
    demoScreenWidth = $bindable(),
    parametersSourceArray,
    statedParametersValuesArray = $bindable(),
    derivedParametersValuesArray,
    parametersVisibleArray,
    parametersParsingErrorsObject,
  } = $props();

  let parameterCategories = $derived(
    [
      ...new Set(
        parametersSourceArray
          .filter((el, i) => parametersVisibleArray[i])
          .map((el) => el.category),
      ),
    ].map((el) => ({
      name: el,
      value: el,
    })),
  );

  let categoriesOverlayOpenArray = $state(
    parameterCategories.map((el) => false),
  );

  let selectedCategory = $derived(
    categoriesOverlayOpenArray.findIndex((el) => el),
  );

  let sideBarOpen = $state(true);
  let overlayOpen = $state(false);

  let componentOpacity = $state(0.1);
  $inspect(componentOpacity);
</script>

<div
  data-role="component-demo-container"
  class="flex flew-row xl:justify-center xl:mx-0 justify-start mx-5"
>
  <div class="w-[1378px]">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <div class="flex flex-row gap-2">
      <SidebarContainer
        bind:demoScreenWidth
        {parameterCategories}
        bind:categoriesOverlayOpenArray
        {selectedCategory}
        bind:sideBarOpen
        bind:overlayOpen
        bind:componentOpacity
      ></SidebarContainer>

      <OverlayAndComponentContainer
        {Component}
        {demoScreenWidth}
        {parametersSourceArray}
        bind:statedParametersValuesArray
        {derivedParametersValuesArray}
        {parametersVisibleArray}
        {parametersParsingErrorsObject}
        {parameterCategories}
        bind:categoriesOverlayOpenArray
        {selectedCategory}
        bind:overlayOpen
        {componentOpacity}
      ></OverlayAndComponentContainer>
    </div>
  </div>
</div>
