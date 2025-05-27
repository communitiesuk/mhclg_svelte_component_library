<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import Masthead from "$lib/components/ui/Masthead.svelte";
  import mastheadIllustration from "$lib/assets/images/masthead-illustration.svg";

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
    buttonHref="/components"
    backgroundColor="#00625E"
    imageSrc={mastheadIllustration}
    imageAlt="MHCLG Svelte Component Library"
  />

  <div class="govuk-width-container govuk-main-wrapper govuk-main-wrapper--l">
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
      </div>

      <div>
        <h2 class="govuk-heading-l mb-6 mt-10">Playground</h2>
        <p class="govuk-body">
          The playground is a sandbox space where developers can test code and
          practice combining components.
        </p>
        <p class="govuk-body">All our playground examples are listed below.</p>
      </div>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
  </div>
</div>

<style>
  /* Allow masthead to break out of container and span full width */
  .homepage-layout :global(.app-masthead) {
    width: 100%;
  }
</style>
