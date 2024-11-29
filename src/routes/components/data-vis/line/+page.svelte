<script>
  // @ts-nocheck
  import { page } from '$app/stores';
  import Line from '$lib/components/data-vis/line-chart/Line.svelte';
  import { defaultScreenWidthBreakpoints } from '$lib/config.js';
  import ComponentDetails from '$lib/package-wrapping/ComponentDetails.svelte';
  import ParametersSection from '$lib/package-wrapping/ParametersSection.svelte';
  import {
    convertToCSV,
    csvToArrayOfObjects,
  } from '$lib/utils/data-transformations/convertCSV.js';
  import { createRefinedParametersObject } from '$lib/utils/data-transformations/createRefinedParametersObject.js';
  import { getValueFromParametersArray } from '$lib/utils/data-transformations/getValueFromParametersArray.js';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { scaleLinear, scaleLog, scaleTime } from 'd3-scale';
  import {
    curveBasis,
    curveCardinal,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveStep,
    line,
  } from 'd3-shape';
  import { Radio } from 'flowbite-svelte';

  let { data, homepage = undefined, folders } = $props();

  let details = {
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: 'complete_untested',
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: [
      {
        content:
          'This component takes an array of data, two scale functions and a line function and renders an svg path element.',
      },
    ],
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: [
      {
        content:
          "Used within svg elements as part of the creation of data visualisations - most notably by the <a href='/components/data-vis/line/'>Lines</a> component.",
        markdown: true,
      },
      {
        content:
          'The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers). Even individual lines should normally be created using the Lines component.',
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
    requirements: [
      {
        label: 'Style the line',
        description:
          'Allow developer to provide custom styling to the line - including color, stroke-width, opacity.',
        fulfilled: true,
      },
      {
        label: 'Set the curvature of the line',
        description:
          "Allow developer to set the 'curve' of the line - using the d3 set of curve options.",
        fulfilled: true,
      },
      {
        label: 'Markers',
        description:
          'Allow developer to add markers at each data point along their line.',
        fulfilled: true,
      },
    ],
  };

  let pageInfo = $page?.route.id.split('/');

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    'title-first-word'
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  let parametersSourceArray =
    homepage ??
    [
      {
        name: 'svgHeight',
        category: 'dimensions',
        isProp: false,
        inputType: 'numberInput',
        value: 400,
        feedsInto: 'yFunction',
      },
      {
        name: 'paddingTop',
        category: 'dimensions',
        isProp: false,
        inputType: 'numberInput',
        value: 50,
        feedsInto: 'yFunction',
      },
      {
        name: 'paddingRight',
        category: 'dimensions',
        isProp: false,
        inputType: 'numberInput',
        value: 50,
        feedsInto: 'xFunction',
      },
      {
        name: 'paddingBottom',
        category: 'dimensions',
        isProp: false,
        inputType: 'numberInput',
        value: 50,
        feedsInto: 'xFunction',
      },
      {
        name: 'paddingLeft',
        category: 'dimensions',
        isProp: false,
        inputType: 'numberInput',
        value: 50,
        feedsInto: 'xFunction',
      },
      {
        name: 'dataSource',
        category: 'data',
        isProp: false,
        inputType: 'radio',
        options: ['from base data', 'custom'],
        feedsInto: 'dataArray',
      },
      {
        name: 'metric',
        category: 'data',
        isProp: false,
        inputType: 'dropdown',
        options: data.metrics,
        visible: { name: 'dataSource', value: 'from base data' },
        feedsInto: 'dataArray',
      },
      {
        name: 'area',
        category: 'data',
        isProp: false,
        inputType: 'dropdown',
        options: data.areas,
        visible: { name: 'dataSource', value: 'from base data' },
        feedsInto: 'dataArray',
      },
      {
        name: 'customDataArray',
        category: 'data',
        isProp: false,
        inputType: 'textArea',
        visible: { name: 'dataSource', value: 'custom' },
        value: convertToCSV(
          data.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
            x: el.x,
            y: el.y,
          }))
        ),
        feedsInto: 'dataArray',
      },
      {
        name: 'dataArray',
        category: 'data',
        isProp: true,
        inputType: null,
      },
      {
        name: 'xDomainLowerBound',
        category: 'xScale',
        isProp: false,
        inputType: 'numberInput',
        value: Math.min(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.x)
        ),
        feedsInto: ['xFunction', 'lineFunction'],
      },
      {
        name: 'xDomainUpperBound',
        category: 'xScale',
        isProp: false,
        inputType: 'numberInput',
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.x)
        ),
        feedsInto: ['xFunction', 'lineFunction'],
      },
      {
        name: 'xScaleType',
        category: 'xScale',
        isProp: false,
        inputType: 'dropdown',
        options: ['scaleLinear', 'scaleLog', 'scaleTime'],
        feedsInto: ['xFunction', 'lineFunction'],
      },
      {
        name: 'xFunction',
        category: 'xScale',
        isProp: true,
        inputType: null,
      },
      {
        name: 'yDomainLowerBound',
        category: 'yScale',
        isProp: false,
        inputType: 'numberInput',
        value: Math.min(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.y)
        ),
        feedsInto: ['yFunction', 'lineFunction'],
      },
      {
        name: 'yDomainUpperBound',
        category: 'yScale',
        isProp: false,
        inputType: 'numberInput',
        value: Math.max(
          ...data.dataInFormatForLineChart[0].lines
            .map((el) => el.data)
            .flat()
            .map((el) => el.y)
        ),
        feedsInto: ['yFunction', 'lineFunction'],
      },
      {
        name: 'yScaleType',
        category: 'yScale',
        isProp: false,
        inputType: 'dropdown',
        options: ['scaleLinear', 'scaleLog', 'scaleTime'],
        feedsInto: ['yFunction', 'lineFunction'],
      },
      {
        name: 'yFunction',
        category: 'yScale',
        isProp: true,
        inputType: null,
      },
      {
        name: 'curve',
        category: 'lineFunction',
        isProp: false,
        inputType: 'dropdown',
        options: [
          'curveLinear',
          'curveLinearClosed',
          'curveCardinal',
          'curveBasis',
          'curveStep',
          'curveMonotoneX',
        ],
        feedsInto: 'lineFunction',
      },
      {
        name: 'lineFunction',
        category: 'lineFunction',
        isProp: true,
        inputType: null,
      },
      {
        name: 'pathStrokeColor',
        category: 'path',
        isProp: true,
        inputType: 'input',
        value: '#b312a0',
      },
      {
        name: 'pathStrokeWidth',
        category: 'path',
        isProp: true,
        inputType: 'numberInput',
        value: 3,
      },
      {
        name: 'pathFillColor',
        category: 'path',
        isProp: true,
        inputType: 'input',
        value: 'none',
      },
      {
        name: 'pathStrokeDashArray',
        category: 'path',
        isProp: true,
        inputType: 'input',
        value: 'none',
      },
      {
        name: 'includeMarkers',
        category: 'markers',
        isProp: true,
        inputType: 'checkbox',
      },
      {
        name: 'markerShape',
        category: 'markers',
        isProp: true,
        inputType: 'dropdown',
        options: ['circle', 'square', 'diamond', 'triangle'],
        visible: { name: 'includeMarkers', value: true },
      },
      {
        name: 'markerRadius',
        category: 'markers',
        isProp: true,
        inputType: 'numberInput',
        value: 5,
        visible: { name: 'includeMarkers', value: true },
      },

      {
        name: 'markerFill',
        category: 'markers',
        isProp: true,
        inputType: 'input',
        value: '#b312a0',
        visible: { name: 'includeMarkers', value: true },
      },
      {
        name: 'markerStroke',
        category: 'markers',
        isProp: true,
        inputType: 'input',
        value: 'white',
        visible: { name: 'includeMarkers', value: true },
      },
      {
        name: 'markerStrokeWidth',
        category: 'markers',
        isProp: true,
        inputType: 'numberInput',
        value: 1,
        visible: { name: 'includeMarkers', value: true },
      },
      {
        name: 'opacity',
        category: 'overallStyling',
        isProp: true,
        inputType: 'numberInput',
        value: 1,
      },
      {
        name: 'dataId',
        category: 'lineEvents',
        isProp: true,
        inputType: 'input',
        value: 'line-1',
      },
      {
        name: 'onClick',
        category: 'lineEvents',
        isProp: true,
        inputType: 'event',
      },
      {
        name: 'onMouseEnter',
        category: 'lineEvents',
        isProp: true,
        inputType: 'event',
      },
      {
        name: 'onMouseLeave',
        category: 'lineEvents',
        isProp: true,
        inputType: 'event',
      },
      {
        name: 'onMouseMove',
        category: 'lineEvents',
        isProp: true,
        inputType: 'event',
      },
      {
        name: 'markersDataId',
        category: 'markerEvents',
        isProp: true,
        inputType: 'input',
        value: 'markers-group-1',
      },
      {
        name: 'onClickMarker',
        category: 'markerEvents',
        isProp: true,
        inputType: 'event',
      },
    ].map((el, i) => {
      if (el.inputType === 'event') {
        return {
          ...el,
          index: i,
          value: [0, null],
          handlerFunction: function (event) {
            defineDefaultEventHandler(
              event,
              parametersSourceArray,
              parametersValuesArray,
              el.name
            );
          },
        };
      } else {
        return { ...el, index: i };
      }
    });

  let parametersValuesArray = $state(
    homepage ??
      parametersSourceArray.map((el) => {
        return el.value ?? el.options?.[0] ?? null;
      })
  );

  let parametersVisibleArray = $derived(
    homepage ??
      parametersSourceArray.map((el) =>
        !('visible' in el)
          ? true
          : typeof el.visible === 'boolean'
            ? el.visible
            : getValueFromParametersArray(
                parametersSourceArray,
                parametersValuesArray,
                el.visible.name
              ) === el.visible.value
      )
  );

  let parametersObject = $derived(
    homepage ??
      parametersSourceArray.reduce(
        (acc, { isProp, name, inputType, handlerFunction }, index) => {
          acc[name] = {
            isProp: isProp,
            value:
              inputType === 'event'
                ? handlerFunction
                : parametersValuesArray[index],
          };
          return acc;
        },
        {}
      )
  );

  let xFunction = $derived(
    homepage ??
      {
        scaleLinear: scaleLinear(),
        scaleLog: scaleLog(),
        scaleTime: scaleTime(),
      }[
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'xScaleType'
        )
      ]
        .domain([
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'xDomainLowerBound'
          ),
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'xDomainUpperBound'
          ),
        ])
        .range([
          0,
          demoScreenWidth -
            getValueFromParametersArray(
              parametersSourceArray,
              parametersValuesArray,
              'paddingLeft'
            ) -
            getValueFromParametersArray(
              parametersSourceArray,
              parametersValuesArray,
              'paddingRight'
            ),
        ])
  );

  let yFunction = $derived(
    homepage ??
      {
        scaleLinear: scaleLinear(),
        scaleLog: scaleLog(),
        scaleTime: scaleTime(),
      }[
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'yScaleType'
        )
      ]
        .domain([
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'yDomainLowerBound'
          ),
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'yDomainUpperBound'
          ),
        ])
        .range([
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'svgHeight'
          ) -
            getValueFromParametersArray(
              parametersSourceArray,
              parametersValuesArray,
              'paddingTop'
            ) -
            getValueFromParametersArray(
              parametersSourceArray,
              parametersValuesArray,
              'paddingBottom'
            ),
          0,
        ])
  );

  let compositeValuesArray = $derived(
    homepage ?? [
      {
        name: 'xFunction',
        value: xFunction,
      },
      {
        name: 'yFunction',
        value: yFunction,
      },
      {
        name: 'lineFunction',
        value: line()
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
                'curve'
              )
            ]
          ),
      },

      {
        name: 'dataArray',
        key: 'dataSource',
        options: [
          {
            name: 'from base data',
            value: data.dataInFormatForLineChart
              .find((el) => el.metric === parametersObject.metric.value)
              .lines.find((el) => el.areaCode === parametersObject.area.value)
              .data,
          },
          {
            name: 'custom',
            value: csvToArrayOfObjects(
              getValueFromParametersArray(
                parametersSourceArray,
                parametersValuesArray,
                'customDataArray'
              )
            ),
          },
        ],
      },
    ]
  );

  let parametersObjectRefined = $derived(
    homepage ??
      createRefinedParametersObject(parametersObject, compositeValuesArray)
  );

  let parameterCategories = $derived(
    homepage ?? [...new Set(parametersSourceArray.map((el) => el.category))]
  );

  function defineDefaultEventHandler(
    event,
    parametersSourceArray,
    parametersValuesArray,
    name
  ) {
    parametersValuesArray[
      parametersSourceArray.findIndex((el) => el.name === name)
    ][0] += 1;

    parametersValuesArray[
      parametersSourceArray.findIndex((el) => el.name === name)
    ][1] = event.currentTarget.dataset.id;
  }
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <ParametersSection
    {details}
    {parameterCategories}
    {parametersSourceArray}
    {parametersVisibleArray}
    bind:parametersValuesArray
  ></ParametersSection>

  <div data-role="demo-section">
    <div>
      <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>

      <ul
        class="my-4 mx-0 items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600"
        style="min-width: 800px;"
      >
        {#each Object.keys(defaultScreenWidthBreakpoints) as screenSizeOption}
          <li class="w-full">
            <Radio
              bind:group={demoScreenWidth}
              name="hor-list"
              class="p-4 text-base"
              value={defaultScreenWidthBreakpoints[screenSizeOption]}
              >{screenSizeOption} ({defaultScreenWidthBreakpoints[
                screenSizeOption
              ]}px)</Radio
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div data-role="component-container">
    <svg
      width={demoScreenWidth}
      height={getValueFromParametersArray(
        parametersSourceArray,
        parametersValuesArray,
        'svgHeight'
      )}
    >
      <g
        transform="translate({getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'paddingLeft'
        )},{getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'paddingTop'
        )})"
      >
        <Line {...parametersObjectRefined}></Line>
      </g>
    </svg>
  </div>
{/if}

<style>
  svg {
    overflow: hidden;
    background-color: #f8f8f8;
  }

  [data-role='demo-section'] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role='component-container'] {
    display: flex;
    justify-content: center;
  }
</style>
