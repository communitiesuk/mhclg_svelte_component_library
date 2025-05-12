<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import DateInput from "$lib/components/ui/DateInput.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Basic Date Input",
      content: BasicDateInput,
    },
    {
      id: "2",
      heading: "2. Date Input with Errors",
      content: DateInputWithError,
    },
    {
      id: "3",
      heading: "3. Date Input with Day and Month Only",
      content: DateInputDayMonth,
    },
    {
      id: "4",
      heading: "4. Date Input with Autocomplete",
      content: DateInputAutocomplete,
    },
  ];
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
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

{#snippet BasicDateInput()}
  <div class="p-5 bg-white">
    <DateInput
      id="passport-issued"
      namePrefix="passport-issued"
      fieldset={{
        legend: {
          text: "When was your passport issued?",
          isPageHeading: true,
          classes: "govuk-fieldset__legend--l",
        },
      }}
      hint={{
        text: "For example, 27 3 2007",
      }}
      items={[
        {
          name: "day",
          classes: "govuk-input--width-2",
          value: "",
        },
        {
          name: "month",
          classes: "govuk-input--width-2",
          value: "",
        },
        {
          name: "year",
          classes: "govuk-input--width-4",
          value: "",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.basicDateInput} language="svelte"></CodeBlock>
{/snippet}

{#snippet DateInputWithError()}
  <div class="p-5 bg-white">
    <DateInput
      id="dob-errors"
      namePrefix="dob"
      fieldset={{
        legend: {
          text: "What is your date of birth?",
          classes: "govuk-fieldset__legend--m",
        },
      }}
      hint={{
        text: "For example, 31 3 1980",
      }}
      errorMessage="Date of birth must include a year"
      items={[
        {
          name: "day",
          classes: "govuk-input--width-2",
          value: "6",
        },
        {
          name: "month",
          classes: "govuk-input--width-2",
          value: "3",
        },
        {
          name: "year",
          classes: "govuk-input--width-4",
          value: "",
          hasError: true,
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.dateInputWithError} language="svelte"></CodeBlock>
{/snippet}

{#snippet DateInputDayMonth()}
  <div class="p-5 bg-white">
    <DateInput
      id="bday"
      namePrefix="bday"
      fieldset={{
        legend: {
          text: "What is your birthday?",
          classes: "govuk-fieldset__legend--m",
        },
      }}
      hint={{
        text: "For example, 5 12",
      }}
      items={[
        {
          name: "day",
          classes: "govuk-input--width-2",
          value: "",
        },
        {
          name: "month",
          classes: "govuk-input--width-2",
          value: "",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.dateInputDayMonth} language="svelte"></CodeBlock>
{/snippet}

{#snippet DateInputAutocomplete()}
  <div class="p-5 bg-white">
    <DateInput
      id="dob-autocomplete"
      namePrefix="dob"
      fieldset={{
        legend: {
          text: "What is your date of birth?",
          classes: "govuk-fieldset__legend--m",
        },
      }}
      hint={{
        text: "For example, 31 3 1980",
      }}
      items={[
        {
          name: "day",
          classes: "govuk-input--width-2",
          value: "",
          autocomplete: "bday-day",
        },
        {
          name: "month",
          classes: "govuk-input--width-2",
          value: "",
          autocomplete: "bday-month",
        },
        {
          name: "year",
          classes: "govuk-input--width-4",
          value: "",
          autocomplete: "bday-year",
        },
      ]}
    />
  </div>
  <CodeBlock code={codeBlocks.dateInputAutocomplete} language="svelte"
  ></CodeBlock>
{/snippet}
