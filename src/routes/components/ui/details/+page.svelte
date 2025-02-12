<script>
  import Details from "$lib/components/ui/Details.svelte";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";

  let { homepage = undefined } = $props();

  let details = {
    status: "in_progress",
    description: [
      {
        content: "Allows the user to see more information.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/details/" target="_blank" rel="noopener noreferrer">GOV.UK Design System checkbox component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the details component to make a page easier to scan when it contains information that only some users will need.",
      },
      {
        content:
          "Do not use the details component to hide information that the majority of your users will need.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };

  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "textColor",
        category: "styling",
        isProp: true,
        inputType: "input",
        value: "black",
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let derivedParametersObject = $derived(homepage ?? {});

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );
</script>

<ComponentDetails {homepage} {details} />

<ParametersSection
  {details}
  {parametersSourceArray}
  {parametersVisibleArray}
  bind:parametersValuesArray
></ParametersSection>

<Details {...parametersObject}></Details>
