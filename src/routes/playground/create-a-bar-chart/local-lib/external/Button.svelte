<script>
  let { rowOrder, orderBars } = $props();
</script>

<button onclick={orderBars(dataArray)}>{rowOrder}</button>

<style>
  * {
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    border: 2px solid black;
  }
</style>
