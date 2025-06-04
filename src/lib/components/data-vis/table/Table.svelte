<script>
  import Button from "$lib/components/ui/Button.svelte";

  let {
    data = undefined,
    metaData = undefined,
    caption = undefined,
    colourScale = undefined,
  } = $props();

  let localCopyOfData = $state([...data]);

  function hasUniqueValues(array, key) {
    const seen = new Set();
    for (const obj of array) {
      if (seen.has(obj[key])) {
        return false; // Duplicate found
      }
      seen.add(obj[key]);
    }
    return true; // All values are unique
  }

  // $inspect(
  //   localCopyOfData[0].areaName,
  //   "data type is",
  //   typeof localCopyOfData[0].areaName,
  // );
  // $inspect(
  //   localCopyOfData[0]["Household waste recycling rate"],
  //   "data type is",
  //   typeof localCopyOfData[0]["Household waste recycling rate"],
  // );

  let columns = [];

  for (const column in localCopyOfData[0]) {
    // create a variable to store whether the key is unique or not
    const keyIsUnique = hasUniqueValues(localCopyOfData, column);
    // get data type of each column
    const columnDataType = typeof localCopyOfData[0][column];
    // for each one create an object and push it into the array
    const columnObject = {
      key: column,
      isUnique: keyIsUnique,
      dataType: columnDataType,
    };
    columns.push(columnObject);
  }

  $inspect("columns array is ", columns);

  const metrics = columns
    .filter((column) => column.dataType === "number")
    .map((column) => column.key);

  $inspect("metrics is", metrics);

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

  // calculate the min and max of each metric
  const minAndMaxValues = {}; // create an empty object to store them in
  for (const metric of metrics) {
    // get the values
    const metricValues = localCopyOfData.map((item) => item[metric]);
    const min = Math.min(...metricValues);
    const max = Math.max(...metricValues);
    // store them
    minAndMaxValues[metric] = { min, max };
  }

  localCopyOfData = localCopyOfData.map((row) => {
    const rowWithNorms = { ...row };

    for (const metric of metrics) {
      const { min, max } = minAndMaxValues[metric];
      const value = row[metric];
      const normalisedValue = (value - min) / (max - min);

      rowWithNorms[`${metric}__normalised`] = normalisedValue;
    }

    return rowWithNorms;
  });

  function normToColor(norm) {
    const hue = 120 * norm;
    return `hsl(${hue}, 100%, 80%)`;
  }

  function normToColorReverse(norm) {
    const hue = 120 * (1 - norm);
    return `hsl(${hue}, 100%, 80%)`;
  }

  const colorKey = Object.entries({ Good: 1, Ok: 0.5, Bad: 0 });

  $inspect("the first column key is", columns[0].key);
</script>

<div class="p-4">
  {#if colourScale === "On"}
    <div class="legend">
      <div>Colour key:</div>
      {#each colorKey as key}
        <div class="color-keys" style="background-color: {normToColor(key[1])}">
          {key[0]}
        </div>
      {/each}
    </div>
  {/if}

  <div class="table-container">
    <div id="table-caption" class="sticky-caption">{caption}</div>
    <table class="govuk-table" data-module="moj-sortable-table">
      <!-- <caption class="govuk-table__caption"></caption> -->
      <thead class="govuk-table__head"
        ><tr class="govuk-table__row">
          {#each columns as column}
            <th
              scope="col"
              class={`govuk-table__header ${column.dataType === "number" ? "govuk-table__header--numeric" : ""}`}
              title={metaData[column.key].explainer}
              aria-sort="none"
            >
              <div class="header">
                <Button
                  textContent={metaData[column.key].shortLabel}
                  buttonType={"table header"}
                  onClickFunction={() => {
                    const newDirection =
                      sortState.column === column.key &&
                      sortState.order === "ascending"
                        ? "descending"
                        : "ascending";

                    updateSortState(column.key, newDirection);
                    sortFunction();
                  }}
                ></Button>
              </div></th
            >
          {/each}
        </tr></thead
      >
      <tbody class="govuk-table__body">
        {#each localCopyOfData as row}
          <tr class="govuk-table__row">
            {#each columns as column}
              {#if column.dataType === "number"}
                {#if colourScale === "On"}
                  {#if metaData[column.key].direction === "Higher is better"}
                    <td
                      class="govuk-table__cell govuk-table__cell--numeric"
                      style="background-color: {normToColor(
                        row[column.key + '__normalised'],
                      )}"
                      data-sort-value="42">{row[column.key]}</td
                    >
                  {:else}
                    <td
                      class="govuk-table__cell govuk-table__cell--numeric"
                      style="background-color: {normToColorReverse(
                        row[column.key + '__normalised'],
                      )}"
                      data-sort-value="42">{row[column.key]}</td
                    >
                  {/if}
                {:else}
                  <td
                    class="govuk-table__cell govuk-table__cell--numeric"
                    data-sort-value="42">{row[column.key]}</td
                  >
                {/if}
              {:else}
                <td class="govuk-table__cell">{row[column.key]}</td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  :root {
    --column-width: 150px;
  }

  .table-container {
    max-height: 85vh;
    overflow-y: auto;
    border: solid grey 1px;
    width: 100%;
    overflow-x: auto;
    max-width: calc(var(--column-width) * 2);
  }

  .govuk-table {
    min-width: max-content;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  .responsive-table th:nth-child(1),
  .responsive-table td:nth-child(1) {
    max-width: 150px;
    width: 150px;
    white-space: normal; /* allow wrapping */
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Base: Mobile-first — show only first 2 columns */
  /* .govuk-table th:nth-child(n + 3),
  .govuk-table td:nth-child(n + 3) {
    display: none;
  } */

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
  }

  .sticky-caption {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: white;
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px;
  }
  .color-keys {
    border-radius: 10%;
    padding: 6px;
  }
</style>
