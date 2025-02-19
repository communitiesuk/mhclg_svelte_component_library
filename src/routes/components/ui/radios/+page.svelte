<script lang="ts">
  // @ts-nocheck
  import { page } from "$app/stores";
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import Radios from "$lib/components/ui/Radios.svelte";
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

  // Validation function for the radios example
  function validateContactPreference(value: string): string | undefined {
    if (!value) {
      return "Please select at least one option";
    }
    if (value === "none") {
      return "You have opted out of all communications";
    }
    return undefined;
  }

  let details = {
    status: "in_progress",
    description: [
      {
        content:
          "A radios component that allows users to select exactly one option from a list.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/radios/" target="_blank" rel="noopener noreferrer">GOV.UK Design System radios component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the radios component when you need to let users select a single option from a list.",
      },
      {
        content:
          "Radio buttons should only be used when the user must choose exactly one item.",
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
        value: "",
      },
      {
        name: "selectedValue",
        category: "Content",
        isProp: true,
        inputType: "input",
        value: "",
      },
      {
        name: "name",
        category: "Form",
        isProp: true,
        inputType: "input",
        value: "contact-method",
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
              label: "Phone",
              hint: "We'll call during business hours",
            },
            {
              value: "none",
              label: "Do not contact me",
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
        value: `function validateContactPreference(value) {
  if (!value) {
    return "Please select at least one option";
  }
  if (value === "none") {
    return "You have opted out of all communications";
  }
  return undefined;
}`,
      },
      {
        name: "inline",
        category: "UI Options",
        isProp: true,
        inputType: "checkbox",
        value: false,
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

  // Demo state for bindable example
  let demoSelectedOption = $state("option2");

  let snippetSections = [
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
    {
      value: "preferences",
      label: "Communication Preferences",
      conditional: {
        id: "preferences-details",
        content: content3,
      },
    },
  ];
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
    <ScreenSizeRadio bind:demoScreenWidth />
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
            <Radios {...parametersObject} />
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
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
</script>

<Radios
  legend="Select one option"
  name="basic-options"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Select one option"
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
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "news", label: "Newsletter", hint: "Receive monthly updates" },
    { value: "updates", label: "Product Updates", hint: "New feature alerts" }
  ];
</script>

<Radios
  legend="Choose your subscriptions"
  hint="Please select one"
  name="subscriptions"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Choose your subscriptions"
          hint="Please select one"
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
              hint: "New feature alerts",
            },
          ]}
        />
      </div>
    </div>

    <!-- Example 3: With Validation -->
    <h3 class="govuk-heading-m">With Validation</h3>
    <CodeBlock
      code={`<script lang="ts">
  import Radios from "$lib/components/ui/Radios.svelte";

  function validateSelection(value: string): string | undefined {
    if (!value) {
      return "Please select one option.";
    }
    return undefined;
  }

  const options = [
    { value: "agree", label: "I agree to the terms and conditions" },
    { value: "disagree", label: "I do not agree" }
  ];
</script>

<Radios
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
        <Radios
          legend="Terms and Conditions"
          name="terms"
          options={[
            { value: "agree", label: "I agree to the terms and conditions" },
            { value: "disagree", label: "I do not agree" },
          ]}
          validate={(value) => {
            if (!value) {
              return "Please select one option.";
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
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "carrier-pigeon", label: "Carrier Pigeon" },
    { value: "postal-mail", label: "Postal Mail" },
    { value: "none", label: "I do not wish to receive updates", exclusive: true }
  ];
</script>

<Radios
  legend="Choose your method"
  name="method"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Choose your method"
          name="method"
          options={[
            { value: "carrier-pigeon", label: "Carrier Pigeon" },
            { value: "postal-mail", label: "Postal Mail" },
            {
              value: "none",
              label: "I do not wish to receive updates",
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
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    {
      value: "email",
      label: "Email",
      conditional: {
        id: "email-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="email">Email</label>
            <input class="govuk-input" id="email" name="email" type="email">
          </div>
        \`
      }
    },
    {
      value: "sms",
      label: "SMS",
      conditional: {
        id: "sms-settings",
        content: \`
          <div class="govuk-form-group">
            <label class="govuk-label" for="phone">Phone Number</label>
            <input class="govuk-input" id="phone" name="phone" type="tel">
          </div>
        \`
      }
    }
  ];
</script>

<Radios
  legend="Preferred Contact"
  name="preferred-contact"
  options={options}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Preferred Contact"
          name="preferred-contact"
          options={[
            {
              value: "email",
              label: "Email",
              conditional: {
                id: "email-settings",
                content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="email">Email</label>
                    <input class="govuk-input" id="email" name="email" type="email">
                  </div>
                `,
              },
            },
            {
              value: "sms",
              label: "SMS",
              conditional: {
                id: "sms-settings",
                content: `
                  <div class="govuk-form-group">
                    <label class="govuk-label" for="phone">Phone Number</label>
                    <input class="govuk-input" id="phone" name="phone" type="tel">
                  </div>
                `,
              },
            },
          ]}
        />
      </div>
    </div>

    <!-- Example: Inline Layout -->
    <h3 class="govuk-heading-m">Inline Layout</h3>
    <CodeBlock
      code={`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];
</script>

<Radios
  legend="Have you changed your name?"
  hint="This includes changing your last name or spelling your name differently"
  name="changedName"
  options={options}
  inline={true}
  isPageHeading={true}
/>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Have you changed your name?"
          hint="This includes changing your last name or spelling your name differently"
          name="changedName"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
          inline={true}
          isPageHeading={true}
        />
      </div>
    </div>

    <!-- Example: Using Snippets -->
    <h3 class="govuk-heading-m">
      Using Snippets and Nested Components for Conditional Content
    </h3>
    <CodeBlock
      code={`<script>
  import Radios from "$lib/components/ui/Radios.svelte";

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
    },
    {
      value: "preferences",
      label: "Communication Preferences",
      conditional: {
        id: "preferences-details",
        content: content3
      }
    }
  ];
