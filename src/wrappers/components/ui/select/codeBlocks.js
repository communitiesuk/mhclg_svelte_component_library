export const codeBlock1 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-basic"
  name="sort-basic"
  {items}
/>
`;

export const codeBlock2 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, // Add placeholder
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-default"
  name="sort-default"
  label="Sort by (Default Value - with Placeholder)"
  {items}
  // No 'value' prop passed - defaults to placeholder
/>
`;

export const codeBlock3 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-hint"
  name="sort-hint"
  label="Sort by"
  hint="Choose the order items are displayed in."
  {items}
  value="updated"
/>
`;

export const codeBlock4 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, // Example with empty value
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-error"
  name="sort-error"
  label="Sort by"
  error="You must select a sort option."
  {items}
  value=""
/>
`;

export const codeBlock5 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-heading-full"
  name="sort-heading-full"
  label="Sort results by"
  labelIsPageHeading={true}
  fullWidth={true}
  {items}
  value="updated"
/>
`;

export const codeBlock6 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated", disabled: true }, // Disabled item
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];
</script>

<Select 
  id="sort-disabled"
  name="sort-disabled"
  label="Sort by (with disabled option)"
  {items}
  value="published" // Select a non-disabled option initially
/>
`;

export const codeBlock7 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "", text: "Please select" }, 
    { value: "allowed", text: "Allowed Option" },
    { value: "disallowed", text: "Disallowed Option (Client Validation)" },
    { value: "other", text: "Other Option" },
  ];
  
  // Client-side validation function
  function validateSelect(value) {
    if (!value) {
      return "You must select an option.";
    }
    if (value === "disallowed") {
      return "This option is not permitted.";
    }
    return undefined; // Valid
  }
</script>

<Select 
  id="sort-validation"
  name="sort-validation"
  label="Select (with validation)"
  hint="Try selecting the disallowed option."
  {items}
  value=""
  validate={validateSelect} // Pass validation function
/>
`;

export const codeBlock8 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "alpha", text: "Alpha" },
    { value: "beta", text: "Beta" },
    { value: "gamma", text: "Gamma" },
  ];
</script>

<div id="extra-description" class="govuk-body-s govuk-!-margin-bottom-1">This text provides extra context.</div>

<Select 
  id="sort-extra-props"
  name="sort-extra-props"
  label="Select with extra props"
  {items}
  value="beta"
  formGroupClasses="my-custom-form-group another-class"
  describedBy="extra-description" // Override default describedBy
  data-custom-attribute="example-value" // Example of spreading other attributes
/>
`;

export const codeBlock9 = `
<script>
  import Select from "$lib/components/ui/Select.svelte";

  let items = [
    { value: "published", text: "Recently published" },
    { value: "updated", text: "Recently updated" },
    { value: "views", text: "Most views" },
    { value: "comments", text: "Most comments" },
  ];

  // Reactive state variable for the selected value
  let selectedValue = $state("updated"); 
</script>

<div class="govuk-body">
  <p>Selected value (bound): <code class="bg-gray-200 p-1 rounded">{selectedValue}</code></p>
</div>

<Select 
  id="sort-bind"
  name="sort-bind"
  label="Sort by (bind:value)"
  {items}
  bind:value={selectedValue} // Bind the value
/>
`;
