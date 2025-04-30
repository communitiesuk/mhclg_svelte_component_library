<script>
  import { TabItem } from "flowbite-svelte";

  // import { areSameLanguages } from "@maptiler/sdk";

  let {
    componentNameProp = undefined,
    data = undefined,
    // filterRows,
    textProp = undefined,
    numberProp = undefined,
    checkboxProp = false,
    dropdownProp = undefined,
    radioProp = undefined,
    jsObjectProp = [],
    functionProp = undefined,
  } = $props();

  $inspect(data[0]);

  let localCopyOfData = $state([...data]);
  // let localCopyOfData = [...data];

  $inspect(localCopyOfData[0]);

  function alphabeticalOrder() {
    localCopyOfData.sort((a, b) => a.areaName.localeCompare(b.name));
  }
  function unalphabeticalOrder() {
    console.log("button clicked");
    localCopyOfData.sort((a, b) => b.areaName.localeCompare(a.name));
    console.log(localCopyOfData[0], data[0]);
  }
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  <button onclick={alphabeticalOrder}>A-Z</button>
  <button onclick={unalphabeticalOrder}>Z-A</button>

  <div class="table-container">
    <table>
      <caption></caption>
      <thead
        ><tr>
          <th>Area</th>
          <th>Recycling rate</th>
          <th>Contamination</th>
          <th>Residual waste</th>
        </tr></thead
      >
      <tbody>
        {#each localCopyOfData as row}
          <tr>
            <td>{row["areaName"]}</td>
            <td>{row["Household waste recycling rate"]}</td>
            <td>{row["Recycling contamination rate"]}</td>
            <td>{row["Residual household waste"]}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#each [{ name: "textProp", prop: textProp }, { name: "numberProp", prop: numberProp }] as output}
    {#if output.prop != undefined}
      <div>
        <p class="mb-0">
          The <span class="font-bold">{output.name}</span> value being passed to
          the component is:
          {#if output.name === "numberProp"}
            {@render propNameAndValue("m-2", "py-2 pl-2 pr-3", numberProp)}
          {/if}
        </p>
        {#if output.name === "textProp"}
          {@render propNameAndValue(
            "ml-6 mt-4",
            "py-2 pl-2 pr-3",
            "'" + output.prop + "'",
          )}
        {/if}
      </div>
    {/if}
  {/each}

  <div class="grid grid-cols-3 gap-4 mt-6">
    {#each [{ name: "checkboxProp", prop: checkboxProp }, { name: "dropdownProp", prop: dropdownProp }, { name: "radioProp", prop: radioProp }] as card}
      {#if card.prop != undefined}
        <div class="p-2">
          <p class="my-2">
            <span class="font-bold">{card.name}</span> is set to:
          </p>
          <p class="p-2 inline-block italic bg-slate-100 rounded">
            {card.prop}
          </p>
        </div>
      {/if}
    {/each}
  </div>

  <div class="mt-10">
    <p class="font-bold">jsObjectProp:</p>
    <p>
      Click on a card to trigger a call of the functionProp, which will write to
      the console.
    </p>
    <div class="grid grid-cols-2 gap-4 mt-6 cursor-pointer">
      {#each jsObjectProp as pokemon}
        <button
          data-id={pokemon.name}
          data-role="pokemon-card"
          class="rounded p-2 grid grid-cols-[auto_1fr] gap-2"
          style="background-color: {pokemon.color};"
          onclick={(event) => functionProp(event, pokemon)}
        >
          {#each Object.keys(pokemon) as key}
            {#if key != "color"}
              <p class="m-0 p-0">{key}:</p>
              <p class="m-0 p-0">{pokemon[key]}</p>
            {/if}
          {/each}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  [data-role="pokemon-card"] {
    opacity: 0.6;
    border: 2px solid transparent;
  }

  [data-role="pokemon-card"]:hover {
    opacity: 0.8;
    border: 2px solid;
  }
  [data-role="pokemon-card"]:focus {
    opacity: 1;
    border: 2px solid;
  }

  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  button {
    background-color: green;
    padding: 20px;
    color: white;
    border-radius: 10%;
  }
</style>
