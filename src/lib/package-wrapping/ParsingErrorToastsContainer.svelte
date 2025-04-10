<script>
  import { Toast } from "flowbite-svelte";
  import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";

  let {
    parametersParsingErrorsArray,
    parametersParsingErrorsObject,
    onCloseFunction,
  } = $props();

  /*() =>
            parametersParsingErrorsArray.filter((el) => el != key)*/
</script>

{#key parametersParsingErrorsArray}
  <div class="fixed bottom-0 right-0 mr-5 mb-5 z-[3]">
    {#each Object.keys(parametersParsingErrorsObject) as key}
      {#if parametersParsingErrorsObject[key]}
        <Toast
          divClass="w-100 p-4 text-gray-500 bg-white shadow gap-5"
          color="red"
          dismissable={true}
          on:close={() =>
            parametersParsingErrorsArray.filter((el) => el != key)}
        >
          <svelte:fragment slot="icon">
            <CloseCircleSolid class="w-5 h-5" />
            <span class="sr-only">Error icon</span>
          </svelte:fragment>

          Error: The <code>{key}</code> prop is not a valid JSON object.</Toast
        >
      {:else}
        <Toast
          divClass="w-100 p-4 text-gray-500 bg-white shadow gap-5"
          color="green"
          dismissable={true}
          on:close={onCloseFunction(key)}
        >
          <svelte:fragment slot="icon">
            <CheckCircleSolid class="w-5 h-5" />
            <span class="sr-only">Check icon</span>
          </svelte:fragment>

          Resolved: The <code>{key}</code> prop is valid JSON.</Toast
        >
      {/if}
    {/each}
  </div>
{/key}
