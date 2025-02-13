<script>
  import Details from "$lib/components/ui/Details.svelte";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { page } from "$app/stores";

  let { homepage = undefined, folders } = $props();

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

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "summaryText",
        category: "content",
        isProp: true,
        inputType: "input",
        value: "Summary text",
      },
      {
        name: "detailedText",
        category: "content",
        isProp: true,
        inputType: "input",
        value:
          "This is information that only certain users need to see. It is hidden from view by default to make scanning the page easier for the majority of users who do not need to see it.",
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

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    {parametersVisibleArray}
    bind:parametersValuesArray
  ></ParametersSection>

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex gap-4 flex-wrap items-center">
        <Details {...parametersObject}></Details>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 class="underline underline-offset-4">Examples</h5>
  </div>
{/if}

<style>
  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }
  [data-role="component-container-centered"] {
    background-color: #f8f8f8;
    padding: 20px 0px;
  }
</style>
