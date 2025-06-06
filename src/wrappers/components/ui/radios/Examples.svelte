<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Radios from "$lib/components/ui/Radios.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Usage",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. With Hint",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. With Validation",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Exclusive Option",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. With Conditional Content",
      content: Example5,
    },
    {
      id: "6",
      heading: "6. Inline Layout",
      content: Example6,
    },
    {
      id: "7",
      heading:
        "7. Using Snippets and Nested Components for Conditional Content",
      content: Example7,
    },
  ];

  // Demo state for bindable example
  let demoSelectedOption = $state("option2");
</script>

<div>
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass="w-full"
  >
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet Example1()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockOne} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockTwo} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockThree} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockFour} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockFive} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example6()}
  <div class="p-5 bg-white">
    <Radios
      legend="Contact Method"
      name="contact-method-snippets"
      options={snippetSections}
    />
  </div>
  <CodeBlock code={codeBlocks.codeBlockSix} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example7()}
  <div class="p-5 bg-white">
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
  <CodeBlock code={codeBlocks.codeBlockSeven} language="svelte"></CodeBlock>
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
