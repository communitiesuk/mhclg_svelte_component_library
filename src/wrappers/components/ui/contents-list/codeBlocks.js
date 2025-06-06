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

// Standard Contents List
export const basicExample = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  contents={[
    { href: "#first-thing", text: "First thing" },
    { href: "#second-thing", text: "Second thing" },
    { href: "#third-thing", text: "Third thing" }
  ]}
/>`;

// With Bottom Margin
export const withBottomMargin = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  marginBottom={9}
  contents={[
    { href: "#first-thing", text: "First thing" },
    { href: "#second-thing", text: "Second thing" },
    { href: "#third-thing", text: "Third thing" }
  ]}
/>`;

// With Underlined Links
export const withUnderlinedLinks = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  underlineLinks={true}
  contents={[
    { href: "#first-thing", text: "Lorem & ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { href: "#second-thing", text: "Ut enim — ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { href: "#third-thing", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }
  ]}
/>`;

// With Long Text
export const withLongText = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  contents={[
    { href: "#first-thing", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { href: "#second-thing", text: "Another pretty long contents list entry, not as long as the first, but still a little." },
    { href: "#third-thing", text: "Third thing" }
  ]}
/>`;

// With Active Content Link
export const withActiveLink = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  contents={[
    { href: "#first-thing", text: "First thing" },
    { href: "#second-thing", text: "Second thing", active: true },
    { href: "#third-thing", text: "Third thing" }
  ]}
/>`;

// With Nested Contents List
export const withNestedList = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  contents={[
    { 
      href: "#first-thing", 
      text: "First thing",
      items: [
        { href: "#first-sub-item", text: "First sub-item" },
        { href: "#second-sub-item", text: "Second sub-item" }
      ]
    },
    { href: "#second-thing", text: "Second thing" },
    { href: "#third-thing", text: "Third thing" }
  ]}
/>`;

// With Formatted Numbers
export const withFormattedNumbers = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  formatNumbers={true}
  contents={[
    { href: "#", text: "1. Item" },
    { href: "#", text: "1.1 Sub item" },
    { href: "#", text: "1.2 Sub item" },
    { href: "#", text: "1.02 longer decimals allowed" },
    { href: "#", text: "1.021 even longer decimals ignored" },
    { href: "#", text: "1 Number without period" },
    { href: "#", text: "10. Two digit numbers" },
    { href: "#", text: "99. Two digit numbers" },
    { href: "#", text: "100. Three digit numbers" },
    { href: "#", text: "2017 four digit numbers ignored" },
    { href: "#", text: "2001: A space odyssey" }
  ]}
/>`;

// With Nested and Formatted Numbers
export const withNestedFormattedNumbers = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  formatNumbers={true}
  contents={[
    {
      href: "#first-thing",
      text: "1. First thing",
      items: [
        { href: "#second-thing", text: "2. Numbers not parsed" },
        { href: "#third-thing", text: "3. Numbers are just text" }
      ]
    },
    {
      href: "#first-thing",
      text: "2. Next thing",
      items: [
        { href: "#second-thing", text: "No numbers here" },
        { href: "#third-thing", text: "None here either", active: true }
      ]
    }
  ]}
/>`;

// With RTL Direction
export const withRtlDirection = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  dir="rtl"
  contents={[
    { href: "#section", text: "هل يمكنك تقديم" },
    { href: "#section-1", text: "أعد مستند" },
    { href: "#section-2", text: "تقديم الطلب" }
  ]}
/>`;

// With RTL and Nested Lists
export const withRtlNested = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  dir="rtl"
  contents={[
    { href: "#section", text: "هل يمكنك تقديم" },
    { href: "#section-1", text: "أعد مستند" },
    {
      href: "#section-2",
      text: "تقديم الطلب",
      items: [
        { href: "#section", text: "هل يمكنك تقديم" },
        { href: "#section-1", text: "أعد مستند" },
        { href: "#section-2", text: "تقديم الطلب" }
      ]
    }
  ]}
/>`;

// With Brand
export const withBrand = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  brand="prime-ministers-office-10-downing-street"
  formatNumbers={true}
  contents={[
    {
      href: "#first-thing",
      text: "1. First thing",
      items: [
        { href: "#second-thing", text: "2. Numbers not parsed" },
        { href: "#third-thing", text: "3. Numbers are just text" }
      ]
    }
  ]}
/>`;

// With Alternative Line Style
export const withAlternativeLineStyle = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  alternativeLineStyle={true}
  contents={[
    { href: "#first-thing", text: "First page title link" },
    { href: "#second-thing", text: "Second page title link" },
    { href: "#third-thing", text: "Third page title link", active: true },
    { href: "#fourth-thing", text: "Fourth page title link" },
    { href: "#fifth-thing", text: "Fifth page title link" }
  ]}
/>`;

// With Custom Title
export const withCustomTitle = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  title="An alternate title"
  contents={[
    { href: "#first-thing", text: "First page title link" },
    { href: "#second-thing", text: "Second page title link" },
    { href: "#third-thing", text: "Third page title link", active: true },
    { href: "#fourth-thing", text: "Fourth page title link" },
    { href: "#fifth-thing", text: "Fifth page title link" }
  ]}
/>`;

// Without GA4 Tracking
export const withoutGa4 = `
<script>
  import ContentsList from "$lib/components/ui/ContentsList.svelte";
</script>

<ContentsList
  disableGa4={true}
  contents={[
    {
      href: "https://www.gov.uk",
      text: "1. First thing",
      items: [
        { href: "#second-thing", text: "1. Nested Item" },
        { text: "2. Nested Item", active: true }
      ]
    },
    {
      href: "#first-thing",
      text: "2. Second thing",
      items: [
        { href: "#second-thing", text: "1. Nested Item" },
        { href: "https://www.gov.uk/browse", text: "2. Nested Item" }
      ]
    }
  ]}
/>`;
