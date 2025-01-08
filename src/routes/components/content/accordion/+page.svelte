<script>
  // @ts-nocheck
  import { page } from '$app/stores';
  import Accordion from '$lib/components/content/Accordion.svelte';
  import DividerLine from '$lib/components/layout/DividerLine.svelte';
  import { defaultScreenWidthBreakpoints } from '$lib/config.js';
  import ComponentDetails from '$lib/package-wrapping/ComponentDetails.svelte';
  import ParametersSection from '$lib/package-wrapping/ParametersSection.svelte';
  import ScreenSizeRadio from '$lib/package-wrapping/ScreenSizeRadio.svelte';
  import { getValueFromParametersArray } from '$lib/utils/data-transformations/getValueFromParametersArray.js';
  import { addIndexAndInitalValue } from '$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js';
  import { createParametersObject } from '$lib/utils/package-wrapping-specific/createParametersObject.js';
  import { trackVisibleParameters } from '$lib/utils/package-wrapping-specific/trackVisibleParameters.js';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';

  let { data, homepage = undefined, folders } = $props();

  let details = {
    status: 'in_progress',
    description: [
      {
        content:
          'An expandable and collapsible section component that allows users to show and hide content.',
      },
      {
        content:
          'Based on the GOV.UK Design System accordion component pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          'Use the accordion component to let users show and hide sections of related content on a page.',
      },
      {
        content:
          'Only use an accordion if there is evidence it is helpful for users.',
      },
    ],
    childComponents: undefined,
    requirements: undefined,
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
  addIndexAndInitalValue([
    {
      name: 'sections',
      category: 'Content',
      isProp: true,
      inputType: 'textArea',
      value: JSON.stringify(
        [
          {
            id: '1',
            heading: 'Writing well for the web',
            summary: 'Learn about writing content for your website',
            content: 'This is the content for Writing well for the web.',
            expanded: true,
          },
          {
            id: '2',
            heading: 'Writing well for specialists',
            summary: 'Guidance for writing technical content',
            content: 'This is the content for Writing well for specialists.',
            expanded: false,
          },
          {
            id: '3',
            heading: 'Know your audience',
            summary: 'Understanding who your users are',
            content: 'This is the content for Know your audience.',
          },
        ],
        null,
        2
      ),
    },
    {
      name: 'hideAllSections',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Hide all sections please',
    },
    {
      name: 'hideSection',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Hide',
    },
    {
      name: 'hideSectionAriaLabel',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Hide this section',
    },
    {
      name: 'showAllSections',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Show all sections',
    },
    {
      name: 'showSection',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Show',
    },
    {
      name: 'showSectionAriaLabel',
      category: 'UI Toggle Labels',
      isProp: true,
      inputType: 'input',
      value: 'Show this section',
    },
    {
      name: 'allSectionToggle',
      category: 'Accordion Toggle Options',
      isProp: true,
      inputType: 'checkbox',
      value: 'true',
    },
    {
      name: 'minSectionsAllSectionToggle',
      category: 'Accordion Toggle Options',
      isProp: true,
      inputType: 'input',
      value: '2',
    },
    {
      name: 'rememberIsExpandedState',
      category: 'Accordion Toggle Options',
      isProp: true,
      inputType: 'checkbox',
      value: 'true',
    },
  ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value)
  );

  let sections = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          'sections'
        )
      )
  );

  /*let sections = $derived(
    (() => {
      try {
        return JSON.parse(
          getValueFromParametersArray(
            parametersSourceArray,
            parametersValuesArray,
            'sections'
          )
        );
      } catch {
        return [];
      }
    })()
  );*/

  let derivedParametersObject = $derived(homepage ?? { sections });

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray)
  );

  $inspect(parametersValuesArray);

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject
      )
  );
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    {parametersVisibleArray}
    bind:parametersValuesArray
  ></ParametersSection>

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex flex-col gap-4">
        <h6>Example Accordion</h6>
        <Accordion {...parametersObject}></Accordion>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px"></DividerLine>
    <h5 class="underline underline-offset-4">Examples</h5>
  </div>
{/if}

<style>
  [data-role='examples-section'] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role='demo-section'] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role='component-container'] {
    display: grid;
    place-items: center;
  }

  [data-role='component-container-centered'] {
    background-color: #f8f8f8;
    padding: 20px 0px;
  }
</style>
