<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Checkbox from "$lib/components/ui/Checkbox.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With hint",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With validation",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. With an exclusive 'or' alternative option",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Using the validate prop",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. Using 'small' checkboxes and labels",
      content: Example6,
    },
    {
      id: "7",
      heading: "7. Legend title is a H1 page heading",
      content: Example7,
    },
    {
      id: "8",
      heading: "8. Small legend size",
      content: Example8,
    },
    {
      id: "9",
      heading: "9. Using the validate prop to require two selections",
      content: Example9,
    },
    {
      id: "10",
      heading: "10. Await options which are derived from data/API",
      content: Example10,
    },
    {
      id: "11",
      heading:
        "11. Providing snippets for the content contained when a checkbox is selected",
      content: Example11,
    },
    {
      id: "12",
      heading: "12. Demonstrating the binding of the selectedValues prop",
      content: Example12,
    },
  ];

  let exampleElevenSnippetSections = [
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

  // Demo state for bindable example (example 12)
  let demoSelected = $state([]);

  const demoOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "none", label: "None of the above", exclusive: true },
  ];
</script>

<!-- Example 1: Basic Usage -->
{#snippet Example1()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockOne} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 2: With Hint -->
{#snippet Example2()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockTwo} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 3: With Validation -->
{#snippet Example3()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockThree} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 4: Exclusive Option -->
{#snippet Example4()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockFour} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 5: Conditional Content -->
{#snippet Example5()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockFive} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 6: Small Variation -->
{#snippet Example6()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockSix} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

{#snippet Example7()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockSeven} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

<!-- Example 8: Legend Size -->
{#snippet Example8()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockEight} language="svelte" />
      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

{#snippet Example9()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockNine} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

{#snippet Example10()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockTen} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
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
    </div>
  </div>
{/snippet}

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
    <Checkbox
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

{#snippet Example11()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockEleven} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
        >
          <Checkbox
            legend="Contact Methods"
            name="contact-methods-snippets"
            options={exampleElevenSnippetSections}
          />
        </div>
      </div>
    </div>
  </div>
{/snippet}

{#snippet Example12()}
  <div class="bg-orange-50 py-5">
    <div class="mx-4">
      <CodeBlock code={codeBlocks.codeBlockTwelve} language="svelte" />

      <div class="app-example-wrapper">
        <div
          class="app-example__frame app-example__frame--resizable app-example__frame--m p-6"
          style="height: auto;"
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
            <Checkbox
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
    </div>
  </div>
{/snippet}

<div class="my-20">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="hover:bg-slate-100"
  >
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        {@render section.content()}
      </AccordionItem>
    {/each}
  </Accordion>
</div>
