<script>
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import DoubleChevronButton from "$lib/icons/DoubleChevronButton.svelte";
  import SingleChevronButtonWithLabel from "$lib/icons/SingleChevronButtonWithLabel.svelte";
  import { Tabs, TabItem, Range, Label } from "flowbite-svelte";
  import InputForParameterUpdated from "$lib/package-wrapping/InputForParameterUpdated.svelte";
  import ScreenSizeRadioUpdated from "$lib/package-wrapping/ScreenSizeRadioUpdated.svelte";

  let {
    Component,
    parametersSourceArray,
    parametersVisibleArray,
    bindingsParametersValuesArray,
    parametersValuesArray = $bindable(),
    demoScreenWidth = $bindable(),
  } = $props();

  let parameterCategories = $derived(
    [...new Set(parametersSourceArray.map((el) => el.category))].map((el) => ({
      name: el,
      value: el,
    })),
  );

  let categoriesOverlayOpenArray = $state([]);

  $effect(() => {
    categoriesOverlayOpenArray = parameterCategories.map((el) => false);
  });

  let selectedCategory = $derived(
    categoriesOverlayOpenArray.findIndex((el) => el),
  );

  let selectedCategoryParameters = $derived(
    parametersSourceArray.filter(
      (el) =>
        el.category === parameterCategories[selectedCategory]?.name &&
        (el.inputType || "label" in el) &&
        parametersVisibleArray[el.index],
    ),
  );

  let sideBarOpen = $state(true);
  let overlayOpen = $state(false);

  let componentOpacity = $state(0.1);

  let componentWidth = $state();
  let componentHeight = $state();
</script>

<div
  data-role="component-demo-container"
  class="flex flew-row xl:justify-center xl:mx-0 justify-start mx-5"
>
  <div class="w-[1378px]">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <div class="flex flex-row gap-2">
      <div>
        {#if sideBarOpen}
          <div data-role="sidebar-container" class="px-1 pt-0 pb-2">
            <Tabs tabStyle="underline">
              <div
                class="flex flex-row justify-between items-center w-full pr-1"
              >
                <div class="flex flex-row gap-2">
                  <TabItem
                    open={true}
                    title={"Parameters"}
                    defaultClass="text-lg"
                  >
                    <div class="flex flex-col gap-0 m-0 p-0">
                      {#each parameterCategories as category, index}
                        <button>
                          <div
                            class="flex flex-row gap-0 justify-start items-center"
                          >
                            <SingleChevronButtonWithLabel
                              text={category.name}
                              {index}
                              bind:openArray={categoriesOverlayOpenArray}
                              bind:overlayOpen
                              open={categoriesOverlayOpenArray[index] &&
                                overlayOpen}
                            ></SingleChevronButtonWithLabel>
                          </div>
                        </button>
                      {/each}
                    </div>
                  </TabItem>
                  <TabItem
                    open={false}
                    title={"Container width"}
                    defaultClass="text-lg"
                    ><ScreenSizeRadioUpdated bind:demoScreenWidth
                    ></ScreenSizeRadioUpdated>
                  </TabItem>
                </div>
                <DoubleChevronButton
                  bind:open={sideBarOpen}
                  onClickFunction={() => {
                    sideBarOpen = !sideBarOpen;
                  }}
                ></DoubleChevronButton>
              </div>
            </Tabs>
            {#if overlayOpen && selectedCategory > -1}
              <DividerLine margin="10px 0px"></DividerLine>
              <div class="ml-2 mr-4 flex flex-row gap-4 items-center">
                <Label class="text-lg text-[#6b7280]">Component opacity:</Label>
                <div class="grow">
                  <Range
                    id="range1"
                    bind:value={componentOpacity}
                    min="0"
                    max="0.5"
                    step="0.1"
                  />
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <div class="mt-2 inline-block">
            <div
              data-role="sidebar-floating-button"
              class="flex flex-row items-center justify-center p-2"
            >
              <DoubleChevronButton
                bind:open={sideBarOpen}
                onClickFunction={() => {
                  sideBarOpen = !sideBarOpen;
                }}
              ></DoubleChevronButton>
            </div>
          </div>
        {/if}
      </div>
      <div data-role="component-and-overlay-container">
        {#if overlayOpen && selectedCategory > -1}
          <div
            data-role="overlay-container"
            class="absolute z-[2] p-1 m-0"
            style="width: {componentWidth +
              2}px; min-width: 640px; height: {componentHeight}px;"
          >
            <div class="m-3 flex flex-row justify-between">
              <h6 class="underline underline-offset-4">
                {parameterCategories.find((el, i) => i === selectedCategory)
                  .name}
              </h6>
              <DoubleChevronButton
                bind:open={overlayOpen}
                onClickFunction={() => {
                  overlayOpen = !overlayOpen;
                  if (!overlayOpen) {
                    categoriesOverlayOpenArray = categoriesOverlayOpenArray.map(
                      (el) => false,
                    );
                  }
                }}
              ></DoubleChevronButton>
            </div>
            <DividerLine></DividerLine>
            <div data-role="grid-container" class="m-2 p-5 text-base">
              <div data-role="item" class="font-bold">Parameter</div>
              <div data-role="item" class="font-bold">Value</div>
              <div data-role="item" class="font-bold">Description</div>
              {#each selectedCategoryParameters as parameter}
                <div class="col-span-full">
                  <DividerLine></DividerLine>
                </div>
                <div data-role="item">{parameter.name}</div>
                <div data-role="item">
                  <InputForParameterUpdated
                    {parameter}
                    bind:value={parametersValuesArray[parameter.index]}
                    boundedValue={bindingsParametersValuesArray[
                      parameter.index
                    ]}
                  ></InputForParameterUpdated>
                </div>
                <div data-role="item">Description text something something</div>
              {/each}
            </div>
          </div>
        {/if}
        <div
          data-role="component-container-centered"
          class="px-0 py-5"
          style="width: {demoScreenWidth}px;"
        >
          <div
            class="z-[1]"
            style="z-index: 1; min-height: 600px; opacity: {overlayOpen
              ? componentOpacity
              : 1};"
            bind:clientWidth={componentWidth}
            bind:clientHeight={componentHeight}
          >
            {@render Component()}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  [data-role="sidebar-container"] {
    width: 346px;
    border: solid #d1d5db 1px;
    border-radius: 5px;
  }

  [data-role="sidebar-floating-button"] {
    border: solid #d1d5db 1px;
    border-radius: 5px;
  }

  [data-role="component-and-overlay-container"] {
    display: inline-block;
  }

  [data-role="overlay-container"] {
    border: solid #d1d5db 1px;
    border-radius: 5px;
  }

  [data-role="component-container-centered"] {
    border: solid #d1d5db 1px;
    border-radius: 5px;
  }

  [data-role="grid-container"] {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 20px;
    width: 100%;
  }

  [data-role="item"] {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #6b7280;
  }
</style>
