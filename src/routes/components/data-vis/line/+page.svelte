<script>
  import { page } from '$app/stores';
  // @ts-nocheck
  import ComponentDetails from '$lib/package-specific/ComponentDetails.svelte';
  import { toUrlSlug } from '$lib/utils/url-conversion/toUrlSlug.js';

  $inspect(page);

  let pathname = $derived($page.url.pathname);

  $inspect(pathname);

  let { data, detailsOnly = false } = $props();

  let componentDetails = {
    /**
     * &&     name - Used to link to the components routes page, must match the routes folder structure
    name: 'Line',
    /**
     * &&     folder - Used to link to the components routes page, must match the routes folder structure
     * ?      Available folders are:
     * ?      'ui', 'data-vis', 'layout', 'embed'
     */
    folder: 'data-vis',
    /**
     * &&     status - Used by the pill-status component within ComponentDetails
     * ?      Available statuses are:
     * ?      'to-be-developed', 'in-progress', 'complete-untested', 'complete-in-use', 'complete-accessible'
     */
    status: 'to-be-developed',
    /**
     * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    description: [
      {
        content:
          'This component takes an array of data and two scale functions and returns an svg line.',
      },
    ],
    /**
     * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
     * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
     */
    context: [
      {
        content:
          "<p>Used within svg elements as part of the creation of data visualisations - most notably by the <a href=''>'Lines' component.</a><p>",
        markdown: true,
      },
      {
        content:
          'The Lines component renders a collection of lines as a group allowing all lines to update based on user interactions with a single line (e.g. reduce opacity of other lines when user hovers)',
      },
    ],
    /**
     * &&     requirements - Optional detail, can be used by developers to track which requirements for the component have been coded up.
     * ?      The 'description' parameter is optional (default is not to provide a description).
     * ?      For each paragraph there is an optional 'markdown' (default = false) parameter. When set to true, it uses the @html tag to render the content.
     * ?      For each paragraph there is an optional 'fulfiled' (default = false) parameter. When set to true, the text will be highlighted green and struck-through, demonstrating that this requirmeent has been coded up.
     */
    requirements: [
      {
        name: 'Style the line',
        description:
          'Allow developer to provide custom styling to the line - including color, stroke-width, opacity.',
        fulfiled: true,
      },
      {
        name: 'Set the curvature of the line',
        description:
          "Allow developer to set the 'curve' of the line - using the d3 set of curve options.",
      },
      {
        name: 'Markers',
        description:
          'Allow developer to add markers/value labels at different data points along their line.',
      },
    ],
    /**
     * &&     childComponents - Optional detail, can be used by developers to link to components which this component relies upon.
     * ?     'name' and 'folder' must match the routes folder structure (see documentation above for 'name' and 'folder' above for available options)
     */
    childComponents: undefined,
  };
</script>

{#snippet name()}
  {@const nameDetails = { name: 'Line', folder: 'data-vis' }}
  {#if detailsOnly}
    <a href="/{nameDetails.folder}/{toUrlSlug(nameDetails.name)}">
      <h5 class="underline underline-offset-4">{nameDetails.name}</h5></a
    >
  {:else}
    <h1>{nameDetails.name}</h1>
  {/if}
{/snippet}

{#snippet description()}
  <div class="pr-5">
    <p>
      This component takes flat time-series data, x and y scales and creates an
      SVG line.
    </p>
  </div>
{/snippet}

{#snippet childComponents()}
  {@const childComponentsArray = []}
  {#each childComponentsArray as component}
    <li>
      <a href="/{component.folder}/{toUrlSlug(component.name)}">
        {component.name}
      </a>
    </li>
  {/each}
  <!-- <li>None specified</li> -->
{/snippet}

<ComponentDetails {detailsOnly} {name} {description} {childComponents}
></ComponentDetails>
