<script>
  import { TabItem } from "flowbite-svelte";

  // import { areSameLanguages } from "@maptiler/sdk";

  let { componentNameProp = undefined, data = undefined } = $props();

  let localCopyOfData = $state([...data]);

  const metrics = Object.keys(localCopyOfData[0]).slice(
    1,
    localCopyOfData[0].length,
  );

  $inspect(metrics);

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
</script>

{#snippet propNameAndValue(marginTW, paddingTW, text)}
  <span class="bg-slate-100 inline-block italic {marginTW} {paddingTW} rounded"
    >{text}</span
  >
{/snippet}

<div class="p-4">
  <h4>{componentNameProp} component</h4>

  <div>{metrics[0]}</div>
  <br />

  <div class="legend">
    <div>Colour key:</div>
    <div class="good" style="background-color: {normToColor(1)}">Good</div>
    <div class="good" style="background-color: {normToColor(0.5)}">Ok</div>
    <div class="bad" style="background-color: {normToColor(0)}">Bad</div>
  </div>

  <div class="table-container">
    <table class="my-table">
      <caption></caption>
      <thead
        ><tr>
          <th class="col-one-header">Area</th>
          <th title="The proportion of household waste sent for recyling">
            <div class="header">
              <div class="header-top">
                <div class="metric">Household recycling rate (%)</div>
                <div class="sorting-button">
                  <button
                    onclick={() => {
                      updateSortState(metrics[0], "ascending");
                      sortFunction();
                    }}>▲</button
                  >
                  <button
                    onclick={() => {
                      updateSortState(metrics[0], "descending");
                      sortFunction();
                    }}>▼</button
                  >
                </div>
              </div>
              <div class="metric-explainer">
                The proportion of household waste sent for recyling
              </div>
            </div>
          </th>
          <th
            title="The proportion of household waste sent for recyling that cannot be recyled"
          >
            <div class="header">
              <div class="header-top">
                <div class="metric">Recycling contamination rate (%)</div>
                <div class="sorting-button">
                  <button
                    onclick={() => {
                      updateSortState(metrics[1], "ascending");
                      sortFunction();
                    }}>▲</button
                  >
                  <button
                    onclick={() => {
                      updateSortState(metrics[1], "descending");
                      sortFunction();
                    }}>▼</button
                  >
                </div>
              </div>
              <div class="metric-explainer">
                The proportion of household waste sent for recyling that cannot
                be recyled
              </div>
            </div>
          </th>
          <th title="Non-recyclable waste per household, measured by weight">
            <div class="header">
              <div class="header-top">
                <div class="metric">Household waste (kg)</div>
                <div class="sorting-button">
                  <button
                    onclick={() => {
                      updateSortState(metrics[2], "ascending");
                      sortFunction();
                    }}>▲</button
                  >
                  <button
                    onclick={() => {
                      updateSortState(metrics[2], "descending");
                      sortFunction();
                    }}>▼</button
                  >
                </div>
              </div>
              <div class="metric-explainer">
                Non-recyclable waste per household, measured by weight
              </div>
            </div>
          </th>
        </tr></thead
      >
      <tbody>
        {#each localCopyOfData as row}
          <tr>
            <td class="areas">{row["areaName"]}</td>
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
</div>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }

  .table-container {
    max-height: 85vh;
    overflow-y: auto;
    border: 1px solid black;
    border-radius: 1%;
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

  .header {
    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: flex-start;
  }

  .header-top {
    display: flex;
    gap: 0px;
  }

  .sorting-button {
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
    line-height: 1; /* removes extra space between lines */
    gap: 3px;
    justify-content: center;
    background-color: lightgray;
    border-radius: 20%;
  }
  .col-one-header {
    text-align: right;
    padding: 5px;
  }
</style>
