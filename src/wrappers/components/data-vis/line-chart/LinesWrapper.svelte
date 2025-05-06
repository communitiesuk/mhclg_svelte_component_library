<script module>
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  let lineHovered = $state();
  let lineClicked = $state();
  let labelHovered = $state();
  let labelClicked = $state();
  let selectedLine = $derived([
    lineHovered,
    lineClicked,
    labelHovered,
    labelClicked,
  ]);
  let nothingSelected = $derived(selectedLine.every((item) => item == null));

  let selectedAreaCode = $state("E09000033");
  let englandMedian = $state("E06000040");
  let similarAreas = $state("E07000224");
  let showAllData = true;

  function handleClickOutside(event) {
    if (
      lineClicked != event.target.parentElement.dataset.id ||
      (labelClicked && !event.target.closest('[id^="label"]'))
    ) {
      labelClicked = null;
      lineClicked = null;
    }
  }

  let colors = {
    teal: "#408A7B",
    lightblue: "#509EC8",
    darkblue: "#335F91",
    ochre: "#BA7F30",
    coral: "#E46B6C",
    fuschia: "#BB2765",
    purple: "#736CAC",
    lightgrey: "#A0A0A0",
    darkgrey: "#636363",
    black: "#161616",
  };

  let colorPalette = $derived({
    base: [colors.coral, colors.fuschia, colors.purple],
  });

  let onClick = (event, dataArray, dataId) => {
    lineClicked = dataId;
  };
  let onMouseEnter = (event, dataArray, dataId) => {
    if (lineHovered !== dataId) {
      lineHovered = dataId;
    }
  };
  let onMouseLeave = (event, dataArray, dataId) => {
    if (lineHovered === dataId) {
      lineHovered = null;
    }
  };

  function getColor(areaCode, lookupObj, i) {
    return (
      lookupObj[areaCode] ?? colorPalette.base[i % colorPalette.base.length]
    );
  }

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
    progress: "In Progress",
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
  let descriptionArray = ["Explain here what the component does."];

  let contextArray = [
    "Explain here the different contexts in which the component should be used.",
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

  import Lines from "$lib/components/data-vis/line-chart/Lines.svelte";
  import {
    curveBasis,
    curveCardinal,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveStep,
    line,
    area,
  } from "d3-shape";
  import { scaleLinear, scaleLog, scaleTime } from "d3-scale";

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
        name: "metric",
        category: "data",
        isProp: false,
        options: data.metrics,
        visible: { name: "dataSource", value: "from base data" },
      },
      {
        name: "primaryLines",
        category: "data",
        isProp: true,
        options: data.areas,
        value: [
          "E07000224",
          "E07000225",
          "E07000226",
          "E07000228",
          englandMedian,
          similarAreas,
          selectedAreaCode,
        ],
      },
      {
        name: "interactiveLines",
        category: "data",
        value: ["primary", "secondary"],
      },
      {
        name: "customDataArray",
        category: "data",
        isProp: false,
        visible: { name: "dataSource", value: "custom" },
        value: data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
          x: el.x,
          y: el.y,
        })),
      },
      {
        name: "derivedDataArray",
        category: "data",
        isProp: false,
        visible: { name: "dataSource", value: "from base data" },
        propType: "fixed",
        description: {
          markdown: true,
          arr: [
            "Calculated here based on the selected metric and area.",
            "Passed to the Line component as <span class='font-bold'>dataArray</span> when dataSource is set to <span class='italic'>'from base data'</span>.",
          ],
        },
      },
      {
        name: "dataArray",
        category: "data",
        visible: false,
      },
      {
        name: "tieredDataObject",
        category: "data",
        visible: false,
      },
      {
        name: "tieredLineParams",
        category: "data",
        visible: false,
      },
      {
        name: "defaultLineParams",
        category: "data",
        visible: false,
      },
      {
        name: "globalTierRules",
        category: "data",
        visible: false,
      },
      {
        name: "curveFunction",
        category: "lineFunction",
        isProp: true,
        options: [
          "curveLinear",
          "curveLinearClosed",
          "curveCardinal",
          "curveBasis",
          "curveStep",
          "curveMonotoneX",
        ],
      },
      {
        name: "lineFunction",
        category: "lineFunction",
        isProp: true,
        functionElements: {
          functionAsString: `function (dataArray) {
    return line()
      .x((d) => xFunction(d.x))
      .y((d) => yFunction(d.y))
      .curve(
        {
          curveLinear: curveLinear,
          curveLinearClosed: curveLinearClosed,
          curveCardinal: curveCardinal,
          curveBasis: curveBasis,
          curveStep: curveStep,
          curveMonotoneX: curveMonotoneX,
        }[getValue("curveFunction")],
      )(dataArray);
  });`,
        },
      },
      {
        name: "yDomainLowerBound",
        category: "yScale",
        isProp: false,
        value: Math.min(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.y),
        ),
      },
      {
        name: "yDomainUpperBound",
        category: "yScale",
        isProp: false,
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.y),
        ),
      },
      {
        name: "xDomainLowerBound",
        category: "xScale",
        isProp: false,
        value: Math.min(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.x),
        ),
      },
      {
        name: "xDomainUpperBound",
        category: "xScale",
        isProp: false,
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.x),
        ),
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

  let derivedDataArray = $derived(
    data.dataInFormatForLineChart.find(
      (el) => el.metric === getValue("metric"),
    ),
  );

  let dataArray = $derived(
    derivedDataArray.lines.map((el, i) => {
      const tiers = [];
      el.areaCode == lineClicked
        ? tiers.push("clicked")
        : el.areaCode == lineHovered
          ? tiers.push("hover")
          : getValue("primaryLines").includes(el.areaCode)
            ? tiers.push("primary")
            : tiers.push("secondary");
      return {
        ...el,
        tiers,
      };
    }),
  );

  let tieredLineParams = $derived({
    otherTier: {},
    secondary: {
      halo: false,
      pathStrokeColor: colors.black,
      pathStrokeWidth: 1,
      opacity: 0.05,
      interactive: getValue("interactiveLines").includes("secondary"),
    },
    primary: {
      halo: true,
      pathStrokeWidth: 5,
      pathStrokeColor: colors.darkgrey,
      interactive: getValue("interactiveLines").includes("primary"),
    },
    clicked: {
      pathStrokeColor: colors.ochre,
      pathStrokeWidth: 7,
      halo: true,
      interactive: true,
    },
    hover: {
      pathStrokeColor: colors.ochre,
      pathStrokeWidth: 5,
      halo: true,
      interactive: true,
    },
  });

  let xFunction = $derived(function (number) {
    return {
      "scaleLinear()": scaleLinear(),
      "scaleLog()": scaleLog(),
      "scaleTime()": scaleTime(),
    }[getValue("xScaleType")]
      .domain([getValue("xDomainLowerBound"), getValue("xDomainUpperBound")])
      .range([
        0,
        demoScreenWidth - getValue("paddingLeft") - getValue("paddingRight"),
      ])(number);
  });

  let yFunction = $derived(function (number) {
    return {
      "scaleLinear()": scaleLinear(),
      "scaleLog()": scaleLog(),
      "scaleTime()": scaleTime(),
    }[getValue("yScaleType")]
      .domain([getValue("yDomainLowerBound"), getValue("yDomainUpperBound")])
      .range([
        getValue("svgHeight") -
          getValue("paddingTop") -
          getValue("paddingBottom"),
        0,
      ])(number);
  });

  let lineFunction = $derived(function (dataArray) {
    return line()
      .x((d) => xFunction(+d.x))
      .y((d) => yFunction(+d.y))
      .curve(
        {
          curveLinear: curveLinear,
          curveLinearClosed: curveLinearClosed,
          curveCardinal: curveCardinal,
          curveBasis: curveBasis,
          curveStep: curveStep,
          curveMonotoneX: curveMonotoneX,
        }[getValue("curveFunction")],
      )(dataArray);
  });

  let basicLineParams = $derived({
    lineFunction,
    xFunction,
    yFunction,
    onClick,
    onMouseEnter,
    onMouseLeave,
    invisibleStrokeWidth: 20,
  });

  let lookupObj = $derived({
    // [englandMedian]: colors.lightblue,
    // [selectedAreaCode]: colors.teal,
    // [similarAreas]: colors.darkblue,
  });

  let defaultLineParams = $derived(
    Object.fromEntries(
      Object.entries(tieredLineParams).map(([key, group]) => [
        key,
        { ...basicLineParams, ...group },
      ]),
    ),
  );

  let tieredDataObject = $derived(
    Object.keys(defaultLineParams).reduce((acc, key, index) => {
      acc[key] = dataArray
        .filter((el) => {
          if (key === "primary") {
            return getValue("primaryLines").includes(el.areaCode);
          }
          if (
            key === "secondary" &&
            showAllData &&
            !getValue("primaryLines").includes(el.areaCode)
          ) {
            return true;
          }
          if (key === "hover") {
            return lineHovered == el.areaCode;
          }
          if (key === "clicked") {
            return lineClicked == el.areaCode;
          }
        })
        .map((el) => ({
          ...el,
          includeMarkers: key === "primary" ? true : false,
          pathStrokeColor: ["primary", "hover", "clicked"].includes(key)
            ? getColor(
                el.areaCode,
                lookupObj,
                getValue("primaryLines").indexOf(el.areaCode),
              )
            : null,
        }));
      return acc;
    }, {}),
  );

  let globalTierRules = $derived({
    otherTier: {},
    secondary: {
      opacity: nothingSelected ? 1 : 0.5,
    },
    primary: {
      opacity: nothingSelected ? 1 : 0.4,
    },
    hover: { opacity: 1 },
    clicked: { opacity: 1 },
  });

  let derivedParametersObject = $derived({
    derivedDataArray,
    lineFunction,
    dataArray,
    tieredLineParams,
    defaultLineParams,
    tieredDataObject,
    globalTierRules,
  });

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
    <Lines {...parametersObject}></Lines>
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
<div id="examples" data-role="examples-section" class="px-5"></div>
