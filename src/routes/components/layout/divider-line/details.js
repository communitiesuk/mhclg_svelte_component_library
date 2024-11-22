export let details = {
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
        'This component provides a horizontal or vertical line to separate content.',
    },
  ],
  /**
   * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  context: [
    {
      content:
        "Used to separate content. Based on this <a href='https://design-system.service.gov.uk/styles/section-break/'>GDS component.</a>",
      markdown: true,
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
  requirements: undefined,
};
