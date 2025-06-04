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
    content="Stay up to date with the latest insights, technical deep-dives, and community discussions from the MHCLG Svelte Component Library team."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Blog posts, videos and podcasts</h1>

    <p class="govuk-body-l">
      Stay up to date with the latest insights, technical deep-dives, and
      community discussions from our team. We regularly share our learnings,
      best practices, and behind-the-scenes content about building accessible,
      performant government services.
    </p>

    <WarningText
      text="Our content library is currently being developed. We'll be publishing regular updates about our work, technical insights, and community activities soon."
    />

    <div class="govuk-grid-row govuk-!-margin-top-8">
      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_content-creator_vuqg.svg"
          alt="Illustration of a person creating content with documents and interface elements"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 300px; height: 200px; object-fit: contain;"
        />

        <h2 class="govuk-heading-l">Blog posts</h2>

        <ul class="govuk-list govuk-list--bullet">
          <li>Technical deep-dives into Svelte 5 and modern web development</li>
          <li>Case studies from our real-world government projects</li>
          <li>Accessibility best practices for data visualisation</li>
          <li>Performance optimisation techniques</li>
          <li>Design system evolution and decision-making</li>
        </ul>
      </div>

      <div class="govuk-grid-column-one-half">
        <img
          src="/assets/images/undraw_online-media_opxh.svg"
          alt="Illustration of a person interacting with video content and media interfaces"
          class="govuk-!-margin-bottom-4"
          style="width: 100%; max-width: 300px; height: 200px; object-fit: contain;"
        />

        <h2 class="govuk-heading-l">Videos and podcasts</h2>

        <ul class="govuk-list govuk-list--bullet">
          <li>Conference talks and presentations</li>
          <li>Component library demonstrations</li>
          <li>Team interviews and behind-the-scenes content</li>
          <li>Community discussions and Q&A sessions</li>
          <li>Technical tutorials and walkthroughs</li>
        </ul>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Featured content</h2>

    <p class="govuk-body">Here are some highlights from our content library:</p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-full">
        <!-- <img
          src="/assets/images/undraw_content-creator_vuqg.svg"
          alt="Illustration representing featured content and articles"
          class="govuk-!-margin-bottom-6"
          style="width: 100%; max-width: 400px; height: 250px; object-fit: contain; margin: 0 auto; display: block;"
        /> -->

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
              >Topics: Accessibility, Data visualisation, Svelte 5, ARIA
              patterns</em
            >
          </p>
        </div>

        <div class="content-item">
          <h4 class="govuk-heading-s">
            "From SPA in Plotly Dash to Progressive Enhancement: A Government
            Data Platform Journey"
          </h4>
          <p class="govuk-body-s">
            <strong>Coming soon</strong> - How we moved from a SPA to a modern, accessible
            web platform using Svelte and progressive enhancement principles.
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
            learned from building and maintaining a component library used across
            multiple government services.
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
              >Topics: Framework selection, Government requirements, Team
              decisions</em
            >
          </p>
        </div>

        <div class="content-item">
          <h4 class="govuk-heading-s">
            "Multidisciplinary Team Collaboration in Component Libraries"
          </h4>
          <p class="govuk-body-s">
            <strong>Coming soon</strong> - How our team of developers, designers,
            user researchers, and data engineers work together to create user-centred
            components.
          </p>
          <p class="govuk-body-s">
            <em>Topics: Team collaboration, Agile practices, User research</em>
          </p>
        </div>

        <h3 class="govuk-heading-m govuk-!-margin-top-6">
          Video content and presentations
        </h3>

        <div class="content-item">
          <h4 class="govuk-heading-s">
            "Modern Data Visualisation in Government: Beyond the Dashboard"
          </h4>
          <p class="govuk-body-s">
            <strong>Coming soon</strong> - Presentation exploring alternatives to
            traditional dashboard approaches for government data products.
          </p>
          <p class="govuk-body-s">
            <em>Format: Webinar (video and slides)</em>
          </p>
        </div>

        <div class="content-item">
          <h4 class="govuk-heading-s">
            "Svelte 5 in Production: A Government Case Study"
          </h4>
          <p class="govuk-body-s">
            <strong>Coming soon</strong> - Real-world experiences of using Svelte
            5 in government services, including challenges, benefits, and lessons
            learned.
          </p>
          <p class="govuk-body-s">
            <em>Format: Webinar (video and slides)</em>
          </p>
        </div>

        <div class="content-item">
          <h4 class="govuk-heading-s">
            "Component Library Walkthrough: Interactive Documentation in Action"
          </h4>
          <p class="govuk-body-s">
            <strong>Coming soon</strong> - Live demonstration of our component library's
            interactive documentation and "try before you buy" philosophy.
          </p>
          <p class="govuk-body-s">
            <em>Format: Webinar (video and slides)</em>
          </p>
        </div>

        <InsetText>
          {#snippet content()}
            Want to be notified when we publish new content? <a
              href="mailto:dataexplorerfeedback@communities.gov.uk"
              class="govuk-link">Get in touch</a
            > to join our mailing list and stay up to date with our latest posts
            and videos.
          {/snippet}
        </InsetText>

        <h2 class="govuk-heading-l govuk-!-margin-top-8">
          Community contributions
        </h2>

        <p class="govuk-body">
          We encourage contributions from the wider government community. If
          you've used our components in your service or have insights to share,
          we'd love to feature your work.
        </p>

        <h3 class="govuk-heading-m">How to contribute</h3>

        <ul class="govuk-list govuk-list--bullet">
          <li>
            <strong>Case studies</strong> - Share how you've used our components
            in your service
          </li>
          <li>
            <strong>Technical insights</strong> - Write about challenges you've solved
            or patterns you've discovered
          </li>
          <li>
            <strong>User research</strong> - Share findings that could help improve
            our components
          </li>
          <li>
            <strong>Guest posts</strong> - Contribute articles about related topics
            like accessibility, performance, or design systems
          </li>
        </ul>

        <p class="govuk-body">
          <a
            href="mailto:dataexplorerfeedback@communities.gov.uk"
            class="govuk-link govuk-!-font-weight-bold">Contact us</a
          >
          to discuss your contribution ideas.
        </p>

        <h2 class="govuk-heading-l govuk-!-margin-top-8">Stay connected</h2>

        <p class="govuk-body">
          Follow our work and join the conversation about government design
          systems and modern web development.
        </p>

        <ul class="govuk-list govuk-list--bullet">
          <li>
            <a href="/community/team-approach/" class="govuk-link"
              >Learn about our team and approach</a
            >
          </li>
          <li>
            <a href="/community/projects/" class="govuk-link"
              >See our current projects</a
            >
          </li>
          <li>
            <a href="/community/roadmap/" class="govuk-link">View our roadmap</a
            >
          </li>
          <li>
            <a
              href="mailto:dataexplorerfeedback@communities.gov.uk"
              class="govuk-link">Get in touch with our team</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .content-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
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
