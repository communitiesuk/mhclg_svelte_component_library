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
    progress: "In progress", // Updated status
    statusRows: [
      {
        obj: { Accessible: true, Responsive: true, "Prog. enhanced": true }, // Assuming based on underlying components
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
    `A search box that provides autocomplete suggestions as the user types.`,
    `Based on the <a href="https://components.publishing.service.gov.uk/component-guide/search_with_autocomplete" target="_blank" rel="noopener noreferrer">GOV.UK Publishing Components search with autocomplete box</a>.`,
    `Uses the <a href="https://github.com/alphagov/accessible-autocomplete" target="_blank" rel="noopener noreferrer">accessible-autocomplete</a> library.`,
  ];

  let contextArray = [
    `The component should ideally be used within an HTML <code>&lt;form&gt;</code> to allow standard form submission (works with or without JavaScript). Consider giving the form <code>role="search"</code> for accessibility.`,
    `For client-side handling (e.g., in Single Page Applications where a full form submission isn't desired), you can use the <code>bind:selectedValue</code> prop to reactively get the confirmed selection without submitting the form.`,
    `Use when you want to help users find specific items by suggesting results from a predefined list or API endpoint as they type. Requires setting up either <code>options</code> or <code>source_url</code>/<code>source_key</code>.`,
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
  ];

  /**
   * CUSTOMISETHIS  Update connectedComponentsArray to provide links to any children, parent or related components.
   */
  let connectedComponentsArray = [
    {
      label: "Parent Component", // Added label
      visibleOnHomepage: false, // Added visibility flag
      arr: [
        // Nested the actual component info inside 'arr'
        {
          name: "Search",
          folder: "ui", // Added folder needed for link generation
          // href and description are not directly used by BaseInformation
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

  import SearchAutocomplete from "$lib/components/ui/SearchAutocomplete.svelte";
  import Examples from "./search-autocomplete/Examples.svelte";

  let { data, form } = $props();

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
  let selectedValue = $state("");
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
      // --- Autocomplete Specific Props ---
      {
        name: "options",
        category: "Autocomplete",
        isEditable: true,
        value: [],
        description: {
          markdown: true,
          arr: [
            `An array of suggestion strings or objects with <code>{ label: string, value: any }</code> to use instead of an API endpoint.`,
            `If this prop is provided with a non-empty array, it will be used as the suggestion source instead of <code>source_url</code> and <code>source_key</code>.`,
            `Example (strings): <code>["Apple", "Banana", "Cherry"]</code>`,
            `Example (objects, requires valid JSON in input): <code>[ { "label": "Aberdeen City", "value": "S12000033" }, { "label": "Aberdeenshire", "value": "S12000034" }, ... ]</code>`,
          ],
        },
      },
      {
        name: "source_url",
        category: "Autocomplete",
        value: "https://www.gov.uk/api/search.json?suggest=autocomplete", // Updated value
        description: {
          markdown: true,
          arr: [
            `Required. The URL endpoint that the component will query to fetch autocomplete suggestions.`,
            `The query parameter will be appended automatically (e.g., <code>/api/suggestions?q=user_input</code>).`,
            `The endpoint should return JSON.`,
          ],
        },
        rows: 1,
        isRequired: true,
      },
      {
        name: "source_key",
        category: "Autocomplete",
        value: "suggested_autocomplete", // Updated value
        description: {
          markdown: true,
          arr: [
            `Required. The key within the JSON response from <code>source_url</code> that contains the array of suggestion strings.`,
          ],
        },
        rows: 1,
        isRequired: true,
      },
      {
        name: "source_property",
        category: "Autocomplete",
        value: "", // Default to empty string, means auto-detect (label/postcode)
        description: {
          markdown: true,
          arr: [
            `Optional. Specifies the property name within the fetched JSON objects to use as the primary suggestion label. Useful when the API response doesn't use 'label' or 'postcode'.`,
            `If left empty or the property is not found, the component falls back to checking for 'label', then 'postcode'.`,
            `Example: If your API returns <code>[{ "name": "London", ... }]</code>, set this to <code>"name"</code>.`,
          ],
        },
        rows: 1,
        isRequired: false, // It's optional
      },
      {
        name: "minLength",
        category: "Autocomplete",
        value: 3,
        description: {
          markdown: true,
          arr: [
            `The minimum number of characters the user must type before suggestions appear. Defaults to 3.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "confirmOnBlur",
        category: "Autocomplete",
        value: false,
        description: {
          markdown: true,
          arr: [
            `If <code>true</code>, selecting a suggestion happens when the user blurs the input. If <code>false</code> (default), the user must press Enter or click a suggestion.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "showNoOptionsFound",
        category: "Autocomplete",
        value: true,
        description: {
          markdown: true,
          arr: [
            `If <code>true</code> (default), displays a "No results found" message when the query yields no suggestions.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "defaultValue",
        category: "Autocomplete",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the initial value of the input field when the component loads.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
        rows: 1,
      },
      {
        name: "placeholder",
        category: "Autocomplete",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the placeholder text for the input field. Defaults to empty string.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
        rows: 1,
      },
      {
        name: "required",
        category: "Autocomplete",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Adds the <code>required</code> attribute to the input field. Defaults to <code>false</code>.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "tNoResults",
        category: "Autocomplete Text Customisation",
        value: () => "No results found",
        propType: "fixed", // Cannot edit functions via UI
        functionElements: {
          functionAsString: '() => "No results found"',
        },
        description: {
          markdown: true,
          arr: [
            `Function that returns the text to display when no results are found.`,
            `Default: <code>() => 'No results found'</code>`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "tAssistiveHint",
        category: "Autocomplete Text Customisation",
        value: () =>
          "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.",
        propType: "fixed",
        functionElements: {
          functionAsString:
            '() => "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures."',
        },
        description: {
          markdown: true,
          arr: [
            `Function that returns the text for the assistive hint (hidden text read by screen readers).`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
      },
      {
        name: "menuAttributes",
        category: "Autocomplete Styling & Attributes",
        value: {},
        description: {
          markdown: true,
          arr: [
            `An object containing attributes to add to the suggestions menu <code>&lt;ul&gt;</code> element. Provide as a JSON object.`,
            `Example: <code>{"data-testid": "my-menu"}</code>`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
        rows: 3,
      },
      {
        name: "menuClasses",
        category: "Autocomplete Styling & Attributes",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional string of CSS classes to add to the suggestions menu <code>&lt;ul&gt;</code> element. Defaults to <code>null</code>.`,
            `From <a href="https://github.com/alphagov/accessible-autocomplete?tab=readme-ov-file#options-reference" target="_blank">accessible-autocomplete options</a>.`,
          ],
        },
        rows: 1,
      },
      // --- End More Autocomplete Config Props ---

      // --- Content Props (Inherited from Search) ---
      {
        name: "label_text",
        category: "Content",
        value: "Search GOV.UK", // Adjusted default
        description: {
          markdown: true,
          arr: [
            `The text content for the <code>label</code> element. Allows HTML.`,
            `Note: Autocomplete component always uses a separate label (not inline).`,
          ],
        },
        rows: 1,
      },
      {
        name: "selectedValue",
        category: "Content",
        isBinded: true,
        value: selectedValue,
        description: {
          markdown: true,
          arr: [
            `The current value of the search input field. Can be bound to reactively get the confirmed selection without submitting a form.`,
          ],
        },
      },
      {
        name: "button_text",
        category: "Content",
        value: "Search",
        description: {
          markdown: true,
          arr: [
            `Sets the visually hidden text content for the submit button, read by screen readers. Defaults to "Search".`,
          ],
        },
        rows: 1,
      },
      {
        name: "name",
        category: "Content",
        value: "q",
        description: {
          markdown: true,
          arr: [
            `Sets the <code>name</code> attribute for the search input field. Defaults to "q".`,
          ],
        },
        rows: 1,
        isRequired: true,
      },
      // --- Hint Prop (Passed to Search) ---
      {
        name: "hint",
        category: "Content",
        value: "Try 'benefits' or 'driving'", // Example hint
        description: {
          markdown: true,
          arr: [
            `Optional hint text displayed below the label (if not ongovuk_blue or homepage).`,
            `Note: Autocomplete functionality does not directly use this hint.`,
          ],
        },
        rows: 2,
      },
      // --- End Hint Prop ---

      // --- Styling & Layout Props ---
      {
        name: "on_govuk_blue",
        category: "Styling",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Set to <code>true</code> to apply styling for use on a dark blue (<code>#003078</code>) background.`,
          ],
        },
      },
      {
        name: "homepage",
        category: "Styling",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Set to <code>true</code> to apply specific styling for homepage use (e.g., large size, different button colors). This automatically applies the necessary styles for a dark blue background, effectively incorporating the behaviour of <code>on_govuk_blue: true</code>.`,
          ],
        },
      },
      {
        name: "size",
        category: "Styling",
        options: ["", "large"],
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the size variant. Leave empty for default, or set to <code>large</code>.`,
          ],
        },
      },
      {
        name: "label_size",
        category: "Styling",
        options: ["", "s", "m", "l", "xl"],
        value: "", // Use empty string as default to match Search
        description: {
          markdown: true,
          arr: [
            `Sets the size of the label text using GOV.UK typography classes. Options: <code>s</code>, <code>m</code>, <code>l</code>, <code>xl</code>.`,
          ],
        },
      },
      // inline_label removed - handled by autocomplete component
      {
        name: "label_margin_bottom",
        category: "Styling",
        options: [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        value: null, // Default to null, let Search handle GOV.UK defaults
        description: {
          markdown: true,
          arr: [
            `Sets the bottom margin for the label using the GOV.UK spacing scale (0-9).`,
          ],
        },
      },
      {
        name: "label_custom_class",
        category: "Styling",
        value: "",
        description: {
          markdown: true,
          arr: [`Adds a custom CSS class to the label element.`],
        },
        rows: 1,
      },
      {
        name: "input_width",
        category: "Styling",
        options: [
          "",
          "full",
          "three-quarters",
          "two-thirds",
          "one-half",
          "one-third",
          "one-quarter",
        ],
        value: "", // Default to empty string (no width class)
        description: {
          markdown: true,
          arr: [
            `Sets the maximum width of the entire search component using GOV.UK Frontend utility classes (e.g., <code>govuk-!-width-two-thirds</code>). The input and button will fill this width. Leave empty for default (stretches to fit its parent container).`,
          ],
        },
      },
      {
        name: "button_background_color",
        category: "Styling",
        value: "", // Default empty, no custom color
        description: {
          markdown: true,
          arr: [
            `Sets a custom background color for the search submit button using a valid CSS color value (e.g., <code>#ff0000</code>).`,
            `<strong>Note:</strong> This custom color will be overridden by the default styles if <code>on_govuk_blue</code> or <code>homepage</code> props are set to <code>true</code>.`,
          ],
        },
        rows: 1,
      },
      {
        name: "outerClasses",
        category: "Styling",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Optional. Adds custom CSS classes to the outermost wrapping <code>div</code> element of the autocomplete component.`,
          ],
        },
        rows: 1,
      },

      // --- Behaviour & Accessibility Props ---
      {
        name: "wrap_label_in_a_heading",
        category: "Accessibility & Attributes",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Set to <code>true</code> to wrap the label content within a heading tag.`,
          ],
        },
      },
      {
        name: "heading_level",
        category: "Accessibility & Attributes",
        options: [1, 2, 3, 4, 5, 6],
        value: 2,
        description: {
          markdown: true,
          arr: [
            `Sets the heading level (1-6) if <code>wrap_label_in_a_heading</code> is <code>true</code>. Defaults to 2.`,
          ],
        },
        visible: { name: "wrap_label_in_a_heading", value: true },
      },
      {
        name: "label_id",
        category: "Accessibility & Attributes",
        value: "", // Let component generate default if empty
        description: {
          markdown: true,
          arr: [
            `Sets the <code>id</code> attribute for the input field and the <code>for</code> attribute of the label. If left empty, a unique ID will be generated.`,
          ],
        },
        rows: 1,
      },
      {
        name: "aria_controls",
        category: "Accessibility & Attributes",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the <code>aria-controls</code> attribute on the input field, pointing to the ID of the element whose content is controlled by the search.`,
            `Note: accessible-autocomplete might add its own aria attributes.`,
          ],
        },
        rows: 1,
      },
      {
        name: "disable_corrections",
        category: "Accessibility & Attributes",
        value: false,
        description: {
          markdown: true,
          arr: [
            `Set to <code>true</code> to disable mobile browser autocorrect and autocapitalization features on the input field by adding <code>autocorrect="off"</code> and <code>autocapitalize="off"</code>.`,
          ],
        },
      },

      // --- Standard Wrapper Props (Apply to outer div) ---
      {
        name: "id", // This ID applies to the outer wrapper now
        category: "Accessibility & Attributes",
        value: "", // Changed to allow user to set ID on the *autocomplete wrapper*
        description: {
          markdown: true,
          arr: [
            `Sets the <code>id</code> attribute on the outermost wrapping <code>div</code> element.`,
          ],
        },
        rows: 1,
      },
      {
        name: "outerDataAttributes",
        category: "Accessibility & Attributes",
        value: {},
        description: {
          markdown: true,
          arr: [
            `Adds custom <code>data-*</code> attributes to the outermost wrapping <code>div</code> element. Provide as a JSON object. Note: <code>data-module="gem-search-with-autocomplete"</code> is added by the component.`,
          ],
        },
        rows: 5,
      },
      {
        name: "aria",
        category: "Accessibility & Attributes",
        value: {},
        description: {
          markdown: true,
          arr: [
            `Adds custom <code>aria-*</code> attributes to the outermost wrapping <code>div</code> element. Provide as a JSON object (e.g., <code>{"labelledby": "element-id"}</code>).`,
          ],
        },
        rows: 5,
      },
      {
        name: "role",
        category: "Accessibility & Attributes",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the <code>role</code> attribute on the outermost wrapping <code>div</code> element. Consider using <code>role="search"</code> on the parent <code>form</code> element instead.`,
          ],
        },
        rows: 1,
      },
      {
        name: "lang",
        category: "Accessibility & Attributes",
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the language (<code>lang</code> attribute) for the component.`,
          ],
        },
        rows: 1,
      },
      {
        name: "dir",
        category: "Accessibility & Attributes",
        options: ["", "ltr", "rtl", "auto"],
        value: "",
        description: {
          markdown: true,
          arr: [
            `Sets the text direction (<code>dir</code> attribute) for the component. Empty string means default behavior.`,
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

  let derivedParametersObject = $derived({});

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
  {@const bgColor =
    parametersObject.homepage || parametersObject.on_govuk_blue
      ? "#1d70b8"
      : "#fff"}
  <div class="p-8" style="background-color: {bgColor};">
    {#if parametersObject.source_url && parametersObject.source_key}
      {#key [parametersObject.source_url, parametersObject.source_key, parametersObject.minLength, parametersObject.confirmOnBlur, parametersObject.showNoOptionsFound, parametersObject.defaultValue, parametersObject.placeholder, parametersObject.required, JSON.stringify(parametersObject.menuAttributes), parametersObject.menuClasses, JSON.stringify(parametersObject.options)].join("|")}
        <SearchAutocomplete {...parametersObject} bind:selectedValue/>
      {/key}
    {:else}
      <p class="text-red-600 font-bold">
        Error: Please provide both `source_url` and `source_key` props in the
        'Autocomplete' category below.
      </p>
    {/if}
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
<div id="examples" data-role="examples-section" class="px-5">
  <Examples {form}></Examples>
</div>
