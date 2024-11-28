<script>
  // @ts-nocheck
  import { page } from '$app/stores';
  import ComponentDetails from '$lib/package-wrapping/ComponentDetails.svelte';
  import InputForParameter from '$lib/package-wrapping/InputForParameter.svelte';
  import {
    convertToCSV,
    csvToArrayOfObjects,
  } from '$lib/utils/data-transformations/convertCSV.js';
  import { createRefinedParametersObject } from '$lib/utils/data-transformations/createRefinedParametersObject.js';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { scaleLinear } from 'd3-scale';
  import { line } from 'd3-shape';

  let { data, homepage = false, folders } = $props();

  let details = {
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
     */
    status: 'to_be_developed',
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
      },
      {
        label: 'Markers',
        description:
          'Allow developer to add markers/value labels at different data points along their line.',
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

  $inspect(data?.dataInFormatForLineChart);

  let svgWidth = 600;
  let svgHeight = 300;

  let y = $derived(scaleLinear().domain([0, 100]).range([svgHeight, 0]));
  let x = $derived(scaleLinear().domain([2015, 2022]).range([svgWidth, 0]));

  let pathFunction = line()
    .x((d) => x(d.x))
    .y((d) => y(d.y));

  let parametersSourceArray = [
    {
      name: 'dataSource',
      category: 'data',
      isProp: false,
      inputType: 'radio',
      options: ['from base data', 'custom'],
    },
    {
      name: 'metric',
      category: 'data',
      isProp: false,
      inputType: 'dropdown',
      options: data.metrics,
      visible: { name: 'dataSource', value: 'from base data' },
    },
    {
      name: 'area',
      category: 'data',
      isProp: false,
      inputType: 'dropdown',
      options: data.areas,
      visible: { name: 'dataSource', value: 'from base data' },
    },
    {
      name: 'customDataArray',
      category: 'data',
      isProp: false,
      inputType: 'textArea',
      visible: { name: 'dataSource', value: 'custom' },
      value: convertToCSV(data.dataInFormatForLineChart[0].lines[0].data),
    },
    {
      name: 'dataArray',
      category: 'data',
      isProp: true,
      inputType: null,
    },
  ].map((el, i) => ({ ...el, index: i }));

  let parametersValuesArray = $state(
    parametersSourceArray.map((el) => {
      return el.value ?? el.options?.[0] ?? null;
    })
  );

  let parametersVisibleArray = $derived(
    parametersSourceArray.map((el) =>
      !('visible' in el)
        ? true
        : typeof el.visible === 'boolean'
          ? el.visible
          : parametersValuesArray[
              parametersSourceArray.findIndex(
                (elm) => elm.name === el.visible.name
              )
            ] === el.visible.value
    )
  );

  let parametersObject = $derived(
    parametersSourceArray.reduce((acc, { isProp, name }, index) => {
      acc[name] = { isProp: isProp, value: parametersValuesArray[index] };
      return acc;
    }, {})
  );

  let compositeValuesArray = $derived([
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
            parametersValuesArray[
              parametersSourceArray.findIndex(
                (el) => el.name === 'customDataArray'
              )
            ]
          ),
        },
      ],
    },
  ]);

  let parametersObjectRefined = $derived(
    createRefinedParametersObject(parametersObject, compositeValuesArray)
  );

  $inspect(parametersObject, 'goodbye');
  $inspect(parametersObjectRefined, 'hello');

  //let ppO = $derived(createParametersObject(parametersSourceArray, parametersValuesArray, ))

  /*let parametersObject = $derived(
    parametersSourceArray.reduce((acc, { isProp, name }, index) => {
      if (isProp) {
        if (name === 'dataArray') {
          acc[name] =
            parametersValuesArray[
              parametersSourceArray.findIndex(
                (elm) => elm.name === 'dataSource'
              )
            ] === 'from base data'
              ? 'doubleData'
              : 10;
        } else {
          acc[name] = parametersValuesArray[index];
        }
      }
      return acc;
    }, {})
  );*/

  /*let parametersObject = $derived(
    parametersArray.reduce((acc, { propName, value, inputType }) => {
      acc[propName] = inputType === 'textArea' ? JSON.parse(value) : value;
      return acc;
    }, {})
  );*/

  /*let dataSource = $state(
    setInitialValuesOfInputs({
      propName: 'dataSource',
      isProp: false,
      category: 'data',
      inputType: 'radio',
      options: ['from base data', 'custom'],
    })
  );

  $inspect(dataSource);

  let metric = $state(
    setInitialValuesOfInputs({
      propName: 'metric',
      isProp: false,
      category: 'data',
      inputType: 'dropdown',
      options: data.metrics,
      visibile: dataSource.value === 'from base data',
    })
  );

  let area = $state(
    setInitialValuesOfInputs({
      propName: 'area',
      isProp: false,
      category: 'data',
      inputType: 'dropdown',
      options: data.areas,
      visibile: dataSource.value === 'from base data',
    })
  );

  let customDataArray = $state(
    setInitialValuesOfInputs({
      propName: 'customDataArray',
      isProp: false,
      category: 'data',
      inputType: 'textArea',
      value: data?.dataInFormatForLineChart
        .find((el) => el.metric === metric.value)
        .lines.find((el) => el.area === area.value).data,
      visibile: dataSource.value === 'custom',
    })
  );

  let dataArray = $state(
    setInitialValuesOfInputs({
      propName: 'dataArray',
      isProp: true,
      category: 'data',
      inputType: null,
      value:
        dataSource.value === 'from base data'
          ? data?.dataInFormatForLineChart
              .find((el) => el.metric === metric.value)
              .lines.find((el) => el.area === area.value).data
          : customDataArray.value,
      visibile: false,
    })
  );

  let parametersArray = $state([
    dataSource,
    metric,
    area,
    customDataArray,
    dataArray,
  ]);*/

  /*let parametersArray = $state([
    dataSource,

    {
      propName: 'area',
      isProp: false,
      category: 'data',
      inputType: 'dropdown',
      options: data.areas,
      visibile: { propName: 'dataSource', value: 'from base data' },
    },
    {
      propName: 'customDataArray',
      isProp: false,
      category: 'data',
      inputType: 'textArea',
      options: data.areas,
      visibile: { propName: 'dataSource', value: 'custom' },
    },
  ]);*/

  /*let parametersArrayBase = $state(
    setInitialValuesOfInputs([
      {
        propName: 'data source',
        isProp: false,
        category: 'data',
        inputType: 'radio',
        options: ['from base data', 'custom'],
        visibile: true,
      },
    ])
  );

  let parametersArrayDerived1 = $derived(
    setInitialValuesOfInputs([
      {
        propName: 'metric',
        isProp: false,
        category: 'data',
        inputType: 'dropdown',
        options: data.metrics,
        visibile:
          parametersArrayBase.find((el) => el.propName === 'data source')
            .value === 'from source data',
      },
      {
        propName: 'area',
        isProp: false,
        category: 'data',
        inputType: 'dropdown',
        options: data.areas,
        visibile:
          parametersArrayBase.find((el) => el.propName === 'data source')
            .value === 'from source data',
      },
    ])
  );

  let parametersArrayDerived2 = $derived(setInitialValuesOfInputs([]));

  let parametersArrayCombined = $derived([
    ...parametersArrayBase,
    ...parametersArrayDerived1,
    ...parametersArrayDerived2,
  ]);

  let parameterCategories = $derived([
    ...new Set(parametersArrayCombined.map((el) => el.category)),
  ]);

  let parametersArraySplitIntoCategories = $derived(
    parameterCategories.map((el) => ({
      category: el,
      parameters: parametersArrayCombined.filter((elm) => elm.category === el),
    }))
  );

  $inspect(parametersArraySplitIntoCategories);
  $inspect(parameterCategories);
  $inspect(parametersArrayCombined);*/

  /*let initialParametersArray = $state([
    { x: initialParametersArray?.find((el) => el === 100) },
  ]);*/

  /*let initialParametersArray = $state(
    [
      {
      propName: 'markers',
      inputType: 'checkbox',
      value: false,
      determinant: true,
    },
      {
        category: 'data',
        propName: 'data source',
        inputType: 'radio',
        options: ['from base data', 'custom'],
        determinant: true,
        visibile: true,
      },

      {
      propName: 'dataArray',
      inputType: 'textArea',
      value: JSON.stringify(
        data?.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
          x: el.yearInt,
          y: el.Value,
        }))
      ),
    },
    ].map((el) => {
      if (['radio', 'dropdown'].includes(el.inputType)) {
        el.value = el.options[0];
      }
      return el;
    })
  );

  let metric = $derived({
    category: 'data',
    propName: 'metric',
    inputType: 'dropdown',
    options: data.metrics,
    determinant: true,
    visibile:
      initialParametersArray.find((el) => el.propName === 'data source')
        .value === 'from source data',
  });

  let area = $derived({
    category: 'data',
    propName: 'area',
    inputType: 'dropdown',
    options: data.areas,
    determinant: true,
    visibile:
      initialParametersArray.find((el) => el.propName === 'data source')
        .value === 'from source data',
  });

  let lineData = $derived({
    category: 'data',
    propName: 'lineData',
    inputType: 'textArea',
    determinant: true,
    visibile: initialParametersArray.find((el) => el.propName === 'data source')
      .visibile,
    value:
      initialParametersArray.find((el) => el.propName === 'data source')
        .value === 'from base data'
        ? data?.dataInFormatForLineChart.find((el) => el.metric === 100)
        : 0,
  });

  let combinedParametersArray = $derived([
    ...initialParametersArray,
    metric,
    area,
    lineData,
  ]);

  $inspect(combinedParametersArray);*/

  /*let parametersObject = $derived(
    parametersArray.reduce((acc, { propName, value, inputType }) => {
      acc[propName] = inputType === 'textArea' ? JSON.parse(value) : value;
      return acc;
    }, {})
  );*/

  /*let color = $state('red');
  let strokeWidth = $state('3px');
  let markers = $state(false);
  let dataArray = $state(
    JSON.stringify(
      data?.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
        x: el.yearInt,
        y: el.Value,
      }))
    )
  );*/
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <div
    data-role="parameters-container"
    class="mx-auto flex flex-row gap-6 mb-6 flex-wrap items-start"
  >
    {#each [...new Set(parametersSourceArray.map((el) => el.category))] as category}
      {category}
      {#each parametersSourceArray.filter((el) => el.category === category) as parameter}
        {#if parameter.inputType && parametersVisibleArray[parameter.index]}
          <InputForParameter
            source={parameter}
            bind:value={parametersValuesArray[parameter.index]}
          ></InputForParameter>
        {/if}
      {/each}
    {/each}

    <!-- {#each parametersSourceArray as parameter, i}
      {#if parameter.inputType && parametersVisibleArray[i]}
        <InputForParameter
          source={parameter}
          bind:value={parametersValuesArray[i]}
        ></InputForParameter>
      {/if}
    {/each} -->
    <!-- {#each parametersArraySplitIntoCategories as row}
      {row.category}
      {#each row.parameters as parameter, i}
        <InputForParameter bind:parameter={row.parameters[i]}
        ></InputForParameter>
      {/each}
    {/each} -->
    <!-- {#each parametersArray as parameter, i}
      <InputForParameter bind:parameter={parametersArray[i]}
      ></InputForParameter>
    {/each} -->

    <!-- <div>
      <Label for="default-input" class="block mb-2" color="primary">Color</Label
      >
      <Input id="default-input" bind:value={color} color="primary" />
    </div>

    <div>
      <Label for="default-input" class="block mb-2" color="primary"
        >Stroke-width</Label
      >
      <Input id="default-input" bind:value={strokeWidth} color="primary" />
    </div> -->
  </div>

  <!-- <Wrapper {...parametersObject}></Wrapper> -->

  <!-- <svg class="mx-auto bg-slate-100" width={svgWidth} height={svgHeight}>
    <Line {pathFunction} {x} {y} {...parametersObject}></Line>
  </svg> -->
{/if}

<style>
  svg {
    overflow: visible;
  }
</style>
