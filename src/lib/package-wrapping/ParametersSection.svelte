<script>
  import Pill from "$lib/package-wrapping/Pill.svelte";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import { propPillLookup } from "$lib/config.js";
  import {
    Accordion,
    AccordionItem,
    Tabs,
    TabItem,
    Select,
    Label,
  } from "flowbite-svelte";
  import InputForParameter from "./InputForParameter.svelte";

  import { innerWidth } from "svelte/reactivity/window";

  let {
    details,
    parametersSourceArray,
    parametersVisibleArray,
    parametersValuesArray = $bindable(),
    numberOfPropColumnsOnDesktop = 3,
  } = $props();

  let parameterCategories = $derived(
    [...new Set(parametersSourceArray.map((el) => el.category))].map((el) => ({
      name: el,
      value: el,
    })),
  );

  let reactiveNumberOfPropColumns = $derived(
    innerWidth.current >= 1024
      ? numberOfPropColumnsOnDesktop
      : innerWidth.current >= 768
        ? Math.min(numberOfPropColumnsOnDesktop, 2)
        : 1,
  );

  let parametersSectionWidth = $state();
  let tabWidthsArray = $state([]);
  let tabsWrapping = $derived(
    parametersSectionWidth <=
      tabWidthsArray.reduce((acc, curr) => acc + (curr || 0), 0),
  );

  $inspect(
    parametersSectionWidth,
    tabWidthsArray.reduce((acc, curr) => acc + (curr || 0), 0),
  );

  $inspect(tabsWrapping);

  let selectedCategory = $state(parameterCategories[0].value);
</script>

<div data-role="parameters-section" class="mx-auto px-5">
  <div bind:clientWidth={parametersSectionWidth}>
    <h5 class="mb-6 underline underline-offset-4">Parameters</h5>
    <div class="flex flex-row gap-8">
      <div class="flex flex-row gap-8 pr-4">
        <p class="m-0 p-0 font-bold">Key</p>
        <div class="flex flex-row gap-4 mb-2">
          <div class="flex flex-row gap-2 flex-1">
            <Pill
              size={propPillLookup[true].size}
              textContent={propPillLookup[true].text}
              bgColor={propPillLookup[true].bgColor}
              textColor={propPillLookup[true].textColor}
              borderRadius="15px"
              padding={propPillLookup[true].padding}
              tailwindClass={"self-start"}
            ></Pill>
            <p
              class="m-0 p-0 text-sm"
              style="color: {propPillLookup[true].bgColor}"
            >
              {"Parameters with this label are props which are passed directly to the <" +
                details.name +
                "> component."}
            </p>
          </div>
          <div class="flex flex-row gap-2 flex-1">
            <Pill
              size={propPillLookup["bindable"].size}
              textContent={propPillLookup["bindable"].text}
              bgColor={propPillLookup["bindable"].bgColor}
              textColor={propPillLookup["bindable"].textColor}
              borderRadius="15px"
              padding={propPillLookup["bindable"].padding}
              tailwindClass={"self-start"}
            ></Pill>
            <p
              class="m-0 p-0 text-sm"
              style="color: {propPillLookup['bindable'].bgColor}"
            >
              {"Parameters with this label are bindable props which are accessible outside the <" +
                details.name +
                "> component but updated within it."}
            </p>
          </div>
          <div class="flex flex-row gap-2 flex-1">
            <Pill
              size={propPillLookup[false].size}
              textContent={propPillLookup[false].text}
              bgColor={propPillLookup[false].bgColor}
              textColor={propPillLookup[false].textColor}
              borderRadius="15px"
              padding={propPillLookup[false].padding}
              tailwindClass={"self-start"}
            ></Pill>
            <p
              class="m-0 p-0 text-sm"
              style="color: {propPillLookup[false].bgColor}"
            >
              {"Parameters with this label are used in the calculation of a prop which is passed to the <" +
                details.name +
                "> component."}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <DividerLine margin="5px 0px 15px 0px"></DividerLine> -->
    <div class="mb-6" data-role="parameters-container">
      {#if true}
        <Tabs
          tabStyle="underline"
          defaultClass="flex flex-row flex-wrap gap-2 m-0 p-0"
        >
          {#each parameterCategories as category, i}
            {@const visibleParametersForCategory = parametersSourceArray.filter(
              (el) =>
                el.category === category.name &&
                (el.inputType || "label" in el) &&
                parametersVisibleArray[el.index],
            )}
            <div bind:clientWidth={tabWidthsArray[i]}>
              <TabItem
                open={selectedCategory === category.name}
                title={category.name}
                defaultClass="text-lg "
              >
                <div class="flex flex-col">
                  {#each visibleParametersForCategory as parameter, i}
                    <div>
                      <InputForParameter
                        source={parameter}
                        bind:value={parametersValuesArray[parameter.index]}
                      ></InputForParameter>
                      {#if i < visibleParametersForCategory.length - 1}
                        <DividerLine margin="15px 0px 15px 0px"></DividerLine>
                      {/if}
                    </div>
                  {/each}
                </div>
              </TabItem>
            </div>
          {/each}
        </Tabs>
      {:else}
        <Label>
          Select an option
          <Select
            class="mt-2"
            items={parameterCategories}
            bind:value={selectedCategory}
          />
        </Label>{/if}
      <!-- {#each [...Array(reactiveNumberOfPropColumns).keys()] as columnNumb}
        <div data-role="parameters-container-column" class="min-w-60">
          {#each parameterCategories as category, i}
            {#if i % reactiveNumberOfPropColumns === columnNumb}
              {@const visibleParametersForCategory =
                parametersSourceArray.filter(
                  (el) =>
                    el.category === category &&
                    (el.inputType || "label" in el) &&
                    parametersVisibleArray[el.index],
                )}

              <div
                data-role="parameters-category-group"
                class="px-4 pt-0 pb-4 rounded-xl bg-gray-200 bg-opacity-25"
              >
                <Accordion flush>
                  <AccordionItem>
                    <span class="text-2xl text-black" slot="header"
                      >{category}</span
                    >
                    <div class="flex flex-col">
                      {#each visibleParametersForCategory as parameter, i}
                        <div>
                          <InputForParameter
                            source={parameter}
                            bind:value={parametersValuesArray[parameter.index]}
                          ></InputForParameter>
                          {#if i < visibleParametersForCategory.length - 1}
                            <DividerLine margin="15px 0px 15px 0px"
                            ></DividerLine>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            {/if}
          {/each}
        </div>
      {/each} -->
    </div>
    <DividerLine margin="15px 0px 15px 0px"></DividerLine>
  </div>
</div>

<style>
  [data-role="parameters-section"] {
    max-width: 1024px;
  }
  /*[data-role="parameters-container"] {
    display: flex;
    gap: 10px;
  }

  [data-role="parameters-container-column"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  [data-role="parameters-category-group"] {
    border: 1px solid #e5e7eb;
  }*/
</style>
