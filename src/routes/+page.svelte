<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { foldersLookup } from "$lib/config.js";
  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";

  let { data } = $props();

  const wrappersComponentsObject = import.meta.glob(
    [
      "./../wrappers/components/*/*Wrapper.svelte",
      "./../wrappers/components/*/*/*Wrapper.svelte",
    ],
    {
      eager: true,
    },
  );

  const wrappersComponentsArray = Object.keys(wrappersComponentsObject).map(
    (el) => {
      const splitPath = el.split("/");

      console.log(splitPath);

      return {
        component: wrappersComponentsObject[el],
        name: splitPath[splitPath.length - 1].replace("Wrapper.svelte", ""),
        folder: splitPath[3],
        subFolder: splitPath.length === 6 ? splitPath[4] : null,
      };
    },
  );

  const wrappersPaths = Object.keys(wrappersComponentsObject);
  const wrappersFolders = wrappersPaths.map((el) => {
    const splitPath = el.split("/");
    return splitPath[splitPath.length - 2];
  });

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

<div class="g-top-level-container">
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="mb-6">Introduction</h4>
      <p>
        This library has been developed by members of the MHCLG's Digital,
        Design and Development team to house components for use in the
        organisation's digital products.
      </p>

      <p>
        Check out our <a href="/user-guide">user guide</a> for guidance on how to
        build components for this library.
      </p>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>

    <div>
      <h4 class="mb-6">Components</h4>
      <p>The components available in this library are listed below.</p>
      <p>
        Click on a link to visit a component's wrapper page, where you can view
        and test out the component's parameters and see example use cases.
      </p>

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
        <div class="flex flex-col gap-8">
          {#each [...new Set(wrappersArray.map((el) => el.subFolder))] as subFolder, index}
            {#if index != 0}<DividerLine></DividerLine>{/if}
            <div>
              {#if subFolder != null}
                <h6 class="mb-3 p-0">{subFolder}</h6>
              {/if}
              <div class="flex flex-col gap-8">
                {#each wrappersArray.filter((el) => el.subFolder === subFolder) as wrapper}
                  <WrapperDetailsUpdate
                    {wrapper}
                    homepage="true"
                    wrapperType="component"
                  ></WrapperDetailsUpdate>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/each}
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>
    <!-- <div>
      <h4 class="mb-6 mt-10">Playground</h4>
      <p>
        The playground is a sandbox space where developers can test code and
        practice combining components.
      </p>
      <p>All our playground examples are listed below.</p>
      {#each wrappersPlaygroundsArray as wrapper}
        <WrapperDetailsUpdate {wrapper} homepage="true" wrapperType="playground"
        ></WrapperDetailsUpdate>
      {/each}
      
    </div>
    <DividerLine margin="1rem 0rem"></DividerLine> -->
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
