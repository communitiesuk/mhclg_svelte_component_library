export const codeBlock1 = `
<script>
  import InsetText from "$lib/components/content/InsetText.svelte";
</script>

<!-- Default InsetText -->
<InsetText />
`;

export const codeBlock2 = `
<script>
  import InsetText from "$lib/components/content/InsetText.svelte";
</script>

<!-- Custom String Content -->
<InsetText
  content="You will need your National Insurance number and proof of identity."
/>
`;

export const codeBlock3 = `
<script>
  import InsetText from "$lib/components/content/InsetText.svelte";

  // Snippet defined elsewhere or inline
  {#snippet SnippetContent()}
    You can <a href="#" class="govuk-link">get help with your application</a> if you need it.
  {/snippet}
</script>

<!-- Content with Snippet -->
<InsetText content={SnippetContent} />
`;
