export const codeBlock1 = `
<script>

  import Template from "$lib/package-wrapping/Template.svelte";

</script>

<Template
checkboxProp={true}
dropdownProp="Dragonfruit"
jsObjectProp={[
  {
    name: "Borussia Dortmund",
    country: "Germany",
    color: "#fdff7d",
  },
  { name: "Liverpool FC", country: "UK", color: "#f59fad" },
  {
    name: "SSC Napoli",
    country: "Italy",
    color: "#69bfff",
  },
  {
    name: "S.L. Benfica",
    country: "Portugal",
    color: "#ff8c96",
  },
]}
functionProp={function (event, pokemon) {
  window.alert("Example 1 functionProp has been triggered.");
}}
></Template>`;

export const basicDateInput = `
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
</script>

<DateInput 
  id="passport-issued"
  namePrefix="passport-issued"
  fieldset={{
    legend: {
      text: "When was your passport issued?",
      isPageHeading: true
    }
  }}
  hint={{
    text: "For example, 27 3 2007"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: ""
    }
  ]}
/>`;

export const dateInputWithError = `
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
</script>

<DateInput 
  id="dob-errors"
  namePrefix="dob"
  fieldset={{
    legend: {
      text: "What is your date of birth?"
    }
  }}
  hint={{
    text: "For example, 31 3 1980"
  }}
  errorMessage="Date of birth must include a year"
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: "6"
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: "3"
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: "",
      hasError: true
    }
  ]}
/>`;

export const dateInputDayMonth = `
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
</script>

<DateInput 
  id="bday"
  namePrefix="bday"
  fieldset={{
    legend: {
      text: "What is your birthday?"
    }
  }}
  hint={{
    text: "For example, 5 12"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: ""
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: ""
    }
  ]}
/>`;

export const dateInputAutocomplete = `
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
</script>

<DateInput 
  id="dob-autocomplete"
  namePrefix="dob"
  fieldset={{
    legend: {
      text: "What is your date of birth?"
    }
  }}
  hint={{
    text: "For example, 31 3 1980"
  }}
  items={[
    {
      name: "day",
      classes: "govuk-input--width-2",
      value: "",
      autocomplete: "bday-day"
    },
    {
      name: "month",
      classes: "govuk-input--width-2",
      value: "",
      autocomplete: "bday-month"
    },
    {
      name: "year",
      classes: "govuk-input--width-4",
      value: "",
      autocomplete: "bday-year"
    }
  ]}
/>`;

export const dateInputWithBindings = `
<script>
  import DateInput from "$lib/components/ui/DateInput.svelte";
  
  // Initialize bindable values
  let day = "";
  let month = "";
  let year = "";
  
  // Function to format the date for display
  function getFormattedDate() {
    if (!day || !month || !year) return "Incomplete date";
    return \`\${day}/\${month}/\${year}\`;
  }
  
  // Function to reset the values
  function resetValues() {
    day = "";
    month = "";
    year = "";
  }
</script>

<DateInput 
  id="bound-date-input"
  namePrefix="bound-date"
  fieldset={{
    legend: {
      text: "Enter a date with bindable values"
    }
  }}
  hint={{
    text: "Values are bound to variables in the parent component"
  }}
  bind:dayValue={day}
  bind:monthValue={month}
  bind:yearValue={year}
  items={[
    { name: "day" },
    { name: "month" },
    { name: "year" }
  ]}
/>

<div class="govuk-!-margin-top-4">
  <p class="govuk-body">Current date value: <strong>{getFormattedDate()}</strong></p>
  <button class="govuk-button govuk-button--secondary govuk-!-margin-top-2" on:click={resetValues}>
    Reset Date
  </button>
</div>
`;
