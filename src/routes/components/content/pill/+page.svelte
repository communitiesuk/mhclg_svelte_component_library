<script>
  // @ts-nocheck
  import { page } from "$app/stores";
  import Pill from "$lib/components/content/Pill.svelte";
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

  /**
   * && 		The details object contains metadata which describes the purpose and status of the component. All keys are optional, but developers are encouraged to use them to succinctly describe the component for the benefit of future users.
   */
  let details = {
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: "in_progress",
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: [
      {
        content:
          "A compact label that provides status or metadata for a primary interface area.",
      },
      {
        content:
          'Currently relying on the <a href="https://flowbite-svelte.com/docs/components/tooltip">Flowbite tooltip</a> for hover functionality.',
        markdown: true,
      },
    ],
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: [
      {
        content:
          "Use pills to highlight status information, categories, or metadata within a user interface.",
      },
      {
        content:
          "Commonly used in headers, tables, lists, or alongside form elements to provide visual indicators or contextual information.",
      },
    ],
    /**
     * &&     childComponents - Optional detail, can be used by developers to link to components which this component relies upon.
     * ?     'name' and 'folder' must match the routes folder structure (see documentation above for 'name' and 'folder' above for available options)
     * ?      example array would be [{name: 'svg', folder: 'data-vis'},{name: 'line', folder: 'data-vis'}]
     */
    childComponents: undefined,
    /**
     * &&     requirements - Optional detail, can be used by developers to track which requirements for the component have been coded up.
     * ?      The 'description' parameter is optional (default is not to provide a description).
     * ?      For each paragraph there is an optional 'markdown' (default = false) parameter. When set to true, it uses the @html tag to render the content.
     * ?      For each paragraph there is an optional 'fulfilled' (default = false) parameter. When set to true, the text will be highlighted green and struck-through, demonstrating that this requirmeent has been coded up.
     */
    requirements: undefined,
  };

  /**
   * DONOTTOUCH *
   * && 		details.name and details.folder are added based on a) the folders prop if on the homepage, b) the $page store if on the actual wrapper page.
   */
  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  /**
   * DONOTTOUCH *
   * ? 		demoScreenWidth is a reactive variable which tracks which screen size the user has selected for demoing the component
   */
  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  /**
   * CUSTOMISETHIS  Add your parameters to the array.
   * && 		parametersSourceArray is where you define any props for the component whose initial value does not depend on other parameters. It can also be used for defining any parameters which are not passed to the component, but are used in the calculation of another parameter (An example would be a Line component's xFunction, which is calculated based on a scale, an xDomain and a graphWidth). Each prop is represented by a single object within the array.
   * ? 		  name - Required. Name of the prop which is passed to the component. The name can also be referenced in the calculation of parameters which depend on this value. Names must be unique.
   *
   * ?      category - Required. Used purely for separating props into different accordions.
   *
   * ?      isProp - Required. Is a boolean - true means it will actually be passed to the commponent, false means it will not (and will instead be used just for calculating other parameters).
   *
   * ?      inputType - Optional. This can be a form input (available options are 'input', 'numberInput', 'dropdown', 'radio', 'textArea', 'checkbox') or it can be 'event' or null.
   * ?      If it is a form input, a form component will be rendered allowing the user to change the value of this parameter and see how the component updates.
   * ?      If inputType === 'event', the user cannot change the value of this prop, but a tracker will be rendered to indicate when the event handler is called.
   * ?      If inputType is null, then no form input will be rendered. The prop name and description could still be rendered in its place if the 'label' field is defined - see below for more info.
   *
   * ?      value - optional. Used to set the default initial value for the parameter. Note that certain inputTypes don't require a value: dropdowns and radios will calculate it as the first element in their options array.
   * ?      In addition, it's worth noting that the pattern is a bit different for parameters with inputType === "event": in this case the prop passed to the component will be the handlerFunction, and the value will be the output of that function. For events, unless the handlerFunction and value keys are defined, defaults are added automatically added - so it's best practice to not define these keys.
   *
   * ?      options - required for ['dropdown', 'radio'].includes(inputType), redundant otherwise. Provides an array representing the options that can be passed as the prop to the component.
   *
   * ?      visible - optional. Some props are irrelevant unless another prop is set to a particular value (e.g. in a Line component, markerRadius is irrelevant if includeMarkers is false). The visible key allows you to dynamically hide a props' input forms. You can do this by specifying an object with name - the parameter that you want to check against, and value - the value that the named parameter needs to be equal to for this input form to be visible. (e.g. for markerRadius we would use {name: includeMarkers, value: true}).
   * ?      If you want the form to be visible only if multiple conditions are met, you can provide an array of condition objects instead.
   *
   * ?      handlerFunction - optional. Redundant unless inputType === 'event'. You can provide a function that will run when the specified event occurs. A default function is provided if handlerFunction is set to undefined - using the default handlerFunction is recommended.
   *
   * ?      label - optional. If the label field is defined, then a description (and optional code snippet - see below) will be rendered. When inputType is null it is best practice to include a label so users can still see which props are being used by the component and how they're being calculated.
   *
   * ?      exampleCode - optional, redundant when label is not defined. Allows you to provide a snippet of example code for props which are calculated rather than inputted, demonstrating what you might set these props as (e.g. for a line function the snippet: line().x((d) => xFunction(d.x)).y((d) => yFunction(d.y)).
   * ?      This input is rendered as html, so you can use <br> for line breaks and &emsp; for tabs.
   */
  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "textContent",
        category: "content",
        isProp: true,
        inputType: "input",
        value: "Pill placeholder text",
      },
      {
        name: "bgColor",
        category: "styling",
        isProp: true,
        inputType: "input",
        value: "pink",
      },
      {
        name: "textColor",
        category: "styling",
        isProp: true,
        inputType: "input",
        value: "black",
      },
      {
        name: "size",
        category: "styling",
        isProp: true,
        inputType: "dropdown",
        options: ["extraSmall", "small", "medium", "large"],
      },
    ]);

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's initial values are simply take from the source array with a one-to-one mapping.
   * &&     This array is then used to track the values associated with each parameter as they are modified by the user using form inputs.
   */
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

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can add additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     We recommend defining the values of these parameters above and just referencing them in this object. If you prefer to define them in-line, you can do so using the (parameterName : parameterValue) pattern.
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
    <h5 id="component-demo" class="mb-6 mt-12 underline underline-offset-4">
      Component Demo
    </h5>
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
        <h6>A placeholder title of some kind</h6>
        <Pill {...parametersObject} borderRadius="5px" tooltipText="false"
        ></Pill>
      </div>
    </div>
  </div>

  <!--
    DONOTTOUCH  *
    &&          Creates a list of examples where the component is used (if any examples exist).
    -->
  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 id="examples" class="underline underline-offset-4">Examples</h5>
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
