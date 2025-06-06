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

    <WarningText
      assistiveText="Warning"
      text="This service is in development and intended to be production-ready by Autumn 2025. In the meantime, we welcome developers to install the package and try it out."
    />

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

    <WarningText
      assistiveText="Warning"
      text="This package is currently privately published to the GitHub npm package registry. You'll need to authenticate before installation."
    />

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Step 1: Create a GitHub Personal Access Token
    </h3>

    <ol class="govuk-list govuk-list--number">
      <li>Log in to your GitHub account</li>
      <li>
        Navigate to <strong>Settings</strong> →
        <strong>Developer settings</strong>
        → <strong>Personal access tokens</strong>
      </li>
      <li>Click <strong>Generate new token</strong> (classic)</li>
      <li>Provide a descriptive name and set expiration if needed</li>
      <li>
        Select the following scopes:
        <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2">
          <li>
            <code>write:packages</code> - Upload packages to GitHub Package Registry
          </li>
          <li>
            <code>read:packages</code> - Download packages from GitHub Package Registry
          </li>
          <li><code>repo</code> - Repository access</li>
        </ul>
      </li>
      <li>Click <strong>Generate token</strong> and save it securely</li>
    </ol>

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Step 2: Configure npm registry
    </h3>

    <p class="govuk-body">
      Add the GitHub registry path to your <code>.npmrc</code> file:
    </p>

    <CodeBlock
      code={codeBlocks.npmrcConfig}
      language="bash"
      filename=""
      extension=".npmrc"
    />

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Step 3: Authenticate with npm
    </h3>

    <p class="govuk-body">Run the following command in your terminal:</p>

    <CodeBlock
      code={codeBlocks.npmLogin}
      language="bash"
      filename="Terminal"
      extension=""
      theme="github-dark"
    />

    <p class="govuk-body">
      Enter your GitHub username and use your Personal Access Token as the
      password.
    </p>

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Step 4: Install the package
    </h3>

    <p class="govuk-body">
      Install the latest version of the component library:
    </p>

    <CodeBlock
      code={codeBlocks.npmInstall}
      language="bash"
      filename="Terminal"
      extension=""
      theme="github-dark"
    />

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Usage</h2>

    <InsetText>
      {#snippet content()}
        The component library includes all necessary CSS and JavaScript files.
        When you install the package, GOV.UK Frontend styles & assets as well as
        custom styles and assets are automatically included out of the box.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m govuk-!-margin-top-6">Importing components</h3>

    <p class="govuk-body">Import components in your Svelte files:</p>

    <CodeBlock
      code={codeBlocks.importComponents}
      language="javascript"
      filename="App"
      extension=".svelte"
    />

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
        Check the <a
          href="https://github.com/communitiesuk/oflog_svelte_component_library"
          class="govuk-link"
          rel="external">GitHub repository</a
        > for issues and documentation
      </li>
    </ul>

    <div class="govuk-!-margin-top-6">
      <InsetText>
        {#snippet content()}
          This is an alpha release. The API may change as we continue to develop
          and improve the library based on user feedback.
        {/snippet}
      </InsetText>
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
