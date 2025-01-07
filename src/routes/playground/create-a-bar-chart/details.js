export let details = {
  /**
   * &&     description - An array of paragraphs of text explaining what the page does, used within PlaygroundDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  description: [
    {
      content:
        'This page was created as a sandbox environment for developing our first component. Each developer has built their own version of this bar chart component.',
    },
    {
      content: 'This bar chart is constructed using a row-by-row approach.',
    },
  ],
  steps: [
    { label: 'Set up core row-by-row structure.', complete: true },
    {
      label:
        'Add placeholder components for titles, legends, axes and sources.',
      complete: true,
    },
    {
      label:
        'Define a function that separates rows evenly along the height of the chart.', complete: true
    },
    {
      label:
        'Define an xScale based on data, use it to plot a bar for each row.', complete: true
    },
    {
      label:
        'Create functionality that allows a developer to re-order rows from highest to smallest.',
    },
    {
      label:
        'Create functionality that allows a developer to change the color of specific bars.', complete: true
    },

    {
      label: 'Add name-labels and value-labels for each row.', complete: true
    },
  ],
};
