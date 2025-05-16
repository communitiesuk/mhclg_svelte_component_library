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
        obj: { Accessible: false, Responsive: false, "Prog. enhanced": false },
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
    "The <code>SideNav</code> component displays a vertical navigation menu, typically used in a sidebar.",
    "It's designed to show links relevant to the current main section of an application.",
    "It can display a flat list of items or items grouped under titles.",
    "Active items can be highlighted, and an active item can also display a nested list of sub-items, often used for in-page navigation (linking to sections with hash URLs like <code>#introduction</code>, <code>#details</code>, etc.).",
  ];

  let contextArray = [
    "Typically used in a two-column or multi-column page layout where one column serves as a contextual navigation area next to the main content.",
    "The content of the <code>SideNav</code> (its items and groups) often changes dynamically based on the top-level section selected in a primary navigation component (like <code>HeaderNav</code>).",
    "It works well in conjunction with <code>HeaderNav</code> for main navigation and can share similar navigation structures with <code>MobileNav</code> for consistency across viewports.",
    "The <code>currentItem</code> prop dictates the active link and is bindable. The <code>SideNav</code> component displays an item as active if its <code>href</code> matches <code>currentItem</code>, but it does <strong>not</strong> internally update this prop. The parent component (like this wrapper) is fully responsible for managing <code>currentItem</code>, for instance, by syncing it with URL changes (e.g., <code>window.location.hash</code> or SvelteKit's <code>$page.url</code> stores).",
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
  let connectedComponentsArray = [
    {
      label: "Often Used With / Related To",
      arr: [
        {
          name: "HeaderNav",
          folder: "layout/service-navigation-nested-mobile",
        },
        {
          name: "MobileNav",
          folder: "layout/service-navigation-nested-mobile",
        },
        {
          name: "ServiceNavigationNestedMobile",
          folder: "layout/service-navigation-nested-mobile",
        },
      ],
    },
  ];
</script>

<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

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

  import SideNav from "$lib/components/layout/service-navigation-nested-mobile/SideNav.svelte";
  import Examples from "./side-nav/Examples.svelte";

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
  let currentItem = $state("");

  // logic to sync currentItem state with the external window current URL hash changes
  function syncCurrentItemToHash() {
    currentItem = window.location.hash;
  }

  onMount(syncCurrentItemToHash);

  /**
   * ! Step 3 - Add your props
   * CUSTOMISETHIS  Add your parameters to the array.
  * &&     parametersSourceArray is where you define any props for the 
   component. All props should be listed in the parametersSourceArray.
   * &&     Initial values should be provided for all props which either 
   (i) are binded, or (ii) can be modified using the demo UI.
   * &&     Values should also be provided for functions and svelte 
   snippets - which cannot be modified by the user to prevent security 
   issues.
   * &&     Some props may be derived from other props. These should still 
   be listed in the parametersSourceArray, but their value should be left 
   empty. Their value can then be defined further down the page.
   * ?      For each prop, the following fields are available:
   * ?      <name> (required, must be unique) -  Name of the parameter 
   which is passed to the component. The name can also be referenced in 
   the calculation of derived parameters which depend on this value.
   * ?      <category> - (required) - Used for separating parameters into 
   different groups.
   *
   * ?      <isBinded> - (optional, default = false) - Should be set to 
   true, if the prop is utilising the bind:directive. Note that for bind 
   to work, the prop must also be defined in step 1 using the $state() 
   rune and passed to the component separately as bindable (e.g. 
   bind:thisProp).
   *
   *
   * ?      <options> - (required for $state() props which can be modified 
   using dropwdown or radio inputs). <options> should contain an array of 
   strings. If <value> is null or absent, the initial value will be taken 
   from the first entry in the options array.
   * ?      <value> - (Should be null or absent for derived props. For all 
   others props it's required, unless there is an options field). Used to 
   set the initial value of the prop.
   *
   * ?      <propType> - (optional) - Has two use cases:
   * ?      (i) set to 'fixed' to prevent users editing the value.
   * ?      (i) set to 'radio' to have options selectable via the radio 
   input (uses dropdown by default).
   *
   * ?      <visible> - (optional, default = true). Hides prop in the UI 
   if certain conditions are not met. Specify an object with a name - the 
   parameter that you want to check against and a value - the value that 
   the named parameters need to equal for this input to be visible.
   * ?      The Line component provides an example of the <visible> field 
   in action, showing and hiding props based on <includeMarkers>
   * ?      If you want the form to be visible only if multiple conditions 
   are met, you can provide an array of conditional objects instead.
   *
   * ?      <rows> - (optional, default = 1, only use with $state() where 
   typeof value === "string"). Sets the numbers of rows used by the 
   textArea input.
   *
   * ?      <functionElements> - (optional, only used where typeof value 
   === "function") - <functionElements> can have three optional properties:
   * ?      (i) 'functionAsString': Should be set as a string copy of the 
   function itself. Used to display the function in the demo UI.
   * ?      (ii) 'counter': For use with event handler functions. Should 
   be set to 0. Then putting 'this.functionElements.counter += 1;' in the 
   function body will cause the counter to update each time the function 
   is triggered.
   * ?      (iii) 'dataset': For use with event handler fuctions. Should 
   be an object - then putting 'Object.keys(this.functionElements.dataset).
   forEach((el) => { this.functionElements.dataset[el] = event.
   currentTarget.dataset[el]; });' in the function body will cause the 
   object to update each time the function is triggered.
   *
   * ?      <description> - (optional, but strongly encouraged). Describes 
   what the parameter does and best practice uses for it. The description 
   can be a string, an object with a markdown field (true or false) and 
   arr field, or a svelte snippet.
   *
   * ?      <isProp> - (optional, default = true) - Should be set to false 
   for paramters which are not actually passed to the component.
   * ?      <isRequired> - (optional, default = false) - Should be set to 
   true for any props which the component will not functionally properly 
   without (e.g. props with no default value, props which will cause erros 
   if undefined).
   */

  const sampleItems = [
    {
      text: "Overview",
      href: "#overview",
      subItems: [
        { text: "Introduction", href: "#overview-intro" },
        { text: "Key Features", href: "#overview-features" },
      ],
    },
    { text: "Installation", href: "#installation" },
    { text: "API Reference", href: "#api" },
  ];

  const sampleGroups = [
    {
      title: "Getting Started",
      items: [
        {
          text: "Project Setup",
          href: "#project-setup",
          subItems: [{ text: "Requirements", href: "#project-requirements" }],
        },
        { text: "First Component", href: "#first-component" },
      ],
    },
    {
      title: "Advanced Topics",
      items: [
        { text: "State Management", href: "#state-management" },
        { text: "Routing", href: "#routing" },
      ],
    },
  ];

  let parametersSourceArray = $derived(
    addIndexAndInitalValue([
      {
        name: "title",
        category: "Content & Appearance",
        value: "Documentation",
        description: {
          markdown: true,
          arr: [
            "An accessible title for the navigation block, typically hidden visually but read by screen readers via <code>aria-labelledby</code>.",
            'Defaults to "Pages in this section" within the component if not provided.',
          ],
        },
      },
      {
        name: "items",
        category: "Content & Structure (Option 1: Flat List)",
        value: sampleItems,
        rows: 12,
        description: {
          markdown: true,
          arr: [
            "An array of <code>SideNavItem</code> objects for a single, flat list of navigation links.",
            "Each <code>SideNavItem</code> can have <code>text</code>, <code>href</code>, and optional <code>subItems</code> (array of <code>{ text: string, href: string }</code>) for in-page navigation (e.g., linking to URLs).",
            "If <code>groups</code> are also provided, <code>items</code> will be rendered first.",
          ],
        },
      },
      {
        name: "groups",
        category: "Content & Structure (Option 2: Grouped List)",
        value: sampleGroups,
        rows: 18,
        description: {
          markdown: true,
          arr: [
            "An array of <code>SideNavGroup</code> objects for creating titled sections of navigation links.",
            "Each <code>SideNavGroup</code> has an optional <code>title</code> and an <code>items</code> array (of <code>SideNavItem</code>).",
            "<code>SideNavItem</code> within groups can also have <code>subItems</code> for in-page navigation.",
            "Use this for a more structured side navigation. Rendered after the flat <code>items</code> list, if present.",
          ],
        },
      },
      {
        name: "currentItem",
        category: "Stateful & Bindable",
        isBinded: true,
        value: currentItem,
        description: {
          markdown: true,
          arr: [
            "A string that should match the <code>href</code> of the currently active item or sub-item.",
            "This prop is bindable (<code>bind:currentItem</code>).",
            "This is the <strong>sole driver</strong> for active link state in the <code>SideNav</code> component.",
            "In this demo, <code>currentItem</code> is always set to the current URL hash (e.g. <code>#section</code>), so navigation state stays in sync with the browser's address bar.",
            "For the demo, select a value to see the highlighting change. The options are generated from the sample <code>items</code> and <code>groups</code> data. Clicking links in the demo will update this value based on the URL hash.",
          ],
        },
      },
      {
        name: "activeItemBackgroundColor",
        category: "Stateful & Bindable",
        isBinded: false,
        options: ["transparent", "#f3f2f1", "#e0f2fe", "#fef9c3"], // transparent, gov.uk light grey, light blue, light yellow
        value: "transparent",
        propType: "radio",
        description: {
          markdown: true,
          arr: [
            "A CSS color string used for the background of the active navigation item only.",
            "Defaults to <code>transparent</code> within the component.",
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

<!--
  Listen for changes to the URL hash (e.g. when a user clicks a navigation link or uses the browser's back/forward buttons).
  When the hash changes, call syncCurrentItemToHash() to update the currentItem state.
  This ensures the SideNav's active state always reflects the current URL hash, even if navigation happens outside the component.
-->
<svelte:window on:hashchange={syncCurrentItemToHash} />

{#snippet Component()}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-one-third govuk-!-margin-left-5">
      <SideNav {...parametersObject} bind:currentItem />
    </div>
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
<div id="examples" data-role="examples-section" class="px-5">
  <Examples></Examples>
</div>
