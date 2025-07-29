export const codeBlock1 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header />`;

export const codeBlock2 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<!-- Note: This prop is only relevant when the govuk-template--rebranded class is NOT applied to the body. The rebrand makes the full-width border the default style. -->
<Header fullWidthBorder={true} />`;

export const codeBlock3 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header homepageUrl="https://www.example.gov.uk" />`;

export const codeBlock4 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<!-- Note: The fullWidthBorder prop is only relevant when the govuk-template--rebranded class is NOT applied to the body. The rebrand makes the full-width border the default style. -->
<Header 
  fullWidthBorder={true}
  homepageUrl="https://www.example.gov.uk" 
/>`;
