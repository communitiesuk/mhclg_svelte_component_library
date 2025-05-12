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
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
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
      text: "What is your date of birth?",
      classes: "govuk-fieldset__legend--m"
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
      classes: "govuk-input--width-4 govuk-input--error",
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
      text: "What is your birthday?",
      classes: "govuk-fieldset__legend--m"
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
      text: "What is your date of birth?",
      classes: "govuk-fieldset__legend--m"
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
