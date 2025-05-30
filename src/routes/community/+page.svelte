<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
  import WarningText from "$lib/components/content/WarningText.svelte";
</script>

{#snippet ContributingSnippet()}
  <strong>Join our community:</strong> We're building this component library
  collaboratively with teams across government. Your expertise and feedback help
  us create better solutions for everyone.
  <a href="mailto:dataexplorerfeedback@communities.gov.uk" class="govuk-link"
    >Get in touch</a
  >
  to start contributing.
{/snippet}

<svelte:head>
  <title>Community - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Join the MHCLG Svelte Component Library community. Contribute components, share research, and help build better government services."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Community</h1>

    <p class="govuk-body-l">
      The MHCLG Svelte Component Library is built by and for the government
      community. We work together to create, test, and improve components and
      patterns that help teams build better digital services.
    </p>

    <WarningText
      text="This community section is currently being developed. Some pages may not be available yet, but we're working to add comprehensive guidance and resources."
    />

    <InsetText content={ContributingSnippet} />

    <h2 class="govuk-heading-l">What we're working on</h2>

    <p class="govuk-body">
      We're continuously developing new components and patterns based on real
      user needs across government. Our work is guided by research, user
      feedback, and the evolving requirements of digital government services.
    </p>

    <h3 class="govuk-heading-m">Current priorities</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Data visualisation components</strong> - Charts, graphs, and interactive
        data displays for government statistics and reporting
      </li>
      <li>
        <strong>Geographic and mapping components</strong> - Tools for displaying
        location-based data and services
      </li>
      <li>
        <strong>Advanced form patterns</strong> - Complex data entry workflows and
        validation patterns
      </li>
      <li>
        <strong>Accessibility enhancements</strong> - Ensuring all components meet
        WCAG 2.1 AA standards and work with assistive technologies
      </li>
      <li>
        <strong>Performance optimisation</strong> - Lightweight, fast-loading components
        for better user experience
      </li>
    </ul>

    <p class="govuk-body">
      <a href="/community/roadmap/" class="govuk-link"
        >View our detailed roadmap</a
      > to see what's planned and when.
    </p>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Ways to get involved</h2>

    <p class="govuk-body">
      There are many ways to contribute to the MHCLG Svelte Component Library,
      whether you're a designer, developer, user researcher, or content
      designer.
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_collaborators_rgw4.svg"
          alt="Illustration of people sharing knowledge and research findings"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 200px; height: 150px; object-fit: contain;"
        />
        <h3 class="govuk-heading-s">Share your research</h3>
        <p class="govuk-body-s">
          Help us understand user needs by sharing research findings, usability
          testing results, and user feedback from your services.
        </p>
        <p class="govuk-body-s">
          <a href="/community/share-findings/" class="govuk-link"
            >Share findings about your users</a
          >
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_approved-wireframe_odf4.svg"
          alt="Illustration of design feedback and proposing new solutions"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 200px; height: 150px; object-fit: contain;"
        />
        <h3 class="govuk-heading-s">Propose new solutions</h3>
        <p class="govuk-body-s">
          Suggest new components or patterns based on common problems you've
          encountered in your work.
        </p>
        <p class="govuk-body-s">
          <a href="/community/propose-component/" class="govuk-link"
            >Propose a component or pattern</a
          >
        </p>
      </div>
    </div>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_pull-request_zlsu.svg"
          alt="Illustration of pull requests and component development"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 200px; height: 150px; object-fit: contain;"
        />
        <h3 class="govuk-heading-s">Develop components</h3>
        <p class="govuk-body-s">
          Contribute code, help with testing, or improve existing components
          with new features and bug fixes.
        </p>
        <p class="govuk-body-s">
          <a href="/community/develop-component/" class="govuk-link"
            >Develop a component or pattern</a
          >
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_reviewed-docs_g0cg.svg"
          alt="Illustration of reviewing and improving documentation"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 200px; height: 150px; object-fit: contain;"
        />
        <h3 class="govuk-heading-s">Improve documentation</h3>
        <p class="govuk-body-s">
          Help make our guidance clearer by suggesting improvements to
          documentation and examples.
        </p>
        <p class="govuk-body-s">
          <a href="/community/propose-content-change/" class="govuk-link"
            >Propose a content change using GitHub</a
          >
        </p>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">How we work</h2>

    <p class="govuk-body">
      Our community operates on principles of openness, collaboration, and
      user-centred design. We believe in working in the open, sharing our
      processes, and learning from each other.
    </p>

    <h3 class="govuk-heading-m">Our approach</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>User research first</strong> - All components and patterns are based
        on real user needs and tested with actual users
      </li>
      <li>
        <strong>Accessibility by design</strong> - We build accessibility in from
        the start, not as an afterthought
      </li>
      <li>
        <strong>Iterative development</strong> - We release early, gather feedback,
        and continuously improve
      </li>
      <li>
        <strong>Cross-government collaboration</strong> - We work with teams across
        different departments and agencies
      </li>
      <li>
        <strong>Open source</strong> - All our code is open source and available
        for anyone to use and contribute to
      </li>
    </ul>

    <h3 class="govuk-heading-m">Learn more about our work</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a href="/community/team-approach/" class="govuk-link"
          >Our team and delivery approach</a
        > - How we're organised and how we work
      </li>
      <li>
        <a href="/community/projects/" class="govuk-link">Projects</a> - Current
        and completed projects
      </li>
      <li>
        <a href="/community/principles/" class="govuk-link"
          >Community principles</a
        > - The values that guide our work
      </li>
      <li>
        <a href="/community/contribution-approach/" class="govuk-link"
          >Contribution approach</a
        > - How we review and accept contributions
      </li>
      <li>
        <a href="/community/blog-posts/" class="govuk-link"
          >Blog posts, videos and podcasts</a
        > - Updates and insights from our team
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Get started</h2>

    <p class="govuk-body">
      Ready to get involved? Here are some good first steps:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Explore the library</strong> - Browse our
        <a href="/components/" class="govuk-link">components</a>
        and <a href="/patterns/" class="govuk-link">patterns</a> to see what's available
      </li>
      <li>
        <strong>Try it in your service</strong> - Follow our
        <a href="/get-started/" class="govuk-link">installation guide</a> to start
        using components in your project
      </li>
      <li>
        <strong>Share your feedback</strong> - Let us know how the components work
        for your users and what could be improved
      </li>
      <li>
        <strong>Join the conversation</strong> -
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link">Get in touch</a
        > to connect with other teams using the library
      </li>
    </ol>
  </div>
</div>
