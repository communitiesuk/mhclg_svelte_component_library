<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Share findings about your users - MHCLG Svelte Component Library</title
  >
  <meta
    name="description"
    content="Help us improve the MHCLG Svelte Component Library by sharing your user research findings and insights about how components work in your service."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Share findings about your users</h1>

    <p class="govuk-body-l">
      We want to hear how users experience components and patterns in your
      service – it helps us improve the component library. You can do this by
      taking part in discussions on GitHub or contacting our team directly.
    </p>

    <p class="govuk-body">Useful findings to share might be things like:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>summaries of user research you've done</li>
      <li>prototypes or ideas that you've tested</li>
      <li>analytics from your service</li>
      <li>accessibility testing results</li>
      <li>performance data from components in production</li>
      <li>
        responses to any calls for information 
        <!-- we give in the 'Research on
        this…' section of our component pages -->
      </li>
    </ul>

    <p class="govuk-body">
      Your service might be in the alpha or beta phases, or you might be
      iterating the service after going live. Feedback from any phase helps us
      iterate the component library in line with evolving user needs.
    </p>

    <h2 class="govuk-heading-l">Where to add findings</h2>

    <p class="govuk-body">
      Go to our <a
        href="https://github.com/mhclg-digital/svelte-component-library/discussions"
        class="govuk-link"
        rel="external">list of discussions on GitHub</a
      >. There are different categories for discussions about:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>components already in the library</li>
      <li>new components that could be added in the future</li>
      <!-- <li>data visualisation patterns and approaches</li>
      <li>accessibility improvements</li>
      <li>performance optimisations</li> -->
    </ul>

    <p class="govuk-body">
      Feedback on all of these is useful to us. You'll need to create a GitHub
      account to add comments.
    </p>

    <p class="govuk-body">
      Select the component or topic you want to share findings about. If what
      you're looking for isn't on the list, read about how to <a
        href="/community/propose-component"
        class="govuk-link">propose a component or pattern</a
      >.
    </p>

    <p class="govuk-body">
      Once you've selected the right discussion, use the template below to add
      your findings.
    </p>

    <WarningText
      text="Share information responsibly. You must get informed consent from your participants before you can share findings of any research they've participated in."
    />

    <p class="govuk-body">
      Remember that all the information on GitHub is open to the public. Do not
      share any personally identifiable information about your participants or
      sensitive information about your service.
    </p>

    <h2 class="govuk-heading-l">Research template</h2>

    <p class="govuk-body">
      Use this template to give the community useful context about your
      findings. Copy and paste it into the GitHub comments box and add your
      findings.
    </p>

    <CodeBlock
      code={`## Insights

What are your insights about how people use the component or pattern?

Try to include:
- how it helped or hindered users' journeys, using specific observations
- any metrics or hypotheses that helped you measure success
- screenshots of how you implemented it in your service
- accessibility testing results with assistive technologies
- performance impact on your service

## Methods

Give us some context and briefly explain how you gathered the findings.

Try to include:
- which service you used the component in
- when you did your user research or test
- whether it was a qualitative or quantitative study
- whether you tested with users with access needs, noting any assistive technologies they used
- what devices and browsers you tested on
- any specific data visualisation or interaction requirements

## Technical context

Help us understand your implementation context.

Try to include:
- which version of the component library you used
- any customisations or modifications you made
- integration with other systems or data sources
- performance requirements or constraints
- browser support requirements

## More information

Add links to any prototypes, research documents, or live services (where appropriate).`}
      filename="Research template"
      extension=".md"
      language="md"
    />
    <br />
    <p class="govuk-body">
      You can edit your comment after you post it, so do not worry if you get
      something wrong or want to change it later.
    </p>

    <p class="govuk-body">
      Community members might respond to your findings on GitHub. Feel free to
      take part in the conversation.
    </p>
