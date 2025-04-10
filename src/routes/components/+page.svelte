<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { foldersLookup } from "$lib/config.js";
  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";

  let { data } = $props();

  const wrappersComponentsObject = import.meta.glob(
    [
      "./../../wrappers/components/*/*Wrapper.svelte",
      "./../../wrappers/components/*/*/*Wrapper.svelte",
    ],
    {
      eager: true,
    },
  );

  const wrappersComponentsArray = Object.keys(wrappersComponentsObject).map(
    (el) => {
      const splitPath = el.split("/");

      // Extract the folder name - it should be after "components/"
      const componentsIndex = splitPath.findIndex(
        (segment) => segment === "components",
      );
      const folderName = splitPath[componentsIndex + 1]; // The folder name is right after "components"

      // Extract subfolder if it exists - it would be two positions after "components"
      let subFolderName = null;
      if (splitPath.length > componentsIndex + 3) {
        // +3 because we need components + folder + subfolder + filename
        subFolderName = splitPath[componentsIndex + 2];
      }

      return {
        component: wrappersComponentsObject[el],
        name: splitPath[splitPath.length - 1].replace("Wrapper.svelte", ""),
        folder: folderName,
        subFolder: subFolderName,
      };
    },
  );

  const wrappersPaths = Object.keys(wrappersComponentsObject);
  const wrappersFolders = wrappersPaths.map((el) => {
    const splitPath = el.split("/");
    return splitPath[splitPath.length - 2];
  });

  // Helper function to get a nicely formatted title for a folder
  function getFolderTitle(folder) {
    // First check if we have a mapping in foldersLookup
    if (foldersLookup[folder]) {
      // If we have a mapping, use it and fully capitalize (Data Visualisation)
      return textStringConversion(foldersLookup[folder], "title");
    } else {
      // Otherwise just capitalize each word in the folder name (Layout)
      return textStringConversion(folder, "title");
    }
  }
</script>

<div class="mt-10">
  <div class="flex flex-col">
    <div>
      <h1 class="govuk-heading-xl">Components</h1>
      <p class="mb-6">
        Browse all available components in the library. Click on any component
        to view its documentation, implementation details, and examples.
      </p>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>

    {#each [...new Set(wrappersComponentsArray.map((el) => el.folder))] as folder}
      <h2 class="govuk-heading-l mt-5">
        {getFolderTitle(folder)}
      </h2>
      {@const wrappersArray = wrappersComponentsArray.filter(
        (el) => el.folder === folder,
      )}
      <div class="flex flex-col">
        {#each [...new Set(wrappersArray.map((el) => el.subFolder))] as subFolder, index}
          {#if index != 0}<DividerLine margin="2rem 0rem"></DividerLine>{/if}
          <div class={subFolder != null ? "mx-4" : ""}>
            {#if subFolder != null}
              <h3 class="govuk-heading-m">
                {subFolder}
              </h3>
            {/if}
            <div class="flex flex-col">
              {#each wrappersArray.filter((el) => el.subFolder === subFolder) as wrapper}
                <div class="mb-6">
                  <WrapperDetailsUpdate
                    {wrapper}
                    homepage="true"
                    wrapperType="component"
                  ></WrapperDetailsUpdate>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
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
