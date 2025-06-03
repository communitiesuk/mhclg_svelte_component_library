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

<Table
  caption={"Table caption"}
  colourScale={"Off"}
  data={data.tableData}
  metaData={data.metaData}
></Table>
