<script lang="ts">
  import InsetText from "$lib/components/content/InsetText.svelte";
  import WarningText from "$lib/components/content/WarningText.svelte";
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
      components that solve real problems for government services.
    </p>

    <InsetText content={TeamSnippet} />

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