<!-- 
    <p class="govuk-body">For example, you could:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>compare findings</li>
      <li>learn about each other's users and their needs</li>
      <li>see what's worked to improve things, and what has not</li>
      <li>share technical solutions to common problems</li>
      <li>discuss accessibility approaches</li>
    </ul> -->

    <p class="govuk-body">
      You'll usually be subscribed to get notifications from GitHub when there's
      a new comment in the discussion. Find out how to <a
        href="https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications"
        class="govuk-link"
        rel="external">check your notification settings in GitHub</a
      >.
    </p>

    <h2 class="govuk-heading-l">Alternative ways to share findings</h2>

    <p class="govuk-body">
      If you prefer not to use GitHub, you can also share your findings by:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link">Emailing our team directly</a
        >
      </li>
      <!-- <li>Joining our community calls (contact us for details)</li>
      <li>Participating in our user research sessions</li> -->
    </ul>

    <InsetText>
      {#snippet content()}
        We particularly welcome findings about data visualisation components,
        accessibility testing with assistive technologies, and performance
        impact in production services. These insights help us maintain our focus
        on creating accessible, performant government data products.
      {/snippet}
    </InsetText>

    <!-- <h3 class="govuk-heading-m">Our prioritisation approach</h3>

    <p class="govuk-body">
      We prioritise improvements and new additions based on:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>User impact</strong> - How many users are affected and how severely
      </li>
      <li>
        <strong>Accessibility issues</strong> - Problems that prevent users with
        disabilities from accessing services
      </li>
      <li>
        <strong>Cross-government need</strong> - Components that would benefit multiple
        departments and services
      </li>
      <li>
        <strong>Data visualisation gaps</strong> - Missing components for presenting
        government data effectively
      </li>
      <li>
        <strong>Performance impact</strong> - Issues that significantly affect service
        performance
      </li>
    </ul>

    <p class="govuk-body">
      Most major additions to the component library are chosen through a regular
      prioritisation process with the community. We share the chosen priorities
      on our <a href="/community/roadmap" class="govuk-link">roadmap page</a>.
    </p> -->

    <h2 class="govuk-heading-l">What happens next</h2>

    <p class="govuk-body">
      After you share your findings, here's what typically happens:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>Our team reviews your findings and may ask follow-up questions</li>
      <li>We look for patterns across multiple services and user groups</li>
      <li>
        If we identify a clear need for improvement, we add it to our backlog
      </li>
      <li>We prioritise the work based on impact and available capacity</li>
      <li>
        We update the community on progress through our roadmap and blog posts
      </li>
    </ol>

    <!-- <p class="govuk-body">
      We aim to acknowledge all feedback within 5 working days and provide
      updates on any actions we plan to take.
    </p> -->

    <h2 class="govuk-heading-l">Acting on feedback</h2>

    <p class="govuk-body">
      Our team reads all new comments on our GitHub pages and direct feedback.
      We do not usually act immediately on feedback – we need to grow a clear
      body of evidence before we can be sure that something is a problem.
    </p>

    <p class="govuk-body">
      Even if your findings do not lead to a change to the component library,
      it's really useful to share anyway. People across government read the
      discussions on GitHub to see how others have approached things and what
      they've learned.
    </p>

    <h2 class="govuk-heading-l">Need help?</h2>

    <p class="govuk-body">
      If you've got a question about sharing your findings or need help with the
      research template, <a
        href="mailto:dataexplorerfeedback@communities.gov.uk"
        class="govuk-link">contact our team</a
      >.
    </p>

    <p class="govuk-body">
      We're also happy to help you plan user research or provide guidance on
      testing our components with your users.
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
              title: "Propose a component or pattern",
              base_path: "/community/propose-component",
            },
            {
              title: "Develop a component or pattern",
              base_path: "/community/develop-component",
            },
            {
              title: "Contribution criteria",
              base_path: "/community/contribution-criteria",
            },
          ],
        },
        {
          type: "subheading",
          id: "community-resources",
          subheading: "Community resources",
          links: [
            {
              title: "Our team and delivery approach",
              base_path: "/community/team-approach",
            },
            {
              title: "Projects using the component library",
              base_path: "/community/projects",
            },
            {
              title: "Roadmap",
              base_path: "/community/roadmap",
            },
          ],
        },
        {
          type: "other",
          id: "external-resources",
          subheading: "External resources",
          links: [
            {
              title: "GitHub discussions",
              url: "https://github.com/mhclg-digital/svelte-component-library/discussions",
            },
            {
              title: "GOV.UK Service Manual: User research",
              url: "https://www.gov.uk/service-manual/user-research",
            },
            {
              title: "GitHub notification settings",
              url: "https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications",
            },
          ],
        },
      ]}
    />
  </div>
</div>
