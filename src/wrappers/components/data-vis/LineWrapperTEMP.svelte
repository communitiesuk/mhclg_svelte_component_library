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
    progress: "In progress",
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
   * &&   By default the detailsArray includes description and context. The description is intended to explain what the component does, the context is intended to explain when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with).
   * ?  Within each array, an object has an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content (e.g. this can be used for including links to other pages).
   * ?  You can add other categories to the detailsArray or, if you need a more flexible solution, edit the WrapperInformation snippet directly.
   *
   */
  let descriptionArray = [
    "This component takes an array of data, two scale functions and a line function and renders an svg path element (and optional markers at each data point)",
  ];

  let contextArray = [
    "Used within svg elements as part of the creation of data visualisations - most notably by the <a href='/components/data-vis/line/'>Lines</a> component.",
    "The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers). Even individual lines should normally be created using the Lines component.",
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
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import ComponentDemo from "$lib/package-wrapping/ComponentDemo.svelte";

  import { Toast } from "flowbite-svelte";
  import { ExclamationCircleSolid } from "flowbite-svelte-icons";

  import { defaultScreenWidthBreakpoints } from "$lib/config.js";

  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { createBindableParametersValuesArray } from "$lib/utils/package-wrapping-specific/createBindableParametersValuesArray.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";

  import Line from "$lib/components/data-vis/line-chart/Line.svelte";
  import { scaleLinear, scaleLog, scaleTime } from "d3-scale";
  import {
    curveBasis,
    curveCardinal,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveStep,
    line,
  } from "d3-shape";

  let { data } = $props();

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
   * CUSTOMISETHIS  Define any binded props
   * && 		Any props which are updated inside the component but accessed outside should be declared here using the $state rune. They can then be added to the parameterSourceArray below.
   * &&     Also note that they must also be passed to component using the bind: directive (e.g. <ExampleComponent bind:exampleBindableProp>)
   */
  let selectedValues = $state([]);

  /**
   * CUSTOMISETHIS  Add your parameters to the array.
   * && 		parametersSourceArray is where you define any props for the component whose initial value does not depend on other parameters. It can also be used for defining any parameters which are not passed to the component, but are used in the calculation of another parameter (An example would be a Line component's xFunction, which is calculated based on a scale, an xDomain and a graphWidth). Each prop is represented by a single object within the array.
   * ? 		  name - Required. Name of the parameter which is passed to the component. The name can also be referenced in the calculation of parameters which depend on this value. Names must be unique.
   *
   * ?      category - Required. Used purely for separating parameters into different accordion groups.
   *
   * ?      isProp - Options, defaults to true. Is a boolean - true means it will actually be passed to the commponent, false means it will not (and will instead be used just for calculating other parameters).
   *
   * ?      isBinded - Optional, treated as false by default. If isBinded is set to true - then the parameter value will not be editable via the parameters UI, but will be displayed so users can see how it updates as they interact with the component. Note that the prop must also explicitly be passed to the component as bindable (e.g. bind:thisComponent)
   *
   * ?      inputType - Required. This can be a form input (available options are 'code', 'event', 'input', 'checkbox', 'dropdown' and 'radio'.
   * ?      The inputType should be set to 'code' if the parameter is a function (non-editable in the UI to prevent code injection), or object.
   *
   * ?      When inputType is set to 'event', the user cannot change the value of this prop, but a tracker will be shown in the parameter UI to indicate when the event handler is called.
   *
   * ?      All other input types provide the user with a form input which allows them to edit the value via the parameter UI and see how the component updates.
   *
   * ?      value - not required if inputType === 'event', otherwise optional. Used to set the default initial value for the parameter. Note that certain inputTypes don't require a value. If value is undefined, dropdowns and radios will calculate it as the first element in their options array. If value is undefined, checkbox will set it to false.
   *
   * ?      options - required for ['dropdown', 'radio'].includes(inputType), redundant otherwise. Provides an array representing the options that can the parameter can be set to via the parameters UI.
   *
   * ?      visible - optional. Some props are irrelevant unless another prop is set to a particular value (e.g. in a Line component, markerRadius is irrelevant if includeMarkers is false). The visible key allows you to dynamically hide a props' input forms. You can do this by specifying an object with name - the parameter that you want to check against, and value - the value that the named parameter needs to be equal to for this input form to be visible. (e.g. for markerRadius we would use {name: includeMarkers, value: true}).
   * ?      If you want the form to be visible only if multiple conditions are met, you can provide an array of condition objects instead.
   *
   * ?      handlerFunction - optional. Redundant unless inputType === 'event'. You can provide a function that will run when the specified event occurs. A default function is provided if handlerFunction is set to undefined - using the default handlerFunction is recommended.
   *
   * ?      description - optional, but encouraged unless the parameter's function is self-explanatory. Describes what the parameter does and best practice uses for it. The description can be a string, an object with a markdown (true or false) and arr keys, or a svelte snippet.
   *
   * ?      rows - optional. Redundant unless inputType === 'input'. In this case, a textArea input form will contain the parameter value, and the size of the textArea is based on the rows key. If there is no rows key then by default the textArea has 1 row.
   */
  let parametersSourceArray = $derived(
    addIndexAndInitalValue([
      {
        name: "svgHeight",
        category: "dimensions",
        isProp: false,
        inputType: "numberInput",
        value: 500,
      },
      {
        name: "paddingTop",
        category: "dimensions",
        isProp: false,
        inputType: "numberInput",
        value: 50,
      },
      {
        name: "paddingRight",
        category: "dimensions",
        isProp: false,
        inputType: "numberInput",
        value: 50,
      },
      {
        name: "paddingBottom",
        category: "dimensions",
        isProp: false,
        inputType: "numberInput",
        value: 50,
      },
      {
        name: "paddingLeft",
        category: "dimensions",
        isProp: false,
        inputType: "numberInput",
        value: 50,
      },
      {
        name: "dataSource",
        category: "data",
        isProp: false,
        inputType: "radio",
        options: ["from base data", "custom"],
      },
      {
        name: "metric",
        category: "data",
        isProp: false,
        inputType: "dropdown",
        options: data.metrics,
        visible: { name: "dataSource", value: "from base data" },
      },
      {
        name: "area",
        category: "data",
        isProp: false,
        inputType: "dropdown",
        options: data.areas,
        visible: { name: "dataSource", value: "from base data" },
      },
      {
        name: "customDataArray",
        category: "data",
        isProp: false,
        inputType: "code",
        visible: { name: "dataSource", value: "custom" },
        value: data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
          x: el.x,
          y: el.y,
        })),
      },
      {
        name: "dataArray",
        category: "data",
        isEditable: false,
        visible: { name: "dataSource", value: "from base data" },
      },
      {
        name: "xDomainLowerBound",
        category: "xScale",
        isProp: false,
        inputType: "numberInput",
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
        inputType: "numberInput",
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.x),
        ),
      },
      {
        name: "xScaleType",
        category: "xScale",
        isProp: false,
        inputType: "dropdown",
        options: ["scaleLinear()", "scaleLog", "scaleTime"],
      },
      {
        name: "xFunction",
        category: "xScale",
        isEditable: false,
      },
      {
        name: "yDomainLowerBound",
        category: "yScale",
        isProp: false,
        inputType: "numberInput",
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
        inputType: "numberInput",
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.y),
        ),
      },
      {
        name: "yScaleType",
        category: "yScale",
        isProp: false,
        inputType: "dropdown",
        options: ["scaleLinear", "scaleLog", "scaleTime"],
      },
      {
        name: "yFunction",
        category: "yScale",
        isEditable: false,
      },
      {
        name: "curveFunction",
        category: "lineFunction",
        isProp: false,
        inputType: "dropdown",
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
        isEditable: false,
        inputType: "code",
      },
      {
        name: "pathStrokeColor",
        category: "path",
        inputType: "input",
        value: "#b312a0",
      },
      {
        name: "pathStrokeWidth",
        category: "path",
        inputType: "numberInput",
        value: 3,
      },
      {
        name: "pathFillColor",
        category: "path",
        inputType: "input",
        value: "none",
      },
      {
        name: "pathStrokeDashArray",
        category: "path",
        inputType: "input",
        value: "none",
      },
      {
        name: "includeMarkers",
        category: "markers",
        inputType: "checkbox",
      },
      {
        name: "markerShape",
        category: "markers",
        inputType: "dropdown",
        options: ["circle", "square", "diamond", "triangle"],
        visible: [{ name: "includeMarkers", value: true }],
      },
      {
        name: "markerRadius",
        category: "markers",
        inputType: "numberInput",
        value: 5,
        visible: { name: "includeMarkers", value: true },
      },

      {
        name: "markerFill",
        category: "markers",
        inputType: "input",
        value: "#b312a0",
        visible: { name: "includeMarkers", value: true },
      },
      {
        name: "markerStroke",
        category: "markers",
        inputType: "input",
        value: "white",
        visible: { name: "includeMarkers", value: true },
      },
      {
        name: "markerStrokeWidth",
        category: "markers",
        inputType: "numberInput",
        value: 1,
        visible: { name: "includeMarkers", value: true },
      },
      {
        name: "opacity",
        category: "overallStyling",
        inputType: "numberInput",
        value: 1,
        step: 0.1,
        min: 0,
        max: 1,
      },
      {
        name: "dataId",
        category: "lineEvents",
        inputType: "input",
        value: "line-1",
      },
      {
        name: "onClick",
        category: "lineEvents",
        inputType: "event",
      },
      {
        name: "onMouseEnter",
        category: "lineEvents",
        inputType: "event",
      },
      {
        name: "onMouseLeave",
        category: "lineEvents",
        inputType: "event",
      },
      {
        name: "onMouseMove",
        category: "lineEvents",
        inputType: "event",
      },
      {
        name: "markersDataId",
        category: "markerEvents",
        inputType: "input",
        value: "markers-group-1",
      },
      {
        name: "onClickMarker",
        category: "markerEvents",
        inputType: "event",
      },
      {
        name: "onMouseEnterMarker",
        category: "markerEvents",
        inputType: "event",
      },
      {
        name: "onMouseLeaveMarker",
        category: "markerEvents",
        inputType: "event",
      },
      {
        name: "onMouseMoveMarker",
        category: "markerEvents",
        inputType: "event",
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
    parametersSourceArray.map((el) =>
      typeof el.value === "object"
        ? JSON.stringify(el.value, null, 2)
        : el.value,
    ),
  );

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters still need to be listed in the source array (with a null input type and null value).
   * &&     You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   * &&     The getValueFromParametersArray function can be helpful for calculating based on the value of another parameter.
   */
  let dataArray = $derived(
    getValueFromParametersArray(
      parametersSourceArray,
      parametersValuesArray,
      "dataSource",
    ) === "from base data"
      ? data.dataInFormatForLineChart
          .find(
            (el) =>
              el.metric ===
              getValueFromParametersArray(
                parametersSourceArray,
                parametersValuesArray,
                "metric",
              ),
          )
          .lines.find(
            (el) =>
              el.areaCode ===
              getValueFromParametersArray(
                parametersSourceArray,
                parametersValuesArray,
                "area",
              ),
          ).data
      : getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "customDataArray",
        ),
  );

  let xFunction = $derived({
    functionParams: [
      [
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "xScaleType",
        ),
        {
          "scaleLinear()": scaleLinear(),
          scaleLog: scaleLog(),
          scaleTime: scaleTime(),
        }[
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "xScaleType",
          )
        ],
      ],
      "number",
    ],
    functionBody: `return scaleLinear()
      .domain([${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainLowerBound")},${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainUpperBound")}])
      .range([0, ${demoScreenWidth - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingLeft") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingRight")}])(number)`,
  });

  let yFunction = $derived({
    functionParams: [
      [
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "yScaleType",
        ),
        {
          scaleLinear: scaleLinear(),
          scaleLog: scaleLog(),
          scaleTime: scaleTime(),
        }[
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "yScaleType",
          )
        ],
      ],
      "number",
    ],
    functionBody: `return 
    ${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yScaleType")}
      .domain([${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainLowerBound")},${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainUpperBound")}])
      .range([${getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "svgHeight") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingTop") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingBottom")}, 0])(number)`,
  });

  let lineFunction = $derived({
    functionParams: [
      ["line", line()],
      [
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "curveFunction",
        ),
        {
          curveLinear: curveLinear(),
          curveLinearClosed: curveLinearClosed(),
          curveCardinal: curveCardinal(),
          curveBasis: curveBasis(),
          curveStep: curveStep(),
          curveMonotoneX: curveMonotoneX(),
        }[
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "curveFunction",
          )
        ],
      ],
      [
        "xFunction",
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "xFunction",
        ),
      ],
      [
        "yFunction",
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "yFunction",
        ),
      ],
      "dataArray",
    ],
    functionBody: `return 
    line()
      .x((d) => xFunction(d.x))
      .y((d) => yFunction(d.y))
      .curve(${getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        "curveFunction",
      )})(dataArray)`,
  });

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can add additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters still need to be listed in the source array (with a null input type and null value).
   * &&     We recommend defining the values of these parameters above and just referencing them in this object. If you prefer to define them in-line, you can do so using the (parameterName : parameterValue) pattern.
   */
  let derivedParametersObject = $derived({
    dataArray,
    xFunction,
    yFunction,
    lineFunction,
  });

  /**
   * DONOTTOUCH *
   * && 		bindingsParametersValuesArray's mimics parametersValuesArray but is derived, meaning it can be used to track updates within the component to bounded props..
   */
  let bindingsParametersValuesArray = $derived(
    parametersSourceArray.map((el) => {
      let value = derivedParametersObject[el.name] ?? el.value;

      return value?.functionParams && value?.functionBody
        ? `function(${value?.functionParams?.map((elm) => (typeof elm === "string" ? elm : elm[0])).join(", ")}) {${value?.functionBody}
}`
        : typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : value;
    }),
  );

  let functionsArray = $derived(
    parametersSourceArray.map((el) => {
      let value = derivedParametersObject[el.name] ?? el.value;

      return value?.functionParams && value?.functionBody
        ? new Function(
            ...value.functionParams.map((el) =>
              typeof el === "string" ? el : el[0],
            ),
            value.functionBody,
          )
        : 100;
    }),
  );

  $inspect(functionsArray);

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's is a one-to-one mapping to the source array which tracks whether a parameter should be visible or not in the UI.
   */
  let parametersVisibleArray = $derived(
    trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersObject takes the props to be passed to the component and converts them into a (parameterName: parameterValue) pattern
   * &&     isValidJSONArray tracks whether any of the values set in the parameters UI are invalid.
   */
  let [parametersObject, isValidJSONArray] = $derived(
    createParametersObject(
      parametersSourceArray,
      parametersValuesArray,
      derivedParametersObject,
    ),
  );

  //$inspect(parametersObject);
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
&&          Renders toast notifications if any of the parameters values are invalid JSON.
-->
<div class="fixed top-0 z-[9999] w-full">
  {#each isValidJSONArray as check, index}
    {#if !check}
      <div class="flex flex-row justify-center">
        <Toast
          color="red"
          dismissable={false}
          divClass="w-full max-w-2xl p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3 border-[2px] border-red-500"
        >
          <svelte:fragment slot="icon">
            <ExclamationCircleSolid class="w-5 h-5" />
            <span class="sr-only">Warning icon</span>
          </svelte:fragment>
          The input for the
          <span class="font-bold text-red-500"
            >{parametersSourceArray[index].name}</span
          >
          prop is invalid. Until this is resolved, the {pageName} component will
          default to using the initial input value instead.
        </Toast>
      </div>
    {/if}
  {/each}
</div>

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
    CUSTOMISETHIS  Create a context in which your component is commonly used, then call your component.
    &&          Renders the radio form, allowing the user to adjust the screen width. How this affects the component will depend on how it is coded below.
 -->

{#snippet Component()}
  <div>
    <svg
      width={demoScreenWidth}
      height={getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        "svgHeight",
      )}
    >
      <g
        transform="translate({getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'paddingLeft',
        )},{getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'paddingTop',
        )})"
      >
        <!-- <Line {...parametersObject}></Line> -->
      </g>
    </svg>
  </div>
{/snippet}

<ComponentDemo
  {Component}
  {parametersSourceArray}
  {parametersVisibleArray}
  {bindingsParametersValuesArray}
  {derivedParametersObject}
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
      Examples from the playground
    </h5>
  </div>
</div>
