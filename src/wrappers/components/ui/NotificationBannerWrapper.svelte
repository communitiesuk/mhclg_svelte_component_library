<script module>
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  /**
   * !  More documentation is provided on the component library's user guide page.
   */

  /**
   * ! STEP 1 - Adding component metadata
   * CUSTOMISETHIS  Update the status for this component.
   * && 	statusObject.progress determines which pill is shown against the component's name.
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
        obj: { Accessible: true, Responsive: true, "Prog. enhanced": true },
        visibleOnHompepage: false,
      },
      {
        obj: { Reviewed: false, Tested: false },
        visibleOnHomepage: false,
      },
    ],
  };

  /**
   * CUSTOMISETHIS  Update detailsArray to provide description of what this component does and when it should be used.
   * &&   By default the detailsArray includes description and context. The description is intended to explain what the component does, the context is intended to explain when the component will be used.
   * ?  Within the array, each object has an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content (e.g. this can be used for including links to other pages).
   * ?  You can add other categories to the detailsArray or, if you need a more flexible solution, edit the WrapperInformation snippet directly.
   *
   */
  let descriptionArray = [
    "Use the notification banner component to tell the user about something they need to know about, but that's not directly related to the page content.",
    'Based on the <a href="https://design-system.service.gov.uk/components/notification-banner/" target="_blank" rel="noopener noreferrer">GOV.UK Design System notification banner component</a>.',
  ];

  let contextArray = [
    "Use the 'neutral' type for general information (e.g., service delays, upcoming deadlines).",
    "Use the 'outcome' type (green banner) with role='alert' to confirm a user action has succeeded.",
    "Avoid showing more than one banner per page.",
  ];

  let detailsArray = [
    {
      label: "Description",
      arr: descriptionArray,
      visibleOnHomepage: true,
      markdown: true,
    },
    {
      label: "Context",
      arr: contextArray,
      visibleOnHomepage: false,
      markdown: true,
    },
  ];

  /**
   * CUSTOMISETHIS  Update connectedComponentsArray to provide links to any children, parent or related components.
   */
  let connectedComponentsArray = [];
</script>

