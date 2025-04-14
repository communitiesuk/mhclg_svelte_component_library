  `},
  withBrand: `
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
            {
              href: "#second-thing",
              text: "2. Numbers not parsed"
            },
            {
              href: "#third-thing",
              text: "3. Numbers are just text"
            }
          ]
        }
      ]}
      brand="prime-ministers-office-10-downing-street"
    />
  `,
  withAlternativeLineStyle: `
// ... existing code ...
</rewritten_file> 