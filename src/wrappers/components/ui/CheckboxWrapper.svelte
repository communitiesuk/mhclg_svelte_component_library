<script module>
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  /**
   * CUSTOMISETHIS  Update the status for this component.
   * && 	statusObject.progress determines which pill is shown against the component's name, based
   * ?  progress must be one of:
   * ?  1. 'To be developed' - This is the inital status, when the component files have been generated but the work to actually build out the code for the component has not started.
   * ?  2. 'In progress' - This is the status while the component is being built. This lets developers know that the full fuctionality of the component has not been completed and that it may change in the future.
   * ?  3. 'Baseline completed' - This means the core functionality of the component has been completed and it is ready for use. However, small changes to the component may still occur in the future.
   * ?  4. 'In use' - This means the component is completed and being using in products. Therefore, developers need to be mindful of its existing uses when making any changes.
   * &&   statusObject.statusRow determines the sets of ticks/crosses shown below the component name.
   * &&   The ticks/crosses are separated into rows with one row for each entry of the statusRows array.
   * &&   Any entries can be included, but by default the following are provided, initally all set to false:
   * ?  Accessible - The component has been developed with reference to the WCAG guidelines. The component has been checked against our accessibility checklist, including testing it on screen readers.
   * ?  Responsive - The component has been checked against our mobile design checklist. The component has been tested on multiple mobile devices.
   * ?  Prog. enhanced - Potential progressive enhancements have been considered, and if appropriate, implemented for this component.
   * ?  Reviewed - The component requirements, functionality and code have been reviewed and approved.
   * ?  Tested - The component's use within products or prototyping (i.e. in a real-use example, using real props) has been tested and approved.
   */
  let statusObject = {
    progress: "Baseline completed",
    statusRows: [
      {
        obj: { Accessible: false, Responsive: false, "Prog. enhanced": false },
        visibleOnHompepage: false,
      },
      {
        obj: { Reviewed: true, Tested: false },
        visibleOnHomepage: false,
      },
    ],
  };

  /**
   * CUSTOMISETHIS  Update detailsArray to provide description of what this component does and when it should be used.
   * &&   By default the detailsArray includes description and context. The description is intended to explain what the component does, the context is intended to explain when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with).
   * ?  Within each array, an object has an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content (e.g. this can be used for including links to other pages).
   * ?  You can add other categories to the detailsArray or, if you need a more flexible solution, edit the WrapperInformation snippet directly.
   *
   */
  let descriptionArray = [
    {
      content:
        "A checkbox component that allows users to select one or more options from a list.",
    },
    {
      content:
        'Based on the <a href="https://design-system.service.gov.uk/components/checkboxes/" target="_blank" rel="noopener noreferrer">GOV.UK Design System checkbox component</a> pattern.',
      markdown: true,
    },
  ];

  let contextArray = [
    {
      content:
        "Use the checkbox component when you need to let users select one or more options from a list.",
    },
    {
      content:
        "You can also use checkboxes to toggle a single option on or off.",
    },
  ];

  let detailsArray = [
    { label: "Description", arr: descriptionArray, visibleOnHomepage: true },
    { label: "Context", arr: contextArray, visibleOnHomepage: false },
  ];

  /**
   * CUSTOMISETHIS  Update connectedComponentsArray to provide links to any child, parent or related components.
   */
  let connectedComponentsArray = [];
</script>

