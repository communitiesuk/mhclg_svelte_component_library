export let details = {
  /**
   * &&     description - An array of paragraphs of text explaining what the page does, used within PlaygroundDetails
   * ?      For each paragraph there is an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content.
   */
  description: [
    {
      content:
        'This page was created as a sandbox environment for developers starting to gain experience manipulating data in JS writing efficient and clear code in Svelte and creating components.',
    },
    {
      content:
        'Since this was one of the first test projects we worked on, before we were building rigorously tested components, some of the code may not follow best practice guidelines.',
    },
  ],
  steps: [
    { label: 'Manipulate data', complete: true },
    { label: 'Create radio button components', complete: true },
    {
      label:
        'Add on-click functionalilty to radio buttons, that reactively filters for the data we want to visualise',
      complete: true,
    },
    {
      label: 'Create scale and line functions for our line chart',
      complete: false,
    },
    {
      label: 'Plot lines, with labels and basic hover functionality',
      complete: false,
    },
    {
      label: 'Create x and y axes',
      complete: false,
    },
  ],
};
