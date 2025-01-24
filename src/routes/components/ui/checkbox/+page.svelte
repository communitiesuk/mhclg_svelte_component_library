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
        inputType: "javascript",
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
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>

  <div data-role="component-container">
    <div
      data-role="component-container-centered"
      style="width: {demoScreenWidth}px;"
    >
      <div class="flex flex-col gap-4">
        <div class="app-example-wrapper">
          <div
            class="app-example__frame app-example__frame--resizable app-example__frame--l p-6"
          >
            <CheckBox {...parametersObject} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20" data-role="examples-section">
    <DividerLine margin="30px 0px 30px 0px" />
    <h5 class="mb-6 mt-12 underline underline-offset-4">Examples</h5>

    <!-- Example 1: Basic Usage -->
    <h3 class="govuk-heading-m">Basic Usage</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
</script>

<CheckBox
  legend="Select your options"
  name="basic-options"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Select your options"
          name="basic-options"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
        />
      </div>
    </div>

    <!-- Example 2: With Hint -->
    <h3 class="govuk-heading-m">With Hint</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "news", label: "Newsletter", hint: "Receive monthly updates" },
    { value: "updates", label: "Product Updates", hint: "Stay informed about new features" }
  ];
</script>

<CheckBox
  legend="Choose your subscriptions"
  hint="Select all that apply"
  name="subscriptions"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Choose your subscriptions"
          hint="Select all that apply"
          name="subscriptions"
          options={[
            {
              value: "news",
              label: "Newsletter",
              hint: "Receive monthly updates",
            },
            {
              value: "updates",
              label: "Product Updates",
              hint: "Stay informed about new features",
            },
          ]}
        />
      </div>
    </div>

    <!-- Example 3: With Validation -->
    <h3 class="govuk-heading-m">With Validation</h3>
    <CodeBlock
      code={`<script lang="ts">
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validateSelection(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one option.";
    }
    return undefined;
  }

  const options = [
    { value: "agree", label: "I agree to the terms and conditions" }
  ];
</script>

<CheckBox
  legend="Terms and Conditions"
  name="terms"
  options={options}
  validate={validateSelection}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Terms and Conditions"
          name="terms"
          options={[
            { value: "agree", label: "I agree to the terms and conditions" },
          ]}
          validate={(values) => {
            if (values.length === 0) {
              return "Please select at least one option.";
            }
            return undefined;
          }}
        />
      </div>
    </div>

    <!-- Example 4: Exclusive Option -->
    <h3 class="govuk-heading-m">Exclusive Option</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "email", label: "Email Notifications" },
    { value: "sms", label: "SMS Notifications" },
    { value: "none", label: "Do not receive any notifications", exclusive: true }
  ];
</script>

<CheckBox
  legend="Notification Preferences"
  name="notifications"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Notification Preferences"
          name="notifications"
          options={[
            { value: "email", label: "Email Notifications" },
            { value: "sms", label: "SMS Notifications" },
            {
              value: "none",
              label: "Do not receive any notifications",
              exclusive: true,
            },
          ]}
        />
      </div>
    </div>

    <!-- Example 5: Conditional Content -->
    <h3 class="govuk-heading-m">With Conditional Content</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validatePreferences(values: string[]): string | undefined {
    if (values.length === 0) {
      return "Please select at least one contact method.";
    }
    return undefined;
  }

  const options = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="email">Email Address</label>
            <input class="govuk-input" id="email" name="email" type="email">
          </div>
        \`
      }
    },
    { value: "sms", label: "SMS" }
  ];
</script>

<CheckBox
  legend="Contact Methods"
  name="contact-methods"
  options={options}
  validate={validatePreferences}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Contact Methods"
          name="contact-methods"
          options={[
            {
              value: "email",
              label: "Email",
              conditional: {
                id: "email-settings",
                content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email Address</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `,
              },
            },
            { value: "sms", label: "SMS" },
          ]}
          validate={(values) => {
            if (values.length === 0) {
              return "Please select at least one contact method.";
            }
            return undefined;
          }}
        />
      </div>
    </div>

    <!-- Example 6: Small Variation -->
    <h3 class="govuk-heading-m">Small Variation</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ];
</script>

<CheckBox
  legend="Select items"
  name="select-items"
  options={options}
  small={true}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Select items"
          name="select-items"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
          small={true}
        />
      </div>
    </div>

    <!-- Example 7: Page Heading -->
    <h3 class="govuk-heading-m">As Page Heading</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "optionA", label: "Option A" },
    { value: "optionB", label: "Option B" }
  ];
</script>

<CheckBox
  legend="Main Preferences"
  name="main-preferences"
  options={options}
  isPageHeading={true}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Main Preferences"
          name="main-preferences"
          options={[
            { value: "optionA", label: "Option A" },
            { value: "optionB", label: "Option B" },
          ]}
          isPageHeading={true}
        />
      </div>
    </div>

    <!-- Example 8: Legend Size -->
    <h3 class="govuk-heading-m">Legend Size</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];
