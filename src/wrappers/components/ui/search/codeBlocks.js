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

export const defaultValue = `
<Search value="driving licence" />
`;

export const inlineLabelFalse = `
<Search inline_label={false} />
`;

export const onGovukBlue = `
<div class="p-8 bg-[#1d70b8]"> {/* Blue background for context */}
  <Search on_govuk_blue={true} />
</div>
`;

export const homepage = `
<div class="p-8 bg-[#1d70b8]"> {/* Blue background for context */}
  <Search
    label_text="Search"
    inline_label={false}
    on_govuk_blue={true}
    label_size="s"
    label_margin_bottom={3}
    homepage={true}
    size="large"
  />
</div>
`;

export const customLabelText = `
<Search label_text="Search" />
`;

export const customLabelId = `
<Search label_id="my_unique_id" />
`;

export const largeSize = `
<Search size="large" />
`;

export const customName = `
<Search name="my_own_fieldname" />
`;

export const withAriaControls = `
<Search aria_controls="wrapper" />
`;

export const customButtonText = `
<Search button_text="Search absolutely everywhere" />
`;

export const withLabelSize = `
<Search label_size="xl" />
`;

export const wrapLabelInHeading = `
<Search wrap_label_in_a_heading={true} heading_level={1} />
`;

export const withMarginBottom = `
<Search margin_bottom={9} />
`;

export const withLabelMarginBottom = `
<Search label_margin_bottom={9} inline_label={false} />
`;

export const withCustomLabelClass = `
<Search label_custom_class="govuk-heading-xl" inline_label={false} />
`;

export const disableCorrections = `
<Search disable_corrections={true} />
`;

export const customButtonColor = `
<Search button_background_color="#00625e" />
`;

export const hintAndWidth = `
<Search 
  hint="Enter your full name"
  input_width="two-thirds"
  inline_label={false}
/>
`;

// Code block for bind:value example
export const codeBlockBinding = `
<script lang="ts">
  import Search from '$lib/components/ui/Search.svelte';

  let demoSearchValue = $state("initial value"); 
</script>

<Search
  label_text="Search with bound value"
  bind:value={demoSearchValue}
/>

<p class="govuk-body mt-4">Current bound value: <strong>{demoSearchValue}</strong></p>

`;
