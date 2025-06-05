<script>
  import Table from "$lib/components/data-vis/table/Table.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  let { data } = $props();
  $inspect("data is ", data);
</script>

<p>this is my test page</p>

<Button
  textContent={"Click me"}
  buttonType={"default"}
  onClickFunction={() => {
    alert("hello");
  }}
></Button>

<!-- <Table
  caption={"Table caption"}
  colourScale={"Off"}
  data={data.tableData}
  metaData={data.metaData}
></Table> -->

<div class="table-container">
  <table class="govuk-table" data-module="moj-sortable-table">
    <caption class="govuk-table__caption">Caption</caption>
    <thead class="govuk-table__head"
      ><tr class="govuk-table__row">
        <th class="govuk-table__header">1</th>
        <th class="govuk-table__header">2</th>
        <th class="govuk-table__header">3</th>
        <th class="govuk-table__header">4</th>
        <th class="govuk-table__header">5</th>
        <th class="govuk-table__header">6</th>
        <th class="govuk-table__header">7</th>
        <th class="govuk-table__header">8</th>
      </tr></thead
    >
    <tbody class="govuk-table__body">
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
      <tr class="govuk-table__row">
        <td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td><td class="govuk-table__cell"></td><td class="govuk-table__cell"
        ></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  table {
    /* border-collapse: collapse; */
    margin: 10px;
  }

  th,
  td {
    border-left: 1px solid #000;
  }
</style>
