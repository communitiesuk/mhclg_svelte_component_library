<script lang="ts">
  //@ts-nocheck
  import type { PageProps } from "./$types";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import CheckBox from "$lib/components/ui/Checkbox.svelte";
  import { defaultScreenWidthBreakpoints } from "$lib/config.js";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";
  import ParametersSection from "$lib/package-wrapping/ParametersSection.svelte";
  import ScreenSizeRadio from "$lib/package-wrapping/ScreenSizeRadio.svelte";
  import { getValueFromParametersArray } from "$lib/utils/data-transformations/getValueFromParametersArray.js";
  import { addIndexAndInitalValue } from "$lib/utils/package-wrapping-specific/addIndexAndInitialValue.js";
  import { createParametersObject } from "$lib/utils/package-wrapping-specific/createParametersObject.js";
  import { trackVisibleParameters } from "$lib/utils/package-wrapping-specific/trackVisibleParameters.js";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as examples from "./codeBlocks.js";

  let { data, homepage = undefined, folders }: PageProps = $props();

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

  let pageInfo = page?.route.id.split("/");

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
        name: "selectedValues",
        category: "Content",
        isProp: true,
        inputType: "javascript",
        value: "[]",
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
          if (
            values.includes("email") &&
            !values.includes("sms") &&
            !values.includes("none")
          ) {
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

  // Demo state for bindable example
  let demoSelected = $state([]);

  const demoOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "none", label: "None of the above", exclusive: true },
  ];

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
    <h5 id="component-demo" class="mb-6 mt-12 underline underline-offset-4">Component Demo</h5>
    <ScreenSizeRadio bind:demoScreenWidth></ScreenSizeRadio>
  </div>
  {#if browser}
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
      <CodeBlock code={examples.codeBlockOne} language="svelte" />

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
      <CodeBlock code={examples.codeBlockTwo} language="svelte" />

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
      <CodeBlock code={examples.codeBlockThree} language="svelte" />

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
      <CodeBlock code={examples.codeBlockFour} language="svelte" />

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
      <CodeBlock code={examples.codeBlockFive} language="svelte" />

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
                  content: "",
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
      <CodeBlock code={examples.codeBlockSix} language="svelte" />

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
      <CodeBlock code={examples.codeBlockSeven} language="svelte" />

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
      <CodeBlock code={examples.codeBlockEight} language="svelte" />

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
      <CodeBlock code={examples.codeBlockNine} language="svelte" />

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
      <CodeBlock code={examples.codeBlockTen} language="svelte" />

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
      <h3 class="govuk-heading-m">
        Using Snippets and Nested Components for Conditional Content
      </h3>
      <CodeBlock code={examples.codeBlockEleven} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <CheckBox
            legend="Contact Methods"
            name="contact-methods-snippets"
            options={snippetSections}
          />
        </div>
      </div>

      <!-- Example 12: Bindable Values -->
      <h3 class="govuk-heading-m">Bindable Values</h3>
      <CodeBlock
        code={`<script>
  import CheckBox from "$lib/components/ui/CheckBox.svelte";
  
  let selected = $state([]); // Initialise empty array for selections
  
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "none", label: "None of the above", exclusive: true }
  ];
</script>

<!-- Multiple select bound to the same values -->
<div class="govuk-form-group">
  <label class="govuk-label" for="select-input">
    Select options from dropdown
  </label>
  <select
    class="govuk-select"
    id="select-input"
    multiple
    bind:value={selected}
    size="4"
    style="min-width: 300px; padding: 8px; height: auto;"
  >
    {#each options as option}
      <option value={option.value} style="padding: 8px;">{option.label}</option>
    {/each}
  </select>
</div>

<div class="govuk-form-group mt-4">
  <CheckBox
    legend="Select options"
    name="bindable-demo"
    {options}
    bind:selectedValues={selected}
  />
</div>

<p class="govuk-body mt-4">Currently selected: {selected.join(', ')}</p>`}
        language="svelte"
      />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <div class="govuk-form-group">
            <label class="govuk-label" for="select-input">
              Select options from dropdown
            </label>
            <select
              class="govuk-select"
              id="select-input"
              multiple
              bind:value={demoSelected}
              size="4"
              style="min-width: 300px; padding: 8px; height: auto;"
            >
              {#each demoOptions as option}
                <option value={option.value} style="padding: 8px;"
                  >{option.label}</option
                >
              {/each}
            </select>
          </div>

          <div class="govuk-form-group mt-4">
            <CheckBox
              legend="Select options"
              name="bindable-demo"
              options={demoOptions}
              bind:selectedValues={demoSelected}
            />
          </div>

          <p class="govuk-body mt-4">
            Currently selected: {demoSelected.join(", ")}
          </p>
        </div>
      </div>
      <!-- ...additional examples as needed... -->
    </div>
  {/if}
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
    <CheckBox
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(values) =>
        values.length === 0
          ? "Please select at least one time slot"
          : undefined}
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
