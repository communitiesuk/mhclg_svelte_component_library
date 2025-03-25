<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import DoubleChevronButton from "$lib/icons/DoubleChevronButton.svelte";
  import InputForParameterUpdated from "$lib/package-wrapping/InputForParameterUpdated.svelte";

  let {
    Component,
    demoScreenWidth,
    parametersSourceArray,
    statedParametersValuesArray = $bindable(),
    derivedParametersValuesArray,
    parametersVisibleArray,
    parameterCategories,
    categoriesOverlayOpenArray,
    selectedCategory,
    overlayOpen = $bindable(),
    componentOpacity,
  } = $props();

  let componentWidth = $state();
  let componentHeight = $state();
</script>

<div data-role="component-and-overlay-container">
  {#if overlayOpen && selectedCategory > -1}
    <div
      data-role="overlay-container"
      class="absolute z-[2] p-0 m-0 overflow-scroll"
      style="width: {componentWidth +
        2}px; min-width: 768px; height: {componentHeight}px;"
    >
      <div class="p-5 flex flex-row justify-between bg-white">
        <h6 class="underline underline-offset-4">
          {parameterCategories.find((el, i) => i === selectedCategory)?.name}
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
        {#each parametersSourceArray as parameter}
          {#if parameter.category === parameterCategories[selectedCategory]?.name && parametersVisibleArray[parameter.index]}
            <div class="col-span-full">
              <DividerLine></DividerLine>
            </div>
            <div
              data-role="item"
              data-width={demoScreenWidth < 1024
                ? "col1Sm"
                : demoScreenWidth < 1280
                  ? "col1Md"
                  : "col1Lg"}
              class="m-1 hyphens-auto break-words"
            >
              {parameter.name}
            </div>
            <div
              data-role="item"
              data-width={demoScreenWidth < 1024
                ? "col2Sm"
                : demoScreenWidth < 1280
                  ? "col2Md"
                  : "col2Lg"}
            >
              <InputForParameterUpdated
                {demoScreenWidth}
                bind:statedValue={statedParametersValuesArray[parameter.index]}
                derivedValue={derivedParametersValuesArray[parameter.index]}
                {parameter}
              ></InputForParameterUpdated>
            </div>
            <div data-role="item" class="m-1">
              {#if typeof parameter.description === "string"}
                {parameter.description}
              {:else if typeof parameter.description === "object"}
                {#each parameter.description.arr as line}
                  <p>
                    {#if parameter.description.markdown}
                      {@html line}
                    {:else}
                      {line}
                    {/if}
                  </p>
                {/each}
              {:else if typeof parameter.description === "function"}
                {@render parameter.description()}
              {:else}
                -
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  <div
    data-role="component-container-centered"
    class="px-0 py-5 rounded-md {overlayOpen
      ? ''
      : 'border border-solid border-[#d1d5db]}'}"
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

<style>
  [data-role="component-and-overlay-container"] {
    display: inline-block;
  }

  [data-role="overlay-container"] {
    border: solid #d1d5db 1px;
    border-radius: 5px;
  }

  [data-role="grid-container"] {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 20px;
  }

  [data-role="item"] {
    color: #6b7280;
  }

  [data-role="item"] p:first-of-type {
    margin-top: 0px;
    padding-top: 0px;
  }

  [data-role="item"] p:last-of-type {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
  [data-width="col1Sm"] {
    max-width: 125px;
  }

  [data-width="col1Md"] {
    max-width: 175px;
  }

  [data-width="col1Lg"] {
    max-width: 225px;
  }

  [data-width="col2Sm"] {
    max-width: 350px;
  }

  [data-width="col2Md"] {
    max-width: 450px;
  }

  [data-width="col2Lg"] {
    max-width: 550px;
  }
</style>
