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

  // heat map
  const recyclingValues = localCopyOfData.map(
    (item) => item["Household waste recycling rate"],
  );
  const recyclingMin = Math.min(...recyclingValues);
  const recyclingMax = Math.max(...recyclingValues);

  const contaminationValues = localCopyOfData.map(
    (item) => item["Recycling contamination rate"],
  );
  const contaminationMin = Math.min(...contaminationValues);
  const contaminationMax = Math.max(...contaminationValues);

  const wasteValues = localCopyOfData.map(
    (item) => item["Residual household waste"],
  );
  const wasteMin = Math.min(...wasteValues);
  const wasteMax = Math.max(...wasteValues);

  localCopyOfData = localCopyOfData.map((item) => ({
    ...item,
    recyclingNorm:
      (item["Household waste recycling rate"] - recyclingMin) /
      (recyclingMax - recyclingMin),
    contaminationNorm:
      (item["Recycling contamination rate"] - contaminationMin) /
      (contaminationMax - contaminationMin),
    wasteNorm:
      (item["Residual household waste"] - wasteMin) / (wasteMax - wasteMin),
  }));

  function normToColor(norm) {
    const hue = 120 * norm;
    return `hsl(${hue}, 100%, 80%)`;
  }

  function normToColorReverse(norm) {
    const hue = 120 * (1 - norm);
    return `hsl(${hue}, 100%, 80%)`;
  }
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  <br />

  <div class="legend">
    <div class="good" style="background-color: {normToColor(1)}">Good</div>
    <div class="good" style="background-color: {normToColor(0.5)}">Ok</div>
    <div class="bad" style="background-color: {normToColor(0)}">Bad</div>
  </div>

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
            <td style="background-color: {normToColor(row.recyclingNorm)}"
              >{row["Household waste recycling rate"]}</td
            >
            <td
              style="background-color: {normToColorReverse(
                row.contaminationNorm,
              )}">{row["Recycling contamination rate"]}</td
            >
            <td style="background-color: {normToColorReverse(row.wasteNorm)}"
              >{row["Residual household waste"]}</td
            >
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
  .legend {
    display: flex;
    gap: 20px;
    margin: 10px;
  }

  .legend > * {
    border-radius: 10%;
    padding: 6px;
  }
</style>
