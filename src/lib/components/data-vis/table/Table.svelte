<script>
  let {
    componentNameProp = undefined,
    data = undefined,
    metaData = undefined,
    caption = undefined,
    colourScale = undefined,
  } = $props();

  let localCopyOfData = $state([...data]);

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
  <h4>{componentNameProp} component</h4>

  <div class="legend">
    <div>Colour key:</div>
    {#each colorKey as key}
      <div class="good" style="background-color: {normToColor(key[1])}">
        {key[0]}
      </div>
    {/each}
  </div>

  <div class="govuk-table table-container" data-module="moj-sortable-table">
    <table class="my-table">
      <caption class="govuk-table__caption">{caption}</caption>
      <thead class="govuk-table__head"
        ><tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Area</th>
          {#each metrics as metric}
            <th
              scope="col"
              class="govuk-table__header"
              title={metaData[metric].explainer}
            >
              <div class="header">
                <div class="header-top">
                  <div class="metric">{metaData[metric].label}</div>
                  <div class="sorting-button">
                    <button
                      onclick={() => {
                        updateSortState(metric, "ascending");
                        sortFunction();
                      }}>▲</button
                    >
                    <button
                      onclick={() => {
                        updateSortState(metric, "descending");
                        sortFunction();
                      }}>▼</button
                    >
                  </div>
                </div>
                <div class="metric-explainer">
                  {metaData[metric].explainer}
                </div>
              </div>
            </th>
          {/each}
        </tr></thead
      >
      <tbody class="govuk-table__body">
        {#each localCopyOfData as row}
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">{row["areaName"]}</td>
            {#each metrics as metric}
              {#if metaData[metric].direction === "Higher is better"}
                <td
                  class="govuk-table__cell govuk-table__cell--numeric"
                  style="background-color: {normToColor(
                    row[metric + '__normalised'],
                  )}">{row[metric]}</td
                >
              {:else}
                <td
                  class="govuk-table__cell govuk-table__cell--numeric"
                  style="background-color: {normToColorReverse(
                    row[metric + '__normalised'],
                  )}">{row[metric]}</td
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
  * {
    margin: 0px;
    padding: 0px;
  }

  /*   .table-container {
    max-height: 85vh;
    overflow-y: auto;
    border: 1px solid black;
    border-radius: 1%;
  } */

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

  .metric-explainer {
    font-size: 13px;
    font-style: italic;
    font-weight: 400;
  }
  .legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 10px;
  }

  .legend > * {
    border-radius: 10%;
    padding: 6px;
  }

  td {
    padding: 0.5rem 0.5rem;
  }

  th {
    text-align: left;
    font-size: medium;
    vertical-align: top;
  }

  td {
    text-align: right;
  }
  .areas {
    font-size: medium;
  }
  .my-table {
    table-layout: fixed;
    width: 100%;
  }

  .my-table th:first-child,
  .my-table td:first-child {
    width: 25%;
  }

  .my-table th:nth-child(n + 2),
  .my-table td:nth-child(n + 2) {
    width: 25%;
  }

  /*   .header {
    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: flex-start;
  } */

  /*   .header-top {
    display: flex;
    gap: 0px;
  }

  .sorting-button {
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
    line-height: 1; removes extra space between lines
    gap: 3px;
    justify-content: center;
    background-color: lightgray;
    border-radius: 20%;
  } */
  /*   .col-one-header {
    text-align: right;
    padding: 5px;
  } */
</style>
