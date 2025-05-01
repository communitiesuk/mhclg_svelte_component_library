<script>
  import { TabItem } from "flowbite-svelte";

  // import { areSameLanguages } from "@maptiler/sdk";

  let {
    componentNameProp = undefined,
    data = undefined,
    jsObjectProp = [],
    functionProp = undefined,
  } = $props();

  let localCopyOfData = $state([...data]);

  $inspect(localCopyOfData);

  let sortState = $state({ column: "sortedColumn", order: "ascending" });

  function updateSortState(columnToSort, sortOrder) {
    sortState.column = columnToSort;
    sortState.order = sortOrder;
  }

  function sortFunction() {
    if (typeof localCopyOfData[0][sortState["column"]] === "number") {
      if (sortState.order === "ascending") {
        localCopyOfData.sort(
          (a, b) => a[sortState.column] - b[sortState.column],
        );
      } else {
        localCopyOfData.sort(
          (a, b) => b[sortState.column] - a[sortState.column],
        );
      }
    }
    if (typeof localCopyOfData[0][sortState["column"]] === "string") {
      if (sortState.order === "ascending") {
        localCopyOfData.sort((a, b) => a.areaName.localeCompare(b.name));
      } else {
        localCopyOfData.sort((a, b) => b.areaName.localeCompare(a.name));
      }
    }
  }
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  <div class="buttons-container">
    <button
      class="ascending"
      onclick={() => {
        updateSortState("areaName", "ascending");
        sortFunction();
      }}>▲</button
    >
    <button
      class="descending"
      onclick={() => {
        updateSortState("areaName", "descending");
        sortFunction();
      }}>▼</button
    >
    <button
      class="ascending"
      onclick={() => {
        updateSortState("Household waste recycling rate", "ascending");
        sortFunction();
      }}>▲</button
    >
    <button
      class="descending"
      onclick={() => {
        updateSortState("Household waste recycling rate", "descending");
        sortFunction();
      }}>▼</button
    >
    <button
      class="ascending"
      onclick={() => {
        updateSortState("Recycling contamination rate", "ascending");
        sortFunction();
      }}>▲</button
    >
    <button
      class="descending"
      onclick={() => {
        updateSortState("Recycling contamination rate", "descending");
        sortFunction();
      }}>▼</button
    >
    <button
      class="ascending"
      onclick={() => {
        updateSortState("Residual household waste", "ascending");
        sortFunction();
      }}>▲</button
    >
    <button
      class="descending"
      onclick={() => {
        updateSortState("Residual household waste", "descending");
        sortFunction();
      }}>▼</button
    >
  </div>

  <div class="table-container">
    <table>
      <caption></caption>
      <thead
        ><tr>
          <th>Area</th>
          <th
            >Household waste recycling rate (%) <br /><span
              class="metric-explainer"
              >The proportion of household waste sent for recyling</span
            ></th
          >
          <th
            >Recycling contamination rate (%) <br /><span
              class="metric-explainer"
              >The proportion of household waste sent for recyling that cannot
              be recyled</span
            ></th
          >
          <th
            >Residual household waste (kg per household) <br /><span
              class="metric-explainer"
              >Non-recyclable waste per household, measured by weight</span
            ></th
          >
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
    max-height: 600px;
    overflow-y: auto;
  }

  button {
    background-color: green;
  }

  .ascending {
    background-color: #ff7f7f;
  }
  .descending {
    background-color: #add8e6;
  }
  .buttons-container {
    display: flex;
    gap: 20px;
  }
  .buttons-container > button {
    flex: 1;
    padding: 0px;
    color: white;
    border-radius: 50%;
  }
  .metric-explainer {
    font-size: 13px;
    font-style: italic;
    font-weight: 400;
  }
</style>
