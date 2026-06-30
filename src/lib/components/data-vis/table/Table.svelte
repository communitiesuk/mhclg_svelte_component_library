<script>
  import { Button } from "@communitiesuk/svelte-component-library";

  let {
    data = [],
    metadata = {},
    caption = undefined,
    colourScale = undefined,
  } = $props();

  let localCopyOfData = $state([...(data ?? [])]);

  let sortState = $state({
    column: null,
    order: null, // "ascending" | "descending" | null
  });

  $effect(() => {
    localCopyOfData = [...(data ?? [])];
  });

  function hasUniqueValues(array, key) {
    const seen = new Set();
    for (const obj of array) {
      if (seen.has(obj[key])) {
        return false;
      }
      seen.add(obj[key]);
    }
    return true;
  }

  let columns = $derived.by(() => {
    if (!data || data.length === 0) return [];

    const derivedColumns = [];

    for (const column in data[0]) {
      const keyIsUnique = hasUniqueValues(data, column);
      const columnDataType = typeof data[0][column];

      derivedColumns.push({
        key: column,
        isUnique: keyIsUnique,
        dataType: columnDataType,
        id: metadata?.[column]?.order ?? 0,
      });
    }

    const orderedColumns = derivedColumns.sort((a, b) => a.id - b.id);

    return orderedColumns;
  });

  $inspect(columns);

  const metrics = $derived(
    columns
      .filter((column) => column.dataType === "number")
      .map((column) => column.key),
  );

  function updateSortState(columnToSort, sortOrder) {
    sortState.column = columnToSort;
    sortState.order = sortOrder;
  }

  function sortFunction() {
    if (!localCopyOfData.length || !sortState.column || !sortState.order)
      return;

    const sorted = [...localCopyOfData];

    if (typeof sorted[0][sortState.column] === "number") {
      if (sortState.order === "ascending") {
        sorted.sort((a, b) => a[sortState.column] - b[sortState.column]);
      } else {
        sorted.sort((a, b) => b[sortState.column] - a[sortState.column]);
      }
    }

    if (typeof sorted[0][sortState.column] === "string") {
      if (sortState.order === "ascending") {
        sorted.sort((a, b) =>
          a[sortState.column].localeCompare(b[sortState.column]),
        );
      } else {
        sorted.sort((a, b) =>
          b[sortState.column].localeCompare(a[sortState.column]),
        );
      }
    }

    localCopyOfData = sorted;
  }

  const minAndMaxValues = $derived.by(() => {
    const result = {};

    for (const metric of metrics) {
      const metricValues = localCopyOfData.map((item) => item[metric]);
      const min = Math.min(...metricValues);
      const max = Math.max(...metricValues);

      result[metric] = { min, max };
    }

    return result;
  });

  const displayRows = $derived.by(() => {
    return localCopyOfData.map((row) => {
      const rowWithNorms = { ...row };

      for (const metric of metrics) {
        const { min, max } = minAndMaxValues[metric];
        const value = row[metric];

        const normalisedValue = max === min ? 0.5 : (value - min) / (max - min);

        rowWithNorms[`${metric}__normalised`] = normalisedValue;
      }

      return rowWithNorms;
    });
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

  function handleSort(columnKey) {
    let newDirection = "ascending";

    if (sortState.column === columnKey) {
      if (sortState.order === "ascending") {
        newDirection = "descending";
      } else if (sortState.order === "descending") {
        newDirection = null;
      }
    }

    if (newDirection === null) {
      updateSortState(null, null);
      localCopyOfData = [...(data ?? [])];
      return;
    }

    updateSortState(columnKey, newDirection);
    sortFunction();
  }
</script>

<div class="p-4">
  {#if colourScale === "On"}
    <div class="legend">
      <div>Colour key:</div>
      {#each colorKey as key}
        <div
          class="color-keys"
          style={`background-color: ${normToColor(key[1])}`}
        >
          {key[0]}
        </div>
      {/each}
    </div>
  {/if}

  <div class="table-container">
    <div id="table-caption" class="sticky-caption">{caption}</div>

    <table class="govuk-table" data-module="moj-sortable-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          {#each columns as column}
            <th
              scope="col"
              class={`govuk-table__header ${column.dataType === "number" ? "govuk-table__header--numeric" : ""}`}
              title={metadata?.[column.key]?.explainer}
              style={metadata?.[column.key]?.width
                ? `min-width: ${metadata[column.key].width}`
                : undefined}
              aria-sort={sortState.column !== column.key ||
              sortState.order === null
                ? "none"
                : sortState.order === "descending"
                  ? "descending"
                  : "ascending"}
            >
              <div class="header">
                <Button
                  textContent={metadata?.[column.key]?.shortLabel ?? column.key}
                  buttonType={"table header"}
                  direction={sortState.column === column.key
                    ? sortState.order
                    : null}
                  onClickFunction={() => handleSort(column.key)}
                ></Button>
              </div>
            </th>
          {/each}
        </tr>
      </thead>

      <tbody class="govuk-table__body">
        {#each displayRows as row}
          <tr class="govuk-table__row">
            {#each columns as column}
              {#if column.dataType === "number"}
                {#if colourScale === "On"}
                  <td
                    class="govuk-table__cell govuk-table__cell--numeric"
                    style={`background-color: ${
                      metadata?.[column.key]?.direction === "Higher is better"
                        ? normToColor(row[column.key + "__normalised"])
                        : normToColorReverse(row[column.key + "__normalised"])
                    }`}
                  >
                    {@html row[column.key]}
                  </td>
                {:else}
                  <td class="govuk-table__cell govuk-table__cell--numeric">
                    {@html row[column.key]}
                  </td>
                {/if}
              {:else}
                <td class="govuk-table__cell">
                  {@html row[column.key]}
                </td>
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
    max-height: 60vh;
    overflow-y: auto;
    overflow-x: scroll;
    width: 100%;
  }

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

  .header {
    display: flex;
    align-items: center;
  }
</style>