<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import { browser } from "$app/environment";

  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";
  import ParsingErrorToastsContainer from "$lib/package-wrapping/ParsingErrorToastsContainer.svelte";
  import ComponentDemo from "$lib/package-wrapping/ComponentDemo.svelte";

  import { kebabToPascalCase } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { createBindableParametersValuesArray } from "$lib/utils/package-wrapping-specific/createBindableParametersValuesArray.js";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";

  import { defaultScreenWidthBreakpoints } from "$lib/config.js";

  import NotificationBanner from "$lib/components/ui/NotificationBanner.svelte";
  import Examples from "./notification-banner/Examples.svelte";

  let { data } = $props();

  /**
   * DONOTTOUCH *
   * ? 		uses the page url to identify the name of the component and the folder it belongs to (folder is only used by snippets exported to the homepage to link back to this page).
   */
  let pageInfo = page.url.pathname.split("/");
  let pageName = kebabToPascalCase(pageInfo[pageInfo.length - 1]);

  /**
   * DONOTTOUCH *
   * ? 		demoScreenWidth is a reactive variable which tracks which screen size the user has selected for demoing the component
   */
  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  /**
   * ! Step 2 - Adding binded props
   * CUSTOMISETHIS  Define any binded props
   * && 		Any props which are updated inside the component but accessed outside should be declared here using the $state() rune. They can then be added to the parameterSourceArray below.
   * &&     Also note that they must also be passed to component using the bind: directive (e.g. <ExampleComponent bind:exampleBindableProp>)
   */

  /**
   * ! Step 3 - Add your props
   * CUSTOMISETHIS  Add your parameters to the array.
   * && 		parametersSourceArray is where you define any props for the component. All props should be listed in the parametersSourceArray.
   * &&     Initial values should be provided for all props which either (i) are binded, or (ii) can be modified using the demo UI.
   * &&     Values should also be provided for functions and svelte snippets - which cannot be modified by the user to prevent security issues.
   * &&     Some props may be derived from other props. These should still be listed in the parametersSourceArray, but their value should be left empty. Their value can then be defined further down the page.
   * ?      For each prop, the following fields are available:
   * ? 		  <name> (required, must be unique) -  Name of the parameter which is passed to the component. The name can also be referenced in the calculation of derived parameters which depend on this value.
   * ?      <category> - (required) - Used for separating parameters into different groups.
   *
   * ?      <isBinded> - (optional, default = false) - Should be set to true, if the prop is utilising the bind:directive. Note that for bind to work, the prop must also be defined in step 1 using the $state() rune and passed to the component separately as bindable (e.g. bind:thisProp).
   *
   *
   * ?      <options> - (required for $state() props which can be modified using dropwdown or radio inputs). <options> should contain an array of strings. If <value> is null or absent, the initial value will be taken from the first entry in the options array.
   * ?      <value> - (Should be null or absent for derived props. For all others props it's required, unless there is an options field). Used to set the initial value of the prop.
   *
   * ?      <propType> - (optional) - Has two use cases:
   * ?      (i) set to 'fixed' to prevent users editing the value.
   * ?      (i) set to 'radio' to have options selectable via the radio input (uses dropdown by default).
   *
   * ?      <visible> - (optional, default = true). Hides prop in the UI if certain conditions are not met. Specify an object with a name - the parameter that you want to check against and a value - the value that the named parameters need to equal for this input to be visible.
   * ?      The Line component provides an example of the <visible> field in action, showing and hiding props based on <includeMarkers>
   * ?      If you want the form to be visible only if multiple conditions are met, you can provide an array of conditional objects instead.
   *
   * ?      <rows> - (optional, default = 1, only use with $state() where typeof value === "string"). Sets the numbers of rows used by the textArea input.
   *
   * ?      <functionElements> - (optional, only used where typeof value === "function") - <functionElements> can have three optional properties:
   * ?      (i) 'functionAsString': Should be set as a string copy of the function itself. Used to display the function in the demo UI.
   * ?      (ii) 'counter': For use with event handler functions. Should be set to 0. Then putting 'this.functionElements.counter += 1;' in the function body will cause the counter to update each time the function is triggered.
   * ?      (iii) 'dataset': For use with event handler fuctions. Should be an object - then putting 'Object.keys(this.functionElements.dataset).forEach((el) => { this.functionElements.dataset[el] = event.currentTarget.dataset[el]; });' in the function body will cause the object to update each time the function is triggered.
   *
   * ?      <description> - (optional, but strongly encouraged). Describes what the parameter does and best practice uses for it. The description can be a string, an object with a markdown field (true or false) and arr field, or a svelte snippet.
   *
   * ?      <isProp> - (optional, default = true) - Should be set to false for paramters which are not actually passed to the component.
   * ?      <isRequired> - (optional, default = false) - Should be set to true for any props which the component will not functionally properly without (e.g. props with no default value, props which will cause erros if undefined).
   *
   */
  let parametersSourceArray = $derived(
    addIndexAndInitalValue([
      {
        name: "type",
        category: "Appearance",
        options: ["neutral", "outcome"],
        value: "neutral",
        description: {
          markdown: true,
          arr: [
            `Determines the banner style. 'neutral' is blue, 'outcome' is green (success).`,
          ],
        },
      },
      {
        name: "title",
        category: "Content",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Overrides the default title text (e.g., "Important" for neutral, "Success" for outcome). Leave blank to use default.`,
          ],
        },
        rows: 1,
      },
      {
        name: "titleHeadingLevel",
        category: "Accessibility",
        options: ["h1", "h2", "h3", "h4", "h5", "h6"],
        value: "h2",
        description: {
          markdown: true,
          arr: [`Sets the semantic heading level for the banner title.`],
        },
      },
      {
        name: "content",
        category: "Content",
        isRequired: true,
        value:
          "There may be a delay in processing your application because of the coronavirus outbreak.",
        description: {
          markdown: true,
          arr: [
            `The main content. Can be a string or a Svelte Snippet.`,
            `If using as a string with <code>additionalContentHeading</code>, this content will be wrapped in a <code>&lt;p class="govuk-body"&gt;</code>.`,
            `If used as a string *without* <code>additionalContentHeading</code>, it will be wrapped in a <code>&lt;p class="govuk-notification-banner__heading"&gt;</code>.`,
            `Snippets are rendered directly. See examples for snippet usage.`,
          ],
        },
        rows: 3,
      },
      {
        name: "additionalContentHeading",
        category: "Content",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional heading rendered as an <code>&lt;h3 class="govuk-notification-banner__heading"&gt;</code>.`,
            `<strong>Use this when you also want to provide separate body text via the <code>content</code> prop.</strong>`,
            `When this is set, the <code>content</code> prop (if a string) will be rendered as body text (<code>&lt;p class="govuk-body"&gt;</code>).`,
            `If this prop is omitted, the <code>content</code> prop (if a string) is rendered as the primary heading (<code>&lt;p class="govuk-notification-banner__heading"&gt;</code>).`,
          ],
        },
        rows: 1,
      },
      {
        name: "additionalContentHeadingLevel",
        category: "Accessibility",
        options: ["h3", "h4", "h5", "h6"],
        value: "h3",
        description: {
          markdown: true,
          arr: [
            `Sets the semantic heading level (h3-h6) for the <code>additionalContentHeading</code>.`,
            `Only visible/relevant if <code>additionalContentHeading</code> is provided.`,
          ],
        },
      },
      {
        name: "linkText",
        category: "Content",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional text for a link rendered after the heading element (unless content is a snippet without an <code>additionalContentHeading</code>).`,
            `<strong>Requires <code>linkHref</code>.</strong>`,
          ],
        },
        rows: 1,
      },
      {
        name: "linkHref",
        category: "Content",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional URL for the link.`,
            `<strong>Requires <code>linkText</code>.</strong>`,
          ],
        },
        rows: 1,
      },
      {
        name: "titleId",
        category: "Accessibility",
        value: "govuk-notification-banner-title",
        propType: "fixed",
        description: {
          markdown: true,
          arr: [
            `Sets the ID for the title element, used by \`aria-labelledby\`.`,
          ],
        },
      },
    ]),
  );

  /**
   * DONOTTOUCH *
   * && 		Defining functions. generateValuesArray is used to create our arrays which track the $state() and $derived() props. getValue can used to access a reactive value from the $state() based on the prop name.
   */
  let generateValuesArray = function (
    parametersSourceArray,
    isEditableBoolean,
    derivedParametersObject,
  ) {
    return parametersSourceArray.map((el) => {
      let value = derivedParametersObject[el.name] ?? el.value;

      return el.isEditable === isEditableBoolean && value != null
        ? typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : value
        : null;
    });
  };

  let getValue = function (fieldName) {
    return statedParametersValuesArray[
      parametersSourceArray?.findIndex((el) => el.name === fieldName)
    ];
  };

  /**
   * DONOTTOUCH *
   * && 		statedParametersValuesArray tracks the values of $state() props as they are modified by the user using the demo UI.
   */
  let statedParametersValuesArray = $state(
    generateValuesArray(parametersSourceArray, true, {}),
  );

  /**
   *  !  Step 4 - Define values for derived parameters, and add them to.
   *  CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   *  && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   *  &&    Next, add the variables to the derivedParametersObject.
   *
   *  &&    (e.g. let derivedProp = $derived(...code for calculating value here), then derivedParametersObject = $derived({ derivedProp }))
   *
   *  &&    Note that these parameters still need to be listed in the source array (with a null or absent value).
   *  &&    You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   *  &&     The getValue() function can be helpful for deriving props based on the value of $state() prop.
   */

  let derivedParametersObject = $derived({});

  /**
   * DONOTTOUCH *
   * &&     derivedParametersValuesArray tracks the values of $derived() and fixed props.
   */
  let derivedParametersValuesArray = $derived(
    generateValuesArray(parametersSourceArray, false, derivedParametersObject),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's is a one-to-one mapping to the source array which tracks whether a parameter should be visible in the demo UI.
   */
  let parametersVisibleArray = $derived(
    trackVisibleParameters(parametersSourceArray, statedParametersValuesArray),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersObject takes the props to be passed to the component and converts them into a (parameterName: parameterValue) pattern
   * &&     parametersParsingErrorsArray tracks any errors due to attempting to use JSON.parse() on strings which do not convert to valid JavaScript objects.
   * &&     $effect() is then use to update parametersParsingErrorsObject, which tracks when errors and fixes occur.
   */

  let [parametersObject, parametersParsingErrorsArray] = $derived(
    createParametersObject(
      parametersSourceArray,
      statedParametersValuesArray,
      derivedParametersValuesArray,
    ),
  );

  let parametersParsingErrorsObject = $state({});

  $effect(() => {
    parametersParsingErrorsArray.forEach((el) => {
      parametersParsingErrorsObject[el] = true;
    });

    Object.keys(parametersParsingErrorsObject).forEach((el) => {
      if (!parametersParsingErrorsArray.includes(el)) {
        parametersParsingErrorsObject[el] = false;
      }
    });
  });

  /**
   * DONOTTOUCH *
   * && 		copyParametersToClipboard simply takes the set of props being passed to the component, and replaces any function with their functionAsString property. This is necessary because actual functions cannot be written to parsed into a string, and therefore can't be copied to the clipboard.
   */

  let copyParametersToClipboardObject = $derived(
    Object.fromEntries(
      Object.entries(parametersObject).map(([key, value]) => [
        key,
        typeof value === "function"
          ? parametersSourceArray.find((el) => el.name === key)
              ?.functionElements?.functionAsString
          : value,
      ]),
    ),
  );
</script>

<!--
&&  WrapperNameAndStatus and WrapperInformation are passed to the WrapperDetails component. They are also exported and then imported on the homepage, and then used (again by the WrapperDetails component) to provide a link and info to this component. 
  -->

{#snippet WrapperNameAndStatus(name, folder, subFolder, homepage)}
  <BaseNameAndStatus
    {name}
    {folder}
    {subFolder}
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
  !   Step 5 - Create a context for the component and pass in any binded props using the bind:directive
  CUSTOMISETHIS   Create a context in which your component is commonly used (e.g. wrap chart components within SVGs). Pass through binded props separately (e.g. <Component {...parametersOnject} bind:bindedProp></Component>)
 -->
{#snippet Component()}
  <div class="p-8">
    <NotificationBanner {...parametersObject}></NotificationBanner>
  </div>
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
  &&          Renders toast components based on tracking parsing errors and fixes.
 -->
<ParsingErrorToastsContainer
  {parametersParsingErrorsArray}
  {parametersParsingErrorsObject}
  onCloseFunction={(key) =>
    parametersParsingErrorsArray.filter((el) => el != key)}
></ParsingErrorToastsContainer>

<!--
    DONOTTOUCH  *
    &&          Renders the demo UI and the component itself.
-->
<ComponentDemo
  {Component}
  bind:demoScreenWidth
  {parametersSourceArray}
  bind:statedParametersValuesArray
  {derivedParametersValuesArray}
  {parametersVisibleArray}
  {parametersParsingErrorsObject}
  {copyParametersToClipboardObject}
></ComponentDemo>

<!--
    DONOTTOUCH  *
    &&          Creates a list of examples where the component is used (if any examples exist).
-->
<div id="examples" data-role="examples-section">
  <Examples></Examples>
</div>
