<script>
  import DividerLine from "$lib/package-wrapping/DividerLine.svelte";
  import { textStringConversion } from "$lib/utils/text-string-conversion/textStringConversion.js";
  import { foldersLookup } from "$lib/config.js";
  import WrapperDetailsUpdate from "$lib/package-wrapping/WrapperDetailsUpdate.svelte";

  let { data } = $props();

  const wrappersComponentsObject = import.meta.glob(
    ["./../../wrappers/playgrounds/*/*Wrapper.svelte"],
    {
      eager: true,
    },
  );

  $inspect(wrappersComponentsObject);

  const wrappersComponentsArray = Object.keys(wrappersComponentsObject).map(
    (el) => {
      const splitPath = el.split("/");

      // Extract the folder name - it should be after "components/"
      const componentsIndex = splitPath.findIndex(
        (segment) => segment === "playgrounds",
      );
      const name = splitPath[componentsIndex + 1]; // The folder name is right after "components"

      return {
        component: wrappersComponentsObject[el],
        name: name,
      };
    },
  );

  $inspect(wrappersComponentsArray);
</script>

<div class="mt-10">
  <div class="flex flex-col">
    <div>
      <h1 class="govuk-heading-xl">Playground</h1>
      <p class="mb-6">
        The playground is a sandbox space where developers can test code and
        practice combining components.
      </p>
      <p class="mb-6">All our playground examples are listed below.</p>
      <DividerLine margin="1rem 0rem"></DividerLine>
    </div>

    {#each wrappersComponentsArray as page, index}
      <div class="flex flex-col">
        <div class="mb-6">
          <div
            data-role="details-container"
            class="flex flex-col gap-4 px-5 bg-teal-50 p-5 rounded-lg"
          >
            <div data-role="name-and-pill-container">
              <a
                class="link-to-other-page"
                href={`/playgrounds-update/${page.name}`}
                ><h6>{page.name}</h6>
              </a>
            </div>
          </div>
        </div>
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
