export const codeBlock1 = `
<script>
  import Tabs from "$lib/components/ui/Tabs.svelte";
</script>

<Tabs
  title="Contents"
  tabs={[
    {
      id: "tab-1",
      label: "First Tab",
      content: "Welcome to the first tab! This is a simple example showing how tabs can display basic text content.",
    },
    {
      id: "tab-2",
      label: "Second Tab",
      content: "Here's the second tab with some different content. Tabs are great for organizing related information.",
    },
    {
      id: "tab-3",
      label: "Third Tab",
      content: "And finally, the third tab. You can navigate between tabs using either your mouse or keyboard.",
    }
  ]}
/>`;

export const codeBlock2 = `
<script>
  import Tabs from "$lib/components/ui/Tabs.svelte";
</script>

{#snippet tab1Content()}
  <h2 class="govuk-heading-l">First Tab Content</h2>
  <p class="govuk-body">This tab is not selected by default.</p>
{/snippet}

{#snippet tab2Content()}
  <h2 class="govuk-heading-l">Second Tab Content</h2>
  <p class="govuk-body">This tab is selected by default because it has selected=true.</p>
{/snippet}

{#snippet tab3Content()}
  <h2 class="govuk-heading-l">Third Tab Content</h2>
  <p class="govuk-body">This tab is not selected by default.</p>
{/snippet}

<Tabs
  title="Pre-selected Tab Example"
  tabs={[
    {
      id: "example-tab-1",
      label: "First Tab",
      content: tab1Content,
    },
    {
      id: "example-tab-2",
      label: "Second Tab",
      selected: true, // This tab will be selected by default
      content: tab2Content,
    },
    {
      id: "example-tab-3",
      label: "Third Tab",
      content: tab3Content,
    }
  ]}
/>`;

export const codeBlock3 = `
<script>
  import Tabs from "$lib/components/ui/Tabs.svelte";
  import Radios from "$lib/components/ui/Radios.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

{#snippet chartsTabContent()}
  <h2 class="govuk-heading-l">Charts & Data</h2>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-one-half">
      <table class="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--m">Monthly statistics</caption>
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Month</th>
            <th scope="col" class="govuk-table__header">Value</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">January</td>
            <td class="govuk-table__cell">125</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">February</td>
            <td class="govuk-table__cell">163</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">March</td>
            <td class="govuk-table__cell">142</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="govuk-grid-column-one-half">
      <!-- Chart placeholder -->
      <div style="height: 200px; background-color: #f3f2f1; display: flex; align-items: center; justify-content: center;">
        <p class="govuk-body">Chart Placeholder</p>
      </div>
    </div>
  </div>
{/snippet}

{#snippet formsTabContent()}
  <h2 class="govuk-heading-l">Forms & Input</h2>
  <form class="govuk-form-group">
    <label class="govuk-label" for="example-input">Example input</label>
    <input
      class="govuk-input govuk-input--width-20"
      id="example-input"
      name="example-input"
      type="text"
    />

    <div class="govuk-form-group" style="margin-top: 20px;">
      <Radios
        name="example-radios"
        legend="Select an option"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]}
      />
    </div>

    <div style="margin-top: 20px;">
      <Button textContent="Continue" buttonType="default" />
    </div>
  </form>
{/snippet}

{#snippet mediaTabContent()}
  <h2 class="govuk-heading-l">Media Content</h2>
  <figure class="govuk-!-margin-bottom-6">
    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Person working on laptop with notebook and coffee" style="max-width: 100%; height: auto;">
    <figcaption class="govuk-body-s govuk-!-margin-top-2">Modern workspace with laptop and notebook</figcaption>
  </figure>
  <p class="govuk-body">Tabs can contain various types of media including images, videos, and interactive content.</p>
{/snippet}

<Tabs
  title="Rich Content Example"
  tabs={[
    {
      id: "rich-tab-1",
      label: "Charts & Data",
      content: chartsTabContent,
    },
    {
      id: "rich-tab-2",
      label: "Forms & Input",
      content: formsTabContent,
    },
    {
      id: "rich-tab-3",
      label: "Media Content",
      content: mediaTabContent,
    }
  ]}
/>`;
