<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Propose a component or pattern - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn how to propose a new component or pattern for the MHCLG Svelte Component Library, including what evidence you need and how the process works."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Propose a component or pattern</h1>

    <p class="govuk-body-l">
      Anyone can propose a new component or pattern for the MHCLG Svelte
      Component Library. Proposals need to show that the component or pattern
      would meet our Stage 1 contribution criteria.
    </p>

    <WarningText
      assistiveText="Important"
      text="Before proposing something new, check if it already exists in our component library or if someone else has already suggested something similar."
    />

    <h2 class="govuk-heading-l">Before you start</h2>

    <p class="govuk-body">
      Make sure your proposal will meet our essential criteria for new
      components and patterns:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Useful</strong> - Solves a real user problem with evidence from multiple
        services
      </li>
      <li>
        <strong>Unique</strong> - Doesn't duplicate existing functionality in our
        library
      </li>
    </ul>

    <p class="govuk-body">
      <a href="/community/contribution-criteria" class="govuk-link">
        Read our full contribution criteria
      </a> to understand what's needed at each stage.
    </p>

    <h2 class="govuk-heading-l">
      Step 1: Check existing components and discussions
    </h2>

    <p class="govuk-body">
      Before proposing something new, check if it already exists or has been
      suggested:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Browse our component library</strong> - Check if we already have
        something similar in our
        <a href="/components" class="govuk-link">components section</a>
      </li>
      <li>
        <strong>Check GitHub discussions</strong> - Look through our
        <a
          href="https://github.com/your-org/component-library/discussions"
          class="govuk-link">GitHub discussions</a
        >
        to see if someone has already suggested your idea
      </li>
      <li>
        <strong>Review our roadmap</strong> - See what's already planned in our
        <a href="/community/roadmap" class="govuk-link">roadmap</a>
      </li>
    </ol>

    <InsetText>
      {#snippet content()}
        If you find something similar already exists or has been proposed, join
        the existing discussion rather than creating a new proposal. Share your
        use case and any additional evidence you have.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Step 2: Gather your evidence</h2>

    <p class="govuk-body">
      To propose a component or pattern, you'll need to provide evidence that it
      meets our Stage 1 criteria:
    </p>

    <h3 class="govuk-heading-m">Evidence of user need</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>User research findings showing the problem you're trying to solve</li>
      <li>
        Evidence that multiple teams or services would benefit from this
        component
      </li>
      <li>Examples of where similar solutions have been used successfully</li>
      <li>
        Screenshots or links to existing implementations (even if imperfect)
      </li>
    </ul>

    <h3 class="govuk-heading-m">Evidence of uniqueness</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Explanation of why existing components don't solve the problem</li>
      <li>Clear description of what makes your proposal different</li>
      <li>Comparison with similar components in other design systems</li>
    </ul>

    <h3 class="govuk-heading-m">What you don't need at this stage</h3>
    <p class="govuk-body">At the proposal stage, you don't need to provide:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Detailed designs or prototypes</li>
      <li>Working code implementations</li>
      <li>Comprehensive accessibility testing</li>
      <li>Full user research studies</li>
    </ul>

    <p class="govuk-body">
      Focus on presenting your idea and evidence of need. Detailed development
      work comes later if your proposal is accepted.
    </p>

    <h2 class="govuk-heading-l">Step 3: Submit your proposal</h2>

    <p class="govuk-body">
      Once you've gathered your evidence, submit your proposal:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Create a GitHub discussion</strong> - Start a new discussion in
        our
        <a
          href="https://github.com/your-org/component-library/discussions"
          class="govuk-link">GitHub repository</a
        >
      </li>
      <li>
        <strong>Use our template</strong> - Follow our proposal template to ensure
        you include all necessary information
      </li>
      <li>
        <strong>Contact our team</strong> - Email us at
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link"
        >
          dataexplorerfeedback@communities.gov.uk
        </a>
        to let us know about your proposal
      </li>
    </ol>

    <h3 class="govuk-heading-m">What to include in your proposal</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Component/pattern name</strong> - What you want to call it
      </li>
      <li>
        <strong>Problem statement</strong> - What user problem does it solve?
      </li>
      <li><strong>User needs</strong> - Who needs this and why?</li>
      <li>
        <strong>Evidence</strong> - Research findings, examples, screenshots
      </li>
      <li><strong>Use cases</strong> - Where would this be used?</li>
      <li><strong>Scope</strong> - What should it do and not do?</li>
      <li>
        <strong>Similar solutions</strong> - How does it compare to existing options?
      </li>
    </ul>

    <h2 class="govuk-heading-l">What happens next</h2>

    <p class="govuk-body">
      After you submit your proposal, our team will review it using our Stage 1
      criteria:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Initial review (1-2 weeks)</strong> - We'll assess if your proposal
        meets the "Useful" and "Unique" criteria
      </li>
      <li>
        <strong>Community feedback</strong> - We'll invite the community to comment
        and share their experiences
      </li>
      <li>
        <strong>Prioritisation</strong> - If accepted, we'll add it to our community
        backlog and assign priority
      </li>
      <li>
        <strong>Status update</strong> - The component will move from "To be developed"
        to "In progress" status
      </li>
    </ol>

    <InsetText>
      {#snippet content()}
        <strong>Annual prioritisation:</strong> Each year, our community prioritises
        which components and patterns to work on. If your proposal isn't immediately
        prioritised, you can choose to develop it yourself or leave it for others
        to work on.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m">If your proposal is accepted</h3>
    <p class="govuk-body">
      If your proposal meets our Stage 1 criteria, you can:
    </p>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Develop it yourself</strong> - Work with our team to develop the
        component or pattern
      </li>
      <li>
        <strong>Collaborate with others</strong> - Find others in the community who
        want to work on it
      </li>
      <li>
        <strong>Leave it for others</strong> - Let someone else take on the development
        work
      </li>
    </ul>

    <p class="govuk-body">
      <a href="/community/develop-component" class="govuk-link">
        Learn about developing a component or pattern
      </a>
    </p>

    <h3 class="govuk-heading-m">If your proposal needs work</h3>
    <p class="govuk-body">
      If your proposal doesn't initially meet our criteria, we'll work with you
      to:
    </p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Identify what additional evidence is needed</li>
      <li>Suggest ways to strengthen your proposal</li>
      <li>Connect you with others who might have relevant research</li>
      <li>Provide guidance on refining the scope or approach</li>
    </ul>

    <h2 class="govuk-heading-l">Types of contributions we're looking for</h2>

    <p class="govuk-body">We're particularly interested in proposals for:</p>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Data visualisation components</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Interactive charts and graphs</li>
          <li>Maps and geographical visualisations</li>
          <li>Dashboard components</li>
          <li>Data tables and grids</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Government-specific patterns</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Statistical data presentation</li>
          <li>Performance metrics displays</li>
          <li>Policy and guidance layouts</li>
          <li>Multi-departmental workflows</li>
        </ul>
      </div>
    </div>

    <h2 class="govuk-heading-l">Get help with your proposal</h2>

    <p class="govuk-body">
      Not sure if your idea is ready to propose? We're here to help:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Email our team</strong> - Get in touch at
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link"
        >
          dataexplorerfeedback@communities.gov.uk
        </a>
      </li>
      <li>
        <strong>Join community discussions</strong> - Connect with other government
        designers and developers
      </li>
      <li>
        <strong>Attend our workshops</strong> - Join our regular community sessions
        for guidance and feedback
      </li>
    </ul>

    <p class="govuk-body">
      We encourage early conversations to help shape your proposal and increase
      its chances of success.
    </p>
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
              title: "Develop a component or pattern",
              base_path: "/community/develop-component",
            },
            {
              title: "Component statuses",
              base_path: "/get-started/component-statuses",
            },
          ],
        },
        {
          type: "subheading",
          id: "before-you-start",
          subheading: "Before you start",
          links: [
            {
              title: "Browse existing components",
              base_path: "/components",
            },
            {
              title: "Check our roadmap",
              base_path: "/community/roadmap",
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
              title: "GOV.UK Design System proposals",
              url: "https://design-system.service.gov.uk/community/propose-a-component-or-pattern/",
            },
            {
              title: "GitHub discussions",
              url: "https://github.com/your-org/component-library/discussions",
            },
          ],
        },
      ]}
    />
  </div>
</div>
