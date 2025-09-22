<script module>
  import BaseNameAndStatus from "$lib/package-wrapping/BaseNameAndStatus.svelte";
  import BaseInformation from "$lib/package-wrapping/BaseInformation.svelte";
  export { WrapperNameAndStatus, WrapperInformation };

  /**
   * !  More documentation is provided on the component library's user guide page.
   */

  /**
   * ! STEP 1 - Adding component metadata
   * CUSTOMISETHIS  Update the status for this component.
   * && 	statusObject.progress determines which pill is shown against the component's name.
   * ?  progress must be one of:
   * ?  1. 'To be developed' - This is the inital status, when the component files have been generated but the work to actually build out the code for the component has not started.
   * ?  2. 'In progress' - This is the status while the component is being built. This lets developers know that the full fuctionality of the component has not been completed and that it may change in the future.
   * ?  3. 'Baseline completed' - This means the core functionality of the component has been completed and it is ready for use. However, small changes to the component may still occur in the future.
   * ?  4. 'In use' - This means the component is completed and being using in products. Therefore, developers need to be mindful of its existing uses when making any changes.
   * &&   statusObject.statusRow determines the sets of ticks/crosses shown below the component name.
   * &&   The ticks/crosses are separated into rows with one row for each entry of the statusRows array.
   * &&   Any entries can be included, but by default the following are provided, initally all set to false:
   * ?  Accessible - The component has been developed with reference to the WCAG guidelines. The component has been checked against our accessibility checklist, including testing it on screen readers.
   * ?  Responsive - The component has been checked against our mobile design checklist. The component has been tested on multiple mobile devices.
   * ?  Prog. enhanced - Potential progressive enhancements have been considered, and if appropriate, implemented for this component.
   * ?  Reviewed - The component requirements, functionality and code have been reviewed and approved.
   * ?  Tested - The component's use within products or prototyping (i.e. in a real-use example, using real props) has been tested and approved.
   */
  let statusObject = {
    progress: "Baseline completed",
    statusRows: [
      {
        obj: { Accessible: false, Responsive: false, "Prog. enhanced": false },
        visibleOnHompepage: false,
      },
      {
        obj: { Reviewed: false, Tested: false },
        visibleOnHomepage: false,
      },
    ],
  };

  /**
   * CUSTOMISETHIS  Update detailsArray to provide description of what this component does and when it should be used.
   * &&   By default the detailsArray includes description and context. The description is intended to explain what the component does, the context is intended to explain when the component will be used.
   * ?  Within the array, each object has an optional markdown (default = false) parameter. When set to true, it uses the @html tag to render the content (e.g. this can be used for including links to other pages).
   * ?  You can add other categories to the detailsArray or, if you need a more flexible solution, edit the WrapperInformation snippet directly.
   *
   */
  let descriptionArray = [
    "A select component enhanced with search functionality and support for multiple selections.",
    "Based on the <a href='https://components.publishing.service.gov.uk/component-guide/select_with_search' target='_blank' rel='noopener noreferrer'>GOV.UK Publishing Components select with search</a>.",
    "Uses the <a href='https://github.com/jshjohnson/Choices' target='_blank' rel='noopener noreferrer'>Choices.js</a> library to provide search and multi-select capabilities.",
  ];

  let contextArray = [
    "Use when you have a large list of options that users need to search through to find specific items.",
    "Particularly useful for location selectors, category filters, or any scenario where users need to select from many predefined options.",
    "Supports both single and multiple selection modes, with or without grouped options.",
    "The component should be used within forms for standard form submission, and supports both server-side and client-side validation.",
  ];

  let detailsArray = [
    {
      label: "Description",
      arr: descriptionArray,
      visibleOnHomepage: true,
      markdown: true,
    },
    {
      label: "Context",
      arr: contextArray,
      visibleOnHomepage: false,
      markdown: true,
    },
  ]; /**
   * CUSTOMISETHIS  Update connectedComponentsArray to provide links to any children, parent or related components.
   */
  let connectedComponentsArray = [
    {
      label: "Related Components",
      visibleOnHomepage: false,
      arr: [
        {
          name: "Select",
          folder: "ui",
        },
      ],
    },
  ];
</script>

