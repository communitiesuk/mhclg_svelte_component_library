<script>
  import Button from "$lib/components/ui/Button.svelte";

  let {
    componentNameProp = undefined,
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

  $inspect(localCopyOfData[0]);

  let columns = [];

  for (const key in localCopyOfData[0]) {
    // create a variable to store whether the key is unique or not
    const keyIsUnique = hasUniqueValues(localCopyOfData, key);
    console.log(keyIsUnique);

    // for each one create an object and push it into the array
    const columnObject = { key: key, isUnique: keyIsUnique };
    columns.push(columnObject);
  }

  $inspect("columns array is ", columns);

  const metrics = Object.keys(localCopyOfData[0]).slice(
    1,
    localCopyOfData[0].length,
  );

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
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

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
    <table class="govuk-table" data-module="moj-sortable-table">
      <caption class="govuk-table__caption">{caption}</caption>
      <thead class="govuk-table__head"
        ><tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header" aria-sort="ascending"
            >Area</th
          >
          {#each metrics as metric}
            <th
              scope="col"
              class="govuk-table__header govuk-table__header--numeric"
              title={metaData[metric].explainer}
              aria-sort="none"
            >
              <div class="header">
                <Button
                  textContent={metaData[metric].shortLabel}
                  buttonType={"table header"}
                  onClickFunction={() => {
                    const newDirection =
                      sortState.column === metric &&
                      sortState.order === "ascending"
                        ? "descending"
                        : "ascending";

                    updateSortState(metric, newDirection);
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
            <td class="govuk-table__cell">{row["areaName"]}</td>
            {#each metrics as metric}
              {#if colourScale === "On"}
                {#if metaData[metric].direction === "Higher is better"}
                  <td
                    class="govuk-table__cell govuk-table__cell--numeric"
                    style="background-color: {normToColor(
                      row[metric + '__normalised'],
                    )}"
                    data-sort-value="42">{row[metric]}</td
                  >
                {:else}
                  <td
                    class="govuk-table__cell govuk-table__cell--numeric"
                    style="background-color: {normToColorReverse(
                      row[metric + '__normalised'],
                    )}"
                    data-sort-value="42">{row[metric]}</td
                  >
                {/if}
              {:else}
                <td
                  class="govuk-table__cell govuk-table__cell--numeric"
                  data-sort-value="42">{row[metric]}</td
                >
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table-container {
    max-height: 80vh;
    overflow-y: auto;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
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
