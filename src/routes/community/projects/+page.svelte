<script>
  import WarningText from "$lib/components/content/WarningText.svelte";
  import InsetText from "$lib/components/content/InsetText.svelte";
  import RelatedContent from "$lib/components/ui/RelatedContent.svelte";
</script>

<svelte:head>
  <title>Projects - MHCLG Svelte Component Library</title>
  <meta
    name="description"
    content="Current projects using the MHCLG Svelte Component Library to improve data transparency and user experience across government services."
  />
</svelte:head>

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-xl">Projects</h1>

    <p class="govuk-body-l">
      The MHCLG Svelte Component Library is being used across several key
      projects to improve data transparency, user experience, and service
      delivery. These projects demonstrate the practical application of our
      components in real-world government services.
    </p>

    <WarningText
      assistiveText="Important"
      text="These projects are in active development. Component requirements and implementations may evolve as we gather user feedback and refine our approach."
    />

    <h2 class="govuk-heading-l">Planning Data Transparency</h2>

    <p class="govuk-body">
      Working with the planning team in MHCLG to utilise planning data to help
      solve problems and increase transparency around housing delivery. This
      project builds on existing products and aims to make planning data more
      accessible to the public and professionals.
    </p>

    <h3 class="govuk-heading-m">Key objectives</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Improve transparency around housing delivery processes</li>
      <li>Make planning data more accessible and understandable</li>
      <li>Support evidence-based decision making in planning</li>
      <li>Enhance public engagement with planning processes</li>
    </ul>

    <InsetText>
      {#snippet content()}
        This project builds on the existing <a
          href="https://www.planning.data.gov.uk/"
          class="govuk-link"
          rel="external">Planning Data platform</a
        >, extending its capabilities with improved data visualisation and user
        interaction components.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m">Component library usage</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Interactive maps and geographical data visualisation</li>
      <li>Data tables with advanced filtering and sorting</li>
      <li>Search and autocomplete functionality</li>
      <li>Charts and graphs for planning statistics</li>
      <li>Form components for data submission</li>
    </ul>

    <h2 class="govuk-heading-l">Indices of Deprivation Publication</h2>

    <p class="govuk-body">
      Building on existing solutions and static publications to unify scattered
      supplementary products and integrate better with the main GOV.UK
      publication. This project aims to create a more cohesive and user-friendly
      experience for accessing deprivation data.
    </p>

    <h3 class="govuk-heading-m">Current landscape</h3>
    <p class="govuk-body">
      The previous release comprised of a suite of different tools and outputs
      scattered across several websites and hosting platforms. Whilst working
      well and meeting the needs of the time, we'd like to move towards a more
      integrated release, embedding tools in the statistical report to make them
      more easily accessible and connected to its narrative and analysis.
    </p>

    <p class="govuk-body">
      The Indices of Deprivation are currently published across multiple
      platforms:
    </p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Main statistical release on GOV.UK</li>
      <li>
        <a
          href="https://app.powerbi.com/view?r=eyJrIjoiOTdjYzIyNTMtMTcxNi00YmQ2LWI1YzgtMTUyYzMxOWQ3NzQ2IiwidCI6ImJmMzQ2ODEwLTljN2QtNDNkZS1hODcyLTI0YTJlZjM5OTVhOCJ9"
          class="govuk-link"
          rel="external">IOD 2019 Power BI Dashboard</a
        >
      </li>
      <li>
        <a
          href="https://www.ons.gov.uk/visualisations/dvc1371/#/E07000223"
          class="govuk-link"
          rel="external">ONS Exploring local income deprivation tool</a
        >
      </li>
      <li>Interactive mapping tool</li>
      <li>Various supplementary data products</li>
      <li>Separate analysis and research outputs</li>
    </ul>

    <InsetText>
      {#snippet content()}
        View the current <a
          href="https://www.gov.uk/government/statistics/english-indices-of-deprivation-2019"
          class="govuk-link"
          rel="external">English Indices of Deprivation 2019 publication</a
        >
        and the
        <a
          href="https://dclgapps.communities.gov.uk/imd/"
          class="govuk-link"
          rel="external">interactive mapping tool</a
        >.
      {/snippet}
    </InsetText>

    <h3 class="govuk-heading-m">Integration vision</h3>
    <p class="govuk-body">
      The goal is to create a unified platform that brings together all these
      scattered tools and outputs into a cohesive experience. This would involve
      embedding interactive visualisations, dashboards, and analysis tools
      directly within the statistical report, making them more accessible and
      better connected to the narrative and analysis.
    </p>

    <h3 class="govuk-heading-m">Key objectives</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Unify scattered supplementary products into a cohesive platform</li>
      <li>Embed interactive tools within the statistical report narrative</li>
      <li>Improve integration with the main GOV.UK publication</li>
      <li>Enhance data accessibility and usability across all tools</li>
      <li>Provide better tools for data exploration and analysis</li>
      <li>Support various user needs from researchers to local authorities</li>
      <li>
        Create seamless transitions between different data views and tools
      </li>
    </ul>

    <h3 class="govuk-heading-m">Component library usage</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Advanced mapping and geographical visualisation components</li>
      <li>Multi-layered data exploration interfaces</li>
      <li>Search and filtering for areas and indicators</li>
      <li>Comparative analysis tools</li>
      <li>Data download and export functionality</li>
      <li>Responsive charts and graphs for different deprivation measures</li>
    </ul>

    <h2 class="govuk-heading-l">Cross-project benefits</h2>

    <p class="govuk-body">
      These projects share common requirements and benefit from the component
      library's unified approach:
    </p>

    <h3 class="govuk-heading-m">Shared components</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>
        <strong>Data visualisation:</strong> Charts, maps, and interactive graphics
      </li>
      <li>
        <strong>Search and filtering:</strong> Consistent patterns across all platforms
      </li>
      <li>
        <strong>Data tables:</strong> Standardised presentation of complex datasets
      </li>
      <li>
        <strong>Form handling:</strong> Robust data collection and validation
      </li>
      <li>
        <strong>Accessibility:</strong> WCAG 2.1 AA compliance across all projects
      </li>
    </ul>

    <h3 class="govuk-heading-m">Technical benefits</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li>Consistent user experience across different services</li>
      <li>Reduced development time through component reuse</li>
      <li>Shared testing and quality assurance processes</li>
      <li>Unified design system implementation</li>
      <li>Collaborative development and knowledge sharing</li>
    </ul>

    <h2 class="govuk-heading-l">Future projects</h2>

    <p class="govuk-body">
      We're continuously identifying new opportunities to apply the component
      library across MHCLG services. Future projects may include:
    </p>

    <ul class="govuk-list govuk-list--bullet">
      <li>
        A product that builds on the now retired Oflog Data Explorer tool <a
          href="https://local-authority-data-explorer.data.gov.uk/"
          class="govuk-link"
          rel="external">https://local-authority-data-explorer.data.gov.uk/</a
        >
      </li>
    </ul>

    <InsetText>
      {#snippet content()}
        If you're working on a project that could benefit from the component
        library, <a href="/community/propose-component" class="govuk-link"
          >get in touch with our team</a
        > to discuss collaboration opportunities.
      {/snippet}
    </InsetText>
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
              title: "Roadmap",
              base_path: "/community/roadmap",
            },
          ],
        },
        {
          type: "subheading",
          id: "community-involvement",
          subheading: "Ways to get involved",
          links: [
            {
              title: "Propose a component or pattern",
              base_path: "/community/propose-component",
            },
            {
              title: "Develop a component or pattern",
              base_path: "/community/develop-component",
            },
          ],
        },
        {
          type: "other",
          id: "external-tools",
          subheading: "Related platforms",
          links: [
            {
              title: "Planning Data platform",
              url: "https://www.planning.data.gov.uk/",
            },
            {
              title: "IOD 2019 Power BI Dashboard",
              url: "https://app.powerbi.com/view?r=eyJrIjoiOTdjYzIyNTMtMTcxNi00YmQ2LWI1YzgtMTUyYzMxOWQ3NzQ2IiwidCI6ImJmMzQ2ODEwLTljN2QtNDNkZS1hODcyLTI0YTJlZjM5OTVhOCJ9",
            },
            {
              title: "ONS Exploring local income deprivation",
              url: "https://www.ons.gov.uk/visualisations/dvc1371/#/E07000223",
            },
            {
              title: "English Indices of Deprivation 2019",
              url: "https://www.gov.uk/government/statistics/english-indices-of-deprivation-2019",
            },
            {
              title: "Interactive mapping tool",
              url: "https://dclgapps.communities.gov.uk/imd/",
            },
            {
              title: "Oflog Data Explorer (retired)",
              url: "https://local-authority-data-explorer.data.gov.uk/",
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
