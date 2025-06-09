<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title
    >Propose a content change using GitHub - MHCLG Svelte Component Library</title
  >
  <meta
    name="description"
    content="Learn how to propose changes to the MHCLG Svelte Component Library documentation and content using GitHub issues or pull requests."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Propose a content change using GitHub</h1>

    <p class="govuk-body-l">
      Help us improve the MHCLG Svelte Component Library documentation by
      proposing changes to our content, guidance, and examples. This page
      explains how to suggest improvements to the component library's
      documentation rather than the components themselves.
    </p>

    <p class="govuk-body">You can propose content changes in two ways:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Raise an issue</strong> - Report problems or suggest improvements
        for our team to review and implement
      </li>
      <li>
        <strong>Create a pull request</strong> - Make the changes yourself and submit
        them for review
      </li>
    </ul>

    <h2 class="govuk-heading-l">What counts as a content change?</h2>

    <p class="govuk-body">
      Content changes include improvements to the documentation, guidance, and
      examples in the component library. This covers:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Documentation improvements</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Fixing typos, grammar, or spelling errors</li>
          <li>Clarifying confusing explanations</li>
          <li>Adding missing information</li>
          <li>Improving page structure and navigation</li>
          <li>Updating outdated information</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Code examples and guidance</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Improving code examples for clarity</li>
          <li>Adding new usage examples</li>
          <li>Fixing broken links or references</li>
          <li>Enhancing accessibility guidance</li>
          <li>Adding implementation tips and best practices</li>
        </ul>
      </div>
    </div>

    <InsetText>
      {#snippet content()}
        If you want to suggest changes to component functionality, behaviour, or
        design, see our guidance on <a
          href="/community/propose-component"
          class="govuk-link">proposing a component or pattern</a
        >
        or
        <a href="/community/share-findings" class="govuk-link"
          >share findings about your users</a
        > instead.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Option 1: Raise an issue</h2>

    <p class="govuk-body">
      The easiest way to suggest a content change is to raise an issue on
      GitHub. This is ideal if you've spotted a problem but don't want to make
      the changes yourself.
    </p>

    <h3 class="govuk-heading-m">How to raise an issue</h3>

    <ol class="govuk-list govuk-list--number">
      <li>
        Go to our <a
          href="https://github.com/communitiesuk/mhclg_svelte_component_library/issues"
          class="govuk-link"
          rel="external">GitHub issues page</a
        >
      </li>
      <li>Click the "New issue" button</li>
      <li>Choose an appropriate issue template or create a blank issue</li>
      <li>Give your issue a clear, descriptive title</li>
      <li>Describe the problem or improvement you're suggesting in detail</li>
      <li>Include links to the specific pages that need changing</li>
      <li>Submit your issue</li>
    </ol>

    <!-- <h3 class="govuk-heading-m">What to include in your issue</h3>

    <p class="govuk-body">
      To help us understand and act on your suggestion, please include:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Page location</strong> - The URL or page title where the problem
        exists
      </li>
      <li>
        <strong>Current content</strong> - Quote or describe the existing content
        that needs changing
      </li>
      <li>
        <strong>Suggested improvement</strong> - Explain what should be changed and
        why
      </li>
      <li>
        <strong>Context</strong> - Help us understand why this change would be beneficial
      </li>
      <li>
        <strong>Screenshots</strong> - If relevant, include images to illustrate
        the problem
      </li>
    </ul>

    <h3 class="govuk-heading-m">Example issue</h3>

    <div class="govuk-inset-text">
      <p><strong>Title:</strong> Fix typo in Button component documentation</p>
      <p>
        <strong>Description:</strong> On the Button component page (/components/ui/button),
        there's a typo in the accessibility section. The text says "screan readers"
        but should say "screen readers".
      </p>
      <p>
        <strong>Location:</strong> /components/ui/button, accessibility guidance
        section, second paragraph
      </p>
      <p><strong>Suggested fix:</strong> Change "screan" to "screen"</p>
    </div> -->

    <h2 class="govuk-heading-l">Option 2: Create a pull request</h2>

    <p class="govuk-body">
      If you're comfortable using GitHub and want to make the changes yourself,
      you can create a pull request. This involves forking our repository,
      making your changes, and submitting them for review.
    </p>

    <h3 class="govuk-heading-m">Before you start</h3>

    <p class="govuk-body">You'll need:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>A GitHub account</li>
      <li>Basic knowledge of Git and GitHub</li>
      <li>Understanding of Svelte and SvelteKit (for code-related changes)</li>
      <li>A text editor or IDE for making changes</li>
    </ul>

    <WarningText
      text="Make sure you're familiar with our coding standards and contribution guidelines before making significant changes."
    />

    <h3 class="govuk-heading-m">Step-by-step process</h3>

    <h4 class="govuk-heading-s">1. Fork the repository</h4>

    <ol class="govuk-list govuk-list--number">
      <li>
        Go to our <a
          href="https://github.com/communitiesuk/mhclg_svelte_component_library"
          class="govuk-link"
          rel="external">main repository</a
        >
      </li>
      <li>Click the "Fork" button in the top-right corner</li>
      <li>
        Choose where to create the fork (your personal account or an
        organisation)
      </li>
      <li>Wait for GitHub to create your fork</li>
    </ol>

    <p class="govuk-body">
      For more detailed information about forking, see the <a
        href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks"
        class="govuk-link"
        rel="external">GitHub documentation about forks</a
      >.
    </p>

    <h4 class="govuk-heading-s">2. Clone your fork and make changes</h4>

    <ol class="govuk-list govuk-list--number">
      <li>Clone your fork to your local machine</li>
      <li>Create a new branch for your changes</li>
      <li>Make your content changes using your preferred editor</li>
      <li>Test your changes locally (if applicable)</li>
      <li>Commit your changes with a clear commit message</li>
      <li>Push your changes to your fork</li>
    </ol>

    <h4 class="govuk-heading-s">3. Create a pull request</h4>

    <ol class="govuk-list govuk-list--number">
      <li>Go to your fork on GitHub</li>
      <li>Click "Contribute" then "Open pull request"</li>
      <li>Choose the correct base and compare branches</li>
      <li>Write a clear title and description for your pull request</li>
      <li>Submit your pull request for review</li>
    </ol>

    <p class="govuk-body">
      For detailed instructions on creating pull requests from forks, see the <a
        href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork"
        class="govuk-link"
        rel="external"
        >GitHub documentation on creating pull requests from forks</a
      >.
    </p>

    <h3 class="govuk-heading-m">Pull request best practices</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Keep changes focused</strong> - One pull request should address one
        specific issue or improvement
      </li>
      <li>
        <strong>Write clear commit messages</strong> - Explain what you changed and
        why
      </li>
      <li>
        <strong>Test your changes</strong> - Make sure the site still works correctly
        after your changes
      </li>
      <li>
        <strong>Follow our style</strong> - Match the existing writing style and
        formatting
      </li>
      <li>
        <strong>Include context</strong> - Explain why the change is needed in your
        pull request description
      </li>
    </ul>

    <!-- <h2 class="govuk-heading-l">Types of content changes we welcome</h2>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Quick fixes</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Typos and spelling errors</li>
          <li>Grammar corrections</li>
          <li>Broken links</li>
          <li>Formatting issues</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Content improvements</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Clearer explanations</li>
          <li>Additional examples</li>
          <li>Better code samples</li>
          <li>Updated guidance</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Structural changes</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Page reorganisation</li>
          <li>Navigation improvements</li>
          <li>New documentation sections</li>
          <li>Accessibility enhancements</li>
        </ul>
      </div>
    </div> -->

    <h2 class="govuk-heading-l">What happens next?</h2>

    <p class="govuk-body">
      After you submit an issue or pull request, here's what typically happens:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>Our team reviews your submission</li>
      <li>We may ask questions or request clarification</li>
      <li>
        For pull requests, we'll review the changes and may suggest
        modifications
      </li>
      <li>
        Once approved, we'll merge your changes or implement your suggestions
      </li>
      <li>
        Your changes will appear in the next release of the component library
      </li>
    </ol>

    <InsetText>
      {#snippet content()}
        We appreciate all contributions to improve our documentation. Even small
        fixes like correcting typos help make the component library better for
        everyone.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Need help?</h2>

    <p class="govuk-body">
      If you're unsure about how to propose a content change or need help with
      GitHub, you can:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link">Email our team</a
        > for guidance
      </li>
      <li>
        Ask questions in our <a
          href="https://github.com/communitiesuk/mhclg_svelte_component_library/discussions"
          class="govuk-link"
          rel="external">GitHub discussions</a
        >
      </li>
      <li>
        Check the <a
          href="https://docs.github.com/en"
          class="govuk-link"
          rel="external">GitHub documentation</a
        > for help with Git and GitHub
      </li>
    </ul>

    <p class="govuk-body">
      We're here to help and welcome contributions from developers of all
      experience levels.
    </p>

    <RelatedContent
      sections={[
        {
          type: "main",
          id: "related-content",
          title: "Related content",
          links: [
            {
              title: "Propose a component or pattern",
              base_path: "/community/propose-component",
            },
            {
              title: "Develop a component or pattern",
              base_path: "/community/develop-component",
            },
            {
              title: "Share findings about your users",
              base_path: "/community/share-findings",
            },
          ],
        },
        {
          type: "subheading",
          id: "contribution-guidance",
          subheading: "Contribution guidance",
          links: [
            {
              title: "Contribution criteria",
              base_path: "/community/contribution-criteria",
            },
            {
              title: "Our team and delivery approach",
              base_path: "/community/team-approach",
            },
          ],
        },
        {
          type: "other",
          id: "external-resources",
          subheading: "External resources",
          links: [
            {
              title: "GitHub issues",
              url: "https://github.com/communitiesuk/mhclg_svelte_component_library/issues",
            },
            {
              title: "GitHub discussions",
              url: "https://github.com/communitiesuk/mhclg_svelte_component_library/discussions",
            },
            {
              title: "About forks - GitHub Docs",
              url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks",
            },
            {
              title: "Creating a pull request from a fork",
              url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork",
            },
          ],
        },
      ]}
    />
  </div>
</div>
