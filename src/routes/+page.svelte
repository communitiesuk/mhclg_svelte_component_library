<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import Masthead from "$lib/components/ui/Masthead.svelte";
  import mastheadIllustration from "$lib/assets/images/masthead-illustration.svg";
  import WhatsNew from "$lib/components/ui/WhatsNew.svelte";

  // Keep only playground wrappers for the homepage
  const wrappersPlaygroundsObject = import.meta.glob(
    "./../wrappers/playgrounds/*.svelte",
    {
      eager: true,
    },
  );

  const wrappersPlaygroundsArray = Object.keys(wrappersPlaygroundsObject).map(
    (el) => {
      const splitPath = el.split("/");

      return {
        component: wrappersPlaygroundsObject[el],
        name: splitPath[splitPath.length - 1].replace(".svelte", ""),
      };
    },
  );

  /**
   * && 		Description of the code, how it works and what it does.
   * ? 		  Descriptions of parameters - where they come from and what they do.
   * ! 		  Known limitations, issues, bugs or warnings - anything that developers need to be mindful of.
   * TODO		Remaining actions relating to this section of code.
   * <> 		Accessibility notes.
   */
</script>

<!--
&&			
?			
!			
TODO		
<>		
-->

<div class="homepage-layout">
  <Masthead
    title="MHCLG Svelte Component Library"
    description="Bring your service or page to life with dynamic content, layout, UI, charts, maps and data visualisations. The well tested and trusted GDS components are coded here in Svelte for data rich digital products."
    buttonHref="/get-started"
    backgroundColor="#00625E"
    imageSrc={mastheadIllustration}
    imageAlt="MHCLG Svelte Component Library"
  />
  <WhatsNew
    title="What's new"
    componentLinksIntroText="This initial alpha release includes foundational components for building government services."
    newsItems={[
      {
        date: "June 2025",
        content:
          "We launched the MHCLG Svelte Component Library alpha version. This library provides Svelte 5 implementations of GOV.UK Design System components, as well as other custom components, specifically tailored for data-rich digital products and services within the Ministry of Housing, Communities and Local Government and beyond.",
        releaseNotesUrl:
          "https://github.com/communitiesuk/oflog_svelte_component_library/releases/tag/v0.1.16",
        releaseVersion: "v0.1.16",
      },
      {
        date: "January 2025",
        content:
          "Development began on the component library infrastructure, establishing the foundation for reusable Svelte components that maintain GOV.UK Design System compliance while supporting advanced data visualisation needs.",
      },
    ]}
  />

  <div class="govuk-width-container govuk-main-wrapper govuk-main-wrapper--l">
    <div class="govuk-grid-row">
      <!-- <div
        class="govuk-grid-column-one-third-from-desktop govuk-!-margin-bottom-8"
      >
        <h2 class="govuk-heading-l govuk-!-font-weight-bold">Styles</h2>
        <p class="govuk-body">
          Make government services look like GOV.UK with Svelte implementations
          of layout, typography, colour and image guidelines.
        </p>
        <p class="govuk-body govuk-!-margin-bottom-0">
          <a href="/styles/" class="govuk-link govuk-!-font-weight-bold"
            >Browse our styles</a
          >
        </p>
      </div> -->
      <div
        class="govuk-grid-column-one-third-from-desktop govuk-!-margin-bottom-8"
      >
        <h2 class="govuk-heading-l">Components</h2>
        <p class="govuk-body">
          Save time with reusable, accessible Svelte components for forms,
          navigation, panels, tables, charts and data visualisations.
        </p>
        <p class="govuk-body govuk-!-margin-bottom-0">
          <a href="/components/" class="govuk-link govuk-!-font-weight-bold"
            >Browse our components</a
          >
        </p>
      </div>
      <div
        class="govuk-grid-column-one-third-from-desktop govuk-!-margin-bottom-8"
      >
        <h2 class="govuk-heading-l">Patterns</h2>
        <p class="govuk-body">
          Help users complete common tasks like entering data, filling in forms,
          and creating interactive dashboards with proven design patterns.
        </p>
        <p class="govuk-body govuk-!-margin-bottom-0">
          <a href="/patterns/" class="govuk-link govuk-!-font-weight-bold"
            >Browse our patterns</a
          >
        </p>
      </div>
      <div
        class="govuk-grid-column-one-third-from-desktop govuk-!-margin-bottom-8"
      >
        <h2 class="govuk-heading-l">Community</h2>
        <p class="govuk-body">
          Join our growing community of developers and designers working on
          government services. Help improve the library through discussions,
          events and collaborative design sessions.
        </p>
        <p class="govuk-body govuk-!-margin-bottom-0">
          <a href="/community/" class="govuk-link govuk-!-font-weight-bold"
            >Join our community</a
          >
        </p>
      </div>

      <div class="govuk-grid-column-full">
        <hr
          class="govuk-section-break govuk-section-break--visible govuk-section-break--xl"
        />
      </div>

      <div class="govuk-grid-column-two-thirds">
        <h2 class="govuk-heading-l">Roadmap</h2>
        <p class="govuk-body">
          See what the Component Library team at MHCLG is planning to work on
          over the next 12 months in the
          <a href="/community/roadmap/" class="govuk-link"
            >MHCLG Svelte Component Library Roadmap</a
          >.
        </p>
      </div>

      <div class="govuk-grid-column-full">
        <hr
          class="govuk-section-break govuk-section-break--visible govuk-section-break--xl"
        />
      </div>

      <div class="govuk-grid-column-two-thirds">
        <h2 class="govuk-heading-l">Principles we follow</h2>
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
          <a
            class="govuk-link"
            href="https://www.gov.uk/guidance/content-design"
            >GOV.UK content design guidance</a
          >.
        </p>

        <p class="govuk-body">
          <a class="govuk-link" href="/accessibility/accessibility-strategy/"
            >Our accessibility strategy</a
          > outlines our principles and work to improve accessibility within the
          Svelte Component Library.
        </p>
      </div>

      <div class="govuk-grid-column-full">
        <hr
          class="govuk-section-break govuk-section-break--visible govuk-section-break--xl"
        />
      </div>

      <div class="govuk-grid-column-two-thirds-from-desktop">
        <h2 id="support" class="govuk-heading-l">Support</h2>
        <p class="govuk-body">
          The MHCLG Svelte Component Library is <a
            class="govuk-link"
            href="/design-system-team/"
            >maintained by the Digital, Design and Development team at MHCLG</a
          >. If you've got a question, idea or suggestion, you can
          <a class="govuk-link" href="/get-in-touch/">contact the team</a>.
        </p>
        <p class="govuk-body">
          See <a class="govuk-link" href="/community/blogs-talks-podcasts/"
            >blog posts, video talks, and podcasts about Svelte development and
            the Component Library</a
          >.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <div>
        <!-- <h1 class="govuk-heading-xl mb-6">Introduction</h1>
        <p>
          This library has been developed by members of the MHCLG's Digital,
          Design and Development team to house components for use in the
          organisation's digital products.
        </p> -->
        <!-- 
        <p class="govuk-body">
          Check out our <a href="/user-guide" class="govuk-link">user guide</a> for
          guidance on how to build components for this library.
        </p> -->
        <DividerLine margin="1rem 0rem"></DividerLine>
      </div>
      <!-- 
      <div>
        <h2 class="govuk-heading-l mb-6 mt-10">Components</h2>
        <p class="govuk-body">
          Browse our collection of reusable UI components designed for
          consistency and accessibility.
        </p>
        <p class="govuk-body">
          <a href="/components" class="govuk-link">View all components</a> in the
          library.
        </p>
        <DividerLine margin="1rem 0rem"></DividerLine>
      </div> -->

      <!-- <div>
        <h2 class="govuk-heading-l mb-6 mt-10">Playground</h2>
        <p class="govuk-body">
          The playground is a sandbox space where developers can test code and
          practice combining components.
        </p>
        <p class="govuk-body">All our playground examples are listed below.</p>
      </div>
      <DividerLine margin="1rem 0rem"></DividerLine> -->
    </div>
  </div>
</div>

<style>
  /* Allow masthead to break out of container and span full width */
  .homepage-layout :global(.app-masthead) {
    width: 100%;
  }
</style>
