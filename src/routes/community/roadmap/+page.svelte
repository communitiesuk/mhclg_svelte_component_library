<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Roadmap - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="See what the MHCLG Svelte Component Library team is working on now and what's planned for the future."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Roadmap</h1>

    <p class="govuk-body-l">
      This roadmap shows what we're working on now and what we're planning to
      work on next. It helps you understand our priorities and plan your own
      work accordingly.
    </p>

    <WarningText
      text="This roadmap is indicative and may change based on user needs, technical constraints, and organisational priorities."
    />

    <h2 class="govuk-heading-l">Moving from alpha to stable release</h2>

    <p class="govuk-body">
      After gathering feedback from our initial alpha release, we'll be working
      towards a stable component library release. Our work is organised into
      current priorities and upcoming developments.
    </p>

    <div class="timeline-section">
      <div class="timeline">
        <div class="timeline-item current-work">
          <div class="timeline-marker current"></div>
          <div class="timeline-content">
            <h3 class="govuk-heading-m">Current priorities</h3>
            <p class="govuk-body">
              Following our alpha release, we're focusing on core capabilities
              that support government data products and services.
            </p>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">High priority</h4>
              <ul class="govuk-list govuk-list--bullet">
                <li>
                  <strong>Data visualisation components</strong> - Charts, graphs,
                  and interactive displays for government statistics and reporting
                </li>
                <li>
                  <strong>Geographic and mapping components</strong> - Interactive
                  mapping and location-based data tools for planning and performance
                  metrics
                </li>
              </ul>
            </div>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">Medium priority</h4>
              <ul class="govuk-list govuk-list--bullet">
                <li>
                  <strong>Accessibility enhancements</strong> - Ensuring all components
                  meet WCAG 2.2 AA standards
                </li>
                <li>
                  <strong>Performance optimisation</strong> - Lightweight, fast-loading
                  components for better user experience
                </li>
              </ul>
            </div>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">Supporting work</h4>
              <ul class="govuk-list govuk-list--bullet">
                <li>
                  <strong>Documentation improvements</strong> - Refining API documentation
                  and implementation examples based on user feedback
                </li>
                <li>
                  <strong>Community processes</strong> - Streamlining contribution
                  standards and review processes
                </li>
                <li>
                  <strong>Knowledge sharing</strong> - Publishing technical articles
                  and best practice guidance
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="govuk-heading-m">Up next: Stable release preparation</h3>
            <p class="govuk-body">
              Preparing for our first stable release by ensuring quality,
              completeness, and production readiness across all components.
            </p>
            <ul class="govuk-list govuk-list--bullet">
              <li>
                Comprehensive testing of all components in production
                environments
              </li>
              <li>Final accessibility audits and compliance verification</li>
              <li>Performance optimisation</li>
              <li>Complete API documentation</li>
              <li>Establishing long-term support and versioning strategy</li>
            </ul>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3 class="govuk-heading-m">Looking ahead: Post-stable release</h3>
            <p class="govuk-body">
              Our medium-term goals focus on expanding capabilities and
              establishing the component library as a key resource for
              government digital services.
            </p>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">
                Project-driven component development
              </h4>
              <p class="govuk-body-s">
                Designing and developing components needed for our active
                projects, including Planning Data Transparency and Indices of
                Deprivation. Real-world requirements driving practical, tested
                solutions.
              </p>
            </div>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">Cross-government adoption</h4>
              <p class="govuk-body-s">
                Expanding usage beyond MHCLG to other government departments.
                Establishing partnerships and sharing components that solve
                common government data presentation challenges.
              </p>
            </div>

            <div class="priority-subsection">
              <h4 class="govuk-heading-s">Advanced capabilities</h4>
              <ul class="govuk-list govuk-list--bullet">
                <li>Advanced data visualisation components</li>
                <li>Integration with additional government design systems</li>
                <li>Community-driven component development</li>
                <li>Training and support programmes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <InsetText>
      {#snippet content()}
        This roadmap is shaped by user feedback, government priorities, and
        technical opportunities. We regularly review and update our plans based
        on what we learn from real-world usage and community input.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Active projects</h2>

    <p class="govuk-body">
      Our component development is driven by real-world government projects that
      provide practical requirements and testing opportunities.
    </p>

    <div class="projects-section">
      <div class="project-item">
        <div class="project-header">
          <h3 class="govuk-heading-m">Planning Data Transparency</h3>
          <strong class="govuk-tag govuk-tag--green">Active</strong>
        </div>
        <p class="govuk-body">
          Working with the MHCLG planning team to improve transparency around
          housing delivery. Developing interactive maps, data visualisation, and
          search components for planning data exploration.
        </p>
      </div>

      <div class="project-item">
        <div class="project-header">
          <h3 class="govuk-heading-m">Indices of Deprivation Publication</h3>
          <strong class="govuk-tag govuk-tag--green">Active</strong>
        </div>
        <p class="govuk-body">
          Unifying scattered supplementary products into a cohesive platform
          embedded within the statistical report. Creating integrated tools for
          data exploration, mapping, and analysis.
        </p>
      </div>
    </div>

    <InsetText>
      {#snippet content()}
        For more detailed information about these projects, including
        objectives, current landscape, and component requirements, see our
        <a href="/community/projects" class="govuk-link"
          >dedicated projects page</a
        >.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Get involved</h2>

    <p class="govuk-body">
      This roadmap is informed by feedback from teams across government. You can
      help shape our priorities and stay informed about our progress.
    </p>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Shape our roadmap</h3>
        <ul class="govuk-list">
          <li>
            <a href="/community/share-findings" class="govuk-link"
              >Share your user research findings</a
            >
          </li>
          <li>
            <a href="/community/propose-component" class="govuk-link"
              >Propose new components or patterns</a
            >
          </li>
          <li>
            <a
              href="https://github.com/communitiesuk/mhclg_svelte_component_library/discussions"
              class="govuk-link"
              rel="external">Join discussions on GitHub</a
            >
          </li>
          <li>
            <a
              href="mailto:dataexplorerfeedback@communities.gov.uk"
              class="govuk-link">Contact our team directly</a
            >
          </li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Stay updated</h3>
        <ul class="govuk-list">
          <li>Check this page for the latest updates</li>
          <li>
            <a
              href="https://github.com/communitiesuk/mhclg_svelte_component_library"
              class="govuk-link"
              rel="external">Follow our GitHub repository</a
            > for technical updates
          </li>
          <li>
            Read our <a href="/community/blog-posts" class="govuk-link"
              >blog posts and updates</a
            >
          </li>
          <li>
            <a
              href="mailto:dataexplorerfeedback@communities.gov.uk"
              class="govuk-link">Email us</a
            > to be notified of major releases
          </li>
        </ul>
      </div>
    </div>

    <br />

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
              title: "Projects using the component library",
              base_path: "/community/projects",
            },
            {
              title: "Component statuses",
              base_path: "/get-started/component-statuses",
            },
          ],
        },
      ]}
    />
  </div>
