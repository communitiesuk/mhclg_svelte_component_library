<script>
  import Details from "$lib/components/ui/Details.svelte";
  import ComponentDetails from "$lib/package-wrapping/ComponentDetails.svelte";

  let { homepage = undefined } = $props();

  let details = {
    status: "in_progress",
    description: [
      {
        content: "Allows the user to see more information.",
      },
      {
        content:
          'Based on the <a href="https://design-system.service.gov.uk/components/details/" target="_blank" rel="noopener noreferrer">GOV.UK Design System checkbox component</a> pattern.',
        markdown: true,
      },
    ],
    context: [
      {
        content:
          "Use the details component to make a page easier to scan when it contains information that only some users will need.",
      },
      {
        content:
          "Do not use the details component to hide information that the majority of your users will need.",
      },
    ],
    childComponents: undefined,
    requirements: undefined,
  };
</script>

<ComponentDetails {homepage} {details} />

<Details></Details>
