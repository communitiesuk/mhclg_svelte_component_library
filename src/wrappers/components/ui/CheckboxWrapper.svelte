<script module>
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  let statusObject = {
    progress: {
      "To be developed": false,
      "In progress": false,
      "Baseline completed": true,
      "In use": false,
    },
    features: {
      Accessible: true,
      Responsive: true,
      "Prog. enhanced": true,
    },
    checks: {
      Reviewed: true,
      Tested: false,
    },
  };

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
    { label: "Context", arr: contextArray, visibleOnHomepage: true },
  ];

  let connectedComponentsArray = [];
</script>

<script>
  import { page } from "$app/state";
  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";
  import Line from "$lib/components/data-vis/line-chart/Line.svelte";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import {
    convertToCSV,
    csvToArrayOfObjects,
  } from "$lib/utils/data-transformations/convertCSV.js";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { defineDefaultEventHandler } from "$lib/utils/package-wrapping-specific/defineDefaultEventHandler.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
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

  let parametersSourceArray = addIndexAndInitalValue([
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
      inputType: "textArea",
      visible: { name: "dataSource", value: "custom" },
      value: convertToCSV(
        data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
          x: el.x,
          y: el.y,
        })),
      ),
    },
    {
      name: "dataArray",
      category: "data",
      isProp: true,
      inputType: null,
      label:
        "Calculated based on dataSource, metric, area and customDataArray.",
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
      options: ["scaleLinear", "scaleLog", "scaleTime"],
    },
    {
      name: "xFunction",
      category: "xScale",
      isProp: true,
      inputType: null,
      label:
        "Calculated based on screenSize, paddingLeft, paddingRight, xDomainLowerBound, xDomainUpperBound and xScaleType.",
      exampleCode:
        "scaleLinear()<br>&emsp;&emsp;.domain[2015,2022]<br>&emsp;&emsp;.range([0,graphWidth])",
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
      isProp: true,
      inputType: null,
      label:
        "Calculated based on svgHeight, paddingTop, paddingBottom, yDomainLowerBound, yDomainUpperBound and yScaleType.",
      exampleCode:
        "scaleLinear()<br>&emsp;&emsp;.domain[0,100]<br>&emsp;&emsp;.range([graphHeight,0])",
    },
    {
      name: "curve",
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
      isProp: true,
      inputType: null,
      label: "Calculated based on xFunction, yFunction and curve.",
      exampleCode:
        "line()<br>&emsp;&emsp;.x((d) => xFunction(d.x))<br>&emsp;&emsp;.y((d) => yFunction(d.y))<br>&emsp;&emsp;.curve(curveLinear)",
    },
    {
      name: "pathStrokeColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "#b312a0",
    },
    {
      name: "pathStrokeWidth",
      category: "path",
      isProp: true,
      inputType: "numberInput",
      value: 3,
    },
    {
      name: "pathFillColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none",
    },
    {
      name: "pathStrokeDashArray",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none",
    },
    {
      name: "includeMarkers",
      category: "markers",
      isProp: true,
      inputType: "checkbox",
    },
    {
      name: "markerShape",
      category: "markers",
      isProp: true,
      inputType: "dropdown",
      options: ["circle", "square", "diamond", "triangle"],
      visible: [{ name: "includeMarkers", value: true }],
    },
    {
      name: "markerRadius",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 5,
      visible: { name: "includeMarkers", value: true },
    },

    {
      name: "markerFill",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "#b312a0",
      visible: { name: "includeMarkers", value: true },
    },
    {
      name: "markerStroke",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "white",
      visible: { name: "includeMarkers", value: true },
    },
    {
      name: "markerStrokeWidth",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      visible: { name: "includeMarkers", value: true },
    },
    {
      name: "opacity",
      category: "overallStyling",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      step: 0.1,
      min: 0,
      max: 1,
    },
    {
      name: "dataId",
      category: "lineEvents",
      isProp: true,
      inputType: "input",
      value: "line-1",
    },
    {
      name: "onClick",
      category: "lineEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseEnter",
      category: "lineEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseLeave",
      category: "lineEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseMove",
      category: "lineEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "markersDataId",
      category: "markerEvents",
      isProp: true,
      inputType: "input",
      value: "markers-group-1",
    },
    {
      name: "onClickMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseEnterMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseLeaveMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event",
    },
    {
      name: "onMouseMoveMarker",
      category: "markerEvents",
      isProp: true,
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
  }));

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's initial values are simply take from the source array with a one-to-one mapping.
   * &&     This array is then used to track the values associated with each parameter as they are modified by the user using form inputs.
   */
  let parametersValuesArray = $state(
    parametersSourceArray.map((el) => el.value), //&& Something
  );

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   * &&     The getValueFromParametersArray function can be helpful for calculating based on the value of another parameter.
   */
  let xFunction = $derived(
    {
      scaleLinear: scaleLinear(),
      scaleLog: scaleLog(),
      scaleTime: scaleTime(),
    }[
      getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        "xScaleType",
      )
    ]
      .domain([
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "xDomainLowerBound",
        ),
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "xDomainUpperBound",
        ),
      ])
      .range([
        0,
        demoScreenWidth -
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "paddingLeft",
          ) -
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "paddingRight",
          ),
      ]),
  );

  let yFunction = $derived(
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
    ]
      .domain([
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "yDomainLowerBound",
        ),
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "yDomainUpperBound",
        ),
      ])
      .range([
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "svgHeight",
        ) -
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "paddingTop",
          ) -
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "paddingBottom",
          ),
        0,
      ]),
  );

  let lineFunction = $derived(
    line()
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
        }[
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "curve",
          )
        ],
      ),
  );

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
      : csvToArrayOfObjects(
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            "customDataArray",
          ),
        ),
  );

  /**
   * CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   * && 		Here you can add additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   * &&     Note that these parameters STILL NEED TO BE LISTED in the source array (with a null input type and null value).
   * &&     We recommend defining the values of these parameters above and just referencing them in this object. If you prefer to define them in-line, you can do so using the (parameterName : parameterValue) pattern.
   */
  let derivedParametersObject = $derived({
    xFunction,
    yFunction,
    lineFunction,
    dataArray,
  });

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
</script>

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
        <Line {...parametersObject}></Line>
      </g>
    </svg>
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

<style>
  svg {
    overflow: hidden;
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