</script>

<Radios
  legend="Contact Method"
  name="contact-method-snippets"
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
{/snippet}

{#snippet content3()}
  <div class="govuk-form-group">
    <Radios
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(value) => !value ? "Please select a time slot" : undefined}
      options={[
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
        { value: "evening", label: "Evening (5pm - 8pm)" },
      ]}
    />
  </div>
{/snippet}`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <Radios
          legend="Contact Method"
          name="contact-method-snippets"
          options={snippetSections}
        />
      </div>
    </div>

    <!-- Example: Bindable Value -->
    <h3 class="govuk-heading-m">Bindable Value</h3>
    <CodeBlock
      code={`<script>
  import Radios from "$lib/components/ui/Radios.svelte";
  
  let selectedOption = $state("option2");
  
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
</script>

<div class="govuk-form-group">
  <label class="govuk-label" for="option-input">
    Type 'option1', 'option2', or 'option3' to select a radio button
  </label>
  <input
    class="govuk-input"
    id="option-input"
    bind:value={selectedOption}
    placeholder="Type an option value..."
  />
</div>

<Radios
  legend="Select an option"
  name="bindable-demo"
  {options}
  bind:selectedValue={selectedOption}
/>

<p class="govuk-body">Currently selected: {selectedOption}</p>`}
      language="svelte"
    />

    <div class="app-example-wrapper">
      <div
        class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
      >
        <div class="govuk-form-group">
          <label class="govuk-label" for="option-input">
            Type 'option1', 'option2', or 'option3' to select a radio button
          </label>
          <input
            class="govuk-input"
            id="option-input"
            bind:value={demoSelectedOption}
            placeholder="Type an option value..."
          />
        </div>

        <div class="mt-4">
          <Radios
            legend="Select an option"
            name="bindable-demo"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            bind:selectedValue={demoSelectedOption}
          />
        </div>

        <p class="govuk-body mt-4">Currently selected: {demoSelectedOption}</p>
      </div>
    </div>
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

{#snippet content3()}
  <div class="govuk-form-group">
    <Radios
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(value) => (!value ? "Please select a time slot" : undefined)}
      options={[
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
        { value: "evening", label: "Evening (5pm - 8pm)" },
      ]}
    />
  </div>
{/snippet}

<style>
  [data-role="examples-section"] {
    max-width: 1024px;
    margin: 0 auto;
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