</script>

<CheckBox
  legend="Priority Levels"
  name="priority-levels"
  options={options}
  legendSize="s"
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Priority Levels"
          name="priority-levels"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          legendSize="s"
        />
      </div>
    </div>

    <!-- Example 9: Multiple Conditional Contents -->
    <h3 class="govuk-heading-m">Multiple Conditional Contents</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  function validateOptions(values: string[]): string | undefined {
    if (values.length < 2) {
      return "Please select at least two options.";
    }
    return undefined;
  }

  const options = [
    {
      value: "option1",
      label: "Option 1",
      conditional: {
        id: "option1-details",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="option1-detail">Details for Option 1</label>
            <input class="govuk-input" id="option1-detail" name="option1-detail" type="text">
          </div>
        \`
      }
    },
    {
      value: "option2",
      label: "Option 2",
      conditional: {
        id: "option2-details",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="option2-detail">Details for Option 2</label>
            <input class="govuk-input" id="option2-detail" name="option2-detail" type="text">
          </div>
        \`
      }
    }
  ];
</script>

<CheckBox
  legend="Multiple Options"
  name="multiple-options"
  options={options}
  validate={validateOptions}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Multiple Options"
          name="multiple-options"
          options={[
            {
              value: "option1",
              label: "Option 1",
              conditional: {
                id: "option1-details",
                content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="option1-detail">Details for Option 1</label>
                    <input class="govuk-input" id="option1-detail" name="option1-detail" type="text">
                  </div>
                `,
              },
            },
            {
              value: "option2",
              label: "Option 2",
              conditional: {
                id: "option2-details",
                content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="option2-detail">Details for Option 2</label>
                    <input class="govuk-input" id="option2-detail" name="option2-detail" type="text">
                  </div>
                `,
              },
            },
          ]}
          validate={(values) => {
            if (values.length < 2) {
              return "Please select at least two options.";
            }
            return undefined;
          }}
        />
      </div>
    </div>

    <!-- Example 10: Dynamic Options -->
    <h3 class="govuk-heading-m">Dynamic Options</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";
  import { onMount } from "svelte";

  let options = [];

  onMount(() => {
    // Fetch options from an API or other source
    options = [
      { value: "dynamic1", label: "Dynamic Option 1" },
      { value: "dynamic2", label: "Dynamic Option 2" },
      { value: "dynamic3", label: "Dynamic Option 3" }
    ];
  });
</script>

<CheckBox
  legend="Dynamic Options"
  name="dynamic-options"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Dynamic Options"
          name="dynamic-options"
          options={[
            { value: "dynamic1", label: "Dynamic Option 1" },
            { value: "dynamic2", label: "Dynamic Option 2" },
            { value: "dynamic3", label: "Dynamic Option 3" },
          ]}
        />
      </div>
    </div>

    <!-- Example 11: Using Snippets for Conditional Content -->
    <h3 class="govuk-heading-m">Using Snippets for Conditional Content</h3>
    <CodeBlock
      code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";

  let snippetSections = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-details",
        content: content1
      }
    },
    {
      value: "phone",
      label: "Phone",
      conditional: {
        id: "phone-details",
        content: content2
      }
    }
  ];
</script>

<CheckBox
  legend="Contact Methods"
  name="contact-methods-snippets"
  options={snippetSections}
/>

{#snippet content1()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="email-input">Email Address</label>
    <div class="govuk-hint">We'll use this for important notifications</div>
    <input class="govuk-input" id="email-input" name="email-input" type="email">
  </div>
{/snippet}

{#snippet content2()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="phone-input">Phone Number</label>
    <div class="govuk-hint">Include country code if international</div>
    <input class="govuk-input" id="phone-input" name="phone-input" type="tel">
  </div>
{/snippet}`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <CheckBox
          legend="Contact Methods"
          name="contact-methods-snippets"
          options={[
            {
              value: "email",
              label: "Email",
              conditional: {
                id: "email-details",
                content: content1,
              },
            },
            {
              value: "phone",
              label: "Phone",
              conditional: {
                id: "phone-details",
                content: content2,
              },
            },
          ]}
        />
      </div>
    </div>

    <!-- ...additional examples as needed... -->
  </div>
{/if}

{#snippet content1()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="email-input">Email Address</label>
    <div class="govuk-hint">We'll use this for important notifications</div>
    <input
      class="govuk-input"
      id="email-input"
      name="email-input"
      type="email"
    />
  </div>
{/snippet}

{#snippet content2()}
  <div class="govuk-form-group">
    <label class="govuk-label" for="phone-input">Phone Number</label>
    <div class="govuk-hint">Include country code if international</div>
    <input class="govuk-input" id="phone-input" name="phone-input" type="tel" />
  </div>
{/snippet}

<style>
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
