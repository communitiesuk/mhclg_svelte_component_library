<script>
  import DividerLine from "$lib/components/layout/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { foldersLookup } from "$lib/config.js";
  import ComponentDetailsUpdate from "$lib/package-wrapping/ComponentDetailsUpdate.svelte";
  import LoadArrayOfComponents from "./local-lib/LoadArrayOfComponents.svelte";

  let { data } = $props();

  const wrappersComponentsObject = import.meta.glob(
    "./../wrappers/*/*.svelte",
    {
      eager: true,
    },
  );

  const wrappersComponentsArray = Object.keys(wrappersComponentsObject).map(
    (el) => {
      const splitPath = el.split("/");

      return {
        component: wrappersComponentsObject[el],
        name: splitPath[splitPath.length - 1].replace("Wrapper.svelte", ""),
        folder: splitPath[splitPath.length - 2],
      };
    },
  );

  const wrappersPaths = Object.keys(wrappersComponentsObject);
  const wrappersFolders = wrappersPaths.map((el) => {
    const splitPath = el.split("/");
    return splitPath[splitPath.length - 2];
  });

  console.log(wrappersComponentsArray);

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


      {#each [...new Set(wrappersComponentsArray.map((el) => el.folder))] as folder}
        <h5 class="underline underline-offset-4 mt-10 mb-8">
          {textStringConversion(
            foldersLookup[folder] ?? folder,
            "title-first-word",
          )}
        </h5>
        {@const wrappersArray = wrappersComponentsArray.filter(
          (el) => el.folder === folder,
        )}
        {#each wrappersArray as wrapper}
          <ComponentDetailsUpdate {wrapper}></ComponentDetailsUpdate>
        {/each}
      {/each}

      <!-- {#each data.componentsSubFolders as subFolder}
        {#if subFolder.subFolders.length > 0}
          <h5 class="underline underline-offset-4 mt-10 mb-8">
            {subFolder.label}
          </h5>
          <LoadArrayOfComponents {subFolder}></LoadArrayOfComponents>
        {/if}
      {/each} -->
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
    <div>
      <h4 class="mb-6 mt-10">Playground</h4>
      <p>
        The playground is a sandbox space where developers can test code and
        practice combining components.
      </p>
      <p>All our playground examples are listed below.</p>
      <!-- <LoadArrayOfComponents subFolder={data.playgroundFolders}
      ></LoadArrayOfComponents> -->
    </div>

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