<script>
  //@ts-nocheck
  import { page } from "$app/state";
  import { browser } from "$app/environment";

  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";
  import ParsingErrorToastsContainer from "$lib/package-wrapping/ParsingErrorToastsContainer.svelte";
  import ComponentDemo from "$lib/package-wrapping/ComponentDemo.svelte";

  import { kebabToPascalCase } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { createBindableParametersValuesArray } from "$lib/utils/package-wrapping-specific/createBindableParametersValuesArray.js";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";

  import { defaultScreenWidthBreakpoints } from "$lib/config.js";

  import MultiSelectSearchAutocomplete from "$lib/components/ui/MultiSelectSearchAutocomplete.svelte";
  import Examples from "./multi-select-search-autocomplete/Examples.svelte";

  let { data } = $props();

  /**
   * DONOTTOUCH *
   * ? 		uses the page url to identify the name of the component and the folder it belongs to (folder is only used by snippets exported to the homepage to link back to this page).
   */
  let pageInfo = page.url.pathname.split("/");
  let pageName = kebabToPascalCase(pageInfo[pageInfo.length - 1]);

  /**
   * DONOTTOUCH *
   * ? 		demoScreenWidth is a reactive variable which tracks which screen size the user has selected for demoing the component
   */
  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  /**
   * ! Step 2 - Adding binded props
   * CUSTOMISETHIS  Define any binded props
   * && 		Any props which are updated inside the component but accessed outside should be declared here using the $state() rune. They can then be added to the parameterSourceArray below.
   * &&     Also note that they must also be passed to component using the bind: directive (e.g. <ExampleComponent bind:exampleBindableProp>)
   */
  let selectedValue = $state([]);
  let selectedValues = $state([]);
  let bindSelectedItemIndexMap = $state(new Map());
  let bindNextSelectionIndex = $state(0);

  /**
   * ! Step 3 - Add your props
   * CUSTOMISETHIS  Add your parameters to the array.
   * && 		parametersSourceArray is where you define any props for the component. All props should be listed in the parametersSourceArray.
   * &&     Initial values should be provided for all props which either (i) are binded, or (ii) can be modified using the demo UI.
   * &&     Values should also be provided for functions and svelte snippets - which cannot be modified by the user to prevent security issues.
   * &&     Some props may be derived from other props. These should still be listed in the parametersSourceArray, but their value should be left empty. Their value can then be defined further down the page.
   * ?      For each prop, the following fields are available:
   * ? 		  <name> (required, must be unique) -  Name of the parameter which is passed to the component. The name can also be referenced in the calculation of derived parameters which depend on this value.
   * ?      <category> - (required) - Used for separating parameters into different groups.
   *
   * ?      <isBinded> - (optional, default = false) - Should be set to true, if the prop is utilising the bind:directive. Note that for bind to work, the prop must also be defined in step 1 using the $state() rune and passed to the component separately as bindable (e.g. bind:thisProp).
   *
   *
   * ?      <options> - (required for $state() props which can be modified using dropwdown or radio inputs). <options> should contain an array of strings. If <value> is null or absent, the initial value will be taken from the first entry in the options array.
   * ?      <value> - (Should be null or absent for derived props. For all others props it's required, unless there is an options field). Used to set the initial value of the prop.
   *
   * ?      <propType> - (optional) - Has two use cases:
   * ?      (i) set to 'fixed' to prevent users editing the value.
   * ?      (i) set to 'radio' to have options selectable via the radio input (uses dropdown by default).
   *
   * ?      <visible> - (optional, default = true). Hides prop in the UI if certain conditions are not met. Specify an object with a name - the parameter that you want to check against and a value - the value that the named parameters need to equal for this input to be visible.
   * ?      The Line component provides an example of the <visible> field in action, showing and hiding props based on <includeMarkers>
   * ?      If you want the form to be visible only if multiple conditions are met, you can provide an array of conditional objects instead.
   *
   * ?      <rows> - (optional, default = 1, only use with $state() where typeof value === "string"). Sets the numbers of rows used by the textArea input.
   *
   * ?      <functionElements> - (optional, only used where typeof value === "function") - <functionElements> can have three optional properties:
   * ?      (i) 'functionAsString': Should be set as a string copy of the function itself. Used to display the function in the demo UI.
   * ?      (ii) 'counter': For use with event handler functions. Should be set to 0. Then putting 'this.functionElements.counter += 1;' in the function body will cause the counter to update each time the function is triggered.
   * ?      (iii) 'dataset': For use with event handler fuctions. Should be an object - then putting 'Object.keys(this.functionElements.dataset).forEach((el) => { this.functionElements.dataset[el] = event.currentTarget.dataset[el]; });' in the function body will cause the object to update each time the function is triggered.
   *
   * ?      <description> - (optional, but strongly encouraged). Describes what the parameter does and best practice uses for it. The description can be a string, an object with a markdown field (true or false) and arr field, or a svelte snippet.
   *
   * ?      <isProp> - (optional, default = true) - Should be set to false for paramters which are not actually passed to the component.
   * ?      <isRequired> - (optional, default = false) - Should be set to true for any props which the component will not functionally properly without (e.g. props with no default value, props which will cause erros if undefined).
   *
   */
  let parametersSourceArray = $derived(
    addIndexAndInitalValue([
      // Core Attributes
      {
        name: "id",
        category: "Core attributes",
        isRequired: true,
        value: "multi-select-example",
        description: {
          markdown: true,
          arr: [
            `The ID attribute for the <code>select</code> element. Used to link the label and hint/error messages.`,
          ],
        },
      },
      {
        name: "name",
        category: "Core attributes",
        isRequired: true,
        value: "multi-select-example",
        description: {
          markdown: true,
          arr: [
            `The name attribute for the <code>select</code> element, submitted with form data.`,
          ],
        },
      },
      {
        name: "items",
        category: "Core attributes",
        value: [
          { value: "england", text: "England" },
          { value: "scotland", text: "Scotland" },
          { value: "wales", text: "Wales" },
          { value: "northern-ireland", text: "Northern Ireland" },
          { value: "france", text: "France" },
          { value: "germany", text: "Germany" },
          { value: "spain", text: "Spain" },
          { value: "italy", text: "Italy" },
        ],
        description: {
          markdown: true,
          arr: [
            `An array of objects defining the options for the dropdown. Each object should have:`,
            `<code>value</code>: The value attribute for the option.`,
            `<code>text</code>: The text displayed for the option.`,
            `<code>disabled</code> (optional): Set to <code>true</code> to disable the option.`,
          ],
        },
      },
      {
        name: "groups",
        category: "Core attributes",
        value: [],
        description: {
          markdown: true,
          arr: [
            `An array of option groups. Each group should have:`,
            `<code>label</code>: The group label.`,
            `<code>choices</code>: Array of options like the items array.`,
            `<code>disabled</code> (optional): Set to <code>true</code> to disable all options in the group.`,
          ],
        },
      },
      {
        name: "value",
        category: "Core attributes",
        isBinded: true,
        value: null,
        description: {
          markdown: true,
          arr: [
            `The currently selected value(s). For multiple select, this will be an array of values. Use <code>bind:value</code> for two-way binding.`,
            `This prop is bound using <code>bind:value</code> in this demo.`,
          ],
        },
      },
      {
        name: "multiple",
        category: "Core attributes",
        value: true,
        description: {
          markdown: true,
          arr: [`If <code>true</code>, enables multiple selection mode.`],
        },
      },

      // Label and Hints
      {
        name: "label",
        category: "Label and hints",
        isRequired: true,
        value: "Select countries",
        description: {
          markdown: true,
          arr: [
            `The text for the <code>label</code> element associated with the select.`,
          ],
        },
      },
      {
        name: "labelIsPageHeading",
        category: "Label and hints",
        value: false,
        description: {
          markdown: true,
          arr: [
            `If <code>true</code>, wraps the label in an <code>h1</code> element and applies larger heading styles.`,
          ],
        },
      },
      {
        name: "hint",
        category: "Label and hints",
        value: "You can select multiple countries",
        description: {
          markdown: true,
          arr: [`Optional hint text displayed below the label.`],
        },
      },

      // Error Handling
      {
        name: "error",
        category: "Error handling",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional error message string. If present, indicates a server-side error.`,
          ],
        },
      },
      {
        name: "validate",
        category: "Error handling",
        value: undefined,
        description: {
          markdown: true,
          arr: [
            `A client-side validation function that takes the current value and returns an error message string if invalid, or undefined if valid.`,
          ],
        },
      },

      // Search Options
      {
        name: "searchPlaceholder",
        category: "Search options",
        value: "Search in list",
        description: {
          markdown: true,
          arr: [
            `<strong>Placeholder text for the search query input field in single select mode only.</strong> This text appears inside the search input box to guide users on what to type. Due to Choices.js library limitations, this property only works with single select (<code>multiple: false</code>). Has no effect in multiple select mode.`,
            `<strong>Dependencies:</strong> Only functional with single select mode. Choices.js does not support search placeholders for multiple select elements.`,
            `<strong>Default:</strong> <code>"Search in list"</code> (single select only)`,
          ],
        },
      },
      {
        name: "allowHTML",
        category: "Search options",
        value: true,
        description: {
          markdown: true,
          arr: [`If true, allows HTML in option text.`],
        },
      },
      {
        name: "shouldSort",
        category: "Search options",
        value: false,
        description: {
          markdown: true,
          arr: [`If true, options will be sorted by text value.`],
        },
      },
      {
        name: "searchResultLimit",
        category: "Search options",
        value: 6,
        description: {
          markdown: true,
          arr: [`Maximum number of options to show in search results.`],
        },
      },
      {
        name: "removeItemButton",
        category: "Search options",
        value: true,
        description: {
          markdown: true,
          arr: [
            `<strong>Whether to show X remove buttons on selected items (chips/pills).</strong> When <code>true</code>, selected items display with clickable X buttons for removal. When <code>false</code>, selected items appear without remove buttons (can only be removed by deselecting from dropdown).`,
            `<strong>Dependencies:</strong> Only applies to multiple select mode (<code>multiple: true</code>). In single select mode, there are no selected item chips to display remove buttons on.`,
            `<strong>Default:</strong> <code>true</code> for multiple select mode (automatically computed based on <code>multiple</code> prop if not explicitly set)`,
          ],
        },
      },

      // Styling and Layout
      {
        name: "formGroupClasses",
        category: "Styling and layout",
        value: "",
        description: {
          markdown: true,
          arr: [`Additional CSS classes for the form group wrapper.`],
        },
      },
      {
        name: "fullWidth",
        category: "Styling and layout",
        value: false,
        description: {
          markdown: true,
          arr: [`Makes the select element full width if true.`],
        },
      },
      {
        name: "describedBy",
        category: "Styling and layout",
        value: "",
        description: {
          markdown: true,
          arr: [`Override for aria-describedby attribute.`],
        },
      },
      {
        name: "disabled",
        category: "Styling and layout",
        value: false,
        description: {
          markdown: true,
          arr: [`Disables the select element if true.`],
        },
      },

      // Other Options
      {
        name: "placeholderText",
        category: "Other options",
        value: "",
        description: {
          markdown: true,
          arr: [
            `<strong>Custom placeholder text for single select mode only.</strong> This text appears as the initial/empty state option in the dropdown before any selections are made. Has no visible effect in multiple select mode.`,
            `<strong>Dependencies:</strong> Only applies to single select mode (<code>multiple: false</code>). Ignored when <code>multiple: true</code>.`,
            `<strong>Default:</strong> <code>"Select one"</code> for single select mode`,
          ],
        },
      },
      {
        name: "choicesOptions",
        category: "Other options",
        value: {},
        description: {
          markdown: true,
          arr: [`Additional options to pass to the Choices.js library.`],
        },
      },

      // API and Dynamic Options
      {
        name: "source_url",
        category: "API options",
        value: "",
        description: {
          markdown: true,
          arr: [
            `<strong>URL for fetching dynamic options from an API.</strong> When provided, enables API-based search functionality alongside or instead of static options. Component will make HTTP requests to this URL with query parameters.`,
            `<strong>Dependencies:</strong> Works with <code>source_key</code> and <code>source_property</code> to parse API responses. Optional <code>sourceSelector</code> can control when API vs static options are used.`,
            `<strong>Default:</strong> <code>undefined</code> (no API integration)`,
          ],
        },
      },
      {
        name: "source_key",
        category: "API options",
        value: "",
        description: {
          markdown: true,
          arr: [
            `<strong>Key to extract data from API response.</strong> Specifies the property path in the API response that contains the array of options. Uses dot notation for nested properties.`,
            `<strong>Dependencies:</strong> Required when <code>source_url</code> is provided and API response is not a direct array.`,
            `<strong>Default:</strong> <code>undefined</code> (expects API response to be direct array)`,
          ],
        },
      },
      {
        name: "source_property",
        category: "API options",
        value: "",
        description: {
          markdown: true,
          arr: [
            `<strong>Property to use as the display text from API data.</strong> Specifies which field from each API result item should be shown to users in the dropdown. If not provided, entire item will be converted to string.`,
            `<strong>Dependencies:</strong> Used when <code>source_url</code> is provided to format API results for display.`,
            `<strong>Default:</strong> <code>undefined</code> (uses entire item as display text)`,
          ],
        },
      },
      {
        name: "sourceSelector",
        category: "API options",
        propType: "fixed",
        value: function (query, options) {
          // Default logic: use API when source_url/source_key present and query >= 3 chars
          return query.length >= 3 ? "api" : "options";
        },
        functionElements: {
          functionAsString: `function(query, options) {
  // Default logic: use API when source_url/source_key present and query >= 3 chars
  return query.length >= 3 ? "api" : "options";
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to decide whether to use 'api' or 'options' for a given query.</strong> Controls whether to search static options or make API request based on user input. Returns either "api" or "options".`,
            `<strong>Dependencies:</strong> Used when both <code>source_url</code> and static <code>items</code> are provided for dual-mode operation.`,
            `<strong>Default:</strong> Uses API when query length >= 3 characters, otherwise uses static options`,
          ],
        },
      },
      {
        name: "minLength",
        category: "API options",
        value: 0,
        description: {
          markdown: true,
          arr: [
            `<strong>Minimum length before triggering API search.</strong> Prevents API calls for very short queries. When user input is shorter, shows <code>tTooShort</code> message instead of making API request.`,
            `<strong>Dependencies:</strong> Used with <code>source_url</code> for API-based searching. Works with <code>tTooShort</code> function for user messaging.`,
            `<strong>Default:</strong> <code>0</code> (no minimum length requirement)`,
          ],
        },
      },
      {
        name: "tTooShort",
        category: "API options",
        propType: "fixed",
        value: (n) => `Enter ${n} or more characters for suggestions`,
        functionElements: {
          functionAsString: `function(n) {
  return \`Enter \${n} or more characters for suggestions\`;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to generate message when query is too short.</strong> Called when user input length is below <code>minLength</code> threshold. Receives the minimum required length as parameter.`,
            `<strong>Dependencies:</strong> Used with <code>minLength</code> and <code>source_url</code> to provide user feedback for short queries.`,
            `<strong>Default:</strong> <code>(n) => \`Enter \${n} or more characters for suggestions\`</code>`,
          ],
        },
      },
      {
        name: "groupKey",
        category: "API options",
        value: "",
        description: {
          markdown: true,
          arr: [
            `<strong>Key for displaying additional context in options.</strong> When provided, shows secondary information from API results alongside the main display text. Useful for disambiguation (e.g., showing region alongside place names).`,
            `<strong>Dependencies:</strong> Used with <code>source_url</code> to enhance API result presentation with contextual information.`,
            `<strong>Default:</strong> <code>undefined</code> (no additional context shown)`,
          ],
        },
      },

      // Choices.js Styling Options
      {
        name: "choicesItemBackgroundColor",
        category: "Choices.js styling",
        value: "#f3f2f1",
        description: {
          markdown: true,
          arr: [`Background color for highlighted dropdown items.`],
        },
      },
      {
        name: "choicesItemBorderColor",
        category: "Choices.js styling",
        value: "#b1b4b6",
        description: {
          markdown: true,
          arr: [`Border color for dropdown item dividers.`],
        },
      },
      {
        name: "choicesItemTextColor",
        category: "Choices.js styling",
        value: "black",
        description: {
          markdown: true,
          arr: [`Text color for highlighted dropdown items.`],
        },
      },
      {
        name: "choicesItemDividerPadding",
        category: "Choices.js styling",
        value: "10px",
        description: {
          markdown: true,
          arr: [`Padding for dropdown item dividers.`],
        },
      },
      {
        name: "choicesItemBorderRadius",
        category: "Choices.js styling",
        value: "0",
        description: {
          markdown: true,
          arr: [`Border radius for dropdown items.`],
        },
      },
      {
        name: "selectedChipBackgroundColor",
        category: "Choices.js styling",
        value: "#f3f2f1",
        description: {
          markdown: true,
          arr: [`Background color specifically for selected chips/pills.`],
        },
      },
      {
        name: "selectedItemCircleColor",
        category: "Choices.js styling",
        value: "#1d70b8",
        description: {
          markdown: true,
          arr: [
            `Fallback color for circle indicators on selected items. **Multi-select only** - circles are only shown when both <code>enableSelectedItemCircles</code> is true and <code>multiple</code> is true. In practice, actual colors come from <code>selectedItemCircleColorPalette</code> which provides unique colors for each selection.`,
          ],
        },
      },
      {
        name: "enableSelectedItemCircles",
        category: "Choices.js styling",
        value: true,
        description: {
          markdown: true,
          arr: [
            `Enable or disable the colored circle indicators on selected items.`,
          ],
        },
      },
      {
        name: "matchBorderToCircleColor",
        category: "Choices.js styling",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Enable border colors to match circle colors for selected items.`,
          ],
        },
      },
      {
        name: "selectedItemCircleColorPalette",
        category: "Choices.js styling",
        value: [
          // Complete GOV.UK Design System palette (19 colors)
          "#1d70b8", // Blue (primary)
          "#d4351c", // Red
          "#00703c", // Green
          "#f47738", // Orange
          "#4c2c92", // Purple
          "#801650", // Bright purple
          "#28a197", // Turquoise
          "#b58840", // Brown
          "#d53880", // Pink
          "#6f72af", // Light purple
          "#f499be", // Light pink
          "#85994b", // Light green
          "#ffdd00", // Yellow
          "#12436d", // Dark blue
          "#505a5f", // Dark grey
          "#626a6e", // Mid grey
          "#b1b4b6", // Light grey
          "#0b0c0c", // Black
          "#ffffff", // White (with border for visibility)
        ],
        description: {
          markdown: true,
          arr: [
            `Complete GOV.UK Design System color palette (19 colors). Colors are assigned based on selection order (not deterministic by item value), but each item remembers its assigned color. When more than 19 items are selected, colors cycle back to the beginning of the palette.`,
          ],
        },
      },

      // Advanced Cross-Selection Features
      {
        name: "apiParentResolver",
        category: "Advanced features",
        propType: "fixed",
        value: function (apiItem) {
          // Extract parent value from API response
          // Example: return apiItem.codes?.lau2 || apiItem.lau2;
          return apiItem.parentCode;
        },
        functionElements: {
          functionAsString: `function(apiItem) {
  // Extract parent value from API response
  // Example: return apiItem.codes?.lau2 || apiItem.lau2;
  return apiItem.parentCode;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to resolve parent options from API data.</strong> Required when using dual-mode (API + static options) with cross-selection logic. Receives API response item, should return parent identifier for coverage checking.`,
            `<strong>Dependencies:</strong> Used with dual-mode configurations when both <code>source_url</code> and static <code>items</code> are provided.`,
            `<strong>Default:</strong> <code>undefined</code> (no parent resolution)`,
          ],
        },
      },
      {
        name: "staticChildrenResolver",
        category: "Advanced features",
        propType: "fixed",
        value: function (staticItem) {
          // Extract child values from static option
          // Example: return staticItem.children || [];
          return staticItem.postcodes || [];
        },
        functionElements: {
          functionAsString: `function(staticItem) {
  // Extract child values from static option
  // Example: return staticItem.children || [];
  return staticItem.postcodes || [];
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to resolve child options from static data.</strong> Used for hierarchical relationships where static options contain child items that should be checked against API selections.`,
            `<strong>Dependencies:</strong> Used with dual-mode configurations when static options contain hierarchical data.`,
            `<strong>Default:</strong> <code>undefined</code> (no child resolution)`,
          ],
        },
      },
      {
        name: "selectedChildParentResolver",
        category: "Advanced features",
        propType: "fixed",
        value: function (selectedValue) {
          // Resolve parent from selected child value
          // Example: Look up postcode's LAD
          return postcodeToLADMapping[selectedValue];
        },
        functionElements: {
          functionAsString: `function(selectedValue) {
  // Resolve parent from selected child value
  // Example: Look up postcode's LAD
  return postcodeToLADMapping[selectedValue];
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to resolve parent from selected child value.</strong> Used to determine what parent option a selected child belongs to for coverage checking and conflict resolution.`,
            `<strong>Dependencies:</strong> Used when dealing with child-parent relationships in selected values.`,
            `<strong>Default:</strong> <code>undefined</code> (no parent resolution from selected values)`,
          ],
        },
      },
      {
        name: "tApiChildInSelectedParent",
        category: "Advanced features",
        propType: "fixed",
        value: (child, parent) =>
          `${child} is in ${parent}, which is already selected`,
        functionElements: {
          functionAsString: `function(child, parent) {
  return \`\${child} is in \${parent}, which is already selected\`;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to generate message when API child is in selected parent.</strong> Called when user searches for an API item (e.g., postcode) that belongs to an already selected parent option (e.g., LAD).`,
            `<strong>Dependencies:</strong> Used with <code>apiParentResolver</code> when API items can be contained within static selections.`,
            `<strong>Default:</strong> <code>(child, parent) => \`\${child} is in \${parent}, which is already selected\`</code>`,
          ],
        },
      },
      {
        name: "tApiChildCoveredBySelectedChild",
        category: "Advanced features",
        propType: "fixed",
        value: (child, parent, selectedChild) =>
          `${child} is in ${parent}, which is already covered by the selected postcode ${selectedChild}`,
        functionElements: {
          functionAsString: `function(child, parent, selectedChild) {
  return \`\${child} is in \${parent}, which is already covered by the selected postcode \${selectedChild}\`;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to generate message when API child is covered by selected child.</strong> Called when user searches for an API item that belongs to the same parent as an already selected child item.`,
            `<strong>Dependencies:</strong> Used with <code>apiParentResolver</code> and <code>selectedChildParentResolver</code> for child-parent conflict detection.`,
            `<strong>Default:</strong> <code>(child, parent, selectedChild) => \`\${child} is in \${parent}, which is already covered by the selected postcode \${selectedChild}\`</code>`,
          ],
        },
      },
      {
        name: "tStaticParentContainsSelectedChildren",
        category: "Advanced features",
        propType: "fixed",
        value: (parent, children) =>
          `${parent} contains ${children.join(", ")}, which ${children.length > 1 ? "are" : "is"} already selected`,
        functionElements: {
          functionAsString: `function(parent, children) {
  return \`\${parent} contains \${children.join(", ")}, which \${children.length > 1 ? "are" : "is"} already selected\`;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to generate message when static parent contains selected children.</strong> Called when user tries to select a parent option that would encompass already selected child items.`,
            `<strong>Dependencies:</strong> Used with <code>staticChildrenResolver</code> to check if parent options conflict with existing child selections.`,
            `<strong>Default:</strong> <code>(parent, children) => \`\${parent} contains \${children.join(", ")}, which \${children.length > 1 ? "are" : "is"} already selected\`</code>`,
          ],
        },
      },
      {
        name: "tPartialPostcodeInSelectedParent",
        category: "Advanced features",
        propType: "fixed",
        value: (partialPostcode, parent) =>
          `Postcodes beginning ${partialPostcode}... are in ${parent}, which is already selected`,
        functionElements: {
          functionAsString: `function(partialPostcode, parent) {
  return \`Postcodes beginning \${partialPostcode}... are in \${parent}, which is already selected\`;
}`,
        },
        description: {
          markdown: true,
          arr: [
            `<strong>Function to generate message for partial postcode in selected parent.</strong> Called when <code>promoteApiChildToParent</code> is enabled and user searches partial postcode that belongs to already selected parent.`,
            `<strong>Dependencies:</strong> Used when <code>promoteApiChildToParent</code> is true and partial postcode searches conflict with selected parents.`,
            `<strong>Default:</strong> <code>(partialPostcode, parent) => \`Postcodes beginning \${partialPostcode}... are in \${parent}, which is already selected\`</code>`,
          ],
        },
      },

      // Behavioral Options
      {
        name: "resetApiSuggestionsAfterSelection",
        category: "Behavioral options",
        value: false,
        description: {
          markdown: true,
          arr: [`Reset API suggestions after making a selection.`],
        },
      },
      {
        name: "promoteApiChildToParent",
        category: "Behavioral options",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Promote API child (e.g., postcode) to its parent option (e.g., LAD).`,
          ],
        },
      },

      // Bindable State Props
      {
        name: "bindSelectedItemIndexMap",
        category: "Bindable state",
        propType: "fixed",
        value: null,
        isBinded: true,
        description: {
          markdown: true,
          arr: [
            `Bindable map of item values to their color indices for external synchronization.`,
          ],
        },
      },
      {
        name: "bindNextSelectionIndex",
        category: "Bindable state",
        propType: "fixed",
        value: null,
        isBinded: true,
        description: {
          markdown: true,
          arr: [
            `Bindable next available color index for external synchronization.`,
          ],
        },
      },
    ]),
  );

  /**
   * DONOTTOUCH *
   * && 		Defining functions. generateValuesArray is used to create our arrays which track the $state() and $derived() props. getValue can used to access a reactive value from the $state() based on the prop name.
   */
  let generateValuesArray = function (
    parametersSourceArray,
    isEditableBoolean,
    derivedParametersObject,
  ) {
    return parametersSourceArray.map((el) => {
      let value = derivedParametersObject[el.name] ?? el.value;

      return el.isEditable === isEditableBoolean && value != null
        ? typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : value
        : null;
    });
  };

  let getValue = function (fieldName) {
    return statedParametersValuesArray[
      parametersSourceArray?.findIndex((el) => el.name === fieldName)
    ];
  };

  /**
   * DONOTTOUCH *
   * && 		statedParametersValuesArray tracks the values of $state() props as they are modified by the user using the demo UI.
   */
  let statedParametersValuesArray = $state(
    generateValuesArray(parametersSourceArray, true, {}),
  );

  /**
   *  !  Step 4 - Define values for derived parameters, and add them to.
   *  CUSTOMISETHIS  Add any additional parameters which are calculated based on other parameters.
   *  && 		Here you can define calculations for any additional component parameters which - rather than being set by the user - are calculated based on the value of other parameters.
   *  &&    Next, add the variables to the derivedParametersObject.
   *
   *  &&    (e.g. let derivedProp = $derived(...code for calculating value here), then derivedParametersObject = $derived({ derivedProp }))
   *
   *  &&    Note that these parameters still need to be listed in the source array (with a null or absent value).
   *  &&    You must then also combine them into the derivedParametersObject below so that they are passed to the component.
   *  &&     The getValue() function can be helpful for deriving props based on the value of $state() prop.
   */

  let derivedParametersObject = $derived({
    value: selectedValue,
    bindSelectedItemIndexMap:
      bindSelectedItemIndexMap instanceof Map
        ? Object.fromEntries(bindSelectedItemIndexMap)
        : bindSelectedItemIndexMap,
    bindNextSelectionIndex: bindNextSelectionIndex,
  });

  /**
   * DONOTTOUCH *
   * &&     derivedParametersValuesArray tracks the values of $derived() and fixed props.
   */
  let derivedParametersValuesArray = $derived(
    generateValuesArray(parametersSourceArray, false, derivedParametersObject),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersValuesArray's is a one-to-one mapping to the source array which tracks whether a parameter should be visible in the demo UI.
   */
  let parametersVisibleArray = $derived(
    trackVisibleParameters(parametersSourceArray, statedParametersValuesArray),
  );

  /**
   * DONOTTOUCH *
   * && 		parametersObject takes the props to be passed to the component and converts them into a (parameterName: parameterValue) pattern
   * &&     parametersParsingErrorsArray tracks any errors due to attempting to use JSON.parse() on strings which do not convert to valid JavaScript objects.
   * &&     $effect() is then use to update parametersParsingErrorsObject, which tracks when errors and fixes occur.
   */

  let [parametersObject, parametersParsingErrorsArray] = $derived(
    createParametersObject(
      parametersSourceArray,
      statedParametersValuesArray,
      derivedParametersValuesArray,
    ),
  );

  let parametersParsingErrorsObject = $state({});

  $effect(() => {
    parametersParsingErrorsArray.forEach((el) => {
      parametersParsingErrorsObject[el] = true;
    });

    Object.keys(parametersParsingErrorsObject).forEach((el) => {
      if (!parametersParsingErrorsArray.includes(el)) {
        parametersParsingErrorsObject[el] = false;
      }
    });
  });

  /**
   * DONOTTOUCH *
   * && 		copyParametersToClipboard simply takes the set of props being passed to the component, and replaces any function with their functionAsString property. This is necessary because actual functions cannot be written to parsed into a string, and therefore can't be copied to the clipboard.
   */

  let copyParametersToClipboardObject = $derived(
    Object.fromEntries(
      Object.entries(parametersObject).map(([key, value]) => [
        key,
        typeof value === "function"
          ? parametersSourceArray.find((el) => el.name === key)
              ?.functionElements?.functionAsString
          : value,
      ]),
    ),
  );
</script>

<!--
&&  WrapperNameAndStatus and WrapperInformation are passed to the WrapperDetails component. They are also exported and then imported on the homepage, and then used (again by the WrapperDetails component) to provide a link and info to this component. 
  -->

{#snippet WrapperNameAndStatus(name, folder, subFolder, homepage)}
  <BaseNameAndStatus
    {name}
    {folder}
    {subFolder}
    {homepage}
    {statusObject}
    parentFolder="components-update"
  ></BaseNameAndStatus>
{/snippet}

{#snippet WrapperInformation(homepage)}
  <BaseInformation {homepage} {detailsArray} {connectedComponentsArray}
  ></BaseInformation>
{/snippet}

<!-- 
  !   Step 5 - Create a context for the component and pass in any binded props using the bind:directive
  CUSTOMISETHIS   Create a context in which your component is commonly used (e.g. wrap chart components within SVGs). Pass through binded props separately (e.g. <Component {...parametersOnject} bind:bindedProp></Component>)
 -->
{#snippet Component()}
  <div class="p-8">
    {#key [parametersObject.removeItemButton, parametersObject.multiple, parametersObject.allowHTML, parametersObject.shouldSort, parametersObject.searchResultLimit, parametersObject.searchPlaceholder, parametersObject.choicesItemBackgroundColor, parametersObject.choicesItemBorderColor, parametersObject.choicesItemTextColor, parametersObject.choicesItemDividerPadding, parametersObject.selectedItemCircleColor, parametersObject.enableSelectedItemCircles, parametersObject.selectedItemCircleColorPalette].join("|")}
      <MultiSelectSearchAutocomplete
        bind:value={selectedValue}
        bind:bindSelectedItemIndexMap
        bind:bindNextSelectionIndex
        {...parametersObject}
      ></MultiSelectSearchAutocomplete>
    {/key}
  </div>
{/snippet}

<!--
DONOTTOUCH  *
&&          Uses snippets to render metadata for the component.
-->
<WrapperDetailsUpdate
  wrapper={{
    component: { WrapperInformation, WrapperNameAndStatus },
    name: pageName,
  }}
  homepage={false}
></WrapperDetailsUpdate>

<!-- 
  DONOTTOUCH  *
  &&          Renders toast components based on tracking parsing errors and fixes.
 -->
<ParsingErrorToastsContainer
  {parametersParsingErrorsArray}
  {parametersParsingErrorsObject}
  onCloseFunction={(key) =>
    parametersParsingErrorsArray.filter((el) => el != key)}
></ParsingErrorToastsContainer>

<!--
    DONOTTOUCH  *
    &&          Renders the demo UI and the component itself.
-->
<ComponentDemo
  {Component}
  bind:demoScreenWidth
  {parametersSourceArray}
  bind:statedParametersValuesArray
  {derivedParametersValuesArray}
  {parametersVisibleArray}
  {parametersParsingErrorsObject}
  {copyParametersToClipboardObject}
></ComponentDemo>

<!--
    DONOTTOUCH  *
    &&          Creates a list of examples where the component is used (if any examples exist).
-->
<div id="examples" data-role="examples-section">
  <Examples></Examples>
</div>
