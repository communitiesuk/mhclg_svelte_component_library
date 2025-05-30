<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
  import WarningText from "$lib/components/content/WarningText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
  import type { RelatedContentSection } from "$lib/components/ui/RelatedContent.svelte";

  const relatedSections: RelatedContentSection[] = [
    {
      type: "main",
      id: "related-main",
      title: "Related",
      links: [
        { title: "Browse components", base_path: "/components/" },
        { title: "Get started guide", base_path: "/get-started/" },
        {
          title: "About & Benefits",
          base_path: "/get-started/about-benefits/",
        },
        { title: "Community", base_path: "/community/" },
      ],
    },
  ];
</script>

{#snippet WarningSnippet()}
  Patterns are currently in development. Check back soon for proven design
  solutions for government services.
{/snippet}

{#snippet ContributingSnippet()}
  <strong>Contributing patterns:</strong> If you have a proven design solution
  that could benefit other government teams, we'd love to hear from you.
  <a href="/community/" class="govuk-link">Get in touch with our community</a>
  to discuss contributing patterns to the library.
{/snippet}

<svelte:head>
  <title>Patterns - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Design patterns for common user tasks in government services using the MHCLG Svelte Component Library."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Patterns</h1>

    <p class="govuk-body-l">
      Patterns are reusable solutions to common design problems. They show how
      to combine components and content to help users complete specific tasks.
    </p>

    <WarningText text={WarningSnippet} />

    <h2 class="govuk-heading-l">What are patterns?</h2>

    <p class="govuk-body">
      Patterns are best practice design solutions for specific user-focused
      tasks and page types. They combine components, content design principles,
      and interaction design to solve common problems in government services.
    </p>

    <p class="govuk-body">
      Unlike components, which are individual interface elements, patterns show
      how to use multiple components together to create complete user journeys
      and workflows.
    </p>

    <h3 class="govuk-heading-m">Examples of patterns include:</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Form validation</strong> - How to validate user input and show error
        messages effectively
      </li>
      <li>
        <strong>Data entry workflows</strong> - Step-by-step processes for collecting
        complex information
      </li>
      <li>
        <strong>Dashboard layouts</strong> - Organising data visualisations and key
        metrics for different user needs
      </li>
      <li>
        <strong>Search and filtering</strong> - Helping users find and refine large
        datasets
      </li>
      <li>
        <strong>Progressive disclosure</strong> - Revealing information gradually
        to avoid overwhelming users
      </li>
      <li>
        <strong>Data export and sharing</strong> - Allowing users to download or
        share data in various formats
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Patterns for data-rich services
    </h2>

    <p class="govuk-body">
      The MHCLG Svelte Component Library will focus on patterns specifically
      designed for data-rich government services, including:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Data presentation patterns</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Interactive charts and graphs</li>
          <li>Data tables with sorting and filtering</li>
          <li>Geographic data visualisation</li>
          <li>Real-time data displays</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">User interaction patterns</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Data exploration workflows</li>
          <li>Comparison and analysis tools</li>
          <li>Collaborative data annotation</li>
          <li>Accessibility-first data interaction</li>
        </ul>
      </div>
    </div>

    <InsetText content={ContributingSnippet} />

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Using patterns with components
    </h2>

    <p class="govuk-body">
      Patterns will show you how to combine our
      <a href="/components/" class="govuk-link">Svelte components</a> with content
      design and interaction principles to create effective user experiences.
    </p>

    <p class="govuk-body">Each pattern will include:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>When to use</strong> - Specific scenarios where the pattern is most
        effective
      </li>
      <li>
        <strong>How it works</strong> - Step-by-step guidance on implementing the
        pattern
      </li>
      <li>
        <strong>Code examples</strong> - Working Svelte implementations you can copy
        and adapt
      </li>
      <li>
        <strong>Accessibility considerations</strong> - How to ensure the pattern
        works for all users
      </li>
      <li>
        <strong>Research insights</strong> - Evidence and user research supporting
        the pattern
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Stay updated</h2>

    <p class="govuk-body">
      We're actively developing patterns based on real user needs and research
      from across government. Follow our progress and get notified when new
      patterns are released:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a href="/community/" class="govuk-link">Join our community</a> for updates
        and discussions
      </li>
      <li>
        Check our
        <a href="/community/roadmap/" class="govuk-link">roadmap</a> to see what
        patterns are planned
      </li>
      <li>
        Follow our
        <a href="/" class="govuk-link">What's new</a> section for the latest releases
      </li>
    </ul>
  </div>

  <div class="govuk-grid-column-one-third">
    <RelatedContent sections={relatedSections} />
  </div>
</div>
