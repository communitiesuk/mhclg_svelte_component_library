export let details = {
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
