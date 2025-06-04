<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Blog posts, videos and podcasts - MHCLG Svelte Component Library</title
  >
  <meta
    name="description"
    content="Discover blog posts, videos, and podcasts about the MHCLG Svelte Component Library, including technical insights, team updates, and community resources."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Blog posts, videos and podcasts</h1>

    <p class="govuk-body-l">
      Stay up to date with the latest insights, technical articles, and updates
      from the MHCLG Svelte Component Library team and the wider government
      design community.
    </p>

    <WarningText
      assistiveText="Note"
      text="This is an alpha service. Content will be added regularly as we publish new articles, videos, and podcast appearances."
    />

    <h2 class="govuk-heading-l">What you'll find here</h2>

    <p class="govuk-body">
      We share our experiences, learnings, and technical insights through
      various content formats to help the government design and development
      community:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Blog posts</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Technical deep-dives into Svelte 5 and modern web development</li>
          <li>Case studies from our real-world government projects</li>
          <li>Accessibility best practices for data visualisation</li>
          <li>Performance optimisation techniques</li>
          <li>Design system evolution and decision-making</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Videos and podcasts</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Conference talks and presentations</li>
          <li>Component library demonstrations</li>
          <li>Team interviews and behind-the-scenes content</li>
          <li>Community discussions and Q&A sessions</li>
          <li>Technical tutorials and walkthroughs</li>
        </ul>
      </div>
    </div>

    <h2 class="govuk-heading-l">Featured content</h2>

    <p class="govuk-body">Here are some highlights from our content library:</p>

    <h3 class="govuk-heading-m">Technical articles</h3>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Building Accessible Data Visualisations with Svelte 5"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - A comprehensive guide to creating charts,
        maps, and interactive data displays that meet WCAG 2.1 AA standards.
      </p>
      <p class="govuk-body-s">
        <em
          >Topics: Accessibility, Data visualisation, Svelte 5, ARIA patterns</em
        >
      </p>
    </div>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "From SPA in Plotly Dash to Progressive Enhancement: A Government Data Platform
        Journey"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - How we moved from a SPA
        to a modern, accessible web platform using Svelte and progressive enhancement
        principles.
      </p>
      <p class="govuk-body-s">
        <em
          >Topics: Progressive enhancement, Government services, Performance</em
        >
      </p>
    </div>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Component Library Architecture: Lessons from Production"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - Technical decisions, trade-offs, and lessons
        learned from building and maintaining a component library used across multiple
        government services.
      </p>
      <p class="govuk-body-s">
        <em>Topics: Architecture, TypeScript, Testing, Maintenance</em>
      </p>
    </div>

    <h3 class="govuk-heading-m">Team insights</h3>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Why We Chose Svelte for Government Services"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - The decision-making process behind choosing
        Svelte 5 over other frameworks for government digital services, including
        performance, accessibility, and developer experience considerations.
      </p>
      <p class="govuk-body-s">
        <em
          >Topics: Framework selection, Government requirements, Team decisions</em
        >
      </p>
    </div>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Multidisciplinary Team Collaboration in Component Libraries"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - How our team of developers, designers, user
        researchers, and data engineers work together to create user-centred components.
      </p>
      <p class="govuk-body-s">
        <em>Topics: Team collaboration, Agile practices, User research</em>
      </p>
    </div>

    <div class="content-item">
        <h4 class="govuk-heading-s">
            "Modern Data Visualisation in Government: Beyond the Dashboard"
        </h4>
        <p class="govuk-body-s">
            <strong>Coming soon</strong> - Presentation exploring alternatives
            to traditional dashboard approaches for government data products.
        </p>
        <p class="govuk-body-s">
            <em>Format: Conference talk (video and slides)</em>
        </p>
    </div>

    <div class="content-item">
        <h4 class="govuk-heading-s">
            "Svelte 5 in Production: A Government Case Study"
        </h4>
        <p class="govuk-body-s">
            <strong>Coming soon</strong> - Real-world experiences of using Svelte 5 in
            government services, including challenges, benefits, and lessons learned.
        </p>
        <p class="govuk-body-s">
            <em>Format: Webinar and podcast episode</em>
        </p>
    </div>

    <!-- <h3 class="govuk-heading-m">Conference talks and presentations</h3> -->



    <h2 class="govuk-heading-l">Community contributions</h2>

    <p class="govuk-body">
      We also feature content from the wider government design and development
      community:
    </p>

    <InsetText>
      {#snippet content()}
        <strong>Want to contribute?</strong> If you've written about design
        systems, Svelte, accessibility, or government digital services, we'd
        love to feature your content.
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link">Get in touch</a
        > to discuss collaboration opportunities.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m">Guest articles</h3>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Accessibility Testing in Government: Tools and Techniques"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - Guest article from accessibility specialists
        across government sharing practical testing approaches and tools.
      </p>
      <p class="govuk-body-s">
        <em>Contributors: Cross-government accessibility community</em>
      </p>
    </div>

    <h3 class="govuk-heading-m">Community discussions</h3>

    <div class="content-item">
      <h4 class="govuk-heading-s">
        "Design System Governance: Lessons from Multiple Departments"
      </h4>
      <p class="govuk-body-s">
        <strong>Coming soon</strong> - Panel discussion with design system leads
        from across government sharing governance approaches and challenges.
      </p>
      <p class="govuk-body-s">
        <em>Format: Recorded panel discussion and podcast</em>
      </p>
    </div>

    <h2 class="govuk-heading-l">Stay updated</h2>

    <p class="govuk-body">
      We're continuously creating new content. Here's how to stay informed:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Email updates</strong> - Contact us at
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link"
        >
          dataexplorerfeedback@communities.gov.uk
        </a>
        to join our mailing list
      </li>
      <li>
        <strong>GitHub discussions</strong> - Follow our
        <a
          href="https://github.com/your-org/component-library/discussions"
          class="govuk-link"
          rel="external">GitHub repository</a
        >
        for announcements
      </li>
      <li>
        <strong>Community events</strong> - We'll announce speaking engagements and
        community sessions through our usual channels
      </li>
    </ul>

    <h2 class="govuk-heading-l">Suggest content topics</h2>

    <p class="govuk-body">
      Is there something specific you'd like us to write about or present on? We
      welcome suggestions from the community:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>Technical tutorials or deep-dives</li>
      <li>Case studies from specific projects</li>
      <li>Accessibility guidance for particular scenarios</li>
      <li>Design system governance and processes</li>
      <li>Team collaboration and working practices</li>
    </ul>

    <p class="govuk-body">
      <a
        href="mailto:dataexplorerfeedback@communities.gov.uk"
        class="govuk-link"
      >
        Send us your suggestions
      </a>
      and we'll consider them for future content.
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
              title: "Our team and delivery approach",
              base_path: "/community/team-approach",
            },
            {
              title: "Projects",
              base_path: "/community/projects",
            },
            {
              title: "Roadmap",
              base_path: "/community/roadmap",
            },
          ],
        },
        {
          type: "subheading",
          id: "get-involved",
          subheading: "Get involved",
          links: [
            {
              title: "Propose a component or pattern",
              base_path: "/community/propose-component",
            },
            {
              title: "Contribution criteria",
              base_path: "/community/contribution-criteria",
            },
            {
              title: "Share findings about your users",
              base_path: "/community/share-findings",
            },
          ],
        },
        {
          type: "other",
          id: "external-resources",
          subheading: "External resources",
          links: [
            {
              title: "Government Design Community",
              url: "https://designnotes.blog.gov.uk/",
            },
            {
              title: "GOV.UK Design System blog",
              url: "https://designsystem.service.gov.uk/community/",
            },
            {
              title: "Cross-Government Design Community",
              url: "https://www.gov.uk/service-manual/communities/design-community",
            },
          ],
        },
      ]}
    />
  </div>
</div>

<style>
  .content-item {
    margin-bottom: 2rem;
    padding: 1rem;
    border-left: 4px solid #00625e;
    background-color: #f8f8f8;
  }

  .content-item h4 {
    margin-bottom: 0.5rem;
  }

  .content-item p {
    margin-bottom: 0.5rem;
  }

  .content-item p:last-child {
    margin-bottom: 0;
  }
</style>
