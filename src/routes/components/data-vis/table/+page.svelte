<script>
  // @ts-nocheck
  import { page } from "$app/stores";
  import Table from "$lib/components/data-vis/table/Table.svelte";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";

  let { data, homepage = undefined, folders } = $props();

  let details = {
    status: "in_progress",

    description: [
      {
        content:
          "Use the table component to let users compare information in rows and columns.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/table/">GDS table component</a>.',
        markdown: true,
      },
    ],

    context: undefined,

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
        name: "caption",
        category: "content",
        isProp: true,
        inputType: "input",
        value: "Caption placeholder text",
      },
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value), //&& Something
  );

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   * &&     The getValueFromParametersArray function can be helpful for calculating based on the value of another parameter.
   */

  let derivedParametersObject = $derived(homepage ?? {});

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's is a one-to-one mapping to the source array which tracks whether a parameter should be visible or not in the UI.
   */
  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersObject takes the props to be passed to the component and converts them into a (parameterName: parameterValue) pattern.
   */
  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );
</script>

<!--
  DONOTTOUCH  *
  &&          Uses details to render metadata for the component.
  -->
<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <!--
    DONOTTOUCH  *
    &&          Create input forms for each parameter based on the source array.
    -->
  <ParametersSection
    {details}
    {parametersSourceArray}
    {parametersVisibleArray}
    bind:parametersValuesArray
  ></ParametersSection>

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <!--
      DONOTTOUCH  *
      &&          Renders the radio form, allowing the user to adjust the screen width. How this affects the component will depend on how it is coded below.
      -->
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <!--
        CUSTOMISETHIS  Create a context in which your component is commonly used, then call your component.
        &&          Renders the radio form, allowing the user to adjust the screen width. How this affects the component will depend on how it is coded below.
        -->
      <div class="flex gap-4 flex-wrap items-center">
        <Table {...parametersObject}></Table>
      </div>
    </div>
  </div>

  <!--
      DONOTTOUCH  *
      &&          Creates a list of examples where the component is used (if any examples exist).
      -->
  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 class="underline underline-offset-4">Examples</h5>
  </div>
{/if}

<style>
  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role="demo-section"] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }
  [data-role="component-container-centered"] {
    background-color: #f8f8f8;
    padding: 20px 0px;
  }
</style>
