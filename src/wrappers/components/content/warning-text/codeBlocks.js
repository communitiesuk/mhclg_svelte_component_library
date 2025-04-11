export const codeBlock1 = `
<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
</script>

<!-- Default WarningText -->
<WarningText />
`;

export const codeBlock2 = `
<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
</script>

<!-- Custom Text and Assistive Text -->
<WarningText
  assistiveText="Important Notice"
  text="Your application will be automatically saved, but any changes made in the last 5 minutes may be lost if you close your browser."
/>
`;

export const codeBlock3 = `
<script>
  import WarningText from "$lib/components/content/WarningText.svelte";

  // Snippet defined elsewhere or inline
  {#snippet WarningSnippet()}
    There is a high chance of delays. Check <a href="#" class="govuk-link">travel updates</a> before you leave.
  {/snippet}
</script>

<!-- Warning Text with Snippet -->
<WarningText text={WarningSnippet} />
`;
