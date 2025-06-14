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
    {
      id: "5",
      heading: "5. Date Input with Bindable Values",
      content: DateInputWithBindings,
    },
  ];

  // For binding example
  let boundDay = "";
  let boundMonth = "";
  let boundYear = "";

  function getFormattedBoundDate() {
    if (!boundDay || !boundMonth || !boundYear) return "Incomplete date";
    return `${boundDay}/${boundMonth}/${boundYear}`;
  }

  function resetBoundValues() {
    boundDay = "";
    boundMonth = "";
    boundYear = "";
  }
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

{#snippet BasicDateInput()}
  <div class="p-5 bg-white">
    <DateInput
      id="passport-issued"
      namePrefix="passport-issued"
      fieldset={{
        legend: {
          text: "When was your passport issued?",
          isPageHeading: true,
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

{#snippet DateInputWithBindings()}
  <div class="p-5 bg-white">
    <DateInput
      id="bound-date-input"
      namePrefix="bound-date"
      fieldset={{
        legend: {
          text: "Enter a date with bindable values",
        },
      }}
      hint={{
        text: "Values are bound to variables in the parent component",
      }}
      bind:dayValue={boundDay}
      bind:monthValue={boundMonth}
      bind:yearValue={boundYear}
      items={[{ name: "day" }, { name: "month" }, { name: "year" }]}
    />

    <div class="mt-4 p-3 border border-gray-200 rounded bg-gray-50">
      <p class="text-sm">
        Current date value: <strong>{getFormattedBoundDate()}</strong>
      </p>
      <button
        class="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        on:click={resetBoundValues}
      >
        Reset Date
      </button>
    </div>
  </div>
  <CodeBlock code={codeBlocks.dateInputWithBindings} language="svelte"
  ></CodeBlock>
{/snippet}
