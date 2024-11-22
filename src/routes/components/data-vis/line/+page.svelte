<script>
  // @ts-nocheck
  import { page } from '$app/stores';
  import Line from '$lib/components/data-vis/line-chart/Line.svelte';
  import ComponentDetails from '$lib/package-wrapping/ComponentDetails.svelte';
  import InputForParameter from '$lib/package-wrapping/InputForParameter.svelte';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { scaleLinear } from 'd3-scale';
  import { line } from 'd3-shape';
  import { Input, Label } from 'flowbite-svelte';
  import { details } from './details.js';

  let { data, homepage = false, folders } = $props();

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

  let parametersArray = $state([
    { propName: 'markers', inputType: 'checkbox', value: false },
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
  ]);

  let parametersObject = $derived(
    parametersArray.reduce((acc, { propName, value, inputType }) => {
      acc[propName] = inputType === 'textArea' ? JSON.parse(value) : value;
      return acc;
    }, {})
  );

  let color = $state('red');
  let strokeWidth = $state('3px');
  let markers = $state(false);
  let dataArray = $state(
    JSON.stringify(
      data?.dataInFormatForLineChart[0].lines[0].data.map((el) => ({
        x: el.yearInt,
        y: el.Value,
      }))
    )
  );
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <div
    data-role="parameters-container"
    class="mx-auto flex flex-row gap-6 mb-6 flex-wrap items-start"
  >
    {#each parametersArray as parameter, i}
      <InputForParameter bind:parameter={parametersArray[i]}
      ></InputForParameter>
    {/each}

    <div>
      <Label for="default-input" class="block mb-2" color="primary">Color</Label
      >
      <Input id="default-input" bind:value={color} color="primary" />
    </div>

    <div>
      <Label for="default-input" class="block mb-2" color="primary"
        >Stroke-width</Label
      >
      <Input id="default-input" bind:value={strokeWidth} color="primary" />
    </div>
  </div>

  <svg class="mx-auto bg-slate-100" width={svgWidth} height={svgHeight}>
    <Line {pathFunction} {x} {y} {color} {strokeWidth} {...parametersObject}
    ></Line>
  </svg>
{/if}

<style>
  svg {
    overflow: visible;
  }
</style>
