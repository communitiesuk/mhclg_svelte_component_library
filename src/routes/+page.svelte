<script>
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import LoadArrayOfComponents from "./local-lib/LoadArrayOfComponents.svelte";

  let { data } = $props();

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

<div class="flex flex-col gap-6">
  <div>
    <h1 class="govuk-heading-xl mb-6">Introduction</h1>
    <p class="govuk-body">
      This library has been developed by members of the MHCLG's Data Tools team
      to house components for use in the organisation's public facing products.
    </p>

    <p class="govuk-body">
      Check out our <a href="/user-guide" class="govuk-link">user guide</a> for guidance
      on how to build components for this library.
    </p>
    <DividerLine margin="1rem 0rem"></DividerLine>
  </div>

  <div>
    <h2 class="govuk-heading-l mb-6 mt-10">Components</h2>
    <p class="govuk-body">
      Browse our <a href="/components" class="govuk-link">component library</a> to
      see all the available components.
    </p>
    <p class="govuk-body">
      Each component page shows documentation, parameters, and usage examples.
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
    <LoadArrayOfComponents subFolder={data.playgroundFolders}
    ></LoadArrayOfComponents>
  </div>
  <DividerLine margin="1rem 0rem"></DividerLine>
</div>

<style>
  /**
	* &&		
	* ?			
	* !			
	* TODO		
	* <>		
	*/
</style>
