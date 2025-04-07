<script>
  import SidebarContainer from "./SidebarContainer.svelte";
  import OverlayAndComponentContainer from "./OverlayAndComponentContainer.svelte";

  import { Tooltip, Button } from "flowbite-svelte";

  let {
    Component,
    demoScreenWidth = $bindable(),
    parametersSourceArray,
    statedParametersValuesArray = $bindable(),
    derivedParametersValuesArray,
    parametersVisibleArray,
    parametersParsingErrorsObject,
    copyParametersToClipboardObject,
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
    <div
      class="flex flex-row justify-between mb-6 mt-12 mr-10"
      style="max-width: {(overlayOpen ? 9999 : demoScreenWidth - 15) +
        (sideBarOpen ? 346 : 60)}px;"
    >
      <h5 id="component-demo" class="underline underline-offset-4">
        Component Demo
      </h5>
      <div>
        <Button
          on:click={() => {
            navigator.clipboard.writeText(
              JSON.stringify(copyParametersToClipboardObject, null, 2),
            );
          }}
          color="alternative"
          id="click"
          class="m-0 p-1.5 border-none"
          data-role="copy-to-clipboard-button"
        >
          <svg width="25px" height="30px">
            {#each [{ x: 8, y: 2, stroke: "#6b7280", strokeWidth: "1.5px" }, { x: 1, y: 8, stroke: "white", strokeWidth: "3px" }, { x: 1, y: 8, stroke: "#6b7280", strokeWidth: "1.5px" }] as element}
              <rect
                x={element.x}
                width="16"
                y={element.y}
                height="20"
                rx="2px"
                stroke={element.stroke}
                stroke-width={element.strokeWidth}
                fill="white"
              ></rect>
            {/each}
          </svg>
        </Button>
        <Tooltip trigger="click" triggeredBy="#click"
          >Props copied to clipboard</Tooltip
        >
      </div>
    </div>
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
