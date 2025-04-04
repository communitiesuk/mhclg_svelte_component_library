export const codeBlock1 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

<Header />`;

export const codeBlock2 = `
<script>
  import Header from "$lib/components/ui/Header.svelte";
</script>

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

<Header 
  fullWidthBorder={true}
  homepageUrl="https://www.example.gov.uk" 
/>`;
