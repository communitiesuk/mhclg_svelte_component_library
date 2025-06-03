<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Develop a component or pattern - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn how to develop a component or pattern for the MHCLG Svelte Component Library, including our collaborative development process and technical requirements."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Develop a component or pattern</h1>

    <p class="govuk-body-l">
      Our team focuses on developing prioritised components and patterns with
      the community. However, anyone can choose to work on something from our
      community backlog or GitHub discussions.
    </p>

    <WarningText
      assistiveText="Important"
      text="Before starting development, make sure the component or pattern has been proposed and meets our Stage 1 contribution criteria."
    />

    <h2 class="govuk-heading-l">Before you start developing</h2>

    <p class="govuk-body">
      Development work should only begin after a component or pattern has been
      proposed and accepted. Make sure you understand what's required:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>The proposal has been reviewed and moved to "In progress" status</li>
      <li>
        You understand our <a
          href="/community/contribution-criteria"
          class="govuk-link">Stage 2 contribution criteria</a
        >
      </li>
      <li>
        You're familiar with our <a
          href="/get-started/component-statuses"
          class="govuk-link">component status system</a
        >
      </li>
      <li>You have the time and resources to complete the development work</li>
    </ul>

    <InsetText>
      {#snippet content()}
        If you want to work on something that hasn't been proposed yet, start by
        <a href="/community/propose-component" class="govuk-link"
          >proposing a component or pattern</a
        > first.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Step 1: Get in touch with our team</h2>

    <p class="govuk-body">
      Before you start any development work, contact our team to arrange a
      kick-off meeting:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Email us</strong> at
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link"
        >
          dataexplorerfeedback@communities.gov.uk
        </a>
      </li>
      <li>
        <strong>Join the GitHub discussion</strong> for the component you want to
        work on
      </li>
      <!-- <li>
        <strong>Mention your interest</strong> in our community channels
      </li> -->
    </ul>

    <h3 class="govuk-heading-m">What happens in the kick-off meeting</h3>

    <p class="govuk-body">
      During the kick-off meeting, our team will help you:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <!-- <li>
        <strong>Agree the scope</strong> - Define exactly what the component should
        and shouldn't do
      </li> -->
      <li>
        <strong>Plan the work</strong> - Identify what design, content, code, and
        guidance needs developing
      </li>
      <li>
        <strong>Set timelines</strong> - Agree realistic milestones and deadlines
      </li>
      <li>
        <strong>Discuss support</strong> - Identify what help you might need from
        our team
      </li>
      <li>
        <strong>Assign a contact</strong> - You'll get a dedicated contact person
        from our team
      </li>
      <li>
        <strong>Set up regular check-ins</strong> - Schedule catch-ups to track progress
      </li>
    </ul>

    <p class="govuk-body">
      If you're happy to proceed, we'll assign you to the GitHub issue as a
      contributor and update the component status.
    </p>

    <h2 class="govuk-heading-l">
      Step 2: Research and develop your contribution
    </h2>

    <p class="govuk-body">
      During development, your component or pattern must meet our
      <a href="/community/contribution-criteria" class="govuk-link"
        >Stage 2 contribution criteria</a
      >. Focus on these key development principles:
    </p>

    <h3 class="govuk-heading-m">Work with the community</h3>

    <p class="govuk-body">
      Involve people from the government design community throughout your
      development:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Share early designs</strong> - Get feedback on concepts and wireframes
      </li>
      <li>
        <strong>Collaborate on research</strong> - Find teams who can help test with
        real users
      </li>
      <li>
        <strong>Get technical input</strong> - Work with other developers on implementation
        approaches
      </li>
      <li>
        <strong>Test across services</strong> - Validate that your component works
        in different contexts
      </li>
    </ul>

    <h3 class="govuk-heading-m">Follow our standards</h3>

    <p class="govuk-body">
      Your contribution must meet all requirements outlined in our contribution
      criteria:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong
          ><a
            href="/community/contribution-criteria#technical-requirements"
            class="govuk-link">Technical requirements</a
          ></strong
        > - Svelte 5, TypeScript, accessibility, performance, and testing standards
      </li>
      <li>
        <strong
          ><a
            href="/community/contribution-criteria#data-visualisation-criteria"
            class="govuk-link">Data visualisation criteria</a
          ></strong
        > - Additional requirements for charts, maps, and data components
      </li>
      <li>
        <strong>Stage 2 essential criteria</strong> - Usable, Accessible, Consistent,
        and Versatile requirements
      </li>
    </ul>

    <InsetText>
      {#snippet content()}
        <strong>Detailed requirements:</strong> For comprehensive technical
        standards, testing requirements, and quality criteria, see our
        <a href="/community/contribution-criteria" class="govuk-link"
          >contribution criteria page</a
        >.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m">Types of development work</h3>

    <p class="govuk-body">
      Depending on the component or pattern, development work might include:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Design work</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>User journey mapping</li>
          <li>Wireframing and prototyping</li>
          <li>Visual design and styling</li>
          <li>Interaction design</li>
          <li>Responsive design considerations</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Development work</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Svelte component implementation</li>
          <li>TypeScript type definitions</li>
          <li>CSS styling and theming</li>
          <li>Unit and integration testing</li>
          <li>Performance optimisation</li>
        </ul>
      </div>
    </div>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Research work</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>User needs validation</li>
          <li>Usability testing</li>
          <li>Accessibility testing</li>
          <li>Cross-service validation</li>
          <li>Performance testing</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Documentation work</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Usage guidance and examples</li>
          <li>API documentation</li>
          <li>Accessibility guidance</li>
          <li>Implementation notes</li>
          <li>Research findings summary</li>
        </ul>
      </div>
    </div>

    <h3 class="govuk-heading-m">Development approach</h3>

    <p class="govuk-body">We recommend an iterative approach to development:</p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Start with research</strong> - Look at existing solutions
      </li>
      <li>
        <strong>Create early prototypes</strong> - Build basic functionality to test
        concepts
      </li>
      <li>
        <strong>Test early and often</strong> - Get feedback from users and the community
      </li>
      <li>
        <strong>Iterate based on feedback</strong> - Refine your approach based on
        testing results
      </li>
      <li>
        <strong>Polish for production</strong> - Ensure all criteria are met before
        final review
      </li>
    </ol>

    <h2 class="govuk-heading-l">Step 3: Regular check-ins and support</h2>

    <p class="govuk-body">
      Throughout development, our team provides ongoing support:
    </p>

    <h3 class="govuk-heading-m">Catch-ups</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Review progress against milestones</li>
      <li>Discuss any blockers or challenges</li>
      <li>Get feedback on work in progress</li>
      <li>Adjust timelines if needed</li>
      <li>Connect with relevant expertise</li>
    </ul>

    <h3 class="govuk-heading-m">Design and technical reviews</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Early design concept reviews</li>
      <li>Code architecture discussions</li>
      <li>Accessibility guidance and testing</li>
      <li>Performance optimisation advice</li>
      <li>Documentation and guidance review</li>
    </ul>

    <h2 class="govuk-heading-l">Step 4: Prepare for final review</h2>

    <p class="govuk-body">
      Before your component can achieve "Baseline completed" status, it must
      pass our comprehensive Stage 2 review:
    </p>

    <h3 class="govuk-heading-m">What you'll need to provide</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Working component</strong> - Fully functional code that meets our
        technical standards
      </li>
      <li>
        <strong>Comprehensive documentation</strong> - Usage guidance, API documentation,
        and examples
      </li>
      <!-- <li>
        <strong>User research evidence</strong> - Testing results showing the component
        works for users
      </li> -->
      <!-- <li>
        <strong>Accessibility testing results</strong> - Evidence of WCAG 2.1 AA
        compliance
      </li> -->
      <!-- <li>
        <strong>Cross-browser testing</strong> - Verification that it works across
        supported browsers and devices
      </li> -->
      <!-- <li>
        <strong>Performance benchmarks</strong> - Evidence that it meets our performance
        standards
      </li> -->
    </ul>

    <h3 class="govuk-heading-m">The review process</h3>
    <p class="govuk-body">
      Our Stage 2 review typically takes 4-6 weeks and includes:
    </p>
    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Technical review</strong> - Code quality, performance, and standards
        compliance
      </li>
      <li>
        <strong>Design review</strong> - Consistency, usability, and design principles
        alignment
      </li>
      <li>
        <strong>Accessibility review</strong> - Comprehensive accessibility testing
        and evaluation
      </li>
      <li>
        <strong>Usability validation</strong> - Review of user research evidence
      </li>
      <li>
        <strong>Versatility assessment</strong> - Testing across different contexts
        and use cases
      </li>
      <li>
        <strong>Documentation review</strong> - Ensuring all guidance and examples
        meet our standards
      </li>
      <li>
        <strong>Final decision</strong> - Approval for "Baseline completed" or "In
        use" status
      </li>
    </ol>

    <InsetText>
      {#snippet content()}
        <strong>Collaborative approach:</strong> If your component doesn't initially
        meet all criteria, we'll work with you to address any issues rather than
        rejecting it outright. Our goal is to help every contribution reach its full
        potential.
      {/snippet}
    </InsetText>



    <h2 class="govuk-heading-l">Get help and support</h2>

    <p class="govuk-body">
      We're here to support you throughout the development process:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Technical guidance</strong> - Our developers can help with Svelte,
        TypeScript, and accessibility implementation
      </li>
      <li>
        <strong>Design support</strong> - Our designers can provide feedback on user
        experience and visual design
      </li>
      <li>
        <strong>Research assistance</strong> - Our user researchers can help plan
        and conduct usability testing
      </li>
      <li>
        <strong>Community connections</strong> - We can connect you with other teams
        working on similar problems
      </li>
      <li>
        <strong>Resource sharing</strong> - Access to our design tools, testing environments,
        and documentation templates
      </li>
    </ul>

    <p class="govuk-body">
      Don't hesitate to reach out early and often. We'd rather provide guidance
      upfront than have to request changes later in the process.
    </p>

    <h2 class="govuk-heading-l">After your component is published</h2>

    <p class="govuk-body">
      Once your component achieves "Baseline completed" or "In use" status:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Shared ownership</strong> - Our team takes responsibility for ongoing
        maintenance
      </li>
      <li>
        <strong>Version updates</strong> - We'll ensure it works with new versions
        of Svelte and dependencies
      </li>
      <li>
        <strong>Bug fixes</strong> - Issues will be addressed as part of regular
        maintenance
      </li>
      <li>
        <strong>Enhancement requests</strong> - Future improvements will be considered
        based on user feedback
      </li>
      <li>
        <strong>Recognition</strong> - You'll be credited as a contributor in our
        documentation and release notes
      </li>
    </ul>
  </div>

  <div class="govuk-grid-column-one-third">
    <RelatedContent
      sections={[
        {
          type: "main",
          id: "related-content",
          title: "Related content",
          links: [
            {
              title: "Contribution criteria",
              base_path: "/community/contribution-criteria",
            },
            {
              title: "Propose a component or pattern",
              base_path: "/community/propose-component",
            },
            {
              title: "Component statuses",
              base_path: "/get-started/component-statuses",
            },
          ],
        },
        {
          type: "subheading",
          id: "technical-guidance",
          subheading: "Technical guidance",
          links: [
            {
              title: "Installation and usage",
              base_path: "/get-started",
            },
            {
              title: "About & Benefits",
              base_path: "/get-started/about-benefits",
            },
            {
              title: "Our team approach",
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
              title: "GOV.UK Design System development guide",
              url: "https://design-system.service.gov.uk/community/develop-a-component-or-pattern/",
            },
            {
              title: "Svelte 5 documentation",
              url: "https://svelte.dev/docs/svelte/overview",
            },
            {
              title: "WCAG 2.1 AA guidelines",
              url: "https://www.w3.org/WAI/WCAG21/AA/",
            },
          ],
        },
      ]}
    />
  </div>
</div>
