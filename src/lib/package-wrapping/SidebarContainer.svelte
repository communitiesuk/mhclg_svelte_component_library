<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import SingleChevronButtonWithLabel from "$lib/icons/SingleChevronButtonWithLabel.svelte";
  import DoubleChevronButton from "$lib/icons/DoubleChevronButton.svelte";
  import { Tabs, TabItem, Range, Label } from "flowbite-svelte";
  import ScreenSizeRadioUpdated from "$lib/package-wrapping/ScreenSizeRadioUpdated.svelte";

  let {
    demoScreenWidth = $bindable(),
    parameterCategories,
    categoriesOverlayOpenArray = $bindable(),
    selectedCategory,
    sideBarOpen = $bindable(),
    overlayOpen = $bindable(),
    componentOpacity = $bindable(),
  } = $props();
</script>

<div>
  {#if sideBarOpen}
    <div data-role="sidebar-container" class="px-1 pt-0 pb-2">
      <Tabs tabStyle="underline">
        <div class="flex flex-row justify-between items-center w-full pr-1">
          <div class="flex flex-row gap-2">
            <TabItem open={true} title={"Parameters"} defaultClass="text-lg">
              <div class="flex flex-col gap-0 m-0 p-0">
                {#each parameterCategories as category, index}
                  <button>
                    <div class="flex flex-row gap-0 justify-start items-center">
                      <SingleChevronButtonWithLabel
                        text={category.name}
                        {index}
                        bind:openArray={categoriesOverlayOpenArray}
                        bind:overlayOpen
                        open={categoriesOverlayOpenArray[index] && overlayOpen}
                      ></SingleChevronButtonWithLabel>
                    </div>
                  </button>
                {/each}
              </div>
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
              class="orange-500"
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
</style>
