export let details = {
  /**
   * &&     status - Used by the pill-status component within ComponentDetails
   * ?      Available statuses are:
   * ?      'to_be_developed', 'in_progress', 'complete_untested', 'complete_in_use', 'complete_accessible'
   */
  status: 'in_progress',
  /**
   * &&     description - An array of paragraphs of text explaining what the component does, used within ComponentDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  description: [
    {
      content:
        'A compact label that provides status or metadata for a primary interface area.',
    },
    {
      content:
        'Currently relying on the <a href="https://flowbite-svelte.com/docs/components/tooltip">Flowbite tooltip</a> for hover functionality.',
      markdown: true,
    },
  ],
  /**
   * &&     context - An array of paragraphs of text explaining when the component will be used (e.g. what is it's parent component likely to be, what components will it be used in combination with) - used within ComponentDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  context: undefined,
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
