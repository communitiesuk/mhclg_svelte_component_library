<script lang="ts">
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import * as codeBlocks from "./codeBlocks.js";
</script>

<svelte:head>
  <title>Get started - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn how to install and use the MHCLG Svelte Component Library in your projects."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Get started</h1>

    <p class="govuk-body-l">
      Learn how to install and use the MHCLG Svelte Component Library in your
      SvelteKit projects.
    </p>

    <InsetText>
      {#snippet content()}
        This guide assumes you already have a SvelteKit project set up. If you
        need to create a new SvelteKit project, follow the official SvelteKit
        documentation at <a
          href="https://svelte.dev/docs/kit/creating-a-project"
          class="govuk-link"
          rel="external">svelte.dev/docs/kit/creating-a-project</a
        >
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Installation</h2>

    <p class="govuk-body">
      The component library is publicly available on npm, making installation
      straightforward:
    </p>

    <CodeBlock
      code={codeBlocks.npmInstall}
      language="bash"
      filename="Terminal"
      extension=""
      theme="github-dark"
    />

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Usage</h2>

    <p class="govuk-body">
      The component library includes all necessary CSS and JavaScript files.
      When you install the package, GOV.UK Frontend styles & assets as well as
      custom styles and assets are automatically included out of the box.
    </p>

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Enable GOV.UK Frontend styles
    </h3>

    <p class="govuk-body">
      Add this script tag to your <code>app.html</code> file in the body section.
      This is required because the GOV.UK Frontend CSS that ships with our component
      library checks the document body for JavaScript availability to progressively
      enhance components.
    </p>

    <InsetText>
      {#snippet content()}
        We are working on scoping this JavaScript check within individual
        components, so this script requirement will be removed in a future
        version of the library.
      {/snippet}
    </InsetText>

    <CodeBlock
      code={codeBlocks.enableGovukStyles}
      language="html"
      filename="app"
      extension=".html"
    />

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Enable GOV.UK Rebranded Styles (Optional)
    </h3>

    <p class="govuk-body">
      To use the refreshed GOV.UK brand (launched June 2025), add the <code
        >govuk-template--rebranded</code
      >
      class to your <code>app.html</code> body element:
    </p>

    <CodeBlock
      code={codeBlocks.enableRebrandStyles}
      language="html"
      filename="app"
      extension=".html"
    />

    <p class="govuk-body">
      <strong>The rebrand implementation works in two parts:</strong>
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Global CSS styles:</strong> The
        <code>govuk-template--rebranded</code> class automatically applies rebranded
        colors, typography, and spacing to all components
      </li>
      <li>
        <strong>Component markup:</strong> Some components (like Footer and
        Header) have a <code>rebrand</code> prop that controls additional rebranded
        elements like the crown logo. The rebrand prop is set to true by default on all 
        relavent componets - you can specify false should you want to keep the old markup and assets.
      </li>
    </ul>

    <h4 class="govuk-heading-s govuk-!-margin-top-4">Basic rebrand usage</h4>

    <CodeBlock
      code={codeBlocks.rebrandComponentExample}
      language="javascript"
      filename="App"
      extension=".svelte"
    />

    <h3 class="govuk-heading-m govuk-!-margin-top-6">Importing components</h3>

    <p class="govuk-body">Import components in your Svelte files:</p>

    <CodeBlock
      code={codeBlocks.importComponents}
      language="javascript"
      filename="App"
      extension=".svelte"
    />

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Next steps</h2>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a href="/components" class="govuk-link">Browse our components</a> to see
        what's available
      </li>
      <li>
        <a href="/patterns" class="govuk-link">Explore patterns</a> for common design
        solutions
      </li>
      <li>
        <a href="/community" class="govuk-link">Join the community</a> to contribute
        and get support
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Support</h2>

    <p class="govuk-body">If you need help or have questions:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a href="/get-in-touch" class="govuk-link">Contact the team</a> for support
      </li>
      <li>
        Check the <a
          href="https://github.com/communitiesuk/oflog_svelte_component_library"
          class="govuk-link"
          rel="external">GitHub repository</a
        > for issues and documentation
      </li>
      <li>
        Review the <a href="/community/roadmap" class="govuk-link">roadmap</a> to
        see what's planned
      </li>
    </ul>

    <div class="govuk-!-margin-top-6">
      <WarningText
        text="This is an alpha release. The API may change as we continue to develop
        and improve the library based on user feedback."
      />
    </div>

    <div class="govuk-!-margin-top-8">
      <RelatedContent
        sections={[
          {
            type: "main",
            id: "related-content",
            title: "Related content",
            links: [
              {
                title: "Svelte documentation",
                url: "https://svelte.dev/docs",
              },
            ],
          },
        ]}
      />
    </div>
  </div>
</div>

<style>
  code {
    background-color: #f3f2f1;
    padding: 2px 4px;
    font-family:
      "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 14px;
  }
</style>