<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";
  import ComponentDemo from "$lib/package-wrapping/ComponentDemo.svelte";

  import { browser } from "$app/environment";
  import Checkbox from "$lib/components/ui/Checkbox.svelte";
  import Examples from "./checkbox/Examples.svelte";

  import { defaultScreenWidthBreakpoints } from "$lib/config.js";

  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { createBindableParametersValuesArray } from "$lib/utils/package-wrapping-specific/createBindableParametersValuesArray.js";

  let { data } = $props();

  /**
   * CUSTOMISETHIS  Choose how many columns to split prop/parameter groups into on desktop. Note that this will automatically get reduced to 2 and then 1 column on narrow screen widths.
   */
  let numberOfPropColumnsOnDesktop = 3;

  /**
   * DONOTTOUCH *
   * ? 		uses the page url to identify the name of the component and the folder it belongs to (folder is only used by snippets exported to the homepage to link back to this page).
   */
  let pageInfo = page.url.pathname.split("/");
  let pageName = textStringConversion(
    pageInfo[pageInfo.length - 1],
    "title-first-word",
  );

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

  let selectedValues = $state([]);

  $inspect(selectedValues);

  let parametersSourceArray = $derived(
    addIndexAndInitalValue([
      {
        name: "legend",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "How would you like to be contacted?",
      },
      {
        name: "hint",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "Select all that apply",
      },
      {
        name: "selectedValues",
        category: "Content",
        isProp: true,
        isBindable: true,
        inputType: "binded",
        value: selectedValues,
      },
      {
        name: "name",
        category: "Form",
        isProp: true,
        inputType: "input",
        value: "contact-preferences",
      },
      {
        name: "options",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: JSON.stringify(
          [
            {
              value: "email",
              label: "Email",
              hint: "We'll send updates to your inbox",
            },
            {
              value: "sms",
              label: "Text message",
              hint: "UK mobile numbers only",
            },
            {
              value: "phone",
              label: "Phone call",
              hint: "We'll call during business hours",
            },
            {
              value: "none",
              label: "Do not contact me",
              exclusive: true,
            },
          ],
          null,
          2,
        ),
      },
      {
        name: "error",
        category: "Validation",
        isProp: true,
        inputType: "input",
        value: "",
      },
      {
        name: "isPageHeading",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: "false",
      },
      {
        name: "small",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: "false",
      },
      {
        name: "legendSize",
        category: "UI Options",
        isProp: true,
        inputType: "dropdown",
        options: ["l", "m", "s"],
        value: "l",
      },
      {
        name: "validate",
        category: "Validation",
        isProp: true,
        inputType: "function",
        value: `function validateContactPreferences(values) {
  if (values.length === 0) {
    return "Please select at least one contact method";
  }
  if (values.includes("none") && values.length > 1) {
    return "You cannot select other options when opting out of all communications";
  }
  if (
    values.includes("email") &&
    !values.includes("sms") &&
    !values.includes("none")
  ) {
    return "Please select SMS as a backup digital contact method when using email";
  }
  return undefined;
}`,
      },
      {
        name: "test",
        category: "UI Options",
        isProp: true,
        inputType: "input",
        value: "l",
        rows: 5,
      },
    ]).map((el) => ({
      ...el,
      handlerFunction:
        el.inputType === "event"
          ? (el.handlerFunction ??
            function (event) {
              defineDefaultEventHandler(
                event,
                parametersSourceArray,
                parametersValuesArray,
                el.name,
              );
            })
          : null,
    })),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's initial values are simply take from the source array with a one-to-one mapping.
   * &&     This array is then used to track the values associated with each parameter as they are modified by the user using form inputs.
   */
  let parametersValuesArray = $state(
    parametersSourceArray.map((el) => el.value),
  );

  let bindingsParametersValuesArray = $derived(
    parametersSourceArray.map((el) => el.value),
  );

  $inspect(bindingsParametersValuesArray);

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   * &&     The getValueFromParametersArray function can be helpful for calculating based on the value of another parameter.
   */
  let options = $derived(
    JSON.parse(
      getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        "options",
      ),
    ),
  );

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can add additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     We recommend defining the values of these parameters above and just referencing them in this object. If you prefer to define them in-line, you can do so using the (parameterName : parameterValue) pattern.
   */
  let derivedParametersObject = $derived({ options });

  $inspect(derivedParametersObject);

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's is a one-to-one mapping to the source array which tracks whether a parameter should be visible or not in the UI.
   */
  let parametersVisibleArray = $derived(
    trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersObject takes the props to be passed to the component and converts them into a (parameterName: parameterValue) pattern.
   */
  let parametersObject = $derived(
    createParametersObject(
      parametersSourceArray,
      parametersValuesArray,
      derivedParametersObject,
    ),
  );
  /**
   *  CUSTOMISETHIS Add any additional JS specific to the component wrapper here
   *
   */
</script>

<!--
  &&  WrapperNameAndStatus and WraaperInformation are passed to the WrapperDetails component. They are also exported and then imported on the homepage, and then used (again by the WrapperDetails component) to provide a link and info to this component. 
  -->
{#snippet WrapperNameAndStatus(name, folder, homepage)}
  <BaseNameAndStatus
    {name}
    {folder}
    {homepage}
    {statusObject}
    parentFolder="components-update"
  ></BaseNameAndStatus>
{/snippet}

{#snippet WrapperInformation(homepage)}
  <BaseInformation {homepage} {detailsArray} {connectedComponentsArray}
  ></BaseInformation>
{/snippet}

<!--
DONOTTOUCH  *
&&          Uses snippets to render metadata for the component.
-->
<WrapperDetailsUpdate
  wrapper={{
    component: { WrapperInformation, WrapperNameAndStatus },
    name: pageName,
  }}
  homepage={false}
></WrapperDetailsUpdate>
<!--
  DONOTTOUCH  *
  &&          Create input forms for each parameter based on the source array.
  -->
<ParametersSection
  details={{ name: pageName }}
  {parametersSourceArray}
  {parametersVisibleArray}
  bind:parametersValuesArray
  {numberOfPropColumnsOnDesktop}
></ParametersSection>

<!-- <div data-role="demo-section" class="px-5">
  <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>


    DONOTTOUCH  *
    &&          Renders the radio form, allowing the user to adjust the screen width. How this affects the component will depend on how it is coded below.

  <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
</div> -->

<!-- <div data-role="component-container">
  <div
    data-role="component-container-centered"
    style="width: {demoScreenWidth}px;"
  >

    CUSTOMISETHIS  Create a context in which your component is commonly used, then call your component.
    &&          Renders the radio form, allowing the user to adjust the screen width. How this affects the component will depend on how it is coded below.

    <div class="flex flex-col gap-4">
      <div class="app-example-wrapper">
        <div class="p-6">
          <Checkbox {...parametersObject} />
        </div>
      </div>
    </div>
  </div>
</div> -->

{#snippet Component()}
  <div class="flex flex-col gap-4">
    <div class="p-6">
      <Checkbox {...parametersObject} bind:selectedValues />
    </div>
  </div>
{/snippet}

<ComponentDemo
  {Component}
  {parametersSourceArray}
  {parametersVisibleArray}
  {bindingsParametersValuesArray}
  bind:parametersValuesArray
  bind:demoScreenWidth
></ComponentDemo>

<!--
    DONOTTOUCH  *
    &&          Creates a list of examples where the component is used (if any examples exist).
    -->
<div data-role="examples-section" class="px-5">
  <div class="my-20">
    <h5 class="underline underline-offset-4 my-6">
      Examples of specific use cases
    </h5>
    <Examples></Examples>
  </div>

  <div class="my-20">
    <h5 class="underline underline-offset-4 my-6">
      Examples from the playground
    </h5>
  </div>
</div>
