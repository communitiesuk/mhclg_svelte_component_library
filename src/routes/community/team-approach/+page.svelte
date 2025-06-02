<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
</script>

{#snippet TeamSnippet()}
  <strong>Multidisciplinary expertise:</strong> Our team brings together specialists
  in frontend development, data visualisation, user research, interaction design,
  data engineering, and product management to create components that truly meet user
  needs.
{/snippet}

<svelte:head>
  <title>Our team and delivery approach - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Learn about the multidisciplinary team behind the MHCLG Svelte Component Library and our agile delivery approach."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-full">
    <h1 class="govuk-heading-xl">Our team and delivery approach</h1>

    <p class="govuk-body-l">
      The MHCLG Svelte Component Library is built by a multidisciplinary team of
      specialists working together using agile methodologies. We combine deep
      technical expertise with user-centred design principles to create
      components that solve real problems for government applications.
    </p>

    <InsetText content={TeamSnippet} />

    <h2 class="govuk-heading-l">Our vision and mission</h2>

    <p class="govuk-body">
      As a team, we're trailblazers in creating design patterns and components
      specifically for data-rich government products. While most design systems
      focus on traditional services and basic UI components, we're pioneering a
      comprehensive approach to data visualisation, interactive analytics, and
      complex data storytelling that meets the highest government standards.
    </p>

    <h3 class="govuk-heading-m">The problem we're solving</h3>

    <p class="govuk-body">
      At MHCLG, we own and publish large statistical datasets that provide
      crucial insights for understanding our communities and informing policy
      decisions. However, traditional government publishing platforms have
      significant limitations for presenting complex data effectively. For
      example, GOV.UK supports basic tables, simple charts and embedded html for
      custom charts, but these must be individually created on single pages,
      making it impractical to scale across many geographical areas or create
      interactive data experiences that users increasingly expect.
    </p>

    <!-- <p class="govuk-body">
      We have clear evidence of need for sophisticated data products across
      multiple audiences:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>MHCLG analysts and policy professionals</strong> - Need tools to
        explore and understand departmental data
      </li>
      <li>
        <strong>Other government departments (OGDs)</strong> - Require access to
        MHCLG insights for cross-government collaboration
      </li>
      <li>
        <strong>Public sector bodies</strong> - Local authorities and agencies need
        data to inform local decision-making
      </li>
      <li>
        <strong>Citizens and communities</strong> - The public deserves accessible
        insights about their local areas
      </li>
    </ul> -->

    <!-- <h3 class="govuk-heading-m">Why we build our own components</h3>

    <p class="govuk-body">
      Off-the-shelf dashboard solutions like PowerBI, Tableau, and RShiny present significant challenges for government use:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-half">
        <h4 class="govuk-heading-s">Accessibility limitations</h4>
        <p class="govuk-body-s">
          As the Government Analysis Function notes, these tools "are difficult to make accessible" and don't provide sufficient control over UI elements for keyboard and screen reader navigation. Claims of "full accessibility" often don't meet UK legal requirements.
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <h4 class="govuk-heading-s">User experience constraints</h4>
        <p class="govuk-body-s">
          Dashboards aren't always the best way to present data insights. Some users are better served by text commentary, interactive narratives, or custom visualisation approaches that off-the-shelf tools can't provide.
        </p>
      </div>
    </div> -->

    <h3 class="govuk-heading-m">Our strategic approach</h3>

    <p class="govuk-body">
      Rather than building each digital product from scratch - which would be
      inefficient and face numerous hurdles - we're taking a strategic,
      component-based approach that creates reusable solutions specifically
      designed for data-rich government products.
    </p>

    <div class="govuk-inset-text">
      <p>
        <strong>Our vision:</strong> To be the one-stop shop for everything needed
        to build sophisticated, accessible data products in government - eliminating
        the need to piece together solutions from multiple sources or compromise
        on government standards.
      </p>
    </div>

    <h4 class="govuk-heading-s">Pioneering data-rich design patterns</h4>

    <p class="govuk-body">
      While other design systems focus on traditional service patterns (forms,
      content pages, transactions), we're creating the first comprehensive
      library specifically for data-rich products:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Interactive data visualisation components</strong> - Charts, maps,
        and complex data displays that work seamlessly with assistive technologies
      </li>
      <li>
        <strong>Data exploration patterns</strong> - Search, filtering, and navigation
        patterns optimised for large datasets
      </li>
      <li>
        <strong>Statistical storytelling components</strong> - Tools for creating
        compelling data narratives that engage diverse audiences
      </li>
      <li>
        <strong>Geographic data patterns</strong> - Specialised components for location-based
        insights and mapping
      </li>
      <li>
        <strong>Performance analytics interfaces</strong> - Components designed specifically
        for government performance data and metrics
      </li>
    </ul>

    <h4 class="govuk-heading-s">Modern technology leadership</h4>

    <p class="govuk-body">
      We're advocates for modern web technologies that deliver superior
      performance, accessibility, and developer experience while meeting all
      government standards:
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-half">
        <h5 class="govuk-heading-s">Svelte and SvelteKit expertise</h5>
        <p class="govuk-body-s">
          Our team has deep expertise in Svelte 5 and SvelteKit, technologies
          that deliver exceptional performance through compile-time
          optimisation. We champion these modern frameworks over other
          approaches like PowerBI, Tableau, React SPAs or Plotly Dash
          applications that often struggle with accessibility and performance at
          scale.
        </p>
      </div>
      <div class="govuk-grid-column-one-half">
        <h5 class="govuk-heading-s">Progressive enhancement principles</h5>
        <p class="govuk-body-s">
          We build components that work without JavaScript and enhance
          progressively - ensuring accessibility, resilience, and compliance
          with government standards. This approach delivers better user
          experiences than traditional SPA architectures while maintaining
          modern development practices.
        </p>
      </div>
    </div>

    <h4 class="govuk-heading-s">Best practice knowledge sharing</h4>

    <p class="govuk-body">
      Beyond building components, we're committed to sharing our expertise and
      advocating for modern approaches that meet government needs:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Technical guidance</strong> - Sharing best practices for building
        accessible, performant data products
      </li>
      <li>
        <strong>Framework advocacy</strong> - Demonstrating how modern technologies
        can deliver better outcomes than legacy approaches
      </li>
      <li>
        <strong>Standards compliance</strong> - Showing how to meet WCAG 2.1 AA,
        Government Service Standard, and performance requirements
      </li>
      <li>
        <strong>Community building</strong> - Creating a network of practitioners
        focused on government data products
      </li>
    </ul>

    <!-- <h4 class="govuk-heading-s">Key principles of our approach</h4>

    <ul class="govuk-list govuk-list--bullet">
      <li><strong>Reusability first</strong> - Every component we build can be used across multiple projects and departments</li>
      <li><strong>Accessibility by design</strong> - All components meet WCAG 2.1 AA standards and work seamlessly with assistive technologies</li>
      <li><strong>Government Service Standard compliance</strong> - Our solutions help teams meet all 14 points of the standard</li>
      <li><strong>Performance optimised</strong> - Components are built for speed and efficiency, crucial for large datasets</li>
      <li><strong>User-centred design</strong> - Every component is based on real user research and tested with actual users</li>
      <li><strong>Open source collaboration</strong> - We work in the open, sharing our solutions with the wider government community</li>
    </ul> -->

    <h3 class="govuk-heading-m">Impact and future vision</h3>

    <p class="govuk-body">
      Our work is establishing new standards for government data products,
      moving beyond the limitations of traditional dashboard tools and basic
      service patterns. We're creating infrastructure that enables teams across
      government to build sophisticated data experiences that rival the best
      commercial products while exceeding government accessibility and inclusion
      standards.
    </p>
    <!-- 
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Comprehensive solution</strong> - Everything needed for data-rich
        products in one place, eliminating the need to cobble together solutions
        from multiple sources
      </li>
      <li>
        <strong>Modern technology adoption</strong> - Demonstrating how cutting-edge
        frameworks can deliver better outcomes than legacy approaches
      </li>
      <li>
        <strong>Accessibility leadership</strong> - Setting new benchmarks for accessible
        data visualisation in government
      </li>
      <li>
        <strong>Performance excellence</strong> - Proving that government products
        can be fast, responsive, and delightful to use
      </li>
      <li>
        <strong>Cross-government impact</strong> - Enabling departments to build
        world-class data products without starting from scratch
      </li>
    </ul> -->

    <p class="govuk-body">
      As we continue to develop and refine our component library, we're not just
      building tools - we're establishing a new blueprint for how government
      presents and interacts with data, one that puts user needs, accessibility,
      and modern web standards at the centre of everything we do.
    </p>

    <h2 class="govuk-heading-l">Our team structure</h2>

    <p class="govuk-body">
      Our Digital Design and Development team is organised around core
      disciplines, with each member bringing unique expertise while
      collaborating closely across functions.
    </p>

    <h3 class="govuk-heading-m">Leadership and strategy</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Head of Digital Design and Development</strong> - Provides strategic
        oversight and direction for all digital products and services
      </li>
      <li>
        <strong>Product Owner</strong> - Ensures products meet user needs and strategic
        goals, with a strong statistical analysis background
      </li>
      <li>
        <strong>Project Manager</strong> - Manages resources, develops business cases,
        and oversees project delivery
      </li>
    </ul>

    <h3 class="govuk-heading-m">User-centred design</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Lead User Researcher and UCD Lead</strong> - Identifies user needs
        and ensures inclusive design across all user groups
      </li>
      <li>
        <strong>Senior Interaction Designer</strong> - Creates user interfaces and
        prototypes based on user research findings
      </li>
    </ul>

    <h3 class="govuk-heading-m">Frontend development and data visualisation</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Lead Frontend Developer and Data Visualisation Expert</strong> -
        Coordinates frontend development team and bridges product goals with design
      </li>
      <li>
        <strong>Lead Developer</strong> - Co-leads the multidisciplinary team and
        defines technical strategy
      </li>
      <li>
        <strong>Senior Data Visualisation Frontend Developers</strong> - Specialists
        in creating interactive charts, maps, and data communication tools
      </li>
      <li>
        <strong>Frontend Developers</strong> - Build and maintain components using
        modern technologies like Svelte
      </li>
    </ul>

    <h3 class="govuk-heading-m">Data engineering and infrastructure</h3>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Head of Data Engineering</strong> - Oversees data engineering initiatives
        and supports wider data science use
      </li>
      <li>
        <strong>Lead Data Engineer</strong> - Manages data collection, processing,
        and storage for all products
      </li>
      <li>
        <strong>Data Engineers</strong> - Build and maintain data pipelines and database
        systems
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Our expertise</h2>

    <p class="govuk-body">
      Our team combines diverse backgrounds and specialist knowledge to create
      comprehensive solutions.
    </p>

    <div class="govuk-grid-row govuk-!-margin-top-6">
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Technical specialisms</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Frontend development (Svelte, React, JavaScript)</li>
          <li>Data visualisation and interactive charts</li>
          <li>Web accessibility and inclusive design</li>
          <li>Data engineering and pipeline development</li>
          <li>Cloud infrastructure and DevOps</li>
          <li>Search engine optimisation</li>
          <li>Web analytics and performance monitoring</li>
        </ul>
      </div>
      <div class="govuk-grid-column-one-half">
        <h3 class="govuk-heading-s">Domain expertise</h3>
        <ul class="govuk-list govuk-list--bullet">
          <li>Government Statistical Service (GSS) standards</li>
          <li>Local government data and performance metrics</li>
          <li>Statistical analysis and modelling</li>
          <li>User research and usability testing</li>
          <li>Policy intent and business needs analysis</li>
          <li>Data journalism and communication</li>
          <li>Operational research and decision science</li>
        </ul>
      </div>
    </div>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Our delivery approach</h2>

    <p class="govuk-body">
      We use agile methodologies adapted to our team's needs, with a focus on
      collaboration, continuous improvement, and delivering value to users.
    </p>

    <h3 class="govuk-heading-m">Sprint structure</h3>

    <p class="govuk-body">We work in 15-day cycles consisting of:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>12-day sprints</strong> - Active development and delivery work
      </li>
      <li>
        <strong>3-day breaks</strong> - Planning, retrospectives, learning and development
      </li>
    </ul>

    <h4 class="govuk-heading-s">Sprint timeline</h4>
    <ul class="govuk-list govuk-list--bullet">
      <li><strong>Week 1:</strong> Sprint starts Tuesday (4 days)</li>
      <li><strong>Week 2:</strong> Full development week (5 days)</li>
      <li><strong>Week 3:</strong> Sprint ends Wednesday (3 days)</li>
      <li>
        <strong>Break:</strong> Thursday-Monday for planning and reflection
      </li>
    </ul>

    <h3 class="govuk-heading-m">Daily practices</h3>

    <h4 class="govuk-heading-s">Stand-ups (15 minutes daily)</h4>
    <p class="govuk-body">
      Daily check-ins during sprints to identify blockers and coordinate work.
      We alternate between:
    </p>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Board walk-throughs</strong> (Monday, Wednesday, Friday) - Review
        tickets and discuss issues
      </li>
      <li>
        <strong>Team round-robins</strong> (Tuesday, Thursday) - Share progress and
        flag discussions needed
      </li>
    </ul>

    <h4 class="govuk-heading-s">Weekly team meetings (45 minutes)</h4>
    <p class="govuk-body">
      Every Wednesday for non-sprint discussions, team updates, and relationship
      building with rotating chairs.
    </p>

    <h4 class="govuk-heading-s">Learning hour</h4>
    <p class="govuk-body">
      Dedicated weekly time for learning and development activities, supporting
      continuous skill growth.
    </p>

    <h3 class="govuk-heading-m">Sprint planning process</h3>

    <div class="govuk-grid-row govuk-!-margin-top-4">
      <div class="govuk-grid-column-one-third">
        <h4 class="govuk-heading-s">Thursday: Sprint goals</h4>
        <p class="govuk-body-s">
          Leadership team agrees sprint goals in 30 minutes, focusing on clear
          outcomes and priorities.
        </p>
      </div>
      <div class="govuk-grid-column-one-third">
        <h4 class="govuk-heading-s">Thursday: Planning</h4>
        <p class="govuk-body-s">
          Goal leads work with team members to plan tickets, considering
          capacity and team availability.
        </p>
      </div>
      <div class="govuk-grid-column-one-third">
        <h4 class="govuk-heading-s">Friday: Finalisation</h4>
        <p class="govuk-body-s">
          Whole team reviews and agrees final tickets, ensuring realistic
          workload for the sprint.
        </p>
      </div>
    </div>

    <h3 class="govuk-heading-m">Continuous improvement</h3>

    <h4 class="govuk-heading-s">Retrospectives (55 minutes)</h4>
    <p class="govuk-body">
      End-of-sprint reviews to identify what went well and areas for
      improvement, with rotating facilitation.
    </p>

    <h4 class="govuk-heading-s">Show and tells (25 minutes)</h4>
    <p class="govuk-body">
      Regular demonstrations of work in progress, celebrating achievements and
      keeping the team connected to all ongoing work.
    </p>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Working principles</h2>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>User needs first</strong> - All decisions are grounded in user research
        and real user problems
      </li>
      <li>
        <strong>Multidisciplinary collaboration</strong> - We work across disciplines
        to create holistic solutions
      </li>
      <li>
        <strong>Continuous learning</strong> - We invest in skill development and
        knowledge sharing
      </li>
      <li>
        <strong>Accessibility by design</strong> - We build inclusive solutions from
        the start
      </li>
      <li>
        <strong>Open and transparent</strong> - We work in the open and share our
        processes
      </li>
      <li>
        <strong>Evidence-based decisions</strong> - We use data and research to guide
        our choices
      </li>
      <li>
        <strong>Iterative improvement</strong> - We release early, gather feedback,
        and continuously improve
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">
      Team culture and values
    </h2>

    <p class="govuk-body">
      Our team culture emphasises collaboration, learning, and mutual support.
      We believe in:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Open communication</strong> - Team members are encouraged to share
        ideas and ask questions
      </li>
      <li>
        <strong>Flexible working</strong> - We accommodate different working patterns
        and personal needs
      </li>
      <li>
        <strong>Mentoring and development</strong> - Experienced team members actively
        support junior colleagues
      </li>
      <li>
        <strong>Cross-functional learning</strong> - We encourage understanding across
        different disciplines
      </li>
      <li>
        <strong>Innovation and experimentation</strong> - We try new approaches and
        learn from both successes and failures
      </li>
      <li>
        <strong>Diversity and inclusion</strong> - We actively work to create an
        inclusive environment for all team members
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Quality assurance</h2>

    <p class="govuk-body">We maintain high standards through:</p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Peer review</strong> - All code and design work is reviewed by team
        members
      </li>
      <li>
        <strong>User testing</strong> - Regular testing with real users to validate
        our solutions
      </li>
      <li>
        <strong>Accessibility testing</strong> - Comprehensive testing with assistive
        technologies
      </li>
      <li>
        <strong>Performance monitoring</strong> - Continuous monitoring of component
        performance and usage
      </li>
      <li>
        <strong>Documentation standards</strong> - Clear documentation for all components
        and patterns
      </li>
      <li>
        <strong>Version control</strong> - Systematic approach to managing changes
        and releases
      </li>
    </ul>

    <h2 class="govuk-heading-l govuk-!-margin-top-8">Get involved</h2>

    <p class="govuk-body">
      Interested in working with our team or learning more about our approach?
      We're always happy to share our experiences and learn from others.
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        <a
          href="mailto:dataexplorerfeedback@communities.gov.uk"
          class="govuk-link"
        >
          Contact us
        </a> to discuss collaboration opportunities
      </li>
      <li>
        <a href="/community/contribute/" class="govuk-link">
          Learn how to contribute
        </a> to our component library
      </li>
      <li>
        <a href="/community/principles/" class="govuk-link">
          Read our community principles
        </a> for more about our values
      </li>
    </ul>
  </div>
</div>
