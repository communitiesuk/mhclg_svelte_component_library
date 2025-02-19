export const codeBlockOne = `
<script>
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
/>
`;
export const codeBlockTwo = `
<script>
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
/>
`;

export const codeBlockThree = `
<script lang="ts">
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
/>
`;

export const codeBlockFour = `
<script>
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
/>
`;

export const codeBlockFive = `
<script>
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
        content: ""
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
/>
`;

export const codeBlockSix = `
<script>
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
/>
`;
export const codeBlockSeven = `
<script>
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
/>
`;

export const codeBlockEight = `
<script>
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
/>
`;

export const codeBlockNine = `
<script>
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
        content: ""
          
        
      }
    },
    {
      value: "option2",
      label: "Option 2",
      conditional: {
        id: "option2-details",
        content: ""
      }
    }
  ];
</script>

<CheckBox
  legend="Multiple Options"
  name="multiple-options"
  options={options}
  validate={validateOptions}
/>
`;

export const codeBlockTen = `
<script>
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
/>
`;

export const codeBlockEleven = `
<script>
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
{/snippet}

{#snippet content3()}
  <div class="govuk-form-group">
    <CheckBox
      legend="When should we contact you?"
      name="contact-timing"
      small={true}
      legendSize="s"
      validate={(values) => values.length === 0 ? "Please select at least one time slot" : undefined}
      options={[
        { value: "morning", label: "Morning (9am - 12pm)" },
        { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
        { value: "evening", label: "Evening (5pm - 8pm)" },
      ]}
    />
  </div>
{/snippet}
`;

export const codeBlockTwelve = `<script>
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

<p class="govuk-body mt-4">Currently selected: {selected.join(', ')}</p>`;
