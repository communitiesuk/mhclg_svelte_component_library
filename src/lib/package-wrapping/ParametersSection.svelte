<script>
  import Pill from '$lib/components/content/Pill.svelte';
  import DividerLine from '$lib/components/layout/DividerLine.svelte';
  import { propPillLookup } from '$lib/config.js';
  import { Accordion, AccordionItem } from 'flowbite-svelte';
  import InputForParameter from './InputForParameter.svelte';

  let {
    details,
    parameterCategories,
    parametersSourceArray,
    parametersVisibleArray,
    parametersValuesArray = $bindable(),
  } = $props();
</script>

<div data-role="parameters-section" class="mx-auto">
  <h5 class="mb-6 underline underline-offset-4">Parameters</h5>
  <div class="flex flex-row gap-8">
    <div class="flex flex-row gap-8">
      <p class="m-0 p-0 font-bold">Key</p>
      <div class="flex flex-row gap-2 mb-6">
        <Pill
          size="extraSmall"
          textContent={propPillLookup[true].text}
          bgColor={propPillLookup[true].bgColor}
          textColor={propPillLookup[true].textColor}
          borderRadius="15px"
          padding={propPillLookup[true].padding}
          tailwindClass={'self-start'}
        ></Pill>
        <p
          class="m-0 p-0 text-sm"
          style="color: {propPillLookup[true].bgColor}"
        >
          {'Parameters with this label are props which are passed directly to the <' +
            details.name +
            '> component.'}
        </p>
      </div>
      <div class="flex flex-row gap-2">
        <Pill
          size="extraSmall"
          textContent={propPillLookup[false].text}
          bgColor={propPillLookup[false].bgColor}
          textColor={propPillLookup[false].textColor}
          borderRadius="15px"
          padding={propPillLookup[false].padding}
          tailwindClass={'self-start'}
        ></Pill>
        <p
          class="m-0 p-0 text-sm"
          style="color: {propPillLookup[false].bgColor}"
        >
          {'Parameters with this label are used in the calculation of a prop which is passed directly to the <' +
            details.name +
            '> component.'}
        </p>
      </div>
    </div>
  </div>
  <DividerLine margin="5px 0px 15px 0px"></DividerLine>
  <div class="mb-6" data-role="parameters-container">
    {#each [0, 1, 2] as columnNumb}
      <div data-role="parameters-container-column" class="min-w-60">
        {#each parameterCategories as category, i}
          {#if i % 3 === columnNumb}
            {@const visibleParametersForCategory = parametersSourceArray.filter(
              (el) =>
                el.category === category &&
                (el.inputType || 'label' in el) &&
                parametersVisibleArray[el.index]
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
                          <DividerLine margin="15px 0px 15px 0px"></DividerLine>
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
    {/each}
  </div>
  <DividerLine margin="15px 0px 15px 0px"></DividerLine>
</div>

<style>
  [data-role='parameters-section'] {
    max-width: 1024px;
  }
  [data-role='parameters-container'] {
    display: flex;
    gap: 10px;
  }

  [data-role='parameters-container-column'] {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  [data-role='parameters-category-group'] {
    border: 1px solid #e5e7eb;
  }
</style>
