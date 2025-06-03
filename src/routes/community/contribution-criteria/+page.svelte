<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Contribution criteria - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn about the criteria and standards for contributing components and patterns to the MHCLG Svelte Component Library."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Contribution criteria</h1>

    <p class="govuk-body-l">
      To maintain quality and consistency across the MHCLG Svelte Component
      Library, all contributions must meet specific criteria before being
      accepted into the library.
    </p>

    <WarningText
      assistiveText="Important"
      text="These criteria help ensure that components and patterns in the library are of high quality, meet user needs, and work consistently across government services."
    />

    <h2 class="govuk-heading-l">What we accept</h2>

    <p class="govuk-body">
      We accept contributions that enhance the library's ability to support
      data-rich government services. This includes:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>UI components</strong> - Reusable interface elements that solve common
        user interface problems
      </li>
      <li>
        <strong>Data visualisation components</strong> - Charts, maps, and interactive
        graphics for presenting government data
      </li>
      <li>
        <strong>Layout patterns</strong> - Page structures and content organisation
        patterns
      </li>
      <li>
        <strong>Content components</strong> - Elements for presenting information
        and guidance
      </li>
      <li>
        <strong>Form components</strong> - Input elements and form patterns for data
        collection
      </li>
      <li>
        <strong>Navigation patterns</strong> - Components for helping users move
        through services
      </li>
      <li>
        <strong>Documentation improvements</strong> - Updates to guidance, examples,
        and best practices
      </li>
    </ul>

    <h2 class="govuk-heading-l">Essential criteria</h2>

    <p class="govuk-body">
      All contributions must meet these essential criteria to be considered for
      inclusion:
    </p>

    <h3 class="govuk-heading-m">1. Useful</h3>

    <p class="govuk-body">The contribution must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Solve a real user problem that's been identified through research</li>
      <li>
        Be needed by multiple teams or services, not just one specific project
      </li>
      <li>Address a gap in the current component library</li>
    </ul>

    <h3 class="govuk-heading-m">2. Unique</h3>

    <p class="govuk-body">The contribution must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Not duplicate functionality that already exists in the library</li>
      <li>
        Offer a distinct solution that can't be achieved by combining existing
        components
      </li>
      <li>Provide clear advantages over existing alternatives</li>
      <li>Fill a specific gap in the current component ecosystem</li>
    </ul>

    <h3 class="govuk-heading-m">3. Accessible</h3>

    <p class="govuk-body">The contribution must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Meet WCAG 2.1 AA accessibility standards</li>
      <li>
        Work with assistive technologies (screen readers, voice recognition
        software)
      </li>
      <li>Support keyboard navigation</li>
      <li>Use semantic HTML and appropriate ARIA labels</li>
      <li>
        Be tested with real users, including those who use assistive
        technologies
      </li>
      <li>Work without JavaScript (progressive enhancement)</li>
    </ul>

    <h3 class="govuk-heading-m">4. Consistent</h3>

    <p class="govuk-body">The contribution must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        Follow GOV.UK Design System principles and patterns where applicable
      </li>
      <li>
        Use the established visual design language (colours, typography,
        spacing)
      </li>
      <li>Follow consistent interaction patterns and behaviours</li>
      <li>Align with government design principles and service standards</li>
      <li>Use consistent naming conventions and terminology</li>
    </ul>

    <h3 class="govuk-heading-m">5. Versatile</h3>

    <p class="govuk-body">The contribution must:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Work across different types of government services</li>
      <li>Be flexible enough to handle various content types and lengths</li>
      <li>Support different screen sizes and devices</li>
      <li>
        Work in different contexts (public-facing services, internal tools, data
        platforms)
      </li>
      <li>Be configurable for different use cases without breaking</li>
    </ul>

    <h2 class="govuk-heading-l">Technical requirements</h2>

    <p class="govuk-body">
      Beyond the essential criteria, contributions must meet our technical
      standards:
    </p>

    <h3 class="govuk-heading-m">Code quality</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Written in Svelte 5 using modern runes syntax</li>
      <li>Follows TypeScript best practices with proper type definitions</li>
      <li>Includes comprehensive JSDoc documentation</li>
      <li>Uses semantic HTML and follows web standards</li>
      <li>Optimised for performance and minimal bundle size</li>
      <li>Follows our coding conventions and style guide</li>
    </ul>

    <h3 class="govuk-heading-m">Testing</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Includes unit tests for all functionality</li>
      <li>Passes accessibility testing with automated tools</li>
      <li>Tested manually with assistive technologies</li>
      <li>Tested across supported browsers and devices</li>
    </ul>

    <h3 class="govuk-heading-m">Documentation</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Clear description of the component's purpose and when to use it</li>
      <li>Comprehensive examples showing different use cases</li>
      <li>API documentation for all props and events</li>
      <li>Accessibility guidance and considerations</li>
      <li>Implementation notes and best practices</li>
      <li>Research findings and user needs evidence</li>
    </ul>

    <h2 class="govuk-heading-l">Data visualisation specific criteria</h2>

    <p class="govuk-body">
      Given our focus on data-rich government services, data visualisation
      components have additional requirements:
    </p>

    <h3 class="govuk-heading-m">Data accessibility</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Provide alternative text descriptions for complex visualisations</li>
      <!-- <li>Include data tables or structured alternatives</li> -->
      <li>Support high contrast and reduced motion preferences</li>
      <li>Work effectively for users with colour vision deficiencies</li>
      <li>Provide keyboard navigation for interactive elements</li>
    </ul>

    <h3 class="govuk-heading-m">Statistical integrity</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Follow Government Statistical Service (GSS) best practices</li>
      <li>Avoid misleading visual representations of data</li>
      <li>Include appropriate context and explanations where applicable</li>
      <li>Handle missing or incomplete data appropriately</li>
    </ul>

    <h3 class="govuk-heading-m">Performance</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Handle large datasets efficiently</li>
      <li>Implement appropriate loading states and progressive disclosure</li>
      <li>Optimise rendering for smooth interactions</li>
      <li>Support data streaming and incremental updates where appropriate</li>
    </ul>

    <h2 class="govuk-heading-l">Evidence requirements</h2>

    <p class="govuk-body">
      To demonstrate that your contribution meets the criteria, you'll need to
      provide:
    </p>

    <h3 class="govuk-heading-m">User research evidence</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Research findings showing the user need</li>
      <li>Evidence that the solution works for users</li>
      <li>Usability testing results</li>
      <li>Accessibility testing with real users</li>
      <li>Evidence of use across multiple services or contexts</li>
    </ul>

    <h3 class="govuk-heading-m">Design rationale</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Explanation of design decisions and trade-offs</li>
      <li>Comparison with existing solutions</li>
      <li>Consideration of alternative approaches</li>
      <li>Alignment with design principles and standards</li>
    </ul>

    <h3 class="govuk-heading-m">Technical documentation</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Performance benchmarks and optimisation details</li>
      <li>Browser and device compatibility testing results</li>
      <li>Security considerations and mitigations</li>
      <li>Maintenance and support requirements</li>
    </ul>

    <InsetText>
      {#snippet content()}
        Not sure if your contribution meets these criteria? <a
          href="/community/propose-component"
          class="govuk-link">Get in touch with our team</a
        > early in your process. We're happy to provide guidance and feedback before
        you invest significant time in development.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l">Review process</h2>

    <p class="govuk-body">
      Once you've submitted a contribution, our team will review it against
      these criteria:
    </p>

    <ol class="govuk-list govuk-list--number">
      <li>
        <strong>Initial assessment</strong> - We'll check if the contribution meets
        the basic criteria and requirements
      </li>
      <li>
        <strong>Technical review</strong> - Our developers will review the code quality,
        performance, and technical implementation
      </li>
      <li>
        <strong>Design review</strong> - Our designers will assess consistency, usability,
        and alignment with design principles
      </li>
      <li>
        <strong>Accessibility review</strong> - We'll conduct thorough accessibility
        testing and evaluation
      </li>
      <li>
        <strong>User research validation</strong> - We may conduct additional research
        to validate the solution
      </li>
      <li>
        <strong>Final decision</strong> - The design system team will make a final
        decision on inclusion
      </li>
    </ol>

    <h3 class="govuk-heading-m">Timeline expectations</h3>
    <p class="govuk-body">
      The review process typically takes 4-6 weeks, depending on the complexity
      of the contribution and our current workload. We'll keep you updated
      throughout the process and provide feedback at each stage.
    </p>

    <h2 class="govuk-heading-l">What happens if criteria aren't met</h2>

    <p class="govuk-body">
      If your contribution doesn't meet all the criteria, we'll work with you
      to:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>Identify specific areas that need improvement</li>
      <li>Provide guidance on how to address any issues</li>
      <li>Suggest alternative approaches if appropriate</li>
      <li>Connect you with relevant expertise within our team</li>
    </ul>

    <p class="govuk-body">
      We're committed to supporting contributors and helping improve
      contributions rather than simply rejecting them. Our goal is to build the
      best possible component library together.
    </p>

    <h2 class="govuk-heading-l">Maintaining contributions</h2>

    <p class="govuk-body">
      Once accepted, contributions become part of the shared library and require
      ongoing maintenance:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Shared ownership</strong> - The design system team takes responsibility
        for maintaining accepted contributions
      </li>
      <li>
        <strong>Version updates</strong> - Components will be updated to work with
        new versions of Svelte and dependencies
      </li>
      <li>
        <strong>Bug fixes</strong> - Issues will be addressed as part of regular
        maintenance
      </li>
      <li>
        <strong>Enhancement requests</strong> - Future improvements will be considered
        based on user feedback and needs
      </li>
      <li>
        <strong>Breaking changes</strong> - Any breaking changes will be communicated
        clearly with migration guidance
      </li>
    </ul>

    <h2 class="govuk-heading-l">Getting started</h2>

    <p class="govuk-body">
      Ready to contribute? Start by reviewing our contribution process and
      getting in touch with our team.
    </p>

    <p class="govuk-body">
      <a
        href="/community/propose-component"
        class="govuk-link govuk-!-font-weight-bold"
        >Propose a component or pattern</a
      >
      |
      <a
        href="/community/develop-component"
        class="govuk-link govuk-!-font-weight-bold">Development guidance</a
      >
      |
      <a
        href="/community/team-approach"
        class="govuk-link govuk-!-font-weight-bold">Our team approach</a
      >
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
              title: "Our team and delivery approach",
              base_path: "/community/team-approach",
            },
          ],
        },
        {
          type: "subheading",
          id: "design-system-guidance",
          subheading: "Design system guidance",
          links: [
            {
              title: "Component statuses",
              base_path: "/get-started/component-statuses",
            },
            {
              title: "About & Benefits",
              base_path: "/get-started/about-benefits",
            },
          ],
        },
        {
          type: "other",
          id: "external-guidance",
          subheading: "Government design guidance",
          links: [
            {
              title: "GOV.UK Design System contribution criteria",
              url: "https://design-system.service.gov.uk/community/contribution-criteria/",
            },
            {
              title: "Government Design Principles",
              url: "https://www.gov.uk/guidance/government-design-principles",
            },
            {
              title: "Government Service Standard",
              url: "https://www.gov.uk/service-manual/service-standard",
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

<style>
  .govuk-grid-row {
    margin-bottom: 30px;
  }
</style>
