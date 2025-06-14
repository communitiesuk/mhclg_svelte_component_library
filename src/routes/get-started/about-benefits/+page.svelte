<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
</script>

<svelte:head>
  <title>About & Benefits - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn about the benefits and philosophy behind the MHCLG Svelte Component Library, including performance, accessibility, and our multi-design system approach."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">About & Benefits</h1>

    <p class="govuk-body-l">
      Discover the advantages of using the MHCLG Svelte Component Library and
      learn about our development philosophy and approach.
    </p>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Why Svelte?</h2>

    <p class="govuk-body">
      We chose Svelte as the foundation for our component library because of its
      exceptional benefits for government digital services:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Superior performance</strong> - Svelte compiles to vanilla JavaScript,
        resulting in smaller bundle sizes and faster load times
      </li>
      <li>
        <strong>Excellent SEO</strong> - Server-side rendering capabilities ensure
        your content is accessible to search engines and users with JavaScript disabled
      </li>
      <li>
        <strong>Developer experience</strong> - Clean, readable syntax that's easy
        to learn and maintain
      </li>
      <li>
        <strong>No runtime overhead</strong> - Unlike other frameworks, Svelte moves
        work to compile time, reducing the JavaScript your users need to download
      </li>
      <li>
        <strong>Built-in reactivity</strong> - Simple, intuitive state management
        without complex patterns or additional libraries
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Multi-Design System Approach
    </h2>

    <p class="govuk-body">
      Our component library brings together the best components from multiple
      established design systems, creating a comprehensive toolkit for
      government digital services:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Government Design Systems</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>GOV.UK Design System (GDS)</li>
          <li>Ministry of Justice (MoJ)</li>
          <li>Ministry of Defence (MoD)</li>
          <li>GOV.UK Publishing Components</li>
          <li>Many more...</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Component Types</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Standard UI components</li>
          <li>Data visualisation charts, maps, and infographics</li>
          <li>Layout components</li>
          <li>Content components</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-third">
        <h3 class="govuk-heading-s">Custom Designs</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Data-heavy interfaces</li>
          <li>Specialised visualisations</li>
          <li>Domain-specific patterns</li>
        </ul>
      </div>
    </div>

    <h3 class="govuk-heading-m govuk-!-margin-top-6">
      Focus on Data Visualisation
    </h3>

    <p class="govuk-body">
      While we provide comprehensive UI components, we have a particular
      strength in data visualisation:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Chart components</strong> - Interactive, accessible charts for displaying
        government data
      </li>
      <li>
        <strong>Data tables</strong> - Advanced table components for complex datasets
      </li>
      <li>
        <strong>Dashboard elements</strong> - Components specifically designed for
        data-rich interfaces
      </li>
      <li>
        <strong>Maps</strong> - Interactive, user friendly mapping components to
        present complex geographical data
      </li>
      <li>
        <strong>Interactive infographics</strong> - Visually rich components to help
        summarise complex data in an engaging and accessible way
      </li>
      <li>
        <strong>Performance optimised</strong> - Efficient rendering of large datasets
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Our Development Philosophy
    </h2>

    <p class="govuk-body">
      We are committed to writing components in the most performant, idiomatic,
      and declarative way possible. This approach ensures:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Performant</h3>
        <p class="govuk-body">
          Every component is optimised for speed and efficiency, minimising
          bundle size and runtime overhead.
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Idiomatic & Declarative</h3>
        <p class="govuk-body">
          We follow the latest Svelte 5 best practices and use declarative
          coding patterns, making our code familiar to Svelte developers. This
          differs from the vanilla JavaScript imperative patterns used by the
          standard GOV.UK Frontend package.
        </p>
      </div>
    </div>

    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Flexible</h3>
        <p class="govuk-body">
          We design component APIs to be simple for basic use cases, but
          flexible enough for developers to customize for niche requirements.
          Clear, readable component interfaces that express what they do, not
          how they do it.
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-m">Collaborative</h3>
        <p class="govuk-body">
          Easy-to-understand, organised code that makes it simple for others to
          help contribute and maintain.
        </p>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Accessibility & Progressive Enhancement
    </h2>

    <p class="govuk-body">
      We take accessibility seriously and carefully develop all our components
      to meet the highest standards:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>WCAG compliance</strong> - All components are developed towards meeting
        WCAG 2.2 AA standards
      </li>
      <li>
        <strong>Progressive enhancement</strong> - Components work without JavaScript
        and are enhanced when it's available
      </li>
      <li>
        <strong>Device compatibility</strong> - Tested across all types of devices,
        from basic mobile phones to modern desktops
      </li>
      <li>
        <strong>Screen reader support</strong> - Proper ARIA labels, roles, and semantic
        HTML structure
      </li>
      <li>
        <strong>Keyboard navigation</strong> - Full keyboard accessibility for all
        interactive components
      </li>
    </ul>

    <InsetText>
      {#snippet content()}
        Our commitment to accessibility ensures that government services built
        with our components are usable by everyone, regardless of their
        abilities or the technology they use.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Real-World Testing & Validation
    </h2>

    <p class="govuk-body">
      We don't just build components in isolation. Our library is actively used
      and tested in real government projects:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Production usage</strong> - Components are actively used across multiple
        MHCLG digital services
      </li>
      <li>
        <strong>User research</strong> - Regular testing with real users through
        our in-house user research team
      </li>
      <li>
        <strong>UX design validation</strong> - Continuous refinement based on insights
        from our experienced UX designers
      </li>
      <li>
        <strong>Field testing</strong> - Components are battle-tested in live government
        services
      </li>
      <li>
        <strong>Iterative improvement</strong> - Regular updates based on real-world
        feedback and usage patterns
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Government Design Principles & Standards
    </h2>

    <p class="govuk-body">
      The MHCLG Svelte Component Library helps teams that work on government
      services follow the <a
        class="govuk-link"
        href="https://www.gov.uk/guidance/government-design-principles"
        >Government Design Principles</a
      >
      and
      <a class="govuk-link" href="https://www.gov.uk/service-manual"
        >GOV.UK Service Manual</a
      >. This library also follows the
      <a class="govuk-link" href="https://www.gov.uk/guidance/style-guide"
        >GOV.UK style guide</a
      >
      and
      <a class="govuk-link" href="https://www.gov.uk/guidance/content-design"
        >GOV.UK content design guidance</a
      >.
    </p>

    <p class="govuk-body">
      By using our components, you can be confident that your service will:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Meet government standards</strong> - All components are built to
        comply with established government design and content guidelines
      </li>
      <li>
        <strong>Follow proven patterns</strong> - Based on research and testing from
        across government, ensuring consistency with user expectations
      </li>
      <li>
        <strong>Maintain brand consistency</strong> - Mostly consistent with the
        GOV.UK visual identity and interaction pattern principles, but with a focus
        on data-rich interfaces where appropriate based on user research.
      </li>
      <li>
        <strong>Support service teams</strong> - Reduces the burden on teams to interpret
        and implement design guidance from scratch
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Interactive Documentation & Examples
    </h2>

    <p class="govuk-body">
      We believe in making it as easy as possible for developers to evaluate and
      implement our components:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Live playground ("Try before you buy")</strong> - Interactive documentation
        allows you to quickly tweak component props and see real-time changes. Test
        components with your own data and requirements before implementation.
      </li>
      <li>
        <strong>Copy-ready code</strong> - All examples can be copied directly into
        your codebase, saving development time
      </li>
      <li>
        <strong>Extensive usage examples</strong> - Multiple visual examples for
        each component showing different use cases and configurations
      </li>
      <li>
        <strong>Code snippets</strong> - Ready-to-use code examples of how to use
        each component that demonstrate best practices and common patterns
      </li>
    </ul>

    <InsetText>
      {#snippet content()}
        Our interactive documentation ensures you can quickly evaluate whether a
        component fits your needs and get up and running with minimal effort.
      {/snippet}
    </InsetText>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Getting Started</h2>

    <p class="govuk-body">
      Ready to start using our component library? Check out our installation
      guide and explore our comprehensive component collection.
    </p>

    <p class="govuk-body">
      <a href="/get-started" class="govuk-link govuk-!-font-weight-bold"
        >Installation guide</a
      >
      |
      <a href="/components" class="govuk-link govuk-!-font-weight-bold"
        >Browse components</a
      >
      |
      <a href="/patterns" class="govuk-link govuk-!-font-weight-bold"
        >Design patterns</a
      >
    </p>
  </div>
</div>

<style>
  .govuk-grid-column-one-third h3 {
    border-bottom: 2px solid #00625e;
    padding-bottom: 10px;
  }
</style>