</div>

<style>
  /* Timeline section */
  .timeline-section {
    margin: 3rem 0;
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #00625e;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
  }

  .timeline-marker {
    position: absolute;
    left: -2rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background-color: #00625e;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 2px #00625e;
  }

  .timeline-marker.current {
    background-color: #28a197;
    box-shadow: 0 0 0 2px #28a197;
    width: 1.2rem;
    height: 1.2rem;
    top: 0.4rem;
  }

  .timeline-content {
    background: white;
    border: 1px solid #b1b4b6;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .current-work .timeline-content {
    background: #f8fffe;
    border: 2px solid #28a197;
  }

  .timeline-content h3 {
    margin-top: 0;
  }

  .current-work .timeline-content h3 {
    color: #00625e;
  }

  .priority-subsection {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #f3f2f1;
  }

  .priority-subsection:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  .priority-subsection h4 {
    margin-bottom: 0.5rem;
  }

  /* Projects section */
  .projects-section {
    margin: 3rem 0;
  }

  .project-item {
    border: 1px solid #b1b4b6;
    padding: 2rem;
    margin-bottom: 2rem;
    background: white;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .project-header h3 {
    margin: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 40.0625em) {
    .timeline {
      padding-left: 1.5rem;
    }

    .timeline-marker {
      left: -1.5rem;
    }

    .project-header {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
