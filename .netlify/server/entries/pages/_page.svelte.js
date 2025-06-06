import { X as copy_payload, Y as assign_payload, T as pop, Q as push, Z as attr, _ as stringify, $ as spread_props, W as escape_html, a0 as ensure_array_like } from "../../chunks/index.js";
import { L as Line } from "../../chunks/Line.js";
import { D as DividerLine } from "../../chunks/DividerLine.js";
import { a as addIndexAndInitalValue, g as getValueFromParametersArray, t as trackVisibleParameters, c as createParametersObject, d as defaultScreenWidthBreakpoints, C as ComponentDetails, P as ParametersSection, S as ScreenSizeRadio, f as foldersLookup } from "../../chunks/trackVisibleParameters.js";
import { c as convertToCSV, d as defineDefaultEventHandler, a as csvToArrayOfObjects } from "../../chunks/defineDefaultEventHandler.js";
import { scaleLinear, scaleLog, scaleTime } from "d3-scale";
import { line, curveLinear, curveLinearClosed, curveCardinal, curveBasis, curveStep, curveMonotoneX } from "d3-shape";
import { t as textStringConversion } from "../../chunks/textStringConversion.js";
import "clsx";
function snippetExample($$payload) {
  $$payload.out += `<!---->hello there`;
}
function PillWrapper($$payload, $$props) {
  push();
  const filePath = "/Users/andrewhillman1/Documents/mhclg/oflog_svelte_component_library/src/wrappers/content/PillWrapper.svelte";
  console.log("Component file path:", filePath);
  let { data } = $$props;
  let details = {
    name: "Line",
    folder: "data-vis",
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: "complete_untested",
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: [
      {
        content: "This component takes an array of data, two scale functions and a line function and renders an svg path element (and optional markers at each data point).",
        markdown: true
      }
    ],
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: [
      {
        content: "Used within svg elements as part of the creation of data visualisations - most notably by the <a href='/components/data-vis/line/'>Lines</a> component.",
        markdown: true
      },
      {
        content: "The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers). Even individual lines should normally be created using the Lines component."
      }
    ],
    /**
     * &&     childComponents - Optional detail, can be used by developers to link to components which this component relies upon.
     * ?     'name' and 'folder' must match the routes folder structure (see documentation above for 'name' and 'folder' above for available options)
     * ?      example array would be [{name: 'svg', folder: 'data-vis'},{name: 'line', folder: 'data-vis'}]
     */
    childComponents: void 0,
    /**
     * &&     requirements - Optional detail, can be used by developers to track which requirements for the component have been coded up.
     * ?      The 'description' parameter is optional (default is not to provide a description).
     * ?      For each paragraph there is an optional 'markdown' (default = false) parameter. When set to true, it uses the @html tag to render the content.
     * ?      For each paragraph there is an optional 'fulfilled' (default = false) parameter. When set to true, the text will be highlighted green and struck-through, demonstrating that this requirmeent has been coded up.
     */
    requirements: [
      {
        label: "Style the line",
        description: "Allow developer to provide custom styling to the line - including color, stroke-width, opacity.",
        fulfilled: true
      },
      {
        label: "Set scale and curve types",
        description: "Allow developer to set scale types (e.g. linear, log, time) and the curve of the line - using the d3 set of curve options.",
        fulfilled: true
      },
      {
        label: "Markers",
        description: "Allow developer to add markers at each data point along their line.",
        fulfilled: true
      },
      {
        label: "Events",
        description: "Add event handlers for line, and for individual markers.",
        fulfilled: true
      }
    ]
  };
  let demoScreenWidth = defaultScreenWidthBreakpoints.md;
  let parametersSourceArray = addIndexAndInitalValue([
    {
      name: "svgHeight",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 500
    },
    {
      name: "paddingTop",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingRight",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingBottom",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingLeft",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "dataSource",
      category: "data",
      isProp: false,
      inputType: "radio",
      options: ["from base data", "custom"]
    },
    {
      name: "metric",
      category: "data",
      isProp: false,
      inputType: "dropdown",
      options: data.metrics,
      visible: { name: "dataSource", value: "from base data" }
    },
    {
      name: "area",
      category: "data",
      isProp: false,
      inputType: "dropdown",
      options: data.areas,
      visible: { name: "dataSource", value: "from base data" }
    },
    {
      name: "customDataArray",
      category: "data",
      isProp: false,
      inputType: "textArea",
      visible: { name: "dataSource", value: "custom" },
      value: convertToCSV(data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({ x: el.x, y: el.y })))
    },
    {
      name: "dataArray",
      category: "data",
      isProp: true,
      inputType: null,
      label: "Calculated based on dataSource, metric, area and customDataArray."
    },
    {
      name: "xDomainLowerBound",
      category: "xScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.min(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.x))
    },
    {
      name: "xDomainUpperBound",
      category: "xScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.max(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.x))
    },
    {
      name: "xScaleType",
      category: "xScale",
      isProp: false,
      inputType: "dropdown",
      options: ["scaleLinear", "scaleLog", "scaleTime"]
    },
    {
      name: "xFunction",
      category: "xScale",
      isProp: true,
      inputType: null,
      label: "Calculated based on screenSize, paddingLeft, paddingRight, xDomainLowerBound, xDomainUpperBound and xScaleType.",
      exampleCode: "scaleLinear()<br>&emsp;&emsp;.domain[2015,2022]<br>&emsp;&emsp;.range([0,graphWidth])"
    },
    {
      name: "yDomainLowerBound",
      category: "yScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.min(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.y))
    },
    {
      name: "yDomainUpperBound",
      category: "yScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.max(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.y))
    },
    {
      name: "yScaleType",
      category: "yScale",
      isProp: false,
      inputType: "dropdown",
      options: ["scaleLinear", "scaleLog", "scaleTime"]
    },
    {
      name: "yFunction",
      category: "yScale",
      isProp: true,
      inputType: null,
      label: "Calculated based on svgHeight, paddingTop, paddingBottom, yDomainLowerBound, yDomainUpperBound and yScaleType.",
      exampleCode: "scaleLinear()<br>&emsp;&emsp;.domain[0,100]<br>&emsp;&emsp;.range([graphHeight,0])"
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
        "curveMonotoneX"
      ]
    },
    {
      name: "lineFunction",
      category: "lineFunction",
      isProp: true,
      inputType: null,
      label: "Calculated based on xFunction, yFunction and curve.",
      exampleCode: "line()<br>&emsp;&emsp;.x((d) => xFunction(d.x))<br>&emsp;&emsp;.y((d) => yFunction(d.y))<br>&emsp;&emsp;.curve(curveLinear)"
    },
    {
      name: "pathStrokeColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "#b312a0"
    },
    {
      name: "pathStrokeWidth",
      category: "path",
      isProp: true,
      inputType: "numberInput",
      value: 3
    },
    {
      name: "pathFillColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none"
    },
    {
      name: "pathStrokeDashArray",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none"
    },
    {
      name: "includeMarkers",
      category: "markers",
      isProp: true,
      inputType: "checkbox"
    },
    {
      name: "markerShape",
      category: "markers",
      isProp: true,
      inputType: "dropdown",
      options: ["circle", "square", "diamond", "triangle"],
      visible: [{ name: "includeMarkers", value: true }]
    },
    {
      name: "markerRadius",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 5,
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerFill",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "#b312a0",
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerStroke",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "white",
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerStrokeWidth",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "opacity",
      category: "overallStyling",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      step: 0.1,
      min: 0,
      max: 1
    },
    {
      name: "dataId",
      category: "lineEvents",
      isProp: true,
      inputType: "input",
      value: "line-1"
    },
    {
      name: "onClick",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseEnter",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseLeave",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseMove",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "markersDataId",
      category: "markerEvents",
      isProp: true,
      inputType: "input",
      value: "markers-group-1"
    },
    {
      name: "onClickMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseEnterMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseLeaveMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseMoveMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    }
  ]).map((el) => ({
    ...el,
    handlerFunction: el.inputType === "event" ? el.handlerFunction ?? function(event) {
      defineDefaultEventHandler(event, parametersSourceArray, parametersValuesArray, el.name);
    } : null
  }));
  let parametersValuesArray = parametersSourceArray.map((el) => el.value);
  let xFunction = {
    scaleLinear: scaleLinear(),
    scaleLog: scaleLog(),
    scaleTime: scaleTime()
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xScaleType")].domain([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainLowerBound"),
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainUpperBound")
  ]).range([
    0,
    demoScreenWidth - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingLeft") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingRight")
  ]);
  let yFunction = {
    scaleLinear: scaleLinear(),
    scaleLog: scaleLog(),
    scaleTime: scaleTime()
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yScaleType")].domain([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainLowerBound"),
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainUpperBound")
  ]).range([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "svgHeight") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingTop") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingBottom"),
    0
  ]);
  let lineFunction = line().x((d) => xFunction(d.x)).y((d) => yFunction(d.y)).curve({
    curveLinear,
    curveLinearClosed,
    curveCardinal,
    curveBasis,
    curveStep,
    curveMonotoneX
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "curve")]);
  let dataArray = getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "dataSource") === "from base data" ? data.dataInFormatForLineChart.find((el) => el.metric === getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "metric")).lines.find((el) => el.areaCode === getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "area")).data : csvToArrayOfObjects(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "customDataArray"));
  let derivedParametersObject = {
    xFunction,
    yFunction,
    lineFunction,
    dataArray
  };
  let parametersVisibleArray = trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  let parametersObject = createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    ComponentDetails($$payload2, { homepage: false, details });
    $$payload2.out += `<!----> `;
    ParametersSection($$payload2, {
      details,
      parametersSourceArray,
      parametersVisibleArray,
      get parametersValuesArray() {
        return parametersValuesArray;
      },
      set parametersValuesArray($$value) {
        parametersValuesArray = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-m81iik"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
    ScreenSizeRadio($$payload2, {
      get demoScreenWidth() {
        return demoScreenWidth;
      },
      set demoScreenWidth($$value) {
        demoScreenWidth = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-m81iik"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-m81iik"><svg${attr("width", demoScreenWidth)}${attr("height", getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "svgHeight"))} class="svelte-m81iik"><g${attr("transform", `translate(${stringify(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingLeft"))},${stringify(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingTop"))})`)}>`;
    Line($$payload2, spread_props([parametersObject]));
    $$payload2.out += `<!----></g></svg></div></div> <div class="mt-20 svelte-m81iik" data-role="examples-section">`;
    DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
    $$payload2.out += `<!----> <h5 class="underline underline-offset-4">Examples</h5></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PillWrapper,
  snippetExample
}, Symbol.toStringTag, { value: "Module" }));
function LineWrapper($$payload, $$props) {
  push();
  let { data } = $$props;
  let details = {
    name: "Line",
    folder: "data-vis",
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: "complete_untested",
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: [
      {
        content: "This component takes an array of data, two scale functions and a line function and renders an svg path element (and optional markers at each data point).",
        markdown: true
      }
    ],
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: [
      {
        content: "Used within svg elements as part of the creation of data visualisations - most notably by the <a href='/components/data-vis/line/'>Lines</a> component.",
        markdown: true
      },
      {
        content: "The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers). Even individual lines should normally be created using the Lines component."
      }
    ],
    /**
     * &&     childComponents - Optional detail, can be used by developers to link to components which this component relies upon.
     * ?     'name' and 'folder' must match the routes folder structure (see documentation above for 'name' and 'folder' above for available options)
     * ?      example array would be [{name: 'svg', folder: 'data-vis'},{name: 'line', folder: 'data-vis'}]
     */
    childComponents: void 0,
    /**
     * &&     requirements - Optional detail, can be used by developers to track which requirements for the component have been coded up.
     * ?      The 'description' parameter is optional (default is not to provide a description).
     * ?      For each paragraph there is an optional 'markdown' (default = false) parameter. When set to true, it uses the @html tag to render the content.
     * ?      For each paragraph there is an optional 'fulfilled' (default = false) parameter. When set to true, the text will be highlighted green and struck-through, demonstrating that this requirmeent has been coded up.
     */
    requirements: [
      {
        label: "Style the line",
        description: "Allow developer to provide custom styling to the line - including color, stroke-width, opacity.",
        fulfilled: true
      },
      {
        label: "Set scale and curve types",
        description: "Allow developer to set scale types (e.g. linear, log, time) and the curve of the line - using the d3 set of curve options.",
        fulfilled: true
      },
      {
        label: "Markers",
        description: "Allow developer to add markers at each data point along their line.",
        fulfilled: true
      },
      {
        label: "Events",
        description: "Add event handlers for line, and for individual markers.",
        fulfilled: true
      }
    ]
  };
  let demoScreenWidth = defaultScreenWidthBreakpoints.md;
  let parametersSourceArray = addIndexAndInitalValue([
    {
      name: "svgHeight",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 500
    },
    {
      name: "paddingTop",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingRight",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingBottom",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "paddingLeft",
      category: "dimensions",
      isProp: false,
      inputType: "numberInput",
      value: 50
    },
    {
      name: "dataSource",
      category: "data",
      isProp: false,
      inputType: "radio",
      options: ["from base data", "custom"]
    },
    {
      name: "metric",
      category: "data",
      isProp: false,
      inputType: "dropdown",
      options: data.metrics,
      visible: { name: "dataSource", value: "from base data" }
    },
    {
      name: "area",
      category: "data",
      isProp: false,
      inputType: "dropdown",
      options: data.areas,
      visible: { name: "dataSource", value: "from base data" }
    },
    {
      name: "customDataArray",
      category: "data",
      isProp: false,
      inputType: "textArea",
      visible: { name: "dataSource", value: "custom" },
      value: convertToCSV(data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({ x: el.x, y: el.y })))
    },
    {
      name: "dataArray",
      category: "data",
      isProp: true,
      inputType: null,
      label: "Calculated based on dataSource, metric, area and customDataArray."
    },
    {
      name: "xDomainLowerBound",
      category: "xScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.min(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.x))
    },
    {
      name: "xDomainUpperBound",
      category: "xScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.max(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.x))
    },
    {
      name: "xScaleType",
      category: "xScale",
      isProp: false,
      inputType: "dropdown",
      options: ["scaleLinear", "scaleLog", "scaleTime"]
    },
    {
      name: "xFunction",
      category: "xScale",
      isProp: true,
      inputType: null,
      label: "Calculated based on screenSize, paddingLeft, paddingRight, xDomainLowerBound, xDomainUpperBound and xScaleType.",
      exampleCode: "scaleLinear()<br>&emsp;&emsp;.domain[2015,2022]<br>&emsp;&emsp;.range([0,graphWidth])"
    },
    {
      name: "yDomainLowerBound",
      category: "yScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.min(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.y))
    },
    {
      name: "yDomainUpperBound",
      category: "yScale",
      isProp: false,
      inputType: "numberInput",
      value: Math.max(...data.dataInFormatForLineChart[0].lines.map((el) => el.data).flat().map((el) => el.y))
    },
    {
      name: "yScaleType",
      category: "yScale",
      isProp: false,
      inputType: "dropdown",
      options: ["scaleLinear", "scaleLog", "scaleTime"]
    },
    {
      name: "yFunction",
      category: "yScale",
      isProp: true,
      inputType: null,
      label: "Calculated based on svgHeight, paddingTop, paddingBottom, yDomainLowerBound, yDomainUpperBound and yScaleType.",
      exampleCode: "scaleLinear()<br>&emsp;&emsp;.domain[0,100]<br>&emsp;&emsp;.range([graphHeight,0])"
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
        "curveMonotoneX"
      ]
    },
    {
      name: "lineFunction",
      category: "lineFunction",
      isProp: true,
      inputType: null,
      label: "Calculated based on xFunction, yFunction and curve.",
      exampleCode: "line()<br>&emsp;&emsp;.x((d) => xFunction(d.x))<br>&emsp;&emsp;.y((d) => yFunction(d.y))<br>&emsp;&emsp;.curve(curveLinear)"
    },
    {
      name: "pathStrokeColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "#b312a0"
    },
    {
      name: "pathStrokeWidth",
      category: "path",
      isProp: true,
      inputType: "numberInput",
      value: 3
    },
    {
      name: "pathFillColor",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none"
    },
    {
      name: "pathStrokeDashArray",
      category: "path",
      isProp: true,
      inputType: "input",
      value: "none"
    },
    {
      name: "includeMarkers",
      category: "markers",
      isProp: true,
      inputType: "checkbox"
    },
    {
      name: "markerShape",
      category: "markers",
      isProp: true,
      inputType: "dropdown",
      options: ["circle", "square", "diamond", "triangle"],
      visible: [{ name: "includeMarkers", value: true }]
    },
    {
      name: "markerRadius",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 5,
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerFill",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "#b312a0",
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerStroke",
      category: "markers",
      isProp: true,
      inputType: "input",
      value: "white",
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "markerStrokeWidth",
      category: "markers",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      visible: { name: "includeMarkers", value: true }
    },
    {
      name: "opacity",
      category: "overallStyling",
      isProp: true,
      inputType: "numberInput",
      value: 1,
      step: 0.1,
      min: 0,
      max: 1
    },
    {
      name: "dataId",
      category: "lineEvents",
      isProp: true,
      inputType: "input",
      value: "line-1"
    },
    {
      name: "onClick",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseEnter",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseLeave",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseMove",
      category: "lineEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "markersDataId",
      category: "markerEvents",
      isProp: true,
      inputType: "input",
      value: "markers-group-1"
    },
    {
      name: "onClickMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseEnterMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseLeaveMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    },
    {
      name: "onMouseMoveMarker",
      category: "markerEvents",
      isProp: true,
      inputType: "event"
    }
  ]).map((el) => ({
    ...el,
    handlerFunction: el.inputType === "event" ? el.handlerFunction ?? function(event) {
      defineDefaultEventHandler(event, parametersSourceArray, parametersValuesArray, el.name);
    } : null
  }));
  let parametersValuesArray = parametersSourceArray.map((el) => el.value);
  let xFunction = {
    scaleLinear: scaleLinear(),
    scaleLog: scaleLog(),
    scaleTime: scaleTime()
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xScaleType")].domain([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainLowerBound"),
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "xDomainUpperBound")
  ]).range([
    0,
    demoScreenWidth - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingLeft") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingRight")
  ]);
  let yFunction = {
    scaleLinear: scaleLinear(),
    scaleLog: scaleLog(),
    scaleTime: scaleTime()
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yScaleType")].domain([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainLowerBound"),
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "yDomainUpperBound")
  ]).range([
    getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "svgHeight") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingTop") - getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingBottom"),
    0
  ]);
  let lineFunction = line().x((d) => xFunction(d.x)).y((d) => yFunction(d.y)).curve({
    curveLinear,
    curveLinearClosed,
    curveCardinal,
    curveBasis,
    curveStep,
    curveMonotoneX
  }[getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "curve")]);
  let dataArray = getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "dataSource") === "from base data" ? data.dataInFormatForLineChart.find((el) => el.metric === getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "metric")).lines.find((el) => el.areaCode === getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "area")).data : csvToArrayOfObjects(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "customDataArray"));
  let derivedParametersObject = {
    xFunction,
    yFunction,
    lineFunction,
    dataArray
  };
  let parametersVisibleArray = trackVisibleParameters(parametersSourceArray, parametersValuesArray);
  let parametersObject = createParametersObject(parametersSourceArray, parametersValuesArray, derivedParametersObject);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    ComponentDetails($$payload2, { homepage: false, details });
    $$payload2.out += `<!----> `;
    ParametersSection($$payload2, {
      details,
      parametersSourceArray,
      parametersVisibleArray,
      get parametersValuesArray() {
        return parametersValuesArray;
      },
      set parametersValuesArray($$value) {
        parametersValuesArray = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div data-role="demo-section" class="svelte-m81iik"><h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5> `;
    ScreenSizeRadio($$payload2, {
      get demoScreenWidth() {
        return demoScreenWidth;
      },
      set demoScreenWidth($$value) {
        demoScreenWidth = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div data-role="component-container" class="svelte-m81iik"><div data-role="component-container-centered"${attr("style", `width: ${stringify(demoScreenWidth)}px;`)} class="svelte-m81iik"><svg${attr("width", demoScreenWidth)}${attr("height", getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "svgHeight"))} class="svelte-m81iik"><g${attr("transform", `translate(${stringify(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingLeft"))},${stringify(getValueFromParametersArray(parametersSourceArray, parametersValuesArray, "paddingTop"))})`)}>`;
    Line($$payload2, spread_props([parametersObject]));
    $$payload2.out += `<!----></g></svg></div></div> <div class="mt-20 svelte-m81iik" data-role="examples-section">`;
    DividerLine($$payload2, { margin: "30px 0px 30px 0px" });
    $$payload2.out += `<!----> <h5 class="underline underline-offset-4">Examples</h5></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LineWrapper
}, Symbol.toStringTag, { value: "Module" }));
function ComponentDetailsUpdate($$payload, $$props) {
  push();
  let { wrapper } = $$props;
  $$payload.out += `<h2>${escape_html(wrapper.name)}</h2> <h4>${escape_html(wrapper.folder)}</h4> `;
  if (wrapper.component.WrapperNameAndStatus) {
    $$payload.out += "<!--[-->";
    wrapper.component.WrapperNameAndStatus($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (wrapper.component.WrapperDescription) {
    $$payload.out += "<!--[-->";
    wrapper.component.WrapperDescription($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (wrapper.component.WrapperContext) {
    $$payload.out += "<!--[-->";
    wrapper.component.WrapperContext($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  const wrappersComponentsObject = /* @__PURE__ */ Object.assign({ "../wrappers/content/PillWrapper.svelte": __vite_glob_0_0, "../wrappers/data-vis/LineWrapper.svelte": __vite_glob_0_1 });
  const wrappersComponentsArray = Object.keys(wrappersComponentsObject).map((el) => {
    const splitPath = el.split("/");
    return {
      component: wrappersComponentsObject[el],
      name: splitPath[splitPath.length - 1].replace("Wrapper.svelte", ""),
      folder: splitPath[splitPath.length - 2]
    };
  });
  const wrappersPaths = Object.keys(wrappersComponentsObject);
  wrappersPaths.map((el) => {
    const splitPath = el.split("/");
    return splitPath[splitPath.length - 2];
  });
  console.log(wrappersComponentsArray);
  const each_array = ensure_array_like([
    ...new Set(wrappersComponentsArray.map((el) => el.folder))
  ]);
  $$payload.out += `<div class="g-top-level-container"><div class="flex flex-col gap-6"><div><h4 class="mb-6">Introduction</h4> <p>This library has been developed by members of the MHCLG's Data Tools
        team to house components for use in the organisation's public facing
        products.</p> <p>Check out our <a href="/user-guide">user guide</a> for guidance on how to
        build components for this library.</p> `;
  DividerLine($$payload, { margin: "1rem 0rem" });
  $$payload.out += `<!----></div> <div><h4 class="mb-6">Components</h4> <p>The components available in this library are listed below.</p> <p>Click on a link to visit a component's wrapper page, where you can view
        and test out the component's parameters and see example use cases.</p> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let folder = each_array[$$index_1];
    const wrappersArray = wrappersComponentsArray.filter((el) => el.folder === folder);
    const each_array_1 = ensure_array_like(wrappersArray);
    $$payload.out += `<h5 class="underline underline-offset-4 mt-10 mb-8">${escape_html(textStringConversion(foldersLookup[folder] ?? folder, "title-first-word"))}</h5> <!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let wrapper = each_array_1[$$index];
      ComponentDetailsUpdate($$payload, { wrapper });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  DividerLine($$payload, { margin: "1rem 0rem" });
  $$payload.out += `<!----></div> <div><h4 class="mb-6 mt-10">Playground</h4> <p>The playground is a sandbox space where developers can test code and
        practice combining components.</p> <p>All our playground examples are listed below.</p></div> `;
  DividerLine($$payload, { margin: "1rem 0rem" });
  $$payload.out += `<!----></div></div>`;
  pop();
}
export {
  _page as default
};
