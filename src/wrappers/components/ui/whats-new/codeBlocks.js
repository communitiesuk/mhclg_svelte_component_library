export const codeBlock1 = `
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
</script>

<!-- Basic usage with default content -->
<WhatsNew />
`;

export const codeBlock2 = `
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
</script>

<!-- Custom title and simple news items -->
<WhatsNew
  title="Latest Updates"
  titleId="updates"
  newsItems={[
    {
      date: "March 2025",
      content: "We've improved the performance of our data visualization components by 40%."
    },
    {
      date: "February 2025", 
      content: "New accessibility features have been added to all form components."
    }
  ]}
/>
`;

export const codeBlock3 = `
<script>
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";
</script>

<!-- Complex news items with release notes and component links -->
<WhatsNew
  title="Component Library Updates"
  titleId="component-updates"
  componentLinksIntroText="This release includes updates to the following components:"
  newsItems={[
    {
      date: "April 2025",
      content: "Released version 2.1.0 with enhanced chart components and improved TypeScript support.",
      releaseNotesUrl: "https://github.com/example/releases/tag/v2.1.0",
      releaseVersion: "v2.1.0",
      componentLinks: [
        { text: "Line Chart component", href: "/components/charts/line-chart" },
        { text: "Bar Chart component", href: "/components/charts/bar-chart" },
        { text: "Data Table component", href: "/components/ui/data-table" }
      ]
    },
    {
      date: "March 2025",
      content: "Minor bug fixes and accessibility improvements across all components.",
      releaseNotesUrl: "https://github.com/example/releases/tag/v2.0.1", 
      releaseVersion: "v2.0.1"
    }
  ]}
/>
`;
