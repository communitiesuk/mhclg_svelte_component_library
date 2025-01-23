<script lang="ts">
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import CheckBox from "$lib/components/ui/CheckBox.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";

  let { data, homepage = undefined, folders } = $props();

  // Validation function for the checkbox example
  function validateContactPreferences(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one contact method";
    }
    if (values.includes("none") && values.length > 1) {
      return "You cannot select other options when opting out of all communications";
    }
    if (
      values.includes("email") &&
      !values.includes("sms") &&
      !values.includes("none")
    ) {
      return "Please select SMS as a backup digital contact method when using email";
    }
    return undefined;
  }

  let details = {
    status: "in_progress",
    description: [
      {
        content:
          "A checkbox component that allows users to select one or more options from a list.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/checkboxes/" target="_blank" rel="noopener noreferrer">GOV.UK Design System checkbox component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the checkbox component when you need to let users select one or more options from a list.",
      },
      {
        content:
          "You can also use checkboxes to toggle a single option on or off.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };

  let pageInfo = $page?.route.id.split("/");

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    "title-first-word",
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];

  let demoScreenWidth = $state(defaultScreenWidthBreakpoints.md);

  let parametersSourceArray =
    homepage ??
    addIndexAndInitalValue([
      {
        name: "legend",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "How would you like to be contacted?",
      },
      {
        name: "hint",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "Select all that apply",
      },
      {
        name: "name",
        category: "Form",
        isProp: true,
        inputType: "input",
        value: "contact-preferences",
      },
      {
        name: "options",
        category: "Content",
        isProp: true,
        inputType: "textArea",
        value: JSON.stringify(
          [
            {
              value: "email",
              label: "Email",
              hint: "We'll send updates to your inbox",
            },
            {
              value: "sms",
              label: "Text message",
              hint: "UK mobile numbers only",
            },
            {
              value: "phone",
              label: "Phone call",
              hint: "We'll call during business hours",
            },
            {
              value: "none",
              label: "Do not contact me",
              exclusive: true,
            },
          ],
          null,
          2,
        ),
      },
      {
        name: "error",
        category: "Validation",
        isProp: true,
        inputType: "input",
        value: "",
      },
      {
        name: "isPageHeading",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: "false",
      },
      {
        name: "small",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: "false",
      },
      {
        name: "legendSize",
        category: "UI Options",
        isProp: true,
        inputType: "dropdown",
        options: ["l", "m", "s"],
        value: "l",
      },
      {
        name: "validate",
        category: "Validation",
        isProp: true,
        inputType: "function",
        value: `function validateContactPreferences(values) {
  if (values.length === 0) {
    return "Please select at least one contact method";
  }
  if (values.includes("none") && values.length > 1) {
    return "You cannot select other options when opting out of all communications";
  }
  if (values.includes("email") && !values.includes("sms") && !values.includes("none")) {
    return "Please select SMS as a backup digital contact method when using email";
  }
  return undefined;
}`,
      },     
    ]);

  let parametersValuesArray = $state(
    homepage ?? parametersSourceArray.map((el) => el.value),
  );

  let options = $derived(
    homepage ??
      JSON.parse(
        getValueFromParametersArray(
          parametersSourceArray,
          parametersValuesArray,
          "options",
        ),
      ),
  );

  let derivedParametersObject = $derived(homepage ?? { options });

  let parametersVisibleArray = $derived(
    homepage ??
      trackVisibleParameters(parametersSourceArray, parametersValuesArray),
  );

  let parametersObject = $derived(
    homepage ??
      createParametersObject(
        parametersSourceArray,
        parametersValuesArray,
        derivedParametersObject,
      ),
  );
</script>

<ComponentDetails {homepage} {details} />

{#if !homepage}
  <ParametersSection
    {details}
    {parametersSourceArray}
    bind:parametersValuesArray
    {parametersVisibleArray}
  />

  <div data-role="demo-section">
    <h5 class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:value={demoScreenWidth} />
  </div>

  <div data-role="component-container">
    <div data-role="component-container-centered">
      <div class="example-area">
        <div class="example-area__content" style="width: {demoScreenWidth}px">
          <CheckBox
            {...parametersObject}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px" />
    <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5>
    <h3 class="govuk-heading-m">Basic Usage</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    {
      value: "email",
      label: "Email",
      hint: "We'll send updates to your inbox"
    },
    {
      value: "sms",
      label: "Text message",
      hint: "UK mobile numbers only"
    }
  ];
</script>

<CheckBox
  legend="How would you like to be contacted?"
  hint="Select all that apply"
  name="contact-preferences"
  {options}
/>`}
      language="svelte"
    />

    <h3 class="govuk-heading-m">With Validation</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validateContactPreferences(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one contact method";
    }
    return undefined;
  }

  const options = [
    {
      value: "email",
      label: "Email"
    },
    {
      value: "sms",
      label: "Text message"
    }
  ];
</script>

<CheckBox
  legend="How would you like to be contacted?"
  name="contact-preferences"
  {options}
  validate={validateContactPreferences}
/>`}
      language="svelte"
    />

    <h3 class="govuk-heading-m">With Exclusive Option</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    {
      value: "email",
      label: "Email"
    },
    {
      value: "sms",
      label: "Text message"
    },
    {
      value: "none",
      label: "Do not contact me",
      exclusive: true
    }
  ];
</script>

<CheckBox
  legend="How would you like to be contacted?"
  name="contact-preferences"
  {options}
/>`}
      language="svelte"
    />
  </div>
{/if}

<style>
  .example-area {
    padding: 30px;
    background-color: #f8f8f8;
    border: 1px solid #b1b4b6;
  }

  .example-area__content {
    margin: 0 auto;
    transition: width 0.3s ease-in-out;
  }

  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0px auto;
  }

  [data-role="demo-section"] {
    max-width: 1024px;
    margin: 0 auto;
  }
  [data-role="component-container"] {
    display: grid;
    place-items: center;
  }
  [data-role="component-container-centered"] {
    padding: 20px 0;
  }
</style>
