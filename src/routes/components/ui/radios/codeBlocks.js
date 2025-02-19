export const codeBlockOne = `<script>
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
/>`;

export const codeBlockTwo = `<script>
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
/>`;

export const codeBlockThree = `<script lang="ts">
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
/>`;

export const codeBlockFour = `<script>
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
/>`;

export const codeBlockFive = `<script>
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
/>`;

export const codeBlockSix = `<script>
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
/>`;

export const codeBlockSeven = `<script>
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
{/snippet}`;
