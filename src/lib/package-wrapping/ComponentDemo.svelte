<script>
  import SidebarContainer from "./SidebarContainer.svelte";
  import OverlayAndComponentContainer from "./OverlayAndComponentContainer.svelte";
  import { Tooltip, Button } from "flowbite-svelte";

  /* incoming props from wrapper page --------------------------- */
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

  /* derive categories for the sidebar / overlay ---------------- */
  let parameterCategories = $derived(
    [
      ...new Set(
        parametersSourceArray
          .filter((_, i) => parametersVisibleArray[i])
          .map((el) => el.category),
      ),
    ].map((name) => ({ name, value: name })),
  );

  let categoriesOverlayOpenArray = $state(parameterCategories.map(() => false));
  let selectedCategory = $derived(
    categoriesOverlayOpenArray.findIndex((v) => v),
  );

  /* UI state ---------------------------------------------------- */
  let sideBarOpen = $state(true);
  let overlayOpen = $state(false);
  let componentOpacity = $state(0.1);
</script>

<!-- ===== COMPONENT DEMO ======================================= -->
<div data-role="component-demo-container" class="flex flex-col gap-2">
  <!-- header with copy button -->
  <div class="flex flex-row justify-between mb-6 mt-12">
    <h5 id="component-demo" class="underline underline-offset-4">
      Component Demo
    </h5>

    <div>
      <Button
        onclick={() =>
          navigator.clipboard.writeText(
            JSON.stringify(copyParametersToClipboardObject, null, 2),
          )}
        color="alternative"
        id="copy-props-btn"
        class="m-0 p-1.5 border-none"
      >
        <!-- simple copy icon -->
        <svg width="25" height="30">
          {#each [{ x: 8, stroke: "#6b7280", strokeWidth: "1.5" }, { x: 1, stroke: "white", strokeWidth: "3" }, { x: 1, stroke: "#6b7280", strokeWidth: "1.5" }] as rect}
            <rect
              x={rect.x}
              y={rect.x === 8 ? 2 : 8}
              width="16"
              height="20"
              rx="2"
              stroke={rect.stroke}
              stroke-width={rect.strokeWidth}
              fill="white"
            ></rect>
          {/each}
        </svg>
      </Button>
      <Tooltip trigger="click" triggeredBy="#copy-props-btn">
        Props copied to clipboard
      </Tooltip>
    </div>
  </div>

  <!-- sidebar + component stack -->
  <!-- sidebar -->
  <div class="w-full">
    <SidebarContainer
      bind:demoScreenWidth
      {parameterCategories}
      bind:categoriesOverlayOpenArray
      {selectedCategory}
      bind:sideBarOpen
      bind:overlayOpen
      bind:componentOpacity
    />
  </div>

  <!-- component & overlay -->
  <div class="flex-1 min-w-0">
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
    />
  </div>
</div>

<style>
</style>
